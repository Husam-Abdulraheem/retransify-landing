import React, { useState, useEffect, useRef } from 'react';
import { nodesData, SDLC_COLORS } from '../../constants/nodes';
import { NodeWrapper } from '../common/NodeWrapper';
import { useLanguage } from '../../hooks/useLanguage';

export const DashboardNode: React.FC = () => {
  const { t } = useLanguage();
  const n = nodesData[9];
  const color = SDLC_COLORS[6]; // Purple for step 10 Maintenance phase
  
  const [isFilled, setIsFilled] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Unified IntersectionObserver and animation loop (No cascading renders or synchronous setState)
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsFilled(true);
          
          if (interval) clearInterval(interval);
          interval = setInterval(() => {
            setIsFilled((prev) => !prev);
          }, 5500);
        } else {
          setIsFilled(false);
          if (interval) {
            clearInterval(interval);
            interval = null;
          }
        }
      },
      { threshold: 0.15 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
      if (interval) clearInterval(interval);
    };
  }, []);

  return (
    <NodeWrapper id={n.id} x={n.x} y={n.y} width={900}>
      <div 
        ref={containerRef}
        className="glass-card glass-card--purple" 
        style={{ 
          padding: '24px 32px',
          width: '840px',
          height: '260px',
          borderRadius: '20px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          textAlign: 'left',
          backdropFilter: 'blur(16px)',
          boxShadow: '0 24px 80px rgba(0,0,0,0.6), 0 0 40px rgba(168,85,247,0.12)',
          border: '1.5px solid rgba(255, 255, 255, 0.15)',
          position: 'relative',
        }}
      >
        {/* Header */}
        <div style={{ borderBottom: '1px dashed rgba(255,255,255,0.06)', paddingBottom: '8px', width: '100%' }}>
          <span style={{ fontFamily: 'var(--font-code)', fontSize: '11px', color: color, fontWeight: 700, letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: color, boxShadow: `0 0 8px ${color}` }} />
            {t('node.dashboard.role')}
          </span>
        </div>

        {/* Realistic Conversion Success Rate Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', margin: '12px 0' }}>
          
          {/* Card 1: Small Scale Apps */}
          <div
            style={{
              padding: '14px 16px',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1.2px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '12px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '144px',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', fontFamily: 'var(--font-code)' }}>
                  {t('node.dashboard.smallProjects')}
                </span>
                <span style={{ fontSize: '9px', color: '#10b981', background: 'rgba(16,185,129,0.1)', padding: '2px 6px', borderRadius: '4px', fontFamily: 'var(--font-code)', fontWeight: 700 }}>
                  {t('node.dashboard.highCompliance')}
                </span>
              </div>
              <div style={{ fontSize: '28px', fontWeight: 800, color: '#10b981', lineHeight: '1.1', marginBottom: '6px' }}>
                95% - 100%
              </div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', lineHeight: '1.4' }}>
                {t('node.dashboard.smallDesc')}
              </div>
            </div>

            {/* Glowing Success Progress Bar */}
            <div style={{ marginTop: '8px' }}>
              <div style={{ height: '6px', width: '100%', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
                <div 
                  style={{ 
                    height: '100%', 
                    width: isFilled ? '98%' : '0%', 
                    background: 'linear-gradient(to right, #059669, #10b981)', 
                    borderRadius: '3px',
                    transition: 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: '0 0 8px #10b981'
                  }} 
                  className={isFilled ? 'neon-running-loop' : ''}
                />
              </div>
            </div>
          </div>

          {/* Card 2: Medium Scale Apps */}
          <div
            style={{
              padding: '14px 16px',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1.2px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '12px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '144px',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', fontFamily: 'var(--font-code)' }}>
                  {t('node.dashboard.mediumProjects')}
                </span>
                <span style={{ fontSize: '9px', color: '#22d3ee', background: 'rgba(34,211,238,0.1)', padding: '2px 6px', borderRadius: '4px', fontFamily: 'var(--font-code)', fontWeight: 700 }}>
                  {t('node.dashboard.lightReview')}
                </span>
              </div>
              <div style={{ fontSize: '28px', fontWeight: 800, color: '#22d3ee', lineHeight: '1.1', marginBottom: '6px' }}>
                85% - 90%
              </div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', lineHeight: '1.4' }}>
                {t('node.dashboard.mediumDesc')}
              </div>
            </div>

            {/* Glowing Success Progress Bar */}
            <div style={{ marginTop: '8px' }}>
              <div style={{ height: '6px', width: '100%', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
                <div 
                  style={{ 
                    height: '100%', 
                    width: isFilled ? '88%' : '0%', 
                    background: 'linear-gradient(to right, #0891b2, #22d3ee)', 
                    borderRadius: '3px',
                    transition: 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: '0 0 8px #22d3ee'
                  }} 
                  className={isFilled ? 'neon-running-loop' : ''}
                />
              </div>
            </div>
          </div>

          {/* Card 3: Large Scale Apps */}
          <div
            style={{
              padding: '14px 16px',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1.2px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '12px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '144px',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', fontFamily: 'var(--font-code)' }}>
                  {t('node.dashboard.largeProjects')}
                </span>
                <span style={{ fontSize: '9px', color: '#f59e0b', background: 'rgba(245,158,11,0.1)', padding: '2px 6px', borderRadius: '4px', fontFamily: 'var(--font-code)', fontWeight: 700 }}>
                  {t('node.dashboard.copilotedCode')}
                </span>
              </div>
              <div style={{ fontSize: '28px', fontWeight: 800, color: '#f59e0b', lineHeight: '1.1', marginBottom: '6px' }}>
                65% - 70%
              </div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', lineHeight: '1.4' }}>
                {t('node.dashboard.largeDesc')}
              </div>
            </div>

            {/* Glowing Success Progress Bar */}
            <div style={{ marginTop: '8px' }}>
              <div style={{ height: '6px', width: '100%', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
                <div 
                  style={{ 
                    height: '100%', 
                    width: isFilled ? '68%' : '0%', 
                    background: 'linear-gradient(to right, #d97706, #f59e0b)', 
                    borderRadius: '3px',
                    transition: 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: '0 0 8px #f59e0b'
                  }} 
                  className={isFilled ? 'neon-running-loop' : ''}
                />
              </div>
            </div>
          </div>

        </div>

        {/* Academic Empirical Evaluation Advisory Footer Bar */}
        <div
          style={{
            height: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '6px',
            background: 'rgba(168, 85, 247, 0.08)',
            border: '1px solid rgba(168, 85, 247, 0.2)',
            color: 'rgba(255,255,255,0.8)',
            fontFamily: 'var(--font-code)',
            fontSize: '8.5px',
            fontWeight: 600,
            textTransform: 'uppercase',
            padding: '0 8px',
            userSelect: 'none',
          }}
        >
          {t('node.dashboard.empirical')}
        </div>
      </div>
    </NodeWrapper>
  );
};
