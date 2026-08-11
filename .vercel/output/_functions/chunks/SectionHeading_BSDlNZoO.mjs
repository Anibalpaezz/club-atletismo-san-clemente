import { t as createComponent } from "./compiler_dODt0_xV.mjs";
import { E as createAstro, f as renderTemplate, g as maybeRenderHead, o as renderComponent, v as addAttribute } from "./server_DMWtbmF5.mjs";
import { r as $$Icon, t as formatFecha } from "./formato_BK0EqfC1.mjs";
//#region src/components/CarreraBanner.astro
createAstro("https://astro.build");
var $$CarreraBanner = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$CarreraBanner;
	const { carrera } = Astro.props;
	const fecha = formatFecha(carrera.fecha ?? null);
	const fichas = [
		carrera.fecha ? {
			icono: "calendar",
			label: "Fecha",
			valor: fecha || "Próximamente"
		} : null,
		{
			icono: "clock",
			label: "Salida",
			valor: carrera.hora ? `${carrera.hora} h` : "22:00 h"
		},
		{
			icono: "map-pin",
			label: "Lugar",
			valor: carrera.lugar ?? "Plaza Mayor, San Clemente"
		},
		{
			icono: "trophy",
			label: "Prueba",
			valor: "10K + 5K de iniciación"
		}
	].filter(Boolean);
	return renderTemplate`${maybeRenderHead($$result)}<div class="rounded-2xl border border-albero/30 bg-nocturno text-white shadow-xl shadow-nocturno/20"><div class="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 px-6 py-5 sm:px-8"><div><p class="text-xs font-bold uppercase tracking-widest text-albero">Carrera Popular 10K Nocturna</p><h3 class="mt-1 font-display text-2xl font-bold">Villa de San Clemente</h3></div>${carrera.edicion && renderTemplate`<span class="rounded-full border border-albero/40 bg-albero/10 px-4 py-1 text-sm font-semibold text-albero">${carrera.edicion}</span>`}</div><dl class="grid gap-6 px-6 py-6 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">${fichas.map((ficha) => renderTemplate`<div class="flex items-start gap-3"><span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-albero/15 text-albero">${renderComponent($$result, "Icon", $$Icon, {
		"name": ficha.icono,
		"class": "h-5 w-5"
	})}</span><div><dt class="text-xs font-semibold uppercase tracking-wider text-white/50">${ficha.label}</dt><dd class="mt-0.5 text-sm font-semibold leading-snug">${ficha.valor}</dd></div></div>`)}</dl><div class="flex flex-wrap gap-3 border-t border-white/10 px-6 py-5 sm:px-8">${carrera.enlace_inscripcion && renderTemplate`<a${addAttribute(carrera.enlace_inscripcion, "href")} target="_blank" rel="noreferrer noopener" class="inline-flex items-center gap-2 rounded-md bg-albero px-5 py-2.5 text-sm font-bold text-nocturno transition hover:bg-albero-100">${carrera.texto_cta ?? "Inscríbete"}${renderComponent($$result, "Icon", $$Icon, {
		"name": "external",
		"class": "h-4 w-4"
	})}</a>`}${carrera.enlace_clasificaciones && renderTemplate`<a${addAttribute(carrera.enlace_clasificaciones, "href")} target="_blank" rel="noreferrer noopener" class="inline-flex items-center gap-2 rounded-md border border-white/25 px-5 py-2.5 text-sm font-bold text-white transition hover:border-albero hover:text-albero">Clasificaciones${renderComponent($$result, "Icon", $$Icon, {
		"name": "external",
		"class": "h-4 w-4"
	})}</a>`}<a href="/carrera/" class="inline-flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-semibold text-white/70 transition hover:text-white">Toda la información${renderComponent($$result, "Icon", $$Icon, {
		"name": "arrow-right",
		"class": "h-4 w-4"
	})}</a></div></div>`;
}, "C:/Users/Anibal/Desktop/club-atletismo-san-clemente/src/components/CarreraBanner.astro", void 0);
//#endregion
//#region src/components/SectionHeading.astro
createAstro("https://astro.build");
var $$SectionHeading = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$SectionHeading;
	const { eyebrow, title, description, align = "center", class: className = "" } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<div${addAttribute(`mx-auto max-w-2xl ${align === "center" ? "text-center" : ""} ${className}`, "class")}>${eyebrow && renderTemplate`<p class="text-xs font-bold uppercase tracking-[0.2em] text-albero-600">${eyebrow}</p>`}<h2 class="mt-3 font-display text-3xl font-bold text-nocturno sm:text-4xl">${title}</h2>${description && renderTemplate`<p class="mt-4 text-lg leading-relaxed text-tinta/70">${description}</p>`}<div${addAttribute(`mt-5 h-1 w-14 rounded-full bg-albero ${align === "center" ? "mx-auto" : ""}`, "class")}></div></div>`;
}, "C:/Users/Anibal/Desktop/club-atletismo-san-clemente/src/components/SectionHeading.astro", void 0);
//#endregion
export { $$CarreraBanner as n, $$SectionHeading as t };
