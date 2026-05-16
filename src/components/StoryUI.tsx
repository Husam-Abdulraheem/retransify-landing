import React, { useEffect, useState } from 'react';
import { nodesData, NODE_SEQUENCE, SDLC_COLORS } from '../constants/nodes';

/* ─── Typing hook ──────────────────────────────────────────────────────── */
function useTyping(text: string, speed = 50) {
  const [out, setOut] = useState('');
  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      i++;
      setOut(text.slice(0, i));
      if (i >= text.length) clearInterval(t);
    }, speed);
    return () => clearInterval(t);
  }, [text]);
  return out;
}

/* ─── SVG Paths (Flowchart Lines) ──────────────────────────────────────── */
function CanvasPaths() {
  return (
    <svg style={{ position:'absolute', top:0, left:0, width:'100%', height:'100%', overflow:'visible', pointerEvents:'none', zIndex:0 }}>
      {/* Factory Floor LangGraph Loop Visual Bounding Box */}
      <g opacity="0.4">
        {/* Diamond path connecting the 4 nodes (Cleaner -> Transformer -> Verifier -> Healer) */}
        <path d="M 3000 4600 L 4600 5800 L 3000 7000 L 1400 5800 Z" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="80" strokeLinejoin="round" />
        <ellipse cx="3000" cy="5800" rx="1800" ry="1400" fill="none" stroke="#22d3ee" strokeWidth="2" strokeDasharray="15 30" opacity="0.3" />
        <text x="3000" y="4200" fill="#22d3ee" fontSize="48" fontWeight="800" textAnchor="middle" letterSpacing="12" opacity="0.5">LANGGRAPH FACTORY LOOP</text>
      </g>
      
      <g>
        {NODE_SEQUENCE.slice(0, -1).map((sIdx, i) => {
          const eIdx = NODE_SEQUENCE[i + 1];
          const s = nodesData[sIdx];
          const e = nodesData[eIdx];
          
          // Standard vertical/horizontal S-curve connection
          // This perfectly traces the quadrants of a diamond loop when nodes are arranged in a circle!
          const my = (s.y + e.y) / 2;
          const pathD = `M ${s.x} ${s.y} C ${s.x} ${my}, ${e.x} ${my}, ${e.x} ${e.y}`;

          const col = SDLC_COLORS[s.sdlcStep];
          return (
            <g key={i}>
              <path
                d={pathD}
                fill="none" stroke={col} strokeWidth="8" strokeLinecap="round"
                opacity="0.2"
              />
              <path
                id={`path-${i}`}
                d={pathD}
                fill="none" stroke={col} strokeWidth="3" strokeLinecap="round" strokeDasharray={s.id === 'node-healer' ? '10, 10' : 'none'}
                className="sdlc-path"
              />
            </g>
          );
        })}
      </g>
    </svg>
  );
}

/* ─── Core Wrappers ────────────────────────────────────────────────────── */
function NodeWrapper({ id, x, y, width=500, children }: { id:string; x:number; y:number; width?:number; children:React.ReactNode }) {
  return <div id={id} style={{ position:'absolute', left:x, top:y, width, transform:'translate(-50%,-50%)', zIndex:10, display:'flex', flexDirection:'column', alignItems:'center' }}>{children}</div>;
}

function Dot({ color }: { color:string }) {
  return <div style={{ width:16, height:16, borderRadius:'50%', marginBottom:24, background:color, color, boxShadow:`0 0 24px ${color}`, position:'relative', border:'2px solid rgba(255,255,255,0.8)' }} />;
}

