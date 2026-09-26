# MK Portfolio

Premium dark portfolio built with **Next.js 16 App Router**, **React 19**, and **TypeScript**. The home page and searchable archive render through the Next.js server; React client components power the interactive project filters and archive navigation. The site expects a Node.js host such as Vercel or another Node.js service.

## Development

```sh
npm install
npm run dev
```

## Quality checks and production server

```sh
npm run check
npm test
npm start
```

The build prepares the selected original personal and Unity pages under `public/`, then creates the Next.js server build. Start it with `npm start`. Legacy page URLs are preserved; archived snapshots, development files, and documentation are excluded.

## Private analytics

The site uses Umami Cloud’s free hosted dashboard. The `/analytics` page links to Umami; it does not require paid API access or expose site statistics publicly. To activate tracking:

1. Create a free Umami Cloud account and add your website.
2. Copy `.env.example` to `.env.local` for local development and paste the website ID from Umami’s tracking code into `UMAMI_WEBSITE_ID`.
3. Set the same `UMAMI_WEBSITE_ID` in your production host’s environment variables. Keep `UMAMI_TRACKER_URL=https://cloud.umami.is/script.js` for Umami Cloud.

Then open `/analytics` or sign in directly at [Umami Cloud](https://cloud.umami.is) to view the reports available on your free plan. Umami’s free Hobby tier is intended for personal and low-traffic sites. Umami sessions use pseudonymous identifiers and can show visit activity, pages, and device details where the report is available; they do not reveal a visitor's name or email. The tracker stays inactive until `UMAMI_WEBSITE_ID` is configured.
