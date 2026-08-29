# Cuñape Monona — cómo dejar todo funcionando

Son 3 páginas: `index.html` (catálogo), `admin.html` (panel) y `trivia.html` (juego). Antes de subir a Vercel hay que conectar la base de datos.

## 1. Crear el proyecto en Supabase (gratis)

1. Entra a https://supabase.com y crea una cuenta.
2. "New project" → ponle un nombre (ej. `cunape-monona`) → elige una contraseña de base de datos (guárdala) → crea el proyecto.
3. Cuando esté listo, ve a **SQL Editor** → **New query**, pega todo el contenido de `supabase-schema.sql` y dale **Run**. Esto crea las tablas de productos, pedidos, jugadores y canjes.

## 2. Obtener tus claves

1. En Supabase, ve a **Project Settings** → **API**.
2. Copia el **Project URL** y la **anon public key**.
3. Reemplaza en los 3 archivos (`index.html`, `admin.html`, `trivia.html`) estas líneas:
   ```js
   const SUPABASE_URL = "TU_SUPABASE_URL";
   const SUPABASE_ANON_KEY = "TU_SUPABASE_ANON_KEY";
   ```
   por tus valores reales.

## 3. Crear tu usuario de administrador

1. En Supabase, ve a **Authentication** → **Users** → **Add user**.
2. Pon tu correo y una contraseña — con eso vas a entrar a `admin.html`.

## 4. Subir stock inicial

Entra a `admin.html`, inicia sesión, ve a la pestaña **Stock** y carga la cantidad de bolsas disponibles de cada producto. El catálogo público (`index.html`) no muestra el stock, así que puedes cargarlo con calma.

## 5. Publicar en GitHub + Vercel

Mismo flujo que ya usas: sube estos archivos a un repositorio de GitHub y conéctalo a Vercel. Al ser un sitio estático (sin build), no necesita configuración especial.

## Pendiente de tu parte

- Reemplazar `WHATSAPP_NUMBER` en `index.html` con tu número real (código de país + número, sin espacios ni +).
- Subir las fotos definitivas de cada producto (por ahora usa el editor de imágenes desde el mismo catálogo).
- Avisarme si quieres cambiar el costo en puntos del canje (hoy: 50 puntos) o el premio que se entrega.
