# Canal Veterinario — Sitio Web

Sitio de charlas en vivo y grabaciones de capacitación veterinaria.
Live: **https://canalvet.web.app**

---

## ✨ Cómo actualizar el sitio (no necesitás Cloud Shell)

1. Editás **`data.js`** (en GitHub.com → ícono lápiz ✏️ → "Commit changes").
2. GitHub Actions publica el sitio **solo en 1-2 minutos**.
3. Listo.

> ⚠️ **Nunca toques `.github/workflows/deploy.yml`.** Es sensible a la indentación.

---

## Tareas comunes

### Agregar una próxima charla en vivo
En el array `PROXIMAS_CHARLAS` agregá:
```js
{
  titulo: "Nombre de la charla",
  disertante: "Nombre Apellido",
  fecha: "2026-07-15",            // YYYY-MM-DD (o "" para no mostrar)
  dia: "Lunes 15 de julio",
  hora: "",
  categoria: "pequeños-animales", // pequeños-animales | bovinos | equinos | no-convencionales
},
```

### Pasar una charla dada a grabaciones
Borrala de `PROXIMAS_CHARLAS` y agregala en `GRABACIONES` con `id` nuevo (próximo libre: **143**):
```js
{
  id: 143,
  titulo: "Nombre de la charla",
  disertante: "Nombre Apellido",
  fecha: "",
  categoria: "pequeños-animales",
  subcategoria: "Neurología",
  descripcion: "",
  imagen: "",
  duracion: "",
},
```

### Cambiar WhatsApp, sponsor, links, etc.
Todo está en `SITE_CONFIG`, al principio de `data.js`.

### Categorías disponibles
| id | Nombre |
|---|---|
| `pequeños-animales` | Pequeños animales |
| `bovinos` | Bovinos |
| `equinos` | Equinos |
| `no-convencionales` | No convencionales |

---

## Archivos del proyecto

| Archivo | Qué hace | ¿Lo tocás? |
|---|---|---|
| `data.js` | Todo el contenido: charlas, planes, sponsor, config | **Sí, siempre** |
| `index.html` | Estructura de la página | Rara vez |
| `style.css` | Estilos (tema violeta oscuro) | Rara vez |
| `script.js` | Lógica: buscador, filtros, banners, popup | Rara vez |
| `firebase.json` / `.firebaserc` | Config de Firebase Hosting | Solo en el setup |
| `.github/workflows/deploy.yml` | Deploy automático | **Nunca** |

---

## Cómo funciona el deploy

```
Editás data.js en GitHub → push a main → GitHub Actions → Firebase publica
                                                           ↓
                                                canalvet.web.app actualizado
```

Proyecto Firebase: `canal-veterinario-live`. Secret ya configurado: `FIREBASE_SERVICE_ACCOUNT`.
Para montar un proyecto nuevo igual, mirá `GUIA-NUEVO-PROYECTO.md`.
