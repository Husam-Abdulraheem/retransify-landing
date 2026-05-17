import React, { useState, useEffect, useRef } from 'react';

type WriterState = 'idle' | 'writing' | 'written';

interface WriterLog {
  id: number;
  text: string;
  type: 'info' | 'success';
}

export const ASTWriter: React.FC = () => {
  const [state, setState] = useState<WriterState>('idle');
  const [progress, setProgress] = useState<number>(0);
  const [logs, setLogs] = useState<WriterLog[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (state === 'writing') {
      interval = setInterval(() => {
        setProgress((prev) => {
          const next = prev + 5;
          if (next >= 100) {
            clearInterval(interval);
            setState('written');
            setLogs((prevLogs) => [
              ...prevLogs,
              { id: 4, text: '[DISK] 🚀 Syncing workspace disk buffers. 100% committed.', type: 'success' },
              { id: 5, text: '[COMMIT] ✓ Native card assets deployed successfully.', type: 'success' }
            ]);
            return 100;
          }

          // Progressive logs triggered by percentage thresholds
          if (next === 20) {
            setLogs((prevLogs) => [
              ...prevLogs,
              { id: 1, text: '[FS] 📁 Created workspace folder structure: /src', type: 'info' }
            ]);
          } else if (next === 50) {
            setLogs((prevLogs) => [
              ...prevLogs,
              { id: 2, text: '[WRITE] 💾 Wrote file: /src/components/NativeCard.tsx', type: 'info' }
            ]);
          } else if (next === 80) {
            setLogs((prevLogs) => [
              ...prevLogs,
              { id: 3, text: '[WRITE] 💾 Wrote stylesheet: /src/styles/styles.ts', type: 'info' }
            ]);
          }

          return next;
        });
      }, 80);
    }

    return () => clearInterval(interval);
  }, [state]);

  const startWriting = () => {
    setState('writing');
    setProgress(0);
    setLogs([
      { id: 0, text: '[WRITE] ⚡ Committer Writer spawned. Buffering targets.', type: 'info' }
    ]);
  };

  const resetWriter = () => {
    setState('idle');
    setProgress(0);
    setLogs([]);
  };

  // Viewport observer to trigger autostart
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && state === 'idle') {
          startWriting();
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
    if (state === 'written') {
      const timer = setTimeout(() => {
        resetWriter();
      }, 5000); // Wait 5 seconds in success state, then loop again
      return () => clearTimeout(timer);
    }
  }, [state]);

  return (
    <div
      ref={containerRef}
      style={{
        width: '840px',
        height: '260px',
        background: 'rgba(10, 10, 28, 0.45)',
        border: '1.5px solid rgba(255, 255, 255, 0.15)',
        borderRadius: '20px',
        overflow: 'hidden',
        backdropFilter: 'blur(16px)',
        boxShadow: state === 'written' 
          ? '0 24px 80px rgba(0,0,0,0.6), 0 0 50px rgba(0,92,255,0.2)' 
          : '0 24px 80px rgba(0,0,0,0.6), 0 0 40px rgba(0,92,255,0.1)',
        display: 'grid',
        gridTemplateColumns: '1.1fr 1fr',
        textAlign: 'left',
        transition: 'all 0.5s ease-in-out',
        animation: state === 'written' ? 'neon-green-flash 0.8s ease-in-out' : 'none',
      }}
    >
      {/* Left Column: Workspace File Explorer */}
      <div
        style={{
          padding: '16px 20px',
          borderRight: '1px solid rgba(255, 255, 255, 0.08)',
          background: 'rgba(0, 0, 0, 0.25)',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
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
          <span style={{ fontFamily: 'var(--font-code)', fontSize: '11px', color: 'var(--blue)', fontWeight: 700, letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--blue)', boxShadow: '0 0 8px var(--blue)' }} />
            WORKSPACE_FILE_TREE
          </span>
          <span style={{ fontFamily: 'var(--font-code)', fontSize: '10px', color: state === 'written' ? '#10b981' : state === 'writing' ? 'var(--blue)' : 'rgba(255,255,255,0.3)', fontWeight: 600 }}>
            {state === 'written' ? '✓ SYNCED (LOOP)' : state === 'writing' ? `WRITING_${progress}%` : 'STANDBY'}
          </span>
        </div>

        {/* VS-Code Sidebar Simulation */}
        <div
          style={{
            fontFamily: 'var(--font-code)',
            fontSize: '11px',
            lineHeight: '1.8',
            color: 'rgba(255, 255, 255, 0.85)',
            background: 'rgba(5, 5, 12, 0.4)',
            padding: '10px 14px',
            borderRadius: '8px',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            height: '130px',
            overflowY: 'auto',
          }}
        >
          <div style={{ color: 'rgba(255,255,255,0.45)' }}>📁 retransify-mobile-workspace</div>
          <div style={{ paddingLeft: '12px' }}>
            <div style={{ color: 'rgba(255,255,255,0.5)' }}>📁 src</div>
            <div style={{ paddingLeft: '12px' }}>
              <div style={{ color: 'rgba(255,255,255,0.65)' }}>📁 components</div>
              <div 
                style={{ 
                  paddingLeft: '12px', 
                  color: state === 'written' ? '#10b981' : progress >= 50 ? 'var(--blue)' : 'rgba(255,255,255,0.4)', 
                  fontWeight: progress >= 50 ? 'bold' : 'normal',
                  transition: 'all 0.2s',
                }}
              >
                📄 NativeCard.tsx {progress >= 50 && (state === 'written' ? '✓' : '...')}
              </div>
              
              <div style={{ color: 'rgba(255,255,255,0.65)' }}>📁 styles</div>
              <div 
                style={{ 
                  paddingLeft: '12px', 
                  color: state === 'written' ? '#10b981' : progress >= 80 ? 'var(--blue)' : 'rgba(255,255,255,0.4)', 
                  fontWeight: progress >= 80 ? 'bold' : 'normal',
                  transition: 'all 0.2s',
                }}
              >
                📄 styles.ts {progress >= 80 && (state === 'written' ? '✓' : '...')}
              </div>
            </div>
          </div>
        </div>

        {/* Trigger / Status bars */}
        <div style={{ marginTop: '10px' }}>
          {state === 'idle' ? (
            <button
              onClick={startWriting}
              style={{
                width: '100%',
                fontFamily: 'var(--font-code)',
                fontSize: '11px',
                fontWeight: 700,
                color: '#fff',
                background: 'var(--blue)',
                boxShadow: '0 0 15px rgba(0, 92, 255, 0.4)',
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
                e.currentTarget.style.boxShadow = '0 0 22px rgba(0, 92, 255, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 0 15px rgba(0, 92, 255, 0.4)';
              }}
            >
              💾 COMMIT WRITER FILES
            </button>
          ) : state === 'writing' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {/* Progress Bar Container */}
              <div
                style={{
                  width: '100%',
                  height: '6px',
                  background: 'rgba(255,255,255,0.06)',
                  borderRadius: '3px',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    width: `${progress}%`,
                    height: '100%',
                    background: 'var(--blue)',
                    boxShadow: '0 0 8px var(--blue)',
                    transition: 'width 0.1s linear',
                  }}
                />
              </div>
              <div style={{ fontFamily: 'var(--font-code)', fontSize: '9px', color: 'var(--blue)', textAlign: 'center', textTransform: 'uppercase', fontWeight: 600 }}>
                WRITING DISK CYLINDERS... {progress}%
              </div>
            </div>
          ) : (
            <button
              onClick={resetWriter}
              style={{
                width: '100%',
                fontFamily: 'var(--font-code)',
                fontSize: '11px',
                fontWeight: 700,
                color: '#fff',
                background: 'rgba(0,92,255,0.15)',
                border: '1px solid rgba(0,92,255,0.35)',
                borderRadius: '8px',
                padding: '8px 16px',
                cursor: 'pointer',
                textAlign: 'center',
                textTransform: 'uppercase',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(0,92,255,0.25)';
                e.currentTarget.style.transform = 'scale(1.01)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(0,92,255,0.15)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              ↺ RESET AND RE-WRITE DEPLOYMENT
            </button>
          )}
        </div>
      </div>

      {/* Right Column: Progressive Workspace Committer Logs */}
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
          AST_COMMITTER_CONSOLE_LOG
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {logs.length > 0 ? (
            logs.map((log) => (
              <div
                key={log.id}
                style={{
                  fontFamily: 'var(--font-code)',
                  fontSize: '10.5px',
                  lineHeight: '1.45',
                  color: log.type === 'info' ? 'rgba(255,255,255,0.65)' : '#10b981',
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
              <span className="blink" style={{ fontSize: '16px', display: 'block', marginBottom: '8px', color: 'var(--blue)' }}>
                💾
              </span>
              Standby. Ready to compile and write native workspace...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
