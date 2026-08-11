export function formatFecha(input: string | null | undefined): string {
	if (!input) return '';
	const date = new Date(input);
	if (Number.isNaN(date.getTime())) return '';
	return new Intl.DateTimeFormat('es-ES', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	}).format(date);
}

export function slugify(titulo: string): string {
	return titulo
		.toLowerCase()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/(^-|-$)+/g, '');
}
