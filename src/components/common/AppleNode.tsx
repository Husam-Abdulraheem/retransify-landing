import React from 'react';
import { useLanguage } from '../../hooks/useLanguage';

interface TagItem {
  label: string;
  color?: string;
}

interface AppleNodeProps {
  imgSrc: string;
  title: string;
  role: string;
  tags: TagItem[];
  children?: React.ReactNode;
}

/**
 * A highly immersive cinematic node displaying Apple-style text hierarchy,
 * an atmospheric 8k environmental background, and futuristic code tags.
 */
export const AppleNode: React.FC<AppleNodeProps> = ({
  imgSrc,
  title,
  role,
  tags,
  children,
}) => {
  const { t } = useLanguage();
  return (
    <div className="apple-node-card">
      {/* 8K Atmospheric environmental background */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
        <img
          src={imgSrc}
          alt={title}
          loading="lazy"
          decoding="async"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 75%)',
            maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 75%)',
            opacity: 0.15,
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* Cinematic typography layer */}
      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', marginTop: 30, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Step subtitle */}
        <div className="apple-node-subtitle">
          {t(role)}
        </div>

        {/* Futuristic display title (Michroma) */}
        <h2 className="apple-node-title">
          {t(title)}
        </h2>

        {/* Dynamic code tags */}
        <div className="apple-node-tags">
          {tags.map((t) => (
            <span
              key={t.label}
              className="visual-tag"
              style={{
                fontFamily: 'var(--font-code)',
                fontSize: 13,
                fontWeight: 600,
                padding: '8px 18px',
                borderRadius: 40,
                backdropFilter: 'blur(12px)',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
                color: 'rgba(255, 255, 255, 0.8)',
                transition: 'all 0.3s ease',
                ...(t.color
                  ? {
                      color: t.color,
                      borderColor: `${t.color}44`,
                      background: 'rgba(255, 255, 255, 0.04)',
                      boxShadow: `0 8px 32px rgba(0, 0, 0, 0.25), 0 0 16px ${t.color}22, inset 0 1px 0 rgba(255, 255, 255, 0.05)`,
                    }
                  : {}),
              }}
            >
              {t.label}
            </span>
          ))}
        </div>

        {/* Custom Interactive Children Slot */}
        {children && (
          <div style={{ marginTop: 24, width: '100%', display: 'flex', justifyContent: 'center' }}>
            {children}
          </div>
        )}
      </div>
    </div>
  );
};
