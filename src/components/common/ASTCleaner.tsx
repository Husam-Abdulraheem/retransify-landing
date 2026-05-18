import React, { useState, useEffect, useRef } from 'react';

type CleanerState = 'idle' | 'cleaning' | 'cleaned';

interface CleaningLog {
  id: number;
  text: string;
  type: 'info' | 'success' | 'warn';
}

export const ASTCleaner: React.FC = () => {
  const [state, setState] = useState<CleanerState>('idle');
  const [logs, setLogs] = useState<CleaningLog[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const startSanitization = () => {
    setState('cleaning');
    setLogs([
      { id: 1, text: '[AI_SCAN] 🧠 Initialized semantic analysis of source flow.', type: 'info' }
    ]);

    setTimeout(() => {
      setLogs((prev) => [
        ...prev,
        { id: 2, text: "[PRUNING] ✂️ Pruned unused import: 'unusedHelper'.", type: 'warn' }
      ]);
    }, 450);

    setTimeout(() => {
      setLogs((prev) => [
        ...prev,
        { id: 3, text: "[PRUNING] ✂️ Pruned unreferenced declaration: 'debugToken'.", type: 'warn' }
      ]);
    }, 900);

    setTimeout(() => {
      setLogs((prev) => [
        ...prev,
        { id: 4, text: '[PRUNING] ✂️ Pruned active development console logs.', type: 'info' }
      ]);
    }, 1350);

    setTimeout(() => {
      setState('cleaned');
      setLogs((prev) => [
        ...prev,
        { id: 5, text: '[AI_DONE] 💎 Optimized functional bundle compiled successfully.', type: 'success' }
      ]);
    }, 1800);
  };

  const resetCleaner = () => {
    setState('idle');
    setLogs([]);
  };

  // Viewport observer to trigger autostart
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && state === 'idle') {
          startSanitization();
        }
      },
      { threshold: 0.15 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [state]);

  // Success state auto-loop reset
  useEffect(() => {
    if (state === 'cleaned') {
      const timer = setTimeout(() => {
        resetCleaner();
      }, 5000); // Wait 5 seconds in success state, then loop again
      return () => clearTimeout(timer);
    }
  }, [state]);

  return (
    <div
      ref={containerRef}
      className="scrolly-interactive-card"
      style={{
        width: '840px',
        height: '260px',
        background: 'rgba(10, 10, 28, 0.45)',
        border: '1.5px solid rgba(255, 255, 255, 0.15)',
        borderRadius: '20px',
        overflow: 'hidden',
        backdropFilter: 'blur(16px)',
        boxShadow: state === 'cleaned' 
          ? '0 24px 80px rgba(0,0,0,0.6), 0 0 50px rgba(16,185,129,0.2)' 
          : '0 24px 80px rgba(0,0,0,0.6), 0 0 40px rgba(16,185,129,0.1)',
        display: 'grid',
        gridTemplateColumns: '1.15fr 1fr',
        textAlign: 'left',
        position: 'relative',
        transition: 'all 0.5s ease-in-out',
        animation: state === 'cleaned' ? 'neon-green-flash 0.8s ease-in-out' : 'none',
      }}
    >
      {/* Left Column: AI Cleaner Workspace */}
      <div
        style={{
          padding: '16px 20px',
          borderRight: '1px solid rgba(255, 255, 255, 0.08)',
          background: 'rgba(0, 0, 0, 0.25)',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Panel Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '10px',
            borderBottom: '1px dashed rgba(255, 255, 255, 0.06)',
            paddingBottom: '6px',
            userSelect: 'none',
          }}
        >
          <span style={{ fontFamily: 'var(--font-code)', fontSize: '11px', color: 'var(--emerald)', fontWeight: 700, letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981' }} />
            AI_DEAD_CODE_ELIMINATOR
          </span>
          <span style={{ fontFamily: 'var(--font-code)', fontSize: '10px', color: state === 'cleaned' ? '#10b981' : '#febc2e', fontWeight: 600 }}>
            {state === 'cleaned' ? '✓ PRUNED (LOOPING)' : '🧠 AI_ANALYSIS_ACTIVE'}
          </span>
        </div>

        {/* Code Grid Split */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 1fr', gap: '10px', height: '130px', overflow: 'hidden' }}>
          {/* Raw Web Code with Dead Wood */}
          <div
            style={{
              fontFamily: 'var(--font-code)',
              fontSize: '9.5px',
              lineHeight: '1.45',
              color: 'rgba(255,255,255,0.7)',
              background: 'rgba(5, 5, 12, 0.4)',
              padding: '10px',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              position: 'relative',
              overflowY: 'auto',
            }}
          >
            <div style={{ fontSize: '8.5px', color: '#f43f5e', fontWeight: 700, marginBottom: '4px', borderBottom: '1px solid rgba(244,63,94,0.15)', paddingBottom: '2px' }}>
              DIRTY_DEVELOPMENT_SOURCE
            </div>
            {state === 'cleaning' && (
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  width: '100%',
                  height: '3px',
                  background: 'linear-gradient(to right, rgba(16,185,129,0) 0%, rgba(16,185,129,1) 50%, rgba(16,185,129,0) 100%)',
                  boxShadow: '0 0 12px rgba(16,185,129,0.8)',
                  animation: 'laser-sweep 1.8s ease-in-out forwards',
                  zIndex: 5,
                }}
              />
            )}
            
            {/* Unused Imports */}
            <div style={{ textDecoration: state === 'cleaned' ? 'line-through' : 'none', opacity: state === 'cleaned' ? 0.3 : 1, color: '#f43f5e', transition: 'all 0.3s' }}>
              import &#123; unusedHelper &#125; from './utils';
            </div>
            <div style={{ opacity: state === 'cleaned' ? 0.5 : 1 }}>
              import React from 'react';
            </div>
            
            {/* Component */}
            <div style={{ opacity: 1 }}>
              export default function Card() &#123;<br />
              &nbsp;&nbsp;const active = true;
            </div>
            
            {/* Unused variables */}
            <div style={{ textDecoration: state === 'cleaned' ? 'line-through' : 'none', opacity: state === 'cleaned' ? 0.3 : 1, color: '#febc2e', transition: 'all 0.3s' }}>
              &nbsp;&nbsp;const debugToken = "0x89FB";
            </div>
            
            {/* Active consoles */}
            <div style={{ textDecoration: state === 'cleaned' ? 'line-through' : 'none', opacity: state === 'cleaned' ? 0.3 : 1, color: '#febc2e', transition: 'all 0.3s' }}>
              &nbsp;&nbsp;console.log("Initiated Card");
            </div>
            
            <div style={{ opacity: 1 }}>
              &nbsp;&nbsp;return &lt;div&gt;Active&lt;/div&gt;;<br />
              &#125;
            </div>
          </div>

          {/* Compliant Native AST Output */}
          <div
            style={{
              fontFamily: 'var(--font-code)',
              fontSize: '9.5px',
              lineHeight: '1.45',
              color: state === 'cleaned' ? '#10b981' : 'rgba(255,255,255,0.3)',
              background: 'rgba(5, 5, 12, 0.5)',
              padding: '10px',
              borderRadius: '8px',
              border: state === 'cleaned' ? '1px solid rgba(16,185,129,0.3)' : '1px solid rgba(255, 255, 255, 0.05)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: state === 'cleaned' ? 'flex-start' : 'center',
              alignItems: state === 'cleaned' ? 'stretch' : 'center',
              transition: 'all 0.3s',
            }}
          >
            {state === 'cleaned' ? (
              <div style={{ animation: 'fade-in 0.3s ease-out' }}>
                <div style={{ fontSize: '8.5px', color: '#10b981', fontWeight: 700, marginBottom: '4px', borderBottom: '1px solid rgba(16,185,129,0.15)', paddingBottom: '2px' }}>
                  PRISTINE_PRODUCTION_SOURCE
                </div>
                import React from 'react';<br /><br />
                export default function Card() &#123;<br />
                &nbsp;&nbsp;const active = true;<br />
                &nbsp;&nbsp;return &lt;div&gt;Active&lt;/div&gt;;<br />
                &#125;
              </div>
            ) : (
              <div style={{ textAlign: 'center', fontSize: '9px' }}>
                <span className="blink" style={{ color: 'var(--emerald)' }}>●</span> Standby<br />waiting for AI audit
              </div>
            )}
          </div>
        </div>

        {/* Action Button */}
        <div style={{ marginTop: '10px' }}>
          {state === 'idle' ? (
            <button
              onClick={startSanitization}
              style={{
                width: '100%',
                fontFamily: 'var(--font-code)',
                fontSize: '11px',
                fontWeight: 700,
                color: '#060610',
                background: 'var(--emerald)',
                boxShadow: '0 0 15px rgba(16, 185, 129, 0.4)',
                border: 'none',
                borderRadius: '8px',
                padding: '8px 16px',
                cursor: 'pointer',
                textAlign: 'center',
                textTransform: 'uppercase',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.01)';
                e.currentTarget.style.boxShadow = '0 0 22px rgba(16, 185, 129, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 0 15px rgba(16, 185, 129, 0.4)';
              }}
            >
              🧠 RUN AI CODE CLEANER
            </button>
          ) : state === 'cleaning' ? (
            <div
              style={{
                width: '100%',
                fontFamily: 'var(--font-code)',
                fontSize: '11px',
                fontWeight: 700,
                color: 'var(--emerald)',
                background: 'rgba(16,185,129,0.06)',
                border: '1px solid rgba(16,185,129,0.25)',
                borderRadius: '8px',
                padding: '8px 16px',
                textAlign: 'center',
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              <span className="blink" style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--emerald)' }} />
              AI PRUNING & OPTIMIZATION IN PROGRESS...
            </div>
          ) : (
            <button
              onClick={resetCleaner}
              style={{
                width: '100%',
                fontFamily: 'var(--font-code)',
                fontSize: '11px',
                fontWeight: 700,
                color: '#fff',
                background: 'rgba(16,185,129,0.15)',
                border: '1px solid rgba(16,185,129,0.35)',
                borderRadius: '8px',
                padding: '8px 16px',
                cursor: 'pointer',
                textAlign: 'center',
                textTransform: 'uppercase',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(16,185,129,0.25)';
                e.currentTarget.style.transform = 'scale(1.01)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(16,185,129,0.15)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              ↺ RESET AND RE-AUDIT SOURCE
            </button>
          )}
        </div>
      </div>

      {/* Right Column: Progressive Cleaner Logs */}
      <div
        style={{
          padding: '16px 20px',
          background: 'rgba(0, 0, 0, 0.35)',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          overflowY: 'auto',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-code)',
            fontSize: '10px',
            color: 'rgba(255, 255, 255, 0.35)',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            marginBottom: '10px',
            borderBottom: '1px dashed rgba(255,255,255,0.06)',
            paddingBottom: '6px',
            userSelect: 'none',
          }}
        >
          AI_CLEANER_COGNITIVE_LOG
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {logs.length > 0 ? (
            logs.map((log, idx) => (
              <div
                key={`${log.id}-${idx}`}
                style={{
                  fontFamily: 'var(--font-code)',
                  fontSize: '10.5px',
                  lineHeight: '1.45',
                  color: log.type === 'info' ? 'rgba(255,255,255,0.65)' : log.type === 'warn' ? '#febc2e' : '#10b981',
                  paddingLeft: '10px',
                  position: 'relative',
                  animation: 'fade-in 0.15s ease-out',
                }}
              >
                <span style={{ position: 'absolute', left: 0, color: 'rgba(255,255,255,0.15)', userSelect: 'none' }}>&gt;</span>
                {log.text}
              </div>
            ))
          ) : (
            <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-code)', fontSize: '11px', marginTop: '30px' }}>
              <span className="blink" style={{ fontSize: '16px', display: 'block', marginBottom: '8px', color: 'var(--emerald)' }}>
                🧠
              </span>
              Standby. Ready for AI semantic code optimization...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