/* ─── Apple-style Free-floating Node ─────────────────────────────────────── */
function AppleNode({ 
  imgSrc, 
  title, 
  role, 
  tags
}: { 
  imgSrc: string, 
  title: string, 
  role: string, 
  tags: {label:string, color?:string}[]
}) {
  return (
    <div style={{ position: 'relative', width: 1200, height: 700, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      {/* Massive Image blending into the void - perfectly centered */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
        <img 
          src={imgSrc} 
          alt={title} 
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover', 
            WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 75%)',
            maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 75%)',
            opacity: 0.7,
            pointerEvents: 'none'
          }} 
        />
      </div>
      
      {/* Huge Typography On Top of the Image */}
      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', marginTop: 80 }}>
        <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', marginBottom: 24, textShadow: '0 4px 24px rgba(0,0,0,0.8)' }}>
          {role}
        </div>
        <h2 style={{ fontSize: 96, fontWeight: 900, color: '#fff', lineHeight: 1.1, marginBottom: 40, letterSpacing: '-0.03em', textShadow: '0 12px 48px rgba(0,0,0,0.8)' }}>
          {title}
        </h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center' }}>
          {tags.map(t => (
            <span key={t.label} className="visual-tag" style={{ fontSize: 16, padding: '16px 32px', borderRadius: 40, backdropFilter: 'blur(16px)', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 8px 32px rgba(0,0,0,0.5)', ...(t.color ? {color: t.color, borderColor: t.color} : {}) }}>
              {t.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── 0. Intro Node ────────────────────────────────────────────────────── */
function IntroNode() {
  const color = SDLC_COLORS[1]; const cmd = useTyping('npx retransify ./my-web-app'); const n = nodesData[0];
  return (
    <NodeWrapper id={n.id} x={n.x} y={n.y} width={640}>
      <div className="terminal" style={{ marginBottom: 40 }}>
        <div className="terminal__chrome">
          <span className="terminal__dot" style={{background:'#ff5f57'}}/><span className="terminal__dot" style={{background:'#febc2e'}}/><span className="terminal__dot" style={{background:'#28c840'}}/>
          <span className="terminal__title">retransify — trigger</span>
        </div>
        <div className="terminal__body" style={{ padding: 32 }}>
          <div className="terminal__prompt-line" style={{ fontSize: 18 }}>
            <span style={{color:'#6366f1',marginRight:16}}>➜</span><span style={{color:'#22d3ee',marginRight:16}}>~/projects</span>
            <span style={{color:'#fff',fontWeight:600}}>{cmd}</span>
            <span className="blink" style={{display:'inline-block',width:10,height:22,background:color,verticalAlign:'middle',marginLeft:4}}/>
          </div>
        </div>
      </div>
      <div style={{textAlign:'center'}}>
        <h1 className="hero-title">Retransify</h1>
        <p className="hero-sub" style={{ fontSize: 20 }}>The Virtual Software Agency on your machine.<br/>React Web → React Native. Zero Human Intervention.</p>
        <div className="hero-scroll" style={{ marginTop: 60 }}><span>Scroll to enter the agency</span><div className="hero-scroll-line"/></div>
      </div>
    </NodeWrapper>
  );
}

/* ─── 1. Analyst Node ──────────────────────────────────────────────────── */
function AnalystNode() {
  const n = nodesData[1];
  return (
    <NodeWrapper id={n.id} x={n.x} y={n.y} width={1200}>
      <AppleNode 
        imgSrc="/assets/environments/env_analyst_1778949492442.png"
        role="Phase 01: Discovery"
        title="The Lead Analyst"
        tags={[
          { label: 'ts-morph | AST Deep Scan' },
          { label: 'React + Vite Architecture Mapped', color: '#22d3ee' }
        ]}
      />
    </NodeWrapper>
  );
}

/* ─── 2. Architect Node ────────────────────────────────────────────────── */
function ArchitectNode() {
  const n = nodesData[2];
  return (
    <NodeWrapper id={n.id} x={n.x} y={n.y} width={1200}>
      <AppleNode 
        imgSrc="/assets/environments/env_architect_1778949512202.png"
        role="Phase 02: System Architecture"
        title="The Architect"
        tags={[
          { label: 'Route Synthesis' },
          { label: 'Native Navigation: Tabs, Drawers, Modals', color: '#a855f7' }
        ]}
      />
    </NodeWrapper>
  );
}

/* ─── 3. Cleaner Node ──────────────────────────────────────────────────── */
function CleanerNode() {
  const n = nodesData[3];
  return (
    <NodeWrapper id={n.id} x={n.x} y={n.y} width={1200}>
      <AppleNode 
        imgSrc="/assets/environments/env_cleaner_1778949532438.png"
        role="Phase 03: The Factory Floor"
        title="The Code Cleaner"
        tags={[{ label: 'Normalizing' }, { label: 'Ghost Props Removal' }]}
      />
    </NodeWrapper>
  );
}

/* ─── 4. Transformer Node ──────────────────────────────────────────────── */
function TransformerNode() {
  const n = nodesData[4];
  return (
    <NodeWrapper id={n.id} x={n.x} y={n.y} width={1200}>
      <AppleNode 
        imgSrc="/assets/environments/env_transformer_1778949551384.png"
        role="Phase 03: The Factory Floor"
        title="The Native Engineer"
        tags={[{ label: 'Web → Native Forging', color: '#10b981' }]}
      />
    </NodeWrapper>
  );
}

/* ─── 5. Verifier Node ─────────────────────────────────────────────────── */
function VerifierNode() {
  const n = nodesData[5];
  return (
    <NodeWrapper id={n.id} x={n.x} y={n.y} width={1200}>
      <AppleNode 
        imgSrc="/assets/environments/env_verifier_1778949570029.png"
        role="Phase 03: The Factory Floor"
        title="The QA Inspector"
        tags={[{ label: 'AST Syntax Validation' }]}
      />
    </NodeWrapper>
  );
}

/* ─── 6. Healer Node ───────────────────────────────────────────────────── */
function HealerNode() {
  const n = nodesData[6];
  return (
    <NodeWrapper id={n.id} x={n.x} y={n.y} width={1200}>
      <AppleNode 
        imgSrc="/assets/environments/env_healer_1778949591682.png"
        role="Phase 03: The Factory Floor"
        title="The Fixer"
        tags={[{ label: 'Autonomous Error Healing', color: '#f59e0b' }]}
      />
    </NodeWrapper>
  );
}

/* ─── 7. Writer Node ───────────────────────────────────────────────────── */
function WriterNode() {
  const n = nodesData[7];
  return (
    <NodeWrapper id={n.id} x={n.x} y={n.y} width={1200}>
      <AppleNode 
        imgSrc="/assets/environments/env_writer_1778949611170.png"
        role="Phase 04: The Archive"
        title="The Committer"
        tags={[{ label: 'Atomic File Writes', color: '#3b82f6' }, { label: 'State Saved' }]}
      />
    </NodeWrapper>
  );
}

/* ─── 8. Documenter Node ───────────────────────────────────────────────── */
function DocumenterNode() {
  const n = nodesData[8];
  return (
    <NodeWrapper id={n.id} x={n.x} y={n.y} width={1200}>
      <AppleNode 
        imgSrc="/assets/environments/env_documenter_1778949628769.png"
        role="Phase 05: Deployment"
        title="The Release Manager"
        tags={[{ label: 'Expo SDK 54+ Assembled', color: '#10b981' }, { label: 'RETRANSIFY_REPORT.md Generated' }]}
      />
    </NodeWrapper>
  );
}

/* ─── 9. Dashboard Node ────────────────────────────────────────────────── */
function DashboardNode() {
  const n = nodesData[9]; const color = SDLC_COLORS[n.sdlcStep];
  return (
    <NodeWrapper id={n.id} x={n.x} y={n.y} width={560}>
      <Dot color={color}/>
      <div className="glass-card glass-card--purple" style={{ padding: 40 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color, marginBottom: 8 }}>
            Phase 06: The Boardroom (ROI)
          </div>
          <h2 style={{ fontSize: 32, fontWeight: 800, color: '#fff' }}>Executive Summary</h2>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 16, marginBottom: 24 }}>
          <div className="roi-hex">
            <div className="roi-hex-inner">
              <p className="roi-card__label" style={{fontSize:10}}>Small Apps</p>
              <p className="roi-card__val" style={{fontSize:16, marginTop:4}}>27.3m</p>
              <p style={{fontSize:10, color:'#10b981', marginTop:4}}>95% Acc</p>
            </div>
          </div>
          <div className="roi-hex">
            <div className="roi-hex-inner">
              <p className="roi-card__label" style={{fontSize:10}}>Mid Apps</p>
              <p className="roi-card__val" style={{color:'#6366f1', fontSize:16, marginTop:4}}>37.0m</p>
              <p style={{fontSize:10, color:'#10b981', marginTop:4}}>91% Acc</p>
            </div>
          </div>
          <div className="roi-hex">
            <div className="roi-hex-inner">
              <p className="roi-card__label" style={{fontSize:10}}>Complex Apps</p>
              <p className="roi-card__val" style={{color:'#10b981', fontSize:16, marginTop:4}}>149.0m</p>
              <p style={{fontSize:10, color:'#f43f5e', marginTop:4}}>64% Acc</p>
            </div>
          </div>
          <div className="roi-hex">
            <div className="roi-hex-inner">
              <p className="roi-card__label" style={{fontSize:10}}>Highest Efficiency</p>
              <p className="roi-card__val" style={{color:'#22d3ee', fontSize:16, marginTop:4}}>$0.003</p>
              <p style={{fontSize:10, color:'rgba(255,255,255,0.3)', marginTop:4}}>livescore</p>
            </div>
          </div>
        </div>
      </div>
    </NodeWrapper>
  );
}

export default function StoryUI() {
  return (
    <>
      <CanvasPaths/>
      <IntroNode/>
      <AnalystNode/>
      <ArchitectNode/>
      <CleanerNode/>
      <TransformerNode/>
      <VerifierNode/>
      <HealerNode/>
      <WriterNode/>
      <DocumenterNode/>
      <DashboardNode/>
    </>
  );
}
