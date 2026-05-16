import React, { useRef } from 'react';
import StoryUI from './components/StoryUI';
import { useStoryAnimation } from './hooks/useStoryAnimation';
import './index.css';

export default function App() {
  const masterRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  useStoryAnimation(masterRef, canvasRef);

  return (
    <div
      id="master-container"
      ref={masterRef}
      style={{ width:'100vw', height:'100vh', overflow:'hidden', position:'relative' }}
    >
      {/* Infinite Figma-style canvas — 6000×7400 to contain all nodes */}
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
        <StoryUI />
      </div>

      {/* Scroll hint HUD */}
      <div className="scroll-hint">
        <span className="scroll-hint__label">scroll to navigate</span>
        <div className="scroll-hint__line"/>
      </div>
    </div>
  );
}
