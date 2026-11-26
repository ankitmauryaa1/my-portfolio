import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  Bot,
  CalendarDays,
  Check,
  CheckCheck,
  Clock3,
  Database,
  Layers,
  MapPin,
  MessageCircle,
  Navigation,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

import type { PortfolioProject } from "@/lib/portfolio-data";

function QueryConversationVisual({ compact }: { compact?: boolean }) {
  return (
    <div className={`whatsapp-preview w-full h-full flex flex-col justify-between ${compact ? "p-2.5" : "p-3 sm:p-4"} bg-[#0b141a] text-[#e9edef] select-none font-sans overflow-hidden`}>
      {/* WhatsApp Official Dark Header */}
      <div className="flex items-center justify-between pb-2 border-b border-[#222e35] shrink-0">
        <div className="flex items-center gap-2">
          <div className="relative">
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#00a884] to-[#25d366] flex items-center justify-center text-white text-[11px] font-bold shadow-sm">
              <Bot size={14} className="text-white" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#25d366] border border-[#0b141a]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <strong className="text-xs font-semibold text-[#e9edef] tracking-tight">QueryPilot</strong>
              <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-[#00a884] text-white" title="Illustrative QueryPilot interaction">
                <Check size={9} strokeWidth={3} />
              </span>
            </div>
            <span className="text-[9px] font-mono text-[#25d366] block leading-tight">
              Natural language to SQL
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1 font-mono text-[9px] text-[#8696a0] bg-[#1f2c34] px-2 py-0.5 rounded border border-[#2a3942]">
          <Zap size={10} className="text-[#25d366]" />
          <span>SQL</span>
        </div>
      </div>

      {/* WhatsApp Message Thread - Centered and full height balance */}
      <div className="flex-1 flex flex-col justify-center gap-2.5 my-2.5 overflow-hidden">
        {/* Agent message bubble with embedded Shopify Order & WhatsApp Action Buttons */}
        <div className="self-start max-w-[94%] bg-[#202c33] rounded-lg rounded-tl-none p-2.5 border border-[#2a3942]/60 shadow-md">
          {/* Embedded Shopify D2C Order Snapshot */}
          <div className="bg-[#111b21] rounded p-2 mb-2 border border-[#2a3942] flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-[#202c33] flex items-center justify-center text-[#25d366] shrink-0">
                <ShoppingBag size={13} />
              </div>
              <div className="overflow-hidden leading-tight">
                <span className="font-semibold text-[#e9edef] block truncate">Database Explorer</span>
                <span className="text-[9px] text-[#8696a0] block truncate">Relational tables and CSV data</span>
              </div>
            </div>
            <span className="text-[9px] font-mono text-[#25d366] bg-[#00a884]/15 border border-[#00a884]/30 px-1.5 py-0.5 rounded shrink-0">
              MySQL
            </span>
          </div>

          <p className="text-[11px] text-[#d1d7db] leading-snug">
            Explore your database schema and ask a question in plain language.
          </p>

          {/* Authentic WhatsApp Quick-Reply Chips */}
          <div className="mt-2 flex gap-1.5">
            <div className="flex-1 py-1.5 px-2 bg-[#00a884]/20 border border-[#00a884]/70 rounded text-[10px] font-medium text-[#25d366] flex items-center justify-center gap-1 shadow-sm">
              <Check size={11} strokeWidth={2.5} /> Explore schema
            </div>
            <div className="py-1.5 px-2 bg-[#111b21] border border-[#2a3942] rounded text-[10px] text-[#8696a0] flex items-center justify-center gap-0.5">
              <span>Upload CSV</span>
            </div>
          </div>
          <span className="text-[8.5px] font-mono text-[#8696a0] text-right block mt-1">Assistant</span>
        </div>

        {/* Customer Outgoing Message */}
        <div className="self-end max-w-[85%] bg-[#005c4b] text-white rounded-lg rounded-tr-none px-3 py-1.5 text-[11px] shadow-sm flex items-end gap-2">
          <span className="leading-snug">How do sales compare across regions?</span>
          <span className="text-[8.5px] font-mono text-emerald-200/80 flex items-center gap-0.5 shrink-0">
            Question
            <CheckCheck size={13} className="text-[#53bdeb]" />
          </span>
        </div>
      </div>

      {/* Autonomous Real-time Decisioning Footer */}
      <div className="flex items-center justify-between bg-[#1f2c34] px-2.5 py-1.5 rounded border border-[#2a3942] text-[9px] font-mono shrink-0">
        <span className="flex items-center gap-1.5 text-[#25d366]">
          <ShieldCheck size={12} className="text-[#25d366]" />
          <span>Generate and execute SQL</span>
        </span>
        <span className="text-[#8696a0] flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Visualize results</span>
        </span>
      </div>
    </div>
  );
}

function RadarVisual() {
  return (
    <div className="radar-preview relative w-full h-full min-h-[190px] flex items-center justify-center overflow-hidden">
      {/* Animated Sweep Radar Arm & Concentric Rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative w-44 h-44 rounded-full border border-emerald-500/20">
          <div className="absolute inset-4 rounded-full border border-dashed border-emerald-500/25" />
          <div className="absolute inset-10 rounded-full border border-emerald-500/30" />
          <div className="radar-sweep-arm" />
        </div>
      </div>

      {/* Radar Detection Points with Ping rings */}
      <div className="radar-point point-one relative">
        <span className="radar-ping-ring" />
        <MapPin size={12} />
      </div>
      <div className="radar-point point-two relative">
        <span className="radar-ping-ring" style={{ animationDelay: "800ms" }} />
        <Users size={12} />
      </div>
      <div className="radar-point point-three relative">
        <span className="radar-ping-ring" style={{ animationDelay: "1400ms" }} />
        <CalendarDays size={12} />
      </div>

      {/* Dynamic labels */}
      <div className="radar-label label-one flex items-center gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span>Report an issue</span>
      </div>
      <div className="radar-label label-two flex items-center gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span>Track complaint status</span>
      </div>

      {/* Center compass */}
      <div className="radar-center shadow-lg shadow-emerald-500/30">
        <Navigation size={15} className="animate-spin [animation-duration:12s]" />
      </div>

      <div className="absolute bottom-2 left-3 font-mono text-[9px] text-emerald-500/70">
        CIVICPULSE · CONCEPT ILLUSTRATION
      </div>
    </div>
  );
}

function AnalysisWorkflowVisual({ project, compact }: { project: PortfolioProject; compact?: boolean }) {
  return (
    <div className={`workflow-preview w-full flex flex-col justify-between ${compact ? "p-2.5" : "p-4"} bg-gradient-to-b from-card/90 to-background/95 text-foreground select-none overflow-hidden h-full`}>
      {/* Top Status Bar */}
      <div className="flex items-center justify-between pb-1.5 border-b border-border/50 font-mono text-[9px]">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <strong className="text-foreground tracking-wider font-semibold">ANALYSIS WORKFLOW</strong>
          <span className="text-muted-foreground">· 3 Stages</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <span className="text-[#ff7a3d] font-semibold">{project.stack[0]}</span>
          <span>{project.stack[1]}</span>
        </div>
      </div>

      {/* Connected 3-Node Architecture Canvas */}
      <div className="relative my-1.5 flex items-center justify-between gap-1.5">
        {/* Node 1: Ride Trends */}
        <div className="flex-1 rounded-lg border border-sky-500/30 bg-sky-500/5 p-2 relative shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[7.5px] font-mono uppercase tracking-wider text-sky-400 font-semibold bg-sky-500/10 px-1 rounded">
              Ingest
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
          </div>
          <div className="flex items-center gap-1.5 my-1">
            <div className="w-5 h-5 rounded bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400 shrink-0">
              <Database size={11} />
            </div>
            <strong className="text-[10px] font-semibold text-foreground leading-tight truncate">
              Ride Trends
            </strong>
          </div>
          <div className="font-mono text-[8px] text-muted-foreground truncate">Source data</div>
          <div className="mt-1 pt-1 border-t border-sky-500/20 font-mono text-[8px] text-sky-400 font-medium">
            Platform comparison
          </div>
          {/* Right Output Pin */}
          <span className="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-sky-400 border border-background shadow-[0_0_6px_#38bdf8]" />
        </div>

        {/* Animated Connector 1 */}
        <div className="w-4 relative flex items-center justify-center shrink-0">
          <div className="w-full h-[1.5px] bg-gradient-to-r from-sky-400 to-[#ff7a3d] opacity-60" />
          <span className="pulse-stream" />
          <ArrowRight size={10} className="text-[#ff7a3d] absolute -right-0.5" />
        </div>

        {/* Node 2: Multi-Market Share (The Brain) */}
        <div className="flex-1 rounded-lg border border-[#ff5e1e]/40 bg-[#ff5e1e]/10 p-2 relative shadow-md shadow-[#ff5e1e]/5">
          {/* Left Input Pin */}
          <span className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#ff7a3d] border border-background" />
          <div className="flex items-center justify-between mb-1">
            <span className="text-[7.5px] font-mono uppercase tracking-wider text-[#ff7a3d] font-semibold bg-[#ff5e1e]/20 px-1 rounded">
              Analyze
            </span>
            <span className="text-[8px] font-mono text-[#ff7a3d]">{project.stack[1]}</span>
          </div>
          <div className="flex items-center gap-1.5 my-1">
            <div className="w-5 h-5 rounded bg-[#ff5e1e]/20 border border-[#ff5e1e]/40 flex items-center justify-center text-[#ff7a3d] shrink-0">
              <Sparkles size={11} />
            </div>
            <strong className="text-[10px] font-semibold text-foreground leading-tight truncate">
              Market Share
            </strong>
          </div>
          <div className="font-mono text-[8px] text-muted-foreground truncate">Explore patterns</div>
          <div className="mt-1 pt-1 border-t border-[#ff5e1e]/20 font-mono text-[8px] text-[#ff7a3d] font-medium">
            Revenue trends
          </div>
          {/* Right Output Pin */}
          <span className="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#ff7a3d] border border-background shadow-[0_0_6px_#ff5e1e]" />
        </div>

        {/* Animated Connector 2 */}
        <div className="w-4 relative flex items-center justify-center shrink-0">
          <div className="w-full h-[1.5px] bg-gradient-to-r from-[#ff7a3d] to-emerald-400 opacity-60" />
          <span className="pulse-stream" />
          <ArrowRight size={10} className="text-emerald-400 absolute -right-0.5" />
        </div>

        {/* Node 3: Autonomous Ops Engine */}
        <div className="flex-1 rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-2 relative shadow-sm">
          {/* Left Input Pin */}
          <span className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-emerald-400 border border-background" />
          <div className="flex items-center justify-between mb-1">
            <span className="text-[7.5px] font-mono uppercase tracking-wider text-emerald-400 font-semibold bg-emerald-500/10 px-1 rounded">
              Present
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <div className="flex items-center gap-1.5 my-1">
            <div className="w-5 h-5 rounded bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <Activity size={11} />
            </div>
            <strong className="text-[10px] font-semibold text-foreground leading-tight truncate">
              City Insights
            </strong>
          </div>
          <div className="font-mono text-[8px] text-muted-foreground truncate">Interpret results</div>
          <div className="mt-1 pt-1 border-t border-emerald-500/20 font-mono text-[8px] text-emerald-400 font-medium">
            Recommendations
          </div>
        </div>
      </div>

      {/* Mini Live Execution Telemetry Stream */}
      <div className="rounded bg-black/50 border border-border/50 p-1.5 font-mono text-[8.5px] space-y-0.5">
        <div className="flex items-center gap-1.5 text-muted-foreground truncate">
          <span className="text-sky-400 font-semibold">01 COMPARE</span>
          <span className="text-foreground/80 truncate">Review the source data</span>
        </div>
        <div className="flex items-center gap-1.5 text-muted-foreground truncate">
          <span className="text-[#ff7a3d] font-semibold">02 ANALYZE</span>
          <span className="text-foreground/80 truncate">Analyze the relevant variables</span>
        </div>
        <div className="flex items-center gap-1.5 text-muted-foreground truncate">
          <span className="text-emerald-400 font-semibold">03 PRESENT</span>
          <span className="text-foreground/80 truncate">Summarize the findings</span>
        </div>
      </div>

      {/* Bottom Status Ribbon */}
      <div className="flex items-center justify-between pt-1 border-t border-border/30 font-mono text-[8.5px] text-muted-foreground">
        <span className="flex items-center gap-1 text-emerald-400">
          <Check size={11} />
          <span>Project workflow</span>
        </span>
        <span>Workflow illustration</span>
      </div>
    </div>
  );
}

function DashboardVisual({ project, compact }: { project: PortfolioProject; compact?: boolean }) {
  return (
    <div className={`analytics-preview w-full flex flex-col justify-between ${compact ? "p-2.5" : "p-4"} bg-gradient-to-b from-card/90 to-background/95 text-foreground select-none overflow-hidden h-full`}>
      {/* Top Header: Metric + Live Attribution Indicator */}
      <div className="flex items-start justify-between gap-2 pb-1 border-b border-border/40">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Dashboard Preview</span>
            <span className="inline-flex items-center gap-0.5 text-[9px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-1.5 py-0.2 rounded-full">
              <TrendingUp size={10} /> Illustrative
            </span>
          </div>
          <div className="flex items-baseline gap-2 mt-0.5">
            <strong className="text-sm font-semibold tracking-tight text-foreground font-mono">Performance</strong>
            <span className="text-[9px] font-mono text-muted-foreground">Example trend</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-[9px] font-mono text-muted-foreground bg-secondary/60 border border-border/60 px-2 py-0.5 rounded shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
          <span>{project.stack[0]}</span>
        </div>
      </div>

      {/* SVG Dual-Spline Area Chart */}
      <div className="relative w-full my-1 flex-1 min-h-[75px] max-h-[105px]">
        {/* Floating Peak Tooltip */}
        <div className="absolute top-1 right-10 z-20 pointer-events-none flex items-center gap-1 px-2 py-0.5 rounded bg-background/95 border border-sky-500/40 shadow-lg text-[8.5px] font-mono text-sky-400 backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping" />
          <span>Trend marker</span>
          <span className="text-muted-foreground">|</span>
          <span className="text-emerald-400">Example</span>
        </div>

        <svg viewBox="0 0 400 100" preserveAspectRatio="none" className="w-full h-full overflow-visible">
          <defs>
            {/* Primary Curve Glow Gradient */}
            <linearGradient id="gmvAreaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.45" />
              <stop offset="65%" stopColor="#38bdf8" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.0" />
            </linearGradient>

            {/* Secondary Attribution Area Gradient */}
            <linearGradient id="metaAttributionGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ff7a3d" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#ff7a3d" stopOpacity="0.0" />
            </linearGradient>

            {/* Neon Glow Filter */}
            <filter id="neonCurveGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Grid lines */}
          <line x1="0" y1="20" x2="400" y2="20" stroke="currentColor" strokeOpacity="0.06" strokeDasharray="3 3" />
          <line x1="0" y1="50" x2="400" y2="50" stroke="currentColor" strokeOpacity="0.06" strokeDasharray="3 3" />
          <line x1="0" y1="80" x2="400" y2="80" stroke="currentColor" strokeOpacity="0.06" strokeDasharray="3 3" />

          {/* Secondary Baseline Area & Curve (Ad Attribution & COD baseline) */}
          <path
            d="M 0,82 C 45,80 70,68 110,72 C 150,76 185,58 225,64 C 265,70 295,48 335,54 C 365,60 385,50 400,52 L 400,98 L 0,98 Z"
            fill="url(#metaAttributionGradient)"
          />
          <path
            d="M 0,82 C 45,80 70,68 110,72 C 150,76 185,58 225,64 C 265,70 295,48 335,54 C 365,60 385,50 400,52"
            fill="none"
            stroke="#ff7a3d"
            strokeWidth="1.5"
            strokeDasharray="3 2"
            opacity="0.75"
          />

          {/* Primary Spline Area & Curve (Dashboard Preview Surge) */}
          <path
            d="M 0,76 C 40,74 65,42 105,48 C 145,54 175,26 215,34 C 250,42 275,12 305,14 C 340,16 365,38 400,24 L 400,98 L 0,98 Z"
            fill="url(#gmvAreaGradient)"
          />
          <path
            d="M 0,76 C 40,74 65,42 105,48 C 145,54 175,26 215,34 C 250,42 275,12 305,14 C 340,16 365,38 400,24"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="2.5"
            filter="url(#neonCurveGlow)"
          />

          {/* Vertical marker line at peak */}
          <line x1="305" y1="14" x2="305" y2="98" stroke="#38bdf8" strokeOpacity="0.35" strokeDasharray="2 2" />

          {/* Peak pulsing target dot */}
          <circle cx="305" cy="14" r="8" fill="#38bdf8" opacity="0.3" className="animate-ping" />
          <circle cx="305" cy="14" r="3.5" fill="#38bdf8" stroke="#0e161c" strokeWidth="1.5" />
        </svg>

        {/* X-Axis dates */}
        <div className="flex justify-between items-center px-1 font-mono text-[8px] text-muted-foreground/75 mt-0.5">
          <span>Period 1</span>
          <span>Period 2</span>
          <span>Period 3</span>
          <span className="text-sky-400 font-semibold">Period 4</span>
          <span>Period 5</span>
        </div>
      </div>

      {/* Bottom KPI Ribbon */}
      <div className="grid grid-cols-3 gap-1.5 pt-1.5 border-t border-border/40 font-mono text-[9px]">
        <div className="flex items-center gap-1.5 bg-secondary/40 border border-border/40 px-2 py-1 rounded">
          <ShieldCheck size={12} className="text-emerald-400 shrink-0" />
          <div className="overflow-hidden leading-tight">
            <strong className="block text-foreground truncate">Key Metrics</strong>
            <span className="text-[8px] text-muted-foreground block truncate">Overview</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 bg-secondary/40 border border-border/40 px-2 py-1 rounded">
          <ShoppingBag size={12} className="text-[#ff7a3d] shrink-0" />
          <div className="overflow-hidden leading-tight">
            <strong className="block text-foreground truncate">Comparison</strong>
            <span className="text-[8px] text-muted-foreground block truncate">Segments</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 bg-secondary/40 border border-border/40 px-2 py-1 rounded">
          <TrendingUp size={12} className="text-sky-400 shrink-0" />
          <div className="overflow-hidden leading-tight">
            <strong className="block text-foreground truncate">Trends</strong>
            <span className="text-[8px] text-muted-foreground block truncate">Analysis</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function EventsVisual() {
  return (
    <div className="events-preview w-full h-full p-3 flex flex-col justify-between bg-card text-foreground select-none">
      <div className="flex items-center justify-between pb-1.5 border-b border-border font-mono text-[9px] text-muted-foreground">
        <span className="flex items-center gap-1 text-emerald-400 font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          DELHI NCR RADAR
        </span>
        <span>Hyperlocal Discovery</span>
      </div>
      <div className="space-y-1.5 my-1">
        {[
          { name: "Hauz Khas Social", cat: "Tech Founders Mixer", time: "Tonight, 8 PM", rsvp: "48 RSVP · 1.2km" },
          { name: "The Piano Man GGN", cat: "Neo-Jazz Collective", time: "Live Now", rsvp: "112 RSVP · 8.4km" },
          { name: "Lodhi Art District", cat: "Street Photography", time: "Tomorrow 6 AM", rsvp: "34 RSVP · 4.1km" },
        ].map((ev) => (
          <div key={ev.name} className="flex items-center justify-between bg-muted/60 border border-border/60 rounded px-2 py-1 text-[10px]">
            <div>
              <strong className="block text-foreground text-[10px] leading-tight">{ev.name}</strong>
              <span className="text-[8.5px] font-mono text-[#ff7a3d]">{ev.cat}</span>
            </div>
            <div className="text-right font-mono text-[8.5px] text-muted-foreground">
              <span className="block text-emerald-400 font-medium">{ev.time}</span>
              <span>{ev.rsvp}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between pt-1 border-t border-border font-mono text-[8.5px] text-muted-foreground">
        <span>28°36'N · 77°13'E</span>
        <span className="text-emerald-400">AI Wingman Context Ready</span>
      </div>
    </div>
  );
}

function TrackerVisual() {
  return (
    <div className="tracker-preview w-full h-full p-3 flex flex-col justify-between bg-card text-foreground select-none">
      <div className="flex items-center justify-between pb-1.5 border-b border-border font-mono text-[9px] text-muted-foreground">
        <span className="flex items-center gap-1 text-sky-400 font-semibold">
          <Layers size={11} /> PIPELINE STAGES
        </span>
        <span>Real-time Sync</span>
      </div>
      <div className="grid grid-cols-4 gap-1.5 my-1 text-[9px]">
        {[
          { stage: "SOURCED", count: 18, label: "Candidates" },
          { stage: "SCREENED", count: 12, label: "Audit Pass" },
          { stage: "INTERVIEW", count: 5, label: "Tech Round" },
          { stage: "OFFER", count: 2, label: "Accepted" },
        ].map((col) => (
          <div key={col.stage} className="bg-muted/60 border border-border/60 rounded p-1.5 flex flex-col justify-between">
            <span className="font-mono text-[7.5px] text-muted-foreground">{col.stage}</span>
            <strong className="text-sm font-semibold my-0.5 text-foreground">{col.count}</strong>
            <span className="text-[7.5px] font-mono text-emerald-400 truncate">{col.label}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between pt-1 border-t border-border font-mono text-[8.5px] text-muted-foreground">
        <span>ClickHouse Analytics</span>
        <span className="text-sky-400">0.018s query speed</span>
      </div>
    </div>
  );
}

function VisualBody({ project, compact = false }: { project: PortfolioProject; compact?: boolean }) {
  const { visual } = project;
  if (visual === "conversation") {
    return <QueryConversationVisual compact={compact} />;
  }

  if (visual === "radar") {
    return <RadarVisual />;
  }

  if (visual === "workflow") {
    return <AnalysisWorkflowVisual project={project} compact={compact} />;
  }

  if (visual === "funnel") {
    return <DashboardVisual project={project} compact={compact} />;
  }

  if (visual === "events") {
    return <EventsVisual />;
  }

  if (visual === "tracker") {
    return <TrackerVisual />;
  }

  return (
    <div className="p-4 flex items-center justify-center text-xs text-muted-foreground font-mono">
      Preview visual
    </div>
  );
}

export function PortfolioVisual({
  project,
  compact = false,
  badge,
  className,
}: {
  project: PortfolioProject;
  compact?: boolean;
  badge?: string;
  className?: string;
}) {
  return (
    <div
      className={`project-visual visual-${project.visual} w-full h-full flex flex-col ${
        compact ? " project-visual-compact" : ""
      }${className ? ` ${className}` : ""}`}
    >
      <div className="browser-chrome shrink-0">
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="browser-dot" />
          <span className="browser-dot" />
          <span className="browser-dot" />
        </div>
        <div className="browser-address truncate">
          <span>↗</span> {project.shortName.toLowerCase().replaceAll(" ", "-")}.preview
        </div>
        {badge ? (
          <span className="shrink-0 font-mono text-[9px] text-muted-foreground bg-secondary/80 px-2 py-0.5 rounded border border-border/80 select-none">
            {badge}
          </span>
        ) : (
          <span className="browser-menu shrink-0">
            <i />
            <i />
            <i />
          </span>
        )}
      </div>
      <div className="flex-1 min-h-0 w-full flex flex-col overflow-hidden">
        <VisualBody project={project} compact={compact} />
      </div>
    </div>
  );
}

export function SkillsVisual() {
  return <span className="skill-signal"><MessageCircle size={11} /> Evidence in work</span>;
}

export function ProjectExternalIcon() {
  return <ArrowUpRight size={15} aria-hidden="true" />;
}

export function VisualSearchIcon() {
  return <Search size={14} aria-hidden="true" />;
}
