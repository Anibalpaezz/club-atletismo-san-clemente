import { supabase, supabaseEnabled, type Noticia, type Patrocinador, type CarreraConfig } from './supabase';

export async function getNoticiasPublicadas(limit = 12): Promise<Noticia[]> {
	if (!supabaseEnabled) return [];
	const { data, error } = await supabase!
		.from('noticias')
		.select('*')
		.eq('publicado', true)
		.order('fecha_publicacion', { ascending: false })
		.limit(limit);
	if (error) {
		console.error('[supabase] getNoticiasPublicadas:', error.message);
		return [];
	}
	return (data ?? []) as Noticia[];
}

export async function getNoticiaBySlug(slug: string): Promise<Noticia | null> {
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
