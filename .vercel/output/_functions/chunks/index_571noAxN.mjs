import { n as __exportAll, t as createComponent } from "./compiler_dODt0_xV.mjs";
import { f as renderTemplate, g as maybeRenderHead, o as renderComponent } from "./server_DMWtbmF5.mjs";
import { n as $$Layout, o as getNoticiasPublicadas } from "./formato_BK0EqfC1.mjs";
import { t as $$PageHeader } from "./PageHeader_DtWoUe2B.mjs";
import { t as $$NoticiaCard } from "./NoticiaCard_DdRz8N_v.mjs";
//#region src/pages/noticias/index.astro
var noticias_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	prerender: () => false,
	revalidate: () => 60,
	url: () => $$url
});
var $$Index = createComponent(async ($$result, $$props, $$slots) => {
	const noticias = await getNoticiasPublicadas(50);
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {
		"title": "Noticias",
		"description": "Noticias del Club Atletismo San Clemente y del atletismo popular del circuito provincial de Cuenca."
	}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "PageHeader", $$PageHeader, {
		"eyebrow": "Noticias",
		"title": "Actualidad del club",
		"description": "Inscripciones, resultados, entrenamientos y crónicas de las carreras del Circuito Provincial de Carreras Populares de Cuenca."
	})}${maybeRenderHead($$result)}<section class="bg-hueso py-20"><div class="mx-auto max-w-6xl px-4 sm:px-6">${noticias.length > 0 ? renderTemplate`<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">${noticias.map((n) => renderTemplate`${renderComponent($$result, "NoticiaCard", $$NoticiaCard, { "noticia": n })}`)}</div>` : renderTemplate`<div class="rounded-xl border border-dashed border-slate-300 bg-white p-14 text-center"><p class="text-lg font-semibold text-nocturno">Todavía no hay noticias publicadas</p><p class="mt-2 text-sm text-tinta/60">En cuanto el club publique sus primeras noticias, aparecerán aquí.</p></div>`}</div></section>` })}`;
}, "C:/Users/Anibal/Desktop/club-atletismo-san-clemente/src/pages/noticias/index.astro", void 0);
var $$file = "C:/Users/Anibal/Desktop/club-atletismo-san-clemente/src/pages/noticias/index.astro";
var $$url = "/noticias";
//#endregion
//#region \0virtual:astro:page:src/pages/noticias/index@_@astro
var page = () => noticias_exports;
//#endregion
export { page };
