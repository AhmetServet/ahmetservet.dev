import { lazy, Suspense, useEffect, useState } from 'react';
import Grainient from './Grainient.jsx';

const Silk = lazy(() => import('./Silk.jsx'));

export default function AmbientBackground({ variant = 'grainient' }) {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'light');
  const [reduceMotion, setReduceMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  useEffect(() => {
    const observer = new MutationObserver(() => setTheme(document.documentElement.dataset.theme || 'light'));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onMotionChange = () => setReduceMotion(media.matches);
    media.addEventListener('change', onMotionChange);

    return () => {
      observer.disconnect();
      media.removeEventListener('change', onMotionChange);
    };
  }, []);

  if (reduceMotion) return null;

  const dark = theme === 'dark';

  if (variant === 'silk') {
    return (
      <Suspense fallback={null}>
        <Silk
          color={dark ? '#4b4d50' : '#a6a6a4'}
          speed={1.2}
          scale={1.5}
          noiseIntensity={0.65}
          rotation={0.08}
          lightMode={!dark}
        />
      </Suspense>
    );
  }

  return (
    <Grainient
      color1={dark ? '#111112' : '#a9a9a8'}
      color2={dark ? '#363638' : '#e9e9e7'}
      color3={dark ? '#252527' : '#c9c9c7'}
      timeSpeed={0.7}
      warpStrength={0.7}
      warpSpeed={1}
      warpAmplitude={18}
      rotationAmount={280}
      grainAmount={0.035}
      grainAnimated={false}
      contrast={1}
      saturation={0}
      lightMode={false}
    />
  );
}
