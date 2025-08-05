import { defineCollection, z } from "astro:content"
import { glob } from 'astro/loaders';

const work = defineCollection({
  loader: glob({ pattern: '**\/[^_]*.md', base: "./src/content/work" }),
  schema: z.object({
    company: z.string(),
    role: z.string(),
    dateStart: z.coerce.date(),
    dateEnd: z.union([z.coerce.date(), z.string()]),
  }),
})

const blog = defineCollection({
  loader: glob({ pattern: '**\/[^_]*.md', base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    time: z
      .string()
      .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format (HH:MM)")
      .optional(),
    tags: z.array(z.string()),
    draft: z.boolean().optional(),
  }),
})


const projects = defineCollection({
  loader: glob({ pattern: '**\/[^_]*.md', base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()),
    draft: z.boolean().optional(),
    demoUrl: z.string().optional(),
    repoUrl: z.string().optional(),
    imageUrl: z.string().optional(),
  }),
})



const team = defineCollection({
  loader: glob({ pattern: '**\/[^_]*.md', base: "./src/content/team" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date().optional(),
    tags: z.array(z.string()),
    draft: z.boolean().optional(),
    demoUrl: z.string().optional(),
    repoUrl: z.string().optional(),
    imageUrl: z.string().optional(),
    otherUrls: z.array(z.object({ name: z.string(), url: z.string().url(),})).optional(),
  }),
})


const legal = defineCollection({
  loader: glob({ pattern: '**\/[^_]*.md', base: "./src/content/legal" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
  }),
})

export const collections = { work, blog, projects, legal, team}
