import { n as __exportAll, t as createComponent } from "./compiler_dODt0_xV.mjs";
import { E as createAstro, f as renderTemplate, g as maybeRenderHead, o as renderComponent, v as addAttribute } from "./server_DMWtbmF5.mjs";
import { a as getNoticiaBySlug, n as $$Layout, o as getNoticiasPublicadas, r as $$Icon, t as formatFecha } from "./formato_BK0EqfC1.mjs";
//#region src/pages/noticias/[slug].astro
var _slug__exports = /* @__PURE__ */ __exportAll({
	default: () => $$Slug,
	file: () => $$file,
	prerender: () => false,
	revalidate: () => 60,
	url: () => $$url
});
createAstro("https://astro.build");
var $$Slug = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Slug;
	const { slug } = Astro.params;
	const noticia = await getNoticiaBySlug(slug);
	if (!noticia) return Astro.redirect("/noticias/");
	const recientes = (await getNoticiasPublicadas(3)).filter((n) => n.id !== noticia.id).slice(0, 3);
	const parrafos = (noticia.cuerpo ?? "").split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
	const fecha = formatFecha(noticia.fecha_publicacion ?? noticia.created_at);
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {
		"title": noticia.titulo,
		"description": noticia.resumen ?? noticia.titulo,
		"image": noticia.imagen_url ?? void 0
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<article class="bg-hueso"><div class="mx-auto max-w-3xl px-4 py-16 sm:px-6"><a href="/noticias/" class="inline-flex items-center gap-1.5 text-sm font-semibold text-albero-600 hover:text-nocturno">${renderComponent($$result, "Icon", $$Icon, {
		"name": "arrow-right",
		"class": "h-4 w-4 rotate-180"
	})}Todas las noticias</a><h1 class="mt-4 font-display text-3xl font-bold leading-tight text-nocturno sm:text-4xl">${noticia.titulo}</h1>${fecha && renderTemplate`<p class="mt-3 text-sm font-semibold uppercase tracking-wider text-tinta/50">${fecha}</p>`}${noticia.imagen_url && renderTemplate`<img${addAttribute(noticia.imagen_url, "src")}${addAttribute(noticia.titulo, "alt")} class="mt-8 aspect-[16/9] w-full rounded-xl object-cover shadow-md">`}${noticia.resumen && renderTemplate`<p class="mt-8 border-l-4 border-albero pl-4 text-lg italic leading-relaxed text-nocturno/80">${noticia.resumen}</p>`}<div class="mt-6 space-y-4 text-base leading-relaxed text-tinta/80">${parrafos.length > 0 ? parrafos.map((p) => renderTemplate`<p>${p}</p>`) : renderTemplate`<p>${noticia.resumen ?? noticia.titulo}</p>`}</div></div></article>${recientes.length > 0 && renderTemplate`<section class="border-t border-slate-200 bg-white py-16"><div class="mx-auto max-w-6xl px-4 sm:px-6"><h2 class="font-display text-2xl font-bold text-nocturno">Noticias recientes</h2><div class="mt-8 grid gap-6 md:grid-cols-3">${recientes.map((n) => renderTemplate`<a${addAttribute(`/noticias/${n.id}/`, "href")} class="rounded-xl border border-slate-200 bg-hueso p-6 transition hover:shadow-md">${formatFecha(n.fecha_publicacion ?? n.created_at) && renderTemplate`<p class="text-xs font-semibold uppercase tracking-wider text-albero-600">${formatFecha(n.fecha_publicacion ?? n.created_at)}</p>`}<h3 class="mt-2 font-display text-lg font-bold leading-snug text-nocturno">${n.titulo}</h3></a>`)}</div></div></section>`}` })}`;
}, "C:/Users/Anibal/Desktop/club-atletismo-san-clemente/src/pages/noticias/[slug].astro", void 0);
var $$file = "C:/Users/Anibal/Desktop/club-atletismo-san-clemente/src/pages/noticias/[slug].astro";
var $$url = "/noticias/[slug]";
//#endregion
//#region \0virtual:astro:page:src/pages/noticias/[slug]@_@astro
var page = () => _slug__exports;
//#endregion
export { page };
