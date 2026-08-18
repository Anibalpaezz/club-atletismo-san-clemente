import { formatearTiempo } from './cronomancha.ts';
import type { EdicionResultados } from './cronomancha.ts';

export type FilaResultado = {
	edicion: string;
	year: number;
	race: '10K' | '5K';
	position: number | null;
	runner_name: string;
	club: string | null;
	category: string;
	gender: 'M' | 'F' | null;
	time_ms: number | null;
	time_formatted: string | null;
	bib: string | null;
	status: string;
};

export type Filtros = {
	club: string;
	categoria: string;
	year: string;
	busqueda: string;
};

export const TODOS = 'todos';

/** Convierte las ediciones sincronizadas en una lista plana de filas. */
export function aplanarResultados(ediciones: EdicionResultados[]): FilaResultado[] {
	const filas: FilaResultado[] = [];
	for (const edicion of ediciones) {
		for (const r of edicion.results) {
			filas.push({
				edicion: `${edicion.year} · ${edicion.race}`,
				year: edicion.year,
				race: edicion.race,
				position: r.position,
				runner_name: r.runner_name,
				club: r.club,
				category: r.category,
				gender: r.gender,
				time_ms: r.time_ms,
				time_formatted: r.time_formatted,
				bib: r.bib,
				status: r.status,
			});
		}
	}
	return filas;
}

/** Solo corredores clasificados (con tiempo), que son los que forman el ranking. */
export function clasificados(filas: FilaResultado[]): FilaResultado[] {
	return filas.filter((f) => f.status === 'FINISHED' && typeof f.time_ms === 'number' && f.time_ms > 0);
}

/** Valores únicos no vacíos de un campo, ordenados alfabéticamente. */
export function valoresUnicos(
	filas: FilaResultado[],
	campo: 'club' | 'category' | 'year',
): string[] {
	const set = new Set<string>();
	for (const fila of filas) {
		const valor = fila[campo];
		if (valor !== null && valor !== undefined && String(valor).trim() !== '') {
			set.add(String(valor));
		}
	}
	return [...set].sort((a, b) => a.localeCompare(b, 'es', { numeric: true }));
}

/** Aplica los filtros activos (club, categoría, año y búsqueda por nombre). */
export function filtrarFilas(filas: FilaResultado[], filtros: Filtros): FilaResultado[] {
	const busqueda = filtros.busqueda.trim().toLowerCase();
	if (!busqueda && filtros.club === TODOS && filtros.categoria === TODOS && filtros.year === TODOS) {
		return filas;
	}
	return filas.filter((fila) => {
		if (filtros.club !== TODOS && (fila.club ?? '') !== filtros.club) return false;
		if (filtros.categoria !== TODOS && fila.category !== filtros.categoria) return false;
		if (filtros.year !== TODOS && String(fila.year) !== filtros.year) return false;
		if (busqueda && !fila.runner_name.toLowerCase().includes(busqueda)) return false;
		return true;
	});
}

export type RecordInfo = {
	categoria: string;
	nombre: string | null;
	tiempo: string | null;
	año: number | null;
	club: string | null;
};

/**
 * Calcula los récords absolutos (mejor tiempo por género) entre todas las
 * ediciones sincronizadas de una prueba. Devuelve siempre dos entradas,
 * masculino y femenino, con valores null si no hay corredoras/es con tiempo.
 */
export function calcularRecords(
	ediciones: EdicionResultados[],
	race: '10K' | '5K' = '10K',
): RecordInfo[] {
	const generos: ('M' | 'F')[] = ['M', 'F'];
	const records: RecordInfo[] = [];

	for (const genero of generos) {
		let mejor:
			| { nombre: string; tiempo: string; año: number; club: string | null; time_ms: number }
			| null = null;
		for (const edicion of ediciones) {
			if (edicion.race !== race) continue;
			for (const r of edicion.results) {
				if (r.gender !== genero) continue;
				if (r.status !== 'FINISHED' || typeof r.time_ms !== 'number' || r.time_ms <= 0) continue;
				if (!mejor || r.time_ms < mejor.time_ms) {
					mejor = {
						nombre: r.runner_name,
						tiempo: r.time_formatted ?? formatearTiempo(r.time_ms) ?? '—',
						año: edicion.year,
						club: r.club,
						time_ms: r.time_ms,
					};
				}
			}
		}
		records.push({
			categoria: genero === 'M' ? 'Récord absoluto masculino' : 'Récord absoluto femenino',
			nombre: mejor?.nombre ?? null,
			tiempo: mejor?.tiempo ?? null,
			año: mejor?.año ?? null,
			club: mejor?.club ?? null,
		});
	}
	return records;
}