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

Sitio estático de una página (`index.html`, `styles.css`, `main.js`). Imágenes de producto, certificaciones, manuales, modelos BIM y videos se enlazan directamente desde los sitios oficiales, sin copias locales:

- https://www.nmbsplicesleeve.com/
- https://www.splicesleeve.com/
- https://icc-es.org/

Caso de éxito en Latinoamérica: edificio de oficinas Batán, Guayaquil, con prefabricados Precreto. Sus dos fotos son las únicas imágenes locales, en `img/`. Videos en https://www.instagram.com/precreto/

El contacto es solo por WhatsApp (+56 9 9243 3573), sin formularios.

## Vista local

```bash
python -m http.server 8765
```
