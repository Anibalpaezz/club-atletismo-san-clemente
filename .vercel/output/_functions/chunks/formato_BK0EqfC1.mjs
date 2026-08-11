import { t as createComponent } from "./compiler_dODt0_xV.mjs";
import { E as createAstro, _ as renderHead, f as renderTemplate, g as maybeRenderHead, l as renderSlot, o as renderComponent, v as addAttribute } from "./server_DMWtbmF5.mjs";
import { useEffect, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { createClient } from "@supabase/supabase-js";
//#region src/lib/site.ts
var SITE = {
	name: "Club Atletismo San Clemente",
	nombreCorto: "Atletismo San Clemente",
	lema: "Corriendo por la Joya del Renacimiento Manchego",
	email: "losquevanacorrertesaludan@hotmail.com",
	blogspot: "https://clubatletismosanclemente.blogspot.com",
	municipio: "San Clemente (Cuenca)",
	descripcion: "Club de atletismo popular de San Clemente (Cuenca), organizador de la Carrera Popular 10K Nocturna Villa de San Clemente."
};
var NAV = [
	{
		href: "/",
		label: "Inicio"
	},
	{
		href: "/el-club/",
		label: "El Club"
	},
	{
		href: "/carrera/",
		label: "La Carrera"
	},
	{
		href: "/ruta/",
		label: "San Clemente en Ruta"
	},
	{
		href: "/noticias/",
		label: "Noticias"
	},
	{
		href: "/contacto/",
		label: "Contacto"
	}
];
var REDES = [
	{
		nombre: "Blogspot (histórico)",
		href: SITE.blogspot,
		icono: "blogspot"
	},
	{
		nombre: "Facebook",
		href: "https://www.facebook.com/",
		icono: "facebook",
		placeholder: true
	},
	{
		nombre: "Instagram",
		href: "https://www.instagram.com/",
		icono: "instagram",
		placeholder: true
	}
];
//#endregion
//#region src/components/Logo.astro
createAstro("https://astro.build");
var $$Logo = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Logo;
	const { class: className } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<svg${addAttribute(className, "class")} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Club Atletismo San Clemente"><circle cx="32" cy="32" r="31" fill="currentColor" opacity="0.08"></circle><path d="M12 44c2.8-6.2 8.2-9.6 14.5-10.4l-3.4 4.2c1.6.5 3.3 1.1 4.9 2.1l6.1-8.3-1-6.1 4-4.4 3.6 4.8 4.7-1.5 1.7 4.4-5.3 2-3.5 2.1-.4 4 5.8 6.1 3.9-2.4 2 4.6-5.7 4.3" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" transform="rotate(-8 32 32)"></path><path d="M10 22h44M14 18c0-1.4 1.1-2.5 2.5-2.5s2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5S14 23.4 14 22Z" stroke="currentColor" stroke-width="3" stroke-linecap="round"></path></svg>`;
}, "C:/Users/Anibal/Desktop/club-atletismo-san-clemente/src/components/Logo.astro", void 0);
//#endregion
//#region src/components/MobileMenu.tsx
function MobileMenu({ items, ctaHref, ctaLabel }) {
	const [open, setOpen] = useState(false);
	return /* @__PURE__ */ jsxs("div", {
		className: "md:hidden",
		children: [/* @__PURE__ */ jsx("button", {
			type: "button",
			"aria-label": open ? "Cerrar menú" : "Abrir menú",
			"aria-expanded": open,
			onClick: () => setOpen((v) => !v),
			className: "inline-flex h-10 w-10 items-center justify-center rounded-md text-white hover:bg-white/10",
			children: open ? /* @__PURE__ */ jsx("svg", {
				viewBox: "0 0 24 24",
				className: "h-6 w-6",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "2",
				strokeLinecap: "round",
				children: /* @__PURE__ */ jsx("path", { d: "M18 6 6 18M6 6l12 12" })
			}) : /* @__PURE__ */ jsx("svg", {
				viewBox: "0 0 24 24",
				className: "h-6 w-6",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "2",
				strokeLinecap: "round",
				children: /* @__PURE__ */ jsx("path", { d: "M4 6h16M4 12h16M4 18h16" })
			})
		}), open && /* @__PURE__ */ jsx("div", {
			className: "absolute inset-x-0 top-full z-50 border-t border-white/10 bg-nocturno shadow-xl md:hidden",
			children: /* @__PURE__ */ jsxs("nav", {
				className: "mx-auto flex max-w-6xl flex-col px-4 py-4",
				"aria-label": "Menú móvil",
				children: [items.map((item) => /* @__PURE__ */ jsx("a", {
					href: item.href,
					onClick: () => setOpen(false),
					className: "rounded-md px-3 py-2.5 text-sm font-medium text-white/90 hover:bg-white/10 hover:text-white",
					children: item.label
				}, item.href)), /* @__PURE__ */ jsx("a", {
					href: ctaHref,
					onClick: () => setOpen(false),
					className: "mt-3 inline-flex items-center justify-center rounded-md bg-albero px-4 py-2.5 text-sm font-semibold text-nocturno hover:bg-albero-100",
					children: ctaLabel
				})]
			})
		})]
	});
}
//#endregion
//#region src/lib/supabase.ts
var url = void 0;
var key = void 0;
var supabaseEnabled = Boolean(url);
var supabase = supabaseEnabled ? createClient(url, key, { auth: { persistSession: false } }) : null;
//#endregion
//#region src/lib/db.ts
async function getNoticiasPublicadas(limit = 12) {
	if (!supabaseEnabled) return [];
	const { data, error } = await supabase.from("noticias").select("*").eq("publicado", true).order("fecha_publicacion", { ascending: false }).limit(limit);
	if (error) {
		console.error("[supabase] getNoticiasPublicadas:", error.message);
		return [];
	}
	return data ?? [];
}
async function getNoticiaBySlug(slug) {
	if (!supabaseEnabled) return null;
	const { data, error } = await supabase.from("noticias").select("*").eq("id", slug).eq("publicado", true).single();
	if (error) {
		console.error("[supabase] getNoticiaBySlug:", error.message);
		return null;
	}
	return data;
}
async function getPatrocinadores() {
	if (!supabaseEnabled) return [];
	const { data, error } = await supabase.from("patrocinadores").select("*").order("orden", {
		ascending: true,
		nullsFirst: false
	});
	if (error) {
		console.error("[supabase] getPatrocinadores:", error.message);
		return [];
	}
	return data ?? [];
}
async function getCarreraConfig() {
	if (!supabaseEnabled) return null;
	const { data, error } = await supabase.from("carrera_config").select("*").eq("activo", true).order("edicion", {
		ascending: false,
		nullsFirst: false
	}).limit(1).single();
	if (error) {
		console.error("[supabase] getCarreraConfig:", error.message);
		return null;
	}
	return data;
}
//#endregion
//#region src/components/Header.astro
var $$Header = createComponent(async ($$result, $$props, $$slots) => {
	const carrera = await getCarreraConfig();
	const ctaHref = carrera?.enlace_inscripcion ?? "/carrera/";
	const ctaLabel = carrera?.texto_cta ?? "Inscríbete a la 10K Nocturna";
	return renderTemplate`${maybeRenderHead($$result)}<header class="sticky top-0 z-40 border-b border-white/10 bg-nocturno/95 backdrop-blur"><div class="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6"><a href="/" class="flex min-w-0 items-center gap-2.5"${addAttribute(`Inicio — ${SITE.name}`, "aria-label")}>${renderComponent($$result, "Logo", $$Logo, { "class": "h-10 w-10 shrink-0 text-albero" })}<span class="hidden min-w-0 flex-col leading-tight sm:flex"><span class="truncate text-sm font-bold text-white">Club Atletismo</span><span class="truncate text-xs font-semibold uppercase tracking-wider text-albero">San Clemente</span></span></a><nav class="hidden items-center gap-1 md:flex" aria-label="Principal">${NAV.map((item) => renderTemplate`<a${addAttribute(item.href, "href")} class="rounded-md px-3 py-2 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white">${item.label}</a>`)}</nav><div class="hidden md:block"><a${addAttribute(ctaHref, "href")}${addAttribute(ctaHref.startsWith("http") ? "_blank" : void 0, "target")}${addAttribute(ctaHref.startsWith("http") ? "noreferrer noopener" : void 0, "rel")} class="inline-flex items-center gap-1.5 rounded-md bg-albero px-4 py-2 text-sm font-semibold text-nocturno transition hover:bg-albero-100">${ctaLabel}</a></div>${renderComponent($$result, "MobileMenu", MobileMenu, {
		"client:load": true,
		"items": NAV,
		"ctaHref": ctaHref,
		"ctaLabel": ctaLabel,
		"client:component-hydration": "load",
		"client:component-path": "C:/Users/Anibal/Desktop/club-atletismo-san-clemente/src/components/MobileMenu.tsx",
		"client:component-export": "default"
	})}</div></header>`;
}, "C:/Users/Anibal/Desktop/club-atletismo-san-clemente/src/components/Header.astro", void 0);
//#endregion
//#region src/components/Icon.astro
createAstro("https://astro.build");
var $$Icon = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Icon;
	const { name, class: className = "h-5 w-5" } = Astro.props;
	return renderTemplate`${name === "mail" && renderTemplate`${maybeRenderHead($$result)}<svg${addAttribute(className, "class")} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"></rect><path d="m22 7-10 6L2 7"></path></svg>`}${name === "facebook" && renderTemplate`<svg${addAttribute(className, "class")} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.52 1.5-3.91 3.78-3.91 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.57v1.88h2.78l-.45 2.9h-2.33V22c4.78-.79 8.44-4.94 8.44-9.94Z"></path></svg>`}${name === "instagram" && renderTemplate`<svg${addAttribute(className, "class")} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5"></rect><circle cx="12" cy="12" r="4"></circle><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"></circle></svg>`}${name === "blogspot" && renderTemplate`<svg${addAttribute(className, "class")} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19.9 8.6c-.3-.3-.6-.6-.9-.9-1.3-1.2-2.7-2-4.4-2.3-.8-.1-1.7-.1-2.5-.1h-2.7C6 5.3 3.3 8 3.3 11.3v1.4c0 3.3 2.7 6 6 6h2.4c2.5 0 4.8-1.7 5.5-4.2.3-1 .4-1.9.4-2.9v-1.4c0-.9-.5-1.1-1.7-1.6Zm-3.7 5.4c-.2.8-.9 1.4-1.8 1.4h-4c-.7 0-1.2-.4-1.2-1 0-.5.5-1 1.2-1h4c.6 0 1.1.2 1.8.6Zm.2-3.7c-.3.6-.7 1-1.3 1h-5c-.6 0-1-.5-1-1.1 0-.5.5-1 1.1-1h4.8c.4 0 .6.1.8.2.3.2.5.4.6.9Z"></path></svg>`}${name === "clock" && renderTemplate`<svg${addAttribute(className, "class")} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path></svg>`}${name === "map-pin" && renderTemplate`<svg${addAttribute(className, "class")} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>`}${name === "users" && renderTemplate`<svg${addAttribute(className, "class")} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`}${name === "trophy" && renderTemplate`<svg${addAttribute(className, "class")} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path></svg>`}${name === "route" && renderTemplate`<svg${addAttribute(className, "class")} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="6" cy="19" r="3"></circle><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"></path><circle cx="18" cy="5" r="3"></circle></svg>`}${name === "external" && renderTemplate`<svg${addAttribute(className, "class")} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 3h6v6"></path><path d="M10 14 21 3"></path><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path></svg>`}${name === "calendar" && renderTemplate`<svg${addAttribute(className, "class")} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"></rect><path d="M16 2v4M8 2v4M3 10h18"></path></svg>`}${name === "check" && renderTemplate`<svg${addAttribute(className, "class")} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"></path></svg>`}${name === "arrow-right" && renderTemplate`<svg${addAttribute(className, "class")} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>`}${name === "flag" && renderTemplate`<svg${addAttribute(className, "class")} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><path d="M4 22v-7"></path></svg>`}`;
}, "C:/Users/Anibal/Desktop/club-atletismo-san-clemente/src/components/Icon.astro", void 0);
//#endregion
//#region src/components/Sponsors.tsx
function Sponsors({ titulo = "Colaboran" }) {
	const [patrocinadores, setPatrocinadores] = useState([]);
	const [cargado, setCargado] = useState(false);
	useEffect(() => {
		setCargado(true);
	}, []);
	if (!cargado || patrocinadores.length === 0) return null;
	return /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
		className: "mb-4 text-xs font-semibold uppercase tracking-widest opacity-60",
		children: titulo
	}), /* @__PURE__ */ jsx("ul", {
		className: "flex flex-wrap items-center gap-x-8 gap-y-4",
		children: patrocinadores.map((p) => /* @__PURE__ */ jsx("li", { children: p.url_web ? /* @__PURE__ */ jsx("a", {
			href: p.url_web,
			target: "_blank",
			rel: "noreferrer noopener",
			className: "inline-flex items-center text-sm font-semibold text-white/80 transition hover:text-white",
			children: p.logo_url ? /* @__PURE__ */ jsx("img", {
				src: p.logo_url,
				alt: p.nombre,
				className: "h-9 w-auto max-w-32 object-contain",
				loading: "lazy"
			}) : p.nombre
		}) : /* @__PURE__ */ jsx("span", {
			className: "inline-flex items-center text-sm font-semibold text-white/80",
			children: p.logo_url ? /* @__PURE__ */ jsx("img", {
				src: p.logo_url,
				alt: p.nombre,
				className: "h-9 w-auto max-w-32 object-contain",
				loading: "lazy"
			}) : p.nombre
		}) }, p.id))
	})] });
}
//#endregion
//#region src/components/Footer.astro
var $$Footer = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<footer class="bg-nocturno text-white"><div class="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3"><div><a href="/" class="flex items-center gap-2.5">${renderComponent($$result, "Logo", $$Logo, { "class": "h-10 w-10 text-albero" })}<span class="flex flex-col leading-tight"><span class="text-sm font-bold">Club Atletismo</span><span class="text-xs font-semibold uppercase tracking-wider text-albero">San Clemente</span></span></a><p class="mt-4 max-w-xs text-sm leading-relaxed text-white/70">${SITE.lema}.</p><p class="mt-2 text-sm text-white/70">Atletismo popular desde San Clemente (Cuenca), la Joya del Renacimiento Manchego.</p></div><div><p class="mb-4 text-xs font-semibold uppercase tracking-widest text-white/50">Contacto</p><a${addAttribute(`mailto:${SITE.email}`, "href")} class="inline-flex items-center gap-2 text-sm text-white/80 transition hover:text-white">${renderComponent($$result, "Icon", $$Icon, {
		"name": "mail",
		"class": "h-4 w-4 shrink-0 text-albero"
	})}${SITE.email}</a><p class="mt-5 mb-4 text-xs font-semibold uppercase tracking-widest text-white/50">Nuestro blog histórico</p><a${addAttribute(SITE.blogspot, "href")} target="_blank" rel="noreferrer noopener" class="inline-flex items-center gap-2 text-sm text-white/80 transition hover:text-white">${renderComponent($$result, "Icon", $$Icon, {
		"name": "blogspot",
		"class": "h-4 w-4 shrink-0 text-albero"
	})}clubatletismosanclemente.blogspot.com</a><p class="mt-5 mb-4 text-xs font-semibold uppercase tracking-widest text-white/50">Síguenos</p><ul class="flex items-center gap-3">${REDES.map((red) => renderTemplate`<li><a${addAttribute(red.href, "href")} target="_blank" rel="noreferrer noopener"${addAttribute(`${red.nombre}${red.placeholder ? " (pendiente de configurar)" : ""}`, "aria-label")} class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/80 transition hover:bg-albero hover:text-nocturno">${renderComponent($$result, "Icon", $$Icon, {
		"name": red.icono,
		"class": "h-5 w-5"
	})}</a></li>`)}</ul></div><div>${renderComponent($$result, "Sponsors", Sponsors, {
		"client:visible": true,
		"client:component-hydration": "visible",
		"client:component-path": "C:/Users/Anibal/Desktop/club-atletismo-san-clemente/src/components/Sponsors.tsx",
		"client:component-export": "default"
	})}</div></div><div class="border-t border-white/10"><div class="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-white/50 sm:flex-row sm:px-6"><p>© ${(/* @__PURE__ */ new Date()).getFullYear()} ${SITE.name} · San Clemente (Cuenca)</p><p class="italic text-white/40">${SITE.lema}</p></div></div></footer>`;
}, "C:/Users/Anibal/Desktop/club-atletismo-san-clemente/src/components/Footer.astro", void 0);
//#endregion
//#region src/layouts/Layout.astro
createAstro("https://astro.build");
var $$Layout = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Layout;
	const { title = SITE.name, description = SITE.descripcion, image = "/images/hero-plaza-nocturna.svg" } = Astro.props;
	const pageTitle = title === SITE.name ? title : `${title} · ${SITE.name}`;
	return renderTemplate`<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="generator"${addAttribute(Astro.generator, "content")}><title>${pageTitle}</title><meta name="description"${addAttribute(description, "content")}><meta property="og:title"${addAttribute(pageTitle, "content")}><meta property="og:description"${addAttribute(description, "content")}><meta property="og:type" content="website"><meta property="og:image"${addAttribute(image, "content")}><meta property="og:locale" content="es_ES"><meta name="theme-color" content="#0A1F44"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,500;0,600;0,700;0,800;1,500&display=swap" rel="stylesheet">${renderHead($$result)}</head><body class="flex min-h-screen flex-col">${renderComponent($$result, "Header", $$Header, {})}<main class="flex-1">${renderSlot($$result, $$slots["default"])}</main>${renderComponent($$result, "Footer", $$Footer, {})}</body></html>`;
}, "C:/Users/Anibal/Desktop/club-atletismo-san-clemente/src/layouts/Layout.astro", void 0);
//#endregion
//#region src/lib/formato.ts
function formatFecha(input) {
	if (!input) return "";
	const date = new Date(input);
	if (Number.isNaN(date.getTime())) return "";
	return new Intl.DateTimeFormat("es-ES", {
		day: "numeric",
		month: "long",
		year: "numeric"
	}).format(date);
}
//#endregion
export { getNoticiaBySlug as a, SITE as c, getCarreraConfig as i, $$Layout as n, getNoticiasPublicadas as o, $$Icon as r, getPatrocinadores as s, formatFecha as t };
