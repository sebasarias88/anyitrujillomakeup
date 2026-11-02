# Análisis de referencia: valeriariosmakeup.com

Revisado el 2026-11-01 con Playwright en escritorio (1440 px) y móvil (390 px). Se revisaron la home y la página de novias (`/servicios/maquillaje-novia`).

> Alcance: solo **estructura, contenido y conversión**. Su diseño visual (tipografía, paleta, composición, fotos) **no se toma como referencia** y no se copia. La dirección visual de Anyi está en `CLAUDE.md`.

## 1. Estructura de la home (en orden)

| # | Sección | Qué hace |
|---|---------|----------|
| 1 | Header fijo | Navegación a subpáginas (Sobre, Servicios con submenú, A domicilio, Portafolio, Blog, Contacto) y botón **COTIZAR** siempre visible. En móvil: menú hamburguesa. |
| 2 | Hero | Eyebrow con ubicación ("Norte de Armenia, Quindío"), H1 con la keyword local, subtítulo con servicios y diferenciales, 2 CTA (WhatsApp y "Ver paquetes de novia") y 3 datos de confianza (+6 años, alta gama, studio + casa). |
| 3 | Por qué ella | 4 pilares diferenciales (piel blindada, ritual spa, asesoría de imagen, productos de alta gama). |
| 4 | Servicios | 4 tarjetas (Novias, Social, Quinceañeras, Editorial) con **"Desde $X"** y enlace a su subpágina. |
| 5 | Sobre ella | Retrato y una historia corta, con enlace a la página completa. |
| 6 | La experiencia | Proceso en 3 pasos numerados (asesoría, ritual de piel, maquillaje + styling). |
| 7 | Portafolio | Carrusel horizontal infinito de 14 fotos, con enlace al portafolio completo. Sin filtros ni contexto. |
| 8 | Testimonios | Carrusel de citas con 5 estrellas, nombre y etiqueta ("Cliente frecuente"). |
| 9 | A domicilio | Bloque de alto contraste con los 8 municipios que cubre y CTA "Cotizar domicilio". |
| 10 | FAQ | 5 preguntas en acordeón, con enlace a la página completa de FAQ. |
| 11 | CTA final | "Tu fecha se aparta con tu reserva": urgencia por temporada y botón de WhatsApp. |
| 12 | Footer | Servicios, enlaces, dirección, WhatsApp, email, redes y páginas legales. |

Elementos persistentes: botón flotante de WhatsApp y botón "Cotizar" en el header fijo. Longitud de la página: unos 7.900 px en escritorio y 12.100 px en móvil.

## 2. Cómo presenta servicios y precios

- **Dos niveles.** En la home solo pone el precio de entrada ("Desde $500.000"). El detalle está en cada subpágina.
- **Página de novias** (es la más trabajada):
  - "Para quién es" (3 puntos), "El estándar" (3 diferenciales) y luego 4 paquetes con nombres aspiracionales (Silver, Golden, Diamond e Imperial Bride). Golden lleva la etiqueta **"Más elegido"**.
  - Cada paquete se resume en **una sola línea** ("Studio + prueba + video del proceso"). No hay una comparación clara de qué incluye cada uno.
  - Debajo: precio de la prueba, acompañantes "desde", un bloque "Incluido en todos los paquetes" (8 puntos), testimonios de novias, FAQ de novias y CTA.
- El precio a domicilio se trata como un paquete aparte, no como un extra calculable.

## 3. Cómo lleva a la clienta a agendar

- **Todo termina en WhatsApp**. No hay formularios, calendario ni iframes (`document.forms.length === 0`).
- Hay CTA en el hero, el header, el botón flotante, el bloque de domicilio, el CTA final, el footer y cada paquete.
- Los mensajes son **específicos según el contexto** (uno para novias, otro para domicilio, uno por paquete).
- **Pero llevan textos de relleno.** Ejemplo: `"Quiero cotizar el paquete *Golden Bride* para mi boda del [fecha]"`. La clienta tiene que borrar `[fecha]` y `[lugar]` a mano en WhatsApp, y muchas lo envían sin editar.
- Usa urgencia suave ("las agendas de temporada se llenan rápido"), aunque no se apoya en ningún dato real.

## 4. Qué genera confianza

- Años de experiencia y "alta gama" desde el hero.
- Diferenciales con nombre propio ("piel blindada", "ritual tipo spa"): convierten la técnica en algo que se puede recordar.
- Proceso en 3 pasos, que reduce la incertidumbre.
- Testimonios con nombre y contexto ("Novia · boda en Salento").
- La lista de municipios a domicilio, que es concreta y verificable.
- FAQ, páginas legales y datos estructurados (`BeautySalon`, `Person`, `FAQPage`).

## 5. Lo que funciona (y adoptamos en estructura)

