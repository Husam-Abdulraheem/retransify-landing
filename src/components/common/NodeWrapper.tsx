import React from 'react';

interface NodeWrapperProps {
  id: string;
  x: number;
  y: number;
  width?: number;
  children: React.ReactNode;
}

/**
 * A basic layout wrapper that absolutely positions a node inside the Figma dotted canvas.
 * Restored to a super-performant GPU-accelerated static layer for maximum scrolling frame rates.
 */
export const NodeWrapper: React.FC<NodeWrapperProps> = ({ 
  id, 
  x, 
  y, 
  width = 500, 
  children 
}) => {
  return (
    <div
      id={id}
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width,
        transform: 'translate(-50%, -50%) translateZ(0)',
        willChange: 'transform',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {children}
    </div>
  );
};
