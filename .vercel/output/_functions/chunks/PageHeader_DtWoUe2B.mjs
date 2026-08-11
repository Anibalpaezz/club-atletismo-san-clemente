import { t as createComponent } from "./compiler_dODt0_xV.mjs";
import { E as createAstro, f as renderTemplate, g as maybeRenderHead } from "./server_DMWtbmF5.mjs";
//#region src/components/PageHeader.astro
createAstro("https://astro.build");
var $$PageHeader = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$PageHeader;
	const { title, eyebrow, description } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<section class="relative overflow-hidden bg-nocturno text-white"><img src="/images/hero-plaza-nocturna.svg" alt="" aria-hidden="true" class="absolute inset-0 h-full w-full object-cover opacity-40"><div class="absolute inset-0 bg-gradient-to-b from-nocturno/70 to-nocturno"></div><div class="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">${eyebrow && renderTemplate`<p class="text-xs font-bold uppercase tracking-[0.2em] text-albero">${eyebrow}</p>`}<h1 class="mt-3 font-display text-4xl font-bold sm:text-5xl">${title}</h1>${description && renderTemplate`<p class="mt-5 max-w-2xl text-lg leading-relaxed text-white/80">${description}</p>`}</div></section>`;
}, "C:/Users/Anibal/Desktop/club-atletismo-san-clemente/src/components/PageHeader.astro", void 0);
//#endregion
export { $$PageHeader as t };
