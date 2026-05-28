import React from 'react';
import { nodesData } from '../../constants/nodes';
import { NodeWrapper } from '../common/NodeWrapper';
import { useLanguage } from '../../hooks/useLanguage';

export const ConclusionNode: React.FC = () => {
  const { t } = useLanguage();
  const n = nodesData[10];

  return (
    <NodeWrapper id={n.id} x={n.x} y={n.y} width={900}>
      <div 
        className="glass-card" 
        style={{
          padding: '44px 40px',
          background: 'rgba(12, 10, 24, 0.45)',
          border: `1.5px solid rgba(0, 92, 255, 0.25)`,
          borderRadius: '32px',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          boxShadow: '0 24px 80px rgba(0,0,0,0.65), 0 0 50px rgba(0, 92, 255, 0.15)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '32px',
          textAlign: 'center',
          transition: 'all 0.4s ease-in-out',
          willChange: 'transform',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.border = `1.5px solid rgba(0, 92, 255, 0.5)`;
          e.currentTarget.style.boxShadow = '0 32px 100px rgba(0,0,0,0.7), 0 0 60px rgba(0, 92, 255, 0.25)';
          e.currentTarget.style.transform = 'scale(1.01)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.border = `1.5px solid rgba(0, 92, 255, 0.25)`;
          e.currentTarget.style.boxShadow = '0 24px 80px rgba(0,0,0,0.65), 0 0 50px rgba(0, 92, 255, 0.15)';
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        {/* Project Branding Logo - logoT.png Enlarged and Rounded with compact padding */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <img 
            src="/assets/logoT.png" 
            alt="retransify" 
            loading="lazy"
            decoding="async" 
            style={{ 
              height: '100px', 
              borderRadius: '20px',
              objectFit: 'contain',
              border: '1.5px solid rgba(255, 255, 255, 0.08)',
              padding: '0 0',
              background: 'rgba(255, 255, 255, 0.01)',
              boxShadow: '0 16px 48px rgba(0, 0, 0, 0.4), 0 0 30px rgba(0, 92, 255, 0.12)',
            }} 
          />
        </div>

        {/* Academic Supervisor Centered Spotlight Card */}
        <div 
          style={{
            width: '100%',
            padding: '24px 32px',
            background: 'rgba(0, 92, 255, 0.03)',
            border: '1.2px solid rgba(0, 92, 255, 0.2)',
            borderRadius: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            boxShadow: 'inset 0 0 20px rgba(0, 92, 255, 0.02)',
          }}
        >
          <span style={{ fontSize: '11px', color: '#005cff', fontWeight: 800, letterSpacing: '2.5px', fontFamily: 'var(--font-code)', textTransform: 'uppercase' }}>
            {t('node.conclusion.advisor')}
          </span>
          <span style={{ fontSize: '26px', color: '#ffffff', fontWeight: 800, letterSpacing: '-0.5px' }}>
            DR. ÖĞR. ÜYESİ Şeyma ÇAĞLAR ÖZHAN
          </span>
          <span style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.45)', fontWeight: 600, fontFamily: 'var(--font-code)', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
            {t('node.conclusion.department')}
          </span>
        </div>
      </div>
    </NodeWrapper>
  );
};

