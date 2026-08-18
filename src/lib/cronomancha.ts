export const CRONOMANCHA_API =
	'https://resultados-api.cronomancha.com/api/v1/public/races';

export const CRONOMANCHA_APP = 'https://resultados-app.cronomancha.com';

// Pruebas del club conocidas en Cronomancha. Para añadir una edición nueva
// basta con añadir una entrada aquí y volver a ejecutar `npm run sync:resultados`.
// La 5K «Iniciación al deporte saludable» no tiene slug localizado todavía:
// consultar con el club o revisar la red en resultados-app.cronomancha.com.
export const PRUEBAS_CRONOMANCHA: { year: number; race: '10K' | '5K'; race_slug: string }[] = [
	{ year: 2026, race: '10K', race_slug: '10k-nocturnos-san-clemente-2026' },
];

export type CarreraCronomancha = {
	race_slug: string | null;
	race_name: string | null;
	status: string | null;
	total_distance_meters: number | null;
	date: string | null;
};

export type ResultadoCronomancha = {
	dorsal?: string | null;
	full_name?: string | null;
	category?: string | null;
	team?: string | null;
	total_time?: number | null;
	position?: number | null;
	status?: string | null;
	position_category?: number | null;
	position_team?: number | null;
	gender?: string | null;
	start_time?: string | null;
};

export type RespuestaResultados = {
	race?: CarreraCronomancha | null;
	data?: ResultadoCronomancha[] | null;
};

export type ResultadoNormalizado = {
	bib: string | null;
	runner_name: string;
	category: string;
	club: string | null;
	gender: 'M' | 'F' | null;
	time_ms: number | null;
	time_formatted: string | null;
	position: number | null;
	status: string;
};

export type EdicionResultados = {
	year: number;
	race: '10K' | '5K';
	race_slug: string;
	race_name: string | null;
	official_url: string | null;
	synchronized_at: string | null;
	results: ResultadoNormalizado[];
};

/** Convierte milisegundos a «MM:SS» o «HH:MM:SS». Devuelve null si el valor no es válido. */
export function formatearTiempo(timeMs: number | null | undefined): string | null {
	if (typeof timeMs !== 'number' || !Number.isFinite(timeMs) || timeMs <= 0) return null;
	const totalSeg = Math.floor(timeMs / 1000);
	const h = Math.floor(totalSeg / 3600);
	const m = Math.floor((totalSeg % 3600) / 60);
	const s = totalSeg % 60;
	const mm = String(m).padStart(2, '0');
	const ss = String(s).padStart(2, '0');
	return h > 0 ? `${String(h).padStart(2, '0')}:${mm}:${ss}` : `${mm}:${ss}`;
}

function texto(v: unknown): string | null {
	if (typeof v !== 'string') return null;
	const t = v.trim();
	return t.length > 0 ? t : null;
}

function numero(v: unknown): number | null {
	if (typeof v === 'number' && Number.isFinite(v)) return v;
	if (typeof v === 'string' && v.trim() !== '' && !Number.isNaN(Number(v))) return Number(v);
	return null;
}

/** Normaliza un registro de la API. Devuelve null si no se puede interpretar. */
export function normalizarResultado(
	raw: ResultadoCronomancha | null | undefined,
): ResultadoNormalizado | null {
	if (!raw || typeof raw !== 'object') return null;
	const nombre = texto(raw.full_name);
	if (!nombre) return null;
	const timeMs = numero(raw.total_time);
	return {
		bib: texto(raw.dorsal),
		runner_name: nombre,
		category: texto(raw.category) ?? 'Sin categoría',
		club: texto(raw.team),
		gender: raw.gender === 'F' ? 'F' : raw.gender === 'M' ? 'M' : null,
		time_ms: timeMs,
		time_formatted: formatearTiempo(timeMs),
		position: numero(raw.position),
		status: texto(raw.status) ?? 'UNKNOWN',
	};
}

/**
 * Llama a la API pública de resultados de Cronomancha y devuelve la carrera
 * y los resultados normalizados. La API no está documentada oficialmente, así
 * que se tolera cualquier forma de respuesta inesperada.
 */
export async function fetchResultadosCronomancha(raceSlug: string): Promise<{
	race: CarreraCronomancha | null;
	results: ResultadoNormalizado[];
}> {
	const url = `${CRONOMANCHA_API}/${encodeURIComponent(raceSlug)}/results?limit=0`;
	const respuesta = await fetch(url);
	if (!respuesta.ok) {
		throw new Error(`Cronomancha respondió ${respuesta.status} para «${raceSlug}».`);
	}
	const contenido = (await respuesta.json().catch(() => null)) as
		| RespuestaResultados
		| null
		| undefined;
	const data = Array.isArray(contenido?.data) ? contenido.data : [];
	const results = data
		.map(normalizarResultado)
		.filter((r): r is ResultadoNormalizado => r !== null);
	return {
		race: contenido?.race ?? null,
		results,
	};
}