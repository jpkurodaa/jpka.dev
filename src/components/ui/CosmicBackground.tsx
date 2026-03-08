"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useMediaQuery";

interface Dust {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseOpacity: number;
  opacity: number;
}

export default function CosmicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const dustRef = useRef<Dust[]>([]);
  const animRef = useRef<number>(0);
  const reducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (reducedMotion || !mounted) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const init = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;

      const count = Math.min(180, Math.floor((w * h) / 8000));
      dustRef.current = Array.from({ length: count }, () => {
        const layer = Math.random();
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.15,
          size: layer < 0.6 ? Math.random() * 0.8 + 0.3
              : layer < 0.85 ? Math.random() * 1.3 + 0.5
              : Math.random() * 2 + 0.8,
          baseOpacity: layer < 0.6 ? Math.random() * 0.1 + 0.02
                     : layer < 0.85 ? Math.random() * 0.15 + 0.05
                     : Math.random() * 0.25 + 0.08,
          opacity: 0,
        };
      });
      for (const d of dustRef.current) d.opacity = d.baseOpacity;
    };
    init();
    window.addEventListener("resize", init);

    const onMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMouse);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const { x: mx, y: my } = mouseRef.current;
      const w = canvas.width;
      const h = canvas.height;

      // Mouse glow
      if (mx > 0) {
        const g = ctx.createRadialGradient(mx, my, 0, mx, my, 90);
        g.addColorStop(0, "rgba(201, 168, 76, 0.03)");
        g.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(mx, my, 90, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      }

      for (const d of dustRef.current) {
        // Mouse interaction
        const dx = mx - d.x;
        const dy = my - d.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 150 && dist > 0) {
          const force = (150 - dist) / 150;
          d.opacity = d.baseOpacity + force * 0.35;
          // Push away from mouse
          d.vx -= (dx / dist) * force * 0.15;
          d.vy -= (dy / dist) * force * 0.15;
        } else {
          d.opacity += (d.baseOpacity - d.opacity) * 0.03;
        }

        // Drift
        d.x += d.vx;
        d.y += d.vy;

        // Damping — slow return to gentle drift
        d.vx *= 0.98;
        d.vy *= 0.98;

        // Add tiny random drift so they never fully stop
        d.vx += (Math.random() - 0.5) * 0.008;
        d.vy += (Math.random() - 0.5) * 0.008;

        // Wrap edges
        if (d.x < -5) d.x = w + 5;
        if (d.x > w + 5) d.x = -5;
        if (d.y < -5) d.y = h + 5;
        if (d.y > h + 5) d.y = -5;

        // Draw
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201, 168, 76, ${d.opacity})`;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", init);
      window.removeEventListener("mousemove", onMouse);
    };
  }, [reducedMotion, mounted]);

  if (reducedMotion || !mounted) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[1]"
      aria-hidden="true"
    />
  );
}
