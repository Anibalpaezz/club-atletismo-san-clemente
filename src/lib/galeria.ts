export type AlbumHistorico = {
	year: number;
	albumUrl: string;
	coverImage?: string;
	descripcion?: string;
};

// Galería fotográfica histórica de la 10K Nocturna (ediciones pasadas).
//
// TODO: pedir a la junta directiva los enlaces de los álbumes de Google
// Photos / Picasa de ediciones anteriores y añadirlos aquí. La sección
// "Galería histórica" de El Club se renderiza sola con estas entradas.
export const GALERIA_HISTORICA: AlbumHistorico[] = [];