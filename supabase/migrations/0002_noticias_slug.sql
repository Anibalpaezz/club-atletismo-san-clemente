-- ============================================================
-- Club Atletismo San Clemente — Columna slug en noticias
-- Permite que las noticias de Supabase se enlacen con un slug
-- kebab-case (igual que las noticias markdown de Astro Content)
-- en lugar de con su UUID. Ejecutar en el SQL Editor de Supabase.
--
-- Nota: el código también deriva el slug en runtime cuando la
-- columna es null (src/lib/db.ts), por lo que esta migración es
-- opcional pero recomendable para normalizar la base de datos.
-- ============================================================

alter table public.noticias add column if not exists slug text;

-- Relleno inicial: slug kebab-case derivado del título.
update public.noticias
set slug = trim(both '-' from lower(regexp_replace(
  translate(
    lower(titulo),
    'áàäâéèëêíìïîóòöôúùüûñç',
    'aaaabeeeiiiioooouuuunc'
  ),
  '[^a-z0-9]+', '-', 'g'
)))
where slug is null or slug = '';
