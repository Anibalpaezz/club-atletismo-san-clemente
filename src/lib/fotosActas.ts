const modulos = import.meta.glob<string>('../assets/actas/*.avif', {
	eager: true,
	query: '?url',
	import: 'default',
});

const fotos = Object.values(modulos);

function barajar<T>(lista: T[]): T[] {
	const copia = [...lista];
	for (let i = copia.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[copia[i], copia[j]] = [copia[j], copia[i]];
	}
	return copia;
}

export function fotoAleatoria(): string | undefined {
	return fotos.length > 0 ? fotos[Math.floor(Math.random() * fotos.length)] : undefined;
}

export function fotosAleatorias(n: number): (string | undefined)[] {
	if (fotos.length === 0) return Array.from({ length: n }, () => undefined);
	const barajadas = barajar(fotos);
	return Array.from({ length: n }, (_, i) => barajadas[i % barajadas.length]);
}
