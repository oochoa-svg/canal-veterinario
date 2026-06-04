// ============================================================
// Google Analytics 4 — métricas gratis
// Se activa solo si SITE_CONFIG.analyticsId tiene un código (G-XXXXXXX).
// Trackea: páginas vistas, búsquedas, filtros de categoría y clics en charlas.
// ============================================================
(function () {
  const GA_ID = (typeof SITE_CONFIG !== "undefined" && SITE_CONFIG.analyticsId) || "";

  // Si no hay ID configurado, no hace nada (no rompe el sitio).
  if (!GA_ID) {
    window.trackEvent = function () {}; // no-op
    return;
  }

  // Cargar el script de gtag
  const s = document.createElement("script");
  s.async = true;
  s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag("js", new Date());
  gtag("config", GA_ID);

  // Helper global para registrar eventos personalizados
  window.trackEvent = function (nombre, params) {
    gtag("event", nombre, params || {});
  };

  // ── Búsquedas (con debounce para no contar cada tecla) ──
  let tBusqueda = null;
  function registrarBusqueda(termino) {
    if (!termino || termino.trim().length < 3) return;
    clearTimeout(tBusqueda);
    tBusqueda = setTimeout(() => {
      window.trackEvent("search", { search_term: termino.trim().toLowerCase() });
    }, 1200);
  }
  ["search-input", "search-overlay-input"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("input", e => registrarBusqueda(e.target.value));
  });

  // ── Clics en categorías y en charlas (delegación) ──
  document.addEventListener("click", e => {
    const cat = e.target.closest(".cat-btn");
    if (cat) {
      window.trackEvent("select_category", { category: cat.dataset.cat || cat.textContent.trim() });
      return;
    }
    const btn = e.target.closest(".btn-card");
    if (btn) {
      const card = btn.closest(".card");
      const titulo = card ? (card.querySelector(".card-title")?.textContent.trim() || "") : "";
      window.trackEvent("select_charla", { charla: titulo, destino: btn.textContent.trim() });
    }
  });
})();
