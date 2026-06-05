// ── Estado ──────────────────────────────────────────────────
let categoriaActiva   = "todas";
let subcategoriaActiva = "todas";
let queryBusqueda     = "";
let ordenActivo       = "recientes"; // recientes | alfabetico | categoria

// Quita acentos/ñ y pasa a minúsculas (para buscar "viñas" con "vinas")
function normalizar(s) {
  return (s || "").toString()
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .toLowerCase().trim();
}

// IDs "nuevos": las últimas 12 charlas agregadas (mayores ids)
const NUEVOS_IDS = (typeof GRABACIONES !== "undefined")
  ? new Set([...GRABACIONES].map(g => g.id).sort((a,b)=>b-a).slice(0, 12))
  : new Set();

// ── Config ──────────────────────────────────────────────────
document.title = SITE_CONFIG.nombre;
document.getElementById("site-nombre").textContent    = SITE_CONFIG.nombre;
document.getElementById("site-subtitulo").textContent = SITE_CONFIG.subtitulo;
["btn-telegram","cta-telegram","footer-telegram"].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.href = SITE_CONFIG.telegramLink;
});
["btn-instagram","cta-instagram"].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.href = SITE_CONFIG.instagram;
});
document.getElementById("footer-nombre").textContent = SITE_CONFIG.nombre;

// WhatsApp (botón flotante + modal)
const waURL = `https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(SITE_CONFIG.whatsappMensaje || "")}`;
const waFloat = document.getElementById("whatsapp-float");
if (waFloat) waFloat.href = waURL;

// Link al formulario
const linkForm = document.getElementById("link-formulario");
if (linkForm) linkForm.href = SITE_CONFIG.formulario;

// Link "reportar error" (disclaimer del footer)
const linkReportar = document.getElementById("footer-reportar");
if (linkReportar) {
  const numReporte = SITE_CONFIG.whatsapp || SITE_CONFIG.contactoColaborador;
  linkReportar.href = `https://wa.me/${numReporte}?text=${encodeURIComponent("Hola! Encontré algo para corregir en el Canal Veterinario:")}`;
}

// ── Helpers ─────────────────────────────────────────────────
function formatFecha(iso) {
  if (!iso) return "";
  const [y,m,d] = iso.split("-");
  const ms = ["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"];
  return `${parseInt(d)} ${ms[parseInt(m)-1]}. ${y}`;
}

function nombreCategoria(id) {
  const c = CATEGORIAS.find(c => c.id === id);
  return c ? c.nombre : id;
}

function accentColor(cat) {
  const map = {
    "pequeños-animales": "var(--c-peq)",
    "bovinos":           "var(--c-bov)",
    "equinos":           "var(--c-equ)",
    "no-convencionales": "var(--c-noconv)",
  };
  return map[cat] || "var(--primary)";
}

// ── Stats bar ────────────────────────────────────────────────
function renderStats() {
  const total = GRABACIONES.length + PROXIMAS_CHARLAS.length;
  const porCat = {};
  GRABACIONES.forEach(g => { porCat[g.categoria] = (porCat[g.categoria]||0)+1; });

  const items = [
    `<span class="stat-item">🎬 <strong>${GRABACIONES.length}</strong> grabaciones</span>`,
    PROXIMAS_CHARLAS.length
      ? `<span class="stat-sep"></span><span class="stat-item">🎙️ <strong>${PROXIMAS_CHARLAS.length}</strong> próximas</span>`
      : "",
    SITE_CONFIG.comunidad
      ? `<span class="stat-sep"></span><span class="stat-item">👥 <strong>${SITE_CONFIG.comunidad}</strong> en la comunidad</span>`
      : "",
    `<span class="stat-sep"></span>`,
    ...CATEGORIAS.filter(c => c.id !== "todas" && porCat[c.id]).map(c =>
      `<span class="stat-item">${c.icono} <strong>${porCat[c.id]}</strong> ${c.nombre.toLowerCase()}</span><span class="stat-sep"></span>`
    ),
  ];
  document.getElementById("stats-inner").innerHTML = items.join("");
}

