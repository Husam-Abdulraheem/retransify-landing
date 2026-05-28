import React, { useState } from 'react';
import { nodesData, SDLC_COLORS } from '../../constants/nodes';
import { NodeWrapper } from '../common/NodeWrapper';
import { useTyping } from '../../hooks/useTyping';
import { useLanguage } from '../../hooks/useLanguage';

interface TechBadgeItem {
  key: string;
  name: string;
  img: string;
}

const techBadges: TechBadgeItem[] = [
  { key: 'react', name: 'React', img: '/assets/techstack/react-svgrepo-com .svg' },
  { key: 'typescript', name: 'TypeScript', img: '/assets/techstack/typescript-official-svgrepo-com.svg' },
  { key: 'expo', name: 'Expo', img: '/assets/techstack/expo-svgrepo-com.svg' },
  { key: 'langgraph', name: 'LangGraph', img: '/assets/techstack/langgraph-seeklogo-2.svg' },
  { key: 'gemini', name: 'Gemini', img: '/assets/techstack/gemini-new-seeklogo.svg' },
  { key: 'vectordb', name: 'Vector DB', img: '/assets/techstack/database-svgrepo-com.svg' },
  { key: 'nodejs', name: 'Node.js', img: '/assets/techstack/nodejs-icon-svgrepo-com.svg' },
  { key: 'tsmorph', name: 'ts-morph', img: '/assets/techstack/ts-morph.svg' },
];

const techColors: Record<string, string> = {
  react: 'rgba(97, 218, 251, 0.45)',
  typescript: 'rgba(49, 120, 198, 0.45)',
  expo: 'rgba(255, 255, 255, 0.5)',
  langgraph: 'rgba(52, 211, 153, 0.45)',
  gemini: 'rgba(236, 72, 153, 0.45)',
  vectordb: 'rgba(245, 158, 11, 0.45)',
  nodejs: 'rgba(132, 204, 22, 0.45)',
  tsmorph: 'rgba(20, 184, 166, 0.45)',
};

