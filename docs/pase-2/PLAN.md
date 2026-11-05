# Pase 2 · nueve correcciones

Base: versión publicada al iniciar, rama `pase-2-pulido` desde main. HTML/CSS/JS existentes; sin nueva dependencia del sitio. Playwright Python instalado por petición posterior del dueño en un entorno aislado de Codex; scripts privados en `tools/`, excluidos de Git/publicación.

Flujo probado: portada → fecha por clic/teclado → detalle de parada → lista completa → presupuesto → restablecer → impresión.

- [ ] 1. Escala de lectura y metadatos; métricas de nodos visibles.
- [ ] 2. Altura y separación de controles; medir a 390.
- [ ] 3. Horas en elementos time conservando caracteres.
- [ ] 4. Un detalle por parada con subsecciones; primera abierta.
- [ ] 5. Crédito visible bajo cada foto.
- [ ] 6. Revisión abierta y con ritmo del componente de parada.
- [ ] 7. Pendientes en tinta neutra y badge.
- [ ] 8. Cuadrícula de hoteles sin huérfana.
- [ ] 9. Cifras parciales derivadas de la salida existente, sin modificar cálculo.

Verificación: paridad por parada y bloques, diez escenarios exactos del cálculo, pestañas, axe WCAG 2/2.1 A/AA, red, 320/390/768/1440 y PDF. Capturas con fotografías decodificadas en `antes/` y `despues/`.

La comparación de contenido expande los detalles en ambas versiones y excluye sólo las etiquetas de interfaz adicionales; no se considera pérdida de contenido que un cuerpo antes plegado aparezca abierto por defecto. Se conservará cada texto original, incluidos rótulos anteriores que cambien de posición.
