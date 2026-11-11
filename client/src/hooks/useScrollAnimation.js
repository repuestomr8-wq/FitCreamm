import { useRef, useEffect } from 'react';
import { useLenis } from './useLenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Registra una animación de entrada al hacer scroll con GSAP + ScrollTrigger.
 * Soporta prefers-reduced-motion (sin animación si el usuario lo indica).
 */
export function useScrollAnimation(ref, { variant = 'fadeUp', start = 'top 85%', delay = 0 } = {}) {
  const { lenisRef } = useLenis();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respetar prefers-reduced-motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      el.style.opacity = '1';
      el.style.transform = 'none';
      return;
    }

    const variants = {
      fadeUp: { y: 40, opacity: 0 },
      fadeIn: { opacity: 0 },
      scaleUp: { scale: 0.9, opacity: 0 },
      fadeLeft: { x: -40, opacity: 0 },
      fadeRight: { x: 40, opacity: 0 },
    };

    const from = variants[variant] || variants.fadeUp;

    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: 'play none none reverse',
        once: false,
      },
      duration: 0.8,
      delay,
      ease: 'power2.out',
      ...from,
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [ref, variant, start, delay]);
}

/**
 * Animación de entrada inmediata (al montar), usada en Hero.
 */
export function useEntranceAnimation(ref, { duration = 0.9, ease = 'power2.out', stagger = 0 } = {}) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      el.style.opacity = '1';
      el.style.transform = 'none';
      if (el.children) {
        Array.from(el.children).forEach((c) => {
          c.style.opacity = '1';
          c.style.transform = 'none';
        });
      }
      return;
    }

    gsap.from(el, {
      duration,
      ease,
      y: 40,
      opacity: 0,
      stagger,
      clearProps: 'all',
    });
  }, [ref, duration, ease, stagger]);
}
