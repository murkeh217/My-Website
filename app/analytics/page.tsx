import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Private analytics — MK',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

export default function AnalyticsPage() {
  return <main className="analytics-page"><section className="analytics-launcher">
    <a href="/" className="analytics-mark">MK<span> / ANALYTICS</span></a>
    <p className="analytics-eyebrow">UMAMI CLOUD · FREE PLAN <i /></p>
    <h1>Your visitor <em>insights.</em></h1>
    <p className="analytics-launch-copy">Umami hosts your private analytics dashboard. Sign in there to review traffic, referrers, devices, locations, and available visitor-session reports.</p>
    <a className="analytics-submit analytics-launch-button" href="https://cloud.umami.is" target="_blank" rel="noreferrer">Open Umami dashboard <span>↗</span></a>
    <p className="analytics-launch-note">No API key, paid plan, or second dashboard login is needed for Umami’s own hosted dashboard. Add your website ID to <code>.env.local</code> to enable tracking on this site.</p>
    <a href="/" className="analytics-back">← Back to site</a>
  </section></main>;
}
