import ArchiveExplorer from '@/src/components/ArchiveExplorer';
import LanguageSwitcher from '@/src/components/LanguageSwitcher';

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
    <header className="library-topbar"><a className="wordmark" href="/"><span className="mark">MK</span><span>MURTAZA KANORWALA <span className="wordmark-muted">/ ARCHIVE</span></span></a><div className="library-topbar-tools"><a className="back-home" href="/">← BACK TO PORTFOLIO</a><LanguageSwitcher /></div></header>
    <main><ArchiveExplorer initialPage={query.page} initialCollection={query.collection} /></main>
  </>;
}
