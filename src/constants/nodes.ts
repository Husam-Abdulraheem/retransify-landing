export interface NodeData {
  id: string;
  x: number;
  y: number;
  sdlcPhase: string;
  sdlcStep: number;
  sdlcSub?: string; // e.g. "2 of 2" for nodes sharing a phase
}

export const nodesData: NodeData[] = [
  { id: 'node-intro',       x: 3000, y: 600,   sdlcPhase: 'Trigger',           sdlcStep: 1 },
  { id: 'node-analyst',     x: 1600, y: 2000,  sdlcPhase: 'Requirements',      sdlcStep: 1 },
  { id: 'node-architect',   x: 4400, y: 3200,  sdlcPhase: 'System Design',     sdlcStep: 2 },
  
  // Phase 03 Factory Floor Loop (Diamond/Circle Layout)
  { id: 'node-cleaner',     x: 3000, y: 4600,  sdlcPhase: 'Implementation',    sdlcStep: 3 }, // Top of Loop
  { id: 'node-transformer', x: 4600, y: 5800,  sdlcPhase: 'Implementation',    sdlcStep: 3 }, // Right of Loop
  { id: 'node-verifier',    x: 3000, y: 7000,  sdlcPhase: 'Testing & QA',      sdlcStep: 4 }, // Bottom of Loop
  { id: 'node-healer',      x: 1400, y: 5800,  sdlcPhase: 'Testing & QA',      sdlcStep: 4 }, // Left of Loop
  
  { id: 'node-writer',      x: 1600, y: 8400,  sdlcPhase: 'Implementation',    sdlcStep: 3 },
  { id: 'node-documenter',  x: 4400, y: 9600,  sdlcPhase: 'Deployment',        sdlcStep: 5 },
  { id: 'node-dashboard',   x: 3000, y: 10800, sdlcPhase: 'Maintenance & ROI', sdlcStep: 6 },
];

// The actual path sequence, demonstrating the loop from Verifier -> Healer -> Verifier
export const NODE_SEQUENCE = [0, 1, 2, 3, 4, 5, 6, 5, 7, 8, 9];

export const SDLC_COLORS: Record<number, string> = {
  1: '#6366f1', // Requirements  → indigo
  2: '#22d3ee', // System Design → cyan
  3: '#10b981', // Implementation→ emerald
  4: '#f43f5e', // Testing & QA  → rose
  5: '#f59e0b', // Deployment    → amber
  6: '#a855f7', // Maintenance   → purple
};
