-- ============================================================
-- Club Atletismo San Clemente — Datos semilla (seed)
-- Contenido real del club. Ejecutar tras la migración 0001.
-- ============================================================

-- ------------------------------------------------------------
-- Noticias
-- ------------------------------------------------------------
insert into public.noticias (titulo, resumen, cuerpo, fecha_publicacion, publicado) values
(
  'Abierta la inscripción de la 10K Nocturna Villa de San Clemente',
  'Ya puedes inscribirte a la prueba reina del club y a la 5K de iniciación a través de Cronomancha/Timingsys.',
  'La Carrera Popular 10K Nocturna Villa de San Clemente, puntuable para el Circuito Provincial de Carreras Populares de la Diputación de Cuenca, abre el plazo de inscripción. La salida será a las 22:00 h desde la Plaza Mayor, junto al Antiguo Ayuntamiento renacentista, con un recorrido urbano y llano por el casco histórico: Plaza Mayor, Torre Vieja e Iglesia de Santiago Apóstol.\n\nTodos los inscritos recibirán la bolsa del corredor y contarán con servicios de fisioterapia y avituallamiento. El cronometraje y las clasificaciones corren a cargo de Cronomancha/Timingsys.\n\nPara la 5K de iniciación no es necesario experiencia previa: es la oportunidad perfecta para estrenarse corriendo por la Joya del Renacimiento Manchego.',
  now() - interval '2 days',
  true
),
(
  'El club participa en el Circuito Provincial de Carreras Populares de la Diputación de Cuenca',
  'Nuestros corredores suman kilómetros por toda la provincia en una de las temporadas con más carreras del circuito.',
  'Un año más, los corredores del Club Atletismo San Clemente están presentes en el Circuito Provincial de Carreras Populares que organiza la Diputación de Cuenca. Una cita tras otra, nuestros atletas representan al municipio en pruebas que van desde las medias de montaña hasta las populares urbanas.\n\nDesde el club animamos a todos los vecinos a participar: no hace falta ser un atleta experimentado para disfrutar del atletismo popular. Consulta aquí las noticias de cada prueba y las crónicas de los resultados de nuestros corredores.',
  now() - interval '6 days',
  true
),
(
  'La 10K Nocturna vuelve a ser puntuable para el circuito provincial',
  'Confirmado el acuerdo con la Diputación de Cuenca para que la carrera de San Clemente sume puntos en el circuito de 2026.',
  'El Club Atletismo San Clemente ha confirmado que la 10K Nocturna Villa de San Clemente volverá a formar parte del calendario del Circuito Provincial de Carreras Populares de la Diputación de Cuenca.\n\nEste acuerdo refuerza el carácter deportivo de nuestra prueba y garantiza la presencia de los mejores corredores de la provincia en la Plaza Mayor. La puntuación obtenida en San Clemente puede resultar decisiva en la clasificación final del circuito.',
  now() - interval '15 days',
  true
),
(
  'Entrenamientos de temporada: todos los niveles son bienvenidos',
  'Retomamos los entrenamientos semanales del club. Si quieres correr, solo tienes que venir a vernos.',
  'Tras el verano retomamos los entrenamientos semanales del club. Combinamos rodajes, series y salidas por los caminos de San Clemente, con grupos adaptados a cada nivel: desde quienes empiezan a correr hasta los más rápidos del circuito provincial.\n\nLos entrenamientos son abiertos y gratuitos para quien quiera probar. Escríbenos a losquevanacorrertesaludan@hotmail.com y te contamos dónde y cuándo quedamos.',
  now() - interval '1 month',
  true
);

-- ------------------------------------------------------------
-- Patrocinadores / colaboradores
-- ------------------------------------------------------------
insert into public.patrocinadores (nombre, url_web, logo_url, orden) values
  ('Ayuntamiento de San Clemente', 'https://www.sanclemente.es', null, 1),
  ('Diputación de Cuenca', 'https://www.dipucuenca.es', null, 2),
  ('Cronomancha / Timingsys', 'https://www.cronomancha.com', null, 3);

-- ------------------------------------------------------------
-- Configuración de la edición vigente de la carrera
-- (El club actualiza esta fila cada año sin tocar código)
-- ------------------------------------------------------------
insert into public.carrera_config (
  edicion, fecha, hora, lugar,
  enlace_inscripcion, enlace_clasificaciones, enlace_reglamento, enlace_recorrido,
  texto_cta, activo
) values (
  'Edición 2026',
  '2026-08-15',
  '22:00',
  'Plaza Mayor, San Clemente (Cuenca)',
  'https://www.cronomancha.com/inscripciones/10k-nocturna-san-clemente',
  'https://www.cronomancha.com/clasificaciones/10k-nocturna-san-clemente',
  '/carrera/#reglamento',
  '/carrera/#recorrido',
  'Inscríbete a la 10K Nocturna',
  true
);
