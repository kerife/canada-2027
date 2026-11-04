# Auditoría visual de partida

4 noviembre 2026. Evidencia: `baseline/hero-{390,768,1440}.png`, `full-*.png`, capturas de secciones y `axe.json`. La captura de sección inicial usa centrado de Playwright: consultar también la página completa para el contexto.

1. Portada 390: fotografía empieza a 711 px; no domina la primera pantalla. Confirmada.
2. Portada: título, dos párrafos, dos acciones y nota compiten antes de la imagen. Confirmada.
3. Navegación 390: enlaces pequeños y sin orientación activa por sección. Confirmada.
4. Recorrido 1440: selector de vista pegajoso tapa parte de las fechas al desplazarse. Confirmada.
5. Recorrido: tres columnas con descripciones largas de igual peso retrasan el escaneo. Confirmada.
6. Fotografías: créditos largos sobre la imagen reducen el espacio visible. Confirmada; conservar texto completo a un toque.
7. Recorrido: etiquetas de evidencia siguen en corchetes, sin componente semántico uniforme. Confirmada.
8. Revisión 390: tres artículos quedan en dos columnas; líneas muy cortas. Confirmada.
9. Revisión: calendario y entrada a Canadá abiertos producen gran extensión inicial. Confirmada.
10. Tablas de revisión: desplazamiento interno sin indicación de foco. Confirmada por axe.
11. Hoteles: nombre, estado, descripción, condiciones y precio no tienen jerarquía compartida suficiente. Confirmada en página completa; ya existen detalles de condiciones, no hay que inventarlos.
12. Presupuesto móvil: filas altas, notas extensas y resumen alejado del importe editado. Confirmada.
13. Presupuesto escritorio: panel de resumen largo necesita conservar su desplazamiento propio. Ya existe protección; preservarla.
14. Pie: fuentes, créditos y licencias YA están en detalles. Hipótesis del prompt refutada; mejorar acceso independiente y lectura, no atribuir una corrección inexistente.
15. Tipografía: Newsreader y Plus Jakarta Sans ya aportan identidad; hace falta escala, contraste y ritmo, no reemplazarlas. Confirmada.

Base: 13 días, 3 bases, 7 hoteles, 39 bloques. Diez escenarios del cálculo guardados. Red externa: ninguna. Lighthouse móvil: rendimiento 55, accesibilidad 97, CLS 0.00124, transferencia 6,174,493 bytes. Axe detecta `label-content-name-mismatch` en pestañas; con todo abierto también `heading-order` y `scrollable-region-focusable`. Conservar como base y reparar sólo accesibilidad de interfaz.
