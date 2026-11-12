import { useRef, useEffect } from 'react';
import Lenis from 'lenis';

let lenisInstance = null;
let rafId = null;

export function useLenis() {
  const lenisRef = useRef(null);

  useEffect(() => {
    if (lenisInstance) return;
    if (!lenisRef.current) return;

    try {
      lenisInstance = new Lenis({
        wrapper: lenisRef.current,
        content: lenisRef.current,
        lerp: 0.08,
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        smoothTouch: true,
        touchMultiplier: 1.5,
        infinite: false,
      });

      // Lenis funciona con el contenedor principal; permitir scroll nativo del navegador
      lenisRef.current.style.touchAction = 'none';
    } catch (error) {
      console.warn('No se pudo inicializar Lenis:', error.message);
      return;
    }

    function raf(time) {
      if (!lenisInstance) return;
      rafId = requestAnimationFrame(() => {
        lenisInstance.raf(time);
        raf(time);
      });
    }
    raf(0);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (lenisInstance) {
        lenisInstance.destroy();
        lenisInstance = null;
      }
    };
  }, []);

  return { lenisRef, lenis: lenisInstance };
}
