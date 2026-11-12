import { useEffect, useState } from 'react';
import Lenis from 'lenis';

export function useLenis() {
  const [lenisInstance, setLenisInstance] = useState(null);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      smoothTouch: false, // Evita conflictos con gestos táctiles en celulares
      touchMultiplier: 2,
    });

    setLenisInstance(lenis);

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return { lenisRef: { current: null }, lenis: lenisInstance };
}