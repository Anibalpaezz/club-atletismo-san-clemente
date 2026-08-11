import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.PUBLIC_SUPABASE_URL as string | undefined;
const key = import.meta.env.PUBLIC_SUPABASE_ANON_KEY as string | undefined;

export const supabaseEnabled = Boolean(url && key);

export const supabase = supabaseEnabled
	? createClient(url!, key!, {
			auth: { persistSession: false },
		})
	: null;

export type Noticia = {
	id: string;
	titulo: string;
	resumen: string | null;
	cuerpo: string | null;
	imagen_url: string | null;
	fecha_publicacion: string | null;
	publicado: boolean;
	created_at?: string;
};

export type Patrocinador = {
	id: string;
	nombre: string;
	logo_url: string | null;
	url_web: string | null;
	orden: number | null;
};

export type CarreraConfig = {
	id: string;
	edicion: string | null;
	fecha: string | null;
	hora: string | null;
	lugar: string | null;
	enlace_inscripcion: string | null;
	enlace_clasificaciones: string | null;
	enlace_reglamento: string | null;
	enlace_recorrido: string | null;
	texto_cta: string | null;
	activo: boolean;
};
