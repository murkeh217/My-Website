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

## Vercel Web Analytics

The site uses Vercel's `@vercel/analytics` integration. No environment variables or separate analytics account are needed. After importing the project into Vercel, open the project's **Analytics** section, enable Web Analytics, and redeploy. View aggregate traffic reports in the Vercel dashboard or via `/analytics`. Reports can include page views, referrers, browser/device, and location trends; they do not identify individual people. See the [Vercel Web Analytics quickstart](https://vercel.com/docs/analytics/quickstart).
