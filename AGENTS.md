# Canadá 2027: diseño e interacción

- Salida estática autocontenida en `index.html`. Editar `src/`, construir con `node scripts/build.mjs`.
- Conservar todos los textos, cifras, fechas, enlaces, estados y créditos; sólo se permite divulgación progresiva y texto nuevo de interfaz en español.
- No modificar `src/budget.js` ni las fórmulas de `src/app.js`.
- No añadir imágenes, fuentes remotas, servicios, CDNs, analítica ni frameworks.
- Newsreader y Plus Jakarta Sans incrustadas. Un acento rojo arce. Mobile-first, movimiento reducido, controles de 44 px.
- Trabajar en una rama de revisión desde main; publicar sólo tras autorización explícita.
- Verificar paridad, calculadora, pestañas, axe y red con los scripts de `scripts/`; capturas a 390/768/1440 y revisión a 320/1024.
- `baseline/index.html` conserva el sitio público de partida para pruebas; no regenerarlo desde el rediseño.
- Calidad editorial: comprobar con capturas la densidad de agenda y la jerarquía, además de axe. Medir texto visible con `checkVisibility()`: los descendientes de details cerrados pueden tener rectángulos aunque no se vean. Mantener un solo controlador de apertura por vista; app.js ya restaura el DOM tras imprimir y duplicar esa restauración puede perder aperturas inmediatas. Probar 390→1440→390 dentro del presupuesto para detectar barras persistentes duplicadas.
