"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { useReducedMotion } from "@/hooks/useMediaQuery";

interface Dust {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  baseOpacity: number;
  layer: number; // 0 = far/dim, 1 = mid, 2 = near/bright
}

export default function CosmicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const dustRef = useRef<Dust[]>([]);
  const animRef = useRef<number>(0);
  const reducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const init = useCallback((w: number, h: number) => {
    const dust: Dust[] = [];

    // Layer 0: far dust — very tiny, very faint, slow
    const farCount = Math.min(120, Math.floor((w * h) / 12000));
    for (let i = 0; i < farCount; i++) {
      dust.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.05,
        vy: (Math.random() - 0.5) * 0.05,
        size: Math.random() * 0.8 + 0.3,
        opacity: Math.random() * 0.12 + 0.03,
        baseOpacity: Math.random() * 0.12 + 0.03,
        layer: 0,
      });
    }

    // Layer 1: mid dust — small, moderate opacity
    const midCount = Math.min(60, Math.floor((w * h) / 25000));
    for (let i = 0; i < midCount; i++) {
      dust.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.1,
        vy: (Math.random() - 0.5) * 0.1,
        size: Math.random() * 1.2 + 0.5,
        opacity: Math.random() * 0.15 + 0.05,
        baseOpacity: Math.random() * 0.15 + 0.05,
        layer: 1,
      });
    }

    // Layer 2: near dust — slightly larger, brighter, more responsive
    const nearCount = Math.min(30, Math.floor((w * h) / 50000));
    for (let i = 0; i < nearCount; i++) {
      dust.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        size: Math.random() * 1.8 + 0.8,
        opacity: Math.random() * 0.2 + 0.08,
        baseOpacity: Math.random() * 0.2 + 0.08,
        layer: 2,
      });
    }

    dustRef.current = dust;
  }, []);

  useEffect(() => {
    if (reducedMotion || !mounted) return;

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
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const { x: mx, y: my } = mouseRef.current;

      // Subtle mouse glow
      if (mx > 0) {
        const glowGrad = ctx.createRadialGradient(mx, my, 0, mx, my, 100);
        glowGrad.addColorStop(0, "rgba(201, 168, 76, 0.025)");
        glowGrad.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(mx, my, 100, 0, Math.PI * 2);
        ctx.fillStyle = glowGrad;
        ctx.fill();
      }

      for (const d of dustRef.current) {
        const dx = mx - d.x;
        const dy = my - d.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Mouse interaction — stronger for nearer layers
        const mouseRadius = 120 + d.layer * 30;
        if (dist < mouseRadius && dist > 0) {
          const force = (mouseRadius - dist) / mouseRadius;
          const strength = 0.003 + d.layer * 0.003;
          d.opacity = d.baseOpacity + force * (0.15 + d.layer * 0.1);
          // Gentle drift toward mouse
          d.vx += (dx / dist) * force * strength;
          d.vy += (dy / dist) * force * strength;
        } else {
          d.opacity += (d.baseOpacity - d.opacity) * 0.015;
        }

        d.x += d.vx;
        d.y += d.vy;

        // Damping — far dust moves slower
        const damping = 0.997 - d.layer * 0.001;
        d.vx *= damping;
        d.vy *= damping;

        // Wrap
        if (d.x < -10) d.x = canvas.width + 10;
        if (d.x > canvas.width + 10) d.x = -10;
        if (d.y < -10) d.y = canvas.height + 10;
        if (d.y > canvas.height + 10) d.y = -10;

        // Draw — warm gold tones with slight color variation per layer
        const r = 201 - d.layer * 10;
        const g = 168 - d.layer * 8;
        const b = 76 + d.layer * 15;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${d.opacity})`;
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
  }, [reducedMotion, mounted, init]);

  if (reducedMotion || !mounted) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[1]"
      aria-hidden="true"
    />
  );
}
