import { defineCollection, reference, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Files or folders whose name starts with "_" are ignored, so _TEMPLATE.md
// files can live beside real content without being published.

const projects = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string().max(200),
      date: z.coerce.date(), // when the project started
      updated: z.coerce.date().optional(),
      status: z.enum(['in-progress', 'done', 'paused']).default('in-progress'),
      tags: z.array(z.string()).default([]),
      cover: image().optional(), // relative path to an image next to the .md file
      coverAlt: z.string().optional(),
      coverPosition: z.string().optional(), // CSS object-position, e.g. 'center 30%' to keep the top of a tall photo
      repo: z.string().url().optional(),
      demo: z.string().url().optional(),
      featured: z.boolean().default(false), // show on the home page
      draft: z.boolean().default(false), // hidden in production builds
    }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string().max(240),
      date: z.coerce.date(),
      updated: z.coerce.date().optional(),
      tags: z.array(z.string()).default([]),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      coverPosition: z.string().optional(),
      project: reference('projects').optional(), // links the post to a project page
      draft: z.boolean().default(false),
    }),
});

export const collections = { projects, blog };
