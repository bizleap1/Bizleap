import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const StickyHeroVideo = () => {
  const containerRef = useRef(null);
  const videoWrapperRef = useRef(null);
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    // Only run on client
    if (!containerRef.current || !videoWrapperRef.current) return;

    const ctx = gsap.context(() => {
      // Pinning and scaling animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=150%', // Pin for 1.5x the screen height
          pin: true,
          scrub: 1, // Smooth scrubbing
        }
      });

      tl.to(videoWrapperRef.current, {
        width: '100vw',
        height: '100vh',
        borderRadius: '0px',
        ease: 'none'
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const toggleMute = () => {
    setIsMuted(!isMuted);
    // Directly mutate the video ref for immediate feedback before state catches up
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
    }
  };

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-screen bg-black flex items-center justify-center overflow-hidden"
    >
      <div 
        ref={videoWrapperRef} 
        className="relative overflow-hidden flex items-center justify-center"
        style={{ width: '60vw', height: '60vh', borderRadius: '32px' }}
      >
        <video
          ref={videoRef}
          src="/team/herovideo.mp4" 
          autoPlay
          muted={true}
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Monk-E Style Overlay */}
        <div className="absolute bottom-10 left-10 flex flex-col items-start justify-end pointer-events-none z-10 text-white drop-shadow-md">
          <button 
            onClick={toggleMute}
            className="pointer-events-auto flex items-center gap-3 transition-opacity hover:opacity-70 cursor-pointer mb-2"
          >
            {isMuted ? (
              <>
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" /></svg>
                <span className="text-xl font-medium uppercase tracking-wide">Play Sound</span>
              </>
            ) : (
              <>
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15.536 8.464a5 5 0 010 7.072M17.95 6.05a8 8 0 010 11.9M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
                <span className="text-xl font-medium uppercase tracking-wide">Mute Sound</span>
              </>
            )}
          </button>
          <div className="text-2xl md:text-3xl font-medium tracking-tight mt-1">
            When brands let us cook
          </div>
        </div>
      </div>
    </section>
  );
};

export default StickyHeroVideo;