// ── Nav categorías ───────────────────────────────────────────
function renderCategorias() {
  const counts = {};
  GRABACIONES.forEach(g => { counts[g.categoria] = (counts[g.categoria]||0)+1; });

  document.getElementById("cats-nav").innerHTML = CATEGORIAS.map(cat => {
    const n = cat.id === "todas"
      ? GRABACIONES.length
      : (counts[cat.id] || 0);
    return `<button class="cat-btn${cat.id==='todas'?' active':''}"
      data-cat="${cat.id}" onclick="filtrar('${cat.id}')">
      ${cat.icono} ${cat.nombre} <span class="cat-count">(${n})</span>
    </button>`;
  }).join("");
}

// ── Nav subcategorías ────────────────────────────────────────
function renderSubcats() {
  const nav   = document.getElementById("subcats-nav");
  const inner = document.getElementById("subcats-inner");

  if (categoriaActiva === "todas") { nav.style.display = "none"; return; }

  const base = GRABACIONES.filter(g => g.categoria === categoriaActiva);
  const counts = {};
  base.forEach(g => { const s = g.subcategoria||"—"; counts[s]=(counts[s]||0)+1; });
  const lista = Object.entries(counts).sort(([a],[b]) => a.localeCompare(b,"es"));

  inner.innerHTML = [
    `<button class="subcat-btn${subcategoriaActiva==='todas'?' active':''}"
      onclick="filtrarSubcat('todas')">
      Todas <span class="subcat-count">${base.length}</span>
    </button>`,
    ...lista.map(([s,c]) =>
      `<button class="subcat-btn${subcategoriaActiva===s?' active':''}"
        onclick="filtrarSubcat('${s.replace(/'/g,"\\'").replace(/"/g,"&quot;")}')">
        ${s} <span class="subcat-count">${c}</span>
      </button>`
    ),
  ].join("");

  nav.style.display = "";
}

// ── Búsqueda ─────────────────────────────────────────────────
function buscar(q) {
  queryBusqueda = normalizar(q);
  const btn = document.getElementById("btn-clear");
  btn.style.display = q ? "flex" : "none";
  renderContenido();
}

function ordenar(criterio) {
  ordenActivo = criterio;
  document.querySelectorAll(".orden-btn").forEach(b =>
    b.classList.toggle("active", b.dataset.orden === criterio)
  );
  renderContenido();
}

function aplicarOrden(lista) {
  const arr = [...lista];
  if (ordenActivo === "alfabetico" || ordenActivo === "series") {
    arr.sort((a,b) => a.titulo.localeCompare(b.titulo, "es"));
  } else if (ordenActivo === "categoria") {
    arr.sort((a,b) => (a.categoria||"").localeCompare(b.categoria||"", "es")
                      || a.titulo.localeCompare(b.titulo, "es"));
  } else { // recientes: por id descendente
    arr.sort((a,b) => b.id - a.id);
  }
  return arr;
}

// Detecta "Parte N" al final del título y devuelve { base, parte } o null
function extraerSerie(titulo) {
  const m = titulo.match(/^(.+?)[\s.—–\-]+[Pp]arte\s*(\d+)\s*$/);
  if (m) return { base: m[1].trim(), parte: parseInt(m[2]) };
  // también formato "(Parte N)" al final
  const m2 = titulo.match(/^(.+?)\s*\([Pp]arte\s*(\d+)\)\s*$/);
  if (m2) return { base: m2[1].trim(), parte: parseInt(m2[2]) };
  return null;
}

// Agrupa charlas con "Parte N" bajo un objeto {_esSerie, charlas[]}
function agruparSeries(lista) {
  const result = [];
  const seriesMap = {};
  lista.forEach(g => {
    const info = extraerSerie(g.titulo);
    if (info) {
      const key = normalizar(info.base) + "|" + normalizar(g.disertante || "");
      if (!seriesMap[key]) {
        seriesMap[key] = { charlas: [], placeholder: result.length };
        result.push({ _serieKey: key });
      }
      seriesMap[key].charlas.push({ ...g, _parteNum: info.parte });
    } else {
      result.push(g);
    }
  });
  return result.map(item => {
    if (item._serieKey) {
      const s = seriesMap[item._serieKey];
      s.charlas.sort((a,b) => a._parteNum - b._parteNum);
      return { _esSerie: true, charlas: s.charlas };
    }
    return item;
  });
}

