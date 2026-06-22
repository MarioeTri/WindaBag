export function observeReveals() {
  const nodes = document.querySelectorAll<HTMLElement>(".reveal");
  if (!nodes.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.15, rootMargin: "0px 0px -30px 0px" }
  );

  nodes.forEach((node) => observer.observe(node));
}
