// Ingesta el contenido del blog histórico del club (Blogger) en la colección
// `noticias` de este sitio.
//
// Uso:
//   npm run sync:blogspot                 # busca entradas nuevas y las añade
//   npm run sync:blogspot -- --dry-run    # muestra qué haría, sin escribir nada
//   npm run sync:blogspot -- --all        # rastrea también el historial completo
//   npm run sync:blogspot -- --limite=5   # tope de entradas nuevas por ejecución
//
// Qué hace:
//   1. Recorre la portada del blog y sus secciones (etiquetas), paginando.
//   2. Compara cada entrada con el estado guardado en scripts/blogspot-estado.json
//      (por postId y huella del contenido).
//   3. Escribe las nuevas y reescribe las que hayan cambiado como
//      `src/content/noticias/blogspot-<fecha>-<slug>.md`, con el HTML saneado.
//
// El estado debe commitearse junto al contenido: es lo que evita duplicados entre
// ejecuciones (y es lo que usa el workflow programado para saber qué ya está dentro).
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { rastrearBlog, type EntradaBlog } from '../src/lib/blogspot.ts';
import { slugify } from '../src/lib/formato.ts';

const RAIZ = fileURLToPath(new URL('..', import.meta.url));
const DIR_NOTICIAS = path.join(RAIZ, 'src/content/noticias');
const RUTA_ESTADO = path.join(RAIZ, 'scripts/blogspot-estado.json');

type EstadoEntrada = {
	archivo: string;
	hash: string;
	fecha: string;
	titulo: string;
	sincronizado_en: string;
};

type Estado = Record<string, EstadoEntrada>;

type Argumentos = {
	todo: boolean;
	dryRun: boolean;
	limite: number;
	paginas: number;
};

function leerArgumentos(argv: string[]): Argumentos {
	const valor = (nombre: string) => argv.find((arg) => arg.startsWith(`--${nombre}=`))?.split('=')[1];
	return {
		todo: argv.includes('--all'),
		dryRun: argv.includes('--dry-run'),
		limite: Number(valor('limite') ?? 10),
		paginas: Number(valor('paginas') ?? 4),
	};
}

async function leerEstado(): Promise<Estado> {
	try {
		return JSON.parse(await readFile(RUTA_ESTADO, 'utf-8')) as Estado;
	} catch {
		return {};
	}
}

