# Ahmed Metawea — Portfolio

Personal portfolio of **Ahmed Metawea**, AI & Data Science Engineer (Cairo, Egypt).

Built with **React + TypeScript + Vite**, **Tailwind CSS v4** and **Framer Motion**. Deployed on **Vercel**.

## Edit the content

Everything on the site (bio, projects, skills, certifications, links) lives in one file:

```
src/data/portfolio.ts
```

Change the text there, commit, and push — Vercel redeploys automatically.

| What | Where |
| --- | --- |
| Profile photo | `public/ahmed.jpg` (square, at least 800×800). A monogram shows until it exists. |
| Resume / CV | `public/Ahmed_Metawea_CV_2026.pdf` |
| Social preview image | `public/og-image.png` (1200×630) |
| Favicon | `public/favicon.svg` |

## Contact form

Messages are delivered by email with no backend:

- **Default:** [FormSubmit](https://formsubmit.co). The first message sent from the live site triggers a one-time
  *activation* email to `ahmed.metawea001@gmail.com` — click **Activate Form** once and every later message arrives.
- **Optional:** [Web3Forms](https://web3forms.com) — get a free access key and add it in Vercel →
  Project → Settings → Environment Variables as `VITE_WEB3FORMS_KEY`, then redeploy.

If delivery ever fails, the form shows the email address so visitors can still reach you.

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

## Deploy

1. Push this folder to a GitHub repository.
2. On [vercel.com/new](https://vercel.com/new), import the repository — Vercel detects Vite automatically.
3. Click **Deploy**. Every push to `main` redeploys the site.
