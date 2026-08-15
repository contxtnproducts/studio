import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Two collections, one detail template. Case studies and articles
// share the same shape so they can share the same layout.
const shared = z.object({
  title: z.string(),
  summary: z.string(),
  date: z.coerce.date(),
  draft: z.boolean().default(true),
});

const work = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/work' }),
  schema: shared.extend({
    client: z.string(),
    role: z.string(),
    period: z.string(),
  }),
});

const writing = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/writing' }),
  schema: shared,
});

export const collections = { work, writing };
