import { login } from "../lib/api";
import { setToken } from "../lib/auth";
import { navigate } from "./admin";

export function renderLogin() {
  const app = document.getElementById("app")!;
  app.innerHTML = `
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
  `;

  document.getElementById("login-form")!.addEventListener("submit", async (e) => {
    e.preventDefault();
    const pw = (document.getElementById("login-password") as HTMLInputElement).value;
    const errEl = document.getElementById("login-error")!;

    try {
      const res = await login(pw);
      setToken(res.token);
      navigate("#dashboard");
    } catch {
      errEl.textContent = "Password salah";
    }
  });
}
