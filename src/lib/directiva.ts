export type MiembroClub = {
	nombre: string;
	funcion?: string;
};

export type CargoJunta = {
	cargo: string;
	nombre: string;
};

export const FECHA_ORGANIGRAMA = '31 de marzo de 2025';

export const JUNTA: CargoJunta[] = [
	{ cargo: 'Presidente', nombre: 'Rafael Páez Castro' },
	{ cargo: 'Vicepresidente', nombre: 'José Eduardo Escribano Checa' },
	{ cargo: 'Secretario', nombre: 'Oscar Haro Martínez' },
	{ cargo: 'Tesorera', nombre: 'Ana Isabel Ballesteros González' },
];

export const VOCALES: MiembroClub[] = [
	{ nombre: 'José Joaquín Jiménez' },
	{ nombre: 'J.T. Mesas Valera', funcion: 'Web, inscripciones y comunicación' },
	{ nombre: 'Santiago Martínez Martínez' },
	{ nombre: 'José Ángel Escobar Fernández' },
	{ nombre: 'Mª Elena Plaza Buedo' },
];

export const SOCIOS: MiembroClub[] = [
	{ nombre: 'Francisco Vicente Martínez' },
	{ nombre: 'Pedro Ballesteros' },
	{ nombre: 'Vicente González' },
	{ nombre: 'José Joaquín Casas' },
	{ nombre: 'Pablo Brox' },
	{ nombre: 'Joaquín Martínez' },
	{ nombre: 'Enrique Toledo' },
	{ nombre: 'Florentino Pellejero' },
	{ nombre: 'Félix Jiménez' },
	{ nombre: 'Jesús Martínez García' },
	{ nombre: 'Ángel Herrera' },
	{ nombre: 'Luis Carlos Moreno' },
	{ nombre: 'María Helena Plaza' },
	{ nombre: 'José Antonio Ortega', funcion: 'Redes' },
	{ nombre: 'Félix Pellejero' },
	{ nombre: 'Manuel Girón Calero' },
	{ nombre: 'Valeriano Jiménez Osma' },
	{ nombre: 'Joaquín Enrique Saiz Cabrera' },
	{ nombre: 'Pablo Brox Alarcón' },
	{ nombre: 'Manuel Fernández Ruiz' },
	{ nombre: 'Alberto Martínez López' },
	{ nombre: 'José Mesas Martínez' },
	{ nombre: 'Javier Sánchez Herrera' },
];