# Página QR — Ponente y Referencias Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir página web estática de una sola pantalla, accedida vía QR desde un poster/presentación, que muestra los datos del ponente y las referencias bibliográficas.

**Architecture:** 3 archivos estáticos sin build step ni dependencias externas — `index.html`, `style.css`, `assets/foto-ponente-placeholder.svg`. Cada sección de contenido (header, bio, contacto, resumen, referencias) es un bloque `<section>` independiente en `index.html`, con sus estilos correspondientes en `style.css`. Contenido real se agrega después reemplazando los placeholders marcados con comentarios `<!-- REEMPLAZAR: ... -->`.

**Tech Stack:** HTML5, CSS3 (mobile-first, sin frameworks ni librerías).

## Global Constraints

- Sin build step, sin dependencias externas (no CDN, no librerías JS/CSS) — spec: "sin dependencias externas ni framework"
- Mobile-first: diseño base para pantalla chica, mejorado con media queries hacia arriba — spec: "QR se escanea mayormente desde celular"
- Todo contenido reemplazable marcado con `<!-- REEMPLAZAR: ... -->` — spec: "fácil de editar a mano sin conocimientos técnicos avanzados"
- Paleta neutra/profesional, buen contraste — spec: "Diseño visual"
- Sin librerías de íconos externas — íconos inline (SVG) — spec: "evita dependencia de red"

---

## File Structure

```
/
├── index.html
├── style.css
└── assets/
    └── foto-ponente-placeholder.svg
```

- `index.html` — estructura completa de la página, 5 secciones (header, bio, contacto, resumen, referencias)
- `style.css` — reset, variables de color/tipografía, estilos mobile-first de cada sección
- `assets/foto-ponente-placeholder.svg` — ícono de avatar placeholder (texto/SVG, reemplazable después por foto real en el mismo `src`)

---

### Task 1: Scaffold — estructura base HTML + CSS + placeholder de foto

**Files:**
- Create: `index.html`
- Create: `style.css`
- Create: `assets/foto-ponente-placeholder.svg`

**Interfaces:**
- Produces: contenedor `<main class="page">` con 5 `<section>` vacíos (`header-ponente`, `bio`, `contacto`, `resumen`, `referencias`) que las Tasks 2-6 rellenan. Variables CSS `--color-bg`, `--color-text`, `--color-accent`, `--font-base` definidas en `:root` para reuso en tasks siguientes.

- [ ] **Step 1: Crear `assets/foto-ponente-placeholder.svg`**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" role="img" aria-label="Foto del ponente (placeholder)">
  <rect width="200" height="200" fill="#e2e8f0"/>
  <circle cx="100" cy="80" r="40" fill="#94a3b8"/>
  <path d="M40 180c0-40 27-65 60-65s60 25 60 65" fill="#94a3b8"/>
</svg>
```

- [ ] **Step 2: Crear `index.html` con esqueleto y las 5 secciones vacías**

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><!-- REEMPLAZAR: Nombre del ponente --> — Ponencia</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <main class="page">
    <section class="header-ponente" id="header-ponente"></section>
    <section class="bio" id="bio"></section>
    <section class="contacto" id="contacto"></section>
    <section class="resumen" id="resumen"></section>
    <section class="referencias" id="referencias"></section>
  </main>
</body>
</html>
```

- [ ] **Step 3: Crear `style.css` con reset, variables y layout base mobile-first**

```css
:root {
  --color-bg: #ffffff;
  --color-text: #1e293b;
  --color-text-muted: #475569;
  --color-accent: #1d4ed8;
  --color-border: #e2e8f0;
  --font-base: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: var(--font-base);
  color: var(--color-text);
  background: var(--color-bg);
  line-height: 1.5;
}

.page {
  max-width: 640px;
  margin: 0 auto;
  padding: 1.5rem 1.25rem 3rem;
}

.page section {
  margin-bottom: 2rem;
}

.page section:last-child {
  margin-bottom: 0;
}
```

- [ ] **Step 4: Verificar estructura del archivo**

