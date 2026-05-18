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
  { id: 'node-conclusion',  x: 3000, y: 10500, sdlcPhase: 'Release & Thanks',  sdlcStep: 11 },
];

// The actual path sequence, demonstrating the loop from Verifier -> Healer -> Verifier
export const NODE_SEQUENCE = [0, 1, 2, 3, 4, 5, 6, 5, 7, 8, 9, 10];

export const SDLC_COLORS: Record<number, string> = {
  1: '#00d2ff',  // Trigger (Intro) → vibrant electric cyan
  2: '#818cf8',  // Requirements (Analyst) → sleek indigo
  3: '#38bdf8',  // System Design (Architect) → sky blueprint blue
  4: '#2dd4bf',  // Implementation (Cleaner) → mint teal
  5: '#34d399',  // Implementation (Transformer) → rich emerald
  6: '#fb7185',  // Testing & QA (Verifier) → validation rose red
  7: '#f59e0b',  // Testing & QA (Healer) → recovery amber orange
  8: '#06b6d4',  // Implementation (Writer) → deep cyan
  9: '#a78bfa',  // Deployment (Documenter) → atmospheric purple
  10: '#ec4899', // Maintenance & ROI (Dashboard) → analytics hot pink
  11: '#005cff', // Release & Thanks (Conclusion) → brand electric blue
};
