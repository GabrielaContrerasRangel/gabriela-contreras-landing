---
name: seo-geo-setup
description: Checklist completo para poner visible un sitio en buscadores tradicionales (SEO) y en motores de IA (GEO) — robots.txt, sitemap, dominio canónico correcto, datos estructurados, llms.txt, Google Search Console y Bing Webmaster Tools, más estrategia de contenido continuo (blog quincenal). Usar SIEMPRE que Gabriela pregunte por SEO, GEO, posicionamiento en Google, que la encuentren en búsquedas, que ChatGPT/Perplexity la recomienden, visibilidad de una página, o después de terminar el skill cliente-landing para un cliente nuevo.
---

# SEO/GEO — visibilidad de un sitio

Este skill viene del trabajo real hecho en gabrielacontrerasmarketing.com. Dos
lecciones de esa sesión ya están incorporadas aquí para no repetir el error:

1. **SEO y GEO no son dos proyectos separados.** La mayoría de los motores de
   IA con búsqueda en vivo (ChatGPT, Copilot, y en parte Perplexity) no tienen
   índice propio — usan el de Google o el de Bing por debajo. El mismo trabajo
   técnico alimenta ambos. No trates GEO como una fase aparte y más avanzada;
   es el mismo checklist, con Bing Webmaster Tools sumado al final.
2. **Nunca asumas cuál es el dominio "final."** Si el sitio tiene tanto
   `dominio.com` como `www.dominio.com`, uno de los dos redirige al otro
   (normalmente por defecto de Vercel: apex → www). Todo el SEO (canonical,
   sitemap, JSON-LD, robots.txt) tiene que apuntar al que **no** redirige, o
   estás mandando a Google a una URL que rebota. Verifícalo (en Vercel:
   `list_project_domains`, el que tiene `redirect: null` es el real) antes de
   escribir un solo archivo.

## Fase 1 — Fundamentos técnicos

Con `references/templates.md` como base, para el dominio ya confirmado:

1. `robots.txt` en la raíz — permite todo lo público, bloquea CRM/admin/páginas
   con datos personalizados por URL
2. `sitemap.xml` en la raíz — una entrada por página pública real (no incluyas
   borradores ni páginas internas)
3. `<link rel="canonical">` + `og:url` en **cada** página, apuntando al
   dominio final
4. Datos estructurados JSON-LD en la home (`ProfessionalService` o similar
   según el rubro) y en cada post de blog (`BlogPosting`) — esto es lo que le
   da a Google Y a las IAs hechos concretos y citables, no solo texto suelto
5. `llms.txt` en la raíz — resumen en texto plano pensado para que un modelo
   de lenguaje entienda el sitio rápido, sin tener que interpretar HTML

Verifica todo local antes de publicar (JSON.parse del JSON-LD, que el
robots.txt no bloquee por accidente páginas públicas).

## Fase 2 — Google Search Console

1. search.google.com/search-console, con la cuenta de Google del dueño del
   sitio (nunca la tuya)
2. Añadir propiedad → **"Prefijo de URL"**, no "Dominio". La propiedad de
   tipo Dominio solo ofrece verificación por DNS, y editar DNS a mano tiene
   riesgo real de tumbar el sitio si algo sale mal — mejor evitarlo
3. Verificación por **Archivo HTML**: el usuario descarga el archivo, te lo
   pasa, tú lo subes a la raíz del sitio y publicas. Nunca elimines ese
   archivo después de verificar
4. Una vez verificado: Sitemaps → escribe `sitemap.xml` → Enviar

No intentes verificar por DNS editando registros vía API aunque tengas
acceso — even si la herramienta existe, sin poder LEER el registro DNS
completo actual primero, un "replace" puede borrar registros que apuntan el
dominio al hosting y tumbar el sitio entero. Si Archivo HTML no es posible
por alguna razón, este es un paso para el humano, no para ti.

## Fase 3 — Bing Webmaster Tools (esto es lo que le da GEO a ChatGPT/Copilot)

1. bing.com/webmasters → Sign Up, con cuenta Microsoft o la que sea
2. Busca la opción **"Import from Google Search Console"** — si ya hiciste la
   Fase 2, esto importa el sitio y la verificación en un click, sin repetir
   nada
3. Si no aparece esa opción: agregar el sitio a mano con el dominio final
   (el mismo de la Fase 1, nunca el que redirige) y verificar por archivo,
   mismo patrón que Google

## Fase 4 — Contenido continuo (esto es lo que realmente mueve la aguja)

Los fundamentos técnicos son necesarios pero no suficientes — sin contenido
nuevo no hay superficie de palabras clave que capturar. Ver el patrón ya
usado: blog con cadencia fija (quincenal funcionó bien), un post por tema que
el cliente ideal busca de verdad, con:
- Título y meta description con la keyword real, no genérica
- `BlogPosting` JSON-LD (ver Fase 1 / templates.md)
- CTA al final que conecta con el embudo real del negocio (diagnóstico,
  servicio específico, lo que exista)

Antes de prometer una cadencia, pregunta qué ritmo es sostenible — un blog
con 2 posts y silencio no ayuda a nada, ver feedback_ultra_simple_instructions
y el principio operativo "publícalo" de CLAUDE.md.

## Fase 5 — Distribución (opcional, pero multiplica cada post)

Cada post de blog puede convertirse en contenido para redes sin más trabajo
de estrategia. Si el negocio ya tiene una línea gráfica de carrusel
establecida (fotos editoriales con objeto + palabra gigante de fondo, tipo
Midjourney/GPT), no le pidas al cliente que reinvente el prompt cada vez:
escribe un **prompt maestro** que describa esa línea gráfica exacta
(composición, iluminación, tipografía, paleta) una sola vez, y genera cada
slide nuevo reusando ese maestro con solo el texto y el objeto cambiando.
Sin esto, cada generación de IA parte de cero y el resultado no se parece al
anterior — ese fue el problema real que resolvió este patrón.

## Cuándo se conecta con cliente-landing

Si este trabajo es para un cliente (no para Gabriela misma), corre esto
después de terminar la Fase 5 (Deploy) del skill `cliente-landing` — con el
sitio ya publicado y el dominio ya conectado. No tiene sentido montar SEO
antes de que el sitio esté en producción.