Run: `grep -c '<section' index.html`
Expected: `5`

Run: `grep -o '<!DOCTYPE html>' index.html`
Expected: `<!DOCTYPE html>`

- [ ] **Step 5: Verificar visualmente en navegador**

Run: `open index.html`
Expected: página en blanco, sin errores en consola del navegador, ancho de contenido centrado y limitado (~640px en desktop, full width en mobile).

- [ ] **Step 6: Commit**

```bash
git add index.html style.css assets/foto-ponente-placeholder.svg
git commit -m "feat: scaffold static page structure"
```

---

### Task 2: Sección Header — foto, nombre, cargo/institución

**Files:**
- Modify: `index.html` — contenido de `<section class="header-ponente" id="header-ponente">`
- Modify: `style.css` — agregar reglas `.header-ponente`

**Interfaces:**
- Consumes: variables CSS de Task 1 (`--color-text`, `--color-text-muted`, `--font-base`), archivo `assets/foto-ponente-placeholder.svg`
- Produces: clase `.header-ponente__foto`, `.header-ponente__nombre`, `.header-ponente__cargo` disponibles como referencia visual para las tasks siguientes (mismo patrón de nomenclatura BEM-like `.seccion__elemento`)

- [ ] **Step 1: Rellenar la sección header en `index.html`**

Reemplazar `<section class="header-ponente" id="header-ponente"></section>` por:

```html
    <section class="header-ponente" id="header-ponente">
      <img class="header-ponente__foto" src="assets/foto-ponente-placeholder.svg" alt="Foto de <!-- REEMPLAZAR: nombre del ponente -->">
      <h1 class="header-ponente__nombre"><!-- REEMPLAZAR: Nombre completo del ponente --></h1>
      <p class="header-ponente__cargo"><!-- REEMPLAZAR: Cargo / Institución --></p>
    </section>
```

- [ ] **Step 2: Agregar estilos en `style.css`**

```css
.header-ponente {
  text-align: center;
}

.header-ponente__foto {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid var(--color-border);
}

.header-ponente__nombre {
  margin: 0.75rem 0 0.25rem;
  font-size: 1.5rem;
  font-weight: 700;
}

.header-ponente__cargo {
  margin: 0;
  color: var(--color-text-muted);
  font-size: 0.95rem;
}
```

- [ ] **Step 3: Verificar contenido presente**

Run: `grep -c 'header-ponente__' index.html`
Expected: `3`

- [ ] **Step 4: Verificar visualmente**

Run: `open index.html`
Expected: foto circular centrada, nombre en negrita debajo, cargo en gris debajo del nombre.

- [ ] **Step 5: Commit**

```bash
git add index.html style.css
git commit -m "feat: add header section with photo, name and role"
```

---

### Task 3: Sección Bio corta

**Files:**
- Modify: `index.html` — contenido de `<section class="bio" id="bio">`
- Modify: `style.css` — agregar reglas `.bio`

**Interfaces:**
- Consumes: variables CSS de Task 1
- Produces: clase `.bio__texto`

- [ ] **Step 1: Rellenar la sección bio en `index.html`**

Reemplazar `<section class="bio" id="bio"></section>` por:

```html
    <section class="bio" id="bio">
      <p class="bio__texto"><!-- REEMPLAZAR: bio corta del ponente, 2-4 líneas --></p>
    </section>
```

- [ ] **Step 2: Agregar estilos en `style.css`**

```css
.bio__texto {
  margin: 0;
  font-size: 1rem;
  color: var(--color-text);
}
```

- [ ] **Step 3: Verificar contenido presente**

Run: `grep -c 'bio__texto' index.html`
Expected: `1`

- [ ] **Step 4: Verificar visualmente**

Run: `open index.html`
Expected: párrafo de bio debajo del header, legible, sin desbordar el ancho del contenedor.

- [ ] **Step 5: Commit**

```bash
git add index.html style.css
git commit -m "feat: add bio section"
```

---

