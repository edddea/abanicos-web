// Abanicos y Promocionales - global UI behavior

(function () {
  // Mobile menu
  const burger = document.getElementById("burger");
  const drawer = document.getElementById("drawer");

  if (burger && drawer) {
    burger.addEventListener("click", () => {
      const isOpen = drawer.classList.toggle("open");
      burger.setAttribute("aria-expanded", String(isOpen));
    });
  }

  // Lightbox (optional on pages that include it)
  const lb = document.getElementById("lightbox");
  const lbImg = document.getElementById("lbImg");
  const lbTitle = document.getElementById("lbTitle");
  const closeBtn = document.getElementById("closeBtn");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  const tiles = Array.from(document.querySelectorAll(".tile"));
  if (!lb || !lbImg || tiles.length === 0) return;

  let idx = 0;

  function openAt(i) {
    idx = (i + tiles.length) % tiles.length;
    const t = tiles[idx];
    const full = t.getAttribute("data-full");
    const title = t.getAttribute("data-title") || "Vista previa";
    lbImg.src = full || "";
    lbTitle && (lbTitle.textContent = title);
    lb.classList.add("open");
    lb.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLb() {
    lb.classList.remove("open");
    lb.setAttribute("aria-hidden", "true");
    lbImg.src = "";
    document.body.style.overflow = "";
  }

  tiles.forEach((t, i) => t.addEventListener("click", () => openAt(i)));
  closeBtn && closeBtn.addEventListener("click", closeLb);
  lb.addEventListener("click", (e) => { if (e.target === lb) closeLb(); });
  prevBtn && prevBtn.addEventListener("click", () => openAt(idx - 1));
  nextBtn && nextBtn.addEventListener("click", () => openAt(idx + 1));

  window.addEventListener("keydown", (e) => {
    if (!lb.classList.contains("open")) return;
    if (e.key === "Escape") closeLb();
    if (e.key === "ArrowLeft") openAt(idx - 1);
    if (e.key === "ArrowRight") openAt(idx + 1);
  });
})();
