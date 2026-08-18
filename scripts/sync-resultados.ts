// Sincroniza los resultados de la API pública de Cronomancha en la colección
// de contenido `resultados_cronomancha` (src/content/resultados-cronomancha/resultados.json).
//
// Uso: npm run sync:resultados
//
// Nota: la API de Cronomancha no está oficialmente documentada y podría cambiar
// sin aviso. Si la sincronización deja de funcionar, revisar el formato de
// respuesta en https://resultados-api.cronomancha.com antes de tocar el código.
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { fetchResultadosCronomancha, PRUEBAS_CRONOMANCHA } from '../src/lib/cronomancha.ts';

const URL_ARCHIVO = new URL('../src/content/resultados-cronomancha/resultados.json', import.meta.url);
const RUTA_ARCHIVO = fileURLToPath(URL_ARCHIVO);

async function main() {
	const ediciones: Record<string, unknown> = {};
	let conErrores = false;

	for (const prueba of PRUEBAS_CRONOMANCHA) {
		const id = `${prueba.year}-${prueba.race}`;
		try {
			console.log(`Descargando ${id} (${prueba.race_slug})…`);
			const { race, results } = await fetchResultadosCronomancha(prueba.race_slug);
			ediciones[id] = {
				year: prueba.year,
				race: prueba.race,
				race_slug: prueba.race_slug,
				race_name: race?.race_name ?? null,
				official_url: `https://resultados-app.cronomancha.com/race/${prueba.race_slug}`,
				synchronized_at: new Date().toISOString(),
				results,
			};
			const fin = results.filter((r) => r.status === 'FINISHED' && r.time_ms && r.time_ms > 0).length;
			console.log(`  ✔ ${results.length} registros descargados (${fin} clasificados).`);
		} catch (error) {
			conErrores = true;
			console.error(`  ✖ No se pudo sincronizar ${id}: ${(error as Error).message}`);
		}
	}

	await mkdir(path.dirname(RUTA_ARCHIVO), { recursive: true });
	await writeFile(RUTA_ARCHIVO, JSON.stringify(ediciones, null, 2) + '\n', 'utf-8');
	console.log(`Datos escritos en ${RUTA_ARCHIVO}`);

	if (conErrores) process.exitCode = 1;
}

await main();