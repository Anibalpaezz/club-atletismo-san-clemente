// Sirve las versiones inglesas en /en/… reescribiendo a la misma página, que lee
// el idioma de la ruta original (Astro.originPathname). Así hay una sola
// implementación por página y cada URL se cachea por separado.
import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware((context, next) => {
	const { pathname, search } = context.url;

	if (pathname === '/en' || pathname.startsWith('/en/')) {
		const destino = pathname.replace(/^\/en/, '') || '/';
		return context.rewrite(`${destino}${search}`);
	}

	return next();
});
