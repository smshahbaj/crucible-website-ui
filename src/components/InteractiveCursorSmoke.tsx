import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  maxSize: number;
  alpha: number;
  decay: number;
  rotation: number;
  vRot: number;
  colorType: number; // 0: violet, 1: purple, 2: magenta, 3: soft white-purple
}

export const InteractiveCursorSmoke: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      buildSmokeSprites();
    };
    window.addEventListener('resize', handleResize);

    // Pre-render soft volumetric smoke puff sprites on offscreen canvases for optimal performance
    const spriteCanvasList: HTMLCanvasElement[] = [];
    const spriteSize = 128;

    const buildSmokeSprites = () => {
      spriteCanvasList.length = 0;
      const colorPalettes = [
        { r: 168, g: 85, b: 247 }, // Electric purple
        { r: 147, g: 51, b: 234 }, // Deep violet
        { r: 217, g: 70, b: 239 }, // Neon fuchsia
        { r: 232, g: 121, b: 249 }, // Light amethyst
      ];

      colorPalettes.forEach((color) => {
        const offCanvas = document.createElement('canvas');
        offCanvas.width = spriteSize;
        offCanvas.height = spriteSize;
        const offCtx = offCanvas.getContext('2d');
        if (!offCtx) return;

        const center = spriteSize / 2;
        const rad = spriteSize / 2;

        // Multi-layered soft radial volumetric falloff
        const grad = offCtx.createRadialGradient(
          center + (Math.random() - 0.5) * 6,
          center + (Math.random() - 0.5) * 6,
          2,
          center,
          center,
          rad
        );

        grad.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, 0.55)`);
        grad.addColorStop(0.35, `rgba(${color.r}, ${color.g}, ${color.b}, 0.3)`);
        grad.addColorStop(0.7, `rgba(${Math.floor(color.r * 0.8)}, ${Math.floor(color.g * 0.8)}, ${color.b}, 0.1)`);
        grad.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`);

        offCtx.fillStyle = grad;
        offCtx.beginPath();
        offCtx.arc(center, center, rad, 0, Math.PI * 2);
        offCtx.fill();

        spriteCanvasList.push(offCanvas);
      });
    };

    buildSmokeSprites();

    // Particle system configuration
    const isMobile = window.innerWidth < 768;
    const maxParticles = isMobile ? 40 : 130;
    const particles: Particle[] = [];

    let lastMouseX = -100;
    let lastMouseY = -100;
    let lastTime = performance.now();
    let isPointerActive = false;

    // Spawn a smoke puff at given coordinate with inherited cursor velocity & natural dispersion
    const spawnSmokePuff = (
      x: number,
      y: number,
      vx: number,
      vy: number,
      intensity: number
    ) => {
      if (particles.length >= maxParticles) {
        // Recycle oldest particle
        particles.shift();
      }

      // Add turbulence & randomized lateral drift
      const angle = Math.random() * Math.PI * 2;
      const spreadSpeed = (Math.random() * 0.6 + 0.2) * (0.8 + intensity * 0.4);
      const initialSize = (Math.random() * 18 + 14) * (1 + intensity * 0.3);
      const maxSize = (Math.random() * 70 + 55) * (1 + intensity * 0.5);

      particles.push({
        x: x + (Math.random() - 0.5) * 8,
        y: y + (Math.random() - 0.5) * 8,
        vx: vx * 0.25 + Math.cos(angle) * spreadSpeed,
        vy: vy * 0.25 + Math.sin(angle) * spreadSpeed - 0.2, // slight upward float
        size: initialSize,
        maxSize,
        alpha: Math.min(0.48, 0.18 + intensity * 0.12),
        decay: Math.random() * 0.009 + 0.007,
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.02,
        colorType: Math.floor(Math.random() * spriteCanvasList.length),
      });
    };

    // Pointer move handler with continuous interpolation for fast movements
    const handlePointerMove = (clientX: number, clientY: number) => {
      const now = performance.now();
      const dt = Math.max(1, now - lastTime);

      if (lastMouseX > 0 && lastMouseY > 0) {
        const dx = clientX - lastMouseX;
        const dy = clientY - lastMouseY;
        const dist = Math.hypot(dx, dy);
        const speed = dist / dt; // pixels per millisecond

        // Velocity scaled for emission
        const vx = (dx / dt) * 12;
        const vy = (dy / dt) * 12;

        // Determine number of interpolated steps to prevent gaps during rapid flick
        const stepDist = isMobile ? 24 : 12;
        const steps = Math.min(8, Math.max(1, Math.floor(dist / stepDist)));
        const intensity = Math.min(2.5, speed * 1.8);

        for (let i = 0; i < steps; i++) {
          const t = i / steps;
          const interpX = lastMouseX + dx * t;
          const interpY = lastMouseY + dy * t;
          
          // Emit based on speed threshold
          if (speed > 0.08 || Math.random() < 0.3) {
            spawnSmokePuff(interpX, interpY, vx, vy, intensity);
          }
        }
      }

      lastMouseX = clientX;
      lastMouseY = clientY;
      lastTime = now;
      isPointerActive = true;
    };

    const onMouseMove = (e: MouseEvent) => {
      handlePointerMove(e.clientX, e.clientY);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const onMouseLeave = () => {
      isPointerActive = false;
      lastMouseX = -100;
      lastMouseY = -100;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);

    // Animation Loop
    let animationFrameId: number;
    let time = 0;

    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Use 'screen' or 'lighter' composite mode for luminous ethereal smoke overlapping
      ctx.globalCompositeOperation = 'screen';

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        // Apply physical drag & atmospheric upward buoyancy
        p.vx *= 0.96;
        p.vy *= 0.96;
        p.vy -= 0.04; // natural thermal rise

        // Micro-turbulence
        p.vx += Math.sin(time * 3 + p.y * 0.05) * 0.04;

        p.x += p.vx;
        p.y += p.vy;

        // Expansion as smoke diffuses
        if (p.size < p.maxSize) {
          p.size += (p.maxSize - p.size) * 0.035;
        }

        // Opacity decay
        p.alpha -= p.decay;
        p.rotation += p.vRot;

        if (p.alpha <= 0 || p.x < -100 || p.x > width + 100 || p.y < -100) {
          particles.splice(i, 1);
          continue;
        }

        const sprite = spriteCanvasList[p.colorType] || spriteCanvasList[0];
        if (sprite) {
          ctx.save();
          ctx.globalAlpha = Math.max(0, Math.min(1, p.alpha));
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.drawImage(
            sprite,
            -p.size / 2,
            -p.size / 2,
            p.size,
            p.size
          );
          ctx.restore();
        }
      }

      ctx.globalCompositeOperation = 'source-over';
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="crucible-cursor-smoke-canvas"
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-15 w-full h-full"
    />
  );
};
