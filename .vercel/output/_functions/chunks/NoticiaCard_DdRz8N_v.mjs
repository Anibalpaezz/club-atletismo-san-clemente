import { t as createComponent } from "./compiler_dODt0_xV.mjs";
import { E as createAstro, f as renderTemplate, g as maybeRenderHead, o as renderComponent, v as addAttribute } from "./server_DMWtbmF5.mjs";
import { r as $$Icon, t as formatFecha } from "./formato_BK0EqfC1.mjs";
//#region src/components/NoticiaCard.astro
createAstro("https://astro.build");
var $$NoticiaCard = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$NoticiaCard;
	const { noticia } = Astro.props;
	const fecha = formatFecha(noticia.fecha_publicacion ?? noticia.created_at);
	return renderTemplate`${maybeRenderHead($$result)}<a${addAttribute(`/noticias/${noticia.id}/`, "href")} class="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"><div class="aspect-[16/9] overflow-hidden bg-hueso">${noticia.imagen_url ? renderTemplate`<img${addAttribute(noticia.imagen_url, "src")}${addAttribute(noticia.titulo, "alt")} class="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]" loading="lazy">` : renderTemplate`<div class="flex h-full w-full items-center justify-center bg-nocturno/5">${renderComponent($$result, "Icon", $$Icon, {
		"name": "flag",
		"class": "h-10 w-10 text-albero"
	})}</div>`}</div><div class="flex flex-1 flex-col gap-2 p-5">${fecha && renderTemplate`<p class="text-xs font-semibold uppercase tracking-wider text-albero-600">${fecha}</p>`}<h3 class="font-display text-lg font-bold leading-snug text-nocturno group-hover:text-nocturno-600">${noticia.titulo}</h3>${noticia.resumen && renderTemplate`<p class="line-clamp-3 text-sm leading-relaxed text-tinta/70">${noticia.resumen}</p>`}<span class="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-semibold text-albero-600">Leer más${renderComponent($$result, "Icon", $$Icon, {
		"name": "arrow-right",
		"class": "h-4 w-4 transition group-hover:translate-x-0.5"
	})}</span></div></a>`;
}, "C:/Users/Anibal/Desktop/club-atletismo-san-clemente/src/components/NoticiaCard.astro", void 0);
//#endregion
export { $$NoticiaCard as t };
