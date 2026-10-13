'use client';

import { useEffect, useMemo, useState } from 'react';
import { archiveCollections, archivePageCount } from '../data/archive';
import { useLanguage } from './LanguageProvider';

type ArchivePage = (typeof archiveCollections)[number]['pages'][number] & { collection: string; collectionId: string };
const allPages: ArchivePage[] = archiveCollections.flatMap((collection) => collection.pages.map((page) => ({ ...page, collection: collection.label, collectionId: collection.id })));
const pageUrl = (page: ArchivePage) => `/${page.path.split('/').map(encodeURIComponent).join('/')}`;

type ArchiveExplorerProps = { initialPage?: string; initialCollection?: string };
const initialPathFor = (path?: string, collectionId?: string) => allPages.some((page) => page.path === path)
  ? path!
  : collectionId === 'diary' ? ''
  : archiveCollections.find((collection) => collection.id === collectionId)?.pages[0]?.path ?? '';

export default function ArchiveExplorer({ initialPage, initialCollection }: ArchiveExplorerProps) {
  const { locale } = useLanguage();
  const hi = locale === 'hi';
  const zh = locale === 'zh-CN';
  const titleInLocale = (title: string) => zh ? ({ Collection: '收藏', Identity: '身份', Languages: '语言', Personality: '个性', Philosophy: '哲学', Travel: '旅行', 'Travel · alternate gallery': '旅行 · 备用相册' }[title] ?? title) : hi ? ({ Collection: 'संग्रह', Identity: 'पहचान', Languages: 'भाषाएँ', Personality: 'व्यक्तित्व', Philosophy: 'दर्शन', Travel: 'यात्रा', 'Travel · alternate gallery': 'यात्रा · वैकल्पिक गैलरी' }[title] ?? title) : title;
  const collectionInLocale = (label: string) => zh ? ({ 'PERSONAL HOME': '个人主页', DIARY: '日记', HOBBIES: '爱好', JOURNAL: '随笔' }[label] ?? label) : hi ? ({ 'PERSONAL HOME': 'निजी होम', DIARY: 'डायरी', HOBBIES: 'शौक', JOURNAL: 'जर्नल' }[label] ?? label) : label;
  const [search, setSearch] = useState('');
  const [selectedPath, setSelectedPath] = useState(() => initialPathFor(initialPage, initialCollection));
  const [activeCollection, setActiveCollection] = useState(initialCollection ?? '');
  const selected = allPages.find((page) => page.path === selectedPath);
  const visibleCollections = useMemo(() => archiveCollections.map((collection) => ({
    ...collection,
    pages: collection.pages.filter((page) => `${page.title} ${page.path}`.toLowerCase().includes(search.trim().toLowerCase())),
  })).filter((collection) => collection.pages.length > 0), [search]);

  function choosePage(path: string) {
    setSelectedPath(path);
    setActiveCollection('');
    window.history.pushState({ path }, '', `?page=${encodeURIComponent(path)}`);
  }

  useEffect(() => {
    const restore = () => {
      const query = new URLSearchParams(window.location.search);
      const path = query.get('page');
      const collectionId = query.get('collection');
      setSelectedPath(initialPathFor(path ?? undefined, collectionId ?? undefined));
      setActiveCollection(collectionId ?? '');
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
    <aside className="library-sidebar" aria-label={zh ? '档案导航' : hi ? 'संग्रह नेविगेशन' : 'Archive navigation'}>
      <div className="sidebar-heading"><p className="eyebrow">{zh ? '个人收藏' : hi ? 'व्यक्तिगत संग्रह' : 'PERSONAL COLLECTIONS'}</p><h1>{zh ? <>我的<br /><em>点滴。</em></> : hi ? <>मेरी सारी<br /><em>रचनाएँ।</em></> : <>All the things<br /><em>I make.</em></>}</h1><p className="sidebar-intro">{zh ? '个人页面、实验、兴趣与进行中的项目。' : hi ? 'निजी पन्ने, प्रयोग, रुचियाँ और जारी प्रोजेक्ट।' : 'Personal pages, experiments, interests and works in progress.'}</p></div>
      <label className="search-label" htmlFor="page-search">{zh ? '查找页面' : hi ? 'पन्ना खोजें' : 'FIND A PAGE'}</label>
      <div className="search-wrap"><span aria-hidden="true">⌕</span><input id="page-search" type="search" placeholder={zh ? '搜索档案' : hi ? 'संग्रह में खोजें' : 'Search the archive'} autoComplete="off" value={search} onChange={(event) => setSearch(event.target.value)} /><kbd>/</kbd></div>
      <nav className="collection-nav" aria-label={zh ? '收藏分类' : hi ? 'संग्रह' : 'Collections'}>
        {visibleCollections.map((collection) => <details className="collection-group" key={collection.id} open>
          <summary className="group-title"><span>{collectionInLocale(collection.label)}</span><span className="group-count">{String(collection.pages.length).padStart(2, '0')}</span></summary>
          <div className="group-items">{collection.pages.map((page) => <a className="page-link" key={page.path} href={`?page=${encodeURIComponent(page.path)}`} aria-current={selectedPath === page.path ? 'page' : undefined} onClick={(event) => { event.preventDefault(); choosePage(page.path); }}><span>{titleInLocale(page.title)}</span><span className="page-arrow" aria-hidden="true">↗</span></a>)}</div>
        </details>)}
        {visibleCollections.length === 0 && <p className="no-results">{zh ? '没有找到匹配页面，请尝试其他名称或分类。' : hi ? 'कोई पन्ना नहीं मिला। दूसरा शीर्षक या संग्रह आज़माएँ।' : 'No pages match that search. Try another title or collection.'}</p>}
      </nav>
      <div className="sidebar-footer"><span>{archivePageCount} {zh ? '个原始页面' : hi ? 'मूल पन्ने' : 'ORIGINAL PAGES'}</span><span>{zh ? <>记录。整理。<br />提炼。表达。</> : hi ? <>संग्रहित। व्यवस्थित।<br />सारांशित। व्यक्त।</> : <>CAPTURING. ORGANIZING.<br />DISTILLING. EXPRESSING.</>}</span></div>
    </aside>
    <section className="library-content" aria-label="Selected archive page">
      <div className="content-bar"><div><p className="eyebrow">{selected ? collectionInLocale(selected.collection) : activeCollection === 'diary' ? (zh ? '日记档案' : hi ? 'डायरी संग्रह' : 'DIARY ARCHIVE') : (zh ? '全部收藏' : hi ? 'पूरा संग्रह' : 'THE COMPLETE COLLECTION')}</p><h2>{selected ? titleInLocale(selected.title) : activeCollection === 'diary' ? (zh ? '日记' : hi ? 'डायरी' : 'Diary') : (zh ? '选择页面开始浏览' : hi ? 'देखने के लिए पन्ना चुनें' : 'Choose a page to explore')}</h2></div>{selected && <a className="open-page" href={pageUrl(selected)} target="_blank" rel="noreferrer">{zh ? '打开原始页面 ↗' : hi ? 'मूल पन्ना खोलें ↗' : 'OPEN ORIGINAL ↗'}</a>}</div>
      <div className="content-frame">
        {selected ? <iframe
          key={selectedPath}
          className="page-frame"
          title={titleInLocale(selected.title)}
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
        /> : <div className="library-welcome"><span className="welcome-index">{activeCollection === 'diary' ? 'DIARY / 01' : 'FIELD NOTES / 01'}</span><div><p className="eyebrow">{activeCollection === 'diary' ? (zh ? '个人日记档案' : hi ? 'व्यक्तिगत डायरी संग्रह' : 'PERSONAL DIARY ARCHIVE') : (zh ? '个人创意档案' : hi ? 'निजी और रचनात्मक संग्रह' : 'A PERSONAL + CREATIVE ARCHIVE')}</p><h3>{activeCollection === 'diary' ? (zh ? <>日记<br /><em>与片段。</em></> : hi ? <>डायरी<br /><em>और यादें।</em></> : <>Diary<br /><em>entries.</em></>) : zh ? <>每份兴趣<br /><em>都有一席之地。</em></> : hi ? <>हर रुचि की<br /><em>एक जगह।</em></> : <>Every interest<br />has a <em>place.</em></>}</h3><p>{activeCollection === 'diary' ? (zh ? '从左侧列表选择一篇日记，开始阅读。' : hi ? 'पढ़ने के लिए बाईं ओर की सूची से डायरी प्रविष्टि चुनें।' : 'Choose a diary entry from the list on the left to read it.') : zh ? '个人页面、实验、兴趣与进行中的项目。选择一个分类开始浏览。' : hi ? 'निजी पन्ने, प्रयोग, रुचियाँ और जारी प्रोजेक्ट। इन्हें देखने के लिए कोई संग्रह चुनें।' : 'Personal pages, experiments, interests and works in progress. Choose any page from the collections to explore it here.'}</p><label>{archivePageCount} {zh ? '个页面' : hi ? 'पन्ने' : 'PAGES'} · {archiveCollections.length} {zh ? '个分类' : hi ? 'संग्रह' : 'COLLECTIONS'} · {zh ? '一颗好奇的心' : hi ? 'एक जिज्ञासु मन' : 'ONE CURIOUS MIND'}</label></div></div>}
      </div>
    </section>
  </div>;
}
