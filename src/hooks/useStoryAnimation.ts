import { useEffect } from 'react';
import React from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { nodesData, NODE_SEQUENCE } from '../constants/nodes';

gsap.registerPlugin(ScrollTrigger);

export function useStoryAnimation(
  masterRef: React.RefObject<HTMLDivElement | null>,
  canvasRef: React.RefObject<HTMLDivElement | null>
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

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: master,
        start: 'top top',
        end: '+=10000',
        scrub: 1.2,
        pin: true,
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
        duration: 2.4,
        ease: 'power2.inOut',
        onStart: () => {
          gsap.to(`#path-${i - 1}`, {
            strokeDashoffset: 0,
            duration: 2.0,
            ease: 'power1.inOut',
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
      }, `${label}+=1.5`);

      // Reading pause
      tl.to({}, { duration: 2 });
    }

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
      tl.kill();
    };
  }, []);
}
