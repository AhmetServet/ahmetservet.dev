import { lazy, Suspense, useEffect, useState } from 'react';

const Grainient = lazy(() => import('./Grainient.jsx'));
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
          color={dark ? '#4b4d50' : '#d2d2ce'}
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
    <Suspense fallback={null}>
      <Grainient
        color1={dark ? '#111112' : '#c6c6c4'}
        color2={dark ? '#363638' : '#f0f0ed'}
        color3={dark ? '#252527' : '#dededb'}
        timeSpeed={0.45}
        warpStrength={0.7}
        warpSpeed={1}
        warpAmplitude={22}
        rotationAmount={280}
        grainAmount={0.035}
        grainAnimated={false}
        contrast={1}
        saturation={0}
        lightMode={false}
      />
    </Suspense>
  );
}
