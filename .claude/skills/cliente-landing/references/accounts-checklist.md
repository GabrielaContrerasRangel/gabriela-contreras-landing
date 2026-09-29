# Checklist de cuentas — SIEMPRE manual

Esta es la regla dura del skill: **Claude nunca crea cuentas, nunca compra
nada, nunca introduce datos de tarjeta.** No porque no se pueda técnicamente,
sino porque la cuenta y el dominio tienen que quedar a nombre del cliente —
si los creas tú (Claude) o Gabriela por él, el cliente no es dueño de su
propio negocio digital, y eso es justo el problema que este proceso evita.

Cuando llegues a este punto del flujo, deja de escribir código y pásale
estos pasos a quien vaya a hacer los clics (Gabriela o el cliente
directamente). Dáselos de a uno, con nombres exactos de botones — la
experiencia con Gabriela mostró que instrucciones tipo "conecta el repo"
sin más no sirven; hay que decir literalmente dónde hacer clic.

## 1. GitHub (donde vive el código)

1. Entra a github.com → crea una cuenta (o usa la que ya tenga el cliente)
2. Click en el "+" arriba a la derecha → "New repository"
3. Nómbralo (ej: `nombre-negocio-landing`), déjalo público o privado (da igual
   para Vercel), NO marques "Add a README" si ya tienes código local
4. Copia la URL que te da (`https://github.com/usuario/repo.git`)

Si Gabriela está construyendo el código en SU máquina antes de que el
cliente tenga cuenta: puede crear el repo bajo su propia cuenta primero y
transferirlo después (GitHub → Settings del repo → "Transfer ownership"),
pero avísale que eso es un paso extra que hay que recordar hacer — mejor
pedirle al cliente que cree su cuenta de una vez, aunque sea antes de tener
nada que subir.

## 2. Vercel (donde se publica)

1. Entra a vercel.com → "Sign Up" → puede entrar con la cuenta de GitHub
   directo (más simple, un solo login)
2. "Add New..." → "Project" → selecciona el repo que acabas de crear →
   "Deploy" (los defaults funcionan para un sitio estático, no toques nada)
3. Cada `git push` a la rama principal despliega solo — no hace falta usar
   la terminal de Vercel para nada de esto

**Lección de la sesión con Gabriela**: si el token/integración de Claude con
Vercel devuelve `403 Forbidden` al intentar cualquier cosa que cueste dinero
o cambie configuración del proyecto (dominios, alias, variables de entorno),
NO es un bug — es la barrera de seguridad funcionando bien. Para ahí y pásale
el paso a la persona.

## 3. Dominio propio

1. Dentro del proyecto en Vercel → menú izquierdo → **"Domains"**
2. Si el buscador de arriba dice "No domains found" y ofrece
   "Want to purchase a domain instead?" — ese es el link correcto, no el
   buscador de arriba (ese busca entre dominios que YA son tuyos)
3. Busca el nombre deseado, compara precio de año 1 vs renovación (algunos
   TLD suben fuerte el segundo año — avísale al cliente)
4. Antes de pagar: revisa si aparece un aviso de **"Action Required — billing
   address missing"** en la barra lateral. Si aparece, resuélvelo primero
   (Update Address) o el pago se puede caer
5. Si el pago rebota, casi siempre es el banco (límite de tarjeta), no
   Vercel — pídele al cliente que revise la app de su banco antes de
   reintentar varias veces seguidas (Vercel bloquea temporalmente por
   "intentos reiterados" si insiste)
6. Una vez comprado: Project → Settings → Domains → escribe el dominio →
   confirma "Connect to an environment: Production" → "Add Domain"

## 4. Formspree (formulario de contacto)

1. formspree.io → "Get Started" → registro con el email del cliente
2. Elegir uso: "Mi empresa/organización" (no "Proyectos personales")
3. Crear un formulario nuevo, cualquier nombre interno sirve
4. Copiar el endpoint (`https://formspree.io/f/XXXXXXXX`) — eso reemplaza
   `{{FORMSPREE_ENDPOINT}}` en el boilerplate
5. **Importante**: el primer envío de prueba dispara un correo de
   confirmación de Formspree al dueño de la cuenta — dile que lo confirme,
   si no los mensajes reales no van a llegar aunque el formulario "funcione"
   en pantalla

## Orden recomendado

GitHub → Vercel (conectado al repo) → construir y publicar el sitio →
Formspree (probar el formulario) → Dominio (al final, para no pagar por un
dominio mientras el sitio todavía está incompleto).
