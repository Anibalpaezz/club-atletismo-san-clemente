// Lectura del blog histórico del club (Blogger) para ingestionarlo en la colección
// `noticias` de este sitio.
//
// Este blog tiene los feeds de Blogger desactivados (las URLs /feeds/* devuelven
// 404), así que no hay Atom ni RSS: se rastrea el HTML público.
//
// Qué se rastrea:
//   · la portada (entradas más recientes, paginadas de una en una);
//   · cada sección del blog, que en esta plantilla son etiquetas
//     (`/search/label/<etiqueta>`).
//
// La paginación de Blogger expone la fecha de la entrada en el enlace
// "Entradas antiguas" (`?updated-max=...`), que es la única fuente fiable de
// fecha porque la plantilla no imprime la fecha en el listado.
//
// Nota: si el club vuelve a activar los feeds (Configuración → Fuentes), conviene
// cambiar esto por el Atom `?alt=json`, que es mucho más estable que el HTML.

export const BLOG_BASE = 'https://clubatletismosanclemente.blogspot.com';
const AGENTE = 'club-atletismo-san-clemente-sync/1.0';

// ---------------------------------------------------------------------------
// Mini parser HTML
// ---------------------------------------------------------------------------

export type NodoHtml =
	| { tipo: 'texto'; texto: string }
	| { tipo: 'elemento'; tag: string; atributos: Record<string, string>; hijos: NodoHtml[] };

type Elemento = Extract<NodoHtml, { tipo: 'elemento' }>;

const ETIQUETAS_VACIAS = new Set([
	'area',
	'base',
	'br',
	'col',
	'embed',
	'hr',
	'img',
	'input',
	'link',
	'meta',
	'param',
	'source',
	'track',
	'wbr',
]);

function parseAtributos(bruto: string): Record<string, string> {
	const atributos: Record<string, string> = {};
	const re = /([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+)))?/g;
	let m: RegExpExecArray | null;
	while ((m = re.exec(bruto))) {
		const nombre = m[1].toLowerCase();
		if (!nombre) continue;
		const valor = m[2] ?? m[3] ?? m[4] ?? '';
		atributos[nombre] = decodificarEntidades(valor);
	}
	return atributos;
}

