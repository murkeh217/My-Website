import ArchiveExplorer from '@/src/components/ArchiveExplorer';

export const dynamic = 'force-dynamic';

type ArchivePageProps = { searchParams: Promise<{ page?: string; collection?: string }> };

export const metadata = {
  title: 'Game Development Projects & Personal Archive',
  description: 'Browse Murtaza Kanorwala’s archive alongside his Unity game development portfolio, experiments, creative projects, interests, and works in progress.',
  alternates: { canonical: '/library' },
};

export default async function LibraryPage({ searchParams }: ArchivePageProps) {
  const query = await searchParams;
  return <>
    <header className="library-topbar"><a className="wordmark" href="/index.html"><span className="mark">MK</span><span>MURTAZA KANORWALA <span className="wordmark-muted">/ ARCHIVE</span></span></a><a className="back-home" href="/index.html">← BACK TO PORTFOLIO</a></header>
    <main><ArchiveExplorer initialPage={query.page} initialCollection={query.collection} /></main>
  </>;
}