### Task 4: Sección Contacto — email, redes, ORCID con íconos inline

**Files:**
- Modify: `index.html` — contenido de `<section class="contacto" id="contacto">`
- Modify: `style.css` — agregar reglas `.contacto`

**Interfaces:**
- Consumes: variables CSS de Task 1
- Produces: clase `.contacto__lista`, `.contacto__item`, `.contacto__link`

- [ ] **Step 1: Rellenar la sección contacto en `index.html`**

Reemplazar `<section class="contacto" id="contacto"></section>` por:

```html
    <section class="contacto" id="contacto">
      <h2 class="contacto__titulo">Contacto</h2>
      <ul class="contacto__lista">
        <li class="contacto__item">
          <svg class="contacto__icono" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M2 4h20v16H2V4zm2 2v.01L12 12l8-5.99V6H4zm16 2.24l-7.4 5.55a1 1 0 0 1-1.2 0L4 8.24V18h16V8.24z"/></svg>
          <a class="contacto__link" href="mailto:<!-- REEMPLAZAR: email@ejemplo.com -->"><!-- REEMPLAZAR: email@ejemplo.com --></a>
        </li>
        <li class="contacto__item">
          <svg class="contacto__icono" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm6.32 6h-2.66a15.6 15.6 0 0 0-1.1-3.36A8.03 8.03 0 0 1 18.32 8zM12 4.06c.7 1.02 1.27 2.25 1.63 3.94H10.37c.36-1.69.93-2.92 1.63-3.94zM4.26 14a8.1 8.1 0 0 1 0-4h3.02a16.9 16.9 0 0 0 0 4H4.26zm.42 2h2.66c.27 1.2.63 2.33 1.1 3.36A8.03 8.03 0 0 1 4.68 16zm2.66-8H4.68a8.03 8.03 0 0 1 3.76-3.36A15.6 15.6 0 0 0 7.34 8zM12 19.94c-.7-1.02-1.27-2.25-1.63-3.94h3.26c-.36 1.69-.93 2.92-1.63 3.94zM9.02 14a15 15 0 0 1 0-4h5.96a15 15 0 0 1 0 4H9.02zm5.62 5.36c.47-1.03.83-2.16 1.1-3.36h2.66a8.03 8.03 0 0 1-3.76 3.36zM16.72 14a16.9 16.9 0 0 0 0-4h3.02a8.1 8.1 0 0 1 0 4h-3.02z"/></svg>
          <a class="contacto__link" href="<!-- REEMPLAZAR: https://redsocial.com/usuario -->" target="_blank" rel="noopener"><!-- REEMPLAZAR: @usuario en Red Social --></a>
        </li>
        <li class="contacto__item">
          <svg class="contacto__icono" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM8.5 7.5a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zM10 9h2.2v9H10V9zm3.9 0h2.1v1.23h.03c.29-.55 1-1.13 2.07-1.13 2.22 0 2.63 1.46 2.63 3.36V18h-2.2v-4.13c0-.98-.02-2.25-1.37-2.25-1.37 0-1.58 1.07-1.58 2.18V18h-2.2V9z"/></svg>
          <a class="contacto__link" href="<!-- REEMPLAZAR: https://orcid.org/0000-0000-0000-0000 -->" target="_blank" rel="noopener">ORCID: <!-- REEMPLAZAR: 0000-0000-0000-0000 --></a>
        </li>
      </ul>
    </section>
```

- [ ] **Step 2: Agregar estilos en `style.css`**

```css
.contacto__titulo {
  font-size: 1.1rem;
  margin: 0 0 0.75rem;
}

.contacto__lista {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.contacto__item {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.contacto__icono {
  flex-shrink: 0;
  color: var(--color-accent);
}

.contacto__link {
  color: var(--color-accent);
  text-decoration: none;
  word-break: break-all;
}

.contacto__link:hover,
.contacto__link:focus {
  text-decoration: underline;
}
```

- [ ] **Step 3: Verificar contenido presente**

Run: `grep -c 'contacto__item' index.html`
Expected: `3`

