# thomaspoblete.com

Astro, static output, deployed on Vercel.

## Run locally
    npm install
    npm run dev        # http://localhost:4321

## Deploy
    npm i -g vercel
    vercel             # first run: links project, deploys a preview
    vercel --prod      # production

Vercel detects Astro automatically. No config needed.
Add the custom domain in the Vercel dashboard under Settings → Domains.

## Structure
    src/styles/tokens.css   design tokens — mirror of the Figma variables
    src/layouts/Base.astro  document shell, fonts, global type
    src/pages/index.astro   the one page that exists today
    src/content/work/       case studies (empty — nothing published yet)
    src/content/writing/    articles (empty)

Both collections share one schema shape so they can share one
detail template when that gets built. `draft` defaults to true.
