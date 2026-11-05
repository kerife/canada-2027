# Editorial más limpio · resultados

Implementación del plan aprobado sobre main. Una entrega con las seis áreas y revisión independiente de UI. No se publica este PR automáticamente.

| Área | Resultado | Antes | Después |
|---|---|---|---|
| Portada | Nombre de pareja sin duplicación visual y atribución integrada; misma foto, paleta y tipografías | [Portada](antes/portada-390.png) | [Portada](despues/portada-390.png) |
| Entrada al itinerario | Controles después del título; instrucciones y revisión bajo demanda, cabecera medida y primera actividad visible | [Móvil](antes/itinerario-390.png) | [Móvil](despues/itinerario-390.png), [revisión desplegada](despues/informacion-abierta-390.png) |
| Paradas y lista | Detalles cerrados, estados independientes, expansión global y logística visible; dos actividades reconocibles a 390×844 | [Lista](antes/lista-390.png) | [Lista](despues/lista-390.png), [ampliación a todo el ancho](despues/parada-abierta-1440.png) |
| Hoteles | Nombre, habitación y atributo diferenciador primero; medios alineados y tarjeta horizontal en tableta | [Escritorio](antes/hoteles-1440.png) | [Escritorio](despues/hoteles-1440.png), [tableta](despues/hoteles-768.png) |
| Presupuesto móvil | Resumen antes de campos; importe conocido y pendientes en barra compacta, sólo si el resumen no se ve | [Móvil](antes/presupuesto-390.png) | [Móvil](despues/presupuesto-390.png) |
| Presupuesto escritorio | Resumen lateral dentro de la sección y sin barra inferior; desglose bajo demanda | [Escritorio](antes/presupuesto-1440.png) | [Escritorio](despues/presupuesto-1440.png), [desglose](despues/desglose-abierto-1440.png) |

## Verificación

- `npm test`: paridad global y por cada uno de los 13 días y 7 hoteles, calculadora, pestañas, navegación, interfaz, nuevas regresiones, métricas, axe y red.
- 13 fechas con clic, flechas y Home/End; dos vistas y persistencia de aperturas separadas. Expandir/contraer todos, impresión con todos los detalles y restauración incluso si la apertura precede inmediatamente al evento de impresión.
- Escenarios de presupuesto conocidos por persona: inicial (FX13, hospedaje vacío) $21,632.52; FX14 y hospedaje vacío $23,296.56; FX14 y hospedaje sintético de 1800.25 CAD $37,851.76. Pendientes 10/10/9. Sin diferencias frente al cálculo original. Las diez regresiones existentes también pasan.
- 320/390/768/1024/1440: sin desbordamiento de página ni controles habilitados menores de 44×44; sin texto de pantalla inferior a 12 px. A 1440, caracteres visibles ≤13 px: 7.21% cerrado y 2.96% expandido. Se usa checkVisibility, ya que los descendientes de details cerrados pueden conservar rectángulos sin estar visibles.
- Barra móvil ≤88 px más área segura; oculta cuando el resumen principal está visible, fuera del presupuesto y desde 1024. Transición 390→1440→390 probada. Importe y último cálculo válido conservados ante datos inválidos y restablecimiento.
- Axe WCAG 2/2.1 A/AA: cero violaciones en 390/768/1440 con detalles cerrados y abiertos. Cero solicitudes externas; imágenes y navegación sin conexión; movimiento reducido.
- [PDF final](despues/impresion.pdf): 66 páginas con todos los detalles abiertos, sin páginas casi vacías; revisión renderizada de hotel y presupuesto. Las capturas cargan fuentes y decodifican todas las fotos antes de guardarse.
- app.js, budget.js, dependencias y recursos originales sin cambios. Generador local y HTML público comparados byte por byte. Canon Markdown conserva su huella.

## Revisión independiente y decisiones

La comprobación final en el navegador integrado detectó que desplazar un selector ya fijo no llevaba al comienzo real de la lista. Se corrigió calculando la posición desde el encabezado no fijo y se añadió la regresión desde la tercera parada.

El revisor encontró inicialmente medios desalineados en hoteles, controles de día sobre la fecha y logística todavía oculta. Se corrigieron y se revisaron las capturas nuevas. Además detectó corchetes recuperados por un extracto y una posible pérdida del estado al imprimir inmediatamente; ambos se reprodujeron con pruebas fallidas y quedaron corregidos. Revisión final sin hallazgos pendientes.

El resumen breve de lista usa el primer enunciado del plan práctico, evitando repetir la entradilla narrativa. El texto completo sigue en la ampliación. El contexto original de cada día vive en su primera parada. Todo permanece dentro del día correspondiente y se verifica mediante paridad por día. Se conservan los enlaces y las atribuciones completas.

La validación usa Chromium local; Browser plugin no disponible. No se probaron dispositivo físico ni lector de pantalla. La revisión visual es juicio de diseño y no garantiza preferencias estéticas ni cumplimiento integral de accesibilidad.

## Pendientes de contenido

Sin cambios al contenido turístico. Los señalamientos anteriores siguen documentados en el Pase 2.1: la frase «El 20 protegemos» no se reproduce (dice 23), falta aclarar la referencia al 20 en la clase del 23 y la referencia de Concord de 159,99 CAD no es un importe comparable con la excursión del 23.
