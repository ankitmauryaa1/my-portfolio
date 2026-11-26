import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Folder,
  FolderOpen,
  Code2,
  Brain,
  Database,
  Cpu,
  Layers,
  Network,
  Zap,
  Flame,
  Globe,
  Radio,
} from "lucide-react";

export interface TechItem {
  id: string;
  name: string;
  category: string;
  desc: string;
  level: string;
  color: string;
  borderGlow: string;
  icon: React.ElementType;
  // Offset in pixels from folder root (upward is negative Y, rightward is positive X)
  x: number;
  y: number;
  rotate: number;
  driftPeriod: number;
}

const DEFAULT_STACK: TechItem[] = [
  // Tier 1 (Lowest row above folder)
  {
    id: "python",
    name: "Python",
    category: "Pandas · NumPy",
    desc: "Data analysis and predictive modeling",
    level: "LANGUAGE",
    color: "#ff7a3d",
    borderGlow: "rgba(255, 122, 61, 0.4)",
    icon: Code2,
    x: 65,
    y: -80,
    rotate: -3,
    driftPeriod: 3.4,
  },
  {
    id: "scikit-learn",
    name: "Scikit-learn",
    category: "Classification · Regression",
    desc: "Training and evaluating predictive models",
    level: "ML",
    color: "#c084fc",
    borderGlow: "rgba(192, 132, 252, 0.4)",
    icon: Brain,
    x: 235,
    y: -75,
    rotate: 3,
    driftPeriod: 4.1,
  },

  // Tier 2 (Middle row)
  {
    id: "streamlit",
    name: "Streamlit",
    category: "Python · Data Apps",
    desc: "Building interactive data applications",
    level: "APP TOOL",
    color: "#4ade80",
    borderGlow: "rgba(74, 222, 128, 0.4)",
    icon: Network,
    x: 40,
    y: -155,
    rotate: -5,
    driftPeriod: 3.8,
  },
  {
    id: "power-bi",
    name: "Power BI",
    category: "DAX · Power Query",
    desc: "Data modeling and interactive dashboards",
    level: "BI",
    color: "#fb923c",
    borderGlow: "rgba(251, 146, 60, 0.4)",
    icon: Flame,
    x: 185,
    y: -150,
    rotate: 2,
    driftPeriod: 3.2,
  },
  {
    id: "mysql",
    name: "MySQL",
    category: "Joins · CTEs",
    desc: "Relational queries and database exploration",
    level: "DATABASE",
    color: "#38bdf8",
    borderGlow: "rgba(56, 189, 248, 0.4)",
    icon: Database,
    x: 330,
    y: -145,
    rotate: 5,
    driftPeriod: 4.5,
  },

  // Tier 3 (Upper row)
  {
    id: "sql",
    name: "SQL",
    category: "Window Functions · Subqueries",
    desc: "Querying and analyzing relational data",
    level: "LANGUAGE",
    color: "#f87171",
    borderGlow: "rgba(248, 113, 113, 0.4)",
    icon: Radio,
    x: 45,
    y: -230,
    rotate: -4,
    driftPeriod: 4.0,
  },
  {
    id: "plotly",
    name: "Plotly",
    category: "Interactive Charts",
    desc: "Visualizing data and query results",
    level: "VISUALIZATION",
    color: "#22d3ee",
    borderGlow: "rgba(34, 211, 238, 0.4)",
    icon: Zap,
    x: 190,
    y: -225,
    rotate: 3,
    driftPeriod: 3.5,
  },
  {
    id: "tableau",
    name: "Tableau",
    category: "Visual Analytics",
    desc: "Exploring and presenting data visually",
    level: "BI",
    color: "#facc15",
    borderGlow: "rgba(250, 204, 21, 0.4)",
    icon: Globe,
    x: 335,
    y: -220,
    rotate: -3,
    driftPeriod: 3.6,
  },

  // Tier 4 (Top row)
  {
    id: "git",
    name: "Git & GitHub",
    category: "Version Control",
    desc: "Tracking changes and sharing projects",
    level: "DEVELOPMENT",
    color: "#818cf8",
    borderGlow: "rgba(129, 140, 248, 0.4)",
    icon: Cpu,
    x: 80,
    y: -305,
    rotate: -2,
    driftPeriod: 3.9,
  },
  {
    id: "excel",
    name: "Microsoft Excel",
    category: "Pivot Tables · XLOOKUP",
    desc: "Analyzing and summarizing spreadsheet data",
    level: "ANALYTICS",
    color: "#f472b6",
    borderGlow: "rgba(244, 114, 182, 0.4)",
    icon: Layers,
    x: 255,
    y: -300,
    rotate: 4,
    driftPeriod: 4.3,
  },
];

