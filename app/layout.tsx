import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

export const metadata: Metadata = {
  title: 'MK — Unity Developer & Maker',
  description: 'Murtaza (MK) Kanorwala — Unity developer, curious maker and personal archivist.',
  applicationName: 'MK Portfolio',
  openGraph: {
    type: 'website',
    title: 'MK — Unity Developer & Maker',
    description: 'Interactive games, creative work, and a personal archive.',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><head>
    <meta name="theme-color" content="#10120f" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    <link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  </head><body><div className="grain" aria-hidden="true" />{children}
    {process.env.UMAMI_WEBSITE_ID ? <Script strategy="afterInteractive" src={process.env.UMAMI_TRACKER_URL ?? 'https://cloud.umami.is/script.js'} data-website-id={process.env.UMAMI_WEBSITE_ID} data-do-not-track="true" data-exclude-search="true" /> : null}
  </body></html>;
}
