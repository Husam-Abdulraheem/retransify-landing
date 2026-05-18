import React from 'react';
import { nodesData } from '../../constants/nodes';
import { NodeWrapper } from '../common/NodeWrapper';
import { AppleNode } from '../common/AppleNode';

export const ArchitectNode: React.FC = () => {
  const n = nodesData[2];

  return (
    <NodeWrapper id={n.id} x={n.x} y={n.y} width={1200}>
      <AppleNode
        imgSrc="/assets/environments/env_architect_1778949512202.jpg"
        role="node.architect.role"
        title="node.architect.title"
        tags={[
          { label: 'plannerNode.js', color: '#a855f7' },
          { label: 'layoutAgentNode.js' },
        ]}
      />
    </NodeWrapper>
  );
};
