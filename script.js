// ── Estado ──────────────────────────────────────────────────
let categoriaActiva   = "todas";
let subcategoriaActiva = "todas";
let queryBusqueda     = "";

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
  queryBusqueda = q.toLowerCase().trim();
  const btn = document.getElementById("btn-clear");
  btn.style.display = q ? "flex" : "none";
  renderContenido();
}

function limpiarBusqueda() {
  document.getElementById("search-input").value = "";
  buscar("");
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
    ? `<img class="card-img" src="${c.imagen}" alt="${c.titulo}" loading="lazy" onerror="this.style.display='none'">`
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
    ? `<img class="card-img" src="${g.imagen}" alt="${g.titulo}" loading="lazy" onerror="this.style.display='none'">`
    : `<div class="card-placeholder">🎬</div>`;

  const titulo = highlight(g.titulo,    q);
  const disert = highlight(g.disertante, q);

  return `<div class="card" data-cat="${g.categoria}">
    ${img}
    <div class="card-body">
      <div class="card-badges">
        <span class="badge-cat">${nombreCategoria(g.categoria)}</span>
        ${g.subcategoria ? `<span class="badge-subcat">${g.subcategoria}</span>` : ""}
      </div>
      <div class="card-title">${titulo}</div>
      <div class="card-disertante">👤 ${disert}</div>
      ${g.descripcion ? `<div class="card-desc">${g.descripcion}</div>` : ""}
      <div class="card-meta">
        ${g.fecha ? `<span class="card-date">📅 ${formatFecha(g.fecha)}</span>` : ""}
        ${g.duracion ? `<span class="card-duration">⏱ ${g.duracion}</span>` : ""}
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
      const hay = [c.titulo, c.disertante, c.subcategoria||""].join(" ").toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  // Filtrar grabaciones
  const grabFilt = GRABACIONES.filter(g => {
    if (categoriaActiva !== "todas" && g.categoria !== categoriaActiva) return false;
    if (subcategoriaActiva !== "todas" && g.subcategoria !== subcategoriaActiva) return false;
    if (q) {
      const hay = [g.titulo, g.disertante, g.subcategoria||"", g.descripcion||""].join(" ").toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });

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

// ── Init ─────────────────────────────────────────────────────
renderStats();
renderCategorias();
renderContenido();
renderPlanes();
renderModalBtns();
iniciarPopup();
