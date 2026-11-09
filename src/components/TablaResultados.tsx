import { useMemo, useState } from 'react';
import type { FilaResultado, Filtros } from '../lib/tabla-resultados';
import { TODOS, filtrarFilas, valoresUnicos } from '../lib/tabla-resultados';

interface Props {
	filas: FilaResultado[];
	lang?: 'es' | 'en';
}

const controlClases =
	'rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-nocturno focus:border-albero focus:outline-none focus:ring-2 focus:ring-albero/40';

const FILAS_INICIALES = 25;
const INCREMENTO = 25;

export default function TablaResultados({ filas, lang = 'es' }: Props) {
	const es = lang !== 'en';
	const locale = es ? 'es-ES' : 'en-GB';
	const [club, setClub] = useState(TODOS);
	const [categoria, setCategoria] = useState(TODOS);
	const [busqueda, setBusqueda] = useState('');
	const [limite, setLimite] = useState(FILAS_INICIALES);

	const clubs = useMemo(() => valoresUnicos(filas, 'club'), [filas]);
	const categorias = useMemo(() => valoresUnicos(filas, 'category'), [filas]);
	const years = useMemo(
		() =>
			valoresUnicos(filas, 'year').sort((a, b) => Number(b) - Number(a)),
		[filas],
	);
	const [year, setYear] = useState<string>(() => {
		const ordenados = valoresUnicos(filas, 'year').sort((a, b) => Number(b) - Number(a));
		return ordenados[0] ?? TODOS;
	});

	const visibles = useMemo(
		() => filtrarFilas(filas, { club, categoria, year, busqueda } as Filtros),
		[filas, club, categoria, year, busqueda],
	);

	// Total de clasificados del contexto actual, sin contar la búsqueda por nombre.
	const totalEnContexto = useMemo(
		() => filtrarFilas(filas, { club, categoria, year, busqueda: '' } as Filtros).length,
		[filas, club, categoria, year],
	);

	const visiblesMostrados = visibles.slice(0, limite);
	const restantes = visibles.length - visiblesMostrados.length;

	const cambiarFiltro = (setter: (v: string) => void, valor: string) => {
		setter(valor);
		setLimite(FILAS_INICIALES);
	};

	return (
		<div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
			<div className="border-b border-slate-200 px-6 py-5">
				<p className="text-xs font-bold uppercase tracking-widest text-albero-600">
					{es ? 'Resultados de la carrera' : 'Race results'}
				</p>
				<p className="mt-1 text-sm text-tinta/70">
					{es ? (
						<>
							{visibles.length.toLocaleString(locale)} de {totalEnContexto.toLocaleString(locale)}{' '}
							clasificados. Filtra por club, categoría, año o por el nombre del corredor.
						</>
					) : (
						<>
							{visibles.length.toLocaleString(locale)} of {totalEnContexto.toLocaleString(locale)}{' '}
							finishers. Filter by club, category, year or runner name.
						</>
					)}
				</p>
			</div>

			<div className="grid gap-3 border-b border-slate-200 bg-hueso/50 p-4 sm:grid-cols-2 lg:grid-cols-4">
				<label className="flex flex-col gap-1.5">
					<span className="text-[11px] font-semibold uppercase tracking-wider text-tinta/60">
						{es ? 'Buscar corredor' : 'Search runner'}
					</span>
					<input
						type="search"
						value={busqueda}
						onChange={(e) => cambiarFiltro(setBusqueda, e.target.value)}
						placeholder={es ? 'Nombre…' : 'Name…'}
						aria-label={es ? 'Buscar por nombre del corredor' : 'Search by runner name'}
						className={controlClases}
					/>
				</label>

				<label className="flex flex-col gap-1.5">
					<span className="text-[11px] font-semibold uppercase tracking-wider text-tinta/60">
						{es ? 'Club' : 'Club'}
					</span>
					<select
						value={club}
						onChange={(e) => cambiarFiltro(setClub, e.target.value)}
						aria-label={es ? 'Filtrar por club' : 'Filter by club'}
						className={controlClases}
					>
						<option value={TODOS}>{es ? 'Todos' : 'All'}</option>
						{clubs.map((c) => (
							<option key={c} value={c}>
								{c}
							</option>
						))}
					</select>
				</label>

				<label className="flex flex-col gap-1.5">
					<span className="text-[11px] font-semibold uppercase tracking-wider text-tinta/60">
						{es ? 'Categoría' : 'Category'}
					</span>
					<select
						value={categoria}
						onChange={(e) => cambiarFiltro(setCategoria, e.target.value)}
						aria-label={es ? 'Filtrar por categoría' : 'Filter by category'}
						className={controlClases}
					>
						<option value={TODOS}>{es ? 'Todas' : 'All'}</option>
						{categorias.map((c) => (
							<option key={c} value={c}>
								{c}
							</option>
						))}
					</select>
				</label>

				<label className="flex flex-col gap-1.5">
					<span className="text-[11px] font-semibold uppercase tracking-wider text-tinta/60">
						{es ? 'Año / edición' : 'Year / edition'}
					</span>
					<select
						value={year}
						onChange={(e) => cambiarFiltro(setYear, e.target.value)}
						aria-label={es ? 'Filtrar por año' : 'Filter by year'}
						disabled={years.length <= 1}
						className={controlClases}
					>
						{years.map((y) => (
							<option key={y} value={y}>
								{y}
							</option>
						))}
						<option value={TODOS}>{es ? 'Todas' : 'All'}</option>
					</select>
				</label>
			</div>

			{visibles.length > 0 ? (
				<div className="overflow-x-auto">
					<table className="w-full min-w-[760px] text-left text-sm">
						<thead>
							<tr className="border-b border-slate-200 bg-hueso text-xs font-bold uppercase tracking-wider text-tinta/60">
								<th scope="col" className="px-5 py-3.5">
									{es ? 'Pos.' : 'Pos.'}
								</th>
								<th scope="col" className="hidden px-5 py-3.5 md:table-cell">
									{es ? 'Dorsal' : 'Bib'}
								</th>
								<th scope="col" className="px-5 py-3.5">
									{es ? 'Corredor/a' : 'Runner'}
								</th>
								<th scope="col" className="px-5 py-3.5">
									Club
								</th>
								<th scope="col" className="hidden px-5 py-3.5 sm:table-cell">
									{es ? 'Categoría' : 'Category'}
								</th>
								<th scope="col" className="px-5 py-3.5 text-right">
									{es ? 'Tiempo' : 'Time'}
								</th>
								<th scope="col" className="hidden px-5 py-3.5 lg:table-cell">
									{es ? 'Año' : 'Year'}
								</th>
							</tr>
						</thead>
						<tbody>
							{visiblesMostrados.map((fila) => (
								<tr
									key={`${fila.year}-${fila.edicion}-${fila.position}-${fila.runner_name}`}
									className="border-b border-slate-100 transition last:border-0 hover:bg-hueso"
								>
									<td className="px-5 py-3 font-semibold text-nocturno">
										{fila.position ?? '—'}
									</td>
									<td className="hidden px-5 py-3 text-tinta/60 md:table-cell">
										{fila.bib ?? '—'}
									</td>
									<td className="px-5 py-3 font-medium text-nocturno">{fila.runner_name}</td>
									<td className="px-5 py-3 text-tinta/70">{fila.club ?? '—'}</td>
									<td className="hidden px-5 py-3 text-tinta/70 sm:table-cell">
										{fila.category}
									</td>
									<td className="whitespace-nowrap px-5 py-3 text-right font-mono font-semibold tabular-nums text-nocturno">
										{fila.time_formatted ?? '—'}
									</td>
									<td className="hidden px-5 py-3 text-tinta/60 lg:table-cell">
										{fila.edicion}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			) : (
				<div className="px-6 py-12 text-center">
					<p className="text-sm text-tinta/60">
						{es
							? 'Ningún resultado coincide con los filtros seleccionados.'
							: 'No results match the selected filters.'}
					</p>
				</div>
			)}

			{restantes > 0 && (
				<div className="flex items-center justify-center gap-4 border-t border-slate-200 px-6 py-5">
					<p className="text-sm text-tinta/60">
						{es ? 'Mostrando' : 'Showing'} {visiblesMostrados.length.toLocaleString(locale)}{' '}
						{es ? 'de' : 'of'} {visibles.length.toLocaleString(locale)}{' '}
						{es ? 'clasificados.' : 'finishers.'}
					</p>
					<button
						type="button"
						onClick={() => setLimite((l) => l + INCREMENTO)}
						className="inline-flex items-center gap-2 rounded-md bg-nocturno px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-nocturno-700"
					>
						{es ? 'Cargar más' : 'Load more'} ({Math.min(restantes, INCREMENTO).toLocaleString(locale)})
					</button>
				</div>
			)}
		</div>
	);
}