import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://murtazakanorwala.vercel.app'),
  title: {
    default: 'Murtaza Kanorwala | Unity Game Developer',
    template: '%s | Murtaza Kanorwala',
  },
  description: 'Murtaza (MK) Kanorwala is a Unity game developer in India, building interactive 2D and 3D games with C#, gameplay systems, physics mechanics, and mobile optimization.',
  applicationName: 'MK Portfolio',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: 'Murtaza Kanorwala Portfolio',
    title: 'Murtaza Kanorwala | Unity Game Developer',
    description: 'Unity game developer in India, creating interactive 2D and 3D games with C# and gameplay systems.',
    url: 'https://murtazakanorwala.vercel.app',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary',
    title: 'Murtaza Kanorwala | Unity Game Developer',
    description: 'Unity game developer in India, creating interactive 2D and 3D games with C# and gameplay systems.',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><head>
    <meta name="theme-color" content="#10120f" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    <link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  </head><body><div className="grain" aria-hidden="true" />{children}
    <Analytics />
  </body></html>;
}
