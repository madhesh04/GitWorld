"use client";
import React, { useState, useEffect, useRef, use } from 'react';
import { useRouter } from 'next/navigation';
import { useGameState } from '@/components/gamification/GameStateProvider';
import { TopNav } from '@/components/ui/TopNav';
import { PixelButton } from '@/components/ui/PixelButton';
import { Confetti } from '@/components/ui/background/Confetti';
import { CHALLENGES } from '@/lib/constants';

function runGit(state: any, raw: string) {
  const args = raw.trim().split(/\s+/);
  const cmd = args[0];
  if (cmd === "git" && args[1] === "status") {
    const out = [];
    out.push({ c: "white-70", t: `On branch ${state.branch}` });
    if (state.staged.length) {
      out.push({ c: "white-70", t: "Changes to be committed:" });
      out.push({ c: "white-50", t: '  (use "git restore --staged <file>..." to unstage)' });
      state.staged.forEach((f: string) => out.push({ c: "green", t: `        new file:   ${f}` }));
    }
    const untracked = state.files.filter((f: string) => !state.staged.includes(f) && !state.committed.includes(f));
    if (untracked.length) {
      out.push({ c: "white-70", t: "Untracked files:" });
      out.push({ c: "white-50", t: '  (use "git add <file>..." to include in what will be committed)' });
      untracked.forEach((f: string) => out.push({ c: "red", t: `        ${f}` }));
    }
    if (!state.staged.length && !untracked.length) out.push({ c: "white-70", t: "nothing to commit, working tree clean" });
    return { state, out };
  }
  if (cmd === "git" && args[1] === "init") {
    return { state: { ...state, initialized: true }, out: [{ c: "green", t: "Initialized empty Git repository in /project/.git/" }] };
  }
  if (cmd === "git" && args[1] === "clone") {
    const url = args[2] || "starter.git";
    return { 
      state: { ...state, cloned: true }, 
      out: [
        { c: "white-70", t: `Cloning into '${url.split('/').pop()?.replace('.git','')}'...` },
        { c: "white-50", t: "remote: Enumerating objects: 12, done." },
        { c: "white-50", t: "Receiving objects: 100% (12/12), done." },
      ] 
    };
  }
  if (cmd === "git" && args[1] === "add") {
    const target = args[2];
    if (!target) return { state, out: [{ c: "red", t: "Nothing specified, nothing added." }] };
    if (target === ".") {
      const all = state.files.filter((f: string) => !state.committed.includes(f));
      return { state: { ...state, staged: [...new Set([...state.staged, ...all])] }, out: [{ c: "white-30", t: "(no output — files staged successfully)" }] };
    }
    if (!state.files.includes(target)) return { state, out: [{ c: "red", t: `fatal: pathspec '${target}' did not match any files` }] };
    return { state: { ...state, staged: [...new Set([...state.staged, target])] }, out: [{ c: "white-30", t: "(no output — file staged successfully)" }] };
  }
  if (cmd === "git" && args[1] === "reset") {
    return { state: { ...state, staged: [] }, out: [{ c: "white-70", t: "unstaged everything" }] };
  }
  if (cmd === "git" && args[1] === "commit") {
    const mIdx = args.findIndex(a => a === "-m");
    let msg = null;
    if (mIdx >= 0) {
      const rest = args.slice(mIdx + 1).join(" ");
      const m = rest.match(/^["'](.*)["']$/) || rest.match(/^(.+)$/);
      if (m) msg = m[1];
    }
    if (!msg) return { state, out: [{ c: "red", t: "error: please supply a commit message with -m" }] };
    if (!state.staged.length) return { state, out: [{ c: "red", t: "nothing to commit, working tree clean" }] };
    const sha = Math.random().toString(36).slice(2, 9);
    const newCommitted = [...state.committed, ...state.staged];
    return {
      state: { ...state, staged: [], committed: newCommitted, lastMsg: msg, lastSha: sha },
      out: [
        { c: "green", t: `[${state.branch} ${sha}] ${msg}` },
        { c: "green", t: ` ${state.staged.length} file changed, 42 insertions(+)` },
      ],
      committed: { msg, files: state.staged.slice() },
    };
  }
  if (cmd === "git" && args[1] === "log") {
    if (!state.committed.length) return { state, out: [{ c: "white-70", t: "fatal: your current branch 'main' does not have any commits yet" }] };
    return { state, out: [
      { c: "amber", t: `commit ${state.lastSha || "abc1234"}` },
      { c: "white-70", t: "Author: traveler <you@gitworld.io>" },
      { c: "white-70", t: "" },
      { c: "white-70", t: `    ${state.lastMsg || "feat: add hero"}` },
    ]};
  }
  if (cmd === "git" && args[1] === "help") {
    return { state, out: [
      { c: "amber", t: "Available: git status, git init, git clone, git add <file>, git commit -m \"msg\", git log, git reset" },
    ]};
  }
  if (cmd === "clear") return { state, out: "__CLEAR__" };
  if (!cmd) return { state, out: [] };
  return { state, out: [{ c: "red", t: `command not found: ${raw}` }] };
}

const COLOR_MAP: Record<string, string> = {
  "amber": "var(--amber)",
  "green": "var(--pixel-green)",
  "dim-green": "var(--pixel-dim)",
  "red": "#f87171",
  "white-70": "var(--white-70)",
  "white-60": "rgba(255,255,255,0.6)",
  "white-50": "var(--white-50)",
  "white-30": "var(--white-30)",
};

export default function ChallengePage({ params }: { params: Promise<{ zoneId: string }> }) {
  const { zoneId } = use(params);
  const router = useRouter();
  const { awardXp, completeLesson } = useGameState();

  const challenge = CHALLENGES[zoneId] || CHALLENGES.forge;

  const [state, setState] = useState({
    files: challenge.files,
    staged: [],
    committed: [],
    branch: "main",
    lastMsg: null,
    lastSha: null,
    initialized: false,
    cloned: false,
  });

  const [history, setHistory] = useState<any[]>([
    { c: "dim-green", t: "GitWorld Terminal v1.0 — Type 'git help' for commands" },
    { c: "white-70", t: "" },
    { c: "amber", t: `CHALLENGE: ${challenge.objective}` },
    { c: "white-70", t: "" },
  ]);
  const [input, setInput] = useState("");
  const [hintsUsed, setHintsUsed] = useState(0);
  const [feedback, setFeedback] = useState<any>({ 
    kind: "neutral", 
    title: "Begin when ready", 
    body: challenge.body, 
    lastCmd: null 
  });
  const [success, setSuccess] = useState(false);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const termRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  
  useEffect(() => {
    if (termRef.current) termRef.current.scrollTop = termRef.current.scrollHeight;
  }, [history]);

  const submit = (cmd: string) => {
    if (!cmd.trim()) return;
    const newCmdHist = [cmd, ...cmdHistory].slice(0, 50);
    setCmdHistory(newCmdHist); setHistIdx(-1);

    const result = runGit(state, cmd);
    if (result.out === "__CLEAR__") {
      setHistory([]);
      setInput("");
      return;
    }
    const promptLine = { c: "amber", t: "$ ", cmd: cmd };
    let newHistory = [...history, promptLine, ...(result.out as any[]), { c: "white-70", t: "" }];
    setHistory(newHistory);
    setState(result.state);
    setInput("");

    // Use dynamic validation logic from the challenge definition
    const validation = challenge.validation(result.state, cmd);
    if (validation.ok) {
      setFeedback({ kind: "ok", title: "✓ Challenge complete!", body: validation.msg, lastCmd: cmd });
      setTimeout(() => setSuccess(true), 600);
    } else {
      // Basic feedback if not complete
      if (cmd.startsWith("git status")) {
        setFeedback({ kind: "ok", title: "✓ git status", body: "Good. Inspect your working tree to know your next move.", lastCmd: cmd });
      } else if (cmd.startsWith("git init")) {
        setFeedback({ kind: "ok", title: "✓ git init", body: "Repository started! Keep going.", lastCmd: cmd });
      } else if (cmd.startsWith("git add")) {
        setFeedback({ kind: "neutral", title: "File staged", body: "Check with `git status` to see your staging area.", lastCmd: cmd });
      } else if (cmd.startsWith("git")) {
        setFeedback({ kind: "neutral", title: "Command processed", body: "Keep following the objective.", lastCmd: cmd });
      }
    }
  };

  const onKey = (e: any) => {
    if (e.key === "Enter") { submit(input); }
    else if (e.key === "ArrowUp") {
      e.preventDefault();
      const ni = Math.min(histIdx + 1, cmdHistory.length - 1);
      if (ni >= 0) { setHistIdx(ni); setInput(cmdHistory[ni]); }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const ni = histIdx - 1;
      if (ni < 0) { setHistIdx(-1); setInput(""); }
      else { setHistIdx(ni); setInput(cmdHistory[ni]); }
    }
  };

  const revealHint = () => {
    if (hintsUsed >= challenge.hints.length) return;
    const h = challenge.hints[hintsUsed];
    setHintsUsed(hintsUsed + 1);
    setFeedback({ kind: "hint", title: `HINT ${hintsUsed + 1}/${challenge.hints.length}`, body: h, lastCmd: feedback.lastCmd });
  };

  const multiplier = 1 + Math.max(0, (3 - hintsUsed) * 0.2) + 0.3;
  const cappedMult = Math.min(1.95, multiplier);
  
  const onSuccessOverlayContinue = () => {
    setSuccess(false);
    
    // Mark challenge as complete to unlock next zone
    completeLesson(`challenge-${zoneId}`, zoneId);

    awardXp({
      baseXp: challenge.xp,
      hintsUsed,
      firstTry: hintsUsed === 0,
      label: `${challenge.title} challenge complete!`,
      badgeName: hintsUsed === 0 ? challenge.badge : undefined,
      badgeIcon: challenge.badgeIcon,
      badgeDesc: "Completed a zone challenge without hints",
      badgeXp: 75,
    });
    router.push(`/world`);
  };

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", paddingTop: 64 }}>
      <TopNav />

      {/* Objective */}
      <div style={{ background: "var(--navy-mid)", borderBottom: "2px solid var(--amber)", padding: "16px 32px",
        display: "flex", gap: 32, minHeight: 128, alignItems: "center" }}>
        <div style={{ flex: 1 }}>
          <div className="t-pixel" style={{ fontSize: 8, color: "var(--amber)", letterSpacing: 3, marginBottom: 8 }}>OBJECTIVE</div>
          <div className="t-pixel" style={{ fontSize: 13, color: "#fff", letterSpacing: 1, marginBottom: 10 }}>{challenge.title}</div>
          <div className="t-body" style={{ fontSize: 13, color: "var(--white-70)", lineHeight: 1.5 }}>
            {challenge.body}
          </div>
        </div>
        <div style={{ width: 280 }}>
          <div className="t-pixel" style={{ fontSize: 14, color: "var(--amber)", letterSpacing: 1, marginBottom: 6,
            textShadow: "0 0 12px rgba(245,158,11,0.6)" }}>⭐ {challenge.xp} XP</div>
          <div className="t-pixel" style={{ fontSize: 7, color: "var(--white-40)", letterSpacing: 1, marginBottom: 12 }}>
            Up to {cappedMult.toFixed(2)}x with no hints
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, justifyContent: "space-between" }}>
            <span className="t-pixel" style={{ fontSize: 8, color: "var(--white-50)", letterSpacing: 1 }}>HINTS: {hintsUsed}/{challenge.hints.length}</span>
            <PixelButton size="sm" variant="secondary" onClick={revealHint} disabled={hintsUsed >= challenge.hints.length}>REVEAL HINT</PixelButton>
          </div>
          <div className="t-pixel" style={{ fontSize: 7, color: "#fb923c", letterSpacing: 1, marginTop: 8 }}>⚠ Hints reduce XP reward</div>
        </div>
      </div>

      {/* Terminal */}
      <div style={{ flex: 1, background: "var(--navy-darker)", display: "flex", flexDirection: "column",
        position: "relative", overflow: "hidden",
        boxShadow: "0 -2px 0 var(--amber), 0 2px 0 var(--amber)",
      }}>
        {/* terminal title bar */}
        <div style={{ height: 36, background: "#0a0f1a", display: "flex", alignItems: "center", padding: "0 16px", gap: 8,
          borderBottom: "1px solid rgba(245,158,11,0.2)", flexShrink: 0 }}>
          <span style={{ width: 12, height: 12, background: "#ff5f56", borderRadius: 0 }} />
          <span style={{ width: 12, height: 12, background: "#ffbd2e", borderRadius: 0 }} />
          <span style={{ width: 12, height: 12, background: "#27c93f", borderRadius: 0 }} />
          <span className="t-mono" style={{ fontSize: 12, color: "var(--white-40)", margin: "0 auto" }}>gitworld — bash</span>
          <span className="t-mono" style={{ fontSize: 11, color: "var(--white-30)" }}>~/challenge/{zoneId}</span>
        </div>

        {/* scrollback */}
        <div ref={termRef} onClick={() => inputRef.current?.focus()} style={{
          flex: 1, overflowY: "auto", padding: 16, fontFamily: "var(--font-mono)", fontSize: 13, lineHeight: 1.6,
          cursor: "text",
        }}>
          {history.map((h, i) => (
            <div key={i} style={{ color: COLOR_MAP[h.c] || "var(--white-70)", whiteSpace: "pre-wrap" }}>
              {h.cmd ? (<><span style={{ color: "var(--amber)" }}>{h.t}</span><span style={{ color: "var(--pixel-green)" }}>{h.cmd}</span></>) : (h.t || "\u00A0")}
            </div>
          ))}
          {/* input row */}
          <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
            <span style={{ color: "var(--amber)" }}>$&nbsp;</span>
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={onKey}
              spellCheck={false}
              autoComplete="off"
              style={{
                flex: 1, background: "transparent", border: 0, outline: "none",
                color: "var(--pixel-green)", fontFamily: "var(--font-mono)", fontSize: 13,
                caretColor: "var(--amber)",
              }}
              placeholder="type a git command..."
            />
          </div>
        </div>

        {/* CRT scanlines */}
        <div className="crt-scanlines" />
      </div>

      {/* Feedback */}
      <div style={{ background: "var(--navy-mid)", boxShadow: "0 -4px 0 var(--amber)", padding: "16px 32px",
        display: "flex", gap: 32, minHeight: 160, alignItems: "stretch" }}>
        <div style={{ flex: 1 }}>
          <div className="t-pixel" style={{ fontSize: 8, color: "var(--amber)", letterSpacing: 3, marginBottom: 10 }}>FEEDBACK</div>
          {feedback.lastCmd && (
            <span className={"pixel-chip " + (feedback.kind === "ok" ? "green" : feedback.kind === "warn" ? "orange" : feedback.kind === "err" ? "red" : "dim")}
              style={{ fontFamily: "var(--font-mono)", fontSize: 10, marginBottom: 10 }}>
              {feedback.title}
            </span>
          )}
          <div className="t-body" style={{ fontSize: 13, color: "var(--white-90)", lineHeight: 1.5, marginTop: 10 }}>
            {feedback.body}
          </div>
          <div className="t-mono" style={{ fontSize: 11, color: "var(--white-40)", marginTop: 12 }}>
            {state.initialized && <span style={{ color: "var(--pixel-green)" }}>REPO INITIALIZED  ·  </span>}
            FILES: {state.files.join(", ")}
            {state.staged.length > 0 && <span style={{ color: "var(--pixel-green)" }}>  ·  STAGED: {state.staged.join(", ")}</span>}
          </div>
        </div>
        <div style={{ width: 260 }}>
          <div className="t-pixel" style={{ fontSize: 8, color: "var(--white-50)", letterSpacing: 2, marginBottom: 8 }}>QUICK COMMANDS</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {(zoneId === "init" ? ["git init", "git clone"] : ["git status", "git add", "git commit"]).map(c => (
              <button key={c} onClick={() => { setInput(c); inputRef.current?.focus(); }}
                className="t-mono pixel-border-subtle"
                style={{
                  textAlign: "left", padding: "8px 10px", background: "var(--navy-darker)",
                  color: "var(--pixel-green)", border: 0, fontSize: 11, cursor: "pointer",
                }}>$ {c}</button>
            ))}
          </div>
        </div>
      </div>

      {success && <SuccessOverlay
        baseXp={challenge.xp} hintsUsed={hintsUsed} firstTry={hintsUsed === 0}
        badgeIcon={challenge.badgeIcon} badgeName={challenge.badge}
        onContinue={onSuccessOverlayContinue}
        onBack={() => { setSuccess(false); router.push(`/zone/${zoneId}`); }}
      />}
    </div>
  );
}

