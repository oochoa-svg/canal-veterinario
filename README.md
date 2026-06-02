# Canal Veterinario — Sitio Web

Sitio de charlas en vivo y grabaciones de capacitación veterinaria.
Live: **https://canalvet.web.app**

---

## ✨ Cómo actualizar el sitio (lo más importante)

**No necesitás Cloud Shell, ni Firebase CLI, ni comandos.** El sitio se publica solo.

1. Editás el archivo **`data.js`** (en GitHub.com → ícono del lápiz ✏️ → editás → "Commit changes").
2. GitHub Actions detecta el cambio y **publica el sitio solo en 1-2 minutos**.
3. Listo. Entrás a canalvet.web.app y ya está actualizado.

> ⚠️ **Nunca toques `.github/workflows/deploy.yml`.** Ese archivo es el que dispara el
> deploy automático y es sensible a los espacios/indentación. Si se rompe, el sitio
> deja de publicarse y hay que arreglarlo a mano.

`data.js` es **el único archivo** que necesitás tocar para el día a día. Adentro tiene
instrucciones comentadas arriba de todo.

---

## Tareas comunes

### Agregar una próxima charla en vivo
En el array `PROXIMAS_CHARLAS` agregá:
```js
{
  titulo: "Nombre de la charla",
  disertante: "Nombre Apellido",
  fecha: "2026-07-15",            // YYYY-MM-DD (o "" para no mostrar fecha)
  dia: "Lunes 15 de julio",
  hora: "",
  categoria: "pequeños-animales",
},
```

### Pasar una charla dada a grabaciones
Borrala de `PROXIMAS_CHARLAS` y agregala en `GRABACIONES` con un `id` nuevo
(el próximo libre es **143**):
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
Todo está en `SITE_CONFIG`, arriba de todo en `data.js`.

### Categorías disponibles
| id | Nombre |
|---|---|
| `pequeños-animales` | Pequeños animales |
| `bovinos` | Bovinos |
| `equinos` | Equinos |
| `no-convencionales` | No convencionales |

Para agregar una categoría nueva, editá el array `CATEGORIAS` (al final de `data.js`).

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

## Cómo funciona el deploy (para entender, no hace falta tocar nada)

```
Editás data.js en GitHub  →  push a main  →  GitHub Actions corre  →  Firebase publica
                                                                         ↓
                                                              canalvet.web.app actualizado
```

El proyecto de Firebase es `canal-veterinario-live`. La credencial está guardada como
secret `FIREBASE_SERVICE_ACCOUNT` en GitHub (Settings → Secrets → Actions). Ya está
configurada, no hay que volver a tocarla.

Para montar un proyecto NUEVO igual a este desde cero, mirá **`GUIA-NUEVO-PROYECTO.md`**.
