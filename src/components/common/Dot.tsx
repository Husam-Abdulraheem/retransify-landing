import React from 'react';

interface DotProps {
  color: string;
}

/**
 * A pulsing, glowing dynamic indicator dot used as a node entry point connector.
 */
export const Dot: React.FC<DotProps> = ({ color }) => {
  return (
    <div
      style={{
        width: 16,
        height: 16,
        borderRadius: '50%',
        marginBottom: 24,
        background: color,
        color,
        boxShadow: `0 0 24px ${color}`,
        position: 'relative',
        border: '2px solid rgba(255, 255, 255, 0.8)',
      }}
    />
  );
};
