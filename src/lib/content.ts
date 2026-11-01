import { getCollection, type CollectionEntry } from 'astro:content';

const showDrafts = import.meta.env.DEV;

export async function getProjects() {
  const all = await getCollection('projects', (p) => showDrafts || !p.data.draft);
  return all.sort((a, b) => {
    // featured first, then newest (by updated date, falling back to start date)
    if (a.data.featured !== b.data.featured) return a.data.featured ? -1 : 1;
    const ad = (a.data.updated ?? a.data.date).getTime();
    const bd = (b.data.updated ?? b.data.date).getTime();
    return bd - ad;
  });
}

export async function getPosts() {
  const all = await getCollection('blog', (p) => showDrafts || !p.data.draft);
  return all.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export type Tagged = CollectionEntry<'projects'> | CollectionEntry<'blog'>;

export function slugifyTag(tag: string) {
  return tag.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export async function getTagMap() {
  const [projects, posts] = await Promise.all([getProjects(), getPosts()]);
  const map = new Map<string, { tag: string; projects: CollectionEntry<'projects'>[]; posts: CollectionEntry<'blog'>[] }>();
  const add = (tag: string) => {
    const slug = slugifyTag(tag);
    if (!map.has(slug)) map.set(slug, { tag, projects: [], posts: [] });
    return map.get(slug)!;
  };
  for (const p of projects) for (const t of p.data.tags) add(t).projects.push(p);
  for (const p of posts) for (const t of p.data.tags) add(t).posts.push(p);
  return map;
}

export function formatDate(d: Date, opts: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' }) {
  return d.toLocaleDateString('en-US', { timeZone: 'UTC', ...opts });
}
