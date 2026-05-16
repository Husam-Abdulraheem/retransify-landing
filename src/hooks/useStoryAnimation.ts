import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { nodesData } from '../constants/nodes';

gsap.registerPlugin(ScrollTrigger);

export function useStoryAnimation(masterRef: React.RefObject<HTMLDivElement | null>, canvasRef: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    if (!masterRef.current || !canvasRef.current) return;

    const w = window.innerWidth;
    const h = window.innerHeight;

    // Helper to get target canvas translation to center a node exactly
    const getTarget = (nodeIndex: number) => {
      const node = nodesData[nodeIndex];
      return {
        x: -node.x + w / 2,
        y: -node.y + h / 2
      };
    };

    // 1. Set initial position to center the first node
    const initPos = getTarget(0);
    gsap.set(canvasRef.current, { x: initPos.x, y: initPos.y });

    // 2. Build the main timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: masterRef.current,
        start: "top top",
        end: "+=10000",
        scrub: 1, // Smooth scrubbing
        pin: true, // Pinned master container
      }
    });

    // 3. Loop through nodes and build animations
    for (let i = 0; i < nodesData.length - 1; i++) {
      const nextTarget = getTarget(i + 1);
      const label = `step-${i}`;
      
      tl.addLabel(label);

      // Move canvas to next node
      tl.to(canvasRef.current, {
        x: nextTarget.x,
        y: nextTarget.y,
        duration: 2,
        ease: "power2.inOut"
      }, label);

      // Draw SVG connection line simultaneously
      tl.to(`#path-${i}`, {
        strokeDashoffset: 0,
        duration: 2,
        ease: "power2.inOut"
      }, label);

      // Fade in the next node halfway through the movement
      tl.to(`#${nodesData[i + 1].id}`, {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "back.out(1.5)"
      }, `${label}+=1`);

      // Add empty tween for reading pause
      tl.to({}, { duration: 1 });
    }

    return () => {
      tl.kill();
    };
  }, []);
}