const TechBadge: React.FC<{ idKey: string; name: string; img: string }> = ({ idKey, name, img }) => {
  const [hovered, setHovered] = useState(false);
  const glowColor = techColors[idKey] || 'rgba(139, 92, 246, 0.45)';

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        width: '66px',
        transition: 'transform 0.25s cubic-bezier(0.25, 0.8, 0.25, 1)',
        transform: hovered ? 'scale(1.08)' : 'scale(1)',
        cursor: 'default',
        userSelect: 'none',
      }}
    >
      {/* Circle White/Silver Background with brand-specific hover color glow */}
      <div 
        style={{
          width: '38px',
          height: '38px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%)',
          border: '1.2px solid rgba(255, 255, 255, 0.95)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '6px',
          boxShadow: hovered 
            ? `0 0 14px ${glowColor}, 0 4px 10px rgba(0, 0, 0, 0.35), inset 0 1px 1px rgba(255,255,255,1)` 
            : '0 3px 6px rgba(0, 0, 0, 0.2), inset 0 1px 1px rgba(255,255,255,0.8)',
          transition: 'all 0.25s cubic-bezier(0.25, 0.8, 0.25, 1)',
          transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
        }}
      >
        <img 
          src={img} 
          alt={name} 
          loading="eager"
          decoding="async"
          style={{ 
            height: '100%', 
            width: '100%', 
            objectFit: 'contain',
            transition: 'transform 0.25s ease',
            transform: hovered ? 'scale(1.06)' : 'scale(1)',
          }} 
        />
      </div>
      <span 
        style={{
          fontSize: '10.5px',
          color: hovered ? '#ffffff' : 'rgba(255, 255, 255, 0.6)',
          fontFamily: 'var(--font-code)',
          fontWeight: hovered ? 700 : 500,
          textAlign: 'center',
          transition: 'color 0.25s ease, font-weight 0.25s ease',
          whiteSpace: 'nowrap',
          textShadow: hovered ? '0 0 4px rgba(255,255,255,0.3)' : 'none',
        }}
      >
        {name}
      </span>
    </div>
  );
};

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
        @keyframes neon-pulse-dot {
          0%, 100% { opacity: 0.5; transform: scale(0.95); filter: drop-shadow(0 0 2px #a855f7); }
          50% { opacity: 1; transform: scale(1.05); filter: drop-shadow(0 0 6px #a855f7); }
        }
        .neon-pulse-active {
          animation: neon-pulse-dot 2s infinite ease-in-out;
        }
        @keyframes open-source-pulse {
          0%, 100% { opacity: 0.5; transform: scale(0.9); }
          50% { opacity: 1; transform: scale(1.15); filter: drop-shadow(0 0 4px #10b981); }
        }
        .os-pulse-active {
          animation: open-source-pulse 2s infinite ease-in-out;
        }
      ` }} />

      {/* Premium Open Source Badge Indicator */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 18 }}>
        <div style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: '8px',
          padding: '5px 14px', 
          borderRadius: '30px', 
          background: 'rgba(255, 255, 255, 0.03)', 
          border: '1px solid rgba(255, 255, 255, 0.08)', 
          color: 'rgba(255, 255, 255, 0.85)', 
          fontFamily: 'var(--font-code)',
          fontSize: '10px',
          fontWeight: 600,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255,255,255,0.05)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          userSelect: 'none',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.3)';
          e.currentTarget.style.background = 'rgba(16, 185, 129, 0.02)';
          e.currentTarget.style.boxShadow = '0 6px 24px rgba(16, 185, 129, 0.05), inset 0 1px 0 rgba(255,255,255,0.08)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
          e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255,255,255,0.05)';
        }}
        >
          {/* Subtle green pulsing indicator */}
          <span 
            className="os-pulse-active"
            style={{ 
              width: '6px', 
              height: '6px', 
              borderRadius: '50%', 
              background: '#10b981',
              boxShadow: '0 0 6px #10b981',
              display: 'inline-block',
            }} 
          />
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255, 255, 255, 0.6)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
          <span style={{ fontSize: '9.5px' }}>{t('node.intro.openSource')}</span>
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

      <div className="terminal" style={{ marginBottom: 24 }}>
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

      {/* Cinematic Horizontal Glassmorphic Tech Stack Panel */}
      <div 
        style={{
          position: 'relative',
          width: '100%',
          padding: '24px 16px 16px 16px',
          background: 'rgba(6, 6, 16, 0.65)',
          border: '1.5px solid rgba(139, 92, 246, 0.35)',
          borderRadius: '20px',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.05), 0 0 30px rgba(139, 92, 246, 0.1)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '6px',
          marginTop: '24px',
          marginBottom: '32px',
        }}
      >
        {/* Intersecting Top Border Title Glass Badge */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'rgba(12, 10, 24, 0.88)',
            border: '1.2px solid rgba(139, 92, 246, 0.45)',
            borderRadius: '30px',
            padding: '4px 18px',
            color: 'rgba(255, 255, 255, 0.9)',
            fontFamily: 'var(--font-code)',
            fontSize: '12px',
            fontWeight: 600,
            whiteSpace: 'nowrap',
            letterSpacing: '0.08em',
            userSelect: 'none',
            boxShadow: '0 4px 12px rgba(0,0,0,0.4), 0 0 10px rgba(139, 92, 246, 0.15)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          {/* Pulsing neon indicator dot */}
          <span 
            className="neon-pulse-active"
            style={{ 
              width: '6px', 
              height: '6px', 
              borderRadius: '50%', 
              background: '#a855f7',
              boxShadow: '0 0 8px #a855f7',
              display: 'inline-block',
              transition: 'all 0.3s ease',
            }} 
          />
          <span>{t('node.techStack.title')}</span>
        </div>

        {techBadges.map((badge) => (
          <TechBadge key={badge.key} idKey={badge.key} name={badge.name} img={badge.img} />
        ))}
      </div>
    </NodeWrapper>
  );
};

