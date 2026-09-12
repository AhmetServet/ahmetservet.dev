# ahmetservet.dev

A preview of Ahmet Servet Polat's personal site. Astro renders the pages as static HTML. React is used only for the decorative background; writing lives in Markdown or MDX files.

## Local development

Requires Node.js 22+ and pnpm 11.19.0.

```sh
pnpm install
pnpm dev
```

The local preview is at <http://localhost:4321/>. Build with `pnpm build`.

## Coolify

Create a Dockerfile application from this repository and expose container port **80**. Set `PUBLIC_BACKGROUND_EFFECT` as a **build variable / Docker build argument** to `grainient` (default) or `silk`, then redeploy. Astro produces static files, so changing a runtime variable without rebuilding the image will not change the animation.

The image can also be checked locally:

```sh
docker build --build-arg PUBLIC_BACKGROUND_EFFECT=grainient -t ahmetservet-preview .
docker run --rm -p 8080:80 ahmetservet-preview
```

## Content

The homepage has English and Turkish versions. UI copy lives in `src/i18n/en.json` and `src/i18n/tr.json`; Astro handles the `/tr/` locale route. The project and article shown there are labeled previews, ready to be replaced with real content. Article source files are in `src/content/writing/`. Plain articles can be `.md`; interactive articles can be `.mdx`. Images and short videos can live in `public/` and be referenced from an article by URL, such as `/media/example.mp4`.

The résumé is stored in `public/resume.pdf` and is previewed at `/resume/` and `/tr/resume/`; the browser's built-in PDF viewer provides zoom and download controls. The email link opens the visitor's mail app. The old Ghost posts and URL paths are intentionally not migrated.

The animated background components derive from React Bits; see `LICENSE-REACT-BITS.md`.
