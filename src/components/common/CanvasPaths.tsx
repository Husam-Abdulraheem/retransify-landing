import React from 'react';
import { nodesData, NODE_SEQUENCE, SDLC_COLORS } from '../../constants/nodes';

/**
 * Renders the flowchart line paths and visual loop indicators in the background.
 */
export const CanvasPaths: React.FC = () => {
  return (
    <svg
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'visible',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      <defs>
        {/* Dynamic color-shifting linear gradient for the running neon loop */}
        <linearGradient id="neon-loop-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.85" />
          <stop offset="35%" stopColor="#10b981" stopOpacity="0.85" />
          <stop offset="70%" stopColor="#f43f5e" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#a855f7" stopOpacity="0.85" />
        </linearGradient>
      </defs>

      {/* Factory Floor LangGraph Loop Visual Bounding Box & Permanent Neon Circle Track */}
      <g opacity="0.45">
        <path
          d="M 3000 4600 L 3950 5350 L 3000 6100 L 2050 5350 Z"
          fill="none"
          stroke="rgba(255, 255, 255, 0.03)"
          strokeWidth="60"
          strokeLinejoin="round"
        />
        
        {/* Smooth Rounded Diamond Loop background track (Super-ellipse) */}
        <path
          d="M 3000 4600 Q 3950 4600, 3950 5350 Q 3950 6100, 3000 6100 Q 2050 6100, 2050 5350 Q 2050 4600, 3000 4600 Z"
          fill="none"
          stroke="rgba(255, 255, 255, 0.05)"
          strokeWidth="8"
          strokeLinecap="round"
        />
        
        {/* Animated glowing running neon data stream orbiting the loop continuously */}
        <path
          d="M 3000 4600 Q 3950 4600, 3950 5350 Q 3950 6100, 3000 6100 Q 2050 6100, 2050 5350 Q 2050 4600, 3000 4600 Z"
          fill="none"
          stroke="url(#neon-loop-grad)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeDasharray="24 64"
          className="neon-running-loop"
        />

        <ellipse
          cx="3000"
          cy="5350"
          rx="950"
          ry="750"
          fill="none"
          stroke="#22d3ee"
          strokeWidth="2"
          strokeDasharray="10 20"
          opacity="0.2"
        />
        
        <text
          x="3000"
          y="4350"
          fill="#22d3ee"
          fontSize="36"
          fontWeight="800"
          textAnchor="middle"
          letterSpacing="8"
          opacity="0.45"
        >
          LANGGRAPH AGENTIC CYCLE
        </text>
      </g>

      {/* SVG Connecting Flow Paths */}
      <g>
        {NODE_SEQUENCE.slice(0, -1).map((sIdx, i) => {
          const eIdx = NODE_SEQUENCE[i + 1];
          const s = nodesData[sIdx];
          const e = nodesData[eIdx];

          const my = (s.y + e.y) / 2;
          let pathD = `M ${s.x} ${s.y} C ${s.x} ${my}, ${e.x} ${my}, ${e.x} ${e.y}`;

          // Segment i === 5: Verifier -> Healer (first pass)
          // Curves outward/downward
          if (s.id === 'node-verifier' && e.id === 'node-healer') {
            pathD = `M ${s.x} ${s.y} C ${s.x - 200} ${s.y}, ${e.x} ${e.y + 200}, ${e.x} ${e.y}`;
          }
          // Segment i === 6: Healer -> Verifier (second pass return)
          // Curves inward/upward
          else if (s.id === 'node-healer' && e.id === 'node-verifier') {
            pathD = `M ${s.x} ${s.y} C ${s.x + 200} ${s.y - 50}, ${e.x + 50} ${e.y - 200}, ${e.x} ${e.y}`;
          }

          const col = SDLC_COLORS[s.sdlcStep];
          return (
            <g key={i}>
              <path
                d={pathD}
                fill="none"
                stroke={col}
                strokeWidth="8"
                strokeLinecap="round"
                opacity="0.2"
              />
              <path
                id={`path-${i}`}
                d={pathD}
                fill="none"
                stroke={col}
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray={s.id === 'node-healer' ? '10, 10' : 'none'}
                className="sdlc-path"
              />
            </g>
          );
        })}
      </g>
    </svg>
  );
};
