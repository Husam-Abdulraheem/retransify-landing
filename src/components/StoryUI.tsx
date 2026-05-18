import React from 'react';
import { CanvasPaths } from './common/CanvasPaths';
import { IntroNode } from './sections/IntroNode';
import { AnalystNode } from './sections/AnalystNode';
import { ArchitectNode } from './sections/ArchitectNode';
import {
  CleanerNode,
  TransformerNode,
  VerifierNode,
  HealerNode
} from './sections/FactoryFloorNodes';
import { WriterNode } from './sections/WriterNode';
import { DocumenterNode } from './sections/DocumenterNode';
import { DashboardNode } from './sections/DashboardNode';
import { ConclusionNode } from './sections/ConclusionNode';

/**
 * StoryUI Component
 * Composes all individual spatial flowchart nodes and connection paths.
 * Adheres to strict Separation of Concerns (SoC) by leveraging modular components.
 */
interface StoryUIProps {
  timelineIndex: number;
}

export default function StoryUI({ timelineIndex }: StoryUIProps) {
  return (
    <>
      {/* Background SVG Connectors & Dynamic LangGraph Loops */}
      <CanvasPaths />

      {/* SDLC Scrollytelling Phases */}
      <IntroNode />
      <AnalystNode />
      <ArchitectNode />

      {/* LangGraph Diamond Production Loop */}
      <CleanerNode />
      <TransformerNode />
      <VerifierNode isSecondPass={timelineIndex >= 7} />
      <HealerNode />

      {/* Output & Deployment */}
      <WriterNode />
      <DocumenterNode />

      {/* CEO Boardroom Dashboard */}
      <DashboardNode />

      {/* Grand Finale honors slide */}
      <ConclusionNode />
    </>
  );
}