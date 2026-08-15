export type Establecimiento = {
	nombre: string;
	subtitulo: string;
	direccion: string;
	telefono: string | null;
	web: string | null;
};

export const ESTABLECIMIENTOS: Establecimiento[] = [
	{
		nombre: 'AWINES',
		subtitulo: 'Bodegas Villarrobledo',
		direccion: '02600 Villarrobledo, Albacete',
		telefono: '+34 670 48 86 07',
		web: 'http://www.awines.es/',
	},
	{
		nombre: 'Globalcaja',
		subtitulo: 'Oficina San Clemente',
		direccion: 'C. Federico López de Haro, 2, 16600 San Clemente, Cuenca',
		telefono: '+34 969 30 70 39',
		web: 'https://www.globalcaja.es/',
	},
	{
		nombre: 'Miguelitos Ruiz',
		subtitulo: 'Miguelitos de La Roda',
		direccion: 'C. Amanecer Nave, Polígono Industrial, 02630 La Roda, Albacete',
		telefono: '+34 967 44 15 92',
		web: 'http://www.miguelitosdelaroda.com/',
	},
	{
		nombre: 'Banco Santander - Carlos Arcas',
		subtitulo: 'Tu agente de confianza',
		direccion: 'C. la Feria, 3, 16600 San Clemente, Cuenca',
		telefono: '+34 969 30 13 15',
		web: 'https://www.bancosantander.es/',
	},
	{
		nombre: 'Centro Óptico y Auditivo Teresa Martínez',
		subtitulo: 'Salud visual y auditiva',
		direccion: 'C. Boteros, 32, 16600 San Clemente, Cuenca',
		telefono: '+34 969 04 60 39',
		web: null,
	},
	{
		nombre: 'Clínica Podológica Ana Herrera',
		subtitulo: 'Podología y salud del pie',
		direccion: 'C. Ancha, 3, 16600 San Clemente, Cuenca',
		telefono: '+34 969 10 78 06',
		web: 'http://www.htpodologia.es/',
	},
	{
		nombre: 'Seguros Generali (Saiz y Aroca)',
		subtitulo: 'Agencia de seguros',
		direccion: 'C. Rafael López de Haro, 27, Bajo, 16600 San Clemente, Cuenca',
		telefono: '+34 969 88 01 44',
		web: 'https://generali.es/agente/saizyarocasl',
	},
	{
		nombre: 'Enrique Pellejero',
		subtitulo: 'Moda Caballero, trajes a medida y ceremonia',
		direccion: 'C. Boteros, 26, 16600 San Clemente, Cuenca',
		telefono: '+34 969 30 07 35',
		web: 'https://enriquepellejeromoda.com/es/',
	},
	{
		nombre: 'Bar Las Campanas II',
		subtitulo: 'Almuerzos especiales y restaurante',
		direccion: 'Calle San Isidro, 25, 16600 San Clemente, Cuenca',
		telefono: '+34 643 35 56 82',
		web: null,
	},
	{
		nombre: 'Antonio Risueño',
		subtitulo: 'Ingeniería y Electricidad S.L.U.',
		direccion: 'C. 2, 18, 16600 San Clemente, Cuenca',
		telefono: '+34 629 83 27 86',
		web: 'http://arelectricidad.es/',
	},
	{
		nombre: 'Evelyn',
		subtitulo: 'Ropa de mujer',
		direccion: 'C. Boteros, 35, 16600 San Clemente, Cuenca',
		telefono: '+34 969 30 13 94',
		web: null,
	},
	{
		nombre: 'Visever',
		subtitulo: 'Señalización y pintura vial',
		direccion: 'Av. de Arquímedes, 2, 02600 Villarrobledo, Albacete',
		telefono: '+34 616 95 99 88',
		web: 'http://www.visever.es/',
	},
];