export function parseHtml(html: string): NodoHtml[] {
	const raiz: NodoHtml[] = [];
	const pila: Elemento[] = [];
	let actual = raiz;

	const re =
		/<!--[\s\S]*?-->|<\/([a-zA-Z][\w:-]*)\s*>|<([a-zA-Z][\w:-]*)((?:\s+[^\s"'>/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s"'>]+))?)*)\s*(\/?)>|([^<]+)/g;
	let m: RegExpExecArray | null;
	while ((m = re.exec(html))) {
		const [bruto, cierre, apertura, atributos, autocierre, texto] = m;
		if (bruto.startsWith('<!--')) continue;

		if (cierre) {
			const tag = cierre.toLowerCase();
			for (let i = pila.length - 1; i >= 0; i--) {
				if (pila[i].tag === tag) {
					pila.length = i;
					actual = pila.length ? pila[pila.length - 1].hijos : raiz;
					break;
				}
			}
			continue;
		}

		if (apertura) {
			const tag = apertura.toLowerCase();
			const nodo: Elemento = {
				tipo: 'elemento',
				tag,
				atributos: parseAtributos(atributos ?? ''),
				hijos: [],
			};
			actual.push(nodo);
			if (!ETIQUETAS_VACIAS.has(tag) && !autocierre) {
				pila.push(nodo);
				actual = nodo.hijos;
			}
			continue;
		}

		if (texto) actual.push({ tipo: 'texto', texto });
	}

	return raiz;
}

export function buscarTodos(nodos: NodoHtml[], criterio: (nodo: Elemento) => boolean): Elemento[] {
	const encontrados: Elemento[] = [];
	const recorrer = (lista: NodoHtml[]) => {
		for (const nodo of lista) {
			if (nodo.tipo !== 'elemento') continue;
			if (criterio(nodo)) encontrados.push(nodo);
			recorrer(nodo.hijos);
		}
	};
	recorrer(nodos);
	return encontrados;
}

function clases(nodo: Elemento): string[] {
	return (nodo.atributos.class ?? '').split(/\s+/).filter(Boolean);
}

function tieneClase(nodo: Elemento, clase: string): boolean {
	return clases(nodo).includes(clase);
}

function escaparAtributo(valor: string): string {
	return valor.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}

export function serializar(nodos: NodoHtml[]): string {
	return nodos
		.map((nodo) => {
			if (nodo.tipo === 'texto') return nodo.texto;
			const atributos = Object.entries(nodo.atributos)
				.map(([nombre, valor]) => ` ${nombre}="${escaparAtributo(valor)}"`)
				.join('');
			if (ETIQUETAS_VACIAS.has(nodo.tag)) return `<${nodo.tag}${atributos}>`;
			return `<${nodo.tag}${atributos}>${serializar(nodo.hijos)}</${nodo.tag}>`;
		})
		.join('');
}

const ENTIDADES: Record<string, string> = {
	'&nbsp;': ' ',
	'&amp;': '&',
	'&lt;': '<',
	'&gt;': '>',
	'&quot;': '"',
	'&#39;': "'",
	'&apos;': "'",
	'&laquo;': '«',
	'&raquo;': '»',
	'&hellip;': '…',
	'&ndash;': '–',
	'&mdash;': '—',
	'&aacute;': 'á',
	'&eacute;': 'é',
	'&iacute;': 'í',
	'&oacute;': 'ó',
	'&uacute;': 'ú',
	'&ntilde;': 'ñ',
	'&Aacute;': 'Á',
	'&Eacute;': 'É',
	'&Iacute;': 'Í',
	'&Oacute;': 'Ó',
	'&Uacute;': 'Ú',
	'&Ntilde;': 'Ñ',
	'&ordm;': 'º',
	'&ordf;': 'ª',
};

export function decodificarEntidades(texto: string): string {
	return texto
		.replace(/&#(\d+);/g, (_, codigo: string) => String.fromCodePoint(Number(codigo)))
		.replace(/&#x([0-9a-fA-F]+);/g, (_, codigo: string) => String.fromCodePoint(parseInt(codigo, 16)))
		.replace(/&[a-zA-Z][a-zA-Z0-9]*;/g, (entidad) => ENTIDADES[entidad] ?? entidad);
}

export function textoPlano(nodos: NodoHtml[]): string {
	const trozos: string[] = [];
	const recorrer = (lista: NodoHtml[]) => {
		for (const nodo of lista) {
			if (nodo.tipo === 'texto') trozos.push(nodo.texto);
			else recorrer(nodo.hijos);
		}
	};
	recorrer(nodos);
	return decodificarEntidades(trozos.join(' ')).replace(/\s+/g, ' ').trim();
}

// ---------------------------------------------------------------------------
// Saneado del cuerpo de la entrada
// ---------------------------------------------------------------------------

const TAGS_PERMITIDAS = new Set([
	'a',
	'b',
	'blockquote',
	'br',
	'caption',
	'code',
	'em',
	'figcaption',
	'figure',
	'h2',
	'h3',
	'h4',
	'h5',
	'h6',
	'hr',
	'i',
	'img',
	'li',
	'ol',
	'p',
	'pre',
	's',
	'strong',
	'sub',
	'sup',
	'table',
	'tbody',
	'td',
	'tfoot',
	'th',
	'thead',
	'tr',
	'u',
	'ul',
]);

const TAGS_DESCARTADAS = new Set([
	'applet',
	'audio',
	'button',
	'canvas',
	'embed',
	'form',
	'iframe',
	'input',
	'link',
	'meta',
	'noscript',
	'object',
	'script',
	'select',
	'style',
	'svg',
	'textarea',
	'video',
]);

const TAGS_DESENVUELTAS = new Set([
	'article',
	'big',
	'body',
	'center',
	'div',
	'font',
	'header',
	'html',
	'main',
	'section',
	'small',
	'span',
]);

const ATRIBUTOS_PERMITIDOS: Record<string, string[]> = {
	a: ['href', 'name'],
	img: ['src', 'alt', 'width', 'height'],
	td: ['colspan', 'rowspan'],
	th: ['colspan', 'rowspan'],
};

function absolutizar(valor: string, base: string): string {
	try {
		return new URL(valor, base).toString();
	} catch {
		return valor;
	}
}

/** Blogger sirve la misma imagen a distintos tamaños en la ruta (`/s320/`, `/s1024/`…). */
function mejorarImagen(src: string): string {
	if (!/googleusercontent\.com|blogspot\.com/.test(src)) return src;
	return src.replace(/\/(s\d{2,4}|w\d{2,4}-h\d{2,4})\//, '/s1600/');
}

function sanearNodos(nodos: NodoHtml[], base: string): NodoHtml[] {
	const salida: NodoHtml[] = [];

	for (const nodo of nodos) {
		if (nodo.tipo === 'texto') {
			const texto = nodo.texto.replace(/\s+/g, ' ');
			if (texto.trim()) salida.push({ tipo: 'texto', texto });
			continue;
		}

		const tag = nodo.tag.toLowerCase();
		if (TAGS_DESCARTADAS.has(tag)) continue;

		const hijos = sanearNodos(nodo.hijos, base);

		if (TAGS_DESENVUELTAS.has(tag)) {
			salida.push(...hijos);
			continue;
		}

		if (tag === 'img') {
			const src = nodo.atributos.src ? absolutizar(nodo.atributos.src, base) : '';
			if (!src) continue;
			salida.push({
				tipo: 'elemento',
				tag: 'img',
				atributos: {
					src: mejorarImagen(src),
					alt: nodo.atributos.alt ?? '',
				},
				hijos: [],
			});
			continue;
		}

		if (tag === 'a') {
			const href = nodo.atributos.href ? absolutizar(nodo.atributos.href, base) : '';
			if (!href) {
				salida.push(...hijos);
				continue;
			}
			salida.push({ tipo: 'elemento', tag: 'a', atributos: { href: mejorarImagen(href) }, hijos });
			continue;
		}

		if (!TAGS_PERMITIDAS.has(tag)) {
			salida.push(...hijos);
			continue;
		}

		const atributos: Record<string, string> = {};
		for (const nombre of ATRIBUTOS_PERMITIDOS[tag] ?? []) {
			const valor = nodo.atributos[nombre];
			if (valor) atributos[nombre] = valor;
		}

		salida.push({ tipo: 'elemento', tag, atributos, hijos });
	}

	return salida;
}

function embellecerHtml(html: string): string {
	return html
		.replace(/(?:\s*<br\s*\/?>\s*){3,}/gi, '<br><br>')
		.replace(/<p>(?:\s|&nbsp;)*<\/p>/gi, '')
		.replace(/^(?:\s*<br\s*\/?>\s*)+/i, '')
		.replace(/(?:\s*<br\s*\/?>\s*)+$/i, '')
		.trim();
}

/** Convierte el HTML del blog en HTML limpio y seguro para el cuerpo de la noticia. */
export function sanearCuerpo(nodos: NodoHtml[], base: string = BLOG_BASE): string {
	return embellecerHtml(serializar(sanearNodos(nodos, base)));
}

// ---------------------------------------------------------------------------
// Entradas
// ---------------------------------------------------------------------------

export type EntradaBlog = {
	/** Identificador interno de Blogger (postId). */
	id: string;
	titulo: string;
	url: string;
	/** Fecha de publicación en ISO (se deduce de la paginación o de la URL). */
	fecha: string;
	etiquetas: string[];
	/** Cuerpo ya saneado, en HTML. */
	html: string;
	imagen: string | null;
	resumen: string;
	/** Huella del contenido, para detectar ediciones. */
	hash: string;
};

export function resumirTexto(texto: string, maximo = 220): string {
	if (texto.length <= maximo) return texto;
	const recorte = texto.slice(0, maximo);
	const ultimoEspacio = recorte.lastIndexOf(' ');
	return (ultimoEspacio > 80 ? recorte.slice(0, ultimoEspacio) : recorte).trimEnd() + '…';
}

function fechaDesdeUrl(url: string): string | null {
	const conDia = url.match(/\/(\d{4})\/(\d{2})\/(\d{2})\//);
	if (conDia) return `${conDia[1]}-${conDia[2]}-${conDia[3]}T00:00:00.000Z`;
	const conMes = url.match(/\/(\d{4})\/(\d{2})\//);
	if (conMes) return `${conMes[1]}-${conMes[2]}-01T00:00:00.000Z`;
	return null;
}

function fechaDesdePaginador(url: string | null): string | null {
	if (!url) return null;
	const parametro = url.match(/[?&]updated-max=([^&]+)/);
	if (!parametro) return null;
	const fecha = new Date(decodeURIComponent(parametro[1]));
	return Number.isNaN(fecha.getTime()) ? null : fecha.toISOString();
}

function fechaDeEntrada(url: string, fechaPagina: string | null, unicaEnPagina: boolean): string {
	const porUrl = fechaDesdeUrl(url);
	// La URL de listado de Blogger (`/2026/08/#id`) no lleva el día, así que en las
	// páginas con una sola entrada se usa la fecha del paginador, que sí es exacta.
	if (unicaEnPagina && fechaPagina) return fechaPagina;
	if (porUrl) return porUrl;
	if (fechaPagina) return fechaPagina;
	return new Date().toISOString();
}

function extraerEnlaceTitulo(bloque: Elemento): Elemento | null {
	const titulos = buscarTodos(bloque.hijos, (nodo) => tieneClase(nodo, 'post-title'));
	const titulo = titulos[0];
	if (!titulo) return null;
	if (titulo.tag === 'a') return titulo;
	return buscarTodos(titulo.hijos, (nodo) => nodo.tag === 'a')[0] ?? null;
}

export function extraerEntradas(doc: NodoHtml[], fechaPagina: string | null): EntradaBlog[] {
	const bloques = buscarTodos(doc, (nodo) => nodo.tag === 'div' && tieneClase(nodo, 'post-outer'));
	const entradas: EntradaBlog[] = [];

	for (const bloque of bloques) {
		const cuerpo = buscarTodos(bloque.hijos, (nodo) => nodo.tag === 'div' && tieneClase(nodo, 'post-body'))[0];
		if (!cuerpo) continue;

		const metaId = buscarTodos(bloque.hijos, (nodo) => nodo.tag === 'meta' && nodo.atributos.itemprop === 'postId')[0];
		const id = metaId?.atributos.content || (cuerpo.atributos.id ?? '').replace('post-body-', '');
		if (!id) continue;

		const enlace = extraerEnlaceTitulo(bloque);
		const url = enlace?.atributos.href ?? `${BLOG_BASE}/${id}`;
		const titulo = (
			enlace
				? textoPlano([enlace])
				: textoPlano(buscarTodos(bloque.hijos, (nodo) => tieneClase(nodo, 'post-title')))
		).trim();
		if (!titulo) continue;

		const etiquetas = buscarTodos(bloque.hijos, (nodo) => tieneClase(nodo, 'post-labels'))
			.flatMap((nodo) => buscarTodos(nodo.hijos, (hijo) => hijo.tag === 'a'))
			.map((nodo) => textoPlano([nodo]))
			.filter(Boolean);

		const saneado = sanearNodos(cuerpo.hijos, url);
		const html = embellecerHtml(serializar(saneado));
		if (!html) continue;

		const imagen = buscarTodos(saneado, (nodo) => nodo.tag === 'img')[0]?.atributos.src ?? null;

		entradas.push({
			id,
			titulo,
			url,
			fecha: fechaDeEntrada(url, fechaPagina, bloques.length === 1),
			etiquetas,
			html,
			imagen,
			resumen: resumirTexto(textoPlano(saneado)),
			hash: huella(html),
		});
	}

	return entradas;
}

function huella(contenido: string): string {
	let hash = 0x811c9dc5;
	for (let i = 0; i < contenido.length; i++) {
		hash ^= contenido.charCodeAt(i);
		hash = Math.imul(hash, 0x01000193) >>> 0;
	}
	return hash.toString(16).padStart(8, '0');
}

// ---------------------------------------------------------------------------
// Rastreo
// ---------------------------------------------------------------------------

async function descargar(url: string, intentos = 2): Promise<string> {
	let ultimoError: Error | null = null;
	for (let intento = 1; intento <= intentos; intento++) {
		try {
			const respuesta = await fetch(url, {
				headers: { 'user-agent': AGENTE, accept: 'text/html' },
				redirect: 'follow',
			});
			if (!respuesta.ok) throw new Error(`HTTP ${respuesta.status}`);
			return await respuesta.text();
		} catch (error) {
			ultimoError = error as Error;
			if (intento < intentos) await pausa(500 * intento);
		}
	}
	throw ultimoError ?? new Error('Error desconocido');
}

function pausa(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

function siguientePagina(doc: NodoHtml[]): string | null {
	const enlace = buscarTodos(doc, (nodo) => nodo.tag === 'a' && tieneClase(nodo, 'blog-pager-older-link'))[0];
	return enlace?.atributos.href ?? null;
}

export type EtiquetaBlog = { nombre: string; url: string };

export function extraerEtiquetas(doc: NodoHtml[]): EtiquetaBlog[] {
	const enlaces = buscarTodos(doc, (nodo) => {
		if (nodo.tag !== 'a') return false;
		const href = nodo.atributos.href ?? '';
		return href.includes('/search/label/');
	});

	const etiquetas = new Map<string, EtiquetaBlog>();
	for (const enlace of enlaces) {
		const nombre = textoPlano([enlace]);
		const url = absolutizar(enlace.atributos.href, BLOG_BASE);
		if (nombre && !etiquetas.has(url)) etiquetas.set(url, { nombre, url });
	}
	return [...etiquetas.values()].sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'));
}

export type OpcionesRastreo = {
	/** Páginas a recorrer en la portada. */
	paginasPortada?: number;
	/** Páginas a recorrer en cada sección (etiqueta). */
	paginasEtiqueta?: number;
	/** Si es false, solo se recorre la portada. */
	incluirEtiquetas?: boolean;
	/** Detiene el rastreo al encontrar una entrada ya conocida. */
	yaConocidas?: Set<string>;
	/** Tope de entradas distintas a recolectar. */
	maxEntradas?: number;
	log?: (mensaje: string) => void;
};

export type ResultadoRastreo = {
	entradas: EntradaBlog[];
	paginas: number;
	errores: string[];
};

export async function rastrearBlog(opciones: OpcionesRastreo = {}): Promise<ResultadoRastreo> {
	const {
		paginasPortada = 3,
		paginasEtiqueta = 1,
		incluirEtiquetas = true,
		yaConocidas = new Set<string>(),
		maxEntradas = 60,
		log = () => {},
	} = opciones;

	const visitadas = new Set<string>();
	const encontradas = new Map<string, EntradaBlog>();
	const errores: string[] = [];
	let paginas = 0;

	const revisarPagina = async (
		url: string,
	): Promise<{ doc: NodoHtml[] | null; siguiente: string | null; entradas: EntradaBlog[] }> => {
		if (visitadas.has(url)) return { doc: null, siguiente: null, entradas: [] };
		visitadas.add(url);

		let html: string;
		try {
			html = await descargar(url);
		} catch (error) {
			const mensaje = `${url}: ${(error as Error).message}`;
			errores.push(mensaje);
			log(`  ✖ ${mensaje}`);
			return { doc: null, siguiente: null, entradas: [] };
		}
		paginas++;

		const doc = parseHtml(html);
		const siguiente = siguientePagina(doc);
		const entradas = extraerEntradas(doc, fechaDesdePaginador(siguiente));
		return { doc, siguiente, entradas };
	};

	const portada = await revisarPagina(`${BLOG_BASE}/`);
	const etiquetas = portada.doc && incluirEtiquetas ? extraerEtiquetas(portada.doc) : [];

	type Fuente = { nombre: string; url: string; paginas: number; primera?: NodoHtml[] };
	const fuentes: Fuente[] = [{ nombre: 'Portada', url: `${BLOG_BASE}/`, paginas: paginasPortada, primera: portada.doc ?? undefined }];
	for (const etiqueta of etiquetas) {
		fuentes.push({ nombre: etiqueta.nombre, url: etiqueta.url, paginas: paginasEtiqueta });
	}

	for (const fuente of fuentes) {
		if (encontradas.size >= maxEntradas) break;
		log(`· ${fuente.nombre}`);

		let url: string | null = fuente.url;
		let numero = 0;
		while (url && numero < fuente.paginas) {
			let doc: NodoHtml[] | null;
			let siguiente: string | null;
			let entradas: EntradaBlog[];

			if (numero === 0 && fuente.primera) {
				doc = fuente.primera;
				siguiente = siguientePagina(fuente.primera);
				entradas = extraerEntradas(fuente.primera, fechaDesdePaginador(siguiente));
			} else {
				({ doc, siguiente, entradas } = await revisarPagina(url));
			}

			if (!doc) break;
			numero++;

			let todasConocidas = entradas.length > 0;
			for (const entrada of entradas) {
				if (!yaConocidas.has(entrada.id)) todasConocidas = false;
				if (!encontradas.has(entrada.id)) encontradas.set(entrada.id, entrada);
			}
			log(`    pág. ${numero}: ${entradas.length} entrada(s)`);

			if (todasConocidas && yaConocidas.size > 0) break;
			if (encontradas.size >= maxEntradas) break;

			url = siguiente;
			if (url) await pausa(250);
		}
	}

	return {
		entradas: [...encontradas.values()].sort((a, b) => b.fecha.localeCompare(a.fecha)),
		paginas,
		errores,
	};
}