function cardSerie(serie, q) {
  const primera = serie.charlas[0];
  const info = extraerSerie(primera.titulo);
  const baseTitle = info ? highlight(info.base, q) : highlight(primera.titulo, q);
  const disert = highlight(primera.disertante || "", q);

  const img = primera.imagen
    ? `<img class="card-img" src="${primera.imagen}" alt="${primera.titulo}" loading="lazy" onerror="this.outerHTML='<div class=\\'card-placeholder\\'>🎬</div>'">`
    : `<div class="card-placeholder">🎬</div>`;

  const partes = serie.charlas.map(c => {
    const tEsc = c.titulo.replace(/'/g,"\\'").replace(/"/g,"&quot;");
    const dEsc = (c.disertante||"").replace(/'/g,"\\'").replace(/"/g,"&quot;");
    return `<a href="${SITE_CONFIG.formulario}" target="_blank" class="btn-parte"
      onclick="event.stopPropagation()">Parte ${c._parteNum}</a>`;
  }).join("");

  const tituloEsc = (info ? info.base : primera.titulo).replace(/'/g,"\\'").replace(/"/g,"&quot;");
  const disertEsc = (primera.disertante||"").replace(/'/g,"\\'").replace(/"/g,"&quot;");

  return `<div class="card card-serie" data-cat="${primera.categoria}">
    ${img}
    <div class="card-body">
      <div class="card-badges">
        <span class="badge-serie">📚 ${serie.charlas.length} partes</span>
        <span class="badge-cat">${nombreCategoria(primera.categoria)}</span>
        ${primera.subcategoria ? `<span class="badge-subcat">${primera.subcategoria}</span>` : ""}
      </div>
      <div class="card-title">${baseTitle}</div>
      <div class="card-disertante">👤 ${disert}</div>
      <div class="serie-partes">${partes}</div>
      <div class="card-meta">
        <button class="btn-compartir" onclick="compartirCharla('${tituloEsc}','${disertEsc}')">📤 Compartir</button>
      </div>
    </div>
  </div>`;
}

// Compartir una charla con un colega por WhatsApp
function compartirCharla(titulo, disertante) {
  const txt = `👋 ¡Hola! Te comparto esta charla del Canal Veterinario, te puede interesar:\n\n📺 "${titulo}"${disertante ? `\n👤 ${disertante}` : ""}\n\nMirá todas las charlas acá 👉 ${location.origin}`;
  window.open(`https://wa.me/?text=${encodeURIComponent(txt)}`, "_blank");
}

function limpiarBusqueda() {
  document.getElementById("search-input").value = "";
  buscar("");
}

// ── Buscador flotante (overlay) ──────────────────────────────
function contarResultados() {
  const q = queryBusqueda;
  const prox = PROXIMAS_CHARLAS.filter(c =>
    (categoriaActiva === "todas" || c.categoria === categoriaActiva) &&
    (!q || [c.titulo, c.disertante, c.subcategoria||""].join(" ").toLowerCase().includes(q))
  ).length;
  const grab = GRABACIONES.filter(g =>
    (categoriaActiva === "todas" || g.categoria === categoriaActiva) &&
    (subcategoriaActiva === "todas" || g.subcategoria === subcategoriaActiva) &&
    (!q || [g.titulo, g.disertante, g.subcategoria||"", g.descripcion||""].join(" ").toLowerCase().includes(q))
  ).length;
  return prox + grab;
}

function renderOverlayCats() {
  const counts = {};
  GRABACIONES.forEach(g => { counts[g.categoria] = (counts[g.categoria]||0)+1; });
  document.getElementById("search-overlay-cats").innerHTML = CATEGORIAS.map(cat => {
    const n = cat.id === "todas" ? GRABACIONES.length : (counts[cat.id] || 0);
    return `<button class="cat-btn${cat.id===categoriaActiva?' active':''}"
      data-cat="${cat.id}" onclick="filtrarDesdeOverlay('${cat.id}')">
      ${cat.icono} ${cat.nombre} <span class="cat-count">(${n})</span>
    </button>`;
  }).join("");
}

