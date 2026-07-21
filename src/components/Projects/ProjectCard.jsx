import { useEffect, useRef } from 'react';
import { gsap } from '../../lib/gsapSetup';
import { useInView } from '../../hooks/useInView';

const STICKY_TOP = 90; 

export default function ProjectCard({ project, onPlay, index = 0, total = 1 }) {
  const [cardRef, cardInView] = useInView({ threshold: 0.15 });
  const [mediaRef, mediaInView] = useInView({ threshold: 0.3 });
  const videoRef = useRef(null);
  const stickyRef = useRef(null);
  const innerRef = useRef(null);

  // Entrance animation
  useEffect(() => {
    if (!cardInView) return;
    gsap.fromTo(
      innerRef.current,
      { y: 30 },
      { y: 0, duration: 0.5, ease: 'power3.out' }
    );
  }, [cardInView]);

  // Keep scale fixed so cards cover underneath cleanly
  useEffect(() => {
    if (index === total - 1) return undefined;
    if (typeof window === 'undefined' || window.matchMedia('(max-width: 768px)').matches) {
      return undefined;
    }

    const tween = gsap.to(innerRef.current, {
      scale: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: stickyRef.current,
        start: `top ${STICKY_TOP}px`,
        end: `+=100%`,
        scrub: true,
      },
    });

    return () => tween.scrollTrigger?.kill();
  }, [index, total]);

  // Autoplay preview video if present when in view
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
      className="static md:sticky mb-6 md:mb-[10vh] bg-white rounded-[32px] isolate"
      style={{
        top: `${STICKY_TOP}px`,
        zIndex: index + 10,
      }}
    >
      <div
        ref={innerRef}
        className="relative grid grid-cols-1 md:grid-cols-[1fr_1fr] items-center gap-6 md:gap-8 p-6 md:p-10 rounded-[32px] bg-white border border-slate-200/90 shadow-[0_8px_30px_rgba(0,0,0,0.08)] overflow-hidden min-h-[440px]"
      >
        {/* Left Side: Info */}
        <div className="flex flex-col gap-2.5 w-full">
          <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight m-0 bg-gradient-to-r from-[#f0965f] via-[#a26bf0] to-[#6b3ff0] bg-clip-text text-transparent">
            {project.title}
          </h3>
          <h4 className="text-base md:text-lg font-bold leading-snug m-0 text-slate-900">
            {project.tagline}
          </h4>
          
          <p className="text-xs md:text-sm leading-relaxed text-slate-500 m-0 my-1 w-full">
            {project.description}
          </p>

          {project.ctaLabel && (
            <a
              href={project.ctaLink || '#'}
              className="inline-flex items-center justify-center w-fit mt-2 px-7 py-3 rounded-full text-white font-bold text-xs md:text-sm no-underline shadow-[0_8px_20px_-4px_rgba(107,63,240,0.4)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_25px_-4px_rgba(107,63,240,0.5)]"
              style={{ backgroundImage: project.accent }}
            >
              {project.ctaLabel}
            </a>
          )}
        </div>

        {/* Right Side: Taller Video / Thumbnail Frame */}
        <div
          ref={mediaRef}
          /* 
            - aspect-[16/10.5] makes the height taller than 16/9
            - max-w-[500px] allows it to fill more space vertically & horizontally
          */
          className="group relative cursor-pointer rounded-[22px] p-3 aspect-[16/10.5] w-full max-w-[500px] justify-self-center md:justify-self-end flex items-center justify-center overflow-hidden transition-transform duration-500 hover:scale-[1.015]"
          style={{ backgroundImage: project.accent }}
          onClick={() => onPlay(project)}
          role="button"
          tabIndex={0}
          aria-label={`Play full ${project.title} video`}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onPlay(project)}
        >
          {project.previewVideo ? (
            <video
              ref={videoRef}
              className="w-full h-full object-cover rounded-xl shadow-[0_15px_30px_rgba(0,0,0,0.3)] bg-black"
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
              className="w-full h-full object-contain rounded-xl shadow-[0_15px_30px_rgba(0,0,0,0.3)] bg-slate-900"
            />
          )}

          {/* Hover / Static Play Button Overlay */}
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center bg-white/90 text-slate-900 shadow-xl transition-all duration-300 pl-0.5 group-hover:scale-110 group-hover:bg-white z-10">
            <svg width="18" height="18" viewBox="0 0 22 22" fill="none">
              <path d="M6 4.5V17.5L17 11L6 4.5Z" fill="currentColor" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}