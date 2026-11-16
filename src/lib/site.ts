export const SITE = {
	name: 'Club Atletismo' + '\n' + 'San Clemente',
	nombreCorto: 'Atletismo San Clemente',
	lema: 'Corriendo por la Joya del Renacimiento Manchego',
	url: 'https://club-atletismo-san-clemente.vercel.app',
	email: 'losquevanacorrertesaludan@hotmail.com',
	telefonos: [
		{ numero: '969 300 835', tel: '+34969300835' },
		{ numero: '653 896 391', tel: '+34653896391' },
	],
	inscripcionUrl: 'https://timingsys.com/',
	blogspot: 'https://clubatletismosanclemente.blogspot.com',
	municipio: 'San Clemente (Cuenca)',
	descripcion:
		'Web oficial del Club Atletismo San Clemente. Escuela deportiva, competiciones, inscripciones, horarios y eventos de atletismo en San Clemente (Cuenca).',
};

export const NAV = [
	{ href: '/', label: 'Inicio', clave: 'inicio' },
	{ href: '/el-club/', label: 'El Club', clave: 'club' },
	{ href: '/hazte-socio/', label: 'Hazte socio', clave: 'socio' },
	{ href: '/carrera/', label: 'La Carrera', clave: 'carrera' },
	{ href: '/ruta/', label: 'San Clemente en Ruta', clave: 'ruta' },
	{ href: '/noticias/', label: 'Noticias', clave: 'noticias' },
	{ href: '/contacto/', label: 'Contacto', clave: 'contacto' },
];

export const REDES = [
	{
		nombre: 'Blogspot (histórico)',
		href: SITE.blogspot,
		icono: 'blogspot',
	},
	{
		nombre: 'Facebook',
		href: 'https://www.facebook.com/groups/clubatletismosanclemente/',
		icono: 'facebook',
	},
	{
		nombre: 'Instagram',
		href: 'https://www.instagram.com/clubatletismosanclemente/',
		icono: 'instagram',
	},
];
