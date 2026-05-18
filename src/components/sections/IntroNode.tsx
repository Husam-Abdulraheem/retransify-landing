import React, { useState } from 'react';
import { nodesData, SDLC_COLORS } from '../../constants/nodes';
import { NodeWrapper } from '../common/NodeWrapper';
import { useTyping } from '../../hooks/useTyping';
import { useLanguage } from '../../hooks/useLanguage';

export const IntroNode: React.FC = () => {
  const color = SDLC_COLORS[1];
  const cmd = useTyping('npx retransify ./my-web-app');
  const n = nodesData[0];
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('npx retransify ./my-web-app');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <NodeWrapper id={n.id} x={n.x} y={n.y} width={640}>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spin-react {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .react-logo-spin {
          animation: spin-react 20s linear infinite;
          transform-origin: center;
        }
      ` }} />

      {/* Premium Open Source Badge Indicator */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 18 }}>
        <div style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: '8px',
          padding: '6px 14px', 
          borderRadius: '30px', 
          background: 'rgba(52, 211, 153, 0.04)', 
          border: '1.2px solid rgba(52, 211, 153, 0.25)', 
          color: '#34d399', 
          fontFamily: 'var(--font-code)',
          fontSize: '10px',
          fontWeight: 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          boxShadow: '0 4px 20px rgba(52, 211, 153, 0.05)',
          backdropFilter: 'blur(12px)',
          userSelect: 'none',
        }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 9.9-1" />
          </svg>
          <span>{t('node.intro.openSource')}</span>
        </div>
      </div>

      {/* Cinematic Main Tagline */}
      <h1 className="hero-sub" style={{ 
        fontSize: 22, 
        fontWeight: 500, 
        color: 'rgba(255, 255, 255, 0.9)', 
        lineHeight: 1.6,
        maxWidth: '520px',
        margin: '0 auto 28px auto',
        textAlign: 'center',
        letterSpacing: '-0.01em'
      }}>
        {t('node.intro.tagline')}
      </h1>

      <div className="terminal" style={{ marginBottom: 40 }}>
        <div className="terminal__chrome">
          <span className="terminal__dot" style={{ background: '#ff5f57' }} />
          <span className="terminal__dot" style={{ background: '#febc2e' }} />
          <span className="terminal__dot" style={{ background: '#28c840' }} />
          <span className="terminal__title">{t('node.intro.bash')}</span>
        </div>
        <div className="terminal__body" style={{ padding: 32 }}>
          <div className="terminal__prompt-line" style={{ fontSize: 18, display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ color: 'var(--blue)', marginRight: 16 }}>&gt;</span>
              <span style={{ color: '#fff', fontWeight: 600 }}>{cmd}</span>
              <span
                className="blink"
                style={{
                  display: 'inline-block',
                  width: 10,
                  height: 22,
                  background: color,
                  verticalAlign: 'middle',
                  marginLeft: 4,
                }}
              />
            </div>

            <button
              onClick={handleCopy}
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                border: copied ? '1px solid rgba(52, 211, 153, 0.3)' : '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '8px',
                padding: '6px 12px',
                color: copied ? '#34d399' : 'rgba(255, 255, 255, 0.65)',
                fontFamily: 'var(--font-code)',
                fontSize: '11px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                backdropFilter: 'blur(8px)',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: copied ? '0 0 12px rgba(52, 211, 153, 0.1)' : 'none',
                outline: 'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                if (!copied) e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
                if (!copied) e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = 'scale(0.95)';
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              {copied ? (
                <>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>{t('copied')}</span>
                </>
              ) : (
                <>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                  <span>{t('copy')}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: 24, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Feature Conversion Pill */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 16,
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          padding: '12px 28px',
          borderRadius: '40px',
          fontFamily: 'var(--font-code)',
          fontSize: '14px',
          color: 'rgba(255,255,255,0.7)',
          boxShadow: '0 12px 32px rgba(0,0,0,0.3)',
          backdropFilter: 'blur(8px)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <svg 
              width="20" 
              height="20" 
              viewBox="-11.5 -10.23174 23 20.46348" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="react-logo-spin"
            >
              <circle cx="0" cy="0" r="2.05" fill="#61dafb"/>
              <g stroke="#61dafb" strokeWidth="1" fill="none">
                <ellipse rx="11" ry="4.2"/>
                <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
                <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
              </g>
            </svg>
            <span style={{ color: '#fff', fontWeight: 600 }}>React Web</span>
          </div>

          <span style={{ color: 'var(--blue)', fontWeight: 800 }}>➜</span>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <svg 
                width="20" 
                height="20" 
                viewBox="-11.5 -10.23174 23 20.46348" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="react-logo-spin"
              >
                <circle cx="0" cy="0" r="2.05" fill="#61dafb"/>
                <g stroke="#61dafb" strokeWidth="1" fill="none">
                  <ellipse rx="11" ry="4.2"/>
                  <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
                  <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
                </g>
              </svg>
              <span style={{ color: 'rgba(255,255,255,0.3)', fontWeight: 300, fontSize: '12px' }}>+</span>
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 256 256" 
                xmlns="http://www.w3.org/2000/svg"
                style={{ filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.15))' }}
              >
                <path d="M121.309004,84.6732585 C123.402504,81.5874152 125.694292,81.1950171 127.553451,81.1950171 C129.41261,81.1950171 132.509843,81.5874152 134.604162,84.6732585 C151.106348,107.339593 178.345607,152.492 198.439108,185.798721 C211.542532,207.519499 221.6069,224.201947 223.671721,226.324944 C231.422996,234.294992 242.053551,229.327949 248.230809,220.287799 C254.312201,211.387762 256.000111,205.138399 256.000111,198.471155 C256.000111,193.930186 167.895315,30.0714244 159.022317,16.4322117 C150.48936,3.31359639 147.710044,0 133.105527,0 L122.176721,0 C107.615631,0 105.511479,3.31359639 96.9777022,16.4322117 C88.1055238,30.0714244 0.0001105152,193.930186 0.0001105152,198.471155 C0.0001105152,205.138399 1.68839227,211.387762 7.76991495,220.287799 C13.9471241,229.327949 24.5775965,234.294992 32.3286259,226.324944 C34.3936934,224.201947 44.4580605,207.519499 57.5616485,185.798721 C77.654822,152.492 104.806818,107.339593 121.309004,84.6732585 Z" fill="#ffffff"/>
              </svg>
            </div>
            <span style={{ color: '#fff', fontWeight: 600 }}>React Native</span>
          </div>
        </div>
      </div>
    </NodeWrapper>
  );
};
