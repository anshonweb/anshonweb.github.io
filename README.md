# ansh.

> A minimalist personal site and blog, bundled into one single deployment.

## 🗺️ Routes

- **`/`** — Main portfolio and minimalist Matrix visualizer.
- **`/blog`** — Full directory list of all published posts.
- **`/blog/[slug]`** — Individual dynamic markdown blog post pages.

## ⚡ Setup

Clone the repository and install the standard dependencies:

```bash
npm install
npm run dev
```

## ✍️ Writing a Post

To effortlessly publish a new article, simply drop a standard `.md` Markdown file natively into the `/posts/` directory.

Use this format at the top of the file:

```markdown
---
title: my post title
date: 2026-03-27
---

Your content goes here...
```

The flat filename automatically becomes the exact URL slug on the website. 
*(Example: a file named `my-post.md` intelligently routes directly to `/blog/my-post`)*

## 🎨 Customization

You can seamlessly customize the entire platform:
- **Color Accent** — Modify the `--accent` token globally inside `app/globals.css`.
- **Navigation Links** — Swap out the connection URLs natively in `app/components/navigation.tsx`.
- **Prompt Tag** — Change the `ansh@unreal:~#` footer signature directly across `app/page.tsx`, `app/blog/page.tsx`, and `app/blog/[slug]/page.tsx`.
