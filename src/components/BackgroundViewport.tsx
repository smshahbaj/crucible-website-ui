import React, { useEffect, useRef } from 'react';
import { InteractiveCursorSmoke } from './InteractiveCursorSmoke';

interface BackgroundViewportProps {
  scrollProgress: number;
}

export const BackgroundViewport: React.FC<BackgroundViewportProps> = ({ scrollProgress }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Atmospheric Crucible Anvil & Volumetric Energy Simulation Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Atmospheric embers & cosmic particles
    const particleCount = 45;
    const particles: {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      baseOpacity: number;
      hue: number;
    }[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.8 + 0.5,
        speedX: (Math.random() - 0.5) * 0.25,
        speedY: -Math.random() * 0.5 - 0.15, // ascending thermal drift
        opacity: Math.random() * 0.6 + 0.2,
        baseOpacity: Math.random() * 0.4 + 0.2,
        hue: Math.random() > 0.4 ? 275 : 295, // vibrant violet / magenta
      });
    }

    // Lightning branches state
    let lightningTimer = 0;
    interface LightningBranch {
      points: { x: number; y: number }[];
      alpha: number;
      width: number;
    }
    const lightningBranches: LightningBranch[] = [];

    const triggerLightning = (startX: number, startY: number, targetX: number, targetY: number) => {
      const points = [{ x: startX, y: startY }];
      let curX = startX;
      let curY = startY;
      const steps = 8;

      for (let i = 1; i <= steps; i++) {
        const t = i / steps;
        const baseTargetX = startX + (targetX - startX) * t;
        const baseTargetY = startY + (targetY - startY) * t;
        curX = baseTargetX + (Math.random() - 0.5) * 28;
        curY = baseTargetY + (Math.random() - 0.5) * 20;
        points.push({ x: curX, y: curY });
      }

      lightningBranches.push({
        points,
        alpha: 0.9,
        width: Math.random() * 1.5 + 1.0,
      });
    };

    let time = 0;

    const render = () => {
      time += 0.014;

      // Base background: Deep cosmic black-violet #050209
      ctx.fillStyle = '#050209';
      ctx.fillRect(0, 0, width, height);

      // Anvil Focal Center (Right 65% of viewport on desktop, centered on mobile)
      const isMobile = width < 1024;
      const focalX = isMobile ? width * 0.5 : width * 0.68;
      const focalY = isMobile ? height * 0.36 : height * 0.44;
      const baseRadius = Math.min(width, height) * 0.45;

      // Volumetric Deep Purple Nebula Glow
      const nebula = ctx.createRadialGradient(
        focalX,
        focalY,
        30,
        focalX,
        focalY,
        baseRadius * 1.5
      );
      nebula.addColorStop(0, 'rgba(147, 51, 234, 0.22)');
      nebula.addColorStop(0.3, 'rgba(107, 33, 168, 0.14)');
      nebula.addColorStop(0.6, 'rgba(59, 7, 100, 0.06)');
      nebula.addColorStop(1, 'rgba(5, 2, 9, 0)');
      ctx.fillStyle = nebula;
      ctx.fillRect(0, 0, width, height);

      // Crucible Anvil Silhouette & Arcane Core
      ctx.save();
      ctx.translate(focalX, focalY);

      // Dynamic subtle parallax based on scroll
      const anvilScale = 1 - scrollProgress * 0.06;
      ctx.scale(anvilScale, anvilScale);

      // Volumetric Core Energy Halo
      const coreAura = ctx.createRadialGradient(0, -20, 10, 0, -20, 150);
      coreAura.addColorStop(0, 'rgba(217, 70, 239, 0.25)');
      coreAura.addColorStop(0.4, 'rgba(147, 51, 234, 0.12)');
      coreAura.addColorStop(1, 'rgba(147, 51, 234, 0)');
      ctx.fillStyle = coreAura;
      ctx.beginPath();
      ctx.arc(0, -20, 150, 0, Math.PI * 2);
      ctx.fill();

      // Atmospheric smoke swirls around the Anvil
      ctx.fillStyle = 'rgba(168, 85, 247, 0.035)';
      for (let s = 0; s < 3; s++) {
        ctx.beginPath();
        const angle = time * 0.35 + (s * Math.PI * 2) / 3;
        const rX = Math.cos(angle) * (55 + s * 20);
        const rY = Math.sin(angle) * (25 + s * 12) - 35;
        ctx.arc(rX, rY, 65 + Math.sin(time + s) * 12, 0, Math.PI * 2);
        ctx.fill();
      }

      // Dark rock plate foundation
      ctx.fillStyle = '#0a0515';
      ctx.beginPath();
      ctx.ellipse(0, 105, 210, 42, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = 'rgba(147, 51, 234, 0.2)';
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Cracked rock fissures with glowing purple veins
      ctx.strokeStyle = 'rgba(192, 132, 252, 0.35)';
      ctx.lineWidth = 1.0;
      ctx.beginPath();
      ctx.moveTo(-110, 105);
      ctx.lineTo(-55, 112);
      ctx.lineTo(10, 107);
      ctx.lineTo(75, 116);
      ctx.lineTo(130, 109);
      ctx.stroke();

      // Anvil Body Silhouette (Geometric Crucible Form)
      const anvilGrad = ctx.createLinearGradient(-100, -100, 100, 100);
      anvilGrad.addColorStop(0, '#160b2b');
      anvilGrad.addColorStop(0.5, '#0c0517');
      anvilGrad.addColorStop(1, '#050209');

      ctx.fillStyle = anvilGrad;
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.3)';
      ctx.lineWidth = 1.5;

      // Anvil shape path
      ctx.beginPath();
      ctx.moveTo(-125, -48);
      ctx.lineTo(115, -48);
      ctx.lineTo(145, -38);
      ctx.lineTo(105, -24);
      ctx.lineTo(35, -18);
      ctx.lineTo(28, 38);
      ctx.lineTo(75, 80);
      ctx.lineTo(-75, 80);
      ctx.lineTo(-28, 38);
      ctx.lineTo(-35, -18);
      ctx.lineTo(-105, -24);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Glowing Anvil Top Surface Rim
      const rimGrad = ctx.createLinearGradient(-125, -48, 145, -38);
      rimGrad.addColorStop(0, 'rgba(147, 51, 234, 0.15)');
      rimGrad.addColorStop(0.5, 'rgba(232, 121, 249, 0.7)');
      rimGrad.addColorStop(1, 'rgba(147, 51, 234, 0.15)');
      ctx.strokeStyle = rimGrad;
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      ctx.moveTo(-125, -48);
      ctx.lineTo(115, -48);
      ctx.lineTo(145, -38);
      ctx.stroke();

      // Arcane Crucible Core Seal (Glowing Rune Center)
      ctx.fillStyle = 'rgba(217, 70, 239, 0.75)';
      ctx.beginPath();
      ctx.arc(0, 10, 10, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      // Periodic Electric Lightning Arcs
      if (!prefersReducedMotion) {
        lightningTimer++;
        if (lightningTimer % 160 === 0 || Math.random() < 0.012) {
          const startX = focalX + (Math.random() - 0.5) * 100;
          const startY = focalY - 130 - Math.random() * 70;
          const targetX = focalX + (Math.random() - 0.5) * 160;
          const targetY = focalY + (Math.random() - 0.5) * 50;
          triggerLightning(startX, startY, targetX, targetY);
        }

        // Draw & fade lightning branches
        for (let l = lightningBranches.length - 1; l >= 0; l--) {
          const branch = lightningBranches[l];
          branch.alpha -= 0.06;

          if (branch.alpha <= 0) {
            lightningBranches.splice(l, 1);
            continue;
          }

          ctx.save();
          ctx.strokeStyle = `rgba(217, 70, 239, ${branch.alpha * 0.85})`;
          ctx.lineWidth = branch.width;

          ctx.beginPath();
          branch.points.forEach((pt, idx) => {
            if (idx === 0) ctx.moveTo(pt.x, pt.y);
            else ctx.lineTo(pt.x, pt.y);
          });
          ctx.stroke();

          // Inner white core
          ctx.strokeStyle = `rgba(255, 255, 255, ${branch.alpha * 0.8})`;
          ctx.lineWidth = Math.max(0.5, branch.width * 0.35);
          ctx.stroke();

          ctx.restore();
        }
      }

      // Draw floating arcane embers
      particles.forEach((p) => {
        if (!prefersReducedMotion) {
          p.x += p.speedX;
          p.y += p.speedY;
          p.opacity = p.baseOpacity + Math.sin(time * 2 + p.x) * 0.15;

          if (p.y < -15) {
            p.y = height + 15;
            p.x = Math.random() * width;
          }
          if (p.x < -15) p.x = width + 15;
          if (p.x > width + 15) p.x = -15;
        }

        const curAlpha = Math.max(0.1, Math.min(0.75, p.opacity));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 85%, 70%, ${curAlpha})`;
        ctx.fill();
      });

      // Subtle Dark Edge Vignette to guarantee UI legibility
      const vignette = ctx.createLinearGradient(0, 0, width, 0);
      vignette.addColorStop(0, 'rgba(5, 2, 9, 0.88)');
      vignette.addColorStop(0.4, 'rgba(5, 2, 9, 0.5)');
      vignette.addColorStop(0.75, 'rgba(5, 2, 9, 0.15)');
      vignette.addColorStop(1, 'rgba(5, 2, 9, 0.6)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);

      // Bottom fade into page background
      const bottomFade = ctx.createLinearGradient(0, height * 0.7, 0, height);
      bottomFade.addColorStop(0, 'rgba(5, 2, 9, 0)');
      bottomFade.addColorStop(1, '#050209');
      ctx.fillStyle = bottomFade;
      ctx.fillRect(0, height * 0.7, width, height * 0.3);

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [scrollProgress]);

  return (
    <>
      {/* Fixed Fullscreen Background Viewport Container */}
      <div 
        id="crucible-3d-viewport" 
        className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#050209]"
      >
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Dark Cinematic Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050209] via-transparent to-[#050209]/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050209] via-[#050209]/45 to-transparent" />
      </div>

      {/* Interactive Cursor Smoke (Follows cursor with soft volumetric diffusion) */}
      <InteractiveCursorSmoke />
    </>
  );
};
