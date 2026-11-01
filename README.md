# aidenuppal.com

Personal portfolio and blog. Built with [Astro](https://astro.build), styled with Tailwind, searched with Pagefind, deployed to GitHub Pages on every push to `main`.

## Everyday use

```bash
npm run dev       # local preview at http://localhost:4321, live reloads
npm run build     # production build into dist/ (also builds the search index)
npm run preview   # serve dist/ locally to check the build
```

### Add a blog post

1. Copy `src/content/blog/_TEMPLATE.md` to `src/content/blog/my-post.md`. The filename becomes the URL: `/blog/my-post/`.
2. Fill in the frontmatter (the block between the `---` lines). `title`, `summary` and `date` are required.
3. Write the post in Markdown below it.
4. Commit and push. The site rebuilds and deploys in about two minutes.

If the post has images, make a folder instead: `src/content/blog/my-post/index.md` with the images beside it, referenced as `![alt](./photo.jpg)`.

### Add a project

1. Copy `src/content/projects/_TEMPLATE.md` to `src/content/projects/my-project/index.md`. The folder name becomes the URL.
2. Put a cover image in the same folder and set `cover: ./cover.jpg`. Landscape, roughly 16:10, at least 1200px wide looks best.
3. Set `featured: true` to show it on the home page.

To link a blog post to a project, add `project: my-project` to the post's frontmatter. It then shows up under "Posts about this project".

### Drafts

Set `draft: true` on any post or project to keep it out of the published site. Drafts still show in `npm run dev`.

### Files that start with `_`

Ignored by the build. That is how the `_TEMPLATE.md` files stay unpublished.

## Things to fill in

Search the repo for `TODO`. The main ones:

- `src/config.ts`: tagline, description, email and social links.
- `src/content/projects/open-duck-mini/`: the real writeup and a cover photo.
- `src/content/projects/example-project/`: delete once you have a second real project.
- `src/content/blog/*.md`: the two placeholder posts.
- `public/favicon.svg`: the default Astro icon.
- `src/styles/global.css`: the `--color-accent` value if you want a different accent colour.

## How it is put together

```
src/
  config.ts            site title, tagline, social links
  content.config.ts    the frontmatter schema for projects and posts (build fails on typos)
  content/
    projects/<slug>/   one folder per project, index.md plus images
    blog/              one .md (or folder) per post
  layouts/Base.astro   <head>, header, footer, theme script
  components/          cards, tags, badges, header, footer
  pages/               one file per route
  lib/content.ts       sorting, tag grouping, date formatting
  styles/global.css    Tailwind setup, accent colour, Pagefind theme
public/                copied as-is (favicon, CNAME)
.github/workflows/     the deploy pipeline
```

## Deployment

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes `dist/` to GitHub Pages. The custom domain is set in the repository's Pages settings and in `public/CNAME`.
