import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

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

export const collections = { club, carrera, noticias, reglamentos, resultados };
