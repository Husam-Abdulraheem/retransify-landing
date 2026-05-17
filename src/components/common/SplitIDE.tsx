import React, { useEffect, useState, useRef } from 'react';

/**
 * A highly interactive, beautiful, and cinematic Split IDE Component.
 * Simulates real-time compilation/transformation of React Web to React Native.
 * Uses an IntersectionObserver to trigger the stream exactly when in viewport.
 */
export const SplitIDE: React.FC = () => {
  const [phase, setPhase] = useState<'idle' | 'analyzing' | 'translating' | 'done'>('idle');
  const [typedLines, setTypedLines] = useState<string[]>([]);
  const [consoleLogs, setConsoleLogs] = useState<{ text: string; type: 'info' | 'warn' | 'success' | 'agent' }[]>([]);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const consolePanelRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Auto-scroll panels to bottom during active streaming to maintain perfect visibility
  useEffect(() => {
    if (rightPanelRef.current) {
      rightPanelRef.current.scrollTop = rightPanelRef.current.scrollHeight;
    }
  }, [typedLines.length]);

  useEffect(() => {
    if (consolePanelRef.current) {
      consolePanelRef.current.scrollTop = consolePanelRef.current.scrollHeight;
    }
  }, [consoleLogs.length]);

  // Clean up interval strictly on unmount to prevent memory leaks and race conditions
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Full React Native Code Split into lines
  const nativeCodeLines = [
    "import React from 'react';",
    "import { View, Text, StyleSheet } from 'react-native';",
    "",
    "export default function NativeCard() {",
    "  return (",
    "    <View style={styles.card}>",
    "      <Text style={styles.title}>Retransify</Text>",
    "      <Text style={styles.text}>Autonomous Web to Native</Text>",
    "    </View>",
    "  );",
    "}",
    "",
    "const styles = StyleSheet.create({",
    "  card: { padding: 24, borderRadius: 16, backgroundColor: '#005cff' },",
    "  title: { fontSize: 24, fontWeight: 'bold', color: '#fff' }",
    "});"
  ];

  const startTranslationWorkflow = async () => {
    // Clear any previous interval to prevent concurrent typing conflicts
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // Phase 1: Analyzing AST structure
    setPhase('analyzing');
    setConsoleLogs([{ text: '[RETRANS] 🔍 Scanning Web source layout elements.', type: 'agent' }]);
    
    await new Promise((resolve) => setTimeout(resolve, 350));
    setConsoleLogs((prev) => [...prev, { text: '[RETRANS] 🔍 Extracted HTML elements count: 3 nodes.', type: 'info' }]);
    
    await new Promise((resolve) => setTimeout(resolve, 350));
    setConsoleLogs((prev) => [...prev, { text: '[RETRANS] ⚠️ Flagged px unit style attributes for numeric pruning.', type: 'warn' }]);
    
    await new Promise((resolve) => setTimeout(resolve, 400));
    setConsoleLogs((prev) => [...prev, { text: '[RETRANS] 🛠️ AST decomposition completed.', type: 'success' }]);
    
    await new Promise((resolve) => setTimeout(resolve, 400));

    // Phase 2: Generating and streaming Native code
    setPhase('translating');
    
    let currentLineIndex = 0;
    intervalRef.current = setInterval(() => {
      if (currentLineIndex < nativeCodeLines.length) {
        const nextLine = nativeCodeLines[currentLineIndex];
        if (typeof nextLine === 'string') {
          setTypedLines((prev) => [...prev, nextLine]);

          // Stream context-aware Cognitive Thought Logs synced to compiled line index!
          if (currentLineIndex === 0) {
            setConsoleLogs((prev) => [...prev, { text: '[TRANS] ⚙️ Re-routing imports to React Native components.', type: 'agent' }]);
          } else if (currentLineIndex === 1) {
            setConsoleLogs((prev) => [...prev, { text: '[TRANS] 💊 Injected React Native import dependencies.', type: 'success' }]);
          } else if (currentLineIndex === 5) {
            setConsoleLogs((prev) => [...prev, { text: '[TRANS] 📱 Mapped <div> container to native <View> wrapper.', type: 'agent' }]);
          } else if (currentLineIndex === 6) {
            setConsoleLogs((prev) => [...prev, { text: '[TRANS] 📱 Mapped <h1> tag to native <Text style={styles.title}>.', type: 'warn' }]);
          } else if (currentLineIndex === 7) {
            setConsoleLogs((prev) => [...prev, { text: '[TRANS] 📱 Mapped <p> tag to native <Text style={styles.text}>.', type: 'agent' }]);
          } else if (currentLineIndex === 13) {
            setConsoleLogs((prev) => [...prev, { text: '[TRANS] 🎨 Stripped px unit from styles (24px ➔ 24).', type: 'info' }]);
            setConsoleLogs((prev) => [...prev, { text: '[TRANS] 🎨 Mapped background color #005cff to primary.', type: 'info' }]);
          } else if (currentLineIndex === 14) {
            setConsoleLogs((prev) => [...prev, { text: '[TRANS] 🎨 React Native stylesheet generated.', type: 'success' }]);
          }
        }
        currentLineIndex++;
      } else {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        setPhase('done');
        setConsoleLogs((prev) => [...prev, { text: '[DONE] 🎉 React Native compilation successful!', type: 'success' }]);
      }
    }, 150); // fast streaming speed per line
  };

  // Trigger animation when the IDE is scrolled into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && phase === 'idle') {
          startTranslationWorkflow();
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [phase]);

  // Auto-loop reset sequence
  useEffect(() => {
    if (phase === 'done') {
      const timer = setTimeout(() => {
        setTypedLines([]);
        setConsoleLogs([]);
        setPhase('idle');
      }, 5000); // Wait 5 seconds, then reset state
      return () => clearTimeout(timer);
    }
  }, [phase]);

  // Helper to colorize Web Code (HTML/CSS React)
  const renderWebCode = () => {
    return (
      <pre style={codeStyle}>
        <code>
          <span style={kw}>import</span> React <span style={kw}>from</span> <span style={str}>'react'</span>;{"\n\n"}
          <span style={kw}>export default function</span> <span style={fn}>WebCard</span>() &#123;{"\n"}
          {"  "}<span style={kw}>return</span> ({"\n"}
          {"    "}&lt;<span style={tag}>div</span> <span style={attr}>className</span>=<span style={str}>"card"</span>&gt;{"\n"}
          {"      "}&lt;<span style={tag}>h1</span> <span style={attr}>className</span>=<span style={str}>"title"</span>&gt;Retransify&lt;/<span style={tag}>h1</span>&gt;{"\n"}
          {"      "}&lt;<span style={tag}>p</span>&gt;Accelerated Web to Native&lt;/<span style={tag}>p</span>&gt;{"\n"}
          {"    "}&lt;/<span style={tag}>div</span>&gt;{"\n"}
          {"  "});{"\n"}
          &#125;
        </code>
      </pre>
    );
  };

  // Dynamic syntax highlighter for Typed React Native Code
  const renderHighlightedLine = (line: string, index: number) => {
    // Definitive defensive check to prevent any undefined trim TypeErrors during HMR or race conditions
    if (!line || typeof line !== 'string') return null;

    // Simple robust tokenizer for visual beauty
    if (line.trim().startsWith("//") || line.trim().startsWith("/*")) {
      return <span key={index} style={comment}>{line}</span>;
    }
    
    // Highlight common code keywords
    const keywords = ['import', 'export', 'default', 'function', 'return', 'const', 'from'];
    const nativeTags = ['View', 'Text', 'StyleSheet'];
    
    // Highlight elements dynamically
    return (
      <div key={index} style={{ minHeight: '20px', display: 'flex', alignItems: 'center' }}>
        <span style={{ color: 'rgba(255,255,255,0.25)', marginRight: 16, fontSize: 11, fontFamily: 'var(--font-code)', width: 20, textAlign: 'right', display: 'inline-block', userSelect: 'none' }}>
          {index + 1}
        </span>
        <span style={{ fontFamily: 'var(--font-code)', fontSize: 13, color: '#e2e8f0', whiteSpace: 'pre' }}>
          {line.split(/(\s+)/).map((part, pIdx) => {
            if (keywords.includes(part.trim())) {
              return <span key={pIdx} style={kw}>{part}</span>;
            }
            if (nativeTags.includes(part.trim())) {
              return <span key={pIdx} style={tagNative}>{part}</span>;
            }
            if (part.trim().startsWith("'") || part.trim().startsWith('"')) {
              return <span key={pIdx} style={str}>{part}</span>;
            }
            if (part.trim() === 'styles.card' || part.trim() === 'styles.title' || part.trim() === 'styles.text') {
              return <span key={pIdx} style={attr}>{part}</span>;
            }
            return part;
          })}
        </span>
      </div>
    );
  };

  return (
    <div
      ref={containerRef}
      style={{
        width: '840px',
        background: 'rgba(10, 10, 28, 0.45)',
        border: '1.5px solid rgba(255, 255, 255, 0.15)',
        borderRadius: '20px',
        overflow: 'hidden',
        backdropFilter: 'blur(16px)',
        boxShadow: '0 24px 80px rgba(0,0,0,0.6), 0 0 40px rgba(0,92,255,0.1)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* IDE Mac OS Top Chrome */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '14px 20px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          background: 'rgba(255, 255, 255, 0.02)',
        }}
      >
        <div style={{ display: 'flex', gap: 8 }}>
          <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f57' }} />
          <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#febc2e' }} />
          <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#28c840' }} />
        </div>
        <div
          style={{
            fontFamily: 'var(--font-code)',
            fontSize: 12,
            color: 'rgba(255,255,255,0.5)',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <span>LangGraph Engine</span>
          <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(255,255,255,0.3)' }} />
          <span style={{ color: 'var(--blue)', fontWeight: 600 }}>active_translation_loop</span>
        </div>
        <div style={{ width: 50 }} />
      </div>

      {/* Editor Split View Pane */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', height: '250px', position: 'relative' }}>
        {/* Left Side: Web React Code */}
        <div
          style={{
            padding: '24px',
            borderRight: '1px solid rgba(255, 255, 255, 0.08)',
            background: 'rgba(0,0,0,0.2)',
            textAlign: 'left',
            height: '100%',
            overflowY: 'auto',
          }}
        >
          <div style={tabHeader}>
            <span style={{ color: 'var(--cyan)' }}>⚛</span> WebCard.tsx
            <span style={pillWeb}>HTML / CSS</span>
          </div>
          {renderWebCode()}
        </div>

        {/* Right Side: Native Code */}
        <div ref={rightPanelRef} style={{ padding: '24px', background: 'rgba(0,0,0,0.3)', textAlign: 'left', position: 'relative', height: '100%', overflowY: 'auto' }}>
          <div style={tabHeader}>
            <span style={{ color: 'var(--blue)' }}>📱</span> NativeCard.tsx
            {phase === 'done' && <span style={pillNative}>Success ✓</span>}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 16 }}>
            {typedLines.map((line, idx) => renderHighlightedLine(line, idx))}
            
            {phase === 'translating' && (
              <div style={{ display: 'flex', alignItems: 'center', marginTop: 4 }}>
                <span style={{ color: 'rgba(255,255,255,0.25)', marginRight: 16, fontSize: 11, fontFamily: 'var(--font-code)', width: 20, textAlign: 'right' }}>
                  {typedLines.length + 1}
                </span>
                <span className="blink" style={{ width: 8, height: 16, background: 'var(--blue)', display: 'inline-block' }} />
              </div>
            )}
          </div>

          {/* Analyzing HUD overlay */}
          {phase === 'analyzing' && (
            <div style={overlayStyle}>
              <div className="blink" style={{ fontSize: 12, fontWeight: 700, fontFamily: 'var(--font-code)', letterSpacing: 2, color: 'var(--blue)', textTransform: 'uppercase', marginBottom: 12 }}>
                [🔄 Scanning Web AST...]
              </div>
              <div style={{ width: 200, height: 2, background: 'rgba(255,255,255,0.05)', borderRadius: 1, overflow: 'hidden', position: 'relative' }}>
                <div style={shimmerLoader} />
              </div>
            </div>
          )}

          {/* Idle Phase screen */}
          {phase === 'idle' && (
            <div style={overlayStyle}>
              <div style={{ fontSize: 11, fontFamily: 'var(--font-code)', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: 1 }}>
                Waiting for viewport trigger...
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Immersive Cognitive Thought Stream Terminal */}
      <div
        ref={consolePanelRef}
        style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          background: 'rgba(5, 5, 12, 0.55)',
          padding: '12px 20px',
          textAlign: 'left',
          height: '105px',
          overflowY: 'auto',
          position: 'relative',
        }}
      >
        {/* Console Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '10px',
            borderBottom: '1px dashed rgba(255, 255, 255, 0.06)',
            paddingBottom: '6px',
            userSelect: 'none',
          }}
        >
          <span style={{ fontFamily: 'var(--font-code)', fontSize: '11px', color: 'rgba(255,255,255,0.4)', fontWeight: 600, letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: phase === 'done' ? '#10b981' : 'var(--blue)', boxShadow: phase === 'done' ? '0 0 8px #10b981' : '0 0 8px var(--blue)' }} />
            RETRAŇSIFY_COGNITIVE_TRANSFORM_STREAM
          </span>
          <span style={{ fontFamily: 'var(--font-code)', fontSize: '10px', color: 'var(--blue)', fontWeight: 600 }}>
            v1.0.0_compiler_active
          </span>
        </div>

        {/* Streaming Logs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {consoleLogs.map((log, idx) => (
            <div
              key={idx}
              style={{
                fontFamily: 'var(--font-code)',
                fontSize: '11px',
                lineHeight: '1.6',
                color: log.type === 'info' ? 'rgba(255,255,255,0.65)' : log.type === 'warn' ? '#febc2e' : log.type === 'success' ? '#10b981' : 'var(--blue)',
                paddingLeft: '12px',
                position: 'relative',
              }}
            >
              <span style={{ position: 'absolute', left: 0, color: 'rgba(255,255,255,0.15)', userSelect: 'none' }}>&gt;</span>
              {log.text}
            </div>
          ))}
          {/* Animated active compiler line cursor */}
          {phase !== 'idle' && phase !== 'done' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', paddingLeft: '12px', marginTop: '2px' }}>
              <span style={{ color: 'rgba(255,255,255,0.15)', userSelect: 'none' }}>&gt;</span>
              <span className="blink" style={{ width: 6, height: 12, background: 'rgba(255,255,255,0.4)', display: 'inline-block' }} />
            </div>
          )}
        </div>
      </div>

      {/* Footer Status Panel */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px 24px',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          background: 'rgba(0,0,0,0.4)',
          fontFamily: 'var(--font-code)',
          fontSize: 11,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {phase === 'done' ? (
            <>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--emerald)', boxShadow: '0 0 10px var(--emerald)' }} />
              <span style={{ color: 'var(--emerald)' }}>TRANSFORMATION COMPLETE (98.6% Native Fidelity)</span>
            </>
          ) : phase === 'translating' ? (
            <>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--blue)', boxShadow: '0 0 10px var(--blue)' }} />
              <span style={{ color: 'var(--blue)' }}>COMPILING React Native components...</span>
            </>
          ) : phase === 'analyzing' ? (
            <>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--amber)', boxShadow: '0 0 10px var(--amber)' }} />
              <span style={{ color: 'var(--amber)' }}>ANALYZING Web layout dependencies...</span>
            </>
          ) : (
            <>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.15)' }} />
              <span style={{ color: 'rgba(255,255,255,0.35)' }}>Engine Standby</span>
            </>
          )}
        </div>

        <div style={{ color: 'rgba(255,255,255,0.3)' }}>
          Speed: <span style={{ color: '#fff' }}>0.003s/token</span>
        </div>
      </div>
    </div>
  );
};

