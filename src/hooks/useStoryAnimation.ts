import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Global proxy object to sync GSAP with React Three Fiber
export const cameraProxy = { x: 0, y: 5, z: 15, rx: 0 };

export function useStoryAnimation() {
  useEffect(() => {
    // Reset state on mount
    cameraProxy.x = 0;
    cameraProxy.y = 5;
    cameraProxy.z = 15;
    cameraProxy.rx = 0;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#scroll-container",
        start: "top top",
        end: "bottom bottom",
        scrub: 1, // Smooth scrubbing
      }
    });

    // 0 -> 1: Intro to Node 1 (Requirements - Left)
    tl.to("#terminal-layer", { opacity: 0, filter: "blur(20px)", scale: 1.5, duration: 1 }, 0);
    tl.to(cameraProxy, { x: -1.5, y: -5, z: 5, rx: -0.1, duration: 1 }, 0);
    tl.to("#node-req", { opacity: 1, scale: 1, duration: 0.5 }, 0.5);

    // 1 -> 2: Node 1 to Node 2 (System Design - Right)
    tl.to("#node-req", { opacity: 0, scale: 0.8, y: -50, duration: 0.5 }, 1.5);
    tl.to(cameraProxy, { x: 1.5, y: -25, z: 5, rx: 0.1, duration: 1 }, 1.5);
    tl.to("#node-design", { opacity: 1, scale: 1, duration: 0.5 }, 2);

    // 2 -> 3: Node 2 to Node 3 (Implementation - Right)
    tl.to("#node-design", { opacity: 0, scale: 0.8, y: -50, duration: 0.5 }, 3);
    tl.to(cameraProxy, { x: 1.5, y: -45, z: 5, rx: -0.1, duration: 1 }, 3);
    tl.to("#node-impl", { opacity: 1, scale: 1, duration: 0.5 }, 3.5);

    // 3 -> 4: Node 3 to Node 4 (QA - Left)
    tl.to("#node-impl", { opacity: 0, scale: 0.8, y: -50, duration: 0.5 }, 4.5);
    tl.to(cameraProxy, { x: -1.5, y: -65, z: 5, rx: 0.1, duration: 1 }, 4.5);
    tl.to("#node-qa", { opacity: 1, scale: 1, duration: 0.5 }, 5);
    
    // Simulate QA Healing Glitch automatically
    tl.add(() => {
      document.getElementById('code-error-state')?.classList.add('hidden');
      document.getElementById('code-fixed-state')?.classList.remove('hidden');
      document.getElementById('qa-icon')?.classList.replace('border-rose-500', 'border-emerald-500');
      document.getElementById('qa-icon')?.classList.replace('glow-rose', 'glow-emerald');
      const badge = document.getElementById('qa-badge');
      if (badge) {
        badge.classList.replace('text-rose-400', 'text-emerald-400');
        badge.classList.replace('border-rose-500/30', 'border-emerald-500/30');
        badge.classList.replace('bg-rose-500/10', 'bg-emerald-500/10');
        badge.innerText = "Healed & Verified";
      }
    }, 5.5);

    // 4 -> 5: Node 4 to Node 5 (Deployment - Right)
    tl.to("#node-qa", { opacity: 0, scale: 0.8, y: -50, duration: 0.5 }, 6.5);
    tl.to(cameraProxy, { x: 1.5, y: -85, z: 5, rx: -0.1, duration: 1 }, 6.5);
    tl.to("#node-deploy", { opacity: 1, scale: 1, duration: 0.5 }, 7);

    // 5 -> 6: Node 5 to Node 6 (Maintenance - Left)
    tl.to("#node-deploy", { opacity: 0, scale: 0.8, y: -50, duration: 0.5 }, 8);
    tl.to(cameraProxy, { x: -1.5, y: -105, z: 5, rx: 0.1, duration: 1 }, 8);
    tl.to("#node-maint", { opacity: 1, scale: 1, duration: 0.5 }, 8.5);

    // Animate Counters
    tl.to({val: 0}, { 
      val: 2, 
      duration: 1, 
      onUpdate: function() { 
        const el = document.getElementById("time-counter");
        if (el) el.innerText = Math.floor(this.targets()[0].val).toString();
      }
    }, 8.5);
    tl.to({val: 0}, { 
      val: 0.85, 
      duration: 1, 
      onUpdate: function() { 
        const el = document.getElementById("cost-counter");
        if (el) el.innerText = this.targets()[0].val.toFixed(2);
      }
    }, 8.5);

    // 6 -> Finale (Phone Drop - Center)
    tl.to("#node-maint", { opacity: 0, scale: 0.8, y: -50, duration: 0.5 }, 10);
    tl.to(cameraProxy, { x: 0, y: -125, z: 12, rx: 0, duration: 1.5 }, 10);  
    tl.to("#finale-layer", { opacity: 1, duration: 1 }, 10.5);
    tl.to("#finale-title", { opacity: 1, y: -200, duration: 1 }, 10.5); // Move title up
    tl.to("#finale-cta", { opacity: 1, y: -100, duration: 1 }, 11); // Bring CTA up

    return () => {
      tl.kill();
    };
  }, []);
}
