// ProjectCard.jsx
import { useEffect, useRef } from 'react';
import { gsap } from '../../lib/gsapSetup';
import { useInView } from '../../hooks/useInView';

const STICKY_TOP = 100;   // base offset from top of viewport (below your nav)
const PEEK = 28;          // how much of each card behind peeks out — tune this

export default function ProjectCard({ project, onPlay, index = 0, total = 1 }) {
  const [cardRef, cardInView] = useInView({ threshold: 0.15 });
  const [mediaRef, mediaInView] = useInView({ threshold: 0.3 });
  const videoRef = useRef(null);
  const stickyRef = useRef(null);
  const innerRef = useRef(null);

  const isLast = index === total - 1;
  const topOffset = STICKY_TOP + index * PEEK;

  // Entrance animation only — no scroll-scrub scale/dim needed.
  // The peek-stack effect comes purely from the staggered `top` offset below.
  useEffect(() => {
    if (!cardInView) return;
    gsap.fromTo(
      innerRef.current,
      { y: 30 },
      { y: 0, duration: 0.5, ease: 'power3.out' }
    );
  }, [cardInView]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !project.previewVideo) return;
    if (mediaInView) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [mediaInView, project.previewVideo]);

  return (
    <div
      ref={(node) => {
        stickyRef.current = node;
        cardRef.current = node;
      }}
      className={`static ${isLast ? 'md:static' : 'md:sticky'} mb-6 md:mb-[14vh] bg-[#09090b] rounded-[28px] isolate`}
      style={{
        top: `${topOffset}px`,
        zIndex: index + 10, // later cards render ON TOP, covering earlier ones except the peek
      }}
    >
      <div
        ref={innerRef}
        className="relative grid grid-cols-1 md:grid-cols-[1fr_1fr] items-center gap-6 md:gap-8 p-6 md:p-10 rounded-[28px] bg-[#0d0d11] border border-[#00f0ff]/30 shadow-[0_10px_40px_rgba(0,240,255,0.08)] overflow-hidden min-h-[440px]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0, 240, 255, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 240, 255, 0.04) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      >
        <span className="absolute top-3 left-3 text-[#00f0ff] text-[10px] font-mono select-none drop-shadow-[0_0_6px_rgba(0,240,255,0.8)]">+</span>
        <span className="absolute top-3 right-3 text-[#00f0ff] text-[10px] font-mono select-none drop-shadow-[0_0_6px_rgba(0,240,255,0.8)]">+</span>
        <span className="absolute bottom-3 left-3 text-[#00f0ff] text-[10px] font-mono select-none drop-shadow-[0_0_6px_rgba(0,240,255,0.8)]">+</span>
        <span className="absolute bottom-3 right-3 text-[#00f0ff] text-[10px] font-mono select-none drop-shadow-[0_0_6px_rgba(0,240,255,0.8)]">+</span>

        <div className="flex flex-col gap-2.5 w-full z-10">
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#f59e0b] drop-shadow-[0_0_8px_rgba(245,158,11,0.4)]">
            {/* PROJECT 0{index + 1} */}
          </span>

          <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight m-0 bg-gradient-to-r from-white via-[#00f0ff] to-[#38bdf8] bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(0,240,255,0.3)]">
            {project.title}
          </h3>
          <h4 className="text-base md:text-lg font-bold leading-snug m-0 text-zinc-200">
            {project.tagline}
          </h4>

          <p className="text-xs md:text-sm leading-relaxed text-zinc-400 m-0 my-1 w-full font-sans">
            {project.description}
          </p>

          {project.ctaLabel ? (
            <a
              href={project.ctaLink || '#'}
              className="inline-flex items-center justify-center w-fit mt-3 px-7 py-3 rounded-full text-slate-950 font-extrabold text-xs md:text-sm no-underline bg-[#00f0ff] shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all duration-300 hover:bg-white hover:shadow-[0_0_30px_rgba(0,240,255,0.7)] hover:-translate-y-0.5"
            >
              {project.ctaLabel}
            </a>
          ) : null}
        </div>

        <div
          ref={mediaRef}
          className="group relative cursor-pointer rounded-[20px] p-2 aspect-[16/10.5] w-full max-w-[500px] justify-self-center md:justify-self-end flex items-center justify-center overflow-hidden transition-transform duration-500 hover:scale-[1.015] bg-[#121218] border border-[#00f0ff]/40 shadow-[0_0_25px_rgba(0,240,255,0.18)]"
          onClick={() => onPlay(project)}
          role="button"
          tabIndex={0}
          aria-label={`Play full ${project.title} video`}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onPlay(project)}
        >
          {project.previewVideo ? (
            <video
              ref={videoRef}
              className="w-full h-full object-cover rounded-xl bg-black"
              src={project.previewVideo}
              poster={project.poster}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            />
          ) : (
            <img
              src={project.poster}
              alt={project.title}
              className="w-full h-full object-contain rounded-xl bg-[#09090b]"
            />
          )}

          <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-[#00f0ff] pointer-events-none drop-shadow-[0_0_4px_#00f0ff]" />
          <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-[#00f0ff] pointer-events-none drop-shadow-[0_0_4px_#00f0ff]" />
          <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-[#00f0ff] pointer-events-none drop-shadow-[0_0_4px_#00f0ff]" />
          <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-[#00f0ff] pointer-events-none drop-shadow-[0_0_4px_#00f0ff]" />

          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center bg-[#00f0ff] text-slate-950 shadow-[0_0_20px_rgba(0,240,255,0.8)] transition-all duration-300 pl-0.5 group-hover:scale-110 group-hover:bg-white z-10">
            <svg width="18" height="18" viewBox="0 0 22 22" fill="none">
              <path d="M6 4.5V17.5L17 11L6 4.5Z" fill="currentColor" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}