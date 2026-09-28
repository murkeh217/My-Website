'use client';

import { useEffect, useMemo, useState } from 'react';
import { archiveCollections, archivePageCount } from '../data/archive';

type ArchivePage = (typeof archiveCollections)[number]['pages'][number] & { collection: string; collectionId: string };
const allPages: ArchivePage[] = archiveCollections.flatMap((collection) => collection.pages.map((page) => ({ ...page, collection: collection.label, collectionId: collection.id })));
const pageUrl = (page: ArchivePage) => `/${page.path.split('/').map(encodeURIComponent).join('/')}`;

type ArchiveExplorerProps = { initialPage?: string; initialCollection?: string };
const initialPathFor = (path?: string, collectionId?: string) => allPages.some((page) => page.path === path)
  ? path!
  : archiveCollections.find((collection) => collection.id === collectionId)?.pages[0]?.path ?? '';

export default function ArchiveExplorer({ initialPage, initialCollection }: ArchiveExplorerProps) {
  const [search, setSearch] = useState('');
  const [selectedPath, setSelectedPath] = useState(() => initialPathFor(initialPage, initialCollection));
  const selected = allPages.find((page) => page.path === selectedPath);
  const visibleCollections = useMemo(() => archiveCollections.map((collection) => ({
    ...collection,
    pages: collection.pages.filter((page) => `${page.title} ${page.path}`.toLowerCase().includes(search.trim().toLowerCase())),
  })).filter((collection) => collection.pages.length > 0), [search]);

  function choosePage(path: string) {
    setSelectedPath(path);
    window.history.pushState({ path }, '', `?page=${encodeURIComponent(path)}`);
  }

  useEffect(() => {
    const restore = () => {
      const query = new URLSearchParams(window.location.search);
      const path = query.get('page');
      const collectionId = query.get('collection');
      setSelectedPath(initialPathFor(path ?? undefined, collectionId ?? undefined));
    };
    window.addEventListener('popstate', restore);
    return () => window.removeEventListener('popstate', restore);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const active = document.activeElement;
      const editing = active instanceof HTMLElement && (active.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(active.tagName));
      if (event.key === '/' && !editing) { event.preventDefault(); document.querySelector<HTMLInputElement>('#page-search')?.focus(); }
      if (event.key === 'Escape' && active?.id === 'page-search') { setSearch(''); (active as HTMLElement).blur(); }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return <div className="library-layout">
    <aside className="library-sidebar" aria-label="Archive navigation">
      <div className="sidebar-heading"><p className="eyebrow">PERSONAL COLLECTIONS</p><h1>All the things<br /><em>I make.</em></h1><p className="sidebar-intro">Personal pages, experiments, interests and works in progress.</p></div>
      <label className="search-label" htmlFor="page-search">FIND A PAGE</label>
      <div className="search-wrap"><span aria-hidden="true">⌕</span><input id="page-search" type="search" placeholder="Search the archive" autoComplete="off" value={search} onChange={(event) => setSearch(event.target.value)} /><kbd>/</kbd></div>
      <nav className="collection-nav" aria-label="Collections">
        {visibleCollections.map((collection) => <details className="collection-group" key={collection.id} open>
          <summary className="group-title"><span>{collection.label}</span><span className="group-count">{String(collection.pages.length).padStart(2, '0')}</span></summary>
          <div className="group-items">{collection.pages.map((page) => <a className="page-link" key={page.path} href={`?page=${encodeURIComponent(page.path)}`} aria-current={selectedPath === page.path ? 'page' : undefined} onClick={(event) => { event.preventDefault(); choosePage(page.path); }}><span>{page.title}</span><span className="page-arrow" aria-hidden="true">↗</span></a>)}</div>
        </details>)}
        {visibleCollections.length === 0 && <p className="no-results">No pages match that search. Try another title or collection.</p>}
      </nav>
      <div className="sidebar-footer"><span>{archivePageCount} ORIGINAL PAGES</span><span>CAPTURING. ORGANIZING.<br />DISTILLING. EXPRESSING.</span></div>
    </aside>
    <section className="library-content" aria-label="Selected archive page">
      <div className="content-bar"><div><p className="eyebrow">{selected?.collection ?? 'THE COMPLETE COLLECTION'}</p><h2>{selected?.title ?? 'Choose a page to explore'}</h2></div>{selected && <a className="open-page" href={pageUrl(selected)} target="_blank" rel="noreferrer">OPEN ORIGINAL ↗</a>}</div>
      <div className="content-frame">
        {selected ? <iframe
          key={selectedPath}
          className="page-frame"
          title={selected.title}
          src={pageUrl(selected)}
          onLoad={(event) => {
            const frame = event.currentTarget;
            const frameWindow = frame.contentWindow;
            const frameDocument = frame.contentDocument;
            if (frameDocument && !frameDocument.getElementById('archive-hide-scrollbars')) {
              const scrollbarStyle = frameDocument.createElement('style');
              scrollbarStyle.id = 'archive-hide-scrollbars';
              scrollbarStyle.textContent = `html, body, * { scrollbar-width: none !important; } html::-webkit-scrollbar, body::-webkit-scrollbar, *::-webkit-scrollbar { display: none !important; width: 0 !important; height: 0 !important; } @media (max-width: 760px) { img, video, canvas, iframe, table { max-width: 100% !important; } img, video, canvas { height: auto; } body { min-width: 0 !important; } }`;
              frameDocument.head?.appendChild(scrollbarStyle);
            }
            frameWindow?.scrollTo(0, 0);
            if (frameDocument?.scrollingElement) frameDocument.scrollingElement.scrollTop = 0;
            if (frameDocument?.body) frameDocument.body.scrollTop = 0;
            frameDocument?.querySelectorAll<HTMLElement>('*').forEach((element) => {
              if (element.scrollTop > 0) element.scrollTop = 0;
            });
            if (frameDocument && frameWindow) {
              const fitPage = () => {
                const documentHeight = Math.max(
                  frameDocument.documentElement.scrollHeight,
                  frameDocument.body?.scrollHeight ?? 0,
                );
                const availableHeight = Math.max(320, window.innerHeight - frame.getBoundingClientRect().top);
                const nextHeight = Math.max(availableHeight, documentHeight);
                if (Math.abs(frame.getBoundingClientRect().height - nextHeight) > 2) {
                  frame.style.height = `${nextHeight}px`;
                }
              };
              fitPage();
              const resizeObserver = new ResizeObserver(fitPage);
              resizeObserver.observe(frameDocument.documentElement);
              if (frameDocument.body) resizeObserver.observe(frameDocument.body);
              frameWindow.addEventListener('resize', fitPage);
              frameDocument.fonts?.ready.then(fitPage);
            }
          }}
        /> : <div className="library-welcome"><span className="welcome-index">FIELD NOTES / 01</span><div><p className="eyebrow">A PERSONAL + CREATIVE ARCHIVE</p><h3>Every interest<br />has a <em>place.</em></h3><p>Personal pages, experiments, interests and works in progress. Choose any page from the collections to explore it here.</p><label>{archivePageCount} PAGES · {archiveCollections.length} COLLECTIONS · ONE CURIOUS MIND</label></div></div>}
      </div>
    </section>
  </div>;
}
