import { rupiah } from "./format";
import { getProductByIndex } from "./store";
import { INSTAGRAM_URL, WHATSAPP_URL } from "./config";

let isOpen = false;

function $(id: string) {
  return document.getElementById(id)!;
}

function open(index: number) {
  const p = getProductByIndex(index);
  if (!p) return;

  $("modal-badge").textContent = "New";
  $("modal-title").textContent = p.name;
  $("modal-price").textContent = rupiah.format(p.price);
  $("modal-desc").textContent = p.description || "";
  $("modal-material").textContent = p.material || "-";
  $("modal-colors").textContent = p.colors?.join(", ") || "-";
  $("modal-features-list").innerHTML = (p.features || [])
    .map((f: string) => `<li>${f}</li>`)
    .join("");
  ($("modal-image") as HTMLElement).style.backgroundImage = `url('${p.image}')`;

  $("modal-overlay").classList.add("open");
  document.body.style.overflow = "hidden";
  isOpen = true;
}

function close() {
  $("modal-overlay").classList.remove("open");
  document.body.style.overflow = "";
  isOpen = false;
}

export function initModal() {
  const overlay = $("modal-overlay");
  overlay.querySelector(".modal-close")!.addEventListener("click", close);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) close();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen) close();
  });

  document.querySelector(".products")?.addEventListener("click", (e) => {
    const card = (e.target as HTMLElement).closest<HTMLElement>(".product");
    if (card && card.dataset.index !== undefined) {
      open(Number(card.dataset.index));
    }
  });
}