function actualizarOverlayCount() {
  const n = contarResultados();
  document.getElementById("search-overlay-count").textContent =
    n === 0 ? "Sin resultados" : `${n} resultado${n===1?"":"s"}`;
}

function abrirBuscador() {
  renderOverlayCats();
  actualizarOverlayCount();
  const ov = document.getElementById("search-overlay");
  ov.classList.add("show");
  const input = document.getElementById("search-overlay-input");
  input.value = queryBusqueda;
  setTimeout(() => input.focus(), 50);
}

function cerrarBuscador(verResultados) {
  document.getElementById("search-overlay").classList.remove("show");
  if (verResultados) {
    document.querySelector(".search-section")?.scrollIntoView({ behavior:"smooth", block:"start" });
  }
}

function buscarOverlay(q) {
  // mantener sincronizado con el buscador principal
  const main = document.getElementById("search-input");
  if (main) { main.value = q; }
  buscar(q);
  actualizarOverlayCount();
}

function filtrarDesdeOverlay(catId) {
  filtrar(catId);
  renderOverlayCats();
  actualizarOverlayCount();
}

// Cerrar overlay al clickear fuera o con Escape
document.getElementById("search-overlay")?.addEventListener("click", e => {
  if (e.target.id === "search-overlay") cerrarBuscador();
});
document.addEventListener("keydown", e => {
  if (e.key === "Escape") cerrarBuscador();
});

// ── Publicidad full-screen (interstitial) ────────────────────
let adTimer = null;
function cerrarAd() {
  const ov = document.getElementById("ad-overlay");
  if (ov) ov.classList.remove("show");
  if (adTimer) clearTimeout(adTimer);
}

function iniciarAd() {
  const c = SITE_CONFIG;
  if (!c.sponsorNombre) return;
  // Mostrar una vez por sesión
  if (sessionStorage.getItem("adShown")) return;

  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  set("ad-nombre", c.sponsorNombre);
  set("ad-slogan", c.sponsorSlogan || "");
  set("ad-dir", c.sponsorDir || "");
  const cta = document.getElementById("ad-cta");
  if (cta && c.sponsorWA) cta.href = `https://wa.me/${c.sponsorWA}`;

  const segundos = c.adSegundos || 6;
  setTimeout(() => {
    const ov = document.getElementById("ad-overlay");
    if (!ov) return;
    ov.classList.add("show");
    sessionStorage.setItem("adShown", "1");
    const bar = document.getElementById("ad-progress-bar");
    if (bar) { bar.style.animationDuration = segundos + "s"; bar.classList.add("run"); }
    adTimer = setTimeout(cerrarAd, segundos * 1000);
  }, 1200);
}

function highlight(text, q) {
  if (!q) return text;
  const re = new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")})`, "gi");
  return text.replace(re, "<mark>$1</mark>");
}

// ── Cards ────────────────────────────────────────────────────
function cardCharla(c, q) {
  const estadoBadge = c.estado === "en-vivo"
    ? `<span class="badge-live">🔴 En vivo</span>`
    : `<span class="badge-proximo">📅 Próxima</span>`;

  const img = c.imagen
    ? `<img class="card-img" src="${c.imagen}" alt="${c.titulo}" loading="lazy" onerror="this.outerHTML='<div class=\\'card-placeholder\\'>🎙️</div>'">`
    : `<div class="card-placeholder">🎙️</div>`;

  const titulo   = highlight(c.titulo,   q);
  const disert   = highlight(c.disertante, q);

  return `<div class="card" data-cat="${c.categoria}">
    ${img}
    <div class="card-body">
      <div class="card-badges">
        ${estadoBadge}
        <span class="badge-cat">${nombreCategoria(c.categoria)}</span>
        ${c.subcategoria ? `<span class="badge-subcat">${c.subcategoria}</span>` : ""}
      </div>
      <div class="card-title">${titulo}</div>
      <div class="card-disertante">👤 ${disert}</div>
      ${c.descripcion ? `<div class="card-desc">${c.descripcion}</div>` : ""}
      <div class="card-meta">
        ${c.fecha ? `<span class="card-date">📅 ${formatFecha(c.fecha)}${c.hora ? ` · ${c.hora} hs` : ""}</span>` : ""}
      </div>
      <a href="${SITE_CONFIG.telegramLink}" target="_blank" class="btn-card">Ver en Telegram →</a>
    </div>
  </div>`;
}

