// ============================================================================
// OPTION 1: Native Video Controls + Theme Orange Close Button
// ============================================================================

// import { useEffect, useRef } from 'react';
// import { createPortal } from 'react-dom';
// import { gsap } from '../../lib/gsapSetup';

// export default function VideoModal({ project, onClose }) {
//   const backdropRef = useRef(null);
//   const panelRef = useRef(null);
//   const videoRef = useRef(null);

//   // Open animation + lock scroll
//   useEffect(() => {
//     if (!project) return undefined;

//     document.body.style.overflow = 'hidden';

//     const ctx = gsap.context(() => {
//       gsap.set(panelRef.current, { autoAlpha: 0, scale: 0.94, y: 16 });
//       gsap.set(backdropRef.current, { autoAlpha: 0 });
//       gsap.to(backdropRef.current, { autoAlpha: 1, duration: 0.25, ease: 'power2.out' });
//       gsap.to(panelRef.current, {
//         autoAlpha: 1,
//         scale: 1,
//         y: 0,
//         duration: 0.45,
//         ease: 'power3.out',
//       });
//     });

//     return () => {
//       document.body.style.overflow = '';
//       ctx.revert();
//     };
//   }, [project]);

//   const handleClose = () => {
//     const tl = gsap.timeline({ onComplete: onClose });
//     tl.to(panelRef.current, {
//       autoAlpha: 0,
//       scale: 0.96,
//       y: 10,
//       duration: 0.25,
//       ease: 'power2.in',
//     }).to(backdropRef.current, { autoAlpha: 0, duration: 0.2 }, '<');
//   };

//   // Close on Escape
//   useEffect(() => {
//     if (!project) return undefined;
//     const onKeyDown = (e) => {
//       if (e.key === 'Escape') handleClose();
//     };
//     window.addEventListener('keydown', onKeyDown);
//     return () => window.removeEventListener('keydown', onKeyDown);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [project]);

//   if (!project) return null;

//   return createPortal(
//     <div
//       ref={backdropRef}
//       className="fixed inset-0 z-[999] grid place-items-center bg-[rgba(10,8,20,0.75)] backdrop-blur-md p-6"
//       onMouseDown={(e) => {
//         if (e.target === backdropRef.current) handleClose();
//       }}
//     >
//       <div
//         ref={panelRef}
//         role="dialog"
//         aria-modal="true"
//         aria-label={`${project.title} video`}
//         className="relative w-full max-w-[1100px] aspect-video max-sm:aspect-auto max-sm:h-[70vh] rounded-[20px] overflow-hidden bg-[#0b0b12] shadow-[0_40px_100px_rgba(0,0,0,0.5)]"
//       >
//         {/* Updated Orange Close Button */}
//         <button
//           onClick={handleClose}
//           aria-label="Close video"
//           className="absolute top-3.5 right-3.5 z-[2] w-10 h-10 rounded-full bg-[#f6a56b] text-white flex items-center justify-center cursor-pointer shadow-lg transition-all duration-200 hover:bg-[#f0965f] hover:scale-110 active:scale-95"
//         >
//           <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
//             <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
//           </svg>
//         </button>

//         <video
//           ref={videoRef}
//           className="w-full h-full block object-contain bg-black"
//           src={project.fullVideo}
//           controls
//           autoPlay
//           playsInline
//           preload="auto"
//         />
//       </div>
//     </div>,
//     document.body
//   );
// }


// ============================================================================
// OPTION 2: Electric Cyan Wireframe / Technical CAD Custom Controls
// ============================================================================

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { gsap } from '../../lib/gsapSetup';

