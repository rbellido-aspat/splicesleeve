// Menú móvil
(function () {
  var btn = document.querySelector(".menu-btn");
  var menu = document.getElementById("menu");
  if (!btn || !menu) return;

  function close() {
    menu.classList.remove("is-open");
    btn.setAttribute("aria-expanded", "false");
  }

  btn.addEventListener("click", function () {
    var open = menu.classList.toggle("is-open");
    btn.setAttribute("aria-expanded", open ? "true" : "false");
  });

  menu.addEventListener("click", function (e) {
    if (e.target.closest("a")) close();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") close();
  });
})();

// Carrusel de fotos Batán en la portada
(function () {
  var hero = document.querySelector(".hero");
  var slides = hero ? hero.querySelectorAll(".slide") : [];
  if (slides.length < 2) return;

  var caption = hero.querySelector(".carousel__caption");
  var count = hero.querySelector(".carousel__count");
  var pauseBtn = hero.querySelector('[data-carousel="pause"]');
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var current = 0;
  var paused = reduced;
  var timer = null;
  var DELAY = 6000;

  // Las fotos se cargan recién cuando les toca, para no pesar al abrir la página
  function load(i) {
    var img = slides[i].querySelector("img[data-src]");
    if (!img) return;
    img.srcset = img.getAttribute("data-srcset");
    img.src = img.getAttribute("data-src");
    img.removeAttribute("data-src");
    img.removeAttribute("data-srcset");
  }

  function show(i) {
    i = (i + slides.length) % slides.length;
    load(i);
    load((i + 1) % slides.length);
    slides[current].classList.remove("is-active");
    slides[current].setAttribute("aria-hidden", "true");
    slides[i].classList.add("is-active");
    slides[i].removeAttribute("aria-hidden");
    current = i;
    caption.textContent = slides[i].querySelector("figcaption").textContent;
    count.textContent = (i + 1) + " / " + slides.length;
  }

  function stop() { clearInterval(timer); timer = null; }
  function start() {
    stop();
    if (!paused && !document.hidden) timer = setInterval(function () { show(current + 1); }, DELAY);
  }

  function setPaused(p) {
    paused = p;
    pauseBtn.setAttribute("aria-pressed", p ? "true" : "false");
    pauseBtn.setAttribute("aria-label", p ? "Reanudar fotos" : "Pausar fotos");
    start();
  }

  hero.querySelector('[data-carousel="prev"]').addEventListener("click", function () { show(current - 1); start(); });
  hero.querySelector('[data-carousel="next"]').addEventListener("click", function () { show(current + 1); start(); });
  pauseBtn.addEventListener("click", function () { setPaused(!paused); });
  document.addEventListener("visibilitychange", start);

  // Precarga la segunda foto cuando la primera ya está visible
  window.addEventListener("load", function () { load(1); });
  setPaused(paused);
})();

// Video de la obra Batán: bucle mudo en la portada y reel completo en un diálogo
(function () {
  var loop = document.querySelector(".reel__loop");
  var dialog = document.querySelector(".reel-dialog");
  var openBtn = document.querySelector("[data-reel-open]");
  if (!loop || !dialog || !openBtn) return;

  var full = dialog.querySelector("video");
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var wide = window.matchMedia("(min-width: 861px)");
  var saveData = navigator.connection && navigator.connection.saveData;

  // El bucle mudo solo corre en pantallas grandes; en el celular queda el póster
  // y el video se descarga recién cuando la persona lo pide
  function startLoop() {
    if (reduced || saveData || !wide.matches) return;
    if (loop.hasAttribute("data-src")) {
      loop.src = loop.getAttribute("data-src");
      loop.removeAttribute("data-src");
    }
    var p = loop.play();
    if (p && p.catch) p.catch(function () {});
  }
  if (document.readyState === "complete") startLoop();
  else window.addEventListener("load", startLoop);
  if (wide.addEventListener) wide.addEventListener("change", startLoop);

  function open() {
    if (full.hasAttribute("data-src")) {
      full.src = full.getAttribute("data-src");
      full.removeAttribute("data-src");
    }
    loop.pause();
    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "");
    var p = full.play();
    if (p && p.catch) p.catch(function () {});
    if (typeof window.gtag === "function") {
      window.gtag("event", "video_start", { video_title: "Obra Batán Precreto", link_location: "hero" });
    }
  }

  function close() {
    full.pause();
    if (dialog.open && typeof dialog.close === "function") dialog.close();
    else dialog.removeAttribute("open");
  }

  openBtn.addEventListener("click", open);
  dialog.addEventListener("click", function (e) {
    if (e.target === dialog || e.target.closest("[data-reel-close]")) close();
  });
  dialog.addEventListener("close", function () {
    full.pause();
    if (!loop.hasAttribute("data-src")) loop.play().catch(function () {});
  });
})();