function SuccessOverlay({ baseXp, hintsUsed, firstTry, badgeIcon, badgeName, onContinue, onBack }: any) {
  const noHintsMult = hintsUsed === 0 ? 1.5 : null;
  const firstTryMult = firstTry ? 1.3 : null;
  const total = Math.round(baseXp * (noHintsMult || 1) * (firstTryMult || 1));

  return (
    <div className="fade-in" style={{
      position: "fixed", inset: 0, zIndex: 1000,
      background: "rgba(10,14,26,0.92)", backdropFilter: "blur(8px)",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <Confetti count={36} />
      <div className="card-rise pixel-border-heavy" style={{
        background: "var(--navy-mid)", padding: 32, width: 420, position: "relative", zIndex: 2,
      }}>
        <div style={{ textAlign: "center" }}>
          <div className="t-pixel scale-pop" style={{ fontSize: 16, color: "var(--green-success)", letterSpacing: 2 }}>✓ CHALLENGE</div>
          <div className="t-pixel scale-pop" style={{ fontSize: 16, color: "var(--amber)", letterSpacing: 2, marginTop: 8,
            textShadow: "0 0 16px rgba(245,158,11,0.7)", animationDelay: "120ms" }}>COMPLETE!</div>
        </div>

        <div className="pixel-border-subtle" style={{ background: "var(--navy-darker)", padding: 16, marginTop: 24, fontFamily: "var(--font-mono)", fontSize: 13, lineHeight: 1.8 }}>
          <div style={{ color: "var(--white-70)" }}>BASE XP:        {baseXp}</div>
          {noHintsMult && <div style={{ color: "var(--pixel-green)" }}>NO HINTS:       ×{noHintsMult}</div>}
          {firstTryMult && <div style={{ color: "var(--pixel-green)" }}>FIRST TRY:      ×{firstTryMult}</div>}
          {hintsUsed > 0 && <div style={{ color: "#fb923c" }}>HINTS USED:     -{hintsUsed * 10}</div>}
          <div style={{ color: "var(--white-30)" }}>──────────────────────</div>
          <div style={{ color: "var(--amber)", fontWeight: 700 }}>TOTAL:          {total} XP</div>
        </div>

        {hintsUsed === 0 && (
          <div style={{ display: "flex", gap: 12, alignItems: "center", marginTop: 20,
            padding: 12, background: "rgba(245,158,11,0.06)" }}>
            <div className="pixel-border-subtle" style={{ width: 56, height: 56, background: "var(--navy-darker)",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 }}>{badgeIcon || "🔨"}</div>
            <div>
              <span className="pixel-chip green" style={{ fontSize: 6 }}>NEW BADGE</span>
              <div className="t-pixel" style={{ fontSize: 8, color: "var(--amber)", letterSpacing: 1, marginTop: 6 }}>{badgeName || "ACHIEVER"}</div>
            </div>
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 24 }}>
          <PixelButton onClick={onContinue} style={{ width: "100%" }}>CONTINUE JOURNEY →</PixelButton>
        </div>
      </div>
    </div>
  );
}
