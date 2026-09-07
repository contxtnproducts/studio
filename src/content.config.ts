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
    // enclosed = sits in the column flow; full = its own full-width
    // section at content width; bleed = its own section, pushed past
    // the content edges. In the spread layout full/bleed each become a
    // standalone section (which also ends the two-column run before
    // them); outside it, full and bleed look the same.
    variant: z.enum(['enclosed', 'full', 'bleed']),
    caption: z.string().optional(),
    // Enclosed-only: render wider than the text measure (e.g. 130 for
    // 130%) while staying inline in the flow, centered so it overhangs
    // evenly on both sides. Unset/100 = flush with the measure like
    // any other enclosed image. Capped at 180 — the margin-note gutter
    // it overhangs into is 235px wide at the 477px measure, so much
    // beyond that risks clipping/overlapping a note. Ignored on
    // full/bleed, which already break out into their own section.
    width: z.number().min(100).max(180).optional(),
  }),
  // A margin note beside the body column. `side` picks the gutter
  // (Figma "Desktop - 44" has notes in both the left and right
  // margins); left-side notes are set flush-right against the column.
  z.object({
    type: z.literal('quote'),
    text: z.string(),
    side: z.enum(['left', 'right']).default('right'),
  }),
  // Manual section break for the spread layout — ends the current
  // two-column section and starts a fresh one below it. A no-op in the
  // single-column layouts.
  z.object({ type: z.literal('break') }),
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
    // column) or "spread" (magazine-style stack of two-column sections
    // — an experiment; see .story-modal__body--spread in index.astro).
    layout: z.enum(["flow", "spread"]).default("flow"),
    blocks: z.array(block).default([]),
  }),
});

const writing = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/writing' }),
  schema: shared,
});

// Captions for the "visual archive" gallery (see mockupsGallery() in
// index.astro). The filename itself still controls layout (order/size
// /mat — see that function's own comment); this only maps a filename
// to its caption text, kept separate because a caption can run to a
// full sentence, which doesn't fit safely in a filename the way a
// short title does. A typo'd `file` here just means that image falls
// back to its filename-derived title — see mockupsGallery() — rather
// than failing the build, since (unlike `work`) there's no way to
// cross-check a caption's `file` against the actual images on disk
// from inside a Zod schema.
const mockups = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/mockups' }),
  schema: z.object({
    captions: z.array(
      z.object({
        file: z.string(),
        caption: z.string(),
      })
    ).default([]),
  }),
});

export const collections = { work, writing, mockups };
