"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { useReducedMotion } from "@/hooks/useMediaQuery";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  baseOpacity: number;
}

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleSpeed: number;
  twinkleOffset: number;
}

interface Planet {
  x: number;
  y: number;
  radius: number;
  color: string;
  glowColor: string;
  glowRadius: number;
}

export default function CosmicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const particlesRef = useRef<Particle[]>([]);
  const starsRef = useRef<Star[]>([]);
  const planetsRef = useRef<Planet[]>([]);
  const animRef = useRef<number>(0);
  const timeRef = useRef(0);
  const reducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const init = useCallback((w: number, h: number) => {
    // Interactive gold particles
    const particleCount = Math.min(80, Math.floor((w * h) / 20000));
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.4 + 0.05,
      baseOpacity: Math.random() * 0.4 + 0.05,
    }));

    // Background stars — tiny twinkling dots
    const starCount = Math.min(200, Math.floor((w * h) / 8000));
    starsRef.current = Array.from({ length: starCount }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      size: Math.random() * 1.2 + 0.2,
      opacity: Math.random() * 0.6 + 0.1,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      twinkleOffset: Math.random() * Math.PI * 2,
    }));

    // Dwarf planets — soft glowing spheres
    planetsRef.current = [
      {
        x: w * 0.85,
        y: h * 0.15,
        radius: 3,
        color: "rgba(180, 160, 120, 0.15)",
        glowColor: "rgba(201, 168, 76, 0.04)",
        glowRadius: 30,
      },
      {
        x: w * 0.12,
        y: h * 0.7,
        radius: 2,
        color: "rgba(150, 140, 130, 0.12)",
        glowColor: "rgba(170, 160, 140, 0.03)",
        glowRadius: 20,
      },
      {
        x: w * 0.55,
        y: h * 0.4,
        radius: 1.5,
        color: "rgba(160, 150, 140, 0.1)",
        glowColor: "rgba(180, 170, 150, 0.02)",
        glowRadius: 15,
      },
    ];
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init(canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMouse);

    const animate = () => {
      timeRef.current += 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw stars (twinkling)
      for (const star of starsRef.current) {
        const twinkle =
          Math.sin(timeRef.current * star.twinkleSpeed + star.twinkleOffset) *
            0.3 +
          0.7;
        const alpha = star.opacity * twinkle;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220, 215, 200, ${alpha})`;
        ctx.fill();
      }

      // Draw planets (soft glow)
      for (const planet of planetsRef.current) {
        // Glow
        const gradient = ctx.createRadialGradient(
          planet.x,
          planet.y,
          0,
          planet.x,
          planet.y,
          planet.glowRadius
        );
        gradient.addColorStop(0, planet.glowColor);
        gradient.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(planet.x, planet.y, planet.glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(planet.x, planet.y, planet.radius, 0, Math.PI * 2);
        ctx.fillStyle = planet.color;
        ctx.fill();
      }

      // Draw interactive particles
      const { x: mx, y: my } = mouseRef.current;

      // Mouse glow
      if (mx > 0) {
        const glowGrad = ctx.createRadialGradient(mx, my, 0, mx, my, 120);
        glowGrad.addColorStop(0, "rgba(201, 168, 76, 0.03)");
        glowGrad.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(mx, my, 120, 0, Math.PI * 2);
        ctx.fillStyle = glowGrad;
        ctx.fill();
      }

      for (const p of particlesRef.current) {
        const dx = mx - p.x;
        const dy = my - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 180) {
          const force = (180 - dist) / 180;
          p.opacity = p.baseOpacity + force * 0.6;
          // Gentle attraction toward mouse
          p.vx += (dx / dist) * force * 0.008;
          p.vy += (dy / dist) * force * 0.008;
          // Slight orbit perpendicular push
          p.vx += (-dy / dist) * force * 0.003;
          p.vy += (dx / dist) * force * 0.003;
        } else {
          p.opacity += (p.baseOpacity - p.opacity) * 0.02;
        }

        // Draw connection lines between nearby particles near mouse
        if (dist < 200) {
          for (const q of particlesRef.current) {
            if (q === p) continue;
            const pdx = q.x - p.x;
            const pdy = q.y - p.y;
            const pdist = Math.sqrt(pdx * pdx + pdy * pdy);
            if (pdist < 80) {
              const lineAlpha = ((80 - pdist) / 80) * 0.08;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(q.x, q.y);
              ctx.strokeStyle = `rgba(201, 168, 76, ${lineAlpha})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }

        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.995;
        p.vy *= 0.995;

        // Wrap around full page height
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201, 168, 76, ${p.opacity})`;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, [reducedMotion, init]);

  if (reducedMotion || !mounted) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
    />
  );
}
