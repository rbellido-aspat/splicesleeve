// Eventos de negocio para GA4, complementan el Enhanced measurement.
// Nunca se envían números, correos ni nombres: los textos de los botones
// de contacto vienen de data-cta, no del texto visible.
(function () {
  function send(name, params) {
    if (typeof window.gtag === "function") window.gtag("event", name, params);
  }

  // Ubicación del link: data-location más cercano, si no el id de la sección
  function locationOf(el) {
    var tagged = el.closest("[data-location]");
    if (tagged) return tagged.getAttribute("data-location");
    var section = el.closest("section[id], header[id], footer[id]");
    return section ? section.id : "pagina";
  }

  function textOf(el) {
    return (el.textContent || "").replace(/\s+/g, " ").trim().slice(0, 100);
  }

  document.addEventListener("click", function (e) {
    var a = e.target.closest("a[href]");
    if (!a) return;

    var url;
    try { url = new URL(a.href, location.href); } catch (err) { return; }
    var where = locationOf(a);

    // Botones principales
    if (a.hasAttribute("data-cta")) {
      send("cta_click", { cta_text: a.getAttribute("data-cta"), link_location: where });
    }

    // Contactos: WhatsApp (mailto: y tel: quedan cubiertos si se agregan)
    var method = null;
    if (url.hostname === "wa.me" || url.hostname === "api.whatsapp.com") method = "whatsapp";
    else if (url.protocol === "mailto:") method = "email";
    else if (url.protocol === "tel:") method = "phone";
    if (method) {
      send("contact_click", { method: method, link_location: where });
      return;
    }

    if (url.origin === location.origin) return;

    // Documentos del fabricante, URL sin extensión (/download/NNN/)
    if (url.hostname === "www.nmbsplicesleeve.com" && /^\/download\/\d+\/?$/.test(url.pathname)) {
      send("file_download", {
        file_name: url.pathname.replace(/^\/|\/$/g, ""),
        link_text: textOf(a),
        link_url: url.href,
        link_domain: url.hostname,
        link_location: where
      });
      return;
    }

    // Resto de links externos (reemplaza los clics salientes automáticos)
    send("outbound_click", {
      link_text: textOf(a),
      link_url: url.href,
      link_domain: url.hostname,
      link_location: where
    });
  });
})();
