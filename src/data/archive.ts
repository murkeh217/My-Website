export type ArchiveCollection = {
  id: string;
  label: string;
  pages: { title: string; path: string; thumbnail?: string }[];
};

export const archiveCollections: ArchiveCollection[] = [
  { id: 'personal', label: 'PERSONAL HOME', pages: [
    { title: 'MK avatar · video & art', path: 'personal/home/index.html' },
    { title: 'Mental map · routines & goals', path: 'personal/mental map/index.html' },
    { title: 'Projects', path: 'personal/projects/index.html' },
  ] },
  { id: 'diary', label: 'DIARY', pages: [
    { title: 'Collection', path: 'personal/journal/collection/index.html', thumbnail: 'personal/journal/collection/ps2.jpg' },
    { title: 'Identity', path: 'personal/diary/identity/index.html', thumbnail: 'personal/diary/identity/character.png' },
    { title: 'Internet', path: 'personal/journal/internet/index.html', thumbnail: 'personal/journal/internet/epicgames.svg' },
    { title: 'Languages', path: 'personal/diary/languages/index.html', thumbnail: 'personal/diary/languages/hindi.webp' },
    { title: 'Personality', path: 'personal/diary/personality/index.html' },
    { title: 'Philosophy', path: 'personal/diary/philosophy/index.html', thumbnail: 'personal/diary/philosophy/nietze.jpg' },
    { title: 'Travel', path: 'personal/diary/travel/index.html', thumbnail: 'personal/diary/travel/beach1.jpg' },
    { title: 'Travel · alternate gallery', path: 'personal/diary/travel/index 2.html', thumbnail: 'personal/diary/travel/forest1.jpg' },
  ] },
  { id: 'hobbies', label: 'HOBBIES', pages: [
    { title: 'Anime', path: 'personal/hobbies/anime/index.html' },
    { title: 'Art', path: 'personal/hobbies/art/index.html' },
    { title: 'Comedy', path: 'personal/diary/comedy/index.html' },
    { title: 'TV', path: 'personal/diary/tv/index.html' },
    { title: 'Gym', path: 'personal/hobbies/gym/index.html' },
    { title: 'Music', path: 'personal/hobbies/music/index.html' },
    { title: 'Rides', path: 'personal/hobbies/rides/index.html' },
    { title: 'Climbing', path: 'personal/hobbies/sports/climbing/index.html' },
    { title: 'Football', path: 'personal/hobbies/sports/football/index.html' },
    { title: 'Parkour', path: 'personal/hobbies/sports/parkour/index.html' },
    { title: 'Swimming', path: 'personal/hobbies/sports/swimming/index.html' },
    { title: 'Video games', path: 'personal/hobbies/video games/index.html' },
  ] },
  { id: 'journal', label: 'JOURNAL', pages: [
    { title: 'Cult', path: 'personal/journal/cult/index.html' },
    { title: 'Diet', path: 'personal/journal/diet/index.html' },
    { title: 'Directors', path: 'personal/journal/directors/index.html' },
    { title: 'Ghosts', path: 'personal/journal/ghosts/index.html' },
    { title: 'Babes', path: 'personal/journal/preferences/index.html' },
    { title: 'Mathematics', path: 'personal/journal/math/index.html' },
    { title: 'Operating systems', path: 'personal/journal/os/index.html' },
    { title: 'Powers', path: 'personal/journal/powers/index.html' },
    { title: 'Trainers', path: 'personal/journal/trainers/index.html' },
    { title: 'Wishlist', path: 'personal/journal/wishlist/index.html' },
  ] },
];

export const archivePageCount = archiveCollections.reduce((count, collection) => count + collection.pages.length, 0);
