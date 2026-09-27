export type ProjectKind = 'game' | 'client' | 'experiment';

export type Project = {
  title: string;
  summary: string;
  label: string;
  kind: ProjectKind;
  image: string;
  alt: string;
  href?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  { title: 'JOJO Fighting Game', summary: '2.5D combat · buffered combos · hit-stop', label: 'UNITY', kind: 'game', image: '/unitydev/images/jojo-fighting.webp', alt: 'JOJO Fighting Game match between Dio and Jotaro', href: 'https://murkeh217.github.io/2.5D-Fighting-Game', featured: true },
  { title: 'Terrain Digger', summary: 'Mesh deformation through math & logic', label: 'C#', kind: 'experiment', image: '/unitydev/images/terraindigger.png', alt: 'Terrain Digger project', href: 'https://gist.github.com/murkeh217/053b21cab9e8731c7e20f1d160571e29' },
  { title: 'Killer Wave', summary: 'Arcade game prototype', label: 'PLAY', kind: 'game', image: '/unitydev/images/killerwave.webp', alt: 'Neon arcade scene from Killer Wave', href: 'https://murkeh217.github.io/Killer-Wave' },
  { title: 'Bass Rhythm', summary: 'Music-led timing and feedback', label: 'PLAY', kind: 'game', image: '/unitydev/images/bassrhythm.webp', alt: 'Bass Rhythm gameplay with a musical note and beat bar', href: 'https://murkeh217.github.io/bass_rhythm' },
  { title: 'Fingers Crossed', summary: 'A small game about timing and chance', label: 'PLAY', kind: 'game', image: '/unitydev/images/fingerscrossed.webp', alt: 'Fingers Crossed dialogue scene with a character and choices', href: 'https://murkeh217.github.io/fingers_crossed' },
  { title: 'Hurdle Runner', summary: 'Fast, focused arcade action', label: 'PLAY', kind: 'game', image: '/unitydev/images/hurdlerunner.webp', alt: 'Hurdle Runner course with obstacles and score', href: 'https://murkeh217.github.io/hurdle-race' },
  { title: 'Eye-Care VR App', summary: 'Meta Quest 2 · Netcode · UI Toolkit', label: 'VR', kind: 'client', image: '/unitydev/images/eye.png', alt: 'Eye-care VR app' },
  { title: 'Horror Hotel UI', summary: 'Reservation panel & interface logic', label: 'UI', kind: 'client', image: '/unitydev/images/hotel.png', alt: 'Horror hotel reservation interface' },
  { title: 'TPS Roguelite', summary: 'Procedural room exploration', label: 'WIP', kind: 'experiment', image: '/unitydev/images/tps.png', alt: 'Third-person roguelite prototype' },
];
