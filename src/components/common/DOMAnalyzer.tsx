import React, { useState } from 'react';
import { useLanguage } from '../../hooks/useLanguage';

interface ASTDiagnosticNode {
  id: string;
  label: string;
  syntaxKind: string;
  kindId: number;
  identifierName: string;
  indent: number;
  extractedSnippet: string;
  compilerMeta: {
    flags?: string;
    childrenCount: number;
    properties?: string[];
    modifiers?: string[];
  };
  tsMorphExpression: string;
  tsMorphResult: string;
  aiTranslationResolution: string;
}

export const DOMAnalyzer: React.FC = () => {
  const [hoveredNode, setHoveredNode] = useState<ASTDiagnosticNode | null>(null);
  const { t } = useLanguage();

  const compilerNodes: ASTDiagnosticNode[] = [
    {
      id: 'source-file',
      label: 'SourceFile ("WebCard.tsx")',
      syntaxKind: 'SyntaxKind.SourceFile',
      kindId: 308,
      identifierName: '"WebCard.tsx"',
      indent: 0,
      extractedSnippet: 'export default function WebCard() { ... }',
      compilerMeta: {
        flags: 'NodeFlags.None (0)',
        childrenCount: 3,
        properties: ['isDeclarationFile: false', 'statements: ts.NodeArray', 'languageVersion: ScriptTarget.ES2022'],
      },
      tsMorphExpression: 'node.getStatements().map(s => s.getKindName())',
      tsMorphResult: '["ImportDeclaration", "FunctionDeclaration", "VariableStatement"]',
      aiTranslationResolution: 'Initialized TypeScript compiler context for translation pipeline.',
    },
    {
      id: 'import-dec',
      label: 'ImportDeclaration ("react")',
      syntaxKind: 'SyntaxKind.ImportDeclaration',
      kindId: 269,
      identifierName: '"react"',
      indent: 1,
      extractedSnippet: "import React from 'react';\nimport './styles.css';",
      compilerMeta: {
        flags: 'NodeFlags.None (0)',
        childrenCount: 2,
        properties: ['moduleSpecifier: "react"', 'importClause: ts.ImportClause', 'hasAssertClause: false'],
      },
      tsMorphExpression: 'node.getImportClause()?.getNamedBindings()?.getText()',
      tsMorphResult: 'undefined (Default import detected: "React")',
      aiTranslationResolution: 'Flagged web CSS imports. Registered React Native View/Text core dependencies.',
    },
    {
      id: 'func-dec',
      label: 'FunctionDeclaration ("WebCard")',
      syntaxKind: 'SyntaxKind.FunctionDeclaration',
      kindId: 259,
      identifierName: '"WebCard"',
      indent: 1,
      extractedSnippet: 'export default function WebCard() {',
      compilerMeta: {
        modifiers: ['SyntaxKind.ExportKeyword (93)', 'SyntaxKind.DefaultKeyword (88)'],
        childrenCount: 5,
        properties: ['name: ts.Identifier', 'parameters: ts.NodeArray[0]', 'typeParameters: undefined'],
      },
      tsMorphExpression: 'node.isDefaultExport() && node.getReturnType().getText()',
      tsMorphResult: 'true && "JSX.Element"',
      aiTranslationResolution: 'Identified React functional export. Established Native wrapper target.',
    },
    {
      id: 'return-stmt',
      label: 'ReturnStatement',
      syntaxKind: 'SyntaxKind.ReturnStatement',
      kindId: 250,
      identifierName: 'expression',
      indent: 2,
      extractedSnippet: 'return ( <div className="card"> ... </div> );',
      compilerMeta: {
        flags: 'NodeFlags.None (0)',
        childrenCount: 1,
        properties: ['expression: ts.JsxElement', 'parent: ts.Block'],
      },
      tsMorphExpression: 'node.getExpression().getKindName()',
      tsMorphResult: '"JsxElement" (SyntaxKind 281)',
      aiTranslationResolution: 'Located returned JSX layout. Initiated children tree traversal.',
    },
    {
      id: 'jsx-card',
      label: 'JsxElement ("div.card")',
      syntaxKind: 'SyntaxKind.JsxElement',
      kindId: 281,
      identifierName: '"div"',
      indent: 3,
      extractedSnippet: '<div className="card">',
      compilerMeta: {
        flags: 'NodeFlags.None (0)',
        childrenCount: 3,
        properties: ['openingElement: ts.JsxOpeningElement', 'closingElement: ts.JsxClosingElement', 'children: ts.NodeArray[2]'],
      },
      tsMorphExpression: 'node.getOpeningElement().getAttribute("className")?.getInitializer()?.getText()',
      tsMorphResult: '"card"',
      aiTranslationResolution: 'Resolved web "card" layout class. Rebuilt tag to native <View style={styles.card}>.',
    },
    {
      id: 'jsx-title',
      label: 'JsxElement ("h1.title")',
      syntaxKind: 'SyntaxKind.JsxElement',
      kindId: 281,
      identifierName: '"h1"',
      indent: 4,
      extractedSnippet: '<h1 className="title">Retransify</h1>',
      compilerMeta: {
        flags: 'NodeFlags.None (0)',
        childrenCount: 1,
        properties: ['openingElement: ts.JsxOpeningElement', 'children[0]: ts.JsxText (SyntaxKind 282)'],
      },
      tsMorphExpression: 'node.getOpeningElement().getTagNameAsString()',
      tsMorphResult: '"h1" (Flagged: Unsupported on Mobile)',
      aiTranslationResolution: 'Web typography node converted to native <Text style={styles.title}> component.',
    },
    {
      id: 'jsx-text',
      label: 'JsxElement ("p")',
      syntaxKind: 'SyntaxKind.JsxElement',
      kindId: 281,
      identifierName: '"p"',
      indent: 4,
      extractedSnippet: '<p>Accelerated Web to Native</p>',
      compilerMeta: {
        flags: 'NodeFlags.None (0)',
        childrenCount: 1,
        properties: ['openingElement: ts.JsxOpeningElement', 'children[0]: ts.JsxText'],
      },
      tsMorphExpression: 'node.getOpeningElement().getTagNameAsString()',
      tsMorphResult: '"p" (Flagged: Unsupported on Mobile)',
      aiTranslationResolution: 'Web paragraph tag converted to native <Text style={styles.text}> component.',
    },
    {
      id: 'styles-dec',
      label: 'VariableStatement ("styles")',
      syntaxKind: 'SyntaxKind.VariableStatement',
      kindId: 240,
      identifierName: '"styles"',
      indent: 1,
      extractedSnippet: 'const styles = { card: { padding: 24px } }',
      compilerMeta: {
        flags: 'NodeFlags.Const (2)',
        childrenCount: 1,
        properties: ['declarationList: ts.VariableDeclarationList', 'declarations[0].name: "styles"'],
      },
      tsMorphExpression: 'node.getDeclarations()[0].getInitializer().getProperties().map(p => p.getName())',
      tsMorphResult: '["card", "title"] (SyntaxKind.ObjectLiteralExpression)',
      aiTranslationResolution: 'Extracted Web styles. Converted "px" units to mobile integer values.',
    },
  ];

  return (
    <div
      className="scrolly-interactive-card"
      style={{
        width: '840px',
        height: '260px',
        background: 'rgba(10, 10, 28, 0.45)',
        border: '1.5px solid rgba(255, 255, 255, 0.15)',
        borderRadius: '20px',
        overflow: 'hidden',
        backdropFilter: 'blur(16px)',
        boxShadow: '0 24px 80px rgba(0,0,0,0.6), 0 0 40px rgba(34,211,238,0.15)',
        display: 'grid',
        gridTemplateColumns: '1.25fr 1fr',
        textAlign: 'left',
      }}
    >
      {/* Left Column: Interactive ts-morph AST tree explorer */}
      <div
        style={{
          padding: '16px 20px',
          borderRight: '1px solid rgba(255, 255, 255, 0.08)',
          background: 'rgba(0, 0, 0, 0.25)',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          overflowY: 'auto',
        }}
      >
        {/* Panel Title bar */}
        <div
          style={{
            fontFamily: 'var(--font-code)',
            fontSize: '11px',
            color: 'var(--cyan)',
            fontWeight: 700,
            letterSpacing: '1px',
            marginBottom: '10px',
            borderBottom: '1px dashed rgba(255, 255, 255, 0.06)',
            paddingBottom: '6px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            userSelect: 'none',
          }}
        >
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--cyan)', boxShadow: '0 0 8px var(--cyan)' }} />
          {t('ast.explorer.title')}
        </div>

        {/* Tree Nodes */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
          {compilerNodes.map((node) => {
            const isHovered = hoveredNode?.id === node.id;
            return (
              <div
                key={node.id}
                onMouseEnter={() => setHoveredNode(node)}
                onMouseLeave={() => setHoveredNode(null)}
                style={{
                  fontFamily: 'var(--font-code)',
                  fontSize: '11px',
                  padding: '3px 8px',
                  borderRadius: '5px',
                  marginLeft: `${node.indent * 14}px`,
                  cursor: 'pointer',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: isHovered ? 'rgba(34, 211, 238, 0.08)' : 'transparent',
                  border: isHovered ? '1px solid rgba(34, 211, 238, 0.2)' : '1px solid transparent',
                  color: isHovered ? 'var(--cyan)' : 'rgba(255, 255, 255, 0.75)',
                  transition: 'all 0.1s ease-in-out',
                }}
              >
                {/* Branch Connector lines */}
                {node.indent > 0 && (
                  <span
                    style={{
                      position: 'absolute',
                      left: '-8px',
                      top: '50%',
                      width: '6px',
                      height: '1px',
                      background: isHovered ? 'var(--cyan)' : 'rgba(255, 255, 255, 0.12)',
                    }}
                  />
                )}
                <span style={{ fontWeight: isHovered ? 700 : 500 }}>
                  {node.label}
                </span>

                {isHovered && (
                  <span style={{ fontSize: '9px', color: 'rgba(255, 255, 255, 0.4)', fontWeight: 300, fontStyle: 'italic' }}>
                    ({node.syntaxKind})
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Column: AST compilation diagnostics inspector */}
      <div
        style={{
          padding: '16px 20px',
          background: 'rgba(0, 0, 0, 0.35)',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: hoveredNode ? 'flex-start' : 'center',
          alignItems: hoveredNode ? 'stretch' : 'center',
          overflowY: 'auto',
        }}
      >
        {hoveredNode ? (
          <div style={{ animation: 'fade-in 0.15s ease-out' }}>
            {/* Compiler Header info */}
            <div
              style={{
                fontFamily: 'var(--font-code)',
                fontSize: '9px',
                color: 'rgba(255, 255, 255, 0.35)',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '1px',
                marginBottom: '6px',
              }}
            >
              ts.CompilerNode: <span style={{ color: 'var(--cyan)' }}>{hoveredNode.syntaxKind} (ID: {hoveredNode.kindId})</span>
            </div>

            {/* Classification */}
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#fff', marginBottom: '6px' }}>
              {hoveredNode.aiTranslationResolution}
            </div>

            {/* Programmatic ts-morph API expression */}
            <div style={{ marginBottom: '8px' }}>
              <div style={{ fontSize: '9px', color: 'rgba(255, 255, 255, 0.4)', fontFamily: 'var(--font-code)', marginBottom: '3px' }}>
                TS_MORPH_API_EXPRESSION
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-code)',
                  fontSize: '10px',
                  color: 'var(--cyan)',
                  background: 'rgba(34, 211, 238, 0.05)',
                  padding: '4px 8px',
                  borderRadius: '5px',
                  border: '1px solid rgba(34, 211, 238, 0.15)',
                }}
              >
                {hoveredNode.tsMorphExpression}
                <div style={{ marginTop: '3px', color: 'rgba(255,255,255,0.7)', borderTop: '1px dashed rgba(255,255,255,0.08)', paddingTop: '3px' }}>
                  <span style={{ color: 'var(--blue)' }}>➔ Out:</span> {hoveredNode.tsMorphResult}
                </div>
              </div>
            </div>

            {/* Extracted compiler node metadata */}
            <div style={{ marginBottom: '8px' }}>
              <div style={{ fontSize: '9px', color: 'rgba(255, 255, 255, 0.4)', fontFamily: 'var(--font-code)', marginBottom: '3px' }}>
                COMPILER_AST_PROPERTIES
              </div>
              <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.75)', fontFamily: 'var(--font-code)', paddingLeft: '8px' }}>
                <div>• children: {hoveredNode.compilerMeta.childrenCount} nodes</div>
                {hoveredNode.compilerMeta.flags && <div>• flags: {hoveredNode.compilerMeta.flags}</div>}
                {hoveredNode.compilerMeta.modifiers && <div>• modifiers: {hoveredNode.compilerMeta.modifiers.join(', ')}</div>}
                {hoveredNode.compilerMeta.properties && hoveredNode.compilerMeta.properties.map((p, i) => (
                  <div key={i}>• {p}</div>
                ))}
              </div>
            </div>

            {/* AI Translation logic */}
            <div>
              <div style={{ fontSize: '9px', color: 'rgba(255, 255, 255, 0.4)', fontFamily: 'var(--font-code)', marginBottom: '3px' }}>
                COMPILER_TRANSLATION_RESOLUTION
              </div>
              <div style={{ fontSize: '10.5px', lineHeight: '1.45', color: '#cbd5e1', paddingLeft: '8px', borderLeft: '2px solid var(--cyan)' }}>
                {hoveredNode.aiTranslationResolution}
              </div>
            </div>
          </div>
        ) : (
          <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-code)', fontSize: '11px' }}>
            <span className="blink" style={{ fontSize: '16px', display: 'block', marginBottom: '8px', color: 'var(--cyan)' }}>
              ⚙️
            </span>
            Hover any TS AST Node to inspect<br />actual compiler properties & API results
          </div>
        )}
      </div>
    </div>
  );
};
