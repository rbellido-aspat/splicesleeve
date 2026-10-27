# splicesleeve

Sitio web en español de conectores NMB Splice Sleeve, contacto directo de Splice Sleeve en Latinoamérica.

- Dominio personalizado: https://splicesleeve.bdl.cl
- URL de Azure: https://zealous-smoke-078867710.2.azurestaticapps.net/
- Hospedaje: Azure Static Web Apps, se publica con cada push a `main`.

## Dominio personalizado

El dominio `splicesleeve.bdl.cl` se usa en `index.html` (canonical y og:url), `robots.txt` y `sitemap.xml`. En Azure Static Web Apps el dominio no se declara en un archivo del repo, se vincula así:

1. En el DNS de `bdl.cl`, crear un registro CNAME `splicesleeve` que apunte a `zealous-smoke-078867710.2.azurestaticapps.net`.
2. En el portal de Azure, Static Web App, Custom domains, agregar `splicesleeve.bdl.cl` y validar.
3. Azure emite el certificado TLS de forma automática.

## Contenido

Sitio estático (`index.html`, `styles.css`, `main.js`) con páginas internas en carpetas con `index.html`: `/comparativas/`, tres comparativas en `/comparativas/<slug>/`, `/chile/`, `/especificaciones/`, `/articulos/` con cinco artículos y `/proyectos/edificio-batan-guayaquil/`. El folleto en español y el informe de ensayos con barras chilenas de 2016 se descargan desde `/docs/`; las ilustraciones propias están en `img/especificaciones/` e `img/articulos/` y la foto del autor en `img/autor/`. Las páginas internas comparten encabezado y pie, y se generan con un script local que vive fuera del repositorio. Todas las rutas son absolutas y terminan en barra (`trailingSlash: auto`, que agrega la barra a carpetas y no a archivos); al agregar una página, súmala a `sitemap.xml`. Imágenes de producto, certificaciones, manuales, modelos BIM y videos se enlazan directamente desde los sitios oficiales, sin copias locales:

- https://www.nmbsplicesleeve.com/
- https://www.splicesleeve.com/
- https://icc-es.org/

Caso de éxito en Latinoamérica: edificio de oficinas Batán, Guayaquil, con prefabricados Precreto. Sus fotos son las únicas imágenes locales: dos en `img/` para la sección del caso y ocho en `img/batan/` para el carrusel de la portada (1920 y 1280 px, sin metadatos GPS). Videos en https://www.instagram.com/precreto/. La portada también incrusta el webinar de UTEC (YouTube MEu2rb_3yus) y enlaza tres artículos de prensa.

Video de la obra en `media/`, comprimido desde el reel original de Precreto (218 MB, 4K a 60 fps):

- `batan-obra-horizontal.mp4`, 56 s, 1280x720 con audio. El reel vertical va al centro y los costados se rellenan con la misma imagen desenfocada. En pantallas grandes empieza mudo al llegar a la vista; en el celular se descarga al tocar play.
- `batan-obra-horizontal-poster.jpg`, imagen fija mientras el video no carga.

El contacto es solo por WhatsApp (+56 9 9243 3573), sin formularios.

## Vista local

```bash
python -m http.server 8765
```