function cardGrabacion(g, q) {
  const img = g.imagen
    ? `<img class="card-img" src="${g.imagen}" alt="${g.titulo}" loading="lazy" onerror="this.outerHTML='<div class=\\'card-placeholder\\'>🎬</div>'">`
    : `<div class="card-placeholder">🎬</div>`;

  const titulo = highlight(g.titulo,    q);
  const disert = highlight(g.disertante, q);
  const nuevoBadge = NUEVOS_IDS.has(g.id) ? `<span class="badge-nuevo">✨ Nuevo</span>` : "";
  const tituloEsc = g.titulo.replace(/'/g,"\\'").replace(/"/g,"&quot;");
  const disertEsc = (g.disertante||"").replace(/'/g,"\\'").replace(/"/g,"&quot;");

  return `<div class="card" data-cat="${g.categoria}">
    ${img}
    <div class="card-body">
      <div class="card-badges">
        ${nuevoBadge}
        <span class="badge-cat">${nombreCategoria(g.categoria)}</span>
        ${g.subcategoria ? `<span class="badge-subcat">${g.subcategoria}</span>` : ""}
      </div>
      <div class="card-title">${titulo}</div>
      <div class="card-disertante">👤 ${disert}</div>
      ${g.descripcion ? `<div class="card-desc">${g.descripcion}</div>` : ""}
      <div class="card-meta">
        ${g.fecha ? `<span class="card-date">📅 ${formatFecha(g.fecha)}</span>` : ""}
        ${g.duracion ? `<span class="card-duration">⏱ ${g.duracion}</span>` : ""}
        <button class="btn-compartir" title="Compartir con un colega" onclick="compartirCharla('${tituloEsc}','${disertEsc}')">📤 Compartir</button>
      </div>
      <a href="${SITE_CONFIG.formulario}" target="_blank" class="btn-card">Ver grabación →</a>
    </div>
  </div>`;
}

