# Canal Veterinario — Sitio Web

Sitio web para mostrar charlas en vivo y grabaciones de capacitación veterinaria.

## Cómo actualizar el contenido

**Solo editá el archivo `data.js`** — es el único que necesitás tocar para agregar charlas o grabaciones.

### Agregar una próxima charla

En el array `PROXIMAS_CHARLAS`, agregá un nuevo bloque:

```js
{
  id: 10,                          // número único, no repetir
  titulo: "Título de la charla",
  disertante: "Dr. Nombre Apellido",
  fecha: "2026-07-15",             // formato YYYY-MM-DD
  hora: "20:00",
  categoria: "pequeños-animales",  // ver lista de categorías abajo
  descripcion: "Descripción breve de qué trata la charla.",
  imagen: "https://...",           // URL de imagen (opcional)
  estado: "proximo",               // "proximo" o "en-vivo"
},
```

### Pasar una charla a grabación

Cuando una charla ya se dio, mové el bloque a `GRABACIONES` y cambiá el formato:

```js
{
  id: 10,
  titulo: "Título de la charla",
  disertante: "Dr. Nombre Apellido",
  fecha: "2026-07-15",
  categoria: "pequeños-animales",
  descripcion: "Descripción breve.",
  imagen: "https://...",
  duracion: "1h 45min",           // duración de la grabación
},
```

### Categorías disponibles

| id | Nombre |
|---|---|
| `pequeños-animales` | Pequeños animales |
| `bovinos` | Bovinos |
| `equinos` | Equinos |
| `aves` | Aves |
| `gestion` | Gestión |

Para agregar una categoría nueva, agregala en el array `CATEGORIAS` al final del `data.js`.

---

## Deploy

El sitio se despliega automáticamente en Firebase Hosting cuando pusheás a `main`.

### Setup inicial (una sola vez)

1. Instalá Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Creá un proyecto en [Firebase Console](https://console.firebase.google.com)
4. Reemplazá `TU-PROYECTO-FIREBASE` en `.firebaserc` y en `.github/workflows/deploy.yml`
5. Generá un Service Account en Firebase Console y agregalo como secret `FIREBASE_SERVICE_ACCOUNT` en GitHub
