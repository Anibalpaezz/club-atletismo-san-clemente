import { getCollection } from 'astro:content';
import { supabase, supabaseEnabled, type Noticia, type Patrocinador, type CarreraConfig } from './supabase';

async function getNoticiasEstaticas(): Promise<Noticia[]> {
	const entradas = await getCollection('noticias', ({ data }) => data.fecha_publicacion);
	return entradas.map((entrada) => ({
		id: entrada.id,
		titulo: entrada.data.titulo,
		resumen: entrada.data.resumen ?? null,
		cuerpo: entrada.body ?? null,
		imagen_url: entrada.data.imagen_url ?? null,
		fecha_publicacion: entrada.data.fecha_publicacion.toISOString(),
		publicado: true,
	}));
}

export async function getNoticiasPublicadas(limit = 12): Promise<Noticia[]> {
	const estaticas = await getNoticiasEstaticas();

	let deSupabase: Noticia[] = [];
	if (supabaseEnabled) {
		const { data, error } = await supabase!
			.from('noticias')
			.select('*')
			.eq('publicado', true)
			.order('fecha_publicacion', { ascending: false })
			.limit(limit);
		if (error) {
			console.error('[supabase] getNoticiasPublicadas:', error.message);
		} else {
			deSupabase = (data ?? []) as Noticia[];
		}
	}

	return [...estaticas, ...deSupabase]
		.sort((a, b) => (b.fecha_publicacion ?? '').localeCompare(a.fecha_publicacion ?? ''))
		.slice(0, limit);
}

export async function getNoticiaBySlug(slug: string): Promise<Noticia | null> {
	const estaticas = await getNoticiasEstaticas();
	const estatica = estaticas.find((n) => n.id === slug);
	if (estatica) return estatica;

	if (!supabaseEnabled) return null;
	const { data, error } = await supabase!
		.from('noticias')
		.select('*')
		.eq('id', slug)
		.eq('publicado', true)
		.single();
	if (error) {
		console.error('[supabase] getNoticiaBySlug:', error.message);
		return null;
	}
	return data as Noticia;
}

export async function getPatrocinadores(): Promise<Patrocinador[]> {
	if (!supabaseEnabled) return [];
	const { data, error } = await supabase!
		.from('patrocinadores')
		.select('*')
		.order('orden', { ascending: true, nullsFirst: false });
	if (error) {
		console.error('[supabase] getPatrocinadores:', error.message);
		return [];
	}
	return (data ?? []) as Patrocinador[];
}

export async function getCarreraConfig(): Promise<CarreraConfig | null> {
	if (!supabaseEnabled) return null;
	const { data, error } = await supabase!
		.from('carrera_config')
		.select('*')
		.eq('activo', true)
		.order('edicion', { ascending: false, nullsFirst: false })
		.limit(1)
		.single();
	if (error) {
		console.error('[supabase] getCarreraConfig:', error.message);
		return null;
	}
	return data as CarreraConfig;
}