# Un invierno para nosotros · Canadá 2027

Dirección A, elegida por el implementador el 4 noviembre 2026 según el encargo. No implica aprobación editorial de datos ni publicación.

**Tesis visual:** una revista íntima de invierno: papel nieve, tinta azul-pino y rojo arce, fotografía existente a sangre, tipografía expresiva y contención.

**Narrativa:** portada → por qué es nuestro / tres bases → revisión → días → aniversario → alojamiento → presupuesto → preparación → fuentes. Se conserva el orden recibido.

**Interacción:** entrada suave del título; cambio breve de día; aparición sutil de la línea de tiempo. Sin movimiento cuando se solicita reducirlo. Divulgación progresiva, controles nativos y navegación por teclado.

## Sistema

Contrato CSS en `src/editorial.css`. Fondo #f7f7f2, superficie #fff, tinta #203c43, metadatos #526368, acento #a4362d, línea #d5ddda. Cuatro pares semánticos de color con texto oscuro sobre fondos claros. Estado propuesto usa tinta neutra y contorno, separado de las cuatro familias semánticas. Nunca sólo color.

Espaciado 4/8/12/16/24/32/48/64/96 px. Radio 4 px; sin sombras decorativas necesarias. Duración corta 180 ms y entrada 480 ms. Columna de lectura limitada a 65–70 ch. Cifras tabulares.

| Rol | Familia | Tamaño | Función |
|---|---|---|---|
| display | Newsreader | clamp(3.4rem, 7.8vw, 8rem) | Portada |
| headline | Newsreader | clamp(2.4rem, 5.1vw, 4.4rem) | Secciones |
| body | Plus Jakarta Sans | 15–16 px / 1.75 | Descripciones |
| caption | Plus Jakarta Sans | 11–13 px / 1.6 | Fuentes, evidencia y controles |

## Evidencia

Se conserva literalmente cada etiqueta y su fecha. Corchetes siguen en textContent para mantener paridad; apariencia de badge. Etiquetas compuestas mantienen ambos estados sin reclasificar.

| Familia | Icono CSS | Tratamiento |
|---|---|---|
| Confirmado publicado | ✓ | Verde profundo / verde claro |
| Sujeto a cambio | ↻ | Ocre profundo / crema |
| Estimado | ≈ | Azul gris / azul claro |
| Pendiente de confirmar | ◷ | Rosa profundo / rosa claro |
| Propuesto / Plan base | ◇ | Tinta / contorno neutro; texto mantiene la distinción |

## Componentes

Portada a sangre, navegación fija de secciones, ruta de tres bases, selector horizontal de fechas pegajoso, cabecera editorial de día, actividad en línea de tiempo, detalles prácticos, fuentes con nombre accesible único, crédito desplegable, agenda compacta con los mismos nodos, revisión plegable, hotel con condiciones, filas de presupuesto agrupadas visualmente, resumen fijo sólo dentro de presupuesto, checklist local, fuentes/licencias independientes, impresión expandida.

## Límites

Sin fotografías nuevas ni reinterpretación de estaciones. Sin reescritura ni supresión de textos. No editar fórmulas. Plantilla pública `src/page.html` conserva los recursos incrustados ya publicados; `scripts/build.mjs` recompone un solo HTML. El generador del proyecto original recibe los mismos archivos de diseño. Los datos canónicos quedan intactos.

Referencias consultadas: guía oficial [Designing delightful frontends](https://developers.openai.com/blog/designing-delightful-frontends-with-gpt-5-4), estructura de contrato [OpenDesign](https://github.com/nexu-io/open-design). La ruta de instalación de frontend-skill devuelve 404; su orientación se consultó en la guía. Playwright instalado para pruebas explícitamente solicitadas. No se generaron imágenes: el encargo prescribe hojas de tokens y fotografías existentes.
