import React from 'react';
import { nodesData } from '../../constants/nodes';
import { NodeWrapper } from '../common/NodeWrapper';
import { AppleNode } from '../common/AppleNode';

export const DocumenterNode: React.FC = () => {
  const n = nodesData[8];

  return (
    <NodeWrapper id={n.id} x={n.x} y={n.y} width={1200}>
      <AppleNode
        imgSrc="/assets/environments/env_documenter_1778949628769.png"
        role="node.documenter.role"
        title="node.documenter.title"
        tags={[
          { label: 'globalAuditNode.js', color: '#f43f5e' },
          { label: 'tsc --noEmit', color: '#f43f5e' },
          { label: 'reporterNode.js', color: '#10b981' },
          { label: 'RETRANSIFY_REPORT.md' },
        ]}
      />
    </NodeWrapper>
  );
};
