const collections = [
  { id: 'personal', label: 'PERSONAL HOME', pages: [
    ['MK avatar · video & art', 'personal/home/index.html'],
    ['Mental map · routines & goals', 'personal/mental map/index.html'],
    ['Projects', 'personal/projects/index.html'],
  ]},
  { id: 'diary', label: 'DIARY', pages: [
    ['Ghosts', 'personal/journal/ghosts/index.html'],
    ['Identity', 'personal/diary/identity/index.html'],
    ['Internet', 'personal/journal/internet/index.html'],
    ['Languages', 'personal/diary/languages/index.html'],
    ['Muses', 'personal/diary/muses/index.html'],
    ['Personality', 'personal/diary/personality/index.html'],
    ['Philosophy', 'personal/diary/philosophy/index.html'],
    ['Travel', 'personal/diary/travel/index.html'],
    ['Travel · alternate gallery', 'personal/diary/travel/index%202.html'],
    ['TV', 'personal/diary/tv/index.html'],
  ]},
  { id: 'hobbies', label: 'HOBBIES', pages: [
    ['Anime', 'personal/hobbies/anime/index.html'],
    ['Art', 'personal/hobbies/art/index.html'],
    ['Comedy', 'personal/diary/comedy/index.html'],
    ['Dance', 'personal/hobbies/dance/index.html'],
    ['Gym', 'personal/hobbies/gym/index.html'],
    ['Music', 'personal/hobbies/music/index.html'],
    ['Outdoors', 'personal/hobbies/outdoors/index.html'],
    ['Rides', 'personal/hobbies/rides/index.html'],
    ['Climbing', 'personal/hobbies/sports/climbing/index.html'],
    ['Football', 'personal/hobbies/sports/football/index.html'],
    ['Parkour', 'personal/hobbies/sports/parkour/index.html'],
    ['Swimming', 'personal/hobbies/sports/swimming/index.html'],
    ['Video games', 'personal/hobbies/video%20games/index.html'],
  ]},
  { id: 'journal', label: 'JOURNAL', pages: [
    ['Collection', 'personal/journal/collection/index.html'],
    ['Cult', 'personal/journal/cult/index.html'],
    ['Diet', 'personal/journal/diet/index.html'],
    ['Directors', 'personal/journal/directors/index.html'],
    ['Idols', 'personal/journal/idols/index.html'],
    ['Mathematics', 'personal/journal/math/index.html'],
    ['Operating systems', 'personal/journal/os/index.html'],
    ['Powers', 'personal/journal/powers/index.html'],
    ['Trainers', 'personal/journal/trainers/index.html'],
    ['Wishlist', 'personal/journal/wishlist/index.html'],
  ]},
];

const nav = document.querySelector('#collection-nav');
const search = document.querySelector('#page-search');
const frame = document.querySelector('#page-frame');
const loader = document.querySelector('#frame-loader');
const heading = document.querySelector('#page-title');
const category = document.querySelector('#page-category');
const openLink = document.querySelector('#open-page');
const welcome = document.querySelector('#library-welcome');
const allPages = collections.flatMap((collection) => collection.pages.map(([title, path]) => ({
  title, path, collection: collection.label, collectionId: collection.id,
})));
document.querySelector('#page-count').textContent = `${allPages.length} ORIGINAL PAGES`;

collections.forEach((collection) => {
  const section = document.createElement('section');
  section.className = 'collection-group';
  section.dataset.collection = collection.id;
  const title = document.createElement('button');
  title.className = 'group-title';
  title.type = 'button';
  title.setAttribute('aria-expanded', 'true');
  title.innerHTML = `<span>${collection.label}</span><span class="group-count">${String(collection.pages.length).padStart(2, '0')}</span><span class="chevron">⌄</span>`;
  const items = document.createElement('div');
  items.className = 'group-items';
  collection.pages.forEach(([pageTitle, path]) => {
    const link = document.createElement('a');
    link.className = 'page-link';
    link.href = `?page=${encodeURIComponent(path)}`;
    link.dataset.path = path;
    link.dataset.title = pageTitle.toLowerCase();
    link.innerHTML = `<span>${pageTitle}</span><span class="page-arrow">↗</span>`;
    link.addEventListener('click', (event) => {
      event.preventDefault();
      selectPage(path, true);
    });
    items.append(link);
  });
  title.addEventListener('click', () => {
    const collapsed = section.classList.toggle('is-collapsed');
    title.setAttribute('aria-expanded', String(!collapsed));
  });
  section.append(title, items);
  nav.append(section);
});

function selectPage(path, addHistory = false) {
  const page = allPages.find((item) => item.path === path) || allPages[0];
  const url = `./${page.path}`;
  welcome.hidden = true;
  openLink.hidden = false;
  frame.hidden = false;
  if (frame.getAttribute('src') !== url) {
    loader.classList.add('is-active');
    frame.src = url;
  }
  heading.textContent = page.title;
  category.textContent = page.collection;
  openLink.href = url;
  document.querySelectorAll('.page-link').forEach((link) => {
    const active = link.dataset.path === page.path;
    link.toggleAttribute('aria-current', active);
    if (active) link.setAttribute('aria-current', 'page');
  });
  if (addHistory) history.pushState({ path: page.path }, '', `?page=${encodeURIComponent(page.path)}`);
}

frame.addEventListener('load', () => {
  loader.classList.remove('is-active');
  try {
    const content = frame.contentWindow;
    content.scrollTo(0, 0);
    setTimeout(() => content.scrollTo(0, 0), 120);
  } catch { /* Cross-origin embeds manage their own scroll. */ }
});
search.addEventListener('input', () => {
  const term = search.value.trim().toLowerCase();
  let total = 0;
  document.querySelectorAll('.collection-group').forEach((group) => {
    const links = [...group.querySelectorAll('.page-link')];
    let visible = 0;
    links.forEach((link) => {
      const match = !term || link.dataset.title.includes(term) || link.dataset.path.toLowerCase().includes(term);
      link.classList.toggle('is-filtered', !match);
      if (match) visible++;
    });
    group.hidden = visible === 0;
    if (term) group.classList.remove('is-collapsed');
    total += visible;
  });
  document.querySelector('#no-results')?.remove();
  if (!total) nav.insertAdjacentHTML('beforeend', '<p id="no-results" class="no-results">No pages match that search. Try another title or collection.</p>');
});

document.addEventListener('keydown', (event) => {
  if (event.key === '/' && document.activeElement !== search && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
    event.preventDefault();
    search.focus();
  }
  if (event.key === 'Escape' && document.activeElement === search) {
    search.value = '';
    search.dispatchEvent(new Event('input'));
    search.blur();
  }
});

window.addEventListener('popstate', () => {
  const path = new URLSearchParams(location.search).get('page');
  selectPage(path || allPages[0].path);
});

const initialPath = new URLSearchParams(location.search).get('page');
if (initialPath) selectPage(initialPath);
