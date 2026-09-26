'use client';

import { useEffect } from 'react';

export default function RevealObserver() {
  useEffect(() => {
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const observer = new IntersectionObserver((entries, currentObserver) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); currentObserver.unobserve(entry.target); }
    }), { threshold: 0.08 });
    document.querySelectorAll('.project-card,.timeline article,.personal-card,.skill-list article').forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);
  return null;
}
