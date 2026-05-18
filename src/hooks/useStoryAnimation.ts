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

    const targetX = (i: number) => -nodesData[i].x + window.innerWidth / 2;
    const targetY = (i: number) => {
      const centerY = -nodesData[i].y + window.innerHeight / 2;
      
      // On mobile viewports (width <= 768px), shift the camera view upward
      if (window.innerWidth <= 768) {
        if (i === 4) {
          // Section 5 (TransformerNode) is exceptionally tall due tostacked panels
          return centerY - 160;
        }
        return centerY - 80;
      } else {
        // On desktop, shift Section 5 upward by 140px since the SplitIDE panel is taller
        if (i === 4) {
          return centerY - 140;
        }
        // Slightly shift other interactive sections upward by 40px to center them comfortably
        if (i === 1 || i === 3 || i === 5 || i === 6 || i === 7 || i === 8 || i === 9) {
          return centerY - 40;
        }
      }
      return centerY;
    };

    // Center on intro node initially
    gsap.set(canvas, { x: targetX(0), y: targetY(0) });
    let activeIndex = 0;
    let isAnimating = false;
    let allowSnap = true;

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

    // Register active scroll progress offsets for all 11 sequential steps
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
      { step: 11, progress: snapPoints[11] }, // Release & Thanks (Conclusion)
    ]);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: master,
        start: 'top top',
        end: '+=11000', // Extend scroll height slightly to make step 11 transition feel spacious
        scrub: 0.8,
        pin: true,
        invalidateOnRefresh: true,
        snap: {
          snapTo: (value) => {
            if (!allowSnap) return value;
            let closest = snapPoints[0];
            let minDiff = Infinity;
            snapPoints.forEach((p) => {
              const diff = Math.abs(p - value);
              if (diff < minDiff) {
                minDiff = diff;
                closest = p;
              }
            });
            return closest;
          },
          duration: { min: 0.6, max: 1.2 },
          delay: 0.25,
          ease: 'power3.out',
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
          
          activeIndex = closestIndex;

          // Map closest timeline sequence index to our 11 HUD steps
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
          else if (closestIndex === 11) activeStep = 11;

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
        x: () => targetX(currentNodeIndex),
        y: () => targetY(currentNodeIndex),
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

    const handleKeyDown = (e: KeyboardEvent) => {
      const trigger = ScrollTrigger.getById('story-trigger');
      if (!trigger) return;

      // Ignore all keyboard input if the camera is currently in flight
      if (isAnimating) {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ' || e.key === 'PageDown' ||
            e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'PageUp') {
          e.preventDefault();
        }
        return;
      }

      let nextIndex = activeIndex;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault();
        nextIndex = Math.min(activeIndex + 1, snapPoints.length - 1);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        nextIndex = Math.max(activeIndex - 1, 0);
      }

      if (nextIndex !== activeIndex) {
        isAnimating = true; // Lock keyboard input immediately
        activeIndex = nextIndex; // Update target index immediately
        const targetProgress = snapPoints[nextIndex];
        const targetScroll = trigger.start + targetProgress * (trigger.end - trigger.start);

        allowSnap = false; // Temporarily disable ScrollTrigger snapping during programmatic scroll to prevent double-snapping fights

        const scrollObj = { y: window.scrollY };
        gsap.to(scrollObj, {
          y: targetScroll,
          duration: 1.6,
          ease: 'power3.inOut',
          overwrite: 'auto',
          onUpdate: () => {
            window.scrollTo(0, scrollObj.y);
          },
          onComplete: () => {
            allowSnap = true; // Re-enable snapping instantly
            isAnimating = false; // Release lock
          }
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      ScrollTrigger.getAll().forEach(st => st.kill());
      tl.kill();
    };
  }, []);
}
