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

// Strict, typed content blocks — the detail page body is an ordered
// array of these rather than free-form Markdown/prose, so a story's
// content is always one of exactly these shapes (a typo'd `type`, a
// missing `src`, an image with no `variant`, all fail the build
// instead of silently rendering wrong). "variant" on image is
// deliberately explicit rather than inferred from position (e.g. "the
// first image is enclosed") — the block itself should say what it is.
const block = z.discriminatedUnion('type', [
  z.object({ type: z.literal('heading'), text: z.string() }),
  z.object({ type: z.literal('paragraph'), text: z.string() }),
  z.object({ type: z.literal('list'), items: z.array(z.string()) }),
  z.object({
    type: z.literal('image'),
    src: z.string(),
    alt: z.string(),
    variant: z.enum(['enclosed', 'full']),
    caption: z.string().optional(),
  }),
  z.object({ type: z.literal('quote'), text: z.string() }),
]);

const work = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/work' }),
  schema: shared.extend({
    // date isn't known precisely for these yet — optional here even
    // though the shared base requires it, rather than inventing dates.
    date: z.coerce.date().optional(),
    // The stories table's own row category ("Energy", "AgTech" — see
    // index.astro's table). Distinct from `tags` below.
    tag: z.string(),
    // Mirrors index.astro's old `active` flag: false renders as a
    // plain, inert, dimmed row with a "Soon" caption and gets no
    // route at all (see draft below) — same UX as before, just driven
    // from here now instead of a hardcoded array.
    active: z.boolean().default(true),
    // Explicit table ordering — collection entries aren't guaranteed
    // to come back in file order.
    order: z.number(),
    // Header attributes on the detail page (see StoryDetail.astro) —
    // all optional since not every story has all of them yet.
    role: z.string().optional(),
    context: z.string().optional(),
    stage: z.string().optional(),
    tags: z.array(z.string()).optional(),
    // Detail-view layout in the story modal: "flow" (default single
    // column) or "spread" (magazine-style columns, scrolled sideways —
    // an experiment; see .story-modal__body--spread in index.astro).
    layout: z.enum(["flow", "spread"]).default("flow"),
    blocks: z.array(block).default([]),
  }),
});

const writing = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/writing' }),
  schema: shared,
});

export const collections = { work, writing };
