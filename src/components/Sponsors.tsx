import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import type { Patrocinador } from '../lib/supabase';

const url = import.meta.env.PUBLIC_SUPABASE_URL as string | undefined;
const key = import.meta.env.PUBLIC_SUPABASE_ANON_KEY as string | undefined;

export default function Sponsors({ titulo = 'Colaboran' }: { titulo?: string }) {
	const [patrocinadores, setPatrocinadores] = useState<Patrocinador[]>([]);
	const [cargado, setCargado] = useState(false);

	useEffect(() => {
		if (!url || !key) {
			setCargado(true);
			return;
		}
		const supabase = createClient(url, key, { auth: { persistSession: false } });
		supabase
			.from('patrocinadores')
			.select('*')
			.order('orden', { ascending: true, nullsFirst: false })
			.then(({ data, error }) => {
				if (!error && data) setPatrocinadores(data as Patrocinador[]);
				setCargado(true);
			});
	}, []);

	if (!cargado || patrocinadores.length === 0) return null;

	return (
		<div>
			<p className="mb-4 text-xs font-semibold uppercase tracking-widest opacity-60">{titulo}</p>
			<ul className="flex flex-wrap items-center gap-x-8 gap-y-4">
				{patrocinadores.map((p) => (
					<li key={p.id}>
						{p.url_web ? (
							<a
								href={p.url_web}
								target="_blank"
								rel="noreferrer noopener"
								className="inline-flex items-center text-sm font-semibold text-white/80 transition hover:text-white"
							>
								{p.logo_url ? (
									<img src={p.logo_url} alt={p.nombre} className="h-9 w-auto max-w-32 object-contain" loading="lazy" />
								) : (
									p.nombre
								)}
							</a>
						) : (
							<span className="inline-flex items-center text-sm font-semibold text-white/80">
								{p.logo_url ? (
									<img src={p.logo_url} alt={p.nombre} className="h-9 w-auto max-w-32 object-contain" loading="lazy" />
								) : (
									p.nombre
								)}
							</span>
						)}
					</li>
				))}
			</ul>
		</div>
	);
}
