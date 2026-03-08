"use client";

import { useState, useRef, useEffect } from "react";

const VIDEO_URL =
  "https://moizuchvvckkbvvibems.supabase.co/storage/v1/object/public/media/no-batidao.mp4";

export default function VideoEasterEgg() {
  const [open, setOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (open && videoRef.current) {
      videoRef.current.play();
    }
  }, [open]);

  return (
    <>
      {/* Trigger — subtle, discoverable */}
      <div className="mt-24 flex justify-center">
        <button
          onClick={() => setOpen(true)}
          className="group flex items-center gap-2 text-xs text-smoke/30 transition-colors hover:text-gold"
        >
          <span className="inline-block h-px w-4 bg-current transition-all group-hover:w-8" />
          NO BATIDAO
          <span className="inline-block h-px w-4 bg-current transition-all group-hover:w-8" />
        </button>
      </div>

      {/* Fullscreen overlay */}
      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-void/95 backdrop-blur-sm animate-[fadeIn_0.3s_ease-out]"
          onClick={() => {
            if (videoRef.current) videoRef.current.pause();
            setOpen(false);
          }}
        >
          <div
            className="relative w-full max-w-3xl px-4 animate-[scaleIn_0.4s_ease-out]"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              ref={videoRef}
              src={VIDEO_URL}
              controls
              playsInline
              className="w-full rounded-xl shadow-2xl shadow-gold/10"
            />
            <button
              onClick={() => {
                if (videoRef.current) videoRef.current.pause();
                setOpen(false);
              }}
              className="absolute -top-10 right-4 text-sm text-smoke transition-colors hover:text-gold"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
