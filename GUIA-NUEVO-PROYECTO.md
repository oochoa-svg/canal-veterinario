# Guía: montar un sitio nuevo con deploy automático (como Canal Veterinario)

Esta guía sirve para dos cosas:
- **Para vos:** tener todos los pasos de cómo se arma un proyecto igual a este.
- **Para Claude:** si en una sesión nueva decís *"armame un proyecto como Canal
  Veterinario"* o *"configurá el deploy automático como en la guía"*, Claude sabe
  exactamente qué hacer leyendo este archivo.

El objetivo final siempre es el mismo:
> **Editás un archivo en GitHub → el sitio se publica solo en 1-2 minutos.
> Cero Cloud Shell, cero comandos a mano.**

---

## Qué es este tipo de proyecto

- Sitio **estático**: HTML + CSS + JavaScript puro (sin frameworks, sin build).
- Hosting: **Firebase Hosting** (gratis, plan Spark).
- Deploy: **automático** vía **GitHub Actions** al hacer push a `main`.
- Todo el contenido editable vive en **un solo archivo** `data.js`.

---

## Pasos para crear uno nuevo desde cero

### 1. Repositorio en GitHub
- Crear un repo nuevo (ej: `mi-proyecto`).
- Subir los archivos del sitio: `index.html`, `style.css`, `script.js`, `data.js`.

### 2. Proyecto en Firebase
- Entrar a https://console.firebase.google.com → "Agregar proyecto".
- Anotar el **Project ID** (ej: `mi-proyecto-live`).
- Activar **Hosting**.

### 3. Archivos de configuración de Firebase
**`.firebaserc`** (apunta al Project ID):
```json
{
  "projects": {
    "default": "mi-proyecto-live"
  }
}
```

**`firebase.json`** (qué subir y qué ignorar):
```json
{
  "hosting": {
    "public": ".",
    "ignore": [
      "firebase.json",
      ".firebaserc",
      ".github/**",
      "README.md",
      "**/.git/**",
      "node_modules/**"
    ],
    "rewrites": [
      { "source": "**", "destination": "/index.html" }
    ]
  }
}
```

### 4. El workflow de deploy automático
Crear el archivo **`.github/workflows/deploy.yml`** con ESTE contenido EXACTO.
La indentación importa muchísimo — son 2 espacios por nivel, sin tabs:

```yaml
name: Deploy to Firebase Hosting

on:
  push:
    branches:
      - main

jobs:
  build_and_deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Deploy to Firebase Hosting
        uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: ${{ secrets.GITHUB_TOKEN }}
          firebaseServiceAccount: ${{ secrets.FIREBASE_SERVICE_ACCOUNT }}
          channelId: live
          projectId: mi-proyecto-live
```
> Cambiá `mi-proyecto-live` por tu Project ID real.

### 5. La credencial (secret) — el paso clave
GitHub necesita permiso para publicar en tu Firebase. Hay dos formas:

**Forma A — automática (recomendada, una sola vez):**
En tu compu o en Cloud Shell, dentro de la carpeta del proyecto:
```bash
firebase login
firebase init hosting:github
```
Ese comando crea la credencial y la guarda sola como secret
`FIREBASE_SERVICE_ACCOUNT` en el repo de GitHub. (Cuando pregunte si querés
sobrescribir `firebase.json` o el workflow, respondé **No**.)

**Forma B — manual:**
1. Firebase Console → ⚙️ Configuración → Cuentas de servicio → "Generar nueva clave privada" → descarga un `.json`.
2. GitHub → repo → Settings → Secrets and variables → Actions → "New repository secret".
3. Nombre: `FIREBASE_SERVICE_ACCOUNT`. Valor: pegás TODO el contenido del `.json`.

### 6. Listo
A partir de acá, cada push a `main` publica el sitio solo.

---

## ⚠️ Errores que YA nos pasaron (y cómo evitarlos)

### "Executable files are forbidden on the Spark billing plan" / "found 2850 files"
- **Causa:** estabas en Cloud Shell parado en una carpeta equivocada (con miles de
  archivos mezclados, node_modules, etc.) y corriste `firebase deploy` a mano.
- **Solución:** no deployes a mano. Dejá que GitHub Actions lo haga. Si igual querés
  deployar a mano, hacelo SIEMPRE desde una copia limpia del repo:
  ```bash
  cd ~ && rm -rf mi-proyecto && git clone <url-del-repo> && cd mi-proyecto && firebase deploy
  ```

### El deploy automático "no hace nada" / falla siempre
- **Causa #1:** el `deploy.yml` tiene la **indentación rota** (pasa al editarlo desde
  el celular en GitHub). Si el YAML es inválido, Actions ni arranca.
  → Copiá de nuevo el bloque del paso 4, tal cual, respetando los 2 espacios.
- **Causa #2:** falta el secret `FIREBASE_SERVICE_ACCOUNT`. → Hacé el paso 5.

### Cómo verificar si el deploy funcionó
GitHub → repo → pestaña **Actions**. El último run tiene que estar en verde ✅.
Si está en rojo ❌, abrilo y mirá el error (casi siempre es una de las dos causas de arriba).

---

## Resumen de la regla de oro
1. Para actualizar contenido → editá `data.js` y "Commit". Nada más.
2. Nunca toques `.github/workflows/deploy.yml`.
3. Nunca deployes a mano en Cloud Shell salvo emergencia (y siempre desde un clone limpio).
