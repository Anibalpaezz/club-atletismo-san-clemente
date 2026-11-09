import type { Lang } from './ui';

/** Prefija una ruta interna con /en cuando toca. Deja intactos enlaces externos y anclas. */
export function ruta(lang: Lang, destino: string): string {
	if (!destino.startsWith('/')) return destino;
	if (lang === 'es') return destino;
	return destino === '/' ? '/en/' : `/en${destino}`;
}

/** Ruta equivalente en el otro idioma, para el conmutador de la cabecera. */
export function rutaAlterna(lang: Lang, pathname: string): string {
	const limpio = pathname.replace(/^\/en(?=\/|$)/, '') || '/';
	if (lang === 'en') return limpio;
	return limpio === '/' ? '/en/' : `/en${limpio}`;
}
