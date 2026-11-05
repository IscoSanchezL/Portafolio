# Portafolio ISKONEX

Sitio estático (sin compilación). Mismo flujo que el resto: GitHub → Cloudflare Workers Builds.

- `public/` el sitio. `wrangler.jsonc` publicación en Cloudflare.
- Comando de compilación: ninguno. Comando de implementación: `npx wrangler deploy`.
- Formulario de contacto: envía a **admin@iskonex.com** mediante FormSubmit. La primera vez que alguien lo use, FormSubmit manda a ese correo un mensaje de activación; hay que confirmarlo una sola vez.
- Las capturas son de entornos de demostración (emuladores), sin datos reales.