/** Títulos ya presentes en noticias escritas a mano, para no duplicar contenido. */
async function leerTitulosExistentes(): Promise<Set<string>> {
	const titulos = new Set<string>();
	const archivos = await readdir(DIR_NOTICIAS).catch(() => [] as string[]);
	for (const archivo of archivos) {
		if (!archivo.endsWith('.md')) continue;
		const contenido = await readFile(path.join(DIR_NOTICIAS, archivo), 'utf-8').catch(() => '');
		const coincidencia = contenido.match(/^titulo:\s*(.+)$/m);
		if (!coincidencia) continue;
		const titulo = coincidencia[1].trim().replace(/^["']|["']$/g, '');
		titulos.add(slugify(titulo));
	}
	return titulos;
}

function nombreArchivo(entrada: EntradaBlog): string {
	const slug = slugify(entrada.titulo).slice(0, 70).replace(/-+$/, '') || entrada.id;
	return `blogspot-${entrada.fecha.slice(0, 10)}-${slug}.md`;
}

function aMarkdown(entrada: EntradaBlog): string {
	const lineas = [
		'---',
		`titulo: ${JSON.stringify(entrada.titulo)}`,
		entrada.resumen ? `resumen: ${JSON.stringify(entrada.resumen)}` : null,
		entrada.imagen ? `imagen_url: ${JSON.stringify(entrada.imagen)}` : null,
		`fecha_publicacion: ${entrada.fecha}`,
		'destacada: false',
		'origen: blogspot',
		`origen_url: ${JSON.stringify(entrada.url)}`,
		`origen_id: ${JSON.stringify(entrada.id)}`,
		'---',
		'',
	].filter((linea): linea is string => linea !== null);

	return `${lineas.join('\n')}${entrada.html}\n`;
}

async function main() {
	const args = leerArgumentos(process.argv.slice(2));
	const estado = await leerEstado();
	const titulos = await leerTitulosExistentes();

	const yaConocidas = args.todo ? new Set<string>() : new Set(Object.keys(estado));
	const maxEntradas = args.todo ? 5000 : Math.max(args.limite * 4, 20);

	console.log(`Rastreando ${args.todo ? 'el historial completo' : 'las últimas entradas'} del blog…`);
	const { entradas, paginas, errores } = await rastrearBlog({
		paginasPortada: args.todo ? 300 : args.paginas,
		paginasEtiqueta: args.todo ? 300 : 1,
		incluirEtiquetas: true,
		yaConocidas,
		maxEntradas,
		log: (mensaje) => console.log(mensaje),
	});

	console.log(`\n${entradas.length} entrada(s) leídas en ${paginas} página(s).`);

	const nuevas: EntradaBlog[] = [];
	const actualizadas: EntradaBlog[] = [];
	let sinCambios = 0;
	const duplicadas: string[] = [];

	for (const entrada of entradas) {
		const previa = estado[entrada.id];
		if (previa) {
			if (previa.hash === entrada.hash) sinCambios++;
			else actualizadas.push(entrada);
			continue;
		}
		const slug = slugify(entrada.titulo);
		if (titulos.has(slug)) {
			duplicadas.push(entrada.titulo);
			continue;
		}
		nuevas.push(entrada);
	}

	const seleccion = nuevas.slice(0, args.limite);
	const pendientes = nuevas.length - seleccion.length;

	if (seleccion.length === 0 && actualizadas.length === 0) {
		console.log('No hay contenido nuevo: el sitio ya está al día.');
		if (duplicadas.length > 0) console.log(`Omitidas por duplicar una noticia existente: ${duplicadas.length}.`);
		if (errores.length > 0) process.exitCode = 1;
		return;
	}

	if (args.dryRun) {
		console.log('\n[dry-run] Se escribirían:');
		for (const entrada of [...nuevas, ...actualizadas].slice(0, args.limite)) {
			const archivo = estado[entrada.id]?.archivo ?? nombreArchivo(entrada);
			const tipo = estado[entrada.id] ? 'actualizada' : 'nueva';
			console.log(`  · ${archivo}  (${tipo}, ${entrada.fecha.slice(0, 10)})`);
		}
		if (seleccion.length > 0) {
			const muestra = seleccion[0];
			const cuerpo = aMarkdown(muestra);
			console.log(`\n[dry-run] Muestra de ${nombreArchivo(muestra)}:\n`);
			console.log(cuerpo.length > 1400 ? `${cuerpo.slice(0, 1400)}\n…` : cuerpo);
		}
		if (pendientes > 0) console.log(`\n[dry-run] Quedan ${pendientes} entrada(s) para la siguiente ejecución.`);
		return;
	}

	await mkdir(DIR_NOTICIAS, { recursive: true });
	const ahora = new Date().toISOString();

	for (const entrada of seleccion) {
		const archivo = nombreArchivo(entrada);
		await writeFile(path.join(DIR_NOTICIAS, archivo), aMarkdown(entrada), 'utf-8');
		estado[entrada.id] = {
			archivo,
			hash: entrada.hash,
			fecha: entrada.fecha,
			titulo: entrada.titulo,
			sincronizado_en: ahora,
		};
		console.log(`  ✔ nueva: ${archivo}`);
	}

	for (const entrada of actualizadas) {
		const archivo = estado[entrada.id].archivo;
		await writeFile(path.join(DIR_NOTICIAS, archivo), aMarkdown(entrada), 'utf-8');
		estado[entrada.id] = {
			...estado[entrada.id],
			hash: entrada.hash,
			fecha: entrada.fecha,
			titulo: entrada.titulo,
			sincronizado_en: ahora,
		};
		console.log(`  ↻ actualizada: ${archivo}`);
	}

	const ordenado = Object.fromEntries(Object.entries(estado).sort(([a], [b]) => a.localeCompare(b)));
	await writeFile(RUTA_ESTADO, `${JSON.stringify(ordenado, null, 2)}\n`, 'utf-8');

	console.log(
		`\nResumen: ${seleccion.length} nueva(s), ${actualizadas.length} actualizada(s), ${sinCambios} sin cambios.`,
	);
	if (pendientes > 0) console.log(`Quedan ${pendientes} entrada(s) pendientes: vuelve a ejecutarlo o usa --all.`);
	if (duplicadas.length > 0) console.log(`Omitidas por duplicar una noticia existente: ${duplicadas.length}.`);
	if (errores.length > 0) {
		console.log(`\n${errores.length} página(s) no se pudieron leer:`);
		for (const error of errores) console.log(`  ✖ ${error}`);
		process.exitCode = 1;
	}
}

await main();