export default function VideoModal({ project, onClose }) {
  const backdropRef = useRef(null);
  const panelRef = useRef(null);
  const videoRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  // Open animation + lock scroll
  useEffect(() => {
    if (!project) return undefined;

    document.body.style.overflow = 'hidden';

    const ctx = gsap.context(() => {
      gsap.set(panelRef.current, { autoAlpha: 0, scale: 0.94, y: 16 });
      gsap.set(backdropRef.current, { autoAlpha: 0 });
      gsap.to(backdropRef.current, { autoAlpha: 1, duration: 0.25, ease: 'power2.out' });
      gsap.to(panelRef.current, {
        autoAlpha: 1,
        scale: 1,
        y: 0,
        duration: 0.45,
        ease: 'power3.out',
      });
    });

    return () => {
      document.body.style.overflow = '';
      ctx.revert();
    };
  }, [project]);

  const handleClose = () => {
    const tl = gsap.timeline({ onComplete: onClose });
    tl.to(panelRef.current, {
      autoAlpha: 0,
      scale: 0.96,
      y: 10,
      duration: 0.25,
      ease: 'power2.in',
    }).to(backdropRef.current, { autoAlpha: 0, duration: 0.2 }, '<');
  };

  // Close on Escape
  useEffect(() => {
    if (!project) return undefined;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project]);

  // Handle Video Play / Pause Toggle
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Handle Mute
  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  // Progress update
  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    setProgress((video.currentTime / video.duration) * 100);
  };

  // Seekbar scrubbing
  const handleSeek = (e) => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    const newTime = (e.target.value / 100) * video.duration;
    video.currentTime = newTime;
    setProgress(e.target.value);
  };

  // Toggle Fullscreen
  const toggleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.requestFullscreen) {
      video.requestFullscreen();
    }
  };

  if (!project) return null;

  return createPortal(
    <div
      ref={backdropRef}
      className="fixed inset-0 z-[999] grid place-items-center bg-[rgba(5,7,15,0.88)] backdrop-blur-md p-4 md:p-6"
      onMouseDown={(e) => {
        if (e.target === backdropRef.current) handleClose();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={`${project.title} video`}
        className="group relative w-full max-w-[1100px] aspect-video max-sm:aspect-auto max-sm:h-[70vh] rounded-[24px] overflow-hidden bg-[#0d0d11] border border-[#00f0ff]/40 shadow-[0_0_60px_rgba(0,240,255,0.2)]"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 240, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 240, 255, 0.03) 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      >
        {/* Wireframe Technical Crosshairs */}
        <span className="absolute top-3 left-3 text-[#00f0ff] text-[10px] font-mono select-none drop-shadow-[0_0_6px_rgba(0,240,255,0.8)] z-10">+</span>
        <span className="absolute top-3 right-14 text-[#00f0ff] text-[10px] font-mono select-none drop-shadow-[0_0_6px_rgba(0,240,255,0.8)] z-10">+</span>

        {/* Cyan Close Button */}
        <button
          onClick={handleClose}
          aria-label="Close video"
          className="absolute top-3 right-3 z-[20] w-9 h-9 rounded-full bg-[#00f0ff] text-slate-950 flex items-center justify-center cursor-pointer shadow-[0_0_15px_rgba(0,240,255,0.6)] transition-all duration-200 hover:bg-white hover:scale-110 active:scale-95"
        >
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
            <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        </button>

        {/* Video Element */}
        <video
          ref={videoRef}
          className="w-full h-full block object-contain bg-black cursor-pointer"
          src={project.fullVideo}
          onClick={togglePlay}
          onTimeUpdate={handleTimeUpdate}
          autoPlay
          playsInline
          preload="auto"
        />

        {/* Custom HUD Controls */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#0d0d11] via-[#0d0d11]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col gap-2 z-[10] border-t border-[#00f0ff]/20">
          {/* Cyan Timeline Slider */}
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleSeek}
            className="w-full h-1.5 rounded-lg appearance-none cursor-pointer bg-zinc-800 accent-[#00f0ff]"
            style={{
              background: `linear-gradient(to right, #00f0ff ${progress}%, rgba(255,255,255,0.15) ${progress}%)`,
            }}
          />

          <div className="flex items-center justify-between text-white px-2 mt-1">
            <div className="flex items-center gap-4">
              {/* Cyan Play/Pause Button */}
              <button
                onClick={togglePlay}
                className="w-9 h-9 rounded-full flex items-center justify-center text-slate-950 bg-[#00f0ff] shadow-[0_0_15px_rgba(0,240,255,0.5)] hover:scale-105 hover:bg-white transition-all"
              >
                {isPlaying ? (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                    <rect x="2" y="1" width="3.5" height="12" rx="1" />
                    <rect x="8.5" y="1" width="3.5" height="12" rx="1" />
                  </svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 22 22" fill="currentColor">
                    <path d="M6 4.5V17.5L17 11L6 4.5Z" />
                  </svg>
                )}
              </button>

              {/* Mute Button */}
              <button
                onClick={toggleMute}
                className="text-zinc-400 hover:text-[#00f0ff] transition-colors"
              >
                {isMuted ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 5L6 9H2V15H6L11 19V5Z" />
                    <line x1="23" y1="9" x2="17" y2="15" />
                    <line x1="17" y1="9" x2="23" y2="15" />
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 15 0 0 1 0 7.07" />
                  </svg>
                )}
              </button>
            </div>

            {/* Fullscreen Button */}
            <button
              onClick={toggleFullscreen}
              className="text-zinc-400 hover:text-[#00f0ff] transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}