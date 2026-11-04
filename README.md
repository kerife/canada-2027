# Canadá 2027 · Un invierno para nosotros

Itinerario visual de Quebec, Ottawa, Mont-Tremblant y Montreal para febrero de 2027: recorridos por día, transportes, fotografías de lugares, propuestas gastronómicas y presupuesto interactivo en MXN/CAD.

**Sitio:** https://kerife.github.io/canada-2027/

Es una propuesta de viaje en revisión, no una reserva ni una cotización vigente. Horarios, precios, clima y disponibilidad requieren confirmación con cada proveedor.

## Uso

Abrir `index.html` en un navegador o visitar el sitio. Las fotografías, estilos, tipografías y calculadora están integrados: no requiere instalación, base de datos ni servicios de pago. Los enlaces a proveedores necesitan conexión. Las elecciones de presupuesto se restablecen al recargar y no se comparten entre dispositivos.

## Archivos

- `index.html`: sitio completo y portátil.
- `.nojekyll`: permite servir directamente los archivos estáticos.
- `CREDITS.md`: procedencia de fotografías y tipografías.
- `PUBLICATION.md`: configuración, actualización y comprobación de GitHub Pages.

Este repositorio contiene únicamente la versión destinada a publicación. No incluye documentos de vuelos, comprobantes de reserva ni archivos privados de planificación.

## Actualizar

1. Preparar y comprobar la nueva versión del HTML.
2. Reemplazar `index.html` en la rama `main`, conservando ese nombre.
3. Actualizar los créditos si cambian las fotografías.
4. Guardar el cambio y esperar que finalice el despliegue de Pages en la pestaña Actions.
5. Abrir el enlace público y comprobar navegación, imágenes y presupuesto.

Para revertir, recuperar `index.html` de una revisión anterior y guardarlo en un nuevo cambio de `main`.

## Créditos

Ver [CREDITS.md](CREDITS.md). Las imágenes de terceros conservan sus derechos; no se les atribuye una licencia libre. Las fuentes incluyen sus avisos dentro del HTML.

## Revisión del itinerario

La propuesta contempla cuatro noches en Quebec, dos en Ottawa y seis en Montreal. La excursión de esquí desde el hotel de Montreal a Tremblant queda para el martes 23, con Mont Royal/Mile End/Plateau el sábado 20, con regreso al mismo hotel, el aniversario se conserva el 22 y Biodôme el 24. El presupuesto comienza como total parcial mientras falten hoteles, traslados o experiencias seleccionadas. North Adventures es candidato, pero su ficha asigna Sutton a principiantes: Tremblant aún requiere confirmación. Alternativa: transporte privado más escuela oficial. Las cotizaciones antiguas de Montreal no aplican. Introducir importes no equivale a reservar.

Concord Tours se añade como opción turística para revisar: visita a Tremblant sin clases ni equipo. Esquiar sigue siendo una prioridad, con fecha, transporte y coste por resolver. La referencia histórica de precio se retiró de la propuesta activa porque no acredita una tarifa de invierno de 2027. El sábado 20 lleva una nota sobre el contexto regional de Family Day y el receso de NYC; la demanda mayor es una inferencia, no ocupación comprobada.


## Revisar el rediseño editorial

La rama `redesign/invierno-editorial` conserva el contenido público y separa la presentación en `src/editorial.css` y `src/editorial.js`. `src/page.html` es la plantilla autocontenida con fotografías y fuentes ya publicadas. No se incorpora el expediente de investigación.

- Abrir `index.html` directamente, incluso sin conexión.
- Compilar: `npm ci` y `npm run build` (Node 22 o posterior).
- Servir: `python3 -m http.server 8874 --bind 127.0.0.1`.
- Probar: `npm test`; otro puerto se indica con `SITE_URL`. Playwright requiere Chromium: `npx playwright install chromium`.
- Capturas y PDF: `npm run shots`; antes/después y resultados en `baseline/` y `docs/design/after/`.
- Revisar `DESIGN.md`, `docs/design/RESULTS.md` y `docs/design/CONTENT_FLAGS.md`. No se modificaron las observaciones de contenido.

La etiqueta `pre-redesign` marca el punto original. Esta rama queda para PR en borrador; publicar requiere integrar posteriormente en main.
