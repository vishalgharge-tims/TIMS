import { useEffect, useRef, useState, useCallback } from "react";

/**
 * useScrollFrameSequence
 * Preloads a numbered sequence of frame images and exposes scroll-driven
 * playback state for a pinned "scrub through frames on scroll" hero.
 *
 * @param {Object} opts
 * @param {string} opts.path        Folder the frames live in, e.g. "/hero-frames"
 * @param {string} opts.prefix      Filename prefix before the number, e.g. "frame-"
 * @param {number} opts.frameCount  Total number of frames (files are expected 1-indexed)
 * @param {number} opts.padLength   Zero-padding width of the frame number, e.g. 3 -> "001"
 * @param {string} opts.ext         File extension, default "jpg"
 * @param {React.RefObject} opts.rigRef  Ref to the tall scroll "rig" element (100vh * N)
 */
export function useScrollFrameSequence({
  path,
  prefix = "frame-",
  frameCount,
  padLength = 3,
  ext = "jpg",
  rigRef,
}) {
  const imagesRef = useRef([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState(0);
  const [frameIndex, setFrameIndex] = useState(0);
  const reducedMotionRef = useRef(false);

  // --- preload ---
  useEffect(() => {
    reducedMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let cancelled = false;
    const images = new Array(frameCount);
    let count = 0;

    const urlFor = (i) =>
      `${path}/${prefix}${String(i + 1).padStart(padLength, "0")}.${ext}`;

    // Load the first frame with priority so there's something to paint
    // immediately, then load the rest.
    const loadOne = (i) =>
      new Promise((resolve) => {
        const img = new Image();
        img.decoding = "async";
        img.onload = img.onerror = () => {
          if (!cancelled) {
            count += 1;
            setLoadedCount(count);
          }
          resolve();
        };
        img.src = urlFor(i);
        images[i] = img;
      });

    (async () => {
      await loadOne(0);
      if (cancelled) return;
      setReady(true); // enough to start rendering frame 0
      await Promise.all(
        Array.from({ length: frameCount - 1 }, (_, i) => loadOne(i + 1))
      );
    })();

    imagesRef.current = images;
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path, prefix, frameCount, padLength, ext]);

  // --- scroll binding ---
  useEffect(() => {
    if (!ready || reducedMotionRef.current) return;
    const rig = rigRef.current;
    if (!rig) return;

    let ticking = false;

    const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const rect = rig.getBoundingClientRect();
        const scrollable = rig.offsetHeight - window.innerHeight;
        const p = clamp(scrollable > 0 ? -rect.top / scrollable : 0, 0, 1);
        setProgress(p);
        setFrameIndex(Math.round(p * (frameCount - 1)));
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ready, rigRef, frameCount]);

  const getImage = useCallback(
    (i) => imagesRef.current[i],
    // imagesRef is a ref, this is stable, but keep frameCount as a dep
    // in case the array is ever rebuilt.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [frameCount]
  );

  return {
    ready,
    loadedCount,
    frameCount,
    progress,
    frameIndex,
    getImage,
    reducedMotion: reducedMotionRef.current,
  };
}
