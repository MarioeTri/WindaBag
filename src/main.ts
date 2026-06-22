import "./styles.css";
import type { Product } from "./types";
import { renderApp } from "./render";
import { setProducts } from "./lib/store";
import { initModal } from "./lib/modal";
import { initNavigation } from "./lib/nav";
import { observeReveals } from "./lib/observe";
import { preloadImages } from "./lib/preload";
import { getProducts } from "./lib/api";

(async function init() {
  const app = document.querySelector<HTMLDivElement>("#app");
  if (!app) throw new Error("Element #app tidak ditemukan.");

  if (window.location.pathname.startsWith("/admin")) {
    const { initAdmin } = await import("./admin/admin");
    initAdmin();
    return;
  }

  // Loading skeleton
  app.innerHTML = `
    <div class="site">
      <header class="topbar">
        <div class="container topbar-inner">
          <div class="brand">
            <span class="brand-logo">Mahogany</span>
            <span class="brand-tag">Luxury Bag Co.</span>
          </div>
          <nav class="nav">
            <a href="#collection">Collection</a>
            <a href="#story">Story</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>
      <div class="skeleton"><div class="container"><div class="skeleton-hero"></div></div></div>
    </div>
  `;

  let products: Product[];
  try {
    products = await getProducts();
  } catch {
    products = [];
  }

  setProducts(products);
  app.innerHTML = renderApp(products);

  initModal();
  initNavigation();
  observeReveals();
  preloadImages();
})();
