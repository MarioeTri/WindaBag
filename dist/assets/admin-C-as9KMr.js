import{l as y,a as k,r as E,d as w,g as B,b as I,u as L,c as $}from"./index-CDnrfXqL.js";function P(){return localStorage.getItem("admin_token")}function x(a){localStorage.setItem("admin_token",a)}function T(){localStorage.removeItem("admin_token")}function M(){return!!P()}function v(){const a=document.getElementById("app");a.innerHTML=`
    <div class="admin-page">
      <div class="admin-login">
        <div class="admin-login-card">
          <h2>Admin Login</h2>
          <p class="admin-login-sub">Masukkan password untuk mengelola produk</p>
          <form id="login-form">
            <input type="password" id="login-password" placeholder="Password" required autofocus />
            <button type="submit" class="btn btn-primary">Masuk</button>
          </form>
          <p class="admin-login-error" id="login-error"></p>
          <a href="/" class="admin-back-link">Kembali ke Beranda</a>
        </div>
      </div>
    </div>
  `,document.getElementById("login-form").addEventListener("submit",async n=>{n.preventDefault();const e=document.getElementById("login-password").value,t=document.getElementById("login-error");try{const i=await y(e);x(i.token),d("#dashboard")}catch{t.textContent="Password salah"}})}async function g(){const a=document.getElementById("app");a.innerHTML=`
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
  `,document.getElementById("btn-add").addEventListener("click",()=>d("#add")),document.getElementById("btn-logout").addEventListener("click",()=>{T(),d("#login")});try{const n=await k(),e=document.querySelector(".admin-content");if(n.length===0){e.innerHTML='<p class="admin-empty">Belum ada produk. Klik "Tambah Produk" untuk memulai.</p>';return}e.innerHTML=`
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
          ${n.map((t,i)=>`
            <tr>
              <td><div class="admin-thumb" style="background-image: url('${t.image}')"></div></td>
              <td>${t.name}</td>
              <td>${E.format(t.price)}</td>
              <td class="admin-actions">
                <button class="btn-edit" data-id="${t.id}">Edit</button>
                <button class="btn-delete" data-id="${t.id}" data-index="${i}">Hapus</button>
              </td>
            </tr>`).join("")}
        </tbody>
      </table>
    `,e.querySelectorAll(".btn-edit").forEach(t=>t.addEventListener("click",()=>{const i=t.dataset.id;d(`#edit/${i}`)})),e.querySelectorAll(".btn-delete").forEach(t=>t.addEventListener("click",async()=>{const i=t.dataset.id;if(confirm("Hapus produk ini?"))try{await w(i),g()}catch{alert("Gagal menghapus produk")}}))}catch(n){document.querySelector(".admin-content").innerHTML=`<p class="admin-empty">Gagal memuat produk: ${n}</p>`}}async function h(a){const n=!!a;let e={name:"",price:"",description:"",material:"",colors:"",features:"",image:""};if(n)try{const r=await B(a);e={name:r.name,price:String(r.price),description:r.description||"",material:r.material||"",colors:(r.colors||[]).join(", "),features:(r.features||[]).join(`
`),image:r.image||""}}catch{d("#dashboard");return}const t=document.getElementById("app");t.innerHTML=`
    <div class="admin-page">
      <header class="admin-header">
        <div class="admin-header-inner">
          <h2>${n?"Edit Produk":"Tambah Produk"}</h2>
          <button class="btn btn-ghost" id="btn-back">Kembali</button>
        </div>
      </header>
      <div class="admin-content">
        <form id="product-form" class="admin-form">
          <div class="form-group">
            <label for="f-name">Nama Bag *</label>
            <input type="text" id="f-name" value="${e.name}" required />
          </div>
          <div class="form-group">
            <label for="f-price">Harga (Rp) *</label>
            <input type="number" id="f-price" value="${e.price}" required min="0" />
          </div>
          <div class="form-group">
            <label for="f-description">Detail Barang</label>
            <textarea id="f-description" rows="3">${e.description}</textarea>
          </div>
          <div class="form-group">
            <label for="f-material">Material</label>
            <input type="text" id="f-material" value="${e.material}" />
          </div>
          <div class="form-group">
            <label for="f-colors">Pilihan Warna (pisahkan dengan koma)</label>
            <input type="text" id="f-colors" value="${e.colors}" placeholder="Coklat, Hitam, Krem" />
          </div>
          <div class="form-group">
            <label for="f-features">Keunggulan Produk (setiap baris = 1 poin)</label>
            <textarea id="f-features" rows="4" placeholder="Kompartemen utama luas&#10;Saku internal dengan resleting">${e.features}</textarea>
          </div>
          <div class="form-group">
            <label for="f-image">Gambar Produk *</label>
            <input type="file" id="f-image" accept="image/*" ${n&&e.image,""} />
            <div class="form-image-preview" id="image-preview" style="${e.image?`background-image: url('${e.image}')`:""}"></div>
            <span class="form-hint">Upload gambar baru atau gunakan URL yang sudah ada</span>
          </div>
          <div class="form-group">
            <label for="f-image-url">Atau masukkan URL gambar</label>
            <input type="url" id="f-image-url" value="${e.image}" placeholder="https://..." />
          </div>
          <div class="form-actions">
            <button type="submit" class="btn btn-primary">${n?"Simpan Perubahan":"Tambah Produk"}</button>
          </div>
          <p class="admin-login-error" id="form-error"></p>
        </form>
      </div>
    </div>
  `,document.getElementById("btn-back").addEventListener("click",()=>d("#dashboard"));const i=document.getElementById("f-image"),s=document.getElementById("f-image-url"),b=document.getElementById("image-preview");i.addEventListener("change",()=>{var o;const r=(o=i.files)==null?void 0:o[0];if(r){const l=new FileReader;l.onload=c=>{var m;b.style.backgroundImage=`url('${(m=c.target)==null?void 0:m.result}')`,s.value=""},l.readAsDataURL(r)}}),s.addEventListener("input",()=>{s.value&&(b.style.backgroundImage=`url('${s.value}')`,i.value="")}),document.getElementById("product-form").addEventListener("submit",async r=>{var m;r.preventDefault();const o=document.getElementById("form-error");let l=s.value.trim();const c=(m=i.files)==null?void 0:m[0];try{if(c&&(o.textContent="Mengupload gambar...",l=(await I(c)).url),!l){o.textContent="Gambar produk wajib diisi";return}const u={name:document.getElementById("f-name").value,price:Number(document.getElementById("f-price").value),description:document.getElementById("f-description").value,material:document.getElementById("f-material").value,colors:document.getElementById("f-colors").value.split(",").map(p=>p.trim()).filter(Boolean),features:document.getElementById("f-features").value.split(`
`).map(p=>p.trim()).filter(Boolean),image:l};n?await L(a,u):await $(u),d("#dashboard")}catch(u){o.textContent=String(u)}})}function d(a){window.location.hash=a,f()}function f(){const a=window.location.hash.slice(1)||"login";if(a==="login"){v();return}if(!M()){v();return}if(a==="dashboard"){g();return}if(a.startsWith("add")){h();return}if(a.startsWith("edit/")){const n=a.split("/")[1];h(n);return}g()}function S(){document.title="Admin - Mahogany Bag Co.",f(),window.addEventListener("hashchange",f)}export{S as initAdmin,d as navigate};
