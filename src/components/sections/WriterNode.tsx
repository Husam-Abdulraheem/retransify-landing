import React from 'react';
import { nodesData } from '../../constants/nodes';
import { NodeWrapper } from '../common/NodeWrapper';
import { AppleNode } from '../common/AppleNode';
import { ASTWriter } from '../common/ASTWriter';

export const WriterNode: React.FC = () => {
  const n = nodesData[7];

  return (
    <NodeWrapper id={n.id} x={n.x} y={n.y} width={1200}>
      <AppleNode
        imgSrc="/assets/environments/env_writer_1778949611170.png"
        role="node.writer.role"
        title="node.writer.title"
        tags={[
          { label: 'diskWriterNode.js', color: '#005cff' },
          { label: 'fs.writeFileSync' },
        ]}
      >
        <ASTWriter />
      </AppleNode>
    </NodeWrapper>
  );
};
