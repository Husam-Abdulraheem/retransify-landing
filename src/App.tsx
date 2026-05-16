import React, { useRef } from 'react';
import StoryUI from './components/StoryUI';
import { useStoryAnimation } from './hooks/useStoryAnimation';

function App() {
  const masterRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  // Initialize the GSAP scroll animations for Infinite Canvas
  useStoryAnimation(masterRef, canvasRef);

  return (
    <div className="bg-[#030303]">
      <div 
        id="master-container" 
        ref={masterRef}
        className="w-screen h-screen overflow-hidden relative bg-[#030303]"
      >
        <div 
          id="diagram-canvas" 
          ref={canvasRef}
          className="absolute top-0 left-0"
          style={{ 
            width: '5000px', 
            height: '5000px',
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.05) 2px, transparent 2px)',
            backgroundSize: '50px 50px'
          }}
        >
          <StoryUI />
        </div>
      </div>
    </div>
  );
}

export default App;
