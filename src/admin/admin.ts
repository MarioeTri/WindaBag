import "../admin.css";
import { isLoggedIn } from "../lib/auth";
import { renderLogin } from "./login";
import { renderDashboard } from "./dashboard";
import { renderForm } from "./form";

export function navigate(hash: string) {
  window.location.hash = hash;
  renderRoute();
}

function renderRoute() {
  const hash = window.location.hash.slice(1) || "login";

  if (hash === "login") {
    renderLogin();
    return;
  }

  if (!isLoggedIn()) {
    renderLogin();
    return;
  }

  if (hash === "dashboard") {
    renderDashboard();
    return;
  }

  if (hash.startsWith("add")) {
    renderForm();
    return;
  }

  if (hash.startsWith("edit/")) {
    const id = hash.split("/")[1];
    renderForm(id);
    return;
  }

  renderDashboard();
}

export function initAdmin() {
  document.title = "Admin - Mahogany Bag Co.";
  renderRoute();
  window.addEventListener("hashchange", renderRoute);
}
