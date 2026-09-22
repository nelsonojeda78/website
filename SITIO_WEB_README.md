# Sitio Web — Mi Casa Soluciones

Sitio web comercial responsivo para **Mi Casa Soluciones**, empresa de servicios
integrales para el hogar en La Libertad y Salinas, Santa Elena, Ecuador.

Publicado con GitHub Pages desde el repositorio `nelsonojeda78/website`.

---

## 1. Estructura de archivos

```
Sitio web/
├── index.html                  Página única con todas las secciones
├── styles.css                  Estilos y diseño responsivo
├── script.js                   Menú móvil, sliders y carrusel
├── assets/                     Logos, emblemas y favicons
│   ├── logo_ambar.png          Logotipo horizontal ámbar (header)
│   ├── logo_negro.png          Logotipo horizontal carbón
│   ├── logo_blanco.png         Logotipo blanco (footer sobre fondo oscuro)
│   ├── emblema_ambar.png       Emblema cuadrado (móvil, avatar, sellos)
│   ├── emblema_blanco.png      Emblema para fondos oscuros
│   ├── emblema_negro.png       Emblema para fondos claros
│   ├── favicon.ico             Icono del navegador
│   ├── favicon-192.png         Icono Android / PWA
│   ├── favicon-512.png         Icono de alta resolución
│   └── apple-touch-icon.png    Icono iOS
├── creditos.html               Créditos y licencias de las fotos de ejemplo
├── images/                     Fotografías de ejemplo (reemplazables)
│   ├── ba-*-antes.jpg          Antes / después (8 archivos, 4 proyectos)
│   ├── ben-1..5-*.jpg          Carrusel de beneficios (5 archivos)
├── _tools/                     Registro de fuentes y método de preparación
│   ├── fuentes_imagenes.json   Autoría, licencia y enlace de cada imagen
│   └── README.md               Cómo se prepararon y cómo sustituirlas
└── SITIO_WEB_README.md         Este archivo
```

> `_tools/` **no es necesario para publicar el sitio**. Contiene el registro de
> autoría y licencias de las fotografías de ejemplo y la explicación del proceso
> de recorte y compresión. La carpeta `assets/` sí es imprescindible (logos).

---

## 2. Observaciones atendidas

### 2.1 Logo según el manual de marca
Se reemplazó el logo genérico por los archivos reales de `branding/assets`.

**Detalle importante:** los PNG entregados miden 1600 × 1600 px, pero el dibujo
real ocupa solo 1212 × 572 px: el resto es **relleno transparente**. Si se usa el
archivo tal cual, el logo se ve diminuto o desalineado, porque el navegador
respeta el lienzo cuadrado y no el dibujo.

Por eso se generaron versiones **recortadas** (`assets/logo_*.png`, 1000 × 472),
de modo que el alto en CSS corresponde al alto real de la marca.

El logo es responsivo con `<picture>`:
- **Escritorio / tablet:** logotipo horizontal ámbar (`logo_ambar.png`).
- **Móvil (≤ 560 px):** emblema cuadrado ámbar (`emblema_ambar.png`), porque el
  logotipo horizontal se vuelve ilegible en pantallas angostas.

Altura fluida con `clamp()`: 38 px en móvil, 52 px en escritorio.
El footer usa la versión **blanca** sobre el fondo carbón/negro.

### 2.2 Video: sí existe el marcador de posición
El video **no aparecía** porque había dos problemas reales:

1. El marcador estaba *dentro* del `hero`, con `position:absolute` y
   `opacity: 0.15`; quedaba oculto detrás del contenido y se perdía el efecto.
2. Un `<video>` sin archivo `.mp4` no muestra nada: se veía un recuadro vacío.

**Solución:** el video ahora es una **sección propia** (`#video`), siempre visible,
con un póster de fondo, botón de reproducción y un panel de texto legible.
Se ve desde el primer momento, aunque el archivo de video todavía no exista.

**Cómo publicar el video cuando esté listo** (en `index.html`, sección `#video`):

