import React from 'react';
import { nodesData, SDLC_COLORS } from '../../constants/nodes';
import { NodeWrapper } from '../common/NodeWrapper';
import { useTyping } from '../../hooks/useTyping';
import { useLanguage } from '../../hooks/useLanguage';

export const IntroNode: React.FC = () => {
  const color = SDLC_COLORS[1];
  const cmd = useTyping('npx retransify ./my-web-app');
  const n = nodesData[0];
  const { t } = useLanguage();

  return (
    <NodeWrapper id={n.id} x={n.x} y={n.y} width={640}>
      <div className="terminal" style={{ marginBottom: 40 }}>
        <div className="terminal__chrome">
          <span className="terminal__dot" style={{ background: '#ff5f57' }} />
          <span className="terminal__dot" style={{ background: '#febc2e' }} />
          <span className="terminal__dot" style={{ background: '#28c840' }} />
          <span className="terminal__title">{t('node.intro.bash')}</span>
        </div>
        <div className="terminal__body" style={{ padding: 32 }}>
          <div className="terminal__prompt-line" style={{ fontSize: 18 }}>
            <span style={{ color: '#6366f1', marginRight: 16 }}>➜</span>
            <span style={{ color: 'var(--blue)', marginRight: 16 }}>~/projects</span>
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
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: 24, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Cinematic Main Tagline */}
        <p className="hero-sub" style={{ 
          fontSize: 22, 
          fontWeight: 500, 
          color: 'rgba(255, 255, 255, 0.9)', 
          lineHeight: 1.6,
          maxWidth: '520px',
          margin: '0 auto 24px auto',
          letterSpacing: '-0.01em'
        }}>
          {t('node.intro.tagline')}
        </p>

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
          <span style={{ color: '#fff', fontWeight: 600 }}>React Web</span>
          <span style={{ color: 'var(--blue)', fontWeight: 800 }}>➜</span>
          <span style={{ color: '#fff', fontWeight: 600 }}>React Native</span>
        </div>

        {/* Open Source Status Badges Bar */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '12px',
          marginTop: '24px',
          fontFamily: 'var(--font-code)',
          fontSize: '11px',
          letterSpacing: '0.5px'
        }}>
          <span style={{ 
            padding: '6px 12px', 
            borderRadius: '8px', 
            background: 'rgba(255, 255, 255, 0.03)', 
            border: '1.2px solid rgba(52, 211, 153, 0.3)', 
            color: '#34d399', 
            fontWeight: 700,
            backdropFilter: 'blur(12px)',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3), inset 0 0 10px rgba(52, 211, 153, 0.05)'
          }}>
            {t('node.intro.openSource')}
          </span>
          <span style={{ 
            padding: '6px 12px', 
            borderRadius: '8px', 
            background: 'rgba(255, 255, 255, 0.03)', 
            border: '1.2px solid rgba(96, 165, 250, 0.3)', 
            color: '#60a5fa', 
            fontWeight: 700,
            backdropFilter: 'blur(12px)',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3), inset 0 0 10px rgba(96, 165, 250, 0.05)'
          }}>
            {t('node.intro.npmPublic')}
          </span>
        </div>
      </div>
    </NodeWrapper>
  );
};
