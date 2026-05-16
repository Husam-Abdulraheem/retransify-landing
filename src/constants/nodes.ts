export interface NodeData {
  id: string;
  x: number;
  y: number;
}

export const nodesData: NodeData[] = [
  { id: 'node-intro', x: 2500, y: 500 },
  { id: 'node-req', x: 1500, y: 1500 },
  { id: 'node-design', x: 3500, y: 2000 },
  { id: 'node-impl', x: 1500, y: 3000 },
  { id: 'node-qa', x: 3500, y: 3500 },
  { id: 'node-deploy', x: 1500, y: 4500 },
  { id: 'node-maint', x: 2500, y: 4800 }
];
