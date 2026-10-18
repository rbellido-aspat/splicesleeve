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

// Video horizontal de la obra Batán: en pantallas grandes empieza mudo al
// llegar a la vista; en el celular (preload="none") se descarga al tocar play
(function () {
  var video = document.querySelector(".obra__video video");
  if (!video) return;

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var wide = window.matchMedia("(min-width: 861px)").matches;
  var saveData = navigator.connection && navigator.connection.saveData;
  var sent = false;

  video.addEventListener("play", function () {
    if (sent || typeof window.gtag !== "function") return;
    sent = true;
    window.gtag("event", "video_start", { video_title: "Obra Batán Precreto", link_location: "video_batan" });
  });

  if (reduced || saveData || !wide || !("IntersectionObserver" in window)) return;
  new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        var p = video.play();
        if (p && p.catch) p.catch(function () {});
      } else if (!video.paused) {
        video.pause();
      }
    });
  }, { threshold: 0.5 }).observe(video);
})();
