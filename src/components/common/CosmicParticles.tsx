import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  size: number;
  color: string;
  alpha: number;
  alphaSpeed: number;
  angle: number;
  spinSpeed: number;
  parallax: number;
}

export const CosmicParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000 });
  const scrollRef = useRef({ y: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Color choices corresponding to our high-tech brand system
    const particleColors = [
      'rgba(0, 92, 255, ',   // primary blue
      'rgba(34, 211, 238, ',  // cyan
      'rgba(99, 102, 241, ',  // indigo
      'rgba(168, 85, 247, ',  // purple
    ];

    // Initialize 70 interactive floating stars
    const initParticles = () => {
      particles = [];
      const particleCount = 70;
      for (let i = 0; i < particleCount; i++) {
        const size = Math.random() * 2.5 + 0.8;
        const colorBase = particleColors[Math.floor(Math.random() * particleColors.length)];
        
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          baseX: Math.random() * width,
          baseY: Math.random() * height,
          size,
          color: colorBase,
          alpha: Math.random() * 0.7 + 0.15,
          alphaSpeed: Math.random() * 0.02 + 0.005,
          angle: Math.random() * Math.PI * 2,
          spinSpeed: Math.random() * 0.02 - 0.01,
          parallax: Math.random() * 0.45 + 0.15, // different depth layers
        });
      }
    };

    initParticles();

    // Event listeners
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseRef.current.targetX = -1000;
      mouseRef.current.targetY = -1000;
    };

    const handleScroll = () => {
      scrollRef.current.targetY = window.scrollY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Animation Loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Dampen mouse and scroll offsets for organic smooth motion
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      const scroll = scrollRef.current;
      scroll.y += (scroll.targetY - scroll.y) * 0.08;

      // Draw and update each cosmic particle
      particles.forEach((p) => {
        // Apply sinusoidal pulse to alpha opacity
        p.alpha += p.alphaSpeed;
        if (p.alpha > 0.85 || p.alpha < 0.15) {
          p.alphaSpeed = -p.alphaSpeed;
        }

        // Apply slow orbit float
        p.angle += p.spinSpeed;
        
        // Calculate coordinate relative to screen size with infinite wrap-around modulo
        const scrolledY = (p.baseY + p.angle * 8 - scroll.y * p.parallax) % height;
        const finalY = scrolledY < 0 ? height + scrolledY : scrolledY;

        const scrolledX = (p.baseX + Math.sin(p.angle) * 12) % width;
        const finalX = scrolledX < 0 ? width + scrolledX : scrolledX;

        // Mouse Interactive Repulsion Field
        let dx = mouse.x - finalX;
        let dy = mouse.y - finalY;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let forceX = 0;
        let forceY = 0;

        const activeRadius = 130;
        if (distance < activeRadius) {
          // Calculate push vector
          const force = (activeRadius - distance) / activeRadius;
          const angle = Math.atan2(dy, dx);
          forceX = Math.cos(angle) * force * -45 * (1 - p.parallax * 0.5);
          forceY = Math.sin(angle) * force * -45 * (1 - p.parallax * 0.5);

          // Draw a faint glowing stardust connector line to the mouse cursor
          ctx.beginPath();
          ctx.strokeStyle = `${p.color}${p.alpha * 0.28})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(finalX + forceX, finalY + forceY);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }

        // Draw glowing particle
        ctx.beginPath();
        const grad = ctx.createRadialGradient(
          finalX + forceX,
          finalY + forceY,
          0,
          finalX + forceX,
          finalY + forceY,
          p.size * 2
        );
        grad.addColorStop(0, '#fff');
        grad.addColorStop(0.3, `${p.color}${p.alpha})`);
        grad.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.fillStyle = grad;
        ctx.arc(finalX + forceX, finalY + forceY, p.size * 2.5, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2, // sits above the Figma background grid but completely behind interactive cards
        pointerEvents: 'none', // fully transparent to interactions
      }}
    />
  );
};