- [ ] **Step 4: Verificar visualmente**

Run: `open index.html`
Expected: lista de 3 ítems (email, red social, ORCID) con ícono a la izquierda y link azul, alineados, sin desbordar en mobile (probar achicando ventana del navegador).

- [ ] **Step 5: Commit**

```bash
git add index.html style.css
git commit -m "feat: add contact section with email, social and ORCID links"
```

---

### Task 5: Sección Resumen/abstract de la ponencia

**Files:**
- Modify: `index.html` — contenido de `<section class="resumen" id="resumen">`
- Modify: `style.css` — agregar reglas `.resumen`

**Interfaces:**
- Consumes: variables CSS de Task 1
- Produces: clase `.resumen__texto`

- [ ] **Step 1: Rellenar la sección resumen en `index.html`**

Reemplazar `<section class="resumen" id="resumen"></section>` por:

```html
    <section class="resumen" id="resumen">
      <h2 class="resumen__titulo">Resumen de la ponencia</h2>
      <p class="resumen__texto"><!-- REEMPLAZAR: resumen/abstract de la ponencia --></p>
    </section>
```

- [ ] **Step 2: Agregar estilos en `style.css`**

```css
.resumen__titulo {
  font-size: 1.1rem;
  margin: 0 0 0.5rem;
}

.resumen__texto {
  margin: 0;
  color: var(--color-text);
}
```

- [ ] **Step 3: Verificar contenido presente**

Run: `grep -c 'resumen__texto' index.html`
Expected: `1`

- [ ] **Step 4: Verificar visualmente**

Run: `open index.html`
Expected: título "Resumen de la ponencia" seguido del párrafo, con mismo estilo tipográfico que las secciones anteriores.

- [ ] **Step 5: Commit**

```bash
git add index.html style.css
git commit -m "feat: add abstract/summary section"
```

---

### Task 6: Sección Referencias bibliográficas

**Files:**
- Modify: `index.html` — contenido de `<section class="referencias" id="referencias">`
- Modify: `style.css` — agregar reglas `.referencias`

**Interfaces:**
- Consumes: variables CSS de Task 1
- Produces: clase `.referencias__lista`, `.referencias__item`

- [ ] **Step 1: Rellenar la sección referencias en `index.html`**

Reemplazar `<section class="referencias" id="referencias"></section>` por (3 entradas placeholder de ejemplo; el usuario agrega/quita según su lista real):

```html
    <section class="referencias" id="referencias">
      <h2 class="referencias__titulo">Referencias bibliográficas</h2>
      <ol class="referencias__lista">
        <li class="referencias__item">
          <!-- REEMPLAZAR: Apellido, N. (Año). Título del trabajo. Revista, volumen(número), páginas. -->
          <a href="<!-- REEMPLAZAR: https://doi.org/xxxx -->" target="_blank" rel="noopener">DOI / enlace</a>
        </li>
        <li class="referencias__item">
          <!-- REEMPLAZAR: Apellido, N. (Año). Título del trabajo. Revista, volumen(número), páginas. -->
          <a href="<!-- REEMPLAZAR: https://doi.org/xxxx -->" target="_blank" rel="noopener">DOI / enlace</a>
        </li>
        <li class="referencias__item">
          <!-- REEMPLAZAR: Apellido, N. (Año). Título del trabajo. Revista, volumen(número), páginas. -->
          <a href="<!-- REEMPLAZAR: https://doi.org/xxxx -->" target="_blank" rel="noopener">DOI / enlace</a>
        </li>
      </ol>
    </section>
```

- [ ] **Step 2: Agregar estilos en `style.css`**

```css
.referencias__titulo {
  font-size: 1.1rem;
  margin: 0 0 0.75rem;
}

.referencias__lista {
  margin: 0;
  padding-left: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
}

.referencias__item {
  font-size: 0.92rem;
  color: var(--color-text);
}

.referencias__item a {
  display: inline-block;
  margin-top: 0.15rem;
  color: var(--color-accent);
  text-decoration: none;
  word-break: break-all;
}

.referencias__item a:hover,
.referencias__item a:focus {
  text-decoration: underline;
}
```