- **Opción YouTube (recomendada):** descomenta el `<iframe>` y reemplaza
  `VIDEO_ID` por el identificador real del video.
- **Opción MP4 propio:** guarda el archivo como `video-mi-casa-soluciones.mp4`
  en esta carpeta y descomenta el bloque `<video>`.

Mientras no exista ninguno de los dos, al hacer clic en el botón de reproducción
el visitante va a WhatsApp, para no dejar un enlace muerto.

### 2.3 Fotografías de ejemplo en «Nuestros Trabajos»

Las ilustraciones vectoriales se reemplazaron por **fotografías reales** con
licencia libre que permite uso comercial. Se eligieron imágenes que representan
cada oficio de forma reconocible:

| Proyecto | ANTES | DESPUÉS |
|---|---|---|
| Reparación de fuga de agua | Tubería corroída y oxidada | Tubería nueva bajo el lavabo, limpia |
| Pintura de sala | Pintura descascarada por humedad | Ambiente empastado y pintado |
| Tablero eléctrico | Cables enredados sin identificar | Tablero ordenado y rotulado |
| Cielo raso (gypsum) | Cielo con mancha de humedad | Ambiente terminado con luces embutidas |

Cada tarjeta tiene un **slider interactivo** para comparar. La convención es
**ANTES a la izquierda y DESPUÉS a la derecha**: al arrastrar el tirador se
revela una u otra foto.

> **Corrección aplicada:** en la primera versión el sentido del recorte estaba
> invertido, de modo que la etiqueta «ANTES» quedaba sobre la fotografía del
> «después». Se corrigió el `clip-path` (ahora recorta desde la izquierda) y el
> valor inicial del slider quedó al 50 %.

**Créditos y licencias.** La mayoría de las fotografías son **CC BY** o
**CC BY-SA**, que exigen reconocer la autoría. Por eso se creó la página
`creditos.html`, enlazada desde la nota de la galería y desde el pie del sitio.
Si se reemplazan por fotografías propias, esa página y sus enlaces pueden
eliminarse.

### 2.4 Carrusel de beneficios
Se agregó la sección `#beneficios` con **5 diapositivas** (1080 × 608 px):

1. **Un solo responsable** — adiós a coordinar varios maestros.
2. **Precio cerrado por escrito** — sabes cuánto pagas desde el primer día.
3. **Garantía escrita de 12 meses** — duerme tranquilo un año completo.
4. **Puntualidad y personal identificado** — sabes quién entra y a qué hora.
5. **Limpieza final incluida** — tu casa queda lista para usar.

El carrusel avanza solo cada 7 segundos, con flechas, puntos, barra de progreso,
gesto táctil y navegación con teclado. Se pausa al pasar el ratón o al cambiar de
pestaña, y respeta `prefers-reduced-motion`.

---

## 3. Cómo reemplazar las fotografías por fotos reales

Las fotografías actuales son **de referencia**: no corresponden a obras
ejecutadas por Mi Casa Soluciones. Para sustituirlas por trabajos propios:

1. Prepara las fotos en **JPG**, con la proporción que usa el sitio:
   - Antes/después: **3:2** (por ejemplo 1200 × 800 px)
   - Beneficios: **16:9** (por ejemplo 1600 × 900 px)
2. Guarda cada archivo en `images/` **con el mismo nombre** que el actual.
   Así no hay que tocar el HTML.
3. Del Manual de Marca: tomar el «antes» y el «después» **desde el mismo ángulo
   y a la misma distancia**, con buena luz de día.
4. Actualiza el texto `alt` de cada `<img>` en `index.html` para describir la
   foto real (mejora el SEO y la accesibilidad).
5. Si ya no se usan imágenes de terceros, **elimina `creditos.html`** y los
   enlaces a ella: el bloque `.ba-note-credits` en `index.html` y la línea
   `.footer-credits` del pie.

### Peso de las imágenes

Para que el sitio cargue rápido se recortaron al tamaño real de despliegue y se
comprimieron como JPEG progresivo:

