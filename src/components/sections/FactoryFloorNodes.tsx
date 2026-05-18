import React from 'react';
import { nodesData } from '../../constants/nodes';
import { NodeWrapper } from '../common/NodeWrapper';
import { AppleNode } from '../common/AppleNode';

import { SplitIDE } from '../common/SplitIDE';
import { ASTHealer } from '../common/ASTHealer';
import { ASTCleaner } from '../common/ASTCleaner';
import { QARadarValidator } from '../common/QARadarValidator';

export const CleanerNode: React.FC = () => {
  const n = nodesData[3];
  return (
    <NodeWrapper id={n.id} x={n.x} y={n.y} width={900}>
      <AppleNode
        imgSrc="/assets/environments/env_cleaner_1778949532438.jpg"
        role="node.cleaner.role"
        title="node.cleaner.title"
        tags={[
          { label: 'normalizerNode.js' },
          { label: 'AST Sanitization' },
        ]}
      >
        <ASTCleaner />
      </AppleNode>
    </NodeWrapper>
  );
};

export const TransformerNode: React.FC = () => {
  const n = nodesData[4];
  return (
    <NodeWrapper id={n.id} x={n.x} y={n.y} width={900}>
      <AppleNode
        imgSrc="/assets/environments/env_transformer_1778949551384.jpg"
        role="node.transformer.role"
        title="node.transformer.title"
        tags={[
          { label: 'executorNode.js', color: '#10b981' },
          { label: 'LangChain LLM', color: '#10b981' },
        ]}
      >
        <SplitIDE />
      </AppleNode>
    </NodeWrapper>
  );
};


export const VerifierNode: React.FC<{ isSecondPass?: boolean }> = ({ isSecondPass }) => {
  const n = nodesData[5];
  return (
    <NodeWrapper id={n.id} x={n.x} y={n.y} width={900}>
      <AppleNode
        imgSrc="/assets/environments/env_verifier_1778949570029.jpg"
        role="node.verifier.role"
        title="node.verifier.title"
        tags={[
          { label: 'verifierNode.js', color: '#f43f5e' },
          { label: 'AST Syntax Validation' },
        ]}
      >
        <QARadarValidator key={isSecondPass ? 'second' : 'first'} isSecondPass={isSecondPass} />
      </AppleNode>
    </NodeWrapper>
  );
};


export const HealerNode: React.FC = () => {
  const n = nodesData[6];
  return (
    <NodeWrapper id={n.id} x={n.x} y={n.y} width={900}>
      <AppleNode
        imgSrc="/assets/environments/env_healer_1778949591682.jpg"
        role="node.healer.role"
        title="node.healer.title"
        tags={[
          { label: 'healerNode.js', color: '#f59e0b' },
          { label: 'contextUpdaterNode.js' },
          { label: 'autoInstallerNode.js' },
        ]}
      >
        <ASTHealer />
      </AppleNode>
    </NodeWrapper>
  );
};
