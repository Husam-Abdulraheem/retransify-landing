import React, { useState, useEffect, useRef } from 'react';

type HealerPhase = 'idle' | 'scanning' | 'healed';

interface HealerLog {
  id: number;
  text: string;
  type: 'info' | 'warn' | 'success' | 'agent';
}

export const ASTHealer: React.FC = () => {
  const [phase, setPhase] = useState<HealerPhase>('idle');
  const [logs, setLogs] = useState<HealerLog[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const startHealingSurgery = () => {
    setPhase('scanning');
    setLogs([
      { id: 1, text: '[REPAIR] ⚡ Laser target verified. Spawning Healer Thread.', type: 'agent' }
    ]);

    // Progressive logging timeline synced to laser sweep
    setTimeout(() => {
      setLogs((prev) => [
        ...prev,
        { id: 2, text: "[DIAGNOSIS] 🔍 Found type mismatch (string vs number) at 'padding'.", type: 'warn' }
      ]);
    }, 450);

    setTimeout(() => {
      setLogs((prev) => [
        ...prev,
        { id: 3, text: ' [SURGERY] ✂️ Removing string literal \'"24px"\' from AST.', type: 'info' }
      ]);
    }, 900);

    setTimeout(() => {
      setLogs((prev) => [
        ...prev,
        { id: 4, text: ' [SURGERY] 💉 Injected compliant numeric literal: 24.', type: 'success' }
      ]);
    }, 1350);

    setTimeout(() => {
      setPhase('healed');
      setLogs((prev) => [
        ...prev,
        { id: 5, text: '[COMPILED] 🎉 Sandbox build succeeded. Zero errors.', type: 'success' }
      ]);
    }, 1800);
  };

  const resetSurgery = () => {
    setPhase('idle');
    setLogs([]);
  };

  // Viewport observer to trigger autostart
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && phase === 'idle') {
          startHealingSurgery();
        }
      },
      { threshold: 0.15 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [phase]);

  // Success state auto-loop reset
  useEffect(() => {
    if (phase === 'healed') {
      const timer = setTimeout(() => {
        resetSurgery();
      }, 5000); // Hold healed state for 5 seconds, then loop reset
      return () => clearTimeout(timer);
    }
  }, [phase]);

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
        boxShadow: phase === 'healed' 
          ? '0 24px 80px rgba(0,0,0,0.6), 0 0 50px rgba(16,185,129,0.2)' 
          : '0 24px 80px rgba(0,0,0,0.6), 0 0 40px rgba(245,158,11,0.15)',
        display: 'grid',
        gridTemplateColumns: '1.1fr 1fr',
        textAlign: 'left',
        position: 'relative',
        transition: 'box-shadow 0.5s ease-in-out',
        animation: phase === 'healed' ? 'neon-green-flash 0.8s ease-in-out' : 'none',
      }}
    >
      {/* Left Column: AST Code Surgery Board */}
      <div
        style={{
          padding: '16px 20px',
          borderRight: '1px solid rgba(255, 255, 255, 0.08)',
          background: 'rgba(0, 0, 0, 0.25)',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          position: 'relative',
          overflow: 'hidden',
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
          <span style={{ fontFamily: 'var(--font-code)', fontSize: '11px', color: 'var(--amber)', fontWeight: 700, letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: phase === 'healed' ? '#10b981' : 'var(--amber)', boxShadow: phase === 'healed' ? '0 0 8px #10b981' : '0 0 8px var(--amber)' }} />
            AST_SURGERY_BOARD
          </span>
          <span style={{ fontFamily: 'var(--font-code)', fontSize: '10px', color: phase === 'healed' ? '#10b981' : '#f43f5e', fontWeight: 600 }}>
            {phase === 'healed' ? '✓ STATUS: HEALED (LOOP)' : '⚠️ STATUS: 1_ERROR_FOUND'}
          </span>
        </div>

        {/* Code Box Area */}
        <div
          style={{
            fontFamily: 'var(--font-code)',
            fontSize: '12px',
            lineHeight: '1.6',
            color: '#e2e8f0',
            background: 'rgba(5, 5, 12, 0.4)',
            padding: '12px 16px',
            borderRadius: '10px',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            height: '130px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Laser Sweep Beam Effect */}
          {phase === 'scanning' && (
            <div
              style={{
                position: 'absolute',
                left: 0,
                width: '100%',
                height: '3px',
                background: 'linear-gradient(to right, rgba(16,185,129,0) 0%, rgba(16,185,129,1) 50%, rgba(16,185,129,0) 100%)',
                boxShadow: '0 0 12px rgba(16,185,129,0.8), 0 0 20px rgba(16,185,129,1)',
                animation: 'laser-sweep 1.8s ease-in-out forwards',
                pointerEvents: 'none',
                zIndex: 5,
              }}
            />
          )}

          {/* Code syntax */}
          <div>
            <span style={{ color: '#a855f7' }}>const</span> <span style={{ color: '#22d3ee' }}>styles</span> = StyleSheet.create(&#123;
          </div>
          <div style={{ paddingLeft: '14px' }}>
            card: &#123;
          </div>
          
          {/* The broken / healed line */}
          <div 
            style={{ 
              paddingLeft: '28px',
              position: 'relative',
              background: phase === 'healed' ? 'rgba(16, 185, 129, 0.08)' : phase === 'scanning' ? 'rgba(245, 158, 11, 0.05)' : 'rgba(244, 63, 94, 0.08)',
              borderLeft: phase === 'healed' ? '2.5px solid #10b981' : '2.5px solid #f43f5e',
              transition: 'all 0.4s ease-in-out',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingRight: '10px'
            }}
          >
            {phase === 'healed' ? (
              <>
                <span>
                  <span style={{ color: '#22d3ee' }}>padding</span>: <span style={{ color: '#10b981' }}>24</span>, <span style={{ color: 'rgba(16,185,129,0.6)', fontStyle: 'italic' }}>// ✓ Healed programmatically</span>
                </span>
                <span style={{ color: '#10b981', fontSize: '10px', fontWeight: 700 }}>+ FIX</span>
              </>
            ) : (
              <>
                <span>
                  <span style={{ color: '#22d3ee' }}>padding</span>: <span style={{ color: '#f43f5e' }}>"24px"</span>, <span style={{ color: 'rgba(255,255,255,0.2)', fontStyle: 'italic' }}>// ✖ Type ts(2322)</span>
                </span>
                <span style={{ color: '#f43f5e', fontSize: '10px', fontWeight: 700 }}>✖ ERROR</span>
              </>
            )}
          </div>

          <div style={{ paddingLeft: '14px' }}>
            &#125;
          </div>
          <div>
            &#125;);
          </div>
        </div>

        {/* Action Button Container */}
        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          {phase === 'idle' ? (
            <button
              onClick={startHealingSurgery}
              style={{
                flex: 1,
                fontFamily: 'var(--font-code)',
                fontSize: '11px',
                fontWeight: 700,
                color: '#060610',
                background: 'var(--amber)',
                boxShadow: '0 0 15px rgba(245, 158, 11, 0.4)',
                border: 'none',
                borderRadius: '8px',
                padding: '8px 16px',
                cursor: 'pointer',
                textAlign: 'center',
                textTransform: 'uppercase',
                transition: 'all 0.2s ease-in-out',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.02)';
                e.currentTarget.style.boxShadow = '0 0 22px rgba(245, 158, 11, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 0 15px rgba(245, 158, 11, 0.4)';
              }}
            >
              🚀 INITIATE AST LASER REPAIR
            </button>
          ) : phase === 'scanning' ? (
            <div
              style={{
                flex: 1,
                fontFamily: 'var(--font-code)',
                fontSize: '11px',
                fontWeight: 700,
                color: 'var(--amber)',
                background: 'rgba(245,158,11,0.06)',
                border: '1px solid rgba(245,158,11,0.25)',
                borderRadius: '8px',
                padding: '8px 16px',
                textAlign: 'center',
                textTransform: 'uppercase',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <span className="blink" style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--amber)' }} />
              RUNNING AUTO-SURGERY LABS...
            </div>
          ) : (
            <button
              onClick={resetSurgery}
              style={{
                flex: 1,
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
                transition: 'all 0.2s ease-in-out',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(16,185,129,0.25)';
                e.currentTarget.style.transform = 'scale(1.02)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(16,185,129,0.15)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              ↺ RESET AND RE-COMPILE EXPO BUILD
            </button>
          )}
        </div>
      </div>

      {/* Right Column: AI Healing Diagnostics Log */}
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
        {/* Diagnostic log header */}
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
          AI_HEALER_DIAGNOSTICS_STREAM
        </div>

        {/* Logs stream area */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {logs.length > 0 ? (
            logs.map((log, idx) => (
              <div
                key={`${log.id}-${idx}`}
                style={{
                  fontFamily: 'var(--font-code)',
                  fontSize: '10.5px',
                  lineHeight: '1.45',
                  color: log.type === 'info' ? 'rgba(255,255,255,0.65)' : log.type === 'warn' ? '#febc2e' : log.type === 'success' ? '#10b981' : 'var(--amber)',
                  paddingLeft: '10px',
                  position: 'relative',
                  animation: 'fade-in 0.15s ease-out'
                }}
              >
                <span style={{ position: 'absolute', left: 0, color: 'rgba(255,255,255,0.15)', userSelect: 'none' }}>&gt;</span>
                {log.text}
              </div>
            ))
          ) : (
            <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-code)', fontSize: '11px', marginTop: '30px' }}>
              <span className="blink" style={{ fontSize: '16px', display: 'block', marginBottom: '8px', color: 'var(--amber)' }}>
                🩹
              </span>
              Standby. Waiting for laser surgery trigger...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
