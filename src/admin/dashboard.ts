import { getProducts, deleteProduct } from "../lib/api";
import { clearToken } from "../lib/auth";
import { navigate } from "./admin";
import { rupiah } from "../lib/format";

export async function renderDashboard() {
  const app = document.getElementById("app")!;
  app.innerHTML = `
    <div class="admin-page">
      <header class="admin-header">
        <div class="admin-header-inner">
          <h2>Dashboard Produk</h2>
          <div class="admin-header-actions">
            <button class="btn btn-primary" id="btn-add">+ Tambah Produk</button>
            <button class="btn btn-ghost" id="btn-logout">Logout</button>
          </div>
        </div>
      </header>
      <div class="admin-content">
        <div class="admin-loading">Memuat produk...</div>
      </div>
    </div>
  `;

  document.getElementById("btn-add")!.addEventListener("click", () => navigate("#add"));
  document.getElementById("btn-logout")!.addEventListener("click", () => {
    clearToken();
    navigate("#login");
  });

  try {
    const products = await getProducts();
    const container = document.querySelector<HTMLElement>(".admin-content")!;

    if (products.length === 0) {
      container.innerHTML = '<p class="admin-empty">Belum ada produk. Klik "Tambah Produk" untuk memulai.</p>';
      return;
    }

    container.innerHTML = `
      <table class="admin-table">
        <thead>
          <tr>
            <th>Gambar</th>
            <th>Nama</th>
            <th>Harga</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          ${products
            .map(
              (p, i) => `
            <tr>
              <td><div class="admin-thumb" style="background-image: url('${p.image}')"></div></td>
              <td>${p.name}</td>
              <td>${rupiah.format(p.price)}</td>
              <td class="admin-actions">
                <button class="btn-edit" data-id="${p.id}">Edit</button>
                <button class="btn-delete" data-id="${p.id}" data-index="${i}">Hapus</button>
              </td>
            </tr>`
            )
            .join("")}
        </tbody>
      </table>
    `;

    container.querySelectorAll(".btn-edit").forEach((btn) =>
      btn.addEventListener("click", () => {
        const id = (btn as HTMLElement).dataset.id!;
        navigate(`#edit/${id}`);
      })
    );

    container.querySelectorAll(".btn-delete").forEach((btn) =>
      btn.addEventListener("click", async () => {
        const id = (btn as HTMLElement).dataset.id!;
        if (!confirm("Hapus produk ini?")) return;
        try {
          await deleteProduct(id);
          renderDashboard();
        } catch {
          alert("Gagal menghapus produk");
        }
      })
    );
  } catch (err) {
    document.querySelector<HTMLElement>(".admin-content")!.innerHTML =
      `<p class="admin-empty">Gagal memuat produk: ${err}</p>`;
  }
}
