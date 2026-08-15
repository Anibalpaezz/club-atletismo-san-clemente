export type ClubAmigo = {
	id: string;
	nombre: string;
	localidad: string;
	descripcion: string;
	web: string;
	tag: string;
	categoria: 'club' | 'circuito';
};

export const CLUBES_AMIGOS: ClubAmigo[] = [
	{
		id: 'cde-santa-eulalia',
		nombre: 'C.D.E. Atletismo Santa Eulalia',
		localidad: 'Santa María del Campo Rus / Cuenca',
		descripcion:
			'Club vecino y hermanado de referencia en la comarca. Comparten presencia y organización habitual en carreras populares provinciales y pruebas de fondo.',
		web: 'http://www.cdesantaeulalia.es/',
		tag: 'Club Amigo',
		categoria: 'club',
	},
	{
		id: 'ca-villamayor',
		nombre: 'C.A. Villamayor de Santiago',
		localidad: 'Villamayor de Santiago (Cuenca)',
		descripcion:
			'Organizadores de la clásica Carrera Popular Villa de Villamayor de Santiago y compañeros habituales en el podio por equipos del Circuito Provincial.',
		web: 'https://www.circuitocarrerasdiputacioncuenca.com/',
		tag: 'Circuito Cuenca',
		categoria: 'club',
	},
	{
		id: 'ca-iniesta',
		nombre: 'C.A. Iniesta',
		localidad: 'Iniesta (Cuenca)',
		descripcion:
			'Uno de los clubes con mayor solera y participación de la Manchuela conquense, anfitriones de la tradicional Carrera Popular Villa de Iniesta.',
		web: 'https://www.circuitocarrerasdiputacioncuenca.com/',
		tag: 'Circuito Cuenca',
		categoria: 'club',
	},
	{
		id: 'ca-villarta-casasimarro',
		nombre: 'C.A. Casasimarro / C.A. Villarta',
		localidad: 'Casasimarro / Villarta (Cuenca)',
		descripcion:
			'Clubes de localidades colindantes con fuerte arraigo y gran tradición en pruebas populares de 10K y cross comarcal.',
		web: 'https://www.circuitocarrerasdiputacioncuenca.com/',
		tag: 'Comarca Manchuela',
		categoria: 'club',
	},
	{
		id: 'c-diputacion-cuenca',
		nombre: 'Circuito Diputación de Cuenca',
		localidad: 'Provincia de Cuenca',
		descripcion:
			'Calendario oficial provincial de carreras populares que vertebra el hermanamiento entre todos los clubes de atletismo de la provincia.',
		web: 'https://circuitocarrerasdiputacioncuenca.com/',
		tag: 'Competición Oficial',
		categoria: 'circuito',
	},
	{
		id: 'c-diputacion-albacete',
		nombre: 'Circuito Diputación de Albacete / Atletas Populares',
		localidad: 'Albacete y comarca',
		descripcion:
			'Circuito vecino donde los atletas de San Clemente compiten con regularidad en pruebas como la Media Maratón de Albacete y carreras de Villarrobledo y La Roda.',
		web: 'http://www.atletaspopulares.es/',
		tag: 'Circuito Vecino',
		categoria: 'circuito',
	},
];