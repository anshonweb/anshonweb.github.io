# www

personal site + blog — one repo, one deployment.

## routes

- `/` — portfolio
- `/blog` — post list
- `/blog/[slug]` — individual post

## setup

```bash
npm install
npm run dev
```

## writing a post

drop a `.md` file in `/posts/`:

```markdown
---
title: my post title
date: 2026-03-27
---

content here...
```

filename becomes the url slug: `my-post.md` → `/blog/my-post`

## ascii art

```bash
pip install Pillow
python scripts/ascii_convert.py --input yourimage.png --width 120 --output out.txt
```

## deploying to vercel

1. push repo to github
2. import to vercel — no config needed
3. deploy

## customise

- **color** — `--accent` in `app/globals.css`
- **links** — `links` array in `app/page.tsx`
- **name/prompt** — footer in `app/page.tsx`, `app/blog/page.tsx`, `app/blog/[slug]/page.tsx`
- **image** — replace `public/photo.avif`, update `src` in `app/page.tsx`
