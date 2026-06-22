export function initNavigation() {
  document.querySelector(".nav")?.addEventListener("click", (e) => {
    const link = (e.target as HTMLElement).closest<HTMLAnchorElement>("a");
    if (!link) return;
    e.preventDefault();
    const id = link.getAttribute("href")?.slice(1);
    if (!id) return;
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
}