// Inline Styles for pure high-performance layout
const codeStyle: React.CSSProperties = {
  marginTop: '16px',
  textAlign: 'left',
  fontFamily: 'var(--font-code)',
  fontSize: '13px',
  lineHeight: '1.6',
  color: '#e2e8f0',
  overflowX: 'auto',
};

const tabHeader: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  fontFamily: 'var(--font-code)',
  fontSize: '12px',
  fontWeight: 600,
  color: 'rgba(255,255,255,0.8)',
  borderBottom: '1px solid rgba(255,255,255,0.06)',
  paddingBottom: '10px',
  userSelect: 'none',
};

const pillWeb: React.CSSProperties = {
  fontSize: '9px',
  padding: '2px 8px',
  borderRadius: '4px',
  background: 'rgba(34, 211, 238, 0.1)',
  color: 'var(--cyan)',
  border: '1px solid rgba(34, 211, 238, 0.2)',
  textTransform: 'uppercase',
  fontWeight: 700,
};

const pillNative: React.CSSProperties = {
  fontSize: '9px',
  padding: '2px 8px',
  borderRadius: '4px',
  background: 'rgba(16, 185, 129, 0.1)',
  color: 'var(--emerald)',
  border: '1px solid rgba(16, 185, 129, 0.2)',
  textTransform: 'uppercase',
  fontWeight: 700,
  boxShadow: '0 0 10px rgba(16, 185, 129, 0.1)',
};

const overlayStyle: React.CSSProperties = {
  position: 'absolute',
  inset: 0,
  background: 'rgba(10, 10, 28, 0.5)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(255, 255, 255, 0.05)',
  zIndex: 10,
};

const shimmerLoader: React.CSSProperties = {
  width: '60px',
  height: '100%',
  background: 'var(--blue)',
  boxShadow: '0 0 16px var(--blue)',
  position: 'absolute',
  left: 0,
  top: 0,
  animation: 'shimmer-x 1.2s infinite ease-in-out',
};

// Custom color tokens for Code Highlighting
const kw: React.CSSProperties = { color: '#a855f7', fontWeight: 600 }; // purple keyword
const fn: React.CSSProperties = { color: '#6366f1' }; // blue function name
const tag: React.CSSProperties = { color: '#f43f5e' }; // red web tag
const tagNative: React.CSSProperties = { color: '#005cff', fontWeight: 600 }; // brand blue native tag
const attr: React.CSSProperties = { color: '#22d3ee' }; // cyan attribute
const str: React.CSSProperties = { color: '#10b981' }; // emerald string
const comment: React.CSSProperties = { color: 'rgba(255,255,255,0.3)', fontStyle: 'italic' };