// ── Render principal ──────────────────────────────────────────
function renderContenido() {
  const q = queryBusqueda;

  // Filtrar próximas
  const proxFilt = PROXIMAS_CHARLAS.filter(c => {
    if (categoriaActiva !== "todas" && c.categoria !== categoriaActiva) return false;
    if (q) {
      const hay = normalizar([c.titulo, c.disertante, c.subcategoria||""].join(" "));
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  // Filtrar grabaciones
  let grabFilt = GRABACIONES.filter(g => {
    if (categoriaActiva !== "todas" && g.categoria !== categoriaActiva) return false;
    if (subcategoriaActiva !== "todas" && g.subcategoria !== subcategoriaActiva) return false;
    if (q) {
      const hay = normalizar([g.titulo, g.disertante, g.subcategoria||"", g.descripcion||""].join(" "));
      if (!hay.includes(q)) return false;
    }
    return true;
  });
  grabFilt = aplicarOrden(grabFilt);

  // Badges de conteo
  document.getElementById("badge-charlas").textContent = proxFilt.length;
  document.getElementById("badge-grabs").textContent   = grabFilt.length;

  // Título sección próximas (con mes actual si hay charlas)
  if (proxFilt.length && proxFilt[0].fecha) {
    const [y,m] = proxFilt[0].fecha.split("-");
    const meses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
    document.getElementById("titulo-proximas").textContent = `Charlas de ${meses[parseInt(m)-1]} ${y}`;
  } else {
    document.getElementById("titulo-proximas").textContent = "Próximas charlas en vivo";
  }

  // Grid próximas
  document.getElementById("grid-charlas").innerHTML = proxFilt.length
    ? proxFilt.map(c => cardCharla(c, q)).join("")
    : `<div class="empty-state">
        <div class="icon">🗓️</div>
        <p>Las charlas del próximo mes se publican al inicio de cada mes.</p>
       </div>`;

  // Grid grabaciones — agrupado por subcategoría (si hay categoría seleccionada y sin búsqueda)
  const agrupar = !q && categoriaActiva !== "todas" && subcategoriaActiva === "todas";

  if (!grabFilt.length) {
    document.getElementById("grid-grabaciones").innerHTML =
      `<div class="empty-state"><div class="icon">📭</div>
       <p>${q ? `No se encontraron resultados para "<strong>${q}</strong>"` : "No hay grabaciones en esta sección."}</p>
       </div>`;
  } else if (ordenActivo === "series") {
    const agrupadas = agruparSeries(grabFilt);
    document.getElementById("grid-grabaciones").innerHTML =
      `<div class="cards-grid">${agrupadas.map(item => item._esSerie ? cardSerie(item, q) : cardGrabacion(item, q)).join("")}</div>`;
  } else if (agrupar) {
    // Agrupar por subcategoría
    const grupos = {};
    grabFilt.forEach(g => {
      const k = g.subcategoria || "General";
      if (!grupos[k]) grupos[k] = [];
      grupos[k].push(g);
    });
    const html = Object.entries(grupos)
      .sort(([a],[b]) => a.localeCompare(b,"es"))
      .map(([subcat, items]) => `
        <div class="subcat-group">
          <div class="subcat-group-title">
            ${subcat}
            <span class="badge">${items.length}</span>
          </div>
          <div class="subcat-grid">${items.map(g => cardGrabacion(g,q)).join("")}</div>
        </div>
      `).join("");
    document.getElementById("grid-grabaciones").innerHTML = html;
  } else {
    document.getElementById("grid-grabaciones").innerHTML =
      `<div class="cards-grid">${grabFilt.map(g => cardGrabacion(g,q)).join("")}</div>`;
  }

  // Info de búsqueda
  const info = document.getElementById("search-info");
  if (q) {
    const total = proxFilt.length + grabFilt.length;
    info.innerHTML = total
      ? `✅ ${total} resultado${total!==1?"s":""} para "<strong>${q}</strong>"`
      : `😕 Sin resultados para "<strong>${q}</strong>" — intentá con otro término`;
    info.style.display = "";
  } else {
    info.style.display = "none";
  }
}

// ── Filtros ──────────────────────────────────────────────────
function filtrar(cat) {
  categoriaActiva    = cat;
  subcategoriaActiva = "todas";
  document.querySelectorAll(".cat-btn").forEach(b =>
    b.classList.toggle("active", b.dataset.cat === cat)
  );
  renderSubcats();
  renderContenido();
}

function filtrarSubcat(subcat) {
  subcategoriaActiva = subcat;
  document.querySelectorAll(".subcat-btn").forEach(b =>
    b.classList.toggle("active", b.textContent.trim().startsWith(subcat === "todas" ? "Todas" : subcat))
  );
  renderContenido();
}

// ── Estilos de highlight ──────────────────────────────────────
const markStyle = document.createElement("style");
markStyle.textContent = "mark { background:#fde047; color:#1a0533; border-radius:2px; padding:0 2px; }";
document.head.appendChild(markStyle);

// ── Planes de suscripción ────────────────────────────────────
function renderPlanes() {
  const grid = document.getElementById("planes-grid");
  if (!grid || typeof PLANES === "undefined") return;

  grid.innerHTML = PLANES.map(p => `
    <div class="plan-card${p.destacado ? " destacado" : ""}">
      ${p.destacado ? `<div class="plan-ribbon">⭐ Más elegido</div>` : ""}
      <div class="plan-nombre">${p.nombre}${p.destacado ? ' <span class="star">⭐</span>' : ""}</div>
      <div class="plan-ideal">${p.ideal || ""}</div>
      <div class="plan-precios">
        <span class="plan-precio-ars">$${p.precioARS} <small>ARS/mes</small></span>
        ${p.precioUSD ? `<span class="plan-precio-usd">o ${p.precioUSD} USD</span>` : ""}
      </div>
      <ul class="plan-beneficios">
        ${p.beneficios.map(b => `<li>${b}</li>`).join("")}
      </ul>
      <div class="plan-pago-label">💳 Pagar en pesos (Argentina)</div>
      <div class="plan-btns">
        <a href="${p.linkMercadoPago}" target="_blank" class="btn btn-mp">Suscribirme con MercadoPago</a>
      </div>
      <div class="plan-btns-divider">— o —</div>
      <div class="plan-pago-label">🌎 Pagar en dólares (exterior)</div>
      <div class="plan-btns">
        <a href="${p.linkPayPal}" target="_blank" class="btn btn-paypal">Suscribirme con PayPal</a>
      </div>
    </div>
  `).join("");
}

// ── Modal de suscripción ──────────────────────────────────────
function renderModalBtns() {
  const cont = document.getElementById("modal-btns");
  if (!cont) return;
  cont.innerHTML = `
    <a href="#planes" class="btn btn-suscribirse" onclick="cerrarModal()">⭐ Ver planes y suscribirme</a>
    <a href="${waURL}" target="_blank" class="btn btn-wa-modal" style="background:#25D366;color:white">💬 Consultar por WhatsApp</a>
  `;
}

let modalYaMostrado = false;
function abrirModal() {
  const m = document.getElementById("modal-suscripcion");
  if (m) m.classList.add("show");
}
function cerrarModal() {
  const m = document.getElementById("modal-suscripcion");
  if (m) m.classList.remove("show");
}
// Cerrar al clickear fuera de la caja
document.getElementById("modal-suscripcion")?.addEventListener("click", e => {
  if (e.target.id === "modal-suscripcion") cerrarModal();
});

function iniciarPopup() {
  const seg = SITE_CONFIG.popupCadaSegundos;
  if (!seg || seg <= 0) return;
  // Primera aparición tras el intervalo; luego se repite
  setInterval(() => {
    // No reabrir si ya está abierto
    const m = document.getElementById("modal-suscripcion");
    if (m && !m.classList.contains("show")) abrirModal();
  }, seg * 1000);
}

function renderBanners() {
  const c = SITE_CONFIG;
  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  const href = (id, url) => { const el = document.getElementById(id); if (el) el.href = url; };

  set("sponsor-nombre", c.sponsorNombre || "");
  set("sponsor-slogan", c.sponsorSlogan || "");
  set("sponsor-wa-txt", c.sponsorTel || "");
  set("sponsor-dir", c.sponsorDir || "");
  href("sponsor-wa-link", `https://wa.me/${c.sponsorWA}`);

  // Banner rotativo: alterna entre "sumate como sponsor" y "dar una charla"
  const mensajes = [
    {
      icono: "🤝",
      texto: '¿Tu empresa quiere llegar a veterinarios? <strong>Sumate como sponsor</strong>',
      link: `https://wa.me/${c.contactoSponsor}?text=${encodeURIComponent("Hola! Me interesa ser sponsor del Canal Veterinario")}`,
    },
    {
      icono: "🎙️",
      texto: '¿Querés dar una charla? <strong>Sumate como colaborador</strong>',
      link: `https://wa.me/${c.contactoColaborador}?text=${encodeURIComponent("Hola! Me gustaría dar una charla en el Canal Veterinario")}`,
    },
  ];
  let idx = 0;
  function pintarJoin() {
    const m = mensajes[idx];
    set("join-icon", m.icono);
    const t = document.getElementById("join-text"); if (t) t.innerHTML = m.texto;
    href("join-wa", m.link);
  }
  pintarJoin();
  setInterval(() => { idx = (idx + 1) % mensajes.length; pintarJoin(); }, 6000);
}

// ── Init ─────────────────────────────────────────────────────
renderStats();
renderCategorias();
renderContenido();
renderPlanes();
renderModalBtns();
renderBanners();
iniciarPopup();
iniciarAd();

// ── Ruleta de descuento ──────────────────────────────────────
(function() {
  const LINK_PROMO = "https://www.mercadopago.com.ar/subscriptions/checkout?preapproval_plan_id=31d611ed008f472abe503145c9f9333f";
  const SEGS = [
    { label:"15% OFF",   color:"#c026d3", texto:"#fff" },
    { label:"¡Suerte!",  color:"#7e22ce", texto:"#d8b4fe" },
    { label:"15% OFF",   color:"#a21caf", texto:"#fff" },
    { label:"¡Girá!",    color:"#6b21a8", texto:"#d8b4fe" },
    { label:"15% OFF",   color:"#c026d3", texto:"#fff" },
    { label:"¡Casi!",    color:"#7e22ce", texto:"#d8b4fe" },
    { label:"15% OFF",   color:"#a21caf", texto:"#fff" },
    { label:"¡Oh!",      color:"#6b21a8", texto:"#d8b4fe" },
  ];
  let rotRad = 0, girando = false;

  function draw(rot) {
    const canvas = document.getElementById("ruleta-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const cx = canvas.width / 2, cy = canvas.height / 2, r = cx - 4;
    const n = SEGS.length, angSeg = (2 * Math.PI) / n;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rot);
    SEGS.forEach((seg, i) => {
      const a0 = i * angSeg - Math.PI / 2;
      const a1 = a0 + angSeg;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, r, a0, a1);
      ctx.closePath();
      ctx.fillStyle = seg.color;
      ctx.fill();
      ctx.strokeStyle = "#1a0533";
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.save();
      ctx.rotate(a0 + angSeg / 2);
      ctx.textAlign = "right";
      ctx.fillStyle = seg.texto;
      ctx.font = "bold 12px 'League Spartan', sans-serif";
      ctx.fillText(seg.label, r - 8, 5);
      ctx.restore();
    });
    // centro
    ctx.beginPath();
    ctx.arc(0, 0, 16, 0, 2 * Math.PI);
    ctx.fillStyle = "#fdf4ff"; ctx.fill();
    ctx.strokeStyle = "#1a0533"; ctx.lineWidth = 2; ctx.stroke();
    ctx.restore();
  }

  window.abrirRuleta = function() {
    const ov = document.getElementById("ruleta-overlay");
    if (ov) { ov.classList.add("show"); draw(rotRad); }
  };
  window.cerrarRuleta = function() {
    document.getElementById("ruleta-overlay")?.classList.remove("show");
  };
  window.cerrarPremio = function() {
    document.getElementById("ruleta-premio")?.classList.remove("show");
    // actualizar link en planes también
  };

  window.girarRuleta = function() {
    if (girando) return;
    girando = true;
    const btn = document.getElementById("ruleta-btn");
    if (btn) btn.disabled = true;
    // Siempre aterrizar en segmento 0 (15% OFF)
    // Centro del seg 0: -90° + 22.5° = -67.5° → necesita que rot final sea 67.5°
    const targetDeg = 67.5;
    const spins = 6;
    const finalDeg = spins * 360 + targetDeg - ((rotRad * 180 / Math.PI) % 360);
    const finalRad = rotRad + (finalDeg * Math.PI / 180);
    const start = performance.now();
    const dur = 4200;
    const fromRot = rotRad;

    function frame(now) {
      const t = Math.min((now - start) / dur, 1);
      const ease = 1 - Math.pow(1 - t, 4);
      rotRad = fromRot + (finalRad - fromRot) * ease;
      draw(rotRad);
      if (t < 1) { requestAnimationFrame(frame); }
      else {
        rotRad = finalRad;
        girando = false;
        setTimeout(() => {
          cerrarRuleta();
          document.getElementById("ruleta-premio")?.classList.add("show");
        }, 600);
      }
    }
    requestAnimationFrame(frame);
  };

  // Abrir automáticamente una vez por sesión (después de 14 seg)
  if (!sessionStorage.getItem("ruletaMostrada")) {
    setTimeout(() => {
      if (!sessionStorage.getItem("ruletaMostrada")) {
        sessionStorage.setItem("ruletaMostrada", "1");
        window.abrirRuleta();
      }
    }, 14000);
  }
})();
