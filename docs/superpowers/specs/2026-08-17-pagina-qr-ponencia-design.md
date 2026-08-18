# Página QR — datos de ponente y referencias bibliográficas

**Fecha:** 2026-08-17
**Estado:** aprobado

## Propósito

Página web estática, accedida vía código QR desde un poster/presentación física. Muestra los datos de la persona que hace la ponencia y las referencias bibliográficas usadas en el poster/presentación.

## Alcance

Página única (single-page), sin backend, sin build step. Contenido inicial con placeholders — el usuario reemplaza texto/foto/referencias reales después de tener el material final.

Hosting: estático genérico (Netlify/Vercel/otro), fuera del alcance de este spec — solo se generan los archivos estáticos listos para deploy.

## Arquitectura

3 archivos, sin dependencias externas ni framework:

```
/
├── index.html      # estructura y contenido
├── style.css       # estilos, mobile-first
└── assets/
    └── foto-ponente.jpg   # placeholder, reemplazable
```

**Por qué HTML/CSS plano:** página de un solo uso, contenido mayormente estático. Un framework (11ty, Next, etc.) agrega build step y dependencias sin beneficio real acá. HTML+CSS deploya directo en cualquier hosting estático y es fácil de editar a mano sin conocimientos técnicos avanzados.

## Contenido y secciones (orden en la página)

1. **Header** — foto, nombre, cargo/institución del ponente
2. **Bio corta** — párrafo breve
3. **Contacto** — email, redes sociales, ORCID (con íconos/links)
4. **Resumen/abstract** — resumen de la ponencia
5. **Referencias bibliográficas** — lista en formato APA, cada entrada con link a DOI/URL cuando esté disponible

Todo el contenido reemplazable va marcado con comentarios HTML tipo `<!-- REEMPLAZAR: ... -->` para que el usuario ubique y edite fácil sin tocar la estructura.

## Diseño visual

Mobile-first (QR se escanea mayormente desde celular). Paleta neutra/profesional por defecto — tipografía legible, buen contraste, layout de una columna que escala bien en pantallas chicas y medianas. Sin librerías de íconos externas (evita dependencia de red) — íconos simples inline (SVG o texto) para redes/contacto.

## Fuera de alcance

- Backend, formularios, analytics
- Contenido real (nombre, bio, referencias, foto) — el usuario lo agrega después
- Configuración de hosting/deploy y generación del QR en sí
