// Textos de la interfaz en español e inglés.
//
// El contenido editorial (noticias, actas, reglamentos y consejos) no se traduce:
// vive en las colecciones de contenido y se sirve igual en ambos idiomas.
// Aquí solo van los textos de la web: navegación, cabecera, pie y páginas.

export type Lang = 'es' | 'en';

export const IDIOMAS: Lang[] = ['es', 'en'];

/** El idioma sale de la ruta original, antes de que el middleware reescriba /en/… */
export function idiomaDe(pathname: string | undefined): Lang {
	return pathname && (pathname === '/en' || pathname.startsWith('/en/')) ? 'en' : 'es';
}

export function otroIdioma(lang: Lang): Lang {
	return lang === 'es' ? 'en' : 'es';
}

const TEXTOS: Record<Lang, Record<string, string>> = {
	es: {
		'nav.inicio': 'Inicio',
		'nav.club': 'El Club',
		'nav.socio': 'Hazte socio',
		'nav.carrera': 'La Carrera',
		'nav.ruta': 'San Clemente en Ruta',
		'nav.noticias': 'Noticias',
		'nav.contacto': 'Contacto',

		'header.cta': '10K Nocturna',
		'header.menu.abrir': 'Abrir menú',
		'header.menu.cerrar': 'Cerrar menú',
		'header.idioma.es': 'Ver la web en español',
		'header.idioma.en': 'Ver la web en inglés',

		'footer.lema': 'Atletismo popular desde San Clemente (Cuenca), la Joya del Renacimiento Manchego.',
		'footer.contacto': 'Contacto',
		'footer.blog': 'Nuestro blog histórico',
		'footer.siguenos': 'Síguenos',
		'footer.desarrollado': 'Desarrollado por',

		'hero.alt': 'Plaza Mayor de San Clemente de noche, escenario de la 10K Nocturna',
		'hero.badge': 'Club de atletismo popular · San Clemente (Cuenca)',
		'hero.lema': 'Corriendo por la Joya del Renacimiento Manchego',
		'hero.inscripcion': 'Inscripción',
		'hero.reglamento': 'Reglamento',
		'hero.recorrido': 'Recorrido',

		'comun.leerMas': 'Leer más',

		'contacto.tituloPagina': 'Contacto',
		'contacto.metaDesc':
			'Contacta con el Club Atletismo San Clemente: correo oficial, información de la 10K Nocturna y cómo hacerte socio.',
		'contacto.eyebrow': 'Contacto',
		'contacto.titulo': 'Hablemos',
		'contacto.desc':
			'Un correo basta para resolver dudas, apuntarte al club o colaborar con la 10K Nocturna.',
		'contacto.correoTitulo': 'Correo oficial',
		'contacto.correoCta': 'Escribir un correo',
		'contacto.redesTitulo': 'Redes sociales',
		'contacto.socioTitulo': 'Hazte socio',
		'contacto.socioLinea1': 'Abierto a todos los niveles',
		'contacto.socioLinea2': 'Escríbenos y te contamos todo',
		'contacto.socioCta': 'Solicitar información',
		'contacto.colabTitulo': 'Colaboradores y patrocinadores',
		'contacto.colabTexto':
			'¿Quieres colaborar con el club o patrocinar la 10K Nocturna? Cuéntanos tu propuesta por correo: la carrera y el club necesitan a gente como tú.',
		'contacto.colabBoton': 'Propón tu colaboración',

		'error.metaTitulo': 'Página no encontrada',
		'error.titulo': 'Página no encontrada',
		'error.texto':
			'La página que buscas no existe o ha cambiado de dirección. Vuelve al inicio para seguir corriendo con nosotros.',
		'error.boton': 'Volver al inicio',

		'socio.tituloPagina': 'Hazte socio',
		'socio.metaDesc':
			'Qué incluye ser socio del Club Atletismo San Clemente: cuota anual, equipación oficial a precio de club y cómo darse de alta.',
		'socio.eyebrow': 'Hazte socio',
		'socio.titulo': 'Únete al club',
		'socio.desc':
			'Correr es mejor en compañía. Si te gusta correr, el club tiene un sitio para ti, sea cual sea tu nivel.',
		'socio.seccionTitulo': 'Qué incluye ser socio',
		'socio.seccionDesc': 'Ventajas de formar parte del club y todo lo que cubre la cuota anual.',
		'socio.ventajasTitulo': 'Ventajas de ser socio',
		'socio.ventaja1': 'Entrenamientos semanales en grupo, con ritmos adaptados a cada nivel.',
		'socio.ventaja2':
			'Correr como equipo en el Circuito Provincial de Carreras Populares de la Diputación de Cuenca.',
		'socio.ventaja3':
			'Equipación oficial a precio de club (chaquetón, camiseta y bolsa para nuevos socios).',
		'socio.ventaja4': 'Salida anual del club a una gran carrera (Media Maratón y 10K).',
		'socio.ventaja5': 'Convivencias: comida de hermanamiento y actividades del club.',
		'socio.ventaja6': 'Participación y voz en la asamblea anual de socios.',
		'socio.cuotaLabel': 'Cuota anual',
		'socio.cuotaTexto':
			'El club es una entidad sin ánimo de lucro: la cuota cubre la equipación, la organización de la 10K Nocturna y las actividades del año. Plazo habitual: antes de finales de febrero.',
		'socio.comoTitulo': '¿Cómo me apunto?',
		'socio.comoTexto':
			'Escríbenos a {email} indicando tu talla de equipación y te contamos los pasos.',
		'socio.equipacionTitulo': 'Equipación oficial del club',
		'socio.equipacionDesc':
			'Precios de la equipación de la temporada para socios, con el chaquetón subvencionado al 50 % por el club.',
		'socio.chaquetonTitulo': 'Chaquetón',
		'socio.chaquetonTexto':
			'Azul con gorro (Joma, Albacete), con el 50 % subvencionado por el club para socios: pagas unos 21 €.',
		'socio.nuevosTitulo': 'Nuevos socios',
		'socio.nuevosPrecio': 'Camiseta + bolsa',
		'socio.nuevosTexto':
			'Camiseta del club y bolsa de nueva incorporación incluidas al hacerte socio.',
		'socio.jovenesTitulo': 'Jóvenes',
		'socio.jovenesTexto': '35 € con la camiseta o 150 € con la equipación completa.',
		'socio.nota':
			'La equipación se encarga cada temporada en la tienda Joma de Albacete. Al escribirnos, dinos tu talla y te indicamos los pasos.',
		'socio.boton1': 'Quiero hacerme socio',
		'socio.boton2': 'Formas de contacto',

		'noticias.tituloPagina': 'Noticias',
		'noticias.metaDesc':
			'Noticias del Club Atletismo San Clemente y del atletismo popular del circuito provincial de Cuenca.',
		'noticias.eyebrow': 'Noticias',
		'noticias.titulo': 'Actualidad del club',
		'noticias.desc':
			'Inscripciones, resultados, entrenamientos y crónicas de las carreras del Circuito Provincial de Carreras Populares de Cuenca.',
		'noticias.vacioTitulo': 'Todavía no hay noticias publicadas',
		'noticias.vacioTexto':
			'En cuanto el club publique sus primeras noticias, aparecerán aquí.',
		'noticias.volver': 'Todas las noticias',
		'noticias.recientes': 'Noticias recientes',

		'home.titulo': 'Club Atletismo San Clemente | Escuela y Entrenamientos en San Clemente',
		'home.descripcion':
			'Web oficial del Club Atletismo San Clemente. Escuela deportiva, competiciones, inscripciones, horarios y eventos de atletismo en San Clemente (Cuenca).',
		'home.club.eyebrow': 'El Club',
		'home.club.titulo': 'Atletismo popular con raíces manchegas',
		'home.club.texto':
			'Nacimos de un grupo de amigos que corría por los caminos de San Clemente y hoy somos un club de referencia en el atletismo popular conquense.',
		'home.club.boton': 'Conoce el club',
		'home.valor1.titulo': 'Un club para todos',
		'home.valor1.texto':
			'Del que se estrena al más rápido: todos los niveles tienen hueco en el atletismo popular.',
		'home.valor2.titulo': 'Presencia en el circuito',
		'home.valor2.texto':
			'Participamos en el Circuito Provincial de Carreras Populares de la Diputación de Cuenca.',
		'home.valor3.titulo': 'Organizamos la 10K Nocturna',
		'home.valor3.texto':
			'La prueba que cada año pone a San Clemente en el mapa del atletismo popular.',
		'home.ruta.eyebrow': 'San Clemente en Ruta',
		'home.ruta.titulo': 'Ven a correr, quédate a conocer la Joya',
		'home.ruta.texto':
			'San Clemente (Cuenca), la Joya del Renacimiento Manchego, es mucho más que una salida y una meta.',
		'home.ruta.boton': 'Descubre San Clemente',
		'home.lugar1.titulo': 'Plaza Mayor',
		'home.lugar1.texto':
			'Salida y meta de la carrera. Junto al Antiguo Ayuntamiento renacentista del siglo XVI, es el corazón monumental de la villa.',
		'home.lugar2.titulo': 'Paraje de Rus',
		'home.lugar2.texto':
			'Suelo privilegiado de entrenamiento a un paso del casco urbano, entre viñedos y naturaleza manchega.',
		'home.lugar3.titulo': 'Gastronomía manchega',
		'home.lugar3.texto':
			'Morteruelo, migas y vino de la tierra: la mejor recompensa después de correr por la Joya del Renacimiento Manchego.',
		'home.noticias.eyebrow': 'Noticias',
		'home.noticias.titulo': 'Últimas del club y del circuito',
		'home.noticias.texto':
			'Resultados, inscripciones, entrenamientos y carreras del Circuito Provincial de Cuenca.',
		'home.noticias.boton': 'Todas las noticias',
		'home.noticias.vacio': 'Las noticias del club se publicarán aquí en cuanto estén disponibles.',

		'consejos.eyebrow': 'Conseytruk',
		'consejos.titulo': 'Consejos y trucos para nuestro deporte',
		'consejos.intro':
			'Cien consejos de atletismo popular extraídos de libros, revistas y webs, de la experiencia de nuestros atletas y de los profesionales que han colaborado con la sección: el fisioterapeuta Fernando Rebert, la nutricionista Carolina Pérez, el doctor Rafael Ruiz y la podóloga Ana Herrera.',
		'consejos.verTodos': 'Ver los 100 consejos',
		'consejos.consejos': 'Consejos',
		'consejos.abrir': 'abrir',
		'consejos.cerrar': 'Cerrar',
		'consejos.verCompleta': 'Ver la serie completa en el blog',
		'consejos.capitulo': 'Capítulo',
	},
	en: {
		'nav.inicio': 'Home',
		'nav.club': 'The Club',
		'nav.socio': 'Join the club',
		'nav.carrera': 'The Race',
		'nav.ruta': 'San Clemente en Ruta',
		'nav.noticias': 'News',
		'nav.contacto': 'Contact',

		'header.cta': '10K Night Race',
		'header.menu.abrir': 'Open menu',
		'header.menu.cerrar': 'Close menu',
		'header.idioma.es': 'View the site in Spanish',
		'header.idioma.en': 'View the site in English',

		'footer.lema':
			'Grassroots athletics from San Clemente (Cuenca), the Jewel of the Manchegan Renaissance.',
		'footer.contacto': 'Contact',
		'footer.blog': 'Our historic blog',
		'footer.siguenos': 'Follow us',
		'footer.desarrollado': 'Developed by',

		'hero.alt': "San Clemente's Plaza Mayor at night, the setting of the 10K Night Race",
		'hero.badge': 'Grassroots athletics club · San Clemente (Cuenca)',
		'hero.lema': 'Running through the Jewel of the Manchegan Renaissance',
		'hero.inscripcion': 'Entry',
		'hero.reglamento': 'Rules',
		'hero.recorrido': 'Course',

		'comun.leerMas': 'Read more',

		'contacto.tituloPagina': 'Contact',
		'contacto.metaDesc':
			'Get in touch with Club Atletismo San Clemente: official email, 10K Night Race information and how to become a member.',
		'contacto.eyebrow': 'Contact',
		'contacto.titulo': "Let's talk",
		'contacto.desc':
			'One email is enough to answer your questions, join the club or support the 10K Night Race.',
		'contacto.correoTitulo': 'Official email',
		'contacto.correoCta': 'Write an email',
		'contacto.redesTitulo': 'Social media',
		'contacto.socioTitulo': 'Join the club',
		'contacto.socioLinea1': 'Open to all levels',
		'contacto.socioLinea2': 'Write to us and we will tell you everything',
		'contacto.socioCta': 'Request information',
		'contacto.colabTitulo': 'Partners and sponsors',
		'contacto.colabTexto':
			'Would you like to support the club or sponsor the 10K Night Race? Send us your proposal by email: the race and the club need people like you.',
		'contacto.colabBoton': 'Propose a partnership',

		'error.metaTitulo': 'Page not found',
		'error.titulo': 'Page not found',
		'error.texto':
			'The page you are looking for does not exist or has moved. Go back home to keep running with us.',
		'error.boton': 'Back home',

		'socio.tituloPagina': 'Join the club',
		'socio.metaDesc':
			'What membership of Club Atletismo San Clemente includes: annual fee, official club-priced kit and how to sign up.',
		'socio.eyebrow': 'Join the club',
		'socio.titulo': 'Become a member',
		'socio.desc':
			'Running is better in company. If you like running, the club has a place for you, whatever your level.',
		'socio.seccionTitulo': 'What membership includes',
		'socio.seccionDesc': 'The advantages of being part of the club and everything the annual fee covers.',
		'socio.ventajasTitulo': 'Membership benefits',
		'socio.ventaja1': 'Weekly group training sessions, with paces adapted to every level.',
		'socio.ventaja2':
			'Running as a team in the Provincial Popular Races Circuit of the Cuenca Provincial Council.',
		'socio.ventaja3': 'Official kit at club price (jacket, shirt and bag for new members).',
		'socio.ventaja4': 'Annual club trip to a major race (half marathon and 10K).',
		'socio.ventaja5': 'Get-togethers: club lunch and activities.',
		'socio.ventaja6': 'A say and a vote at the annual members’ meeting.',
		'socio.cuotaLabel': 'Annual fee',
		'socio.cuotaTexto':
			'The club is a non-profit organisation: the fee covers kit, the organisation of the 10K Night Race and the year’s activities. Usual deadline: before the end of February.',
		'socio.comoTitulo': 'How do I join?',
		'socio.comoTexto':
			'Write to {email} with your kit size and we will explain the steps.',
		'socio.equipacionTitulo': 'Official club kit',
		'socio.equipacionDesc':
			'Season kit prices for members, with the jacket 50 % subsidised by the club.',
		'socio.chaquetonTitulo': 'Jacket',
		'socio.chaquetonTexto':
			'Blue with hood (Joma, Albacete), 50 % subsidised by the club for members: you pay around €21.',
		'socio.nuevosTitulo': 'New members',
		'socio.nuevosPrecio': 'Shirt + bag',
		'socio.nuevosTexto': 'Club shirt and new-member bag included when you join.',
		'socio.jovenesTitulo': 'Young runners',
		'socio.jovenesTexto': '€35 with the shirt or €150 with the full kit.',
		'socio.nota':
			'Kit is ordered each season from the Joma store in Albacete. When you write to us, tell us your size and we will explain the steps.',
		'socio.boton1': 'I want to join',
		'socio.boton2': 'Contact options',

		'noticias.tituloPagina': 'News',
		'noticias.metaDesc':
			'News from Club Atletismo San Clemente and from grassroots athletics on the Cuenca provincial circuit.',
		'noticias.eyebrow': 'News',
		'noticias.titulo': 'Club news',
		'noticias.desc':
			'Entries, results, training sessions and race reports from the Provincial Popular Races Circuit of Cuenca.',
		'noticias.vacioTitulo': 'No news published yet',
		'noticias.vacioTexto': 'Club news will appear here as soon as it is published.',
		'noticias.volver': 'All news',
		'noticias.recientes': 'Recent news',

		'home.titulo': 'Club Atletismo San Clemente | School and Training in San Clemente',
		'home.descripcion':
			'Official website of Club Atletismo San Clemente. Sports school, races, entries, schedules and athletics events in San Clemente (Cuenca).',
		'home.club.eyebrow': 'The Club',
		'home.club.titulo': 'Grassroots athletics with Manchegan roots',
		'home.club.texto':
			"We were born from a group of friends who ran the paths of San Clemente, and today we are a benchmark club in Cuenca's grassroots athletics.",
		'home.club.boton': 'Meet the club',
		'home.valor1.titulo': 'A club for everyone',
		'home.valor1.texto':
			'From first-timers to the fastest runners: every level has a place in grassroots athletics.',
		'home.valor2.titulo': 'On the circuit',
		'home.valor2.texto':
			'We take part in the Provincial Popular Races Circuit of the Cuenca Provincial Council.',
		'home.valor3.titulo': 'We organise the 10K Night Race',
		'home.valor3.texto':
			'The race that puts San Clemente on the grassroots athletics map every year.',
		'home.ruta.eyebrow': 'San Clemente en Ruta',
		'home.ruta.titulo': 'Come to run, stay to discover the Jewel',
		'home.ruta.texto':
			'San Clemente (Cuenca), the Jewel of the Manchegan Renaissance, is much more than a start and a finish line.',
		'home.ruta.boton': 'Discover San Clemente',
		'home.lugar1.titulo': 'Plaza Mayor',
		'home.lugar1.texto':
			'Start and finish of the race. Next to the 16th-century Renaissance Old Town Hall, it is the monumental heart of the town.',
		'home.lugar2.titulo': 'Paraje de Rus',
		'home.lugar2.texto':
			'A privileged training ground a step from the town centre, among vineyards and Manchegan countryside.',
		'home.lugar3.titulo': 'Manchegan food',
		'home.lugar3.texto':
			'Morteruelo, migas and local wine: the best reward after running through the Jewel of the Manchegan Renaissance.',
		'home.noticias.eyebrow': 'News',
		'home.noticias.titulo': 'Latest from the club and the circuit',
		'home.noticias.texto':
			'Results, entries, training sessions and races from the Provincial Circuit of Cuenca.',
		'home.noticias.boton': 'All news',
		'home.noticias.vacio': 'Club news will be published here as soon as it is available.',

		'consejos.eyebrow': 'Conseytruk',
		'consejos.titulo': 'Tips and tricks for our sport',
		'consejos.intro':
			'One hundred grassroots athletics tips taken from books, magazines and websites, from our athletes’ experience and from the professionals who have contributed to the section: physiotherapist Fernando Rebert, nutritionist Carolina Pérez, Dr Rafael Ruiz and podiatrist Ana Herrera.',
		'consejos.verTodos': 'See all 100 tips',
		'consejos.consejos': 'Tips',
		'consejos.abrir': 'open',
		'consejos.cerrar': 'Close',
		'consejos.verCompleta': 'See the full series on the blog',
		'consejos.capitulo': 'Chapter',
	},
};

export function t(lang: Lang, clave: string): string {
	return TEXTOS[lang][clave] ?? TEXTOS.es[clave] ?? clave;
}
