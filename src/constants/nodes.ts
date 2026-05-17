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
  { id: 'node-analyst',     x: 1600, y: 2000,  sdlcPhase: 'Requirements',      sdlcStep: 2 },
  { id: 'node-architect',   x: 4400, y: 3200,  sdlcPhase: 'System Design',     sdlcStep: 3 },
  
  // Phase 03 Factory Floor Loop (Diamond/Circle Layout) - Compacted and optimized
  { id: 'node-cleaner',     x: 3000, y: 4600,  sdlcPhase: 'Implementation',    sdlcStep: 4 }, // Top of Loop
  { id: 'node-transformer', x: 3950, y: 5350,  sdlcPhase: 'Implementation',    sdlcStep: 5 }, // Right of Loop
  { id: 'node-verifier',    x: 3000, y: 6100,  sdlcPhase: 'Testing & QA',      sdlcStep: 6 }, // Bottom of Loop
  { id: 'node-healer',      x: 2050, y: 5350,  sdlcPhase: 'Testing & QA',      sdlcStep: 7 }, // Left of Loop
  
  { id: 'node-writer',      x: 1600, y: 7200,  sdlcPhase: 'Implementation',    sdlcStep: 8 },
  { id: 'node-documenter',  x: 4400, y: 8300,  sdlcPhase: 'Deployment',        sdlcStep: 9 },
  { id: 'node-dashboard',   x: 3000, y: 9400,  sdlcPhase: 'Maintenance & ROI', sdlcStep: 10 },
];

// The actual path sequence, demonstrating the loop from Verifier -> Healer -> Verifier
export const NODE_SEQUENCE = [0, 1, 2, 3, 4, 5, 6, 5, 7, 8, 9];

export const SDLC_COLORS: Record<number, string> = {
  1: '#6366f1',  // Trigger (Intro) → indigo
  2: '#6366f1',  // Requirements (Analyst) → indigo
  3: '#22d3ee',  // System Design (Architect) → cyan
  4: '#10b981',  // Implementation (Cleaner) → emerald
  5: '#10b981',  // Implementation (Transformer) → emerald
  6: '#f43f5e',  // Testing & QA (Verifier) → rose
  7: '#f43f5e',  // Testing & QA (Healer) → rose
  8: '#10b981',  // Implementation (Writer) → emerald
  9: '#f59e0b',  // Deployment (Documenter) → amber
  10: '#a855f7', // Maintenance & ROI (Dashboard) → purple
};
