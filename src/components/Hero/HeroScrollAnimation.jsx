import { useEffect, useRef } from "react";
import { useScrollFrameSequence } from "../../hooks/useScrollFrameSequence";

const FRAME_COUNT = 300;

/**
 * HeroScrollAnimation
 *
 * A pinned, scroll-scrubbed image-sequence hero styled to match
 * the Electric Cyan Wireframe / Industrial CAD design language.
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
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden bg-[#070b14]">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 block h-full w-full [filter:contrast(1.05)_saturate(1.05)]"
        />
        <div className="hero-veil pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#070b14]" />

        {/* Loading Indicator */}
        {!ready && (
          <div className="relative z-[6] font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-ping" />
            LOADING&nbsp;<span className="text-[#00f0ff] font-bold">{loadPct}%</span>
          </div>
        )}

        {/* Hero Content Overlay */}
        <div
          className="relative z-[5] max-w-[800px] px-6 text-center transition-[opacity,transform] duration-[250ms] ease-linear"
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
          {/* Wireframe Tag Line
          <div className="inline-flex items-center gap-2 mb-4 px-3.5 py-1 rounded-full border border-[#00f0ff]/30 bg-[#00f0ff]/10 backdrop-blur-md">
          </div> */}

          {/* Headline with Electric Cyan Gradient */}
          <h1 className="mb-5 text-[clamp(34px,6vw,68px)] font-extrabold leading-[1.04] tracking-tight bg-gradient-to-r from-white via-[#00f0ff] to-[#38bdf8] bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(0,240,255,0.4)]">
            TIMS Experience Hub
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mb-8 max-w-[720px] text-lg md:text-2xl leading-[1.55] text-zinc-300 font-sans drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
            Empowering Digital Transformation through AI-Driven Visualization,
            Immersive Technologies, and Digital Innovation.
          </p>

          {/* Wireframe Crosshair Accents */}
          <span className="absolute -top-6 -left-6 text-[#00f0ff] text-xs font-mono select-none drop-shadow-[0_0_6px_#00f0ff] hidden md:block">+</span>
          <span className="absolute -top-6 -right-6 text-[#00f0ff] text-xs font-mono select-none drop-shadow-[0_0_6px_#00f0ff] hidden md:block">+</span>
        </div>
      </div>
    </section>
  );
}