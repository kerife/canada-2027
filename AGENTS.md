# Canadá 2027: diseño e interacción

- Salida estática autocontenida en `index.html`. Editar `src/`, construir con `node scripts/build.mjs`.
- Conservar todos los textos, cifras, fechas, enlaces, estados y créditos; sólo se permite divulgación progresiva y texto nuevo de interfaz en español.
- No modificar `src/budget.js` ni las fórmulas de `src/app.js`.
- No añadir imágenes, fuentes remotas, servicios, CDNs, analítica ni frameworks.
- Newsreader y Plus Jakarta Sans incrustadas. Un acento rojo arce. Mobile-first, movimiento reducido, controles de 44 px.
- Rama `redesign/invierno-editorial`; nunca publicar en main durante el rediseño.
- Verificar paridad, calculadora, pestañas, axe y red con los scripts de `scripts/`; capturas a 390/768/1440 y revisión a 320/1024.
- `baseline/index.html` conserva el sitio público de partida para pruebas; no regenerarlo desde el rediseño.
