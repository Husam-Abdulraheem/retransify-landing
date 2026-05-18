import React, { useState, useEffect, useRef } from 'react';

type ScanState = 'idle' | 'scanning' | 'failed' | 'passed';

interface QARule {
  id: number;
  name: string;
  desc: string;
  status: 'pending' | 'scanning' | 'passed' | 'failed';
}

interface QARadarValidatorProps {
  isSecondPass?: boolean;
}

export const QARadarValidator: React.FC<QARadarValidatorProps> = ({ isSecondPass }) => {
  const [state, setState] = useState<ScanState>('idle');
  const [rules, setRules] = useState<QARule[]>([
    { id: 1, name: 'Rule 01: Typography Wrapper Check', desc: 'Validates all visual text elements wrap in native <Text>.', status: 'pending' },
    { id: 2, name: 'Rule 02: Dimension Unit Sanity', desc: 'Checks styles contain strict platform-compliant numeric units.', status: 'pending' },
    { id: 3, name: 'Rule 03: Native Container Bounds', desc: 'Asserts CSS layouts compile to native-compliant flex containers.', status: 'pending' },
    { id: 4, name: 'Rule 04: Component Export Integrity', desc: 'Verifies React Native syntax default module schema compliance.', status: 'pending' },
  ]);
  const containerRef = useRef<HTMLDivElement>(null);

  const runRadarAudit = () => {
    setState('scanning');
    
    // Reset rules to scanning
    setRules((prev) => prev.map((r) => ({ ...r, status: 'scanning' })));

    // Rule 1 audit complete
    setTimeout(() => {
      setRules((prev) =>
        prev.map((r) => (r.id === 1 ? { ...r, status: 'passed' } : r))
      );
    }, 450);

    if (isSecondPass) {
      // Second Pass -> SUCCESS Audit
      setTimeout(() => {
        setRules((prev) =>
          prev.map((r) => (r.id === 2 ? { ...r, status: 'passed' } : r))
        );
      }, 950);

      setTimeout(() => {
        setRules((prev) =>
          prev.map((r) => (r.id === 3 ? { ...r, status: 'passed' } : r))
        );
      }, 1400);

      setTimeout(() => {
        setRules((prev) =>
          prev.map((r) => (r.id === 4 ? { ...r, status: 'passed' } : r))
        );
      }, 1800);

      setTimeout(() => {
        setState('passed');
      }, 2000);
    } else {
      // First Pass -> FAIL Audit
      setTimeout(() => {
        setRules((prev) =>
          prev.map((r) => (r.id === 2 ? { ...r, status: 'failed' } : r))
        );
      }, 950);

      setTimeout(() => {
        setRules((prev) =>
          prev.map((r) => (r.id === 3 ? { ...r, status: 'passed' } : r))
        );
      }, 1400);

      setTimeout(() => {
        setRules((prev) =>
          prev.map((r) => (r.id === 4 ? { ...r, status: 'passed' } : r))
        );
      }, 1800);

      setTimeout(() => {
        setState('failed');
      }, 2000);
    }
  };

  const resetAudit = () => {
    setState('idle');
    setRules([
      { id: 1, name: 'Rule 01: Typography Wrapper Check', desc: 'Validates all visual text elements wrap in native <Text>.', status: 'pending' },
      { id: 2, name: 'Rule 02: Dimension Unit Sanity', desc: 'Checks styles contain strict platform-compliant numeric units.', status: 'pending' },
      { id: 3, name: 'Rule 03: Native Container Bounds', desc: 'Asserts CSS layouts compile to native-compliant flex containers.', status: 'pending' },
      { id: 4, name: 'Rule 04: Component Export Integrity', desc: 'Verifies React Native syntax default module schema compliance.', status: 'pending' },
    ]);
  };

  // Viewport observer to trigger autostart
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && state === 'idle') {
          runRadarAudit();
        }
      },
      { threshold: 0.15 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [state, isSecondPass]);

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
        boxShadow: state === 'failed' 
          ? '0 24px 80px rgba(0,0,0,0.6), 0 0 50px rgba(244,63,94,0.2)' 
          : state === 'passed'
          ? '0 24px 80px rgba(0,0,0,0.6), 0 0 50px rgba(16,185,129,0.2)'
          : '0 24px 80px rgba(0,0,0,0.6), 0 0 40px rgba(0,92,255,0.1)',
        display: 'grid',
        gridTemplateColumns: '0.85fr 1.15fr',
        textAlign: 'left',
        transition: 'all 0.5s ease-in-out',
      }}
    >
      {/* Left Column: Cyber Radar Panel */}
      <div
        style={{
          padding: '16px 20px',
          borderRight: '1px solid rgba(255, 255, 255, 0.08)',
          background: 'rgba(0, 0, 0, 0.25)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '100%',
        }}
      >
        {/* Panel Title */}
        <div style={{ alignSelf: 'flex-start', borderBottom: '1px dashed rgba(255,255,255,0.06)', width: '100%', paddingBottom: '6px', marginBottom: '8px' }}>
          <span style={{ fontFamily: 'var(--font-code)', fontSize: '11px', color: state === 'passed' ? '#10b981' : '#f43f5e', fontWeight: 700, letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: state === 'passed' ? '#10b981' : '#f43f5e', boxShadow: state === 'passed' ? '0 0 8px #10b981' : '0 0 8px #f43f5e' }} />
            QA_RADAR_SCANNER
          </span>
        </div>

        {/* Circular Radar Visual */}
        <div
          style={{
            width: '115px',
            height: '115px',
            borderRadius: '50%',
            border: state === 'failed' 
              ? '2px solid rgba(244, 63, 94, 0.4)' 
              : state === 'passed'
              ? '2px solid rgba(16, 185, 129, 0.4)'
              : state === 'scanning' 
              ? '2px solid rgba(254, 188, 46, 0.3)' 
              : '2px solid rgba(255, 255, 255, 0.1)',
            background: 'rgba(5, 5, 12, 0.6)',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            boxShadow: state === 'failed' 
              ? 'inset 0 0 20px rgba(244, 63, 94, 0.25)' 
              : state === 'passed'
              ? 'inset 0 0 20px rgba(16, 185, 129, 0.25)'
              : 'none',
            transition: 'all 0.4s',
          }}
        >
          {/* Concentric rings */}
          <div style={{ position: 'absolute', width: '75px', height: '75px', borderRadius: '50%', border: state === 'passed' ? '1px dashed rgba(16,185,129,0.1)' : '1px dashed rgba(255,255,255,0.05)' }} />
          <div style={{ position: 'absolute', width: '40px', height: '40px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.03)' }} />

          {/* Radar sweep lines */}
          {state === 'scanning' && (
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: isSecondPass
                  ? 'conic-gradient(from 0deg, rgba(16, 185, 129, 0.4) 0deg, rgba(16, 185, 129, 0) 90deg)'
                  : 'conic-gradient(from 0deg, rgba(244, 63, 94, 0.4) 0deg, rgba(244, 63, 94, 0) 90deg)',
                animation: 'radar-spin 1.5s linear infinite',
                transformOrigin: 'center center',
                pointerEvents: 'none',
              }}
            />
          )}

          {/* Central status badge */}
          <div
            style={{
              fontFamily: 'var(--font-code)',
              fontSize: '10px',
              fontWeight: 700,
              color: state === 'failed' ? '#f43f5e' : state === 'passed' ? '#10b981' : state === 'scanning' ? '#febc2e' : 'rgba(255,255,255,0.4)',
              textAlign: 'center',
              zIndex: 3,
            }}
          >
            {state === 'failed' ? (
              <span className="blink" style={{ color: '#f43f5e' }}>
                🚨 FAIL<br /><span style={{ fontSize: '7.5px', opacity: 0.8 }}>1 ERR (LOOP)</span>
              </span>
            ) : state === 'passed' ? (
              <span style={{ color: '#10b981' }}>
                🛡️ PASS<br /><span style={{ fontSize: '7.5px', opacity: 0.8 }}>100% OK</span>
              </span>
            ) : state === 'scanning' ? (
              <span>AUDITING...</span>
            ) : (
              <span>STANDBY</span>
            )}
          </div>
        </div>

        {/* Audit trigger buttons */}
        <div style={{ width: '100%', marginTop: '6px' }}>
          {state === 'idle' ? (
            <button
              onClick={runRadarAudit}
              style={{
                width: '100%',
                fontFamily: 'var(--font-code)',
                fontSize: '11px',
                fontWeight: 700,
                color: '#fff',
                background: isSecondPass ? 'rgba(16, 185, 129, 0.15)' : 'rgba(244, 63, 94, 0.15)',
                border: isSecondPass ? '1.5px solid rgba(16, 185, 129, 0.45)' : '1.5px solid rgba(244, 63, 94, 0.45)',
                borderRadius: '8px',
                padding: '6px 12px',
                cursor: 'pointer',
                textAlign: 'center',
                textTransform: 'uppercase',
                transition: 'all 0.2s',
                boxShadow: isSecondPass ? '0 0 10px rgba(16, 185, 129, 0.15)' : '0 0 10px rgba(244, 63, 94, 0.15)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = isSecondPass ? 'rgba(16, 185, 129, 0.25)' : 'rgba(244, 63, 94, 0.25)';
                e.currentTarget.style.transform = 'scale(1.01)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = isSecondPass ? 'rgba(16, 185, 129, 0.15)' : 'rgba(244, 63, 94, 0.15)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              🔬 RUN VERIFIER SCAN
            </button>
          ) : state === 'scanning' ? (
            <div
              style={{
                width: '100%',
                fontFamily: 'var(--font-code)',
                fontSize: '10px',
                fontWeight: 700,
                color: '#febc2e',
                background: 'rgba(254,188,46,0.06)',
                border: '1px solid rgba(254,188,46,0.2)',
                borderRadius: '8px',
                padding: '6px 12px',
                textAlign: 'center',
                textTransform: 'uppercase',
              }}
            >
              COMPLIANCE AUDIT ACTIVE...
            </div>
          ) : (
            <button
              onClick={resetAudit}
              style={{
                width: '100%',
                fontFamily: 'var(--font-code)',
                fontSize: '10px',
                fontWeight: 700,
                color: '#fff',
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '8px',
                padding: '6px 12px',
                cursor: 'pointer',
                textAlign: 'center',
                textTransform: 'uppercase',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
                e.currentTarget.style.transform = 'scale(1.01)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              ↺ RESET VERIFIER
            </button>
          )}
        </div>
      </div>

      {/* Right Column: Rules Checklist Matrix */}
      <div
        style={{
          padding: '16px 20px',
          background: 'rgba(0, 0, 0, 0.35)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
        }}
      >
        {/* Header */}
        <div
          style={{
            fontFamily: 'var(--font-code)',
            fontSize: '10px',
            color: 'rgba(255, 255, 255, 0.35)',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            borderBottom: '1px dashed rgba(255,255,255,0.06)',
            paddingBottom: '6px',
            userSelect: 'none',
          }}
        >
          COMPLIANCE_GOVERNANCE_MATRIX
        </div>

        {/* Rules Grid list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', margin: '8px 0' }}>
          {rules.map((rule) => {
            const isScanning = rule.status === 'scanning';
            const isPassed = rule.status === 'passed';
            const isFailed = rule.status === 'failed';
            
            return (
              <div
                key={rule.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '6px 12px',
                  background: isFailed ? 'rgba(244,63,94,0.06)' : isPassed ? 'rgba(16,185,129,0.04)' : 'rgba(255,255,255,0.02)',
                  border: isFailed ? '1px solid rgba(244,63,94,0.25)' : isPassed ? '1px solid rgba(16,185,129,0.15)' : '1px solid rgba(255,255,255,0.04)',
                  borderRadius: '10px',
                  transition: 'all 0.3s',
                }}
              >
                {/* Rule Title & brief desc */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span style={{ fontFamily: 'var(--font-code)', fontSize: '11px', color: isFailed ? '#f43f5e' : isPassed ? '#e2e8f0' : 'rgba(255,255,255,0.7)', fontWeight: isFailed || isPassed ? 700 : 'normal' }}>
                    {rule.name}
                  </span>
                  <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.35)', fontWeight: 500 }}>
                    {rule.desc}
                  </span>
                </div>

                {/* Status Badges */}
                <div
                  style={{
                    fontFamily: 'var(--font-code)',
                    fontSize: '9.5px',
                    fontWeight: 700,
                  }}
                >
                  {isFailed ? (
                    <span style={{ color: '#f43f5e', background: 'rgba(244,63,94,0.15)', padding: '2px 8px', borderRadius: '4px', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                      ✖ FAIL
                    </span>
                  ) : isPassed ? (
                    <span style={{ color: '#10b981', background: 'rgba(16,185,129,0.15)', padding: '2px 8px', borderRadius: '4px' }}>
                      ✓ PASS
                    </span>
                  ) : isScanning ? (
                    <span className="blink" style={{ color: '#febc2e' }}>
                      ● SCAN...
                    </span>
                  ) : (
                    <span style={{ color: 'rgba(255,255,255,0.2)' }}>PENDING</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Dynamic Warning Alert Bar on Error */}
        <div
          style={{
            height: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '6px',
            background: state === 'failed' 
              ? 'rgba(244, 63, 94, 0.15)' 
              : state === 'passed' 
              ? 'rgba(16, 185, 129, 0.15)' 
              : 'rgba(255,255,255,0.03)',
            border: state === 'failed' 
              ? '1px solid rgba(244, 63, 94, 0.3)' 
              : state === 'passed' 
              ? '1px solid rgba(16, 185, 129, 0.3)' 
              : '1px solid transparent',
            color: state === 'failed' 
              ? '#f43f5e' 
              : state === 'passed' 
              ? '#10b981' 
              : 'rgba(255,255,255,0.25)',
            fontFamily: 'var(--font-code)',
            fontSize: '9.5px',
            fontWeight: 600,
            textTransform: 'uppercase',
            transition: 'all 0.3s',
            userSelect: 'none',
          }}
        >
          {state === 'failed' ? (
            <span className="blink" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              ⚠️ COMPLIANCE ALARM: Non-numeric dimension unit "24px" found in Rule 02!
            </span>
          ) : state === 'passed' ? (
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 700 }}>
              🛡️ AST SECURED: 100% PLATFORM COMPLIANCE VERIFIED!
            </span>
          ) : (
            <span>SYSTEM GOVERNANCE COMPLIANT</span>
          )}
        </div>
      </div>
    </div>
  );
};