| Concepto | Antes | Ahora |
|---|---|---|
| Peso total de `images/` | 1,83 MB | **1,00 MB** |
| Peso por imagen | 108–193 KB | **31–97 KB** (promedio 79 KB) |
| Dimensiones | 1200×800 / 1600×900 | 760×507 / 1080×608 |

Se usaron dimensiones ajustadas al tamaño de visualización (incluyendo pantallas
de alta densidad), lo que reduce el peso casi a la mitad sin pérdida apreciable.
Además todas las imágenes fuera de pantalla usan `loading="lazy"`.

## 4. Paleta y tipografía (Manual de Marca)

| Rol | Color | HEX | Uso en el sitio |
|---|---|---|---|
| Principal | Ámbar construcción | `#FFB000` | Botones, franjas, acentos |
| Secundario | Carbón | `#393536` | Títulos y textos |
| Profundo | Negro obra | `#100F0D` | Fondos oscuros |
| Base | Blanco | `#FFFFFF` | Fondos |
| Neutro cálido | Arena | `#F4F1EC` | Fondos de tarjetas |
| Neutro medio | Gris cemento | `#8A8580` | Textos secundarios |
| Funcional | Verde garantía | `#1E7B4F` | Visto bueno y garantía |
| Funcional | Rojo aviso | `#C0392B` | Advertencias |

Tipografías: **Montserrat** (títulos) e **Inter** (cuerpo), ambas de Google Fonts.
El ámbar **nunca** se usa como color de texto sobre blanco (contraste 1,8:1).

---

## 5. Diseño responsivo

Puntos de quiebre verificados: **390 px** (móvil), **768 px** (tablet),
**1440 px** y **1920 px** (escritorio). Sin desbordamiento horizontal.

| Elemento | Comportamiento |
|---|---|
| Logo | Horizontal → emblema cuadrado en móvil |
| Menú | Hamburguesa desplegable en móvil |
| Servicios | 3 columnas → 2 → 1 |
| Antes/después | 3 columnas → 2 → 1 |
| Carrusel | Imagen + texto en 2 columnas → apilado, flechas bajo la tarjeta |
| Video | Marco 16:9 → 4:5 en móvil (para que no tape el botón) |
| Botones | Ancho completo en móvil, centrados |

---

## 6. Pendientes antes de publicar

- [ ] Publicar el video (YouTube o MP4) en la sección `#video`.
- [ ] Reemplazar las fotografías de referencia por fotos reales de los trabajos
      (ver sección 3). Al hacerlo, retirar `creditos.html` y sus enlaces.
- [ ] Confirmar el número de WhatsApp en todos los enlaces: `+593 96 330 3081`.
- [ ] Añadir los enlaces reales de Facebook e Instagram en el footer
      (hoy apuntan a `#`).
- [ ] Revisar los precios "desde" contra la encuesta de mercado
      (documento `03_Catalogo_de_Servicios_y_Precios.md`, sección 6).
- [ ] Sustituir el testimonio de ejemplo por uno real, con autorización
      del cliente.
- [ ] Confirmar los datos del RUC en el pie de página.
- [ ] Verificar el sitio en un teléfono real (no solo en el emulador).
- [ ] Decidir si las fotos de referencia se mantienen o se retiran antes de
      publicar con el dominio definitivo.

---

## 7. Publicar en GitHub Pages

Los archivos de este directorio son la raíz del sitio. En el repositorio
`nelsonojeda78/website`:

1. Sube `index.html`, `creditos.html`, `styles.css`, `script.js`, `assets/` y
   `images/` (la carpeta `_tools/` es opcional y no se publica).
2. En GitHub: **Settings → Pages**.
3. En *Source*, elige la rama (`main`) y la carpeta raíz (`/ root`).
4. Guarda y espera 1–2 minutos. La dirección será
   `https://nelsonojeda78.github.io/website/`.

**Recuerda:** las rutas del sitio son **relativas** (`assets/...`, `images/...`),
así que funciona igual en la raíz de un dominio propio o en un subdirectorio
de GitHub Pages. No hay que cambiar nada al pasar al dominio definitivo.

---

*Versión 2.0 · Sitio web Mi Casa Soluciones*
