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
  layer: number;
}

export default function CosmicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const scrollRef = useRef(0);
  const dustRef = useRef<Dust[]>([]);
  const animRef = useRef<number>(0);
  const pageHeightRef = useRef(0);
  const reducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const populate = useCallback((w: number, pageH: number) => {
    const dust: Dust[] = [];
    const density = w * pageH;

    // Far dust — tiny, faint, slow
    const farCount = Math.min(300, Math.floor(density / 8000));
    for (let i = 0; i < farCount; i++) {
      dust.push({
        x: Math.random() * w,
        y: Math.random() * pageH,
        vx: (Math.random() - 0.5) * 0.04,
        vy: (Math.random() - 0.5) * 0.04,
        size: Math.random() * 0.8 + 0.3,
        opacity: Math.random() * 0.12 + 0.03,
        baseOpacity: Math.random() * 0.12 + 0.03,
        layer: 0,
      });
    }

    // Mid dust
    const midCount = Math.min(150, Math.floor(density / 18000));
    for (let i = 0; i < midCount; i++) {
      dust.push({
        x: Math.random() * w,
        y: Math.random() * pageH,
        vx: (Math.random() - 0.5) * 0.08,
        vy: (Math.random() - 0.5) * 0.08,
        size: Math.random() * 1.2 + 0.5,
        opacity: Math.random() * 0.15 + 0.05,
        baseOpacity: Math.random() * 0.15 + 0.05,
        layer: 1,
      });
    }

    // Near dust — larger, brighter
    const nearCount = Math.min(60, Math.floor(density / 40000));
    for (let i = 0; i < nearCount; i++) {
      dust.push({
        x: Math.random() * w,
        y: Math.random() * pageH,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
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

    const measure = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const newPageH = Math.max(
        document.documentElement.scrollHeight,
        window.innerHeight
      );
      // Only repopulate if page height changed significantly
      if (Math.abs(newPageH - pageHeightRef.current) > 200) {
        pageHeightRef.current = newPageH;
        populate(canvas.width, newPageH);
      }
    };
    measure();

    // Re-measure when DOM changes (route transitions, content load)
    const observer = new MutationObserver(() => {
      requestAnimationFrame(measure);
    });
    observer.observe(document.body, { childList: true, subtree: true });

    window.addEventListener("resize", measure);

    const onScroll = () => {
      scrollRef.current = window.scrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const onMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMouse);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const scroll = scrollRef.current;
      const vw = canvas.width;
      const vh = canvas.height;
      const { x: mx, y: my } = mouseRef.current;
      // Mouse in world space
      const mwy = my + scroll;

      // Subtle mouse glow (viewport space)
      if (mx > 0) {
        const glowGrad = ctx.createRadialGradient(mx, my, 0, mx, my, 100);
        glowGrad.addColorStop(0, "rgba(201, 168, 76, 0.025)");
        glowGrad.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(mx, my, 100, 0, Math.PI * 2);
        ctx.fillStyle = glowGrad;
        ctx.fill();
      }

      const margin = 50;

      for (const d of dustRef.current) {
        // Screen-space Y
        const sy = d.y - scroll;

        // Skip particles outside viewport (with margin)
        if (sy < -margin || sy > vh + margin) continue;

        // Mouse interaction in world space
        const dx = mx - d.x;
        const dy = mwy - d.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        const mouseRadius = 120 + d.layer * 30;
        if (dist < mouseRadius && dist > 0) {
          const force = (mouseRadius - dist) / mouseRadius;
          const strength = 0.003 + d.layer * 0.003;
          d.opacity = d.baseOpacity + force * (0.15 + d.layer * 0.1);
          d.vx += (dx / dist) * force * strength;
          d.vy += (dy / dist) * force * strength;
        } else {
          d.opacity += (d.baseOpacity - d.opacity) * 0.015;
        }

        d.x += d.vx;
        d.y += d.vy;

        const damping = 0.997 - d.layer * 0.001;
        d.vx *= damping;
        d.vy *= damping;

        // Wrap horizontally
        if (d.x < -10) d.x = vw + 10;
        if (d.x > vw + 10) d.x = -10;

        // Draw at screen position
        const r = 201 - d.layer * 10;
        const g = 168 - d.layer * 8;
        const b = 76 + d.layer * 15;
        ctx.beginPath();
        ctx.arc(d.x, sy, d.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${d.opacity})`;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animRef.current);
      observer.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouse);
    };
  }, [reducedMotion, mounted, populate]);

  if (reducedMotion || !mounted) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[1]"
      aria-hidden="true"
    />
  );
}
