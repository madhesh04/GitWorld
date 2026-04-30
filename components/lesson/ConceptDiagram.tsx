type DiagramType = 'staging-areas' | 'commit-tree' | 'branch-diagram' | 'clone-diagram'

interface ConceptDiagramProps {
  type: DiagramType
}

export function ConceptDiagram({ type }: ConceptDiagramProps) {
  return (
    <div className="my-6 overflow-x-auto">
      <svg
        viewBox="0 0 500 160"
        className="w-full max-w-xl mx-auto"
        aria-label={`Diagram: ${type}`}
      >
        {type === 'staging-areas' && <StagingAreasDiagram />}
        {type === 'commit-tree' && <CommitTreeDiagram />}
        {type === 'branch-diagram' && <BranchDiagram />}
        {type === 'clone-diagram' && <CloneDiagram />}
      </svg>
    </div>
  )
}

function Box({
  x, y, w = 110, h = 44, label, sublabel, fill = '#111827', stroke = '#2d5a27',
}: {
  x: number; y: number; w?: number; h?: number
  label: string; sublabel?: string; fill?: string; stroke?: string
}) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={fill} stroke={stroke} strokeWidth={2} />
      <text x={x + w / 2} y={sublabel ? y + 16 : y + h / 2 + 5} textAnchor="middle" fontSize={9} fill="#f59e0b" fontFamily="monospace">
        {label}
      </text>
      {sublabel && (
        <text x={x + w / 2} y={y + 30} textAnchor="middle" fontSize={7} fill="#64748b" fontFamily="monospace">
          {sublabel}
        </text>
      )}
    </g>
  )
}

function Arrow({ x1, y1, x2, y2, label }: { x1: number; y1: number; x2: number; y2: number; label?: string }) {
  const mx = (x1 + x2) / 2
  const my = (y1 + y2) / 2
  return (
    <g>
      <defs>
        <marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="#f59e0b" />
        </marker>
      </defs>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#f59e0b" strokeWidth={1.5} markerEnd="url(#arr)" />
      {label && (
        <text x={mx} y={my - 5} textAnchor="middle" fontSize={7} fill="#94a3b8" fontFamily="monospace">
          {label}
        </text>
      )}
    </g>
  )
}

function StagingAreasDiagram() {
  return (
    <g>
      <rect width={500} height={160} fill="#0a0e1a" />
      <Box x={10}  y={58} label="Working" sublabel="Directory" />
      <Box x={195} y={58} label="Staging" sublabel="Area" />
      <Box x={380} y={58} label="Repository" w={110} />
      <Arrow x1={122} y1={80} x2={193} y2={80} label="git add" />
      <Arrow x1={307} y1={80} x2={378} y2={80} label="git commit" />
      <text x={250} y={140} textAnchor="middle" fontSize={8} fill="#475569" fontFamily="monospace">
        The three areas of Git
      </text>
    </g>
  )
}

function CommitTreeDiagram() {
  const commits = [
    { x: 60,  hash: 'a1b2c3d', msg: 'initial commit' },
    { x: 195, hash: '3f2a1b7', msg: 'feat: add hero' },
    { x: 330, hash: '7d8e9f0', msg: 'fix: hero bug' },
  ]
  return (
    <g>
      <rect width={500} height={160} fill="#0a0e1a" />
      {commits.map((c, i) => (
        <g key={c.hash}>
          <circle cx={c.x} cy={70} r={28} fill="#111827" stroke="#2d5a27" strokeWidth={2} />
          <text x={c.x} y={66} textAnchor="middle" fontSize={7} fill="#00ff41" fontFamily="monospace">{c.hash}</text>
          <text x={c.x} y={80} textAnchor="middle" fontSize={6} fill="#94a3b8" fontFamily="monospace">{c.msg}</text>
          {i < commits.length - 1 && (
            <Arrow x1={c.x + 30} y1={70} x2={commits[i + 1].x - 30} y2={70} />
          )}
        </g>
      ))}
      {/* HEAD pointer */}
      <text x={330} y={120} textAnchor="middle" fontSize={8} fill="#f59e0b" fontFamily="monospace">HEAD →</text>
      <text x={400} y={120} textAnchor="middle" fontSize={8} fill="#22c55e" fontFamily="monospace">main</text>
      <line x1={330} y1={110} x2={330} y2={100} stroke="#f59e0b" strokeWidth={1} strokeDasharray="3 2" />
    </g>
  )
}

function BranchDiagram() {
  return (
    <g>
      <rect width={500} height={160} fill="#0a0e1a" />
      {/* Main branch */}
      {[60, 180, 300, 420].map((x, i) => (
        <g key={x}>
          <circle cx={x} cy={80} r={22} fill="#111827" stroke="#2d5a27" strokeWidth={2} />
          <text x={x} y={84} textAnchor="middle" fontSize={6} fill="#00ff41" fontFamily="monospace">C{i + 1}</text>
          {i < 3 && <Arrow x1={x + 24} y1={80} x2={x + 110} y2={80} />}
        </g>
      ))}
      {/* Feature branch */}
      <circle cx={300} cy={30} r={22} fill="#111827" stroke="#f59e0b" strokeWidth={2} />
      <text x={300} y={34} textAnchor="middle" fontSize={6} fill="#f59e0b" fontFamily="monospace">F1</text>
      <Arrow x1={180} y1={58} x2={278} y2={42} />
      <Arrow x1={322} y1={42} x2={398} y2={65} />
      <text x={300} y={8} textAnchor="middle" fontSize={7} fill="#f59e0b" fontFamily="monospace">feature</text>
      <text x={420} y={115} textAnchor="middle" fontSize={7} fill="#22c55e" fontFamily="monospace">main</text>
    </g>
  )
}

function CloneDiagram() {
  return (
    <g>
      <rect width={500} height={160} fill="#0a0e1a" />
      {/* Remote */}
      <rect x={30} y={40} width={140} height={70} fill="#111827" stroke="#f59e0b" strokeWidth={2} rx={4} />
      <text x={100} y={62} textAnchor="middle" fontSize={8} fill="#f59e0b" fontFamily="monospace">Remote Repo</text>
      <text x={100} y={78} textAnchor="middle" fontSize={7} fill="#94a3b8" fontFamily="monospace">github.com/user/repo</text>
      <text x={100} y={94} textAnchor="middle" fontSize={7} fill="#475569" fontFamily="monospace">full history ✓</text>
      {/* Arrow */}
      <Arrow x1={172} y1={75} x2={328} y2={75} label="git clone" />
      {/* Local */}
      <rect x={330} y={40} width={140} height={70} fill="#111827" stroke="#2d5a27" strokeWidth={2} rx={4} />
      <text x={400} y={62} textAnchor="middle" fontSize={8} fill="#22c55e" fontFamily="monospace">Local Repo</text>
      <text x={400} y={78} textAnchor="middle" fontSize={7} fill="#94a3b8" fontFamily="monospace">origin → remote</text>
      <text x={400} y={94} textAnchor="middle" fontSize={7} fill="#475569" fontFamily="monospace">full history ✓</text>
    </g>
  )
}
