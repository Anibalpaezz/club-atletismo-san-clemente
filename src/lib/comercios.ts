export type Establecimiento = {
	nombre: string;
	detalle?: string;
	imagen?: string;
	url_web?: string;
};

export const ESTABLECIMIENTOS: Establecimiento[] = [
	{ nombre: 'AWINES', detalle: 'Bodegas Villarrobledo', imagen: '/images/comercios/awines.jpg' },
	{
		nombre: 'Globalcaja',
		detalle: 'Oficina San Clemente',
		imagen: '/images/comercios/globalcaja.jpg',
		url_web: 'https://www.globalcaja.es',
	},
	{
		nombre: 'Miguelitos Ruiz',
		detalle: 'Miguelitos de La Roda',
		imagen: '/images/comercios/miguelitos-ruiz.jpg',
	},
	{
		nombre: 'Banco de Santander',
		imagen: '/images/comercios/santander.jpg',
		url_web: 'https://www.santander.es',
	},
	{
		nombre: 'Carlos Arcas · tu agente de confianza',
		detalle: 'Centro óptico y auditivo · Teresa Martínez',
		imagen: '/images/comercios/optica-teresa.jpg',
	},
	{
		nombre: 'Clínica Podológica',
		detalle: 'Ana Herrera',
		imagen: '/images/comercios/clinica-herrera.jpg',
	},
	{
		nombre: 'Seguros Generali',
		detalle: 'Saiz y Ortega',
		imagen: '/images/comercios/generali.jpg',
		url_web: 'https://www.generali.es',
	},
	{
		nombre: 'Tienda de Moda',
		detalle: 'Enrique Pellejero',
		imagen: '/images/comercios/enrique-pellejero.jpg',
	},
	{
		nombre: 'Moda Caballero',
		detalle: 'Trajes a medida y ceremonia',
		imagen: '/images/comercios/sastres.png',
	},
	{
		nombre: 'Bar Almuerzos Especiales',
		detalle: 'Las Campanas II',
		imagen: '/images/comercios/las-campanas.jpg',
	},
	{
		nombre: 'Grupo de Restaurantes',
		detalle: 'Calle San Isidro, 25 · Telf. 643 355 682',
		imagen: '/images/comercios/grupo-restaurantes.jpg',
	},
	{
		nombre: 'Ingeniería Electricidad',
		detalle: 'Antonio Risueño',
		imagen: '/images/comercios/ar-electricidad.jpg',
	},
	{
		nombre: 'Evelyn',
		detalle: 'Ropa de mujer · Calle Boteros, 35',
		imagen: '/images/comercios/evelyn.jpg',
	},
	{
		nombre: 'Pintura Vial',
		detalle: 'Visever · señalización y pintura vial · 616 95 99 88',
		imagen: '/images/comercios/visever.jpg',
		url_web: 'https://www.visever.es',
	},
];
