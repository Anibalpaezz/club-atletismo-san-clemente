// Consejos y trucos del club, tomados de la sección «Conseytruk» del blog histórico:
// https://clubatletismosanclemente.blogspot.com/search/label/4%20-%20Conseytruk.
// Serie completa de 100 consejos; aquí se recogen los cinco primeros capítulos (1–50).

export type Consejo = { numero: number; texto: string };

export type CapituloConsejos = {
	numero: number;
	titulo: string;
	resumen: string;
	consejos: Consejo[];
};

export const ORIGEN_CONSEJOS = "https://clubatletismosanclemente.blogspot.com/search/label/4%20-%20Conseytruk.";

export const INTRO_CONSEJOS = "Cien consejos de atletismo popular extraídos de libros, revistas y webs, de la experiencia de nuestros atletas y de los profesionales que han colaborado con la sección: el fisioterapeuta Fernando Rebert, la nutricionista Carolina Pérez, el doctor Rafael Ruiz y la podóloga Ana Herrera.";

export const CAPITULOS: CapituloConsejos[] = [
	{
		numero: 1,
		titulo: "Resistencia y rodajes",
		resumen: "Las bases del corredor popular: constancia, respiración, plan semanal y control de los kilómetros.",
		consejos: [
			{ numero: 1, texto: "Correr de forma regular es realmente una fuente de juventud, pues puede conseguir retardar el declive psicológico asociado a la vejez espectacularmente, los expertos dicen que hasta casi un 50%." },
			{ numero: 2, texto: "No hay nada que impida correr, salvo las lesiones. La actividad es la mejor forma de vida &#161;cuando corres te estás regalando años!" },
			{ numero: 3, texto: "Mejorar la resistencia. Premisa básica que condiciona todas las demás. La carrera larga, lenta y continua es la esencia del entrenamiento para el corredor de fondo. Se realiza a una velocidad moderada y sirve para mejorar la resistencia. Nunca debe ser un machaque. Nunca debes correr de más horas y debes empezar muy suave, aunque sea un corredor de 4min/km un rodaje largo lo tienes que empezar no más rápido de 5&#8217;30&#8221;/km." },
			{ numero: 4, texto: "Podrás hablar mientras corres. Otro mandamiento del running que te indica al ritmo al que tienes entrenar (salvo en las series claro) sin tener que llevar pulsómetro. Otro truco: si no puedes decir el &#8216;Padrenuestro&#8217; cuando corres sin que se entrecorte la voz es que estás haciendo el rodaje demasiado rápido." },
			{ numero: 5, texto: "Respira por la boca al correr, no sólo por la nariz. Con ello inspirarás más oxígeno y te resultará más sencillo y cómodo correr." },
			{ numero: 6, texto: "&#161;Hazte con un plan de entrenamiento! Corriendo todos los días igual es imposible mejorar. Así podría ser una buena semana tipo para un corredor de nivel medio: Domingo-rodaje largo, Lunes-descanso, Martes-rodaje de recuperación no más de 50', Miércoles-series (por ejemplo, 10' de calentamiento, 5 x 1000, 10' de enfriamiento), Jueves-descanso, Viernes-rodaje de recuperación 50' y Sábado-salida en bici u otra carrera no larga con cambios de ritmo)." },
			{ numero: 7, texto: "Ley de oro: nunca entrenar más de 4 días seguidos ni aunque sea ritmo suave." },
			{ numero: 8, texto: "Con los rodajes o trotes se oxidan las reservas de energía (carbohidratos y grasas), con gran rentabilidad, pero más lentamente. Favorecen la resistencia orgánica general, acostumbran al músculo a usar grasas y permiten bajar las pulsaciones en reposo, con lo que el corazón se hace más eficaz en su trabajo." },
			{ numero: 9, texto: "Excesos en la distancia: No por entrenar más kilómetros se mejora antes. Pasarse puede provocar tendinitis, si no se hacen de forma gradual y progresiva. No aumentes nunca de una semana para otra más de un 10% el total de kilómetros. Para que tengas una referencia, aunque entrenes para un maratón con un objetivo de bajar de 3&#8217;30&#8221; no deberías pasar de 75 Km a la semana." },
			{ numero: 10, texto: "Las series y repeticiones son fundamentales para mejorar la potencia aeróbica y por tanto para seguir mejorando las marcas personales. Se deben realizar a ritmo de competición. Permiten que el organismo se acostumbre a reciclar el lactato. Debido a la mayor demanda de oxígeno, la eficacia cardiovascular aumenta, se agranda el corazón y se mejora la perfusión sanguínea muscular." },
		],
	},
	{
		numero: 2,
		titulo: "Series, cuestas y técnica",
		resumen: "Cómo meter calidad sin lesionarse: repeticiones, cuestas, recuperaciones y técnica de carrera.",
		consejos: [
			{ numero: 11, texto: "Antes de empezar a hacer series debes llevar corriendo al menos 6 meses, 3 ó 4 días por semana para que los músculos estén preparados para un trabajo intenso y evitar lesiones. Nunca hacer más de un día de series a la semana. Ni el día anterior ni el posterior deberías hacer un rodaje largo (más de 70-80')." },
			{ numero: 12, texto: "Las series la podríamos dividir en tres tipos. Las series largas tienen más de 2.000 metros, se hacen a tu ritmo de competición y mejorar tu sistema cardiovascular. Las series medias (entre 600 y 2.000) acostumbran al cuerpo a reciclar el lactato y &#8216;agrandan&#8217; el corazón y se hacen más rápido que el ritmo de competición (por ejemplo, un corredor que compitan a 4&#8217;30&#8217; los 10 km haría repeticiones de 1.000 entre 4&#8217;15&#8221; y 4'). Por último, las series cortas, que tienen menos de 500 m y se hacen casi a tope para mejorar la velocidad y la capacidad anaeróbica." },
			{ numero: 13, texto: "La recuperación en las series es muy importante. En las largas debe ser minuto y medio al trote, en las medias 1' y en las cortas 45&#8221;." },
			{ numero: 14, texto: "Hay otro tipo de series que son las cuestas. También ayudan al cuerpo a reciclar el lactato y además dan mucha potencia muscular. Debes hacerla en la primera parte de tu plan de entrenamientos y dejar de hacerlas (y centrarte en las series en llano) cuando se acerca la competición que estás preparando." },
			{ numero: 15, texto: "Puedes hacer dos tipos de cuestas: una cuesta de 40 m con desnivel máximo (apenas es posible subir andando y la subes 15 veces) o una con desnivel medio de unos 200 (la haces 10 veces). La recuperación es lo que tardas en bajarla andando." },
			{ numero: 16, texto: "Para saber si estás haciendo bien las series, debes conseguir que la última repetición sea la más rápida. También te ayudará tomarte el pulso nada más terminar y un minuto más tarde. Si no bajas al menos 30 pulsaciones es que ha sido demasiado esfuerzo para ti." },
			{ numero: 17, texto: "Si tu nivel es medio/bajo (por ejemplo, está sobre la hora en 10 km o por encima de las 4 horas en maratón) mejor hacer cambios de ritmo que series. Una vez a la semana algo similar a este entreno: tras 10' de carrera suave, haz 25' con cambios cortos una semana (30&#8221; fuerte y 30&#8221; suave) y largos la siguiente semana (2' fuertes y 2' suaves). La intensidad no debe ser nunca tal que te impida hablar. No olvides terminar &#8216;enfriando&#8217; con 10' suaves." },
			{ numero: 18, texto: "Mejorar la eficiencia, o economía, de carrera del fondista. Para ello es necesario trabajar regularmente la técnica de carrera. Correr bien significa adaptar la técnica a las características personales del corredor y, además, es fundamental para mejorar el rendimiento. Hay muchos ejercicios de técnica de carrera: como hacer skipping (levantar rodillas) delante y detrás, hacer saltos de triple, andar de punteras, multisaltos, etc. Con dedicar 10' a la semana un día después de correr a hacer los ejercicios es suficiente." },
			{ numero: 19, texto: "A V I S O, el running engancha y el riesgo es sobreentrenarse. Una rápida pérdida de peso, la falta de apetito (de comer y también sexual) y problemas con la menstruación en el caso de las mujeres son síntomas de sobreentrenamiento. Hazte este test también: si al ponerte de pie de golpe las pulsaciones suben en más de 20 por minuto respecto a estar sentado es otro indicio de que te has pasado." },
			{ numero: 20, texto: "Con los piques en los entrenamientos conseguimos más frustraciones que satisfacciones. Ir siempre al límite nos hace rendir menos en la competición y machacar más los tendones. Hay que ser fríos y metódicos, y competir sólo con dorsal." },
		],
	},
	{
		numero: 3,
		titulo: "Fuerza y estiramientos",
		resumen: "Pulsaciones, trabajo complementario, abdominales y estiramientos para correr mejor y con menos molestias.",
		consejos: [
			{ numero: 21, texto: "Escucha a tu corazón. La mayor parte de la rodajes tienes que hacerlos entre el 60 y el 70% de tu máximo (así el organismo se acostumbra a usar las grasas como combustible). Del 70 al 85% iremos sólo en los rodajes rápidos y al final de los rodajes largos (hablamos del último tercio o menos) y del 85% en adelante sólo en las series o en las carreras." },
			{ numero: 22, texto: "&#191;Y cuál es mi máximo? Para saberlo con certeza te tienes que hacer una prueba de esfuerzo. Eso sí, olvídate de la anticuada fórmula de 220 menos la edad. Es mucho más fiable hacerte este test: calienta muy bien y luego sube a tope una cuesta de 1 km. La cifra máxima que marque tu pulsómetro en ese esfuerzo estará muy cerca de tu máximo." },
			{ numero: 23, texto: "La fuerza es una capacidad básica que influye directamente en el rendimiento del corredor. Al desarrollar más esta capacidad, se acelera la recuperación muscular, se evita en gran medida la aparición de lesiones. Y es directamente responsable de la velocidad (a más fuerza, más velocidad). Se trabaja realizando ejercicios con pesas o con gomas. Un corredor hará el trabajo de musculación con poco peso y muchas repeticiones y al terminar haremos 2 rectas de 50 m con zancada muy amplia." },
			{ numero: 24, texto: "La potencia muscular es una cualidad fundamental para mejorar posteriormente la velocidad y la resistencia. Se mejora con las cuestas específicas (de las que ya hemos hablado), los ejercicios de tobillos, las escaleras y los multisaltos." },
			{ numero: 25, texto: "Con los abdominales y con los de lumbares se fortalecen los músculos que nos mantienen erguidos, y de este modo se puede ir más rápido en los entrenamientos y se evitan dolores de espalda y en la zona pélvica. Son fundamentales los abdominales bajos." },
			{ numero: 26, texto: "Cuidado al hacer abdominales. Vigila no hacerlo nunca con las piernas estiradas, las rodillas deben estar flexionadas." },
			{ numero: 27, texto: "Los estiramientos son fundamentales. Se deben realizar después de cada entrenamiento, con mucha concentración, de 12' a 20' por ejercicio. Se realizan para que los músculos recuperen su estado anterior al ejercicio, disminuyen la sobrecarga, lo que permite un mejor drenaje y estimulan una mayor circulación sanguínea, y con ello asimilar mejor el entrenamiento. Para los corredores son fundamentales los estiramientos de isquiostibiales y los de bíceps femoral; después de estos son muy importantes los de gemelos, soleos, cuadriceps, abductores y glúteos." },
			{ numero: 28, texto: "Todavía hay mucha gente que hace rebotes al hacer estiramientos (por otra parte, como nos enseñaban en el cole). Los estiramientos hay hacerlo concentrados y manteniendo la posición. (sin rebotes)" },
			{ numero: 29, texto: "Un truco para saber si estás estirando bien o forzando demasiado el músculo, es respirar profundamente. Si no puedes, relaja un poco la posición." },
			{ numero: 30, texto: "Evita estirar siempre en frío. Por eso es mejor casi estirar sólo después de entrenar." },
		],
	},
	{
		numero: 4,
		titulo: "Recuperación y descanso",
		resumen: "Lo que se gana fuera de la carretera: deportes cruzados, descanso, masaje y cuidados musculares.",
		consejos: [
			{ numero: 31, texto: "El entrenamiento combinado permite entrenar paralelamente sin correr. Consiste en practicar varios deportes distintos cada semana. Como salir algún día en bicicleta, ir a nadar, hacer senderismo o realizar largas caminatas." },
			{ numero: 32, texto: "Andar en bicicleta es el ejercicio físico más complementario al de correr a pie. Con esta actividad se fortalecen y potencian mucho más los grupos musculares frontales de las piernas, es decir, cuadriceps, tibiales y peroneos. Permite seguir mejorando cardiovascularmente y al no ser traumática (por ausencia de impactos contra el suelo) alivia de carga a las articulaciones y evita muchas sobrecargas musculares. Puedes cambiar un rodaje largo de 90 minutos del domingo por una salida en mountain bike de 40-50 km o una en bici de carretera que ronde los 100 km." },
			{ numero: 33, texto: "Correr en el Agua. A principio de los años 90 se utilizaba esta terapia para recuperarse de lesiones. En la actualidad también se utiliza como entrenamiento. Y sirve para recuperar las piernas del machaque semanal y como drenaje linfático. Se realiza con un chaleco especial, que te permite flotar mientras corres." },
			{ numero: 34, texto: "Realizar Largas Caminatas. La mayor parte de los corredores menosprecian el andar porque ni se imaginan que es uno de los mejores ejercicios aeróbicos para fortalecer los músculos de las piernas. Es uno de los mejores métodos para seguir entrenando la resistencia orgánica y muscular cuando un corredor está muy sobrecargado muscularmente." },
			{ numero: 35, texto: "La recuperación es la parte más importante en la globalidad del entrenamiento, pues influye decisivamente en la progresión de los resultados. Recuperarse supone asimilar el trabajo anterior y restablecer el tono y la elasticidad muscular perdida durante el mismo. Hay que tenerlo en cuenta después de cada entrenamiento. Esto significa que a veces no es suficiente con descansar y son necesarios más recursos." },
			{ numero: 36, texto: "El descanso te permite asimilar todo el trabajo, evita sobrecargas y previene de lesiones inoportunas. Todos aquellos corredores que tienen trabajos que significan un gran desgaste físico, deben de procurar descansar lo máximo posible. Tienen que intercalar un día de descanso total entre cada dos de entrenamientos fuertes." },
			{ numero: 37, texto: "El descanso es relativo, pues un corredor aficionado que compita en 1h 25' en el medio maratón debe descansar del todo, al menos, dos días a la semana. Aquellos que compiten a ritmos mucho más lentos deberían hacer tres días de descanso a la semana. Y los que empiezan o están en bajos niveles de forma, sólo deberían correr tres días a la semana y descansar cuatro. La edad también influye, después de los 45 años toma un día de descanso extra a la semana." },
			{ numero: 38, texto: "Es necesario dormir mucho, lo máximo posible. Muchos corredores se tienen que conformar con dormir lo que les permite su trabajo y su vida familiar. Aquellos que tengan mucha disponibilidad de tiempo que lo aprovechen. Pero los que no duerman un mínimo de siete horas cada día que no busquen milagros entrenando fuerte." },
			{ numero: 39, texto: "Antes de las competiciones es necesario descansar aún más. En la semana previa se deben disminuir los ritmos de entrenamientos, se debe incrementar el descanso en uno o dos días más y se ha de procurar hacer poca calidad, para llegar lo más descansado posible a la competición." },
			{ numero: 40, texto: "El Masaje es muy necesario para descargar las piernas y la zona lumbar en los periodos de máximo entrenamiento. Deberíais acudir al masajista cuando os aproximéis a una competición importante o cuando estéis muy cansados muscularmente. Lo ideal sería una vez cada quince días en los periodos de más carga." },
		],
	},
	{
		numero: 5,
		titulo: "Competición y cuidados",
		resumen: "Cómo llegar al día de la carrera: hidroterapia, alimentación previa y detalles que marcan la diferencia.",
		consejos: [
			{ numero: 41, texto: "La Hidroterapia. Entre las terapias del agua, para los corredores son más efectivas las de los baños fríos, las de chorros fuertes, el hidromasaje, los contrastes de agua fría y caliente y las saunas, después de las competiciones. A veces no son terapias muy agradables, pero siempre son muy efectivas de cara a la recuperación muscular. En la foto inferior, podemos apreciar, el llamado entrenamiento en vacío. Este tipo de entrenamiento está pensado para no perder el estado de forma muscular, cuando se tienen cualquier tipo de lesión o estado, que impide el entrenamiento en pista. (cartílagos, menisco, tendones, embarazos, etc.)" },
			{ numero: 42, texto: "No corras con tensión. Corre relajado, con los codos ligeramente doblados y sin apretar los puños." },
			{ numero: 43, texto: "Una zancada lenta, con mucho tiempo de apoyo en el pie, te perjudica. Haz este ejercicio: trata de ir a 180 apoyos por minuto, o sea 60 pasos cada 20 segundos. De vez en cuando mira tu cronómetro y ajusta el paso. Al final vas a conseguir que sea un gesto natural y tu zancada será mucho más eficaz." },
			{ numero: 45, texto: "Antes del calentamiento, cubrir con vaselina todas las zonas del cuerpo susceptibles de rozamiento, sobre todo en las carreras muy largas. Las zonas de mayor riesgo son los pies: entre los dedos, en el arco planta, en el talón y alrededor del tendón de aquiles. Otras zonas son las axilas, los interiores de los muslos y los pezones." },
			{ numero: 46, texto: "El running premia a los conservadores. Lo ideal es tranquilo, para ir creciéndose a medida que pasan los kilómetros." },
			{ numero: 47, texto: "Cuidado con las subidas y con las bajadas. Cuando llega una cuesta casi sin darnos cuenta apretamos para que no baje nuestra velocidad. Error, adapta tu zancada, acortarla para seguir teniendo buena frecuencia. Y cuidado con las bajadas. Tu corazón no tiene problemas en que lanzes pero machacas tus piernas muscularmente y eso pasa factura." },
			{ numero: 48, texto: "Tener clara la estrategia de cara a la competición supone una cierta garantía de éxito. Salir en una carrera sin tener una idea del ritmo al que quieres ir y la marca que quieres conseguir un comprar &#8216;boletos&#8217; para salir a tope y luego que se esté pasando gente toda la carrera y terminar hundido física y psíquicamente." },
			{ numero: 49, texto: "&#191;Qué hacer el Día de la Competición?. Desayunar dos horas antes como mínimo, y hacerlo como todos los días. No hay que cambiar ni el hábito, ni los alimentos. Evita la leche que puede darte problemas de digestión. Hasta 20 minutos antes de la salida bebe bastante agua aunque no tengas sed y nada de azúcares o bebidas azucaradas (la Coca-Cola te dará flato)." },
			{ numero: 50, texto: "Antes de una carrera que sea menos de maratón, no caigas en el error de cenar demasiado fuerte. Si piensas que llenarte de carbohidratos te va a ayudar estás equivocado; al contrario, dormirás mal y en carrera te encontrarás pesado en los primeros km. Otra cosa es si la carrera es un maratón o medio maratón donde necesitas tener a tope los depósitos (hasta que no llevas al menos hora y media corriendo no empiezas a necesitar tirar de grasas por lo que no hay que alargar demasiado las reservas de glucógeno)." },
		],
	},
];
