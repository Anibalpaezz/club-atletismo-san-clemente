export type RecordCircuito = {
	categoria: string;
	nombre: string | null;
	tiempo: string | null;
	año: number | null;
};

// TODO: pedir a la junta directiva las mejores marcas de la 10K Nocturna
// (récord absoluto masculino y femenino, con nombre, tiempo y año).
// Cuando se confirmen, rellena los valores y el muro de récords se
// actualiza solo en la página de la carrera.
export const RECORDS_CIRCUITO: RecordCircuito[] = [
	{ categoria: 'Récord absoluto masculino', nombre: null, tiempo: null, año: null },
	{ categoria: 'Récord absoluto femenino', nombre: null, tiempo: null, año: null },
];