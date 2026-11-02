# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Primera lectora: Anyi Trujillo.** El demo es una propuesta que ella aún no ha pedido. Lo verá muy probablemente en su celular, como enlace enviado por WhatsApp. El éxito del demo es que lo acepte y lo recomiende a otras profesionales.
- **Público final: clientas en Armenia y el Quindío** que preparan un evento importante:
  - novias que comparan maquilladoras y paquetes, a menudo con meses de anticipación;
  - mamás de quinceañeras que organizan a la quinceañera y a la familia;
  - mujeres con un evento social, grado o sesión de fotos.
  Su tarea: decidir si Anyi es la indicada, saber cuánto cuesta y apartar la fecha.

## Product Purpose

Sitio multipágina para Anyi Trujillo Beauty Studio: inicio, novias, servicios, portafolio, cursos, sobre Anyi y contacto. Muestra su trabajo, explica servicios y precios, y convierte la visita en una conversación de WhatsApp con la información completa (servicio, fecha, hora, lugar, nombre, acompañantes), para que Anyi pueda responder sin preguntar de nuevo.

## Positioning

- Especialista en novias y en **maquillaje con aerógrafo**.
- 9 años de experiencia, certificada por el Instituto Cristina Cuéllar (México) y Tempto (New York).
- Calificación real en Google: 5.0 con 31 reseñas.
- Atiende en estudio propio o a domicilio, con un **equipo formado por ella** para grupos (damas, familia de la quinceañera).
- También da **cursos** presenciales y personalizados.

En el mercado local (ver `docs/reference-analysis.md`), la competencia se queda en texto estático y mensajes de WhatsApp con `[fecha]` por rellenar. Lo propio de esta web es que la clienta resuelve sola su cotización y su cita, y llega a WhatsApp con todo listo.

## Operating Context

- Todo el agendamiento ocurre en WhatsApp (+57 320 529 9186). La web solo prepara el mensaje.
- Estudio en Calle 23 #37-25, edificio Tesalónica local 5, Armenia. Lunes a sábado de 8:00 a. m. a 7:00 p. m.
- Domicilio en Armenia y el Quindío; el costo depende del lugar.
- Las novias hacen una prueba de maquillaje y peinado en el estudio antes de la boda.
- Trabaja con fotógrafos y lugares de boda locales (lista en `src/lib/site.ts`).

## Capabilities and Constraints

- **Solo frontend.** No hay backend, base de datos ni pagos.
- **Secciones aprobadas:** cotizador de novia, antes/después, quiz de look, aerógrafo, cursos, reseñas de Google y detalles premium.
- **Precios confirmados** en `CLAUDE.md`, que es la fuente de verdad (`src/lib/site.ts` debe coincidir):
  - novia: tres paquetes de $800.000 a $1.300.000;
  - hora extra: $140.000;
  - acompañantes: de $80.000 a $140.000.
- **Sin precio aún:** quinceañeras, social y cursos. Usar textos de ejemplo marcados como tales.
- **Fase 2, si Anyi acepta:** panel admin donde ella gestiona horarios y agendamiento real desde la web. No construir nada de esto en el demo.
- La web debe funcionar sin conexión (service worker y página `/offline`).

## Brand Commitments

- **Voz:** primera persona, Anyi habla directo a la clienta. Tutea, cercana y cálida ("escríbeme", "te asesoro").
- **Idioma:** español de Colombia (es-CO).
- **Marca existente:** nombre "Anyi Trujillo Beauty Studio", logo en letra script "Beauty Studio" (`src/assets/logo.svg`) y la cuenta de Instagram @anyitrujillomakeup (~15 mil seguidores).
- **Restricciones visuales que fijó el usuario** (el detalle está en `CLAUDE.md` → "Dirección visual"):
  - tema claro;
  - colores de marca: dorado #FFD03A, negro #040606 (solo acentos y texto), blanco, nude/rose gold #D09A73 y mármol;
  - valeriariosmakeup.com sirve solo como referencia de contenido, nunca de diseño.

## Evidence on Hand

- **Reseñas:** 3 reseñas **reales y textuales de Google**, en `src/lib/site.ts` → `reviews`. Se pueden mostrar con nombre y atribuirlas a Google. No editar su texto.
- **Calificación de Google:** 5.0 con 31 reseñas.
- **Fotos reales:** novias, quinceañeras, glam, el estudio, retratos de Anyi y el taller con Cristina Cuéllar, en `src/assets/images/`.
- **Certificaciones:** Instituto Cristina Cuéllar (México) y Tempto (New York).
- **Antes/después: no hay fotos todavía.** El usuario las conseguirá de Anyi. Mientras tanto la sección muestra marcos diseñados vacíos, con el slider funcionando y el texto "Próximamente: transformaciones reales de Anyi". No se usan fotos de bancos de imágenes. **Nunca simular un resultado** con fotos que no sean un antes y un después reales de la misma clienta.
- **No inventar:** testimonios, número de clientas atendidas, premios, prensa, precios de quinceañeras, social o cursos, fechas de cursos, ni datos personales o del equipo que no estén en `site.ts`, `CLAUDE.md` o este archivo. Lo no confirmado se marca como ejemplo o se deja fuera.

## Product Principles

1. **WhatsApp llega completo.** Toda interacción termina en un mensaje con los datos que la clienta ya eligió. Nunca con textos de relleno para editar.
2. **El precio a la vista resuelve dudas.** Donde hay precio confirmado se muestra, y con las combinaciones calculadas (paquete + acompañantes + horas).
3. **La confianza se puede verificar.** Reseñas y calificación de Google reales, certificaciones con nombre y fotos propias, antes que frases de marketing.
4. **Primero el celular.** Tanto Anyi como sus clientas llegan desde el móvil, por un enlace de WhatsApp o de Instagram.
5. **El demo debe convencer a Anyi.** Cada sección tiene que sentirse hecha para ella, no una plantilla de maquilladora.

## Accessibility & Inclusion

Respetar `prefers-reduced-motion` en todas las animaciones. Los flujos interactivos (cotizador, quiz y agenda) deben poder usarse con teclado y lector de pantalla, porque son el camino principal para agendar.
