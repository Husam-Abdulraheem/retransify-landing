import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { nodesData, NODE_SEQUENCE } from '../constants/nodes';

gsap.registerPlugin(ScrollTrigger);

export function useStoryAnimation(
  masterRef: React.RefObject<HTMLDivElement | null>,
  canvasRef: React.RefObject<HTMLDivElement | null>,
  onStepActive: (step: number) => void,
  onRegisterSteps: (steps: { step: number; progress: number }[]) => void,
  onTimelineIndexActive?: (timelineIndex: number) => void
) {
  useEffect(() => {
    const master = masterRef.current;
    const canvas = canvasRef.current;
    if (!master || !canvas) return;

    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const targetX = (i: number) => -nodesData[i].x + vw / 2;
    const targetY = (i: number) => -nodesData[i].y + vh / 2;

    // Center on intro node initially
    gsap.set(canvas, { x: targetX(0), y: targetY(0) });

    // All nodes except intro start hidden
    NODE_SEQUENCE.forEach((nodeIndex) => {
      if (nodeIndex === 0) return;
      gsap.set(`#${nodesData[nodeIndex].id}`, { opacity: 0, scale: 0.88, y: 24 });
    });

    // Calculate precise snap points (timeline progress from 0 to 1) for each resting node phase
    const totalDuration = 1.8 + (NODE_SEQUENCE.length - 1) * 4.4;
    const snapPoints: number[] = [0.9 / totalDuration]; // Snaps to middle of the intro reading pause (0.0 to 1.8)
    for (let k = 1; k < NODE_SEQUENCE.length; k++) {
      const restTime = 1.8 + (k - 1) * 4.4 + 3.4; // Snaps EXACTLY to the middle of each subsequent reading pause
      snapPoints.push(restTime / totalDuration);
    }

    // Register active scroll progress offsets for all 10 sequential steps
    onRegisterSteps([
      { step: 1, progress: snapPoints[0] }, // Introduction (Intro)
      { step: 2, progress: snapPoints[1] }, // Lead Analyst (Analyst)
      { step: 3, progress: snapPoints[2] }, // System Architect (Architect)
      { step: 4, progress: snapPoints[3] }, // Code Cleaner (Cleaner)
      { step: 5, progress: snapPoints[4] }, // Native Engineer (Transformer)
      { step: 6, progress: snapPoints[5] }, // QA Inspector (Verifier)
      { step: 7, progress: snapPoints[6] }, // Self-Healing Fixer (Healer)
      { step: 8, progress: snapPoints[8] }, // Committer Writer (Writer)
      { step: 9, progress: snapPoints[9] }, // Release Manager (Documenter)
      { step: 10, progress: snapPoints[10] }, // Executive Boardroom (Dashboard)
    ]);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: master,
        start: 'top top',
        end: '+=10000',
        scrub: 1.8,
        pin: true,
        snap: {
          snapTo: snapPoints,
          duration: { min: 1.0, max: 1.8 },
          delay: 0.1,
          ease: 'power2.out',
        },
        id: 'story-trigger',
        onUpdate: (self) => {
          const progress = self.progress;
          // Find closest snap index
          let closestIndex = 0;
          let minDiff = Infinity;
          snapPoints.forEach((p, idx) => {
            const diff = Math.abs(p - progress);
            if (diff < minDiff) {
              minDiff = diff;
              closestIndex = idx;
            }
          });

          // Map closest timeline sequence index to our 10 HUD steps
          let activeStep = 1;
          if (closestIndex === 0) activeStep = 1;
          else if (closestIndex === 1) activeStep = 2;
          else if (closestIndex === 2) activeStep = 3;
          else if (closestIndex === 3) activeStep = 4;
          else if (closestIndex === 4) activeStep = 5;
          else if (closestIndex === 5) activeStep = 6;
          else if (closestIndex === 6) activeStep = 7;
          else if (closestIndex === 7) activeStep = 6; // Verifier second pass -> maps to QA Inspector
          else if (closestIndex === 8) activeStep = 8;
          else if (closestIndex === 9) activeStep = 9;
          else if (closestIndex === 10) activeStep = 10;

          onStepActive(activeStep);
          if (onTimelineIndexActive) {
            onTimelineIndexActive(closestIndex);
          }
        }
      },
    });

    // Reading pause on intro
    tl.to({}, { duration: 1.8 });

    for (let i = 1; i < NODE_SEQUENCE.length; i++) {
      const currentNodeIndex = NODE_SEQUENCE[i];
      const label = `step-${i}`;

      // Pan canvas to next node
      tl.to(canvas, {
        x: targetX(currentNodeIndex),
        y: targetY(currentNodeIndex),
        duration: 1.5,
        ease: 'power3.inOut',
        onStart: () => {
          gsap.to(`#path-${i - 1}`, {
            strokeDashoffset: 0,
            duration: 1.2,
            ease: 'power2.inOut',
          });
        },
      }, label);

      // Reveal node card (if not already revealed, e.g. Verifier on second pass)
      tl.to(`#${nodesData[currentNodeIndex].id}`, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.85,
        ease: 'back.out(1.3)',
      }, `${label}+=1.0`);

      // Reading pause
      tl.to({}, { duration: 2 });
    }

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
      tl.kill();
    };
  }, []);
}
