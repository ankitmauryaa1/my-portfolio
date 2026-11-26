import { Terminal } from "lucide-react";
import type { PortfolioProject } from "@/lib/portfolio-data";

interface ProjectXRayProps {
  project: PortfolioProject;
  compact?: boolean;
}

export function ProjectXRay({ project, compact = false }: ProjectXRayProps) {
  const badgeColors: Record<string, string> = {
    querypilot: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
    "rockstar-games-dashboard": "text-sky-400 border-sky-500/30 bg-sky-500/10",
    "ola-uber-rapido": "text-amber-400 border-amber-500/30 bg-amber-500/10",
    civicpulse: "text-indigo-400 border-indigo-500/30 bg-indigo-500/10",
  };
  const badgeColor =
    badgeColors[project.slug] ?? "text-orange-400 border-orange-500/30 bg-orange-500/10";
  const steps = project.architecture.length ? project.architecture : project.stack;
  const stepLabel = project.architecture.length ? "Step" : "Tool";

  return (
    <div
      className={`w-full h-full bg-[#0a0e14] text-[#e2e8f0] p-3.5 sm:p-4 md:p-6 flex flex-col justify-between select-none relative overflow-hidden font-mono border border-border/80 ${compact ? "text-xs" : ""}`}
    >
      {/* Background Blueprint Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #ff5e1e 1px, transparent 0)`,
          backgroundSize: "20px 20px",
        }}
      />

      {/* Blueprint Corner Accents */}
      <span className="absolute top-2 left-2 text-[#ff7a3d]/40 text-[10px]">+</span>
      <span className="absolute top-2 right-2 text-[#ff7a3d]/40 text-[10px]">+</span>
      <span className="absolute bottom-2 left-2 text-[#ff7a3d]/40 text-[10px]">+</span>
      <span className="absolute bottom-2 right-2 text-[#ff7a3d]/40 text-[10px]">+</span>

      {/* Header Bar */}
      <div className="flex items-center justify-between border-b border-white/10 pb-2.5 z-10">
        <div className="flex items-center gap-2">
          <Terminal size={14} className="text-[#ff7a3d]" />
          <span className="text-[11px] font-semibold tracking-wider text-white">
            ARCHITECTURE X-RAY
          </span>
          <span className="text-[10px] text-muted-foreground hidden sm:inline">
            // {project.shortName}
          </span>
        </div>

        <span className={`px-2 py-0.5 rounded text-[10px] border font-medium ${badgeColor}`}>
          {project.category}
        </span>
      </div>

      {/* Key-Value Telemetry Grid */}
      <div
        className={`grid ${compact ? "grid-cols-1 gap-1.5 my-2" : "grid-cols-1 sm:grid-cols-2 gap-2.5 my-3"} z-10`}
      >
        {steps.map((step, index) => (
          <div
            key={step}
            className="flex items-center justify-between bg-white/[0.03] border border-white/5 rounded px-2.5 py-1.5"
          >
            <span className="text-[10px] text-muted-foreground">
              {stepLabel} {index + 1}
            </span>
            <span className="text-[11px] font-medium text-emerald-400 truncate max-w-[170px]">
              {step}
            </span>
          </div>
        ))}
      </div>

      {/* Footer Status Telemetry */}
      <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-muted-foreground z-10">
        <span className="truncate text-foreground/80">{project.status}</span>
        <span className="text-[#ff7a3d] font-medium whitespace-nowrap ml-2">Project Details ↗</span>
      </div>
    </div>
  );
}
