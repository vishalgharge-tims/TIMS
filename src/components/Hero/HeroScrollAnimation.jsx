import { useEffect, useRef } from "react";
import { useScrollFrameSequence } from "../../hooks/useScrollFrameSequence";

const FRAME_COUNT = 300;

/**
 * HeroScrollAnimation
 *
 * A pinned, scroll-scrubbed image-sequence hero. As the user scrolls through
 * a tall "rig" section, the canvas steps through the frame sequence; the
 * headline/subhead/CTA copy fades out over the first ~22% of scroll so the
 * render carries the rest of the section on its own.
 *
 * Usage:
 *   1. Place your 300 frames at /public/hero-frames/frame-001.jpg ... frame-300.jpg
 *      (three-digit, zero-padded, 1-indexed — matches the files you provided).
 *   2. Drop <HeroScrollAnimation /> at the top of your page.
 */
export default function HeroScrollAnimation() {
  const rigRef = useRef(null);
  const canvasRef = useRef(null);

  const { ready, loadedCount, progress, frameIndex, getImage, reducedMotion } =
    useScrollFrameSequence({
      path: "/frames",
      prefix: "ezgif-frame-",
      frameCount: FRAME_COUNT,
      padLength: 3,
      ext: "jpg",
      rigRef,
    });

  // --- draw current frame to canvas, cover-fit ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !ready) return;
    const ctx = canvas.getContext("2d");

    const dpr = window.devicePixelRatio || 1;
    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      draw();
    };

    function draw() {
      const idx = reducedMotion ? Math.floor(FRAME_COUNT / 2) : frameIndex;
      const img = getImage(idx);
      if (!img || !img.complete || img.naturalWidth === 0) return;

      const cw = canvas.width;
      const ch = canvas.height;
      const ir = img.naturalWidth / img.naturalHeight;
      const cr = cw / ch;
      let dw, dh, dx, dy;
      if (ir > cr) {
        dh = ch;
        dw = ch * ir;
        dx = (cw - dw) / 2;
        dy = 0;
      } else {
        dw = cw;
        dh = cw / ir;
        dx = 0;
        dy = (ch - dh) / 2;
      }
      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, dx, dy, dw, dh);
    }

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [ready, frameIndex, getImage, reducedMotion]);

  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
  const introOpacity = 1 - clamp(progress / 0.22, 0, 1);
  const introShift = clamp(progress / 0.22, 0, 1) * -14;
  const loadPct = Math.round((loadedCount / FRAME_COUNT) * 100);

  return (
    <section
      ref={rigRef}
      className="relative"
      style={{ height: reducedMotion ? "100vh" : "400vh" }}
    >
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden bg-void">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 block h-full w-full [filter:contrast(1.04)_saturate(1.02)]"
        />
        <div className="hero-veil pointer-events-none absolute inset-0" />

        {!ready && (
          <div className="relative z-[6] font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
            LOADING&nbsp;<span className="text-mint">{loadPct}%</span>
          </div>
        )}

        <div
          className="relative z-[5] max-w-[760px] px-6 text-center transition-[opacity,transform] duration-[250ms] ease-linear"
          style={
            reducedMotion
              ? {}
              : {
                  opacity: introOpacity,
                  transform: `translateY(${introShift}px)`,
                  pointerEvents: introOpacity < 0.05 ? "none" : "auto",
                }
          }
        >
          <h1 className="hero-headline-glow mb-5 text-[clamp(34px,6vw,68px)] font-semibold leading-[1.04] tracking-[-0.02em] text-black">
            TIMS Experience hub
          </h1>
          <p className="hero-sub-glow mx-auto mb-8 max-w-[560px] text-base leading-[1.55] text-orange-500">
            Empowering Digital Transformation through AI-Driven
            Visualization, Immersive Technologies, and Digital Innovation.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3.5">
            <a
              href="#start"
              className="inline-flex items-center gap-2 rounded-sm border border-transparent bg-ink px-6 py-3 font-display text-sm font-semibold tracking-[0.01em] text-[#0a0b0c] transition-colors hover:bg-mint focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint"
            >
              Explore
            </a>
            {/* <a
              href="#demo"
              className="inline-flex items-center gap-2 rounded-sm border border-white/10 px-6 py-3 font-display text-sm font-semibold tracking-[0.01em] text-ink transition-colors hover:border-mint/40 hover:text-mint"
            >
              See it in action
            </a> */}
          </div>
        </div>
      </div>
    </section>
  );
}
