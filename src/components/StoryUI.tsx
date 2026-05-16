import React, { useState, useEffect } from 'react';
import { Terminal, Database, Code2, ShieldAlert, UploadCloud, Activity } from 'lucide-react';

export default function StoryUI() {
  const [terminalText, setTerminalText] = useState('');
  const commandText = "retransify ./react-web-app";

  useEffect(() => {
    let typeIndex = 0;
    const interval = setInterval(() => {
      if (typeIndex < commandText.length) {
        setTerminalText((prev) => prev + commandText.charAt(typeIndex));
        typeIndex++;
      } else {
        clearInterval(interval);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
      
      {/* Intro Terminal Layer */}
      <div id="terminal-layer" className="absolute inset-0 flex flex-col items-center justify-center w-full px-6 transition-opacity duration-1000">
        <div id="terminal-window" className="w-full max-w-3xl glass-card !p-0 overflow-hidden pointer-events-auto">
          <div className="flex items-center px-4 py-3 bg-white/5 border-b border-zinc-800">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            </div>
            <div className="mx-auto text-xs text-zinc-500 font-medium tracking-wider code-font">bash - retransify</div>
          </div>
          <div className="p-8 h-64 flex flex-col justify-center code-font text-xl sm:text-2xl bg-black/40">
            <div className="flex items-center text-zinc-300">
              <span className="text-emerald-400 mr-3">➜</span> 
              <span className="text-cyan-400 mr-3">~</span> 
              <span className="text-zinc-100 font-semibold drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">{terminalText}</span>
              <span className="w-3 h-6 bg-cyan-400 animate-blink ml-1"></span>
            </div>
          </div>
        </div>

        <div id="scroll-prompt" className="mt-12 flex flex-col items-center opacity-0 transition-opacity duration-1000" style={{ opacity: terminalText.length === commandText.length ? 1 : 0 }}>
          <p className="text-sm text-zinc-400 uppercase tracking-widest mb-3 font-semibold">Scroll Down to Execute</p>
          <div className="w-6 h-6 text-cyan-400 animate-bounce">↓</div>
        </div>
      </div>

      {/* Nodes Container */}
      <div id="nodes-container" className="absolute inset-0">
        {/* 1. Requirements */}
        <div id="node-req" className="absolute top-1/2 left-1/2 md:left-[25%] opacity-0 scale-75 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center transition-all duration-500 w-[90vw] max-w-[350px]">
          <div className="w-24 h-24 rounded-2xl border border-blue-500 bg-blue-950/40 flex items-center justify-center glow-blue backdrop-blur-md mb-4">
            <Terminal className="w-12 h-12 text-blue-400" />
          </div>
          <div className="glass-card w-full">
            <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white mb-2">1. Requirements</h2>
            <span className="text-blue-400 sdlc-badge border-blue-500/30 bg-blue-500/10">CLI Input Node</span>
            <div className="relative w-full h-24 bg-white/5 border border-zinc-800 rounded-lg overflow-hidden text-left p-3 code-font text-xs text-zinc-500 flex flex-col justify-center">
              <div className="text-blue-400">➜ retransify ./web-app</div>
              <div className="text-emerald-500 mt-2">✔ React Context Detected</div>
              <div className="text-emerald-500">✔ API Keys Validated</div>
            </div>
          </div>
        </div>

        {/* 2. System Design */}
        <div id="node-design" className="absolute top-1/2 left-1/2 md:left-[75%] opacity-0 scale-75 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center transition-all duration-500 w-[90vw] max-w-[350px]">
          <div className="w-24 h-24 rounded-2xl border border-emerald-500 bg-emerald-950/40 flex items-center justify-center glow-emerald backdrop-blur-md mb-4">
            <Database className="w-12 h-12 text-emerald-400" />
          </div>
          <div className="glass-card w-full">
            <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white mb-2">2. System Design</h2>
            <span className="text-emerald-400 sdlc-badge border-emerald-500/30 bg-emerald-500/10">ts-morph Analyzer</span>
            <div className="relative w-full h-28 bg-white/5 border border-zinc-800 rounded-lg overflow-hidden text-left p-3 code-font text-xs text-zinc-500">
              <div className="laser-line"></div>
              <div className="text-emerald-500 mb-1">Mapping Architecture...</div>
              <div>├── <span className="text-white">App.tsx</span> <span className="text-emerald-600/50">✔ Planner Node</span></div>
              <div className="mt-2 text-[10px] text-emerald-400/80">Est. Cost: ~4,520 Tokens</div>
            </div>
          </div>
        </div>

        {/* 3. Implementation */}
        <div id="node-impl" className="absolute top-1/2 left-1/2 md:left-[75%] opacity-0 scale-75 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center transition-all duration-500 w-[90vw] max-w-[400px]">
          <div className="w-24 h-24 rounded-2xl border border-cyan-500 bg-cyan-950/40 flex items-center justify-center glow-cyan backdrop-blur-md mb-4">
            <Code2 className="w-12 h-12 text-cyan-400" />
          </div>
          <div className="glass-card w-full">
            <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white mb-2">3. Implementation</h2>
            <span className="text-cyan-400 sdlc-badge border-cyan-500/30 bg-cyan-500/10">LangGraph Agents • Executor</span>
            <div className="flex w-full h-32 bg-white/5 border border-zinc-800 rounded-lg overflow-hidden text-left code-font text-[10px] md:text-[11px]">
              <div className="w-1/2 p-3 border-r border-zinc-800 bg-black/40">
                <div className="text-zinc-600 mb-2">// Web (React)</div>
                <div className="text-rose-500/50 line-through">&lt;div onClick=&#123;...&#125;&gt;</div>
                <div className="pl-2 md:pl-4 text-zinc-500 line-through">&lt;p&gt;Submit&lt;/p&gt;</div>
              </div>
              <div className="w-1/2 p-3 bg-cyan-950/20 relative">
                <div className="text-cyan-600 mb-2">// Mobile (Expo)</div>
                <div className="text-cyan-400">&lt;TouchableOpacity&gt;</div>
                <div className="pl-2 md:pl-4 text-white">&lt;Text&gt;Submit&lt;/Text&gt;<span className="inline-block w-2 h-4 bg-cyan-400 animate-blink ml-1 align-middle"></span></div>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Testing QA */}
        <div id="node-qa" className="absolute top-1/2 left-1/2 md:left-[25%] opacity-0 scale-75 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center transition-all duration-500 w-[90vw] max-w-[400px]">
          <div id="qa-icon" className="w-24 h-24 rounded-2xl border border-rose-500 bg-rose-950/40 flex items-center justify-center glow-rose backdrop-blur-md mb-4 transition-colors duration-500">
            <ShieldAlert className="w-12 h-12 text-rose-400" />
          </div>
          <div className="glass-card w-full">
            <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white mb-2">4. Testing (QA)</h2>
            <span id="qa-badge" className="text-rose-400 sdlc-badge border-rose-500/30 bg-rose-500/10">Self-Healing Verifier Node</span>
            <div className="relative w-full h-24 bg-white/5 border border-zinc-800 rounded-lg overflow-hidden text-left p-3 code-font text-[10px] md:text-[11px]">
              <div id="healer-beam" className="healer-beam hidden"></div>
              <div id="code-error-state">
                <div className="text-zinc-500">// Verifier Node Running...</div>
                <div className="error-glitch mt-2">Error: Syntax/DOM invalid</div>
                <div className="text-rose-500 mt-1">Routing to Healer Node...</div>
              </div>
              <div id="code-fixed-state" className="hidden">
                <div className="text-zinc-500">// Healer Agent Intervened</div>
                <div className="text-emerald-400 mt-2">✔ Context Updated</div>
                <div className="text-emerald-500 mt-1">Status: Approved.</div>
              </div>
            </div>
          </div>
        </div>

        {/* 5. Deployment */}
        <div id="node-deploy" className="absolute top-1/2 left-1/2 md:left-[75%] opacity-0 scale-75 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center transition-all duration-500 w-[90vw] max-w-[350px]">
          <div className="w-24 h-24 rounded-2xl border border-amber-500 bg-amber-950/40 flex items-center justify-center glow-amber backdrop-blur-md mb-4">
            <UploadCloud className="w-12 h-12 text-amber-400" />
          </div>
          <div className="glass-card w-full">
            <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white mb-2">5. Deployment</h2>
            <span className="text-amber-400 sdlc-badge border-amber-500/30 bg-amber-500/10">Global Audit • Disk Writer</span>
            <div className="relative w-full h-24 bg-white/5 border border-zinc-800 rounded-lg overflow-hidden text-left p-3 code-font text-[10px] md:text-[11px] flex flex-col justify-center">
              <div className="text-zinc-400">Writing to file system...</div>
              <div className="text-amber-400 mt-1">Running Global Audit (tsc)</div>
              <div className="text-emerald-500 mt-2 font-bold">✔ Expo Project Assembled</div>
            </div>
          </div>
        </div>

        {/* 6. Maintenance */}
        <div id="node-maint" className="absolute top-1/2 left-1/2 md:left-[25%] opacity-0 scale-75 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center transition-all duration-500 w-[90vw] max-w-[400px]">
          <div className="w-24 h-24 rounded-2xl border border-purple-500 bg-purple-950/40 flex items-center justify-center glow-purple backdrop-blur-md mb-4">
            <Activity className="w-12 h-12 text-purple-400" />
          </div>
          <div className="glass-card w-full relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent pointer-events-none"></div>
            <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white mb-2">6. Maintenance (ROI)</h2>
            <span className="text-purple-400 sdlc-badge border-purple-500/30 bg-purple-500/10">thesisMetrics.js • Analytics</span>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-white/5 border border-zinc-800 p-3 rounded-lg text-left">
                <div className="text-[10px] text-zinc-500 uppercase tracking-wide">Manual Time</div>
                <div className="text-xl md:text-2xl font-bold text-zinc-400 line-through">14 Days</div>
              </div>
              <div className="bg-purple-950/30 border border-purple-500/50 p-3 rounded-lg text-left shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                <div className="text-[10px] text-purple-300 uppercase tracking-wide">Retransify Time</div>
                <div className="text-xl md:text-2xl font-bold text-white"><span id="time-counter">0</span> Min</div>
              </div>
              <div className="bg-white/5 border border-zinc-800 p-3 rounded-lg text-left col-span-2 flex justify-between items-center">
                <div className="text-[10px] text-zinc-500 uppercase tracking-wide">Total API Cost</div>
                <div className="text-xl md:text-2xl font-bold text-emerald-400">$<span id="cost-counter">0.00</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Finale */}
      <div id="finale-layer" className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-0">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-8 px-4 text-center" id="finale-title">From Code to Product.</h1>
        <div className="mt-[600px] text-center opacity-0 translate-y-[50px] pointer-events-auto" id="finale-cta">
          <div className="code-font text-sm text-zinc-400 bg-zinc-900 border border-zinc-800 py-3 px-6 rounded-full inline-block shadow-lg">
            <span className="text-cyan-400">npm</span> install -g retransify
          </div>
        </div>
      </div>

    </div>
  );
}
