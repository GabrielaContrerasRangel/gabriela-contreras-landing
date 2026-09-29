---
name: cliente-landing
description: Guía paso a paso para construir y publicar una landing page para un cliente del negocio de marketing de Gabriela Contreras, replicando el proceso ya probado en su propia página (gabrielacontreras.vercel.app) — brief del cliente, scaffolding con boilerplate parametrizable, checklist manual de cuentas (GitHub/Vercel/Formspree/dominio, nunca las crea Claude), construcción pieza por pieza, deploy y registro en campaign-map. Usar SIEMPRE que Gabriela mencione un cliente nuevo, diga "vamos a armar la página de [cliente]", "necesito una landing para un cliente", "tengo un cliente que quiere una página como la mía", o cualquier variación de construir/vender/publicar un sitio web para un tercero — incluso si no menciona la palabra "skill" o "landing" explícitamente.
---

# Landing page para un cliente

Este skill replica, paso a paso, el proceso real que ya se usó para
construir gabrielacontreras.vercel.app: mismo esqueleto de componentes,
mismo patrón de contacto, mismo flujo de deploy — pero cada cliente trae su
propia paleta de colores y tipografía, nunca la de Gabriela.

La razón de que esto exista como skill y no como memoria suelta: la primera
vez que armamos esto (para el propio sitio de Gabriela) hubo bastante
ensayo-error — confusión con el selector de equipo en Vercel, un pago
rechazado por límite de tarjeta, permisos que Claude no tiene y nunca va a
tener. Ese ensayo-error ya está resuelto aquí; no hay que repetirlo con
cada cliente nuevo.

## Fase 0 — Antes de escribir nada

Confirma con Gabriela: ¿este cliente ya tiene sus propias cuentas
(GitHub/Vercel/dominio) o hay que guiarlo desde cero? Eso determina cuándo
metes la Fase 2 (cuentas) — a veces conviene hacerla primero, a veces al
final, pero nunca te la saltas.

## Fase 1 — Brief

Sigue `references/brief-cliente.md` y no avances hasta tener respuestas
claras de negocio, servicios y contacto (secciones 1-4 de ese archivo).
Un brief incompleto es la causa #1 de tener que rehacer trabajo — vale más
una pausa de 10 minutos aquí que reescribir copy después.

Si el cliente no tiene paleta de marca definida, ayúdalo a elegirla en el
momento (2-3 colores + 1 fuente de Google Fonts o Fontsource) — no lo dejes
como pendiente indefinido, la página no se puede construir sin eso.

## Fase 2 — Cuentas (manual, siempre)

Lee `references/accounts-checklist.md` completo antes de decirle nada al
cliente o a Gabriela. Esta fase es 100% manual — tu trabajo aquí es dar
instrucciones exactas, con nombres de botones reales, no ejecutar nada tú
mismo. Si en algún punto un tool de GitHub/Vercel/Formspree te devuelve un
error de permisos (403, "you don't have access", etc.), es la señal
correcta de que este paso le toca a un humano — no lo reintentes, no busques
un rodeo técnico, pásaselo.

No hace falta que las 4 cuentas (GitHub, Vercel, Formspree, dominio) estén
listas antes de empezar a construir — el orden recomendado en el checklist
deja el dominio para el final. Pero si el cliente aún no tiene ni GitHub ni
Vercel, no tiene sentido que tú escribas código todavía: no hay dónde
publicarlo. Arranca por ahí.

## Fase 3 — Scaffolding

1. Crea una carpeta **hermana** de este repo (nunca anidada dentro de
   `CLASE 1 RETO CODE`) — algo como `../[nombre-cliente]-landing/`. Cada
   cliente es un proyecto/repo independiente.
2. Copia `references/boilerplate.html` a esa carpeta como `index.html`.
3. Si el brief pidió páginas dedicadas por servicio, copia
   `references/pagina-servicio.html` una vez por servicio y pégale el
   bloque completo del modal de contacto (`#gc-contact-overlay` + su
   `<script>`) desde `boilerplate.html` — ese modal es idéntico en todas
   las páginas del sitio, solo cambia el `data-subject` por defecto.
4. Copia `references/campaign-map-template.md` a la carpeta del cliente
   como `campaign-map.md`.

## Fase 4 — Construcción

Reemplaza cada `{{PLACEHOLDER}}` con las respuestas del brief. Sigue el
principio operativo de Gabriela: **una pieza a la vez** — redacta una
sección, muéstrasela, espera aprobación, sigue a la siguiente. No generes
las 6 secciones de un jalón y se las tires encima; así fue como se
construyó la página de Gabriela y es la razón de que el copy quedara
ajustado en vez de genérico.

Cosas que NO cambian entre clientes (son el "sistema probado", no las
reinventes por cliente):
- La estructura del modal de contacto y su lógica de `fetch` a Formspree
- El patrón `touch-action: pan-x` en cualquier carrusel horizontal (evita
  que el scroll vertical en móvil se sienta "raro" — bug real que se
  encontró y arregló en el sitio de Gabriela)
- El patrón de botón `.js-contact-btn` con `data-subject` para que cada
  CTA identifique de dónde vino el mensaje

Cosas que SÍ cambian siempre:
- Toda la paleta de color y la fuente (variables `:root`)
- Todo el copy
- Cuántos servicios/tarjetas hay y si tienen página propia

## Fase 5 — Deploy

1. `git init`, primer commit, `git remote add origin [url del repo del
   cliente]`, push.
2. Verifica en el dashboard de Vercel del cliente que el deploy quedó
   "Ready" — no asumas que un push exitoso a GitHub significa que ya está
   publicado.
3. Prueba el formulario de contacto con un envío real (no solo mirar que
   el modal abra) — es la única forma de confirmar que el endpoint de
   Formspree está bien copiado.
4. Conecta el dominio si ya está comprado (ver Fase 2 / accounts-checklist).

## Fase 6 — Registro

Actualiza el `campaign-map.md` del cliente con lo publicado. Si Gabriela
va a dar seguimiento a este cliente (nuevas piezas, ajustes), este archivo
es lo que le permite retomar sin tener que releer todo el historial.

## Cuando el cliente pida algo fuera de este flujo

Este skill cubre el caso típico (landing + servicios + contacto). Si el
cliente pide algo más grande (tienda online, blog con CMS, login de
usuarios), dilo explícitamente — este stack (HTML estático + Vercel +
Formspree) no es la herramienta correcta para eso, y es mejor decirlo antes
de empezar que a medio camino.
