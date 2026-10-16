'use client';

import { useEffect, useRef, useState } from 'react';

type LoadingImageProps = {
  src: string;
  alt: string;
  loading?: 'eager' | 'lazy';
};

export default function LoadingImage({ src, alt, loading = 'lazy' }: LoadingImageProps) {
  const [loaded, setLoaded] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imageRef.current?.complete) setLoaded(true);
  }, [src]);

  return <div className={`loading-image${loaded ? ' is-loaded' : ''}`}>
    {!loaded && <span className="loading-spinner" aria-hidden="true" />}
    <img ref={imageRef} src={src} alt={alt} loading={loading} decoding="async" onLoad={() => setLoaded(true)} onError={() => setLoaded(true)} />
  </div>;
}