- [ ] **Step 3: Verificar contenido presente**

Run: `grep -c 'referencias__item' index.html`
Expected: `3`

- [ ] **Step 4: Verificar visualmente**

Run: `open index.html`
Expected: lista numerada de referencias, cada una con texto de cita y link "DOI / enlace" debajo, legible en mobile sin desbordar.

- [ ] **Step 5: Commit**

```bash
git add index.html style.css
git commit -m "feat: add bibliographic references section"
```

---

### Task 7: Pulido responsive final + README con instrucciones de edición/deploy

**Files:**
- Modify: `style.css` — agregar media query desktop
- Create: `README.md`

**Interfaces:**
- Consumes: todas las clases de Tasks 1-6
- Produces: ninguna (task final de pulido y documentación)

- [ ] **Step 1: Agregar media query para pantallas medianas/grandes en `style.css`**

```css
@media (min-width: 640px) {
  .page {
    padding: 3rem 1.5rem 4rem;
  }

  .header-ponente__foto {
    width: 150px;
    height: 150px;
  }

  .header-ponente__nombre {
    font-size: 1.9rem;
  }
}
```

- [ ] **Step 2: Verificar visualmente en dos tamaños**

Run: `open index.html`
Expected: achicar la ventana del navegador a ~375px de ancho — todo el contenido (foto, textos, links de contacto y referencias) se lee sin scroll horizontal ni desborde. Agrandar a >640px — la foto y el nombre crecen levemente y el padding lateral aumenta.

- [ ] **Step 3: Crear `README.md` con instrucciones**

```markdown
# Página QR — Ponente y Referencias

Página estática de una sola pantalla con los datos del ponente y las referencias bibliográficas del poster/presentación. Pensada para ser accedida vía código QR.

## Editar contenido

Abrir `index.html` y buscar los comentarios `<!-- REEMPLAZAR: ... -->`. Reemplazar el texto indicado por el contenido real:

- Foto: reemplazar `assets/foto-ponente-placeholder.svg` por una imagen real (jpg/png) y actualizar el `src` del `<img>` en la sección `header-ponente`.
- Nombre, cargo, bio, contacto y resumen: reemplazar el texto entre los comentarios.
- Referencias: cada `<li class="referencias__item">` tiene una cita y un link a DOI/URL. Copiar/pegar el bloque `<li>` para agregar más referencias, o borrar los que sobren.

## Ver localmente

```bash
open index.html
```

## Deploy

Subir los 3 archivos (`index.html`, `style.css`, `assets/`) a cualquier hosting estático (Netlify, Vercel, etc.). No requiere build ni configuración adicional.

Una vez publicada, generar el código QR apuntando a la URL final del deploy.
```

- [ ] **Step 4: Verificar README creado**

Run: `test -f README.md && echo OK`
Expected: `OK`

- [ ] **Step 5: Commit**

```bash
git add style.css README.md
git commit -m "feat: add responsive polish and usage/deploy README"
```

---

## Self-Review Notes

- **Spec coverage:** header (foto/nombre/cargo) → Task 2; bio → Task 3; contacto (email/redes/ORCID) → Task 4; resumen/abstract → Task 5; referencias con links → Task 6; mobile-first + paleta neutra → Tasks 1 y 7; placeholders editables → todas las tasks de contenido; sin dependencias externas → cumplido en todo el plan (SVG inline, sin CDN); README de deploy → Task 7. Todos los puntos del spec están cubiertos.
- **Placeholders scan:** no hay "TBD" ni pasos sin código — cada step de contenido/estilo trae el bloque completo.
- **Type/naming consistency:** convención `.seccion__elemento` usada de forma consistente entre Tasks 2-6; IDs de `<section>` (`header-ponente`, `bio`, `contacto`, `resumen`, `referencias`) fijados en Task 1 y reusados sin cambios en las tasks siguientes.
