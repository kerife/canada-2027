# Verificación final · 4 noviembre 2026

Dirección A: papel nieve, tinta azul-pino y rojo arce. La portada usa la fotografía existente a sangre; se conservaron Newsreader y Plus Jakarta Sans. Revisión independiente completada y sus dos hallazgos de foco reparados con una prueba que primero falló.

| Criterio | Resultado observado |
|---|---|
| Paridad | PASS: todos los textos originales comprobados por coincidencia exacta, multiconjuntos de enlaces/números, seis textos de estado y conteos 13/3/7/39 |
| Cálculo | PASS: diez escenarios idénticos, incluidas todas las cifras visibles, tabla diaria, excedentes y restablecimiento; archivos de lógica originales intactos |
| Accesibilidad | Axe: cero violaciones en seis pasadas, 390/768/1440 con detalles cerrados y todos abiertos; Lighthouse 100 frente a 97 |
| Rendimiento | Lighthouse móvil 55 frente a 55; CLS 0.0134 (<0.1); HTML 6,221,158 bytes frente a 6,173,658 (+0.77%, límite +15%) |
| Responsivo | PASS 320/390/768/1024/1440; sin desbordamiento, incluso con todos los detalles abiertos |
| Red y recursos | Cero orígenes externos en ambas versiones; imágenes, asignaciones, alt, fuentes y datos incrustados idénticos |
| Offline | PASS: contexto nuevo desconectado, HTML abierto desde disco, fuentes listas, fotografías decodificadas y lista navegable |
| Teclado | 13 fechas por clic/flechas/Home/End; salto visible, CTA conserva la fecha en ambas vistas; lista repetida/restauración y presupuesto conservado |
| Impresión | PDF A4 de 56 páginas: 13 días y todos los detalles expandidos, sin navegación fija; revisión visual de portada, día, hoteles y presupuesto; sin páginas vacías detectadas |

Entorno: Chromium de Playwright, servidor local. El plugin Browser no está disponible en esta sesión; se utilizó el flujo Playwright solicitado. Los avisos de mejores prácticas de Lighthouse no se presentan como fallos de accesibilidad ni como correcciones de contenido.

## Galería

Comparar `baseline/hero-390.png` con `after/hero-390.png` y sus variantes 768/1440. Las capturas finales esperan la decodificación de todas las fotos, incluyen todas las secciones, lista y PDF. Las hojas de tokens A/B/C se conservan junto a sus capturas.

Con el mismo contenido expandido, la lista final reduce la altura frente a las tarjetas un 42% en 390/768 y un 53% en 1440; cifras completas en `after/density.json`. La lista final es más larga que la lista original, por sus controles de detalle y objetivos táctiles más grandes. Esto se registra como compromiso de accesibilidad y lectura, no como reducción absoluta frente a la versión anterior.

## Crítica por bloque

| Bloque | Evidencia y juicio | Ajuste |
|---|---|---|
| 0 | Base en `baseline/`: portada sin ancla en móvil y revisión estrecha; pie ya plegable | Diagnóstico corregido sin inventar hallazgos |
| 1 | `blocks/1/`: sistema legible; la composición aún era la original | Selección A y escala jerárquica |
| 2 | `blocks/2/`: portada reconocible y ancla real; crédito recibía el oscurecimiento de fondo | Separar capas y crédito a un toque |
| 3 | `blocks/3/`: fechas y encabezados legibles; la prueba detectó desbordamiento de marcador | Contener el marcador en cada pestaña y desplazar sólo la tira |
| 4 | `blocks/4/`: revisión/hoteles más claros; cálculos idénticos; axe detectó nombres y región de licencia | Nombre nativo de pestañas y región enfocables |
| 5 | `blocks/5/`: PDF legible; medición detectó CLS de portada y prueba de movimiento falló | Portada en plantilla; reparar llave CSS y repetir en bloque final |
| 6 | `blocks/6/`, `after/`: siete criterios visuales revisados; sin sombras necesarias | Agenda más compacta, salto visible y CTA que respeta la vista |

Rúbrica final (1–5): marca 5, ancla 5, encabezados 4, propósito por sección 5, contención 4, movimiento 4, sin sombras 5. Evaluación del implementador, no prueba de usabilidad con viajeros.

## Revisar antes de integrar

`CONTENT_FLAGS.md` conserva las observaciones sin corregirlas. Revisar personalmente portada, densidad de la lista, crédito de cada fotografía y uso del presupuesto en teléfono real. No se revalidaron datos de viaje ni disponibilidad futura. No hay recortes funcionales P0/P1/P2: se incluyeron los tres movimientos, la gráfica y créditos nativos; no se añadió una biblioteca de popovers.

La suite pública `npm test` pasa. En el proyecto original pasan `budget.test.cjs`, `itinerary-data.test.cjs` y `validate_editorial.py`. El antiguo `validate_html.py` sigue fallando por su hash canónico de una revisión anterior y falla también con el HTML original de partida; no se alteró el Markdown para satisfacerlo. Ambos generadores producen exactamente los mismos bytes del rediseño.
