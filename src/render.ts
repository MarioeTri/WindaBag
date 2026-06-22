import type { Product } from "./types";
import { rupiah } from "./lib/format";
import { INSTAGRAM_URL, WHATSAPP_URL, PHONE } from "./lib/config";

const waIcon = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>';


function productCard(p: Product, i: number) {
  return `
    <article class="product reveal" data-index="${i}">
      <div class="product-thumb" style="background-image: linear-gradient(rgba(39, 24, 16, 0.08), rgba(39, 24, 16, 0.08)), url('${p.image}')">
        <span class="badge"><svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg> New</span>
        <div class="product-overlay"><span>Lihat Detail</span></div>
      </div>
      <h3 class="product-title">${p.name}</h3>
      <div class="product-meta">
        <span class="price">${rupiah.format(p.price)}</span>
      </div>
    </article>
  `;
}

function featureSection() {
  const items = [
    {
      icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"/><rect x="16" y="6" width="6" height="10"/><circle cx="5" cy="19" r="2"/><circle cx="18" cy="19" r="2" fill="currentColor"/></svg>',
      title: "Gratis Pengiriman",
      desc: "Free shipping untuk seluruh Indonesia"
    },
    {
      icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
      title: "100% Original",
      desc: "Produk berkualitas premium terjamin"
    },
    {
      icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>',
      title: "Garansi 30 Hari",
      desc: "Retur atau tukar jika tidak sesuai"
    },
    {
      icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>',
      title: "Gratis Gift Box",
      desc: "Kemasan eksklusif untuk setiap pesanan"
    }
  ];

  return `
    <section class="features reveal">
      <div class="container">
        <div class="features-grid">
          ${items
            .map(
              (f) => `
            <div class="feature-item">
              <div class="feature-icon">${f.icon}</div>
              <h4 class="feature-title">${f.title}</h4>
              <p class="feature-desc">${f.desc}</p>
            </div>`
            )
            .join("")}
        </div>
      </div>
    </section>
  `;
}

export function renderProducts(products: Product[]) {
  const el = document.querySelector(".products");
  if (el) {
    el.innerHTML = products.map((p, i) => productCard(p, i)).join("");
  }
}

export function renderApp(products: Product[]) {
  return `
    <main class="site">
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

      <section class="hero">
        <div class="container hero-grid">
          <article class="hero-card reveal">
            <p class="hero-kicker">Designed for everyday elegance</p>
            <h1 class="hero-title">Timeless Craft<br>for Modern Women</h1>
            <p class="hero-sub">
              Koleksi tas premium bertema coklat yang memadukan karakter mewah, material berkualitas,
              dan fungsionalitas untuk aktivitas harian.
            </p>
            <div class="cta-row">
              <a class="btn btn-primary" href="#collection">Belanja Sekarang</a>
              <a class="btn btn-ghost" href="${INSTAGRAM_URL}" target="_blank" rel="noreferrer">Lihat Instagram</a>
            </div>
          </article>

          <div class="hero-gallery">
            <div class="hero-shot reveal"></div>
            <div class="hero-shot reveal"></div>
            <div class="hero-shot reveal"></div>
            <div class="hero-shot reveal"></div>
          </div>
        </div>
      </section>

      ${featureSection()}

      <section class="section" id="collection">
        <div class="container">
          <div class="section-head reveal">
            <div>
              <h2 class="section-title">The Essentials Collection</h2>
              <p class="section-copy">
                Desain elegan dengan siluet clean, warna brown signature, dan detail premium untuk gaya yang refined.
              </p>
            </div>
          </div>

          <div class="products">${products.map((p, i) => productCard(p, i)).join("")}</div>

          <div class="story" id="story">
            <div class="story-image reveal"></div>
            <article class="story-card reveal">
              <h3>Luxury in Every Stitch</h3>
              <p>
                Mahogany Bag Co. hadir untuk perempuan yang menyukai estetika minimal dan berkelas.
                Setiap tas dirancang agar tahan lama, nyaman dipakai, serta tetap tampil statement di berbagai momen.
              </p>
              <p>
                Berbasis inspirasi dari akun Instagram Kami, nuansa brand Kami bangun dari tone coklat hangat,
                detail emas halus, dan komposisi visual modern-luxury.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section class="cta-section">
        <div class="container">
          <div class="cta-card reveal">
            <h3 class="cta-title">Temukan Tas Impianmu</h3>
            <p class="cta-desc">Setiap produk Mahogany Bag Co. dibuat dengan detail dan cinta. Klik produk untuk melihat detail lengkap, atau pesan langsung via Instagram.</p>
            <a class="btn btn-primary" href="${INSTAGRAM_URL}" target="_blank" rel="noreferrer">Pesan via Instagram</a>
          </div>
        </div>
      </section>

      <footer class="footer" id="contact">
        <div class="container">
          <div class="footer-box reveal">
            <div class="footer-info">
              <strong>Mahogany Bag Co.</strong>
              <span class="footer-tagline">Crafted with timeless and minimal touch.</span>
            </div>
            <div class="footer-links">
              <a class="footer-link" href="${WHATSAPP_URL}" target="_blank" rel="noreferrer">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                ${PHONE}
              </a>
              <a class="footer-link ig-link" href="${INSTAGRAM_URL}" target="_blank" rel="noreferrer">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                @_mahogany.co
              </a>
            </div>
          </div>
        </div>
      </footer>

      <a class="floating-wa" href="${WHATSAPP_URL}" target="_blank" rel="noreferrer" aria-label="WhatsApp">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </a>
    </main>

    <div class="modal-overlay" id="modal-overlay">
      <div class="modal" role="dialog" aria-modal="true">
        <button class="modal-close" aria-label="Tutup">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
        <div class="modal-inner">
          <div class="modal-image" id="modal-image"></div>
          <div class="modal-body">
            <span class="badge modal-badge" id="modal-badge"></span>
            <h3 class="modal-title" id="modal-title"></h3>
            <div class="modal-price" id="modal-price"></div>
            <p class="modal-desc" id="modal-desc"></p>
            <div class="modal-specs">
              <div class="modal-spec">
                <span class="spec-label">Material</span>
                <span class="spec-value" id="modal-material"></span>
              </div>
              <div class="modal-spec">
                <span class="spec-label">Pilihan Warna</span>
                <span class="spec-value" id="modal-colors"></span>
              </div>
            </div>
            <div class="modal-features">
              <h4 class="modal-features-title">Keunggulan Produk</h4>
              <ul id="modal-features-list"></ul>
            </div>
            <div class="modal-order-row">
              <a class="btn btn-primary modal-order" href="${WHATSAPP_URL}" target="_blank" rel="noreferrer">${waIcon} Pesan via WhatsApp</a>
              <a class="btn btn-ghost modal-order-ig" href="${INSTAGRAM_URL}" target="_blank" rel="noreferrer">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
