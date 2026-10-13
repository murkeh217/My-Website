import type { Metadata } from 'next';
import HomePage from '@/src/components/HomePage';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Unity Game Developer & Gameplay Programmer',
  description: 'Explore Murtaza (MK) Kanorwala’s Unity game development portfolio: 2D and 3D games, C# gameplay programming, physics systems, VR projects, and prototypes.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Unity Game Developer & Gameplay Programmer | Murtaza Kanorwala',
    description: 'Explore Murtaza Kanorwala’s Unity game development portfolio, including 2D and 3D games, C# gameplay systems, physics mechanics, VR, and prototypes.',
    url: 'https://murtazakanorwala.vercel.app',
  },
};

export default function Page() {
  return <HomePage />;
}
