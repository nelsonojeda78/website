# Herramientas de imágenes

Estos archivos documentan **de dónde salieron** las fotografías de ejemplo y
**cómo se prepararon**. No son necesarios para publicar el sitio.

## `fuentes_imagenes.json`

Registro de cada imagen: archivo, autoría, licencia y enlace a la ficha original
en Wikimedia Commons. Es la fuente de la página `creditos.html`.

## Cómo se prepararon las imágenes

1. Se buscaron fotografías con licencia libre que permita **uso comercial**
   (CC0, CC BY, CC BY-SA) en Wikimedia Commons.
2. Cada imagen se recortó a la proporción que usa el sitio:
   - **antes/después:** 3:2 (760 × 507 px)
   - **beneficios:** 16:9 (1080 × 608 px)
3. Se aplicó un ajuste leve de color, contraste y nitidez para dar un aspecto
   uniforme.
4. Se comprimieron como JPEG progresivo, apuntando a **menos de 95 KB** por
   imagen (promedio final: ~79 KB).

Una imagen sustitutiva debe conservar **el mismo nombre de archivo** para no
tocar el HTML. Si cambia la autoría o la licencia, actualiza también
`creditos.html`.

## Sustituir por fotos reales

Cuando existan fotografías propias, basta con reemplazar los archivos de
`images/` conservando el nombre. En ese caso:

- Ya no aplican las licencias de terceros: se puede eliminar la página de
  créditos y sus enlaces (en `index.html`: el bloque `.ba-note-credits` y
  `.footer-credits`).
- Conviene mantener el recorte 3:2 y 16:9 para que el diseño no se deforme.
- Recomendación: exportar a unos **1200 px** de ancho como máximo y calidad
  JPEG 80 (queda en torno a 100–150 KB por imagen).
