import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import StoryUI from './components/StoryUI';
import { useStoryAnimation } from './hooks/useStoryAnimation';
import './index.css';

export default function App() {
  const masterRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const innerCanvasRef = useRef<HTMLDivElement>(null);

  useStoryAnimation(masterRef, canvasRef);

  // Figma-style Free Dragging Logic with Smooth Lerping
  useEffect(() => {
    const master = masterRef.current;
    const inner = innerCanvasRef.current;
    if (!master || !inner) return;

    let isDragging = false;
    let startX = 0;
    let startY = 0;
    
    // Current target positions from mouse
    let targetX = 0;
    let targetY = 0;
    
    // Current interpolated positions
    let currentX = 0;
    let currentY = 0;
    
    let rafId: number;

    const renderLoop = () => {
      if (!isDragging) {
        // Apply inertia when dragging stops
        currentX += (targetX - currentX) * 0.1;
        currentY += (targetY - currentY) * 0.1;
      } else {
        // Tighter follow when actively dragging
        currentX += (targetX - currentX) * 0.3;
        currentY += (targetY - currentY) * 0.3;
      }
      
      gsap.set(inner, { x: currentX, y: currentY });
      rafId = requestAnimationFrame(renderLoop);
    };
    rafId = requestAnimationFrame(renderLoop);

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      startX = e.clientX - targetX;
      startY = e.clientY - targetY;
      master.style.cursor = 'grabbing';
      // Prevent text selection / native drag
      e.preventDefault();
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      targetX = e.clientX - startX;
      targetY = e.clientY - startY;
    };

    const onPointerUp = () => {
      isDragging = false;
      master.style.cursor = 'grab';
    };

    master.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    // Reset drag offset smoothly when user starts scrolling to maintain the guided tour
    const onWheel = () => {
      if (targetX !== 0 || targetY !== 0) {
        targetX = 0;
        targetY = 0;
        // Let the lerp loop bring it smoothly back to zero
      }
    };
    window.addEventListener('wheel', onWheel);

    master.style.cursor = 'grab';

    return () => {
      master.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('wheel', onWheel);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      id="master-container"
      ref={masterRef}
      style={{ width:'100vw', height:'100vh', overflow:'hidden', position:'relative', touchAction: 'none', userSelect: 'none', WebkitUserSelect: 'none' }}
    >
      {/* Infinite Figma-style canvas — GSAP ScrollTrigger moves this */}
      <div
        id="diagram-canvas"
        ref={canvasRef}
        style={{
          position:'absolute', top:0, left:0,
          width:6000, height:12000,
          backgroundColor:'#060610',
          backgroundImage:'radial-gradient(circle, rgba(99,102,241,0.22) 1.5px, transparent 1.5px)',
          backgroundSize:'40px 40px',
          willChange: 'transform',
          transform: 'translateZ(0)'
        }}
      >
        {/* Inner canvas moved by user dragging */}
        <div ref={innerCanvasRef} style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, willChange: 'transform' }}>
          <StoryUI />
        </div>
      </div>

      {/* Scroll hint HUD */}
      <div className="scroll-hint">
        <span className="scroll-hint__label">Scroll to navigate | Drag to explore</span>
        <div className="scroll-hint__line"/>
      </div>
    </div>
  );
}
