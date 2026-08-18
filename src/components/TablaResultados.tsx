import { useMemo, useState } from 'react';
import type { FilaResultado, Filtros } from '../lib/tabla-resultados';
import { TODOS, filtrarFilas, valoresUnicos } from '../lib/tabla-resultados';

interface Props {
	filas: FilaResultado[];
}

const controlClases =
	'rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-nocturno focus:border-albero focus:outline-none focus:ring-2 focus:ring-albero/40';

export default function TablaResultados({ filas }: Props) {
	const [club, setClub] = useState(TODOS);
	const [categoria, setCategoria] = useState(TODOS);
	const [year, setYear] = useState(TODOS);
	const [busqueda, setBusqueda] = useState('');

	const clubs = useMemo(() => valoresUnicos(filas, 'club'), [filas]);
	const categorias = useMemo(() => valoresUnicos(filas, 'category'), [filas]);
	const years = useMemo(() => valoresUnicos(filas, 'year'), [filas]);

	const visibles = useMemo(
		() => filtrarFilas(filas, { club, categoria, year, busqueda } as Filtros),
		[filas, club, categoria, year, busqueda],
	);

	return (
		<div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
			<div className="border-b border-slate-200 px-6 py-5">
				<p className="text-xs font-bold uppercase tracking-widest text-albero-600">
					Resultados de la carrera
				</p>
				<p className="mt-1 text-sm text-tinta/70">
					{visibles.length.toLocaleString('es-ES')} de {filas.length.toLocaleString('es-ES')}{' '}
					clasificados. Filtra por club, categoría, año o por el nombre del corredor.
				</p>
			</div>

			<div className="grid gap-3 border-b border-slate-200 bg-hueso/50 p-4 sm:grid-cols-2 lg:grid-cols-4">
				<label className="flex flex-col gap-1.5">
					<span className="text-[11px] font-semibold uppercase tracking-wider text-tinta/60">
						Buscar corredor
					</span>
					<input
						type="search"
						value={busqueda}
						onChange={(e) => setBusqueda(e.target.value)}
						placeholder="Nombre…"
						aria-label="Buscar por nombre del corredor"
						className={controlClases}
					/>
				</label>

				<label className="flex flex-col gap-1.5">
					<span className="text-[11px] font-semibold uppercase tracking-wider text-tinta/60">
						Club
					</span>
					<select
						value={club}
						onChange={(e) => setClub(e.target.value)}
						aria-label="Filtrar por club"
						className={controlClases}
					>
						<option value={TODOS}>Todos</option>
						{clubs.map((c) => (
							<option key={c} value={c}>
								{c}
							</option>
						))}
					</select>
				</label>

				<label className="flex flex-col gap-1.5">
					<span className="text-[11px] font-semibold uppercase tracking-wider text-tinta/60">
						Categoría
					</span>
					<select
						value={categoria}
						onChange={(e) => setCategoria(e.target.value)}
						aria-label="Filtrar por categoría"
						className={controlClases}
					>
						<option value={TODOS}>Todas</option>
						{categorias.map((c) => (
							<option key={c} value={c}>
								{c}
							</option>
						))}
					</select>
				</label>

				<label className="flex flex-col gap-1.5">
					<span className="text-[11px] font-semibold uppercase tracking-wider text-tinta/60">
						Año / edición
					</span>
					<select
						value={year}
						onChange={(e) => setYear(e.target.value)}
						aria-label="Filtrar por año"
						disabled={years.length <= 1}
						className={controlClases}
					>
						<option value={TODOS}>Todas</option>
						{years.map((y) => (
							<option key={y} value={y}>
								{y}
							</option>
						))}
					</select>
				</label>
			</div>

			{visibles.length > 0 ? (
				<div className="overflow-x-auto">
					<table className="w-full min-w-[760px] text-left text-sm">
						<thead>
							<tr className="border-b border-slate-200 bg-hueso text-xs font-bold uppercase tracking-wider text-tinta/60">
								<th scope="col" className="px-5 py-3.5">
									Pos.
								</th>
								<th scope="col" className="hidden px-5 py-3.5 md:table-cell">
									Dorsal
								</th>
								<th scope="col" className="px-5 py-3.5">
									Corredor/a
								</th>
								<th scope="col" className="px-5 py-3.5">
									Club
								</th>
								<th scope="col" className="hidden px-5 py-3.5 sm:table-cell">
									Categoría
								</th>
								<th scope="col" className="px-5 py-3.5 text-right">
									Tiempo
								</th>
								<th scope="col" className="hidden px-5 py-3.5 lg:table-cell">
									Año
								</th>
							</tr>
						</thead>
						<tbody>
							{visibles.map((fila) => (
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
						Ningún resultado coincide con los filtros seleccionados.
					</p>
				</div>
			)}
		</div>
	);
}