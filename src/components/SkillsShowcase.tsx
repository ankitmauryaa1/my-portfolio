import { useState, type ReactElement } from "react";
import {
  ArrowRight,
  Bot,
  Database,
  Navigation,
  Workflow,
  Zap,
} from "lucide-react";

import { ecommerceDataProject, featuredProjects, medicalInsuranceProject, type PortfolioProject } from "@/lib/portfolio-data";

interface SkillsShowcaseProps {
  themeMode?: "dark" | "light";
  onSelectProject: (project: PortfolioProject) => void;
}

interface SkillCardData {
  id: string;
  index: string;
  categoryTag: string;
  icon: ReactElement;
  title: string;
  description: string;
  heroMetric: {
    stat: string;
    label: string;
  };
  competencies: string[];
  pipelineSteps: string[];
  relatedProject: PortfolioProject;
  techStack: string[];
  accentColor: string;
  diagramType: "neural" | "spatial" | "pipeline";
}

export function SkillsShowcase({ onSelectProject }: SkillsShowcaseProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const skillDisciplines: SkillCardData[] = [
    {
      id: "programming",
      index: "01",
      categoryTag: "PYTHON & WEB",
      title: "Programming Languages",
      icon: <Bot size={16} />,
      description: "Build data applications, write queries, and work with web interfaces.",
      heroMetric: { stat: "Python", label: "Primary programming language" },
      competencies: ["Python", "SQL", "JavaScript", "HTML", "CSS"],
      pipelineSteps: ["Define inputs", "Write the logic", "Check the output"],
      relatedProject: featuredProjects[0],
      techStack: ["Python", "SQL", "JavaScript", "HTML", "CSS"],
      accentColor: "#a855f7",
      diagramType: "neural",
    },
    {
      id: "data-analytics",
      index: "02",
      categoryTag: "EXPLORATORY ANALYSIS",
      title: "Data Analytics",
      icon: <Navigation size={16} />,
      description: "Prepare datasets, explore patterns, and communicate findings with visualizations.",
      heroMetric: { stat: "EDA", label: "Exploratory data analysis" },
      competencies: ["Exploratory Data Analysis", "Data Cleaning", "Feature Engineering", "Statistical Analysis"],
      pipelineSteps: ["Inspect data", "Clean and transform", "Visualize results"],
      relatedProject: ecommerceDataProject,
      techStack: ["Pandas", "NumPy", "Matplotlib", "Seaborn"],
      accentColor: "#22d3ee",
      diagramType: "spatial",
    },
    {
      id: "business-intelligence",
      index: "03",
      categoryTag: "DASHBOARDS & KPIs",
      title: "Business Intelligence",
      icon: <Workflow size={16} />,
      description: "Model data and build interactive dashboards that answer business questions.",
      heroMetric: { stat: "BI", label: "Reporting and dashboards" },
      competencies: ["Pivot Tables", "XLOOKUP", "INDEX-MATCH", "Dashboard Development", "KPI Analysis", "Data Modeling"],
      pipelineSteps: ["Prepare data", "Define measures", "Build dashboards"],
      relatedProject: featuredProjects[1],
      techStack: ["Microsoft Power BI", "DAX", "Power Query", "Tableau", "Microsoft Excel"],
      accentColor: "#fbbf24",
      diagramType: "pipeline",
    },
    {
      id: "machine-learning",
      index: "04",
      categoryTag: "PREDICTIVE MODELING",
      title: "Machine Learning",
      icon: <Bot size={16} />,
      description: "Explore supervised and unsupervised learning and evaluate models for classification and regression.",
      heroMetric: { stat: "ML", label: "Classification and regression" },
      competencies: ["Linear Regression", "Logistic Regression", "Decision Trees", "Random Forest", "K-Nearest Neighbors", "K-Means Clustering", "Support Vector Machines", "Ridge and Lasso Regression", "Model Evaluation", "Classification and Regression"],
      pipelineSteps: ["Prepare features", "Fit a model", "Evaluate predictions"],
      relatedProject: medicalInsuranceProject,
      techStack: ["Python", "Scikit-learn"],
      accentColor: "#a855f7",
      diagramType: "neural",
    },
    {
      id: "databases",
      index: "05",
      categoryTag: "RELATIONAL DATA & SQL",
      title: "Databases",
      icon: <Database size={16} />,
      description: "Design relational data structures and write SQL queries for analysis.",
      heroMetric: { stat: "SQL", label: "Relational querying" },
      competencies: ["Database Design", "SQL Joins", "CTEs", "Window Functions", "Subqueries"],
      pipelineSteps: ["Explore the schema", "Write a query", "Inspect results"],
      relatedProject: featuredProjects[0],
      techStack: ["MySQL", "SQLite", "SQLAlchemy"],
      accentColor: "#fbbf24",
      diagramType: "pipeline",
    },
    {
      id: "development-tools",
      index: "06",
      categoryTag: "WORKFLOWS & APPLICATIONS",
      title: "Development Tools",
      icon: <Zap size={16} />,
      description: "Use development, version control, and visualization tools to build and share data projects.",
      heroMetric: { stat: "Git", label: "Version control" },
      competencies: ["Version Control", "Notebook Workflows", "Interactive Visualizations", "REST APIs"],
      pipelineSteps: ["Explore in notebooks", "Build an interface", "Track changes"],
      relatedProject: featuredProjects[0],
      techStack: ["VS Code", "Git", "GitHub", "Streamlit", "Jupyter Notebook", "Google Colab", "Plotly", "REST APIs", "Vercel"],
      accentColor: "#22d3ee",
      diagramType: "spatial",
    },
  ];

  const categories = ["All", ...skillDisciplines.map((item) => item.title)];

  const filteredDisciplines =
    selectedCategory === "All"
      ? skillDisciplines
      : skillDisciplines.filter((d) => d.title === selectedCategory);

  return (
    <div className="space-y-6 sm:space-y-10">
      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2" role="group" aria-label="Filter capabilities">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-[11px] sm:text-xs font-mono transition-all duration-200 border cursor-pointer ${
              selectedCategory === cat
                ? "bg-[#ff5e1e] text-white font-medium border-[#ff5e1e] shadow-md shadow-[#ff5e1e]/20"
                : "border-border bg-card/60 text-muted-foreground hover:text-foreground hover:border-[#ff5e1e]/40 hover:bg-muted"
            }`}
          >
            {cat === "All" ? `All Specialisms (${skillDisciplines.length})` : cat}
          </button>
        ))}
      </div>

      {/* Alternating Split Cards (3 Core Disciplines) */}
      <div className="flex flex-col gap-5 sm:gap-10">
        {filteredDisciplines.map((item, idx) => {
          const isEven = idx % 2 === 0;

          return (
            <div
              key={item.id}
              className="rounded-2xl sm:rounded-3xl border border-border bg-card/50 backdrop-blur-md overflow-hidden transition-all duration-300 hover:border-[#ff5e1e]/40 hover:shadow-xl hover:shadow-[#ff5e1e]/5"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
                {/* Content Column */}
                <div
                  className={`col-span-1 lg:col-span-6 p-4 sm:p-6 lg:p-8 flex flex-col justify-between ${
                    isEven ? "order-1" : "order-1 lg:order-2"
                  }`}
                >
                  <div className="space-y-3 sm:space-y-4">
                    {/* Eyebrow Pill + Icon */}
                    <div className="flex items-center gap-2 sm:gap-2.5">
                      <div
                        className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl flex items-center justify-center border"
                        style={{
                          backgroundColor: `${item.accentColor}15`,
                          borderColor: `${item.accentColor}35`,
                          color: item.accentColor,
                        }}
                      >
                        {item.icon}
                      </div>
                      <span
                        className="font-mono text-[10px] sm:text-[11px] font-semibold tracking-widest uppercase"
                        style={{ color: item.accentColor }}
                      >
                        {item.categoryTag}
                      </span>
                    </div>

                    {/* Major Title */}
                    <h3 className="font-editorial text-2xl sm:text-3xl md:text-4xl text-foreground font-normal leading-tight">
                      {item.title}
                    </h3>

                    {/* Value Proposition Description */}
                    <p className="text-muted-foreground text-xs sm:text-base leading-relaxed">
                      {item.description}
                    </p>

                    {/* Hero Quantitative Benchmark Metric */}
                    <div className="flex items-baseline gap-2.5 sm:gap-3 py-1.5 sm:py-2 border-y border-border/60">
                      <span
                        className="text-3xl sm:text-5xl font-extrabold tracking-tight font-sans"
                        style={{ color: item.accentColor }}
                      >
                        {item.heroMetric.stat}
                      </span>
                      <span className="text-[11px] sm:text-sm font-mono text-muted-foreground">
                        {item.heroMetric.label}
                      </span>
                    </div>

                    {/* Key Competencies Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-0.5">
                      {item.competencies.map((comp) => (
                        <div key={comp} className="flex items-center gap-2 text-xs font-mono text-foreground/90">
                          <span
                            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                            style={{ backgroundColor: item.accentColor }}
                          />
                          <span>{comp}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tech Stack Pills (Shown on mobile inside content column) */}
                    <div className="flex lg:hidden flex-wrap gap-1.5 pt-1">
                      {item.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="font-mono text-[10px] px-2 py-0.5 rounded bg-muted/80 border border-border text-muted-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Related project link */}
                  <div className="pt-4 sm:pt-6 mt-4 sm:mt-6 border-t border-border flex flex-wrap items-center justify-between gap-2.5">
                    <div className="flex items-center gap-2 font-mono text-xs">
                      <span className="text-muted-foreground text-[11px] sm:text-xs">Related project:</span>
                      <button
                        onClick={() => onSelectProject(item.relatedProject)}
                        className="text-[#ff7a3d] font-medium hover:underline inline-flex items-center gap-1 cursor-pointer text-xs"
                      >
                        {item.relatedProject.name} ↗
                      </button>
                    </div>

                    <button
                      onClick={() => onSelectProject(item.relatedProject)}
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-[#ff7a3d] hover:text-[#ff5e1e] transition cursor-pointer"
                    >
                      Inspect Architecture <ArrowRight size={13} />
                    </button>
                  </div>
                </div>

                {/* Visual Diagram & Live Pipeline Terminal Side (Desktop lg:flex only) */}
                <div
                  className={`hidden lg:flex lg:col-span-6 bg-muted/40 p-4 sm:p-6 lg:p-8 flex-col justify-between border-t lg:border-t-0 relative overflow-hidden ${
                    isEven ? "order-2 lg:border-l border-border" : "order-2 lg:order-1 lg:border-r border-border"
                  }`}
                >
                  {/* Watermark Index */}
                  <span className="absolute top-4 right-4 font-mono text-2xl font-bold text-foreground/10 select-none">
                    {item.index}
                  </span>

                  {/* Dynamic Technical Visual Diagram */}
                  <div className="py-6 flex items-center justify-center min-h-[200px]">
                    {item.diagramType === "neural" && (
                      <div className="relative w-48 h-36 flex items-center justify-center">
                        <svg className="w-full h-full" viewBox="0 0 200 140" fill="none">
                          <line x1="40" y1="70" x2="100" y2="25" stroke="#a855f7" strokeWidth="1.5" strokeOpacity="0.4" />
                          <line x1="40" y1="70" x2="100" y2="70" stroke="#a855f7" strokeWidth="1.5" strokeOpacity="0.6" />
                          <line x1="40" y1="70" x2="100" y2="115" stroke="#a855f7" strokeWidth="1.5" strokeOpacity="0.4" />
                          <line x1="100" y1="25" x2="160" y2="70" stroke="#a855f7" strokeWidth="1.5" strokeOpacity="0.5" />
                          <line x1="100" y1="70" x2="160" y2="70" stroke="#a855f7" strokeWidth="2" strokeOpacity="0.8" />
                          <line x1="100" y1="115" x2="160" y2="70" stroke="#a855f7" strokeWidth="1.5" strokeOpacity="0.5" />

                          <circle cx="40" cy="70" r="6" fill="#a855f7" className="animate-pulse" />
                          <circle cx="100" cy="25" r="5" fill="#a855f7" />
                          <circle cx="100" cy="70" r="7" fill="#c084fc" className="animate-ping" style={{ animationDuration: "3s" }} />
                          <circle cx="100" cy="70" r="6" fill="#a855f7" />
                          <circle cx="100" cy="115" r="5" fill="#a855f7" />
                          <circle cx="160" cy="70" r="8" fill="#a855f7" className="animate-pulse" />
                        </svg>
                        <span className="absolute bottom-0 text-[10px] font-mono text-[#a855f7] bg-[#a855f7]/10 px-2 py-0.5 rounded border border-[#a855f7]/20">
                          Inputs · Processing · Outputs
                        </span>
                      </div>
                    )}

                    {item.diagramType === "spatial" && (
                      <div className="relative w-44 h-36 flex items-center justify-center">
                        <div className="w-32 h-32 rounded-full border border-cyan-500/30 relative flex items-center justify-center">
                          <div className="w-20 h-20 rounded-full border border-dashed border-cyan-500/40 relative flex items-center justify-center">
                            <div className="w-10 h-10 rounded-full border border-cyan-500/50" />
                            <div className="radar-sweep-arm" style={{ width: "60px", height: "60px", background: "conic-gradient(from 0deg, rgba(6, 182, 212, 0.45) 0deg, transparent 60deg)" }} />
                          </div>
                          <span className="absolute top-2 right-4 w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                          <span className="absolute bottom-4 left-6 w-2 h-2 rounded-full bg-cyan-400 animate-ping" style={{ animationDelay: "1s" }} />
                        </div>
                        <span className="absolute bottom-0 text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                          Analysis at a glance
                        </span>
                      </div>
                    )}

                    {item.diagramType === "pipeline" && (
                      <div className="w-full flex items-center justify-between gap-2 px-2">
                        {[
                          { title: "Ingest", icon: <Database size={13} /> },
                          { title: "Transform", icon: <Workflow size={13} /> },
                          { title: "Present", icon: <Zap size={13} /> },
                        ].map((node, i) => (
                          <div key={node.title} className="flex items-center gap-2 flex-1">
                            <div className="flex-1 bg-card border border-amber-500/30 rounded-lg p-2.5 text-center">
                              <span className="text-amber-400 flex justify-center mb-1">{node.icon}</span>
                              <span className="text-[10px] font-mono block text-foreground font-medium">{node.title}</span>
                            </div>
                            {i < 2 && (
                              <span className="text-amber-500 font-mono text-xs">→</span>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Live Active Pipeline Terminal */}
                  <div className="bg-[#0b0f14] border border-white/10 rounded-xl p-3 font-mono text-[11px] shadow-lg">
                    <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-2">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                        <span className="text-[10px] text-white/70 font-semibold ml-1.5 tracking-wider">
                          WORKFLOW
                        </span>
                      </div>
                      <span className="text-[9px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        example
                      </span>
                    </div>

                    <div className="space-y-1 text-[10px]">
                      {item.pipelineSteps.map((step, sIdx) => (
                        <div key={step} className="flex items-center justify-between text-muted-foreground/90">
                          <span className="truncate pr-2">
                            0{sIdx + 1} &gt; {step}
                          </span>
                          <span className="text-emerald-400 flex items-center gap-0.5 flex-shrink-0">
                            Step {sIdx + 1}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech Stack Pills at Bottom */}
                  <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-border/50">
                    {item.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-[10px] px-2 py-0.5 rounded bg-card/80 border border-border text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
