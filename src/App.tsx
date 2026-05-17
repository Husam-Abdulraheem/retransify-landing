import React, { useRef, useState } from 'react';
import StoryUI from './components/StoryUI';
import Header from './components/Header';
import { HUDSidebar } from './components/common/HUDSidebar';
import { CosmicParticles } from './components/common/CosmicParticles';
import { useStoryAnimation } from './hooks/useStoryAnimation';
import './index.css';

export default function App() {
  const masterRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const [activeStep, setActiveStep] = useState<number>(0);
  const [registeredSteps, setRegisteredSteps] = useState<{ step: number; progress: number }[]>([]);
  const [timelineIndex, setTimelineIndex] = useState<number>(0);

  useStoryAnimation(masterRef, canvasRef, setActiveStep, setRegisteredSteps, setTimelineIndex);

  return (
    <div
      id="master-container"
      ref={masterRef}
      style={{ width:'100vw', height:'100vh', overflow:'hidden', position:'relative' }}
    >
      <Header />
      <HUDSidebar activeStep={activeStep} steps={registeredSteps} />
      <CosmicParticles />
      {/* Infinite canvas — GSAP ScrollTrigger moves this */}
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
        <StoryUI timelineIndex={timelineIndex} />
      </div>

      {/* Scroll hint HUD */}
      <div className="scroll-hint">
        <span className="scroll-hint__label">Scroll to navigate</span>
        <div className="scroll-hint__line"/>
      </div>

      {/* Futuristic Viewport Neon Framed Glow Overlay */}
      <div className="viewport-neon-border" />
    </div>
  );
}
