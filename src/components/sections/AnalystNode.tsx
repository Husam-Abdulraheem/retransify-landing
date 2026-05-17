import React from 'react';
import { nodesData } from '../../constants/nodes';
import { NodeWrapper } from '../common/NodeWrapper';
import { AppleNode } from '../common/AppleNode';
import { DOMAnalyzer } from '../common/DOMAnalyzer';

export const AnalystNode: React.FC = () => {
  const n = nodesData[1];

  return (
    <NodeWrapper id={n.id} x={n.x} y={n.y} width={1200}>
      <AppleNode
        imgSrc="/assets/environments/env_analyst_1778949492442.png"
        role="LEAD ANALYST"
        title="The Lead Analyst"
        tags={[
          { label: 'analyzerNode.js' },
          { label: 'cacheLoaderNode.js' },
          { label: 'ts-morph', color: '#22d3ee' },
        ]}
      >
        <DOMAnalyzer />
      </AppleNode>
    </NodeWrapper>
  );
};
