import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function useReveal(scope, dependency = '') {
  useLayoutEffect(() => {
    // matchMedia membatalkan animasi saat preferensi gerakan berubah.
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const elements = gsap.utils.toArray('[data-reveal]', scope.current);
      ScrollTrigger.batch(elements, {
        start: 'top 94%',
        once: true,
        onEnter: (batch) => gsap.fromTo(batch, { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, stagger: 0.055, duration: 0.75,
          ease: 'power3.out', clearProps: 'all', overwrite: 'auto',
        }),
      });
    }, scope);
    return () => media.revert();
  }, [scope, dependency]);
}
