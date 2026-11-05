# Editorial más limpio · ejecución

Plan aprobado: resolver las seis áreas en una entrega, conservando paleta, tipografías, fotos, contenido y cálculo. Información esencial y logística visibles; ampliación bajo demanda. Sin despliegue hasta autorización.

- [x] Jerarquía y navegación compactas; cabecera medida.
- [x] Estado independiente de detalles por vista; agenda compacta; expansión e impresión.
- [x] Portada y hoteles con jerarquía y encuadre adecuados.
- [x] Resumen conocido primero; una presentación persistente por tamaño.
- [x] Regresiones, paridad, capturas, revisión independiente y sincronización.

La implementación usa las capas existentes, sin dependencias. El checkout público limpio se conserva con una rama nueva para mantener el generador y los recursos privados disponibles. Browser plugin no disponible; pruebas automatizadas con Playwright existente y revisión visual con las capturas actuales.

Decisión: no conservar las clases heredadas `practical`/`place-story` en el nuevo detalle unificado; así los controladores antiguos no lo abren al cambiar de vista. Un controlador de presentación será dueño de sus estados, sin tocar app.js.

Decisiones de integración: el resumen breve de lista es el primer enunciado práctico original, útil para reconocer la acción o el traslado; la entradilla narrativa sigue en la vista por día y en la ampliación. El contexto original del día se conserva en el primer detalle de ese día. Se normalizan sólo corchetes en el extracto de interfaz.

Validación: la regresión falló primero por trece paradas abiertas y después reprodujo la impresión inmediata que perdía una apertura. La restauración nativa de app.js se conserva y se elimina la restauración duplicada de la capa visual. El revisor detectó alineación de medios, fecha invadida por controles y logística oculta; los tres hallazgos se corrigieron y se revisaron en capturas nuevas.

Validación en IAB: el selector sticky no sirve como referencia documental de scrollIntoView. La entrada a lista se calcula desde el encabezado no fijo y se prueba desde una parada avanzada.
