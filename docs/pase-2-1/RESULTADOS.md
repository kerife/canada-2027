# Pase 2.1 · cierre A–H

Validación del 4 de noviembre de 2026. Rama `pase-2-1-cierre`, desde el Pase 2 publicado. Cambios de presentación en la capa existente; fórmulas, datos, fotografías, fuentes y dependencias originales sin cambios.

| Punto | Antes | Después | Criterio y resultado | Evidencia |
|---|---|---|---|---|
| A | Corchetes visibles en estados | Palabras y fechas visibles sin corchetes; texto accesible conservado | PASS: 0 etiquetas con corchetes visibles; paridad de 39 paradas y 7 hoteles | [Paridad](despues/parity.json), [métricas](despues/metrics.json) |
| B | Placeholder estrecho con texto cursivo | Cama SVG inline, texto original centrado en sans de 16 px | PASS: zona de medios de 200 px en los 7 hoteles y cuatro anchos; contraste sin infracciones | [Hoteles](despues/hotels.json), [antes](antes/hoteles-1440.png), [después](despues/hoteles-1440.png) |
| C | Tres detalles por hotel | Un detalle con tres subsecciones; precio, estado y fuente fuera | PASS: 1 detalle / 3 subsecciones; máximo cerrado 464,4 px a 1440; texto por hotel preservado | [Mediciones](despues/hotels.json), [hotel abierto](despues/hotel-abierto-1440.png) |
| D | Barras sin valor visible | Cobertura de datos con porcentaje y nombre accesible | PASS: valores originales 45/0/20/10/20/0/0; atributos mínimo, máximo y actual | [Medidores](despues/meters.json), [hotel móvil](despues/hotel-abierto-390.png), [axe](despues/axe.json) |
| E | 53,57 % de caracteres visibles ≤13 px en escritorio inicial | Lectura 15 px en escritorio y 16 en móvil; metadatos de lectura 15 px | PASS: 2,45 % inicial y 2,73 % expandido a 1440; 0 caracteres <12 px en pantalla | [Antes](antes/metrics.json), [después](despues/metrics.json) |
| F | Controles estrechos y punto al inicio del chip | Área mínima de 44 × 44, separaciones de 8 y chip limpio | PASS: 0 controles menores en 320/390/768/1440, con detalles cerrados y abiertos; sin desbordamiento de página | [Métricas](despues/metrics.json) |
| G | Crédito con elipsis; portada recortada en la revisión final | Atribución completa enlazada, con un máximo de dos líneas | PASS: ≥12 px, sin elipsis ni desbordamiento del pie; se corrigió también el recorte por el contenedor de portada | [Métricas](despues/metrics.json), [portada móvil](despues/hero-390.png), [recorrido](despues/recorrido-390.png) |
| H | Verificación estática insuficiente | Ejecución real en Chromium del Pase 1, sitio publicado y cierre local | PASS: escenarios y pestañas coinciden; dos tarjetas con importe explícito, pendientes 10/10/9; Revisión con huecos 16/16/24 px | [Escenarios](despues/functional.json), [pestañas](despues/tabs.json), [huecos](despues/review-gaps.json), [inicial](despues/presupuesto-inicial-390.png), [con datos](despues/presupuesto-cambio14_hospedaje-390.png) |

Los escenarios guardados son: valores iniciales (cambio 13 y hospedaje vacío), cambio 14 con hospedaje vacío, y cambio 14 con hospedaje sintético de 1800,25 CAD. Los resultados originales de la calculadora coinciden en las tres superficies. La presentación añade cifras a las dos tarjetas de total parcial sin tocar sus fórmulas. Las 13 fechas se recorrieron con clic, flechas, Home/End y ambas vistas.

`npm test` y los scripts Python privados de paridad, métricas, hoteles, calculadora, pestañas, axe, red y capturas pasan. Axe WCAG 2/2.1 A/AA: cero violaciones a 390 y 1440, cerrado y expandido. Auditoría offline: cero solicitudes externas. Se conserva movimiento reducido. No se añadieron dependencias. Los scripts Python viven en `tools/pase21/`, excluidos de Git y de la publicación.

La paridad normaliza únicamente los corchetes y el punto antes de la hora autorizados por este encargo. Compara los bloques originales, las palabras de cada hotel/parada, sus fechas, cifras y enlaces, además de las imágenes y fuentes; permite reagrupar el contenido dentro del mismo hotel. La línea base es una copia inmutable del Pase 2 publicado, no el resultado nuevo.

[PDF final](despues/impresion.pdf): todos los detalles abiertos, 71 páginas; se revisaron hotel y presupuesto renderizados. Los campos del presupuesto se apilan en impresión para conservar su contenido sin recorte. Capturas de inicio y página completa a 390/768/1440 disponibles en [antes](antes/) y [después](despues/). La evidencia usa fuentes cargadas y fotografías decodificadas. La validación automatizada no sustituye una prueba con lector de pantalla o dispositivo físico.

## Pendientes de contenido

No se modificó el contenido del viaje. Los tres señalamientos anteriores quedan así:

- «El 20 protegemos»: no se reproduce en la línea base actual; el texto ya dice 23.
- La clase de Tremblant del 23 conserva la referencia al 20 de febrero; podría describir el límite de cancelación de 72 horas, pero requiere aclaración de Kevin.
- La referencia de Concord de 159,99 CAD sigue conviviendo con su retirada como importe comparable del día 23. Requiere decisión editorial antes de cambiarla.

El PR no publica en `main`; el sitio público conserva el Pase 2 hasta que Kevin autorice subir este cierre.
