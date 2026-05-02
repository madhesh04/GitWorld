import React from 'react';

export function DiagramBranching() {
  return (
    <div style={{ margin: "32px 0", background: "#0d1117", padding: "24px", border: "1px solid rgba(245,158,11,0.2)" }}>
      <div style={{ fontFamily: "var(--font-pixel)", fontSize: 8, color: "#f59e0b", letterSpacing: 2, marginBottom: 20, textAlign: "center" }}>
        BRANCHING: PARALLEL TIMELINES
      </div>
      <svg viewBox="0 0 600 120" style={{ width: "100%", height: "auto", display: "block" }}>
        {/* Main branch */}
        <line x1="40" y1="60" x2="560" y2="60" stroke="rgba(255,255,255,0.1)" strokeWidth="4" />
        <text x="40" y="50" fill="rgba(255,255,255,0.3)" style={{ fontFamily: "var(--font-pixel)", fontSize: 7 }}>main</text>
        
        {/* Commits on main */}
        {[80, 160, 240, 320, 400, 480].map((x, i) => (
          <circle key={i} cx={x} cy={60} r={6} fill="#16a34a" />
        ))}

        {/* Branch line */}
        <path d="M 240 60 Q 280 100 320 100 L 520 100" fill="none" stroke="#f59e0b" strokeWidth="3" strokeDasharray="4 2" />
        <text x="330" y="115" fill="#f59e0b" style={{ fontFamily: "var(--font-pixel)", fontSize: 7 }}>feature-branch</text>

        {/* Commits on branch */}
        {[340, 420, 500].map((x, i) => (
          <circle key={i} cx={x} cy={100} r={6} fill="#f59e0b" />
        ))}
        
        {/* Pointer */}
        <path d="M 500 90 L 500 80" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow)" />
        <text x="500" y="75" textAnchor="middle" fill="#f59e0b" style={{ fontFamily: "var(--font-pixel)", fontSize: 6 }}>HEAD</text>
        
        <defs>
          <marker id="arrow" markerWidth="10" markerHeight="10" refX="0" refY="3" orientation="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,6 L9,3 z" fill="#f59e0b" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}

export function DiagramMerging() {
  return (
    <div style={{ margin: "32px 0", background: "#0d1117", padding: "24px", border: "1px solid rgba(245,158,11,0.2)" }}>
      <div style={{ fontFamily: "var(--font-pixel)", fontSize: 8, color: "#f59e0b", letterSpacing: 2, marginBottom: 20, textAlign: "center" }}>
        MERGING: REUNITING HISTORIES
      </div>
      <svg viewBox="0 0 600 140" style={{ width: "100%", height: "auto", display: "block" }}>
        {/* main */}
        <line x1="40" y1="40" x2="560" y2="40" stroke="rgba(255,255,255,0.1)" strokeWidth="4" />
        {[80, 160, 240, 480].map((x, i) => (
          <circle key={i} cx={x} cy={40} r={6} fill="#16a34a" />
        ))}
        
        {/* branch */}
        <path d="M 240 40 Q 280 90 320 90 L 400 90 Q 440 90 480 40" fill="none" stroke="#f59e0b" strokeWidth="3" />
        {[320, 400].map((x, i) => (
          <circle key={i} cx={x} cy={90} r={6} fill="#f59e0b" />
        ))}
        
        {/* Merge Commit */}
        <circle cx={480} cy={40} r={10} fill="none" stroke="#fff" strokeWidth="2" strokeDasharray="4 2" />
        <text x="480" y="25" textAnchor="middle" fill="#fff" style={{ fontFamily: "var(--font-pixel)", fontSize: 6 }}>MERGE COMMIT</text>
      </svg>
    </div>
  );
}

export function DiagramRebasing() {
  return (
    <div style={{ margin: "32px 0", background: "#0d1117", padding: "24px", border: "1px solid rgba(245,158,11,0.2)" }}>
      <div style={{ fontFamily: "var(--font-pixel)", fontSize: 8, color: "#f59e0b", letterSpacing: 2, marginBottom: 20, textAlign: "center" }}>
        REBASING: LINEAR HISTORY
      </div>
      <svg viewBox="0 0 600 120" style={{ width: "100%", height: "auto", display: "block" }}>
        <line x1="40" y1="60" x2="560" y2="60" stroke="rgba(255,255,255,0.1)" strokeWidth="4" />
        
        {/* Base commits */}
        {[80, 160, 240, 320].map((x, i) => (
          <circle key={i} cx={x} cy={60} r={6} fill="#16a34a" />
        ))}
        
        {/* Rebased commits */}
        {[400, 480, 560].map((x, i) => (
          <g key={i}>
            <circle cx={x} cy={60} r={6} fill="#f59e0b" />
            <text x={x} y={78} textAnchor="middle" fill="#f59e0b" style={{ fontFamily: "var(--font-mono)", fontSize: 8 }}>'</text>
          </g>
        ))}
        
        <text x="480" y="45" textAnchor="middle" fill="#f59e0b" style={{ fontFamily: "var(--font-pixel)", fontSize: 6 }}>CLEAN & LINEAR</text>
      </svg>
    </div>
  );
}
