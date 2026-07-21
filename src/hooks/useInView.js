import { useEffect, useRef, useState } from 'react';

/**
 * Tracks whether an element is in (or near) the viewport.
 * Used to only autoplay preview videos when their card is actually visible,
 * so we're not running 5-10 looping <video> elements simultaneously.
 */
export function useInView({ threshold = 0.35, rootMargin = '0px' } = {}) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return [ref, isInView];
}