1. **El precio a la vista** ("desde"): filtra a las clientas y quita la fricción de "¿cuánto cuesta?".
2. **Un paquete recomendado** ("Más elegido") para guiar la decisión.
3. **Un mensaje de WhatsApp por contexto** en vez de uno genérico.
4. **"Incluido en todos"** para no repetir lo común en cada paquete.
5. **Proceso en pasos**, la **FAQ** y la **lista de zonas a domicilio**.
6. **CTA siempre al alcance**: header fijo y botón flotante.
7. **Diferenciales con nombre propio.**

## 6. Lo que le falta

| Carencia | Por qué importa |
|----------|-----------------|
| **Mensajes de WhatsApp con `[fecha]` y `[lugar]`** | Fricción en el paso más importante. Muchas consultas llegan incompletas. |
| **Ninguna herramienta interactiva** | No hay cotizador, calculadora de acompañantes, quiz ni calendario. Todo es texto estático. |
| **Testimonios sin verificar** | Son citas escritas en la web. No muestra la calificación de Google ni enlaza a las reseñas. |
| **Sin antes/después** | Es la prueba más fuerte en maquillaje, y no aparece. |
| **Portafolio sin contexto** | Carrusel automático sin categorías, sin leyendas y sin poder pausarlo o ampliarlo. |
| **Paquetes difíciles de comparar** | Una línea por paquete. Para saber qué incluye cada uno hay que preguntar. |
| **Sin cursos ni formación** | No hay una línea de ingresos extra ni autoridad como formadora. |
| **Sin certificaciones** | Solo dice "+6 años". |
| **Sin mapa ni horarios en la home** | Solo la dirección en texto, en el footer. |
| **Hero móvil sin foto** | En 390 px el retrato queda debajo del primer pantallazo. Lo primero que se ve es solo texto, en un negocio que vende algo visual. |
| **El botón flotante tapa contenido** | En móvil se monta sobre la franja de datos de confianza. |
| **Mucho scroll en móvil** | 12.100 px, con secciones que podrían ser más compactas. |

## 7. Cómo lo haremos mejor y más moderno para Anyi

Nuestra ventaja de partida: Anyi tiene **más experiencia (9 años frente a 6), certificaciones internacionales reales y una calificación de Google verificable (5.0, 31 reseñas)**, además de cursos y especialidad en aerógrafo. La web tiene que poner esto por delante.

### Agendar sin fricción
- **Mensajes de WhatsApp 100 % rellenados por la web.** El cotizador, la agenda y el quiz recogen el servicio, la fecha, la hora, el lugar, el nombre y los acompañantes, y arman un mensaje completo y legible. Nunca `[fecha]`. *(Ya existe la base en `booking.tsx` y `bridal-quote.tsx`.)*
- **Cotizador de novia interactivo.** La clienta elige paquete, suma acompañantes (maquillaje $140.000, ondas $80.000 / $90.000, peinado $100.000) y horas extra de la Rubí ($140.000), y ve el **total en vivo**. Responde "¿cuánto me sale todo?" sin escribir a nadie.
- **Comparador de paquetes.** Las 3 opciones de novia lado a lado, con qué incluye cada una, y la Rubí marcada como la experiencia completa.
- **Barra de CTA en móvil** que no tape contenido (en lugar de un botón flotante encima del texto).

### Confianza verificable
- **Calificación de Google real** (5.0 · 31 reseñas) con enlace a Google, no solo citas escritas en la web.
- **Certificaciones con nombre** (Instituto Cristina Cuéllar, Tempto New York) visibles cerca del hero.
- **Antes / después** con un control deslizante: la prueba visual que le falta a la referencia. *(Sección aprobada; aún no existe en el código.)*
- **Portafolio con filtros** (Novias, XV, Glam, Estudio), leyendas y vista ampliada, en vez de un carrusel automático. *(La base ya está en `gallery.tsx`.)*

### Contenido que la referencia no tiene
- **Sección de aerógrafo** como especialidad propia: qué es, por qué dura más y para quién es.
- **Quiz de look**: recomienda servicio y estilo en 3 o 4 preguntas y termina en WhatsApp con el resultado ya escrito.
- **Cursos** (presenciales y personalizados) y **equipo para grupos** (novia con damas, XV con familia).
- **Ubicación con horarios** en la home.

### Una sola página, mejor organizada
- La referencia reparte el contenido en subpáginas. Para un demo funciona mejor **una sola página** con navegación por anclas y secciones compactas: menos clics hasta WhatsApp.
- **Primer pantallazo en móvil con imagen** desde el inicio, más el H1 local y el CTA.
- Orden propuesto: Hero → Confianza (Google, años, certificaciones) → Servicios con "desde" → Novias + cotizador → Antes/después → Aerógrafo → Quiz → Sobre Anyi → Portafolio → Cursos → Reseñas → Agenda → Ubicación → FAQ.

### Lo que no tomamos
Su paleta, tipografía, composición de tarjetas, carruseles infinitos y nombres de paquetes. La identidad de Anyi sale de su marca: logo script "Beauty Studio", dorado #FFD03A, nude/rose gold #D09A73, blanco, mármol y tema claro.
