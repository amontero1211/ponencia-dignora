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
