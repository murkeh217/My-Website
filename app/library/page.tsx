import ArchiveExplorer from '@/src/components/ArchiveExplorer';

export const dynamic = 'force-dynamic';

type ArchivePageProps = { searchParams: Promise<{ page?: string; collection?: string }> };

export const metadata = {
  title: 'Archive — MK',
  description: 'Explore Murtaza Kanorwala’s personal pages, collections, interests and works in progress.',
};

export default async function LibraryPage({ searchParams }: ArchivePageProps) {
  const query = await searchParams;
  return <>
    <header className="library-topbar"><a className="wordmark" href="/index.html"><span className="mark">MK</span><span>MURTAZA KANORWALA <span className="wordmark-muted">/ ARCHIVE</span></span></a><a className="back-home" href="/index.html">← BACK TO PORTFOLIO</a></header>
    <main><ArchiveExplorer initialPage={query.page} initialCollection={query.collection} /></main>
  </>;
}
