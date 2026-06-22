export function showToast(message: string) {
  const existing = document.querySelector(".toast");
  if (existing) existing.remove();

  const el = document.createElement("div");
  el.className = "toast";
  el.textContent = message;
  document.body.appendChild(el);

  requestAnimationFrame(() => el.classList.add("in"));
  setTimeout(() => {
    el.classList.remove("in");
    el.addEventListener("transitionend", () => el.remove(), { once: true });
  }, 2200);
}
