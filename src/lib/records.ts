export type RecordCircuito = {
	categoria: string;
	nombre: string | null;
	tiempo: string | null;
	año: number | null;
};

// Récords manuales de respaldo: la sección «Récords del circuito» calcula de
// forma automática las mejores marcas por género desde los resultados
// sincronizados de Cronomancha (colección `resultados_cronomancha`). Estos
// valores solo se usan si no hay datos sincronizados todavía.
export const RECORDS_CIRCUITO: RecordCircuito[] = [
	{ categoria: 'Récord absoluto masculino', nombre: null, tiempo: null, año: null },
	{ categoria: 'Récord absoluto femenino', nombre: null, tiempo: null, año: null },
];