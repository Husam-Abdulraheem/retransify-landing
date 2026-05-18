import React, { useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../../hooks/useLanguage';

interface StepItem {
  step: number;
  progress: number;
}

interface HUDSidebarProps {
  activeStep: number;
  steps: StepItem[];
}

export const HUDSidebar: React.FC<HUDSidebarProps> = ({ activeStep, steps }) => {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const { t } = useLanguage();

  // Define step metadata for display
  const stepMetadata: Record<number, { label: string; numberStr: string; color: string }> = {
    1: { label: 'Introduction', numberStr: '01', color: 'var(--blue)' },
    2: { label: 'Lead Analyst', numberStr: '02', color: '#6366f1' }, // indigo
    3: { label: 'System Architect', numberStr: '03', color: '#22d3ee' }, // cyan
    4: { label: 'Code Cleaner', numberStr: '04', color: '#14b8a6' }, // teal
    5: { label: 'Native Engineer', numberStr: '05', color: '#10b981' }, // emerald
    6: { label: 'QA Inspector', numberStr: '06', color: '#f43f5e' }, // rose
    7: { label: 'Self-Healing Fixer', numberStr: '07', color: '#f59e0b' }, // amber
    8: { label: 'Committer Writer', numberStr: '08', color: '#06b6d4' }, // cyan
    9: { label: 'Release Manager', numberStr: '09', color: '#a855f7' }, // purple
    10: { label: 'Efficiency Spectrum', numberStr: '10', color: '#a855f7' }, // purple
    11: { label: 'Release & Thanks', numberStr: '11', color: '#005cff' }, // brand blue
  };

  const handleStepClick = (stepNum: number) => {
    // Find the registered progress offset for this step
    const matched = steps.find((s) => s.step === stepNum);
    if (!matched) return;

    const trigger = ScrollTrigger.getById('story-trigger');
    if (trigger) {
      // Calculate absolute scroll position based on target progress
      const targetScroll = trigger.start + matched.progress * (trigger.end - trigger.start);
      
      const scrollObj = { y: window.scrollY };
      gsap.to(scrollObj, {
        y: targetScroll,
        duration: 1.0,
        ease: 'power3.inOut',
        overwrite: 'auto',
        onUpdate: () => {
          window.scrollTo(0, scrollObj.y);
        }
      });
    }
  };

  // Determine active progress ratio of the vertical HUD line (10 steps intervals)
  const activeRatio = activeStep > 0 ? (activeStep - 1) / 10 : 0;

  return (
    <div
      style={{
        position: 'fixed',
        right: '40px',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '20px',
        userSelect: 'none',
        pointerEvents: 'auto',
      }}
    >
      {/* Immersive Frosted Glass HUD Panel Container */}
      <div
        style={{
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1.2px solid rgba(255, 255, 255, 0.12)',
          borderRadius: '24px',
          padding: '24px 20px',
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          boxShadow: '0 30px 100px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255,255,255,0.1), 0 0 40px rgba(255, 255, 255, 0.01)',
          display: 'flex',
          gap: '14px',
          position: 'relative',
        }}
      >
        {/* Step Text Labels Column */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-end', gap: '14px', paddingRight: '4px' }}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((num) => {
            const isActive = activeStep === num;
            const isHovered = hoveredStep === num;
            const meta = stepMetadata[num];
            const label = t(`hud.sidebar.title${num}`);

            return (
              <div
                key={num}
                onClick={() => handleStepClick(num)}
                onMouseEnter={() => setHoveredStep(num)}
                onMouseLeave={() => setHoveredStep(null)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  opacity: isActive || isHovered ? 1 : 0.35,
                  transform: isHovered ? 'translateX(-4px)' : 'translateX(0)',
                  // Beautiful glass capsule pill behind active or hovered sidebar items
                  padding: '6px 12px',
                  borderRadius: '10px',
                  background: isActive 
                    ? 'rgba(255, 255, 255, 0.06)' 
                    : isHovered 
                    ? 'rgba(255, 255, 255, 0.02)' 
                    : 'transparent',
                  border: isActive 
                    ? '1.2px solid rgba(255, 255, 255, 0.12)' 
                    : isHovered 
                    ? '1px solid rgba(255, 255, 255, 0.06)' 
                    : '1px solid transparent',
                  backdropFilter: isActive || isHovered ? 'blur(10px)' : 'none',
                  boxShadow: isActive ? '0 4px 12px rgba(0,0,0,0.1)' : 'none',
                }}
              >
                {/* Monospace Step Number */}
                <span
                  style={{
                    fontFamily: 'var(--font-code)',
                    fontSize: '10px',
                    color: isActive ? meta.color : 'rgba(255,255,255,0.4)',
                    fontWeight: 700,
                  }}
                >
                  [{meta.numberStr}]
                </span>

                {/* Display step label in high-end uppercase */}
                <span
                  style={{
                    fontFamily: 'var(--font-code)',
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '1.2px',
                    textTransform: 'uppercase',
                    color: '#fff',
                    textShadow: isActive ? `0 0 12px ${meta.color}88` : 'none',
                  }}
                >
                  {label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Vertical Progress Connector Line Layer */}
        <div style={{ position: 'relative', width: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* Background Track Line */}
          <div
            style={{
              position: 'absolute',
              top: '6px',
              bottom: '6px',
              width: '2px',
              background: 'rgba(255, 255, 255, 0.08)',
              borderRadius: '1px',
            }}
          />

          {/* Active Filled Progress Line */}
          <div
            style={{
              position: 'absolute',
              top: '6px',
              height: `calc(${activeRatio * 100}% )`,
              width: '2px',
              background: 'linear-gradient(to bottom, var(--blue), var(--cyan))',
              boxShadow: '0 0 12px var(--blue)',
              borderRadius: '1px',
              transition: 'height 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />

          {/* Indicator Dot Connectors Column */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', zIndex: 2, gap: '20px' }}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((num) => {
              const isActive = activeStep === num;
              const isHovered = hoveredStep === num;
              const meta = stepMetadata[num];

              return (
                <div
                  key={num}
                  onClick={() => handleStepClick(num)}
                  onMouseEnter={() => setHoveredStep(num)}
                  onMouseLeave={() => setHoveredStep(null)}
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: isActive ? meta.color : 'rgba(10, 10, 20, 0.9)',
                    border: isActive
                      ? `2px solid #fff`
                      : isHovered
                      ? `2px solid ${meta.color}`
                      : '2px solid rgba(255, 255, 255, 0.2)',
                    cursor: 'pointer',
                    boxShadow: isActive
                      ? `0 0 16px ${meta.color}, inset 0 0 4px rgba(0,0,0,0.5)`
                      : 'none',
                    transform: isHovered || isActive ? 'scale(1.2)' : 'scale(1)',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {/* Miniature inner pulse center dot */}
                  {isActive && (
                    <span
                      style={{
                        width: '4px',
                        height: '4px',
                        borderRadius: '50%',
                        background: '#fff',
                        boxShadow: '0 0 6px #fff',
                        animation: 'hud-pulse 1.5s infinite ease-in-out',
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
