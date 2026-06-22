export function preloadImages() {
  const imgs = document.querySelectorAll<HTMLElement>(
    ".hero-shot, .product-thumb, .story-image"
  );
  imgs.forEach((el) => {
    const bg = getComputedStyle(el).backgroundImage;
    const match = bg.match(/url\(["']?([^"')]+)["']?\)/);
    if (match) {
      const img = new Image();
      img.src = match[1];
    }
  });
}
