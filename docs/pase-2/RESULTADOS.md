# Pase 2 · resultados

Rama `pase-2-pulido`, desde la versión publicada al iniciar. Nueve commits numerados, uno por punto; correcciones finales de QA en un commit adicional. Se mantiene la dirección del Pase 1 y el HTML autocontenido.

| # | Antes | Después | Criterio / resultado | Evidencia |
|---|---|---|---|---|
| 1 | 62.47% de nodos medidos <13 px en móvil; 443 <12 px | Cuerpo móvil 16 px, lectura de escritorio 14 px, metadatos 13 px | Máximo 0.1% <13 px; ninguno <12 px | `antes/metrics.json`, `despues/metrics.json` |
| 2 | 33 objetivos medidos <44 px | Controles, enlaces y casillas con área de 44 px; grupos separados por 8 px | Cero objetivos <44 px a 390, también con todo expandido | `despues/metrics.json`, `despues/recorrido-390.png` |
| 3 | Horas dentro de títulos | Horas en `time datetime`; mismos caracteres, incluidos separadores | Ningún título de parada contiene una hora | `despues/components.json`, `despues/parada-390.png` |
| 4 | Dos detalles principales y posibles detalles anidados | Un detalle por parada; subsecciones h4; primera parada de cada día abierta | Máximo uno en las 39 paradas; 13 primeras abiertas | `despues/components.json`, `despues/content.json` |
| 5 | Crédito oscuro plegable | Pie visible de 32 px, enlace de 44 px cuyo área se extiende 12 px sobre la imagen no interactiva | Alto ≤40 px y atribución enlazada; ver nota de leyendas largas | `despues/hoteles-1440.png`, `despues/components.json` |
| 6 | Tarjetas de revisión cerradas, tratamiento desigual de Sábado 20 | Cuerpos abiertos, marcador y título de 28 px iguales, riel común | Separaciones medidas 16/16/24 px en los tres anchos | `despues/actualizacion-390.png`, `despues/requirements.json` |
| 7 | Pendientes de hotel en serif rojo | Sans neutra de 20 px y badge de pendiente | Color tinta; axe sin fallos de contraste | `despues/hoteles-1440.png`, `despues/axe.json` |
| 8 | Séptimo hotel huérfano; encabezados de una o dos líneas | Dos columnas en escritorio, una en tableta/móvil; último ocupa toda la fila | Sin huérfana y rango de alturas de encabezados =0 en 390/768/1440 | `despues/requirements.json`, capturas `hoteles-*` |
| 9 | Dos rótulos grandes «Total parcial» | Cifras conocidas de la salida exacta existente y conteo de pendientes; rótulo pequeño conservado | Inicial: $21,632.52/persona y $43,265.04/pareja; faltan 10 conceptos. Diez escenarios originales idénticos | `despues/presupuesto-resumen-390.png`, `despues/calculator.json` |

## Verificaciones

- Playwright Python/Chromium headless: 320/390/768/1440, con detalles iniciales y todos abiertos, sin desbordamiento horizontal.
- Axe local con `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`: cero violaciones a 390 y 1440, tanto inicial como expandido.
- Las 13 fechas funcionan con clic, flechas, Home/End y ambas vistas. La suite existente `npm test` también pasa, incluidos foco, presupuesto, impresión y apertura sin conexión.
- Se conserva exactamente el texto fuente de cada parada, sus enlaces, estados y asignaciones de imagen. Los bloques originales siguen presentes. Se comparó todo expandido en ambas versiones.
- Dos leyendas que antes no eran enlaces ahora apuntan a sus fuentes ya incluidas en los créditos: Bonaparte y Leméac. No se añadió una fuente ni se descargó/reemplazó una foto.
- Los archivos de lógica `src/app.js` y `src/budget.js`, las dependencias del sitio, las fuentes incrustadas y las fotografías conservan su contenido.
- Cero solicitudes externas, con imágenes decodificadas. Las capturas esperan la carga real de todas las fotografías y comprueban sus atributos originales.
- PDF A4 de 68 páginas con todos los días y detalles expandidos. Se revisaron portada, bloques de día, foto auxiliar, hoteles y presupuesto. La foto auxiliar de restaurante se limita al imprimir para evitar una página casi vacía. No se detectaron páginas vacías o con menos de 180 caracteres.
- Revisión independiente de código sin hallazgos pendientes. La revisión de navegador la realizó el agente principal; el revisor pudo comprobar código y evidencia guardada.

## Decisiones y límites

**Paridad visible:** la pantalla inicial cambia deliberadamente porque ahora hay cuerpos abiertos, créditos visibles, horas separadas y cifras parciales. Por ello no puede ser literalmente idéntica a la pantalla anterior. La prueba compara el texto fuente normalizado con todo abierto, por parada y por bloque, separando las etiquetas adicionales de interfaz (`data-editorial-ui`). No se eliminaron textos del viaje. Se conserva incluso el rótulo anterior de crédito en el DOM accesible.

**Leyendas largas:** en un pie de una línea y ≥13 px no caben completas algunas atribuciones a 390 px. Se conserva el texto original completo en el enlace y en su atributo de ayuda; visualmente usa elipsis. Los créditos completos también permanecen en Fuentes. Alternativa para el dueño: permitir dos o más líneas y un alto flexible. No se abrevió ni reescribió la atribución.

**Escala:** los nuevos tamaños de lectura/interfaz usan los tokens de la escala propuesta. La tipografía display fluida de portada y secciones conserva sus valores previos para cumplir la instrucción de no rediseñar lo que funciona. Impresión conserva la escala compacta anterior.

**Herramientas:** por instrucción del dueño se instaló Playwright Python y Chromium en un entorno aislado reutilizable de Codex, conservando la skill/CLI existente. No se añadieron dependencias al sitio. Los siete scripts Python solicitados y sus auxiliares viven en `tools/`, excluidos de Git para no publicarlos con Pages; se ejecutan con el intérprete de ese entorno. El plugin Browser no está disponible; se usó Playwright real. La ruta de `frontend-skill` había devuelto 404 en la configuración previa; se aplicó la [guía oficial del método](https://developers.openai.com/blog/designing-delightful-frontends-with-gpt-5-4), sin afirmar una instalación inexistente. Sin prueba física de teléfono ni lector de pantalla humano.

## Pendientes de contenido · no corregidos

1. «El 20 protegemos…» ya no aparece en la versión de partida: el bloque de Tremblant dice «para el 23».
2. «Clase Tremblant 23» conserva «[Estimado] fecha 20 febrero, hora exacta pendiente»: podría referirse al límite de cancelación de 72h; el dueño debe decidir si aclararlo.
3. El bloque turístico conserva «Referencia 159.99 CAD/persona», mientras el día 23 explica por qué se retiró como tarifa comparable. Se conserva la discrepancia para revisión editorial.

El antiguo `tests/validate_html.py` del proyecto local conserva su fallo previo por un hash canónico anterior; no se alteró el Markdown ni ese contrato durante este pase. Los generadores del proyecto y del repositorio público producen el mismo HTML byte por byte.
