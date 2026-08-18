# Página QR — Ponente y Referencias

Página estática de una sola pantalla con los datos del ponente y las referencias bibliográficas del poster/presentación. Pensada para ser accedida vía código QR.

## Editar contenido

Abrir `index.html` y buscar los comentarios `<!-- REEMPLAZAR: ... -->`. Reemplazar el texto indicado por el contenido real:

- Foto: reemplazar `public/assets/profile.png` por una imagen real (jpg/png) y actualizar el `src` del `<img>` en la sección `header-ponente`.
- Nombre, cargo, bio, contacto y resumen: reemplazar el texto entre los comentarios.
- Referencias: cada `<li class="referencias__item">` tiene una cita y un link a DOI/URL. Copiar/pegar el bloque `<li>` para agregar más referencias, o borrar los que sobren.

## Desarrollo local

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Genera `dist/` con `index.html` y `style.css` hasheado para cache-busting automático (Vite reescribe el nombre del archivo en cada build según su contenido).

## Deploy

Netlify está configurado (`netlify.toml`) para correr `npm run build` y publicar `dist/`. Al hacer push, el deploy se dispara solo.

Para otro hosting estático: correr `npm run build` y subir el contenido de `dist/`.

Una vez publicada, generar el código QR apuntando a la URL final del deploy.
