export type ArchiveCollection = {
  id: string;
  label: string;
  pages: { title: string; path: string }[];
};

export const archiveCollections: ArchiveCollection[] = [
  { id: 'personal', label: 'PERSONAL HOME', pages: [
    { title: 'MK avatar · video & art', path: 'personal/home/index.html' },
    { title: 'Mental map · routines & goals', path: 'personal/mental map/index.html' },
    { title: 'Projects', path: 'personal/projects/index.html' },
  ] },
  { id: 'diary', label: 'DIARY', pages: [
    { title: 'Comedy', path: 'personal/diary/comedy/index.html' },
    { title: 'Identity', path: 'personal/diary/identity/index.html' },
    { title: 'Languages', path: 'personal/diary/languages/index.html' },
    { title: 'Operating systems', path: 'personal/diary/os/index.html' },
    { title: 'Personality', path: 'personal/diary/personality/index.html' },
    { title: 'Philosophy', path: 'personal/diary/philosophy/index.html' },
    { title: 'Travel', path: 'personal/diary/travel/index.html' },
    { title: 'Travel · alternate gallery', path: 'personal/diary/travel/index 2.html' },
    { title: 'TV', path: 'personal/diary/tv/index.html' },
  ] },
  { id: 'hobbies', label: 'HOBBIES', pages: [
    { title: 'Anime', path: 'personal/hobbies/anime/index.html' },
    { title: 'Art', path: 'personal/hobbies/art/index.html' },
    { title: 'Dance', path: 'personal/hobbies/dance/index.html' },
    { title: 'Gym', path: 'personal/hobbies/gym/index.html' },
    { title: 'Music', path: 'personal/hobbies/music/index.html' },
    { title: 'Outdoors', path: 'personal/hobbies/outdoors/index.html' },
    { title: 'Rides', path: 'personal/hobbies/rides/index.html' },
    { title: 'Climbing', path: 'personal/hobbies/sports/climbing/index.html' },
    { title: 'Football', path: 'personal/hobbies/sports/football/index.html' },
    { title: 'Parkour', path: 'personal/hobbies/sports/parkour/index.html' },
    { title: 'Swimming', path: 'personal/hobbies/sports/swimming/index.html' },
    { title: 'Video games', path: 'personal/hobbies/video games/index.html' },
  ] },
  { id: 'journal', label: 'JOURNAL', pages: [
    { title: 'Collection', path: 'personal/journal/collection/index.html' },
    { title: 'Cult', path: 'personal/journal/cult/index.html' },
    { title: 'Diet', path: 'personal/journal/diet/index.html' },
    { title: 'Directors', path: 'personal/journal/directors/index.html' },
    { title: 'Ghosts', path: 'personal/journal/ghosts/index.html' },
    { title: 'Girls', path: 'personal/journal/girls/index.html' },
    { title: 'Internet', path: 'personal/journal/internet/index.html' },
    { title: 'Mathematics', path: 'personal/journal/math/index.html' },
    { title: 'Powers', path: 'personal/journal/powers/index.html' },
    { title: 'Trainers', path: 'personal/journal/trainers/index.html' },
    { title: 'Wishlist', path: 'personal/journal/wishlist/index.html' },
  ] },
];

export const archivePageCount = archiveCollections.reduce((count, collection) => count + collection.pages.length, 0);
