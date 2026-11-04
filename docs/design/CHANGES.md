# Cambios de presentación

- Portada estática a sangre, marca de pareja, CTA al itinerario; texto administrativo de la portada en detalles, sin supresión.
- Paleta nieve / azul-pino / arce y jerarquía con las dos fuentes incrustadas originales.
- Navegación persistente con sección activa. Selector de fechas con desplazamiento interno, teclado y marcador de base.
- Actividades en línea de tiempo; avance con la primera oración literal como vista previa adicional. La descripción completa permanece intacta en «Descubrir esta parada». No se sintetizó ni reescribió el original.
- Zona, invierno y evidencia pasan al nivel visible. Etiquetas en corchetes conservadas literalmente y decoradas con icono CSS; etiquetas compuestas retienen sus dos estados. No se reclasificaron textos libres.
- Créditos completos en detalles nativos a un toque; no se sustituyó ni descargó fotografía. El tratamiento tonal no implica estación comprobada.
- Lista completa con los mismos nodos y todo su texto práctico abierto; conserva el estado anterior al volver a Por día.
- Revisión permanece en su ubicación. Tremblant, Quebec y calendario encabezan tres detalles. Family Day conserva íntegro su texto en el detalle siguiente.
- Hoteles: precio destacado, condiciones y calidad de datos desplegables. Medidor usa sólo el porcentaje ya escrito, sin puntuar ni mejorar estados.
- Presupuesto: encabezados de categoría, evidencia plegable, controles de personas y barra fija dentro de la sección. `src/app.js` y `src/budget.js` conservan sus bytes originales. Gráfica derivada de la tabla, sólo cuando todos los días tienen importe; jamás representa pendientes como cero.
- Preparación con casillas locales sin persistencia ni servicios externos. Fuentes, créditos y tipografías accesibles como detalles independientes.
- Impresión expandida; controles y navegación fuera de la hoja. Movimiento breve y desactivable.

## Diferencias intencionales

Sólo interfaz: etiquetas nuevas en español, nombres accesibles, estructura de detalle, copias de avance literal y gráfica. Las adiciones se marcan `data-editorial-ui` para separarlas en la prueba de paridad. No hay exenciones para enlaces, cifras, estados ni textos originales ausentes: deben coincidir exactamente.

Corrección del instrumento de paridad: los números se extraen de cada nodo mediante textContent; concatenar todo el cuerpo producía números ficticios en límites de elementos al reordenarlos (por ejemplo, una fecha junto a una duración). Se volvió a extraer el JSON de la misma instantánea original, que permanece inalterada.

## Límites

- Fotografías, fuentes y contenido incrustados: el archivo ronda 6.2 MB. La carga móvil simulada lenta ya era costosa en la base. No se optimizan ni reemplazan activos fuera del alcance.
- Auditoría de navegador con Chromium/Playwright; sin prueba física, Safari o lector de pantalla humano.
- El validador histórico `tests/validate_html.py` del proyecto local falla por un hash canónico anterior: falla también al apuntarlo al HTML original. No se cambió el Markdown ni se actualizó ese contrato ajeno al rediseño. Las otras tres pruebas locales pasan; la paridad actual compara directamente la versión pública recibida.
- Frontend-skill devuelve 404 en la ruta del encargo. Su guía publicada se consultó; Playwright se instaló y probó. Está disponible en el siguiente turno sin requerir interrumpir el trabajo.
- No se sustituyó el AGENTS.md existente del proyecto local; el repositorio público incorpora instrucciones propias para este alcance.
