import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob, file } from 'astro/loaders';

const club = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/club' }),
	schema: z.object({
		titulo: z.string(),
		subtitulo: z.string().optional(),
		orden: z.number().default(99),
	}),
});

const carrera = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/carrera' }),
	schema: z.object({
		titulo: z.string(),
		categoria: z.enum(['10k', '5k', 'general']),
		edicion: z.string().optional(),
		orden: z.number().default(99),
	}),
});

const noticias = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/noticias' }),
	schema: z.object({
		titulo: z.string(),
		resumen: z.string().optional(),
		imagen_url: z.string().optional(),
		fecha_publicacion: z.coerce.date(),
		destacada: z.boolean().default(false),
	}),
});

const reglamentos = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/reglamentos' }),
	schema: z.object({
		titulo: z.string(),
		year: z.number(),
		isCurrent: z.boolean().default(false),
		pdfUrl: z.string().nullish(),
		orden: z.number().default(99),
	}),
});

const resultados = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/resultados' }),
	schema: z.object({
		year: z.number(),
		cronomanchaPdfUrl: z.string(),
		participantCount: z.number().nullish(),
	}),
});

const resultadosCronomancha = defineCollection({
	loader: file('./src/content/resultados-cronomancha/resultados.json'),
	schema: z.object({
		year: z.number(),
		race: z.enum(['10K', '5K']),
		race_slug: z.string(),
		race_name: z.string().nullable(),
		official_url: z.string().nullable(),
		synchronized_at: z.string().nullable(),
		results: z.array(
			z.object({
				bib: z.string().nullable(),
				runner_name: z.string(),
				category: z.string().default('Sin categoría'),
				club: z.string().nullable(),
				gender: z.enum(['M', 'F']).nullable(),
				time_ms: z.number().nullable(),
				time_formatted: z.string().nullable(),
				position: z.number().nullable(),
				status: z.string(),
			}),
		),
	}),
});

export const collections = { club, carrera, noticias, reglamentos, resultados, resultadosCronomancha };
