"use client";

import { useEffect, useRef, useState } from "react";

export function LoopFilm({
  src,
  poster,
  className,
  priority = false,
  label,
}: {
  src: string;
  poster: string;
  className?: string;
  priority?: boolean;
  label?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reduce, setReduce] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduce(media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reduce || failed) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => setFailed(true));
        } else {
          video.pause();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [reduce, failed]);

  if (reduce || failed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={poster} alt={label ?? ""} width={1920} height={1080} className={className} />
    );
  }

  return (
    <video
      ref={videoRef}
      className={className}
      muted
      loop
      playsInline
      poster={poster}
      width={1920}
      height={1080}
      preload={priority ? "auto" : "metadata"}
      aria-hidden={label ? undefined : true}
      aria-label={label}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
