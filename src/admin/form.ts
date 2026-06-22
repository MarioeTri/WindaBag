import { getProduct, createProduct, updateProduct, uploadImage } from "../lib/api";
import { navigate } from "./admin";

export async function renderForm(productId?: string) {
  const isEdit = !!productId;
  let initial: Record<string, any> = {
    name: "",
    price: "",
    description: "",
    material: "",
    colors: "",
    features: "",
    image: "",
  };

  if (isEdit) {
    try {
      const p = await getProduct(productId!);
      initial = {
        name: p.name,
        price: String(p.price),
        description: p.description || "",
        material: p.material || "",
        colors: (p.colors || []).join(", "),
        features: (p.features || []).join("\n"),
        image: p.image || "",
      };
    } catch {
      navigate("#dashboard");
      return;
    }
  }

  const app = document.getElementById("app")!;
  app.innerHTML = `
    <div class="admin-page">
      <header class="admin-header">
        <div class="admin-header-inner">
          <h2>${isEdit ? "Edit Produk" : "Tambah Produk"}</h2>
          <button class="btn btn-ghost" id="btn-back">Kembali</button>
        </div>
      </header>
      <div class="admin-content">
        <form id="product-form" class="admin-form">
          <div class="form-group">
            <label for="f-name">Nama Bag *</label>
            <input type="text" id="f-name" value="${initial.name}" required />
          </div>
          <div class="form-group">
            <label for="f-price">Harga (Rp) *</label>
            <input type="number" id="f-price" value="${initial.price}" required min="0" />
          </div>
          <div class="form-group">
            <label for="f-description">Detail Barang</label>
            <textarea id="f-description" rows="3">${initial.description}</textarea>
          </div>
          <div class="form-group">
            <label for="f-material">Material</label>
            <input type="text" id="f-material" value="${initial.material}" />
          </div>
          <div class="form-group">
            <label for="f-colors">Pilihan Warna (pisahkan dengan koma)</label>
            <input type="text" id="f-colors" value="${initial.colors}" placeholder="Coklat, Hitam, Krem" />
          </div>
          <div class="form-group">
            <label for="f-features">Keunggulan Produk (setiap baris = 1 poin)</label>
            <textarea id="f-features" rows="4" placeholder="Kompartemen utama luas&#10;Saku internal dengan resleting">${initial.features}</textarea>
          </div>
          <div class="form-group">
            <label for="f-image">Gambar Produk *</label>
            <input type="file" id="f-image" accept="image/*" ${isEdit && initial.image ? "" : ""} />
            <div class="form-image-preview" id="image-preview" style="${initial.image ? `background-image: url('${initial.image}')` : ""}"></div>
            <span class="form-hint">Upload gambar baru atau gunakan URL yang sudah ada</span>
          </div>
          <div class="form-group">
            <label for="f-image-url">Atau masukkan URL gambar</label>
            <input type="url" id="f-image-url" value="${initial.image}" placeholder="https://..." />
          </div>
          <div class="form-actions">
            <button type="submit" class="btn btn-primary">${isEdit ? "Simpan Perubahan" : "Tambah Produk"}</button>
          </div>
          <p class="admin-login-error" id="form-error"></p>
        </form>
      </div>
    </div>
  `;

  document.getElementById("btn-back")!.addEventListener("click", () => navigate("#dashboard"));

  const fileInput = document.getElementById("f-image") as HTMLInputElement;
  const urlInput = document.getElementById("f-image-url") as HTMLInputElement;
  const preview = document.getElementById("image-preview")!;

  fileInput.addEventListener("change", () => {
    const file = fileInput.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        preview.style.backgroundImage = `url('${e.target?.result}')`;
        urlInput.value = "";
      };
      reader.readAsDataURL(file);
    }
  });

  urlInput.addEventListener("input", () => {
    if (urlInput.value) {
      preview.style.backgroundImage = `url('${urlInput.value}')`;
      fileInput.value = "";
    }
  });

  document.getElementById("product-form")!.addEventListener("submit", async (e) => {
    e.preventDefault();
    const errEl = document.getElementById("form-error")!;

    let imageUrl = urlInput.value.trim();
    const file = fileInput.files?.[0];

    try {
      if (file) {
        errEl.textContent = "Mengupload gambar...";
        const uploadRes = await uploadImage(file);
        imageUrl = uploadRes.url;
      }

      if (!imageUrl) {
        errEl.textContent = "Gambar produk wajib diisi";
        return;
      }

      const data = {
        name: (document.getElementById("f-name") as HTMLInputElement).value,
        price: Number((document.getElementById("f-price") as HTMLInputElement).value),
        description: (document.getElementById("f-description") as HTMLTextAreaElement).value,
        material: (document.getElementById("f-material") as HTMLInputElement).value,
        colors: (document.getElementById("f-colors") as HTMLInputElement).value
          .split(",")
          .map((s: string) => s.trim())
          .filter(Boolean),
        features: (document.getElementById("f-features") as HTMLTextAreaElement).value
          .split("\n")
          .map((s: string) => s.trim())
          .filter(Boolean),
        image: imageUrl,
      };

      if (isEdit) {
        await updateProduct(productId!, data);
      } else {
        await createProduct(data);
      }

      navigate("#dashboard");
    } catch (err) {
      errEl.textContent = String(err);
    }
  });
}
