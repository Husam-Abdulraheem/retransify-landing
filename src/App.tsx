import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import StoryUI from './components/StoryUI';
import Scene from './components/Scene';
import { useStoryAnimation } from './hooks/useStoryAnimation';

function App() {
  // Initialize the GSAP scroll animations
  useStoryAnimation();

  return (
    <div className="bg-[#030303]">
      {/* Massive Scroll Container (12000px height for long scroll experience) */}
      <div id="scroll-container" className="h-[12000px] w-full relative">
        
        {/* Sticky viewport */}
        <div className="sticky top-0 w-full h-screen overflow-hidden bg-[#030303]">
          
          {/* 3D Canvas Background */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <Canvas camera={{ position: [0, 5, 15], fov: 60 }}>
              <Suspense fallback={null}>
                <Scene />
              </Suspense>
            </Canvas>
          </div>

          {/* HTML UI Layer */}
          <StoryUI />
        </div>
        
      </div>
    </div>
  );
}

export default App;
