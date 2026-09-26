import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Private analytics — MK',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

export default function AnalyticsPage() {
  return <main className="analytics-page"><section className="analytics-launcher">
    <a href="/" className="analytics-mark">MK<span> / ANALYTICS</span></a>
    <p className="analytics-eyebrow">VERCEL WEB ANALYTICS <i /></p>
    <h1>Your visitor <em>insights.</em></h1>
    <p className="analytics-launch-copy">Visitor analytics are available in your Vercel project dashboard. Review page views, referrers, browser and device breakdowns, and geographic trends there.</p>
    <a className="analytics-submit analytics-launch-button" href="https://vercel.com/dashboard" target="_blank" rel="noreferrer">Open Vercel dashboard <span>↗</span></a>
    <p className="analytics-launch-note">In your project, open <code>Analytics</code> and enable Web Analytics. Tracking starts after you redeploy this site. Reports are aggregated and do not identify individual visitors.</p>
    <a href="/" className="analytics-back">← Back to site</a>
  </section></main>;
}
