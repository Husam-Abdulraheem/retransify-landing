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
    <div
      style={{
        position: 'relative',
        width: 1200,
        minHeight: 620,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '30px 0',
      }}
    >
      {/* 8K Atmospheric environmental background */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
        <img
          src={imgSrc}
          alt={title}
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
      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', marginTop: 30 }}>
        {/* Step subtitle */}
        <div
          style={{
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            color: 'rgba(255, 255, 255, 0.7)',
            marginBottom: 12,
            textShadow: '0 4px 24px rgba(0, 0, 0, 0.8)',
          }}
        >
          {t(role)}
        </div>

        {/* Futuristic display title (Michroma) */}
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 38,
            fontWeight: 700,
            color: '#fff',
            lineHeight: 1.2,
            marginBottom: 20,
            letterSpacing: '1px',
            textTransform: 'uppercase',
            textShadow: '0 12px 48px rgba(0, 0, 0, 0.8)',
          }}
        >
          {t(title)}
        </h2>

        {/* Dynamic code tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center' }}>
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
                backdropFilter: 'blur(16px)',
                background: 'rgba(0, 0, 0, 0.4)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
                ...(t.color ? { color: t.color, borderColor: t.color } : {}),
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