interface FolderFloatProps {
  className?: string;
  items?: TechItem[];
}

export function FolderFloat({
  className = "",
  items = DEFAULT_STACK,
}: FolderFloatProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<TechItem | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    // Grace period so moving mouse over cards never abruptly closes the folder
    closeTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
      setActiveItem(null);
    }, 250);
  };

  // Close on Escape or click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setActiveItem(null);
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
        setActiveItem(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, [isOpen]);

  return (
    <div
      ref={containerRef}
      className={`fixed bottom-6 left-6 z-40 select-none ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Floating Notes Cloud */}
      <AnimatePresence>
        {isOpen && (
          <div className="absolute bottom-14 left-0 pointer-events-auto">
            {/* Subtle dark radial backdrop halo to make cards pop with ultra-high contrast */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="absolute -inset-10 -bottom-8 -top-[340px] -right-[380px] -left-6 pointer-events-none rounded-3xl bg-black/60 backdrop-blur-md border border-white/5 shadow-2xl"
            />

            {/* Individual Tech Notes */}
            {items.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.id}
                  drag
                  dragSnapToOrigin={false}
                  dragElastic={0.15}
                  whileDrag={{ scale: 1.1, zIndex: 60, cursor: "grabbing" }}
                  initial={{
                    x: 0,
                    y: 0,
                    scale: 0.15,
                    opacity: 0,
                    rotate: 0,
                  }}
                  animate={{
                    x: item.x,
                    y: item.y,
                    scale: 1,
                    opacity: 1,
                    rotate: item.rotate,
                    transition: {
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                      mass: 0.7,
                      delay: index * 0.03, // staggered spring out
                    },
                  }}
                  exit={{
                    x: 0,
                    y: 0,
                    scale: 0.1,
                    opacity: 0,
                    rotate: 0,
                    transition: {
                      duration: 0.18,
                      delay: (items.length - index) * 0.015, // tuck back inside
                    },
                  }}
                  onHoverStart={() => setActiveItem(item)}
                  className="absolute cursor-grab group"
                  style={{
                    transformOrigin: "bottom left",
                  }}
                >
                  {/* Continuous gentle drifting loop */}
                  <motion.div
                    animate={{
                      y: [0, -5, 0, 4, 0],
                      rotate: [0, 1.2, 0, -1.2, 0],
                    }}
                    transition={{
                      duration: item.driftPeriod,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="relative flex items-center gap-3 rounded-xl border border-white/20 bg-[#121218] px-3.5 py-2.5 shadow-[0_12px_32px_rgba(0,0,0,0.85)] transition-all duration-200 hover:border-white/50 hover:bg-[#1a1a24] hover:scale-105"
                    style={{
                      boxShadow: `0 10px 30px -4px rgba(0,0,0,0.85), 0 0 18px -2px ${item.borderGlow}`,
                    }}
                  >
                    {/* Top Accent Strip in vivid color */}
                    <div
                      className="absolute top-0 left-3 right-3 h-[2px] rounded-full"
                      style={{
                        backgroundColor: item.color,
                        boxShadow: `0 0 8px ${item.color}`,
                      }}
                    />

                    {/* Left Icon with vibrant background */}
                    <div
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/15"
                      style={{
                        backgroundColor: `${item.color}22`,
                      }}
                    >
                      <Icon size={16} style={{ color: item.color }} />
                    </div>

                    {/* Label & Crisp Subtitle */}
                    <div className="flex flex-col text-left">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-white tracking-tight whitespace-nowrap">
                          {item.name}
                        </span>
                        <span
                          className="rounded px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider border"
                          style={{
                            color: item.color,
                            borderColor: `${item.color}66`,
                            backgroundColor: `${item.color}15`,
                          }}
                        >
                          {item.level}
                        </span>
                      </div>
                      <span className="font-mono text-[11px] text-zinc-300 font-medium whitespace-nowrap mt-0.5">
                        {item.category}
                      </span>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}

            {/* Active Item Tooltip Inspector (shows on hover) */}
            {activeItem && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                className="absolute left-2 -top-10 z-50 rounded-lg border border-white/20 bg-[#161620] px-3.5 py-1.5 font-mono text-xs text-white shadow-2xl pointer-events-none"
              >
                <span style={{ color: activeItem.color }} className="font-bold">
                  {activeItem.name}:
                </span>{" "}
                <span className="text-zinc-200">{activeItem.desc}</span>
              </motion.div>
            )}
          </div>
        )}
      </AnimatePresence>

      {/* Only Folder Icon Trigger Button (Ultra-clean, Minimal) */}
      <motion.button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="relative flex h-13 w-13 items-center justify-center rounded-2xl border border-white/20 bg-[#0e0e14]/95 shadow-[0_8px_30px_rgba(0,0,0,0.7)] backdrop-blur-md transition-all duration-300 hover:border-[#ff5e1e]/60 hover:shadow-[0_0_24px_rgba(255,94,30,0.35)] cursor-pointer group"
        aria-label="Tech Stack Folder"
        title="Hover to view Tech Stack"
      >
        {/* Physical 3D Folder Icon Artwork */}
        <div className="relative h-7 w-8 shrink-0" style={{ perspective: "400px" }}>
          {/* Backplate */}
          <div className="absolute inset-0 rounded border border-[#ff5e1e]/40 bg-[#181822] shadow-inner">
            {/* Folder tab */}
            <div className="absolute -top-1 left-0.5 h-1.5 w-3.5 rounded-t-xs bg-[#ff5e1e]/60 border-t border-l border-r border-[#ff5e1e]/80" />
          </div>

          {/* Stored Note Sheets inside folder */}
          <motion.div
            animate={{
              y: isOpen ? -6 : 0,
              rotate: isOpen ? -5 : 0,
              scale: isOpen ? 1.05 : 0.92,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="absolute inset-x-1 top-0.5 h-5 rounded border border-white/30 bg-[#282834] flex items-center justify-center"
          >
            <div className="h-0.5 w-3.5 rounded-full bg-white/40 mb-0.5" />
          </motion.div>

          {/* Front Flap (Pivots downward on 3D X-axis on hover/open) */}
          <motion.div
            animate={{
              rotateX: isOpen ? -52 : 0,
              y: isOpen ? 2 : 0,
              opacity: isOpen ? 0.85 : 1,
            }}
            transition={{ type: "spring", stiffness: 280, damping: 18 }}
            style={{
              transformOrigin: "bottom center",
              transformStyle: "preserve-3d",
            }}
            className="absolute inset-0 rounded border border-[#ff7a3d]/60 bg-gradient-to-br from-[#ff5e1e]/30 via-[#1c1c26] to-[#121218] shadow-md flex items-center justify-center"
          >
            {isOpen ? (
              <FolderOpen size={15} className="text-[#ff7a3d]" />
            ) : (
              <Folder size={15} className="text-[#ff7a3d]" />
            )}
          </motion.div>
        </div>

        {/* Small Active Badge Dot on Top-Right */}
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ff5e1e] opacity-40" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#ff5e1e] border border-black" />
        </span>
      </motion.button>
    </div>
  );
}

export default FolderFloat;
