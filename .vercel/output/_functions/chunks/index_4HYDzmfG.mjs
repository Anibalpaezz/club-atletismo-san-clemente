import { n as __exportAll, t as createComponent } from "./compiler_dODt0_xV.mjs";
import { f as renderTemplate, g as maybeRenderHead, o as renderComponent, v as addAttribute } from "./server_DMWtbmF5.mjs";
import { c as SITE, i as getCarreraConfig, n as $$Layout, o as getNoticiasPublicadas, r as $$Icon, s as getPatrocinadores } from "./formato_BK0EqfC1.mjs";
import { n as $$CarreraBanner, t as $$SectionHeading } from "./SectionHeading_BSDlNZoO.mjs";
import { t as $$NoticiaCard } from "./NoticiaCard_DdRz8N_v.mjs";
//#region src/components/Hero.astro
var $$Hero = createComponent(async ($$result, $$props, $$slots) => {
	const carrera = await getCarreraConfig();
	const heroImage = "/images/hero-plaza-nocturna.svg";
	const enlaces = [
		{
			href: carrera?.enlace_inscripcion ?? "/carrera/#inscripcion",
			label: "Inscripción",
			destacado: true,
			externo: Boolean(carrera?.enlace_inscripcion?.startsWith("http"))
		},
		{
			href: "/carrera/#reglamento",
			label: "Reglamento",
			destacado: false,
			externo: false
		},
		{
			href: "/carrera/#recorrido",
			label: "Recorrido",
			destacado: false,
			externo: false
		}
	];
	return renderTemplate`${maybeRenderHead($$result)}<section class="relative overflow-hidden bg-nocturno text-white"><img${addAttribute(heroImage, "src")} alt="Plaza Mayor de San Clemente de noche, escenario de la 10K Nocturna" class="absolute inset-0 h-full w-full object-cover" fetchpriority="high"><div class="absolute inset-0 bg-gradient-to-b from-nocturno/80 via-nocturno/60 to-nocturno"></div><div class="relative mx-auto flex max-w-6xl flex-col justify-end px-4 pb-16 pt-32 sm:px-6 md:min-h-[70vh] md:pb-24"><p class="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-albero/50 bg-nocturno/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-albero backdrop-blur">${renderComponent($$result, "Icon", $$Icon, {
		"name": "trophy",
		"class": "h-4 w-4"
	})}Club de atletismo popular · San Clemente (Cuenca)</p><h1 class="max-w-3xl font-display text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">Club Atletismo <span class="text-albero">San Clemente</span></h1><p class="mt-5 max-w-2xl text-lg italic text-white/90 sm:text-xl">“${SITE.lema}”</p><div class="mt-9 flex flex-wrap gap-3">${enlaces.map((enlace) => enlace.destacado ? renderTemplate`<a${addAttribute(enlace.href, "href")}${addAttribute(enlace.externo ? "_blank" : void 0, "target")}${addAttribute(enlace.externo ? "noreferrer noopener" : void 0, "rel")} class="inline-flex items-center gap-2 rounded-md bg-albero px-6 py-3 text-sm font-bold text-nocturno shadow-lg shadow-nocturno/40 transition hover:bg-albero-100">${enlace.label}${enlace.externo && renderTemplate`${renderComponent($$result, "Icon", $$Icon, {
		"name": "external",
		"class": "h-4 w-4"
	})}`}</a>` : renderTemplate`<a${addAttribute(enlace.href, "href")} class="inline-flex items-center gap-2 rounded-md border border-white/30 bg-white/5 px-6 py-3 text-sm font-bold text-white backdrop-blur transition hover:border-albero hover:text-albero">${enlace.label}</a>`)}</div></div></section>`;
}, "C:/Users/Anibal/Desktop/club-atletismo-san-clemente/src/components/Hero.astro", void 0);
//#endregion
//#region src/pages/index.astro
var pages_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	prerender: () => false,
	revalidate: () => 60,
	url: () => ""
});
var $$Index = createComponent(async ($$result, $$props, $$slots) => {
	const carrera = await getCarreraConfig();
	const noticias = await getNoticiasPublicadas(3);
	const patrocinadores = await getPatrocinadores();
	const valoresClub = [
		{
			icono: "users",
			titulo: "Un club para todos",
			texto: "Del que se estrena al más rápido: todos los niveles tienen hueco en el atletismo popular."
		},
		{
			icono: "route",
			titulo: "Presencia en el circuito",
			texto: "Participamos en el Circuito Provincial de Carreras Populares de la Diputación de Cuenca."
		},
		{
			icono: "flag",
			titulo: "Organizamos la 10K Nocturna",
			texto: "La prueba que cada año pone a San Clemente en el mapa del atletismo popular."
		}
	];
	const lugaresRuta = [
		{
			titulo: "Plaza Mayor",
			texto: "Salida y meta de la carrera. Junto al Antiguo Ayuntamiento renacentista del siglo XVI, es el corazón monumental de la villa."
		},
		{
			titulo: "Paraje de Rus",
			texto: "Suelo privilegiado de entrenamiento a un paso del casco urbano, entre viñedos y naturaleza manchega."
		},
		{
			titulo: "Gastronomía manchega",
			texto: "Morteruelo, migas y vino de la tierra: la mejor recompensa después de correr por la Joya del Renacimiento Manchego."
		}
	];
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {
		"title": SITE.name,
		"description": SITE.descripcion
	}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "Hero", $$Hero, {})}${maybeRenderHead($$result)}<section class="bg-hueso py-20"><div class="mx-auto max-w-6xl px-4 sm:px-6">${renderComponent($$result, "SectionHeading", $$SectionHeading, {
		"eyebrow": "El Club",
		"title": "Atletismo popular con raíces manchegas",
		"description": "Nacimos de un grupo de amigos que corría por los caminos de San Clemente y hoy somos un club de referencia en el atletismo popular conquense."
	})}<div class="mt-12 grid gap-6 md:grid-cols-3">${valoresClub.map((v) => renderTemplate`<div class="rounded-xl border border-slate-200 bg-white p-7 shadow-sm"><span class="flex h-12 w-12 items-center justify-center rounded-full bg-nocturno/5 text-nocturno-600">${renderComponent($$result, "Icon", $$Icon, {
		"name": v.icono,
		"class": "h-6 w-6"
	})}</span><h3 class="mt-5 font-display text-xl font-bold text-nocturno">${v.titulo}</h3><p class="mt-2 text-sm leading-relaxed text-tinta/70">${v.texto}</p></div>`)}</div><div class="mt-10 flex justify-center"><a href="/el-club/" class="inline-flex items-center gap-2 rounded-md border-2 border-nocturno px-6 py-3 text-sm font-bold text-nocturno transition hover:bg-nocturno hover:text-white">Conoce el club${renderComponent($$result, "Icon", $$Icon, {
		"name": "arrow-right",
		"class": "h-4 w-4"
	})}</a></div></div></section><section class="bg-nocturno py-20 text-white"><div class="mx-auto max-w-6xl px-4 sm:px-6">${renderComponent($$result, "SectionHeading", $$SectionHeading, {
		"eyebrow": "La Carrera",
		"title": "10K Nocturna Villa de San Clemente",
		"description": "Una carrera nocturna única por el casco histórico iluminado, puntuable para el Circuito Provincial de Carreras Populares de la Diputación de Cuenca."
	})}<div class="mt-12">${carrera ? renderTemplate`${renderComponent($$result, "CarreraBanner", $$CarreraBanner, { "carrera": carrera })}` : renderTemplate`<p class="text-center text-white/70">La información de la edición se publicará próximamente. Escríbenos a ${SITE.email} para consultas.</p>`}</div></div></section><section class="bg-hueso py-20"><div class="mx-auto max-w-6xl px-4 sm:px-6">${renderComponent($$result, "SectionHeading", $$SectionHeading, {
		"eyebrow": "San Clemente en Ruta",
		"title": "Ven a correr, quédate a conocer la Joya",
		"description": "San Clemente (Cuenca), la Joya del Renacimiento Manchego, es mucho más que una salida y una meta."
	})}<div class="mt-12 grid gap-6 md:grid-cols-3">${lugaresRuta.map((lugar, i) => renderTemplate`<div class="rounded-xl border border-slate-200 bg-white p-7 shadow-sm"><span class="text-sm font-bold text-albero-600">0${i + 1}</span><h3 class="mt-2 font-display text-xl font-bold text-nocturno">${lugar.titulo}</h3><p class="mt-2 text-sm leading-relaxed text-tinta/70">${lugar.texto}</p></div>`)}</div><div class="mt-10 flex justify-center"><a href="/ruta/" class="inline-flex items-center gap-2 rounded-md border-2 border-nocturno px-6 py-3 text-sm font-bold text-nocturno transition hover:bg-nocturno hover:text-white">Descubre San Clemente${renderComponent($$result, "Icon", $$Icon, {
		"name": "arrow-right",
		"class": "h-4 w-4"
	})}</a></div></div></section><section class="bg-white py-20"><div class="mx-auto max-w-6xl px-4 sm:px-6"><div class="flex flex-wrap items-end justify-between gap-4">${renderComponent($$result, "SectionHeading", $$SectionHeading, {
		"align": "left",
		"eyebrow": "Noticias",
		"title": "Últimas del club y del circuito",
		"description": "Resultados, inscripciones, entrenamientos y carreras del Circuito Provincial de Cuenca."
	})}<a href="/noticias/" class="inline-flex items-center gap-2 rounded-md border-2 border-nocturno px-5 py-2.5 text-sm font-bold text-nocturno transition hover:bg-nocturno hover:text-white">Todas las noticias${renderComponent($$result, "Icon", $$Icon, {
		"name": "arrow-right",
		"class": "h-4 w-4"
	})}</a></div>${noticias.length > 0 ? renderTemplate`<div class="mt-10 grid gap-6 md:grid-cols-3">${noticias.map((n) => renderTemplate`${renderComponent($$result, "NoticiaCard", $$NoticiaCard, { "noticia": n })}`)}</div>` : renderTemplate`<div class="mt-10 rounded-xl border border-dashed border-slate-300 bg-hueso p-10 text-center"><p class="text-sm text-tinta/60">Las noticias del club se publicarán aquí en cuanto se configuren en Supabase.</p></div>`}</div></section><section class="border-t border-slate-200 bg-hueso py-16"><div class="mx-auto max-w-6xl px-4 sm:px-6"><div class="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">${patrocinadores.length > 0 ? patrocinadores.map((p) => p.url_web ? renderTemplate`<a${addAttribute(p.url_web, "href")} target="_blank" rel="noreferrer noopener" class="text-lg font-bold text-tinta/50 transition hover:text-nocturno">${p.logo_url ? renderTemplate`<img${addAttribute(p.logo_url, "src")}${addAttribute(p.nombre, "alt")} class="h-10 w-auto max-w-40 object-contain" loading="lazy">` : p.nombre}</a>` : renderTemplate`<span class="text-lg font-bold text-tinta/50">${p.logo_url ? renderTemplate`<img${addAttribute(p.logo_url, "src")}${addAttribute(p.nombre, "alt")} class="h-10 w-auto max-w-40 object-contain" loading="lazy">` : p.nombre}</span>`) : renderTemplate`<p class="text-sm text-tinta/50">Colaboran: Ayuntamiento de San Clemente · Diputación de Cuenca · Cronomancha</p>`}</div></div></section>` })}`;
}, "C:/Users/Anibal/Desktop/club-atletismo-san-clemente/src/pages/index.astro", void 0);
var $$file = "C:/Users/Anibal/Desktop/club-atletismo-san-clemente/src/pages/index.astro";
//#endregion
//#region \0virtual:astro:page:src/pages/index@_@astro
var page = () => pages_exports;
//#endregion
export { page };
