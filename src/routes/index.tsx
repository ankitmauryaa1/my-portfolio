import { useState, useEffect, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Bot,
  Braces,
  CalendarDays,
  Check,
  ChevronRight,
  CircleDot,
  Clock,
  Code2,
  Command as CommandIcon,
  Copy,
  Database,
  ExternalLink,
  FileText,
  Github,
  Globe2,
  Instagram,
  Layers3,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  MonitorUp,
  Pause,
  Play,
  Search,
  Send,
  Sparkles,
  TrendingUp,
  Workflow,
  X,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

import Particles from "@/components/Particles";
import SpotlightCard from "@/components/SpotlightCard";
import CountUp from "@/components/CountUp";
import Magnet from "@/components/Magnet";
import BlurText from "@/components/BlurText";
import TechText from "@/components/TechText";
import PixelSwap from "@/components/PixelSwap";
import { ProjectXRay } from "@/components/ProjectXRay";
import { SkillsShowcase } from "@/components/SkillsShowcase";
import { MethodologyFlexCarousel } from "@/components/MethodologyFlexCarousel";
import DitherVeil from "@/components/DitherVeil";
import { PortfolioVisual } from "@/components/portfolio-visual";
import FolderFloat from "@/components/FolderFloat";
import { additionalProjects, featuredProjects, projects, type PortfolioProject } from "@/lib/portfolio-data";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";

export const Route = createFileRoute("/")({
  component: PortfolioIndex,
});

function PortfolioIndex() {
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const themeMode = "dark";
  const [motionActive, setMotionActive] = useState(true);
  const [filterCategory, setFilterCategory] = useState<string>("All");
  const [delhiTime, setDelhiTime] = useState("");

  // Smooth inertial physics scrolling (Lenis)
  useSmoothScroll({
    enabled: motionActive,
    isModalOpen: !!selectedProject || cmdOpen || mobileMenuOpen,
  });

  // Live Delhi Time clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setDelhiTime(now.toLocaleTimeString("en-US", options));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Keyboard shortcut for Command Palette (Cmd + K / Ctrl + K)
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCmdOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // Motion initialization & lock dark mode - Animations ON by default
  useEffect(() => {
    document.documentElement.classList.add("dark");
    localStorage.setItem("ankit-theme", "dark");

    localStorage.removeItem("ashutosh-motion");
    localStorage.removeItem("ankit-motion");
    const savedMotion = localStorage.getItem("ankit-motion-v2");
    // Animation is turned ON by default (unless user explicitly paused it via toggle)
    const motion = savedMotion !== "off";
    setMotionActive(motion);
    document.documentElement.classList.toggle("motion-off", !motion);
  }, []);

  const toggleMotion = () => {
    const next = !motionActive;
    setMotionActive(next);
    localStorage.setItem("ankit-motion-v2", next ? "on" : "off");
    document.documentElement.classList.toggle("motion-off", !next);
    toast.info(`Animations ${next ? "enabled" : "paused"}`);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("ankitmourya7874@gmail.com");
    toast.success("ankitmourya7874@gmail.com copied to clipboard!", {
      description: "Ready to discuss data science, AI engineering, or project collaborations.",
    });
  };

  const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];
  const filteredProjects =
    filterCategory === "All"
      ? additionalProjects
      : projects.filter((p) => p.category === filterCategory);

  return (
    <div className="relative min-h-screen bg-background text-foreground transition-colors duration-300 selection:bg-[#ff5e1e]/30 selection:text-[#ff7a3d]">
      {/* Background Particles Mesh */}
      {motionActive && (
        <div className="pointer-events-none fixed inset-0 z-0 opacity-40">
          <Particles
            key={themeMode}
            particleCount={55}
            particleSpread={12}
            speed={0.06}
            particleColors={
              themeMode === "dark"
                ? ["#ff5e1e", "#ffffff", "#ff9f43", "#888888"]
                : ["#ff5e1e", "#141416", "#ff9f43", "#6c6c77"]
            }
            alphaParticles
            moveParticlesOnHover
          />
        </div>
      )}

      {/* 1. Top Telemetry Status Bar */}
      <div className="availability-bar relative z-40">
        <div className="shell-container availability-inner py-1">
          <span className="availability-copy text-[10px] sm:text-[11px]">
            <i className="availability-dot" />
            <strong>DATA ANALYST</strong>
            <span className="hidden sm:inline opacity-75">— Business Intelligence & AI Enthusiast</span>
          </span>
          <div className="flex items-center gap-3">
            <span className="hidden md:inline font-mono text-[11px] text-muted-foreground">
              DELHI {delhiTime} IST
            </span>
            <span className="availability-code text-[10px] sm:text-xs">DEL / REMOTE</span>
          </div>
        </div>
      </div>

      {/* 2. Floating Glass Navbar */}
      <header className="site-header">
        <div className="shell-container nav-inner">
          <a href="#hero" className="wordmark">
            <span className="wordmark-icon overflow-hidden border border-[#ff5e1e]/40 p-0.5">
              <img
                src="/ankit.jpeg"
                alt="Ankit Maurya"
                className="w-full h-full object-cover rounded-md"
              />
            </span>
            <span>
              Ankit Maurya
              <small>DATA · AI · BUILD</small>
            </span>
          </a>

          <nav className="nav-links">
            <a href="#work" className="nav-link">Selected Work</a>
            <a href="#process" className="nav-link">Methodology</a>
            <a href="#skills" className="nav-link">Skills</a>
            <a href="#contact" className="nav-link">Contact</a>
          </nav>

          <div className="nav-actions">
            {/* Command Palette Trigger Pill (Desktop/Tablet) */}
            <button
              onClick={() => setCmdOpen(true)}
              className="hidden sm:inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1.5 font-mono text-xs text-muted-foreground transition hover:border-[#ff5e1e]/40 hover:text-foreground cursor-pointer"
              title="Search anything (⌘K)"
            >
              <Search size={13} className="text-[#ff7a3d]" />
              <span>Search</span>
              <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] text-foreground">
                ⌘K
              </kbd>
            </button>

            {/* Mobile Search Icon Button */}
            <button
              onClick={() => setCmdOpen(true)}
              className="sm:hidden flex items-center justify-center w-8 h-8 rounded-full border border-border bg-card/60 text-muted-foreground transition hover:border-[#ff5e1e]/40 hover:text-foreground cursor-pointer"
              aria-label="Search portfolio"
              title="Search anything"
            >
              <Search size={13} className="text-[#ff7a3d]" />
            </button>

            {/* Motion Controls (Desktop/Tablet) */}
            <div className="site-controls hidden sm:flex">
              <button
                type="button"
                className={`flex items-center gap-1.5 px-2.5 py-1 text-xs cursor-pointer rounded-full border transition ${
                  motionActive
                    ? "border-[#ff5e1e]/40 bg-[#ff5e1e]/10 text-foreground"
                    : "border-border bg-muted/60 text-muted-foreground"
                }`}
                onClick={toggleMotion}
                aria-label="Toggle motion"
                title={motionActive ? "Animations are ON (click to pause)" : "Animations are PAUSED (click to enable)"}
              >
                <span className="relative flex h-2 w-2">
                  {motionActive && (
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff7a3d] opacity-75" />
                  )}
                  <span
                    className={`relative inline-flex rounded-full h-2 w-2 ${
                      motionActive ? "bg-[#ff5e1e]" : "bg-muted-foreground"
                    }`}
                  />
                </span>
                <span className="font-mono text-[11px] hidden sm:inline">
                  {motionActive ? "Motion ON" : "Motion OFF"}
                </span>
                {motionActive ? <Pause size={12} className="text-[#ff7a3d]" /> : <Play size={12} />}
              </button>
            </div>

            {/* Let's Talk CTA (Desktop/Tablet) */}
            <Magnet padding={20} magnetStrength={2}>
              <Button
                asChild
                className="hidden sm:inline-flex rounded-full bg-[#ff5e1e] px-3.5 sm:px-4 py-2 text-xs font-medium text-white transition hover:bg-[#ff7a3d]"
              >
                <a href="#contact">
                  Let's talk <ArrowUpRight size={14} className="ml-1" />
                </a>
              </Button>
            </Magnet>

            {/* Mobile Navigation Menu Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="min-[860px]:hidden flex items-center justify-center w-8 h-8 rounded-full border border-border bg-card/60 text-muted-foreground transition hover:text-foreground cursor-pointer"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={15} /> : <Menu size={15} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="min-[860px]:hidden border-b border-border bg-background/98 backdrop-blur-2xl px-5 py-4 transition-all duration-200">
            <nav className="flex flex-col gap-1 font-mono text-xs mb-4">
              <a
                href="#hero"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2.5 border-b border-border/40 text-foreground hover:text-[#ff7a3d]"
              >
                <span>01 / Presence</span>
                <span className="text-[10px] text-muted-foreground">Top</span>
              </a>
              <a
                href="#work"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2.5 border-b border-border/40 text-foreground hover:text-[#ff7a3d]"
              >
                <span>02 / Selected Work</span>
                <span className="text-[10px] text-muted-foreground">{projects.length} Projects</span>
              </a>
              <a
                href="#process"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2.5 border-b border-border/40 text-foreground hover:text-[#ff7a3d]"
              >
                <span>03 / Methodology</span>
                <span className="text-[10px] text-muted-foreground">Rigor & Specs</span>
              </a>
              <a
                href="#skills"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2.5 border-b border-border/40 text-foreground hover:text-[#ff7a3d]"
              >
                <span>04 / Capabilities</span>
                <span className="text-[10px] text-muted-foreground">Analytics, BI & ML</span>
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2.5 border-b border-border/40 text-foreground hover:text-[#ff7a3d]"
              >
                <span>05 / Contact</span>
                <span className="text-[10px] text-[#ff7a3d]">Get in touch</span>
              </a>
            </nav>

            <div className="flex flex-col gap-2 pt-1">
              {/* Motion toggle inside mobile drawer */}
              <button
                type="button"
                onClick={toggleMotion}
                className="w-full flex items-center justify-between rounded-full border border-border bg-card/60 px-4 py-2 text-xs font-mono text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${motionActive ? "bg-[#ff5e1e]" : "bg-muted-foreground"}`} />
                  <span>Animations</span>
                </span>
                <span className="text-[11px] text-[#ff7a3d]">
                  {motionActive ? "ON (Pause)" : "OFF (Enable)"}
                </span>
              </button>

              <Button
                asChild
                className="w-full rounded-full bg-[#ff5e1e] py-2.5 text-xs font-medium text-white hover:bg-[#ff7a3d]"
              >
                <a href="#contact" onClick={() => setMobileMenuOpen(false)}>
                  Let's Talk <ArrowUpRight size={14} className="ml-1" />
                </a>
              </Button>
              <button
                onClick={() => {
                  copyEmail();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 rounded-full border border-border bg-card/60 py-2 text-xs font-mono text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <Copy size={13} className="text-[#ff7a3d]" />
                <span>Copy Email (ankitmourya7874@gmail.com)</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* 3. Hero Section (01 / PRESENCE) */}
      <section id="hero" className="hero-section">
        <div className="shell-container hero-grid">
          <div className="hero-copy">
            <div className="eyebrow mb-2 sm:mb-4">
              <span className="eyebrow-number">■ 01</span>
              <span className="text-[10px] sm:text-xs">PRESENCE · DATA SCIENCE & AI</span>
              <span className="meta-separator hidden sm:inline" />
              <span className="text-emerald-500 font-mono text-[10px] sm:text-xs inline-flex items-center gap-1.5 ml-auto sm:ml-0">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="hidden sm:inline">Available for hire · </span>Delhi, India
              </span>
            </div>

            {/* Mobile-first clean headline (< sm) */}
            <div className="sm:hidden mb-2.5">
              <h1 className="font-editorial text-[2.75rem] font-normal leading-[1.02] text-foreground tracking-tight">
                Hi, I'm Ankit Maurya<span className="text-[#ff5e1e]">.</span>
              </h1>
              <span className="font-mono text-[11px] text-[#ff7a3d] tracking-wider uppercase block mt-1">
                Data Analyst | Python Developer | SQL & Power BI Specialist
              </span>
            </div>

            {/* Desktop interactive typography (hidden sm:block) */}
            <div className="hidden sm:block mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-[10px] tracking-wider text-[#ff7a3d] uppercase bg-[#ff5e1e]/10 px-2.5 py-0.5 rounded-full border border-[#ff5e1e]/20 inline-flex items-center gap-1.5 max-w-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff5e1e] animate-pulse shrink-0" />
                  <span>Interactive Blueprint Typography · Hover & Drag Letters</span>
                </span>
              </div>
              <div className="w-full h-24 sm:h-36 md:h-44 max-w-4xl">
                <TechText
                  key={`hero-name-${themeMode}`}
                  text="Hi, I'm Ankit Maurya."
                  fontFamily='"Instrument Serif", Georgia, serif'
                  fontSize={94}
                  fontWeight={400}
                  color={themeMode === "dark" ? "#f4f4f1" : "#141416"}
                  accentColor="#ff5e1e"
                  align="left"
                  intro="assemble"
                  guides={true}
                  labels={true}
                  clickKick={true}
                  draggable={true}
                  dashLength={4}
                  dashGap={2}
                />
              </div>
              <h1 className="sr-only">Hi, I'm Ankit Maurya.</h1>
            </div>

            {/* Mobile concise summary (< sm) */}
            <p className="sm:hidden text-foreground/90 text-sm leading-relaxed mb-3.5 font-light">
              Transforming complex data into meaningful insights and building intelligent solutions with Python, SQL, Power BI, and AI.
            </p>

            {/* Desktop narrative (hidden sm:block) */}
            <div className="hidden sm:block mb-4">
              <BlurText
                text="Transforming complex data into meaningful insights and building intelligent solutions with Python, SQL, Power BI, and AI."
                delay={20}
                animateBy="words"
                direction="top"
                className="font-sans text-xl md:text-2xl font-light text-foreground/90 leading-relaxed"
              />
            </div>

            <p className="hero-proof hidden sm:block">
              Data Analyst | Python Developer | SQL & Power BI Specialist
            </p>

            <div className="hero-cta flex flex-wrap items-center gap-2.5 sm:gap-4 mb-3 sm:mb-6">
              <Magnet padding={20} magnetStrength={2}>
                <Button
                  asChild
                  className="rounded-full bg-[#ff5e1e] px-4 sm:px-6 py-2.5 sm:py-6 text-xs sm:text-sm font-medium text-white transition hover:bg-[#ff7a3d]"
                >
                  <a href="#work">
                    View My Projects <ArrowDown size={14} className="ml-1.5 sm:ml-2" />
                  </a>
                </Button>
              </Magnet>

              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/60 px-3.5 py-2 sm:px-4 sm:py-3 text-xs font-mono text-foreground transition hover:border-[#ff5e1e]/40 hover:bg-muted cursor-pointer"
              >
                <Mail size={12} className="text-[#ff7a3d]" />
                <span>Contact Me</span>
              </a>

              <a
                href="mailto:ankitmourya7874@gmail.com?subject=CV%20Request%20-%20Ankit%20Maurya"
                className="inline-flex items-center gap-1 text-xs font-mono text-muted-foreground hover:text-[#ff7a3d] transition py-1"
              >
                <FileText size={13} /> <span>Request Resume</span> ↗
              </a>
            </div>

            <div className="hero-meta text-[11px] sm:text-xs py-2 sm:py-3 my-2 sm:my-3">
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={12} className="text-[#ff7a3d]" /> Delhi, India
              </span>
              <span className="meta-separator" />
              <span className="hidden sm:inline">B.Com. (Honours) · University of Delhi</span>
              <span className="meta-separator hidden sm:inline" />
              <span className="text-emerald-500 font-semibold">Data Analytics & BI</span>
            </div>

            <div className="hero-socials">
              <a
                href="https://github.com/ankitmauryaa1"
                target="_blank"
                rel="noreferrer"
                className="hero-social-pill"
                title="GitHub @ankitmauryaa1"
              >
                <Github size={13} />
                <span>GitHub</span>
                <small className="hidden sm:inline">@ankitmauryaa1</small>
              </a>
              <a
                href="https://www.linkedin.com/in/ankitmauryaa/"
                target="_blank"
                rel="noreferrer"
                className="hero-social-pill"
                title="LinkedIn @ankitmauryaa"
              >
                <Linkedin size={13} />
                <span>LinkedIn</span>
                <small className="hidden sm:inline">@ankitmauryaa</small>
              </a>
            </div>
          </div>

          {/* Interactive Dither Veil Portrait (Responsive Aspect Ratio & Scale) */}
          <div className="hero-portrait-card w-full max-w-sm sm:max-w-md lg:max-w-xl mx-auto lg:ml-auto group relative rounded-2xl border border-border bg-card/60 backdrop-blur-xl p-3 sm:p-4 shadow-2xl transition-all duration-300 hover:border-[#ff5e1e]/40 overflow-hidden flex flex-col justify-between">
            {/* Ambient background glow behind the card */}
            <div className="absolute -top-24 -right-24 w-60 h-60 rounded-full bg-[#ff5e1e]/15 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-60 h-60 rounded-full bg-[#ff5e1e]/10 blur-3xl pointer-events-none" />

            {/* Top HUD bar */}
            <div className="flex items-center justify-between pb-2.5 mb-2.5 sm:pb-3 sm:mb-3 border-b border-border/80 font-mono text-[10px] sm:text-[11px] text-muted-foreground z-10 relative">
              <span className="inline-flex items-center gap-1.5 sm:gap-2 text-foreground font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff5e1e] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ff5e1e]" />
                </span>
                <span>DITHER VEIL</span>
                <span className="text-muted-foreground/60">/</span>
                <span className="text-[#ff7a3d]">ANKIT MAURYA</span>
              </span>
              <span className="inline-flex items-center gap-1.5 text-[9px] sm:text-[10px] uppercase tracking-wider text-muted-foreground bg-muted/60 px-2 py-0.5 rounded border border-border/60">
                <Sparkles size={10} className="text-[#ff7a3d]" />
                Hover to burn
              </span>
            </div>

            {/* Dither Veil Canvas Window */}
            <div className="relative w-full aspect-[4/3] sm:aspect-square rounded-xl overflow-hidden border border-border bg-black shadow-inner max-h-[300px] sm:max-h-none">
              <DitherVeil
                src="/ankit.jpeg"
                fit="cover"
                pattern="floyd"
                pixelSize={2}
                levels={2}
                palette="duotone"
                inkColor={themeMode === "dark" ? "#09090b" : "#18181b"}
                paperColor={themeMode === "dark" ? "#fafafa" : "#ffffff"}
                rimColor="#ff5e1e"
                rim={0.18}
                revealRadius={115}
                softness={0.65}
                linger={1.4}
                contrast={1.15}
                brightness={0}
                wander={true}
                clickBurst={true}
                className="w-full h-full cursor-crosshair"
              />

              {/* Interactive prompt overlay that fades on hover */}
              <div className="absolute bottom-2.5 left-2.5 right-2.5 pointer-events-none z-10 flex items-center justify-between rounded-lg bg-black/75 backdrop-blur-md px-2.5 py-1 sm:px-3 sm:py-1.5 border border-white/10 text-[9px] sm:text-[10px] font-mono text-zinc-300 opacity-90 group-hover:opacity-0 transition-opacity duration-300">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff5e1e] animate-pulse" />
                  Burn cursor through dither
                </span>
                <span className="text-[#ff7a3d]">1-bit ➔ Full color</span>
              </div>
            </div>

            {/* Bottom Card Footer */}
            <div className="pt-2.5 mt-2.5 sm:pt-3 sm:mt-3 border-t border-border/80 flex items-center justify-between font-mono text-[11px] sm:text-xs z-10 relative">
              <div>
                <span className="text-foreground font-medium block">Ankit Maurya</span>
                <span className="text-[10px] text-muted-foreground">Data Analyst | Python Developer | SQL & Power BI Specialist</span>
              </div>
              <div className="text-right">
                <span className="text-emerald-500 font-semibold text-[10px] block">● OPEN TO ROLES</span>
                <span className="text-[10px] text-muted-foreground">Delhi, India</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Quantitative Impact Bar */}
      <section className="proof-strip py-4 sm:py-6">
        <div className="shell-container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
            <div className="proof-item p-3 sm:p-5 group">
              <div className="flex items-center justify-between font-mono text-[9px] sm:text-[10px] text-muted-foreground">
                <span className="text-[#ff7a3d]">01 / INDEX</span>
                <span className="opacity-60 hidden sm:inline">PORTFOLIO</span>
              </div>
              <span className="proof-number text-2xl sm:text-4xl lg:text-5xl my-0.5">
                <CountUp to={projects.length} duration={1.2} />
              </span>
              <div>
                <strong className="block text-foreground text-xs sm:text-sm font-semibold">Projects</strong>
                <small className="text-muted-foreground text-[10px] sm:text-xs">Selected and additional work</small>
              </div>
            </div>

            <div className="proof-item p-3 sm:p-5 group">
              <div className="flex items-center justify-between font-mono text-[9px] sm:text-[10px] text-muted-foreground">
                <span className="text-[#ff7a3d]">02 / FEATURED</span>
                <span className="text-emerald-500 flex items-center gap-1">● SELECTED</span>
              </div>
              <span className="proof-number text-2xl sm:text-4xl lg:text-5xl my-0.5">
                0<CountUp to={featuredProjects.length} duration={1.4} />
              </span>
              <div>
                <strong className="block text-foreground text-xs sm:text-sm font-semibold">Featured Projects</strong>
                <small className="text-muted-foreground text-[10px] sm:text-xs">AI, BI & web concepts</small>
              </div>
            </div>

            <div className="proof-item p-3 sm:p-5 group">
              <div className="flex items-center justify-between font-mono text-[9px] sm:text-[10px] text-muted-foreground">
                <span className="text-[#ff7a3d]">03 / EDUCATION</span>
                <span className="opacity-60 hidden sm:inline">LEARNING</span>
              </div>
              <span className="proof-number text-2xl sm:text-4xl lg:text-5xl my-0.5">
                0<CountUp to={2} duration={1.6} />
              </span>
              <div>
                <strong className="block text-foreground text-xs sm:text-sm font-semibold">Areas of Study</strong>
                <small className="text-muted-foreground text-[10px] sm:text-xs">Commerce and data science</small>
              </div>
            </div>

            <div className="proof-item p-3 sm:p-5 group">
              <div className="flex items-center justify-between font-mono text-[9px] sm:text-[10px] text-muted-foreground">
                <span className="text-[#ff7a3d]">04 / LOCATION</span>
                <span className="text-emerald-500 font-mono">AVAILABLE</span>
              </div>
              <span className="proof-number text-2xl sm:text-4xl lg:text-5xl my-0.5">28°N</span>
              <div>
                <strong className="block text-foreground text-xs sm:text-sm font-semibold">Delhi, India</strong>
                <small className="text-muted-foreground text-[10px] sm:text-xs">Open to roles & teams</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Section 02: Selected Work Showcase (Spotlight Cards) */}
      <section id="work" className="page-section">
        <div className="shell-container">
          <div className="section-heading mb-6 sm:mb-10">
            <div className="eyebrow mb-2">
              <span className="eyebrow-number">■ 02</span>
              <span>SELECTED WORK & CASE STUDIES</span>
            </div>
            <div className="section-heading-copy">
              <div className="hidden sm:block h-12 sm:h-14 w-full max-w-sm mb-2">
                <TechText
                  key={`work-title-${themeMode}`}
                  text="SELECTED WORK"
                  fontFamily='"JetBrains Mono", monospace'
                  fontSize={28}
                  fontWeight={600}
                  color={themeMode === "dark" ? "#f4f4f1" : "#141416"}
                  accentColor="#ff7a3d"
                  align="left"
                  intro="type"
                  clickKick={true}
                  dashLength={3}
                  dashGap={2}
                />
              </div>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-editorial font-normal leading-tight">
                Featured projects and case studies.
              </h2>
              <p className="text-xs sm:text-base text-muted-foreground mt-2">
                A selection of analytics dashboards, machine learning projects, AI applications, and a civic technology concept.
              </p>
            </div>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-1.5 sm:gap-2 mb-6 sm:mb-8 overflow-x-auto no-scrollbar py-1" role="group" aria-label="Filter projects">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`rounded-full px-3.5 py-1.5 font-mono text-[11px] sm:text-xs transition cursor-pointer shrink-0 ${
                  filterCategory === cat
                    ? "bg-[#ff5e1e] text-white font-medium shadow-sm"
                    : "border border-border bg-card text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat}
                <span className="ml-1 opacity-60">
                  {cat === "All"
                    ? projects.length
                    : projects.filter((p) => p.category === cat).length}
                </span>
              </button>
            ))}
          </div>

          {/* Dynamic Editorial Showcase Layout */}
          {filterCategory === "All" ? (
            <div className="flex flex-col gap-6 sm:gap-10">
              {/* Featured project 01 */}
              <SpotlightCard
                theme={themeMode}
                spotlightColor={
                  themeMode === "dark"
                    ? "rgba(255, 94, 30, 0.22)"
                    : "rgba(255, 94, 30, 0.14)"
                }
                borderGlow={0.65}
                className="featured-project-card cursor-pointer group"
                onClick={() => setSelectedProject(featuredProjects[0])}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                  <div className="lg:col-span-5 xl:col-span-6 p-4 sm:p-6 lg:p-9 flex flex-col justify-between order-2 lg:order-1">
                    <div>
                      <div className="flex items-center justify-between font-mono text-xs mb-2">
                        <span className="text-muted-foreground">{featuredProjects[0].category}</span>
                        <span className="status-badge status-live">
                          <i className="w-1.5 h-1.5 rounded-full bg-current animate-ping" />
                          {featuredProjects[0].status}
                        </span>
                      </div>

                      <div className="mb-2">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-mono bg-[#ff5e1e]/10 text-[#ff7a3d] border border-[#ff5e1e]/25">
                          AI-Powered SQL Analysis
                        </span>
                      </div>

                      <h3 className="font-editorial text-2xl sm:text-3xl md:text-4xl text-foreground font-normal leading-tight mb-2 sm:mb-3">
                        {featuredProjects[0].name}
                      </h3>

                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-3 sm:mb-4">
                        {featuredProjects[0].summary}
                      </p>

                      <div className="hidden sm:space-y-1.5 sm:block mb-4 text-xs text-foreground/90 font-mono">
                        <div className="flex items-center gap-2 text-emerald-500">
                          <Check size={13} />
                          <span>{featuredProjects[0].build[0]}</span>
                        </div>
                        <div className="flex items-center gap-2 text-emerald-500">
                          <Check size={13} />
                          <span>{featuredProjects[0].build[1]}</span>
                        </div>
                        <div className="flex items-center gap-2 text-emerald-500">
                          <Check size={13} />
                          <span>{featuredProjects[0].build[2]}</span>
                        </div>
                      </div>

                      <div className="tag-list mb-4 sm:mb-6">
                        {featuredProjects[0].stack.slice(0, 4).map((tag) => (
                          <span key={tag} className="text-[10px] sm:text-xs">{tag}</span>
                        ))}
                        {featuredProjects[0].stack.length > 4 && (
                          <span className="sm:hidden text-[10px] text-muted-foreground bg-transparent border-dashed">
                            +{featuredProjects[0].stack.length - 4} more
                          </span>
                        )}
                        {featuredProjects[0].stack.slice(4).map((tag) => (
                          <span key={tag} className="hidden sm:inline-block text-[10px] sm:text-xs">{tag}</span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-border">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProject(featuredProjects[0]);
                        }}
                        className="inline-flex items-center gap-1.5 text-xs font-mono text-[#ff7a3d] group-hover:underline cursor-pointer"
                      >
                        Inspect architecture <ArrowRight size={13} />
                      </button>

                      {featuredProjects[0].demo && (
                        <a
                          href={featuredProjects[0].demo.href}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1 text-xs font-mono text-foreground hover:text-[#ff7a3d] transition"
                        >
                          {featuredProjects[0].demo.label} <ExternalLink size={12} />
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="lg:col-span-7 xl:col-span-6 featured-visual-pane right-pane order-1 lg:order-2 relative overflow-hidden h-[220px] sm:h-[280px] lg:h-auto min-h-0 lg:min-h-[420px]">
                    <PixelSwap
                      pattern="pointer"
                      pixelSize={28}
                      pixelRadius={3}
                      pixelScale={0.25}
                      duration={420}
                      pixelDuration={300}
                      bounce={0.3}
                      intro={false}
                      aspectRatio="unset"
                      className="w-full h-full"
                      firstContent={<PortfolioVisual project={featuredProjects[0]} badge="01 / 04 · FLAGSHIP" />}
                      secondContent={<ProjectXRay project={featuredProjects[0]} />}
                    />
                    <span className="hidden sm:flex pointer-events-none absolute bottom-3 right-3 font-mono text-[9px] text-[#ff7a3d] bg-card/90 px-2 py-0.5 rounded border border-[#ff5e1e]/30 items-center gap-1 z-20 shadow-sm backdrop-blur-sm">
                      <Sparkles size={10} /> Hover for Pixel Swap X-Ray
                    </span>
                  </div>
                </div>
              </SpotlightCard>

              {/* Featured project 02 */}
              <SpotlightCard
                theme={themeMode}
                spotlightColor={
                  themeMode === "dark"
                    ? "rgba(16, 185, 129, 0.22)"
                    : "rgba(16, 185, 129, 0.14)"
                }
                borderGlow={0.65}
                className="featured-project-card cursor-pointer group"
                onClick={() => setSelectedProject(featuredProjects[1])}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                  <div className="lg:col-span-5 xl:col-span-6 p-4 sm:p-6 lg:p-9 flex flex-col justify-between order-2 lg:order-1">
                    <div>
                      <div className="flex items-center justify-between font-mono text-xs mb-2">
                        <span className="text-muted-foreground">{featuredProjects[1].category}</span>
                        <span className="status-badge status-pre-launch">
                          <i className="w-1.5 h-1.5 rounded-full bg-current animate-ping" />
                          {featuredProjects[1].status}
                        </span>
                      </div>

                      <div className="mb-2">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
                          Interactive Power BI Dashboard
                        </span>
                      </div>

                      <h3 className="font-editorial text-2xl sm:text-3xl md:text-4xl text-foreground font-normal leading-tight mb-2 sm:mb-3">
                        {featuredProjects[1].name}
                      </h3>

                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-3 sm:mb-4">
                        {featuredProjects[1].summary}
                      </p>

                      <div className="hidden sm:space-y-1.5 sm:block mb-4 text-xs text-foreground/90 font-mono">
                        <div className="flex items-center gap-2 text-emerald-400">
                          <Check size={13} />
                          <span>{featuredProjects[1].build[0]}</span>
                        </div>
                        <div className="flex items-center gap-2 text-emerald-400">
                          <Check size={13} />
                          <span>{featuredProjects[1].build[1]}</span>
                        </div>
                        <div className="flex items-center gap-2 text-emerald-400">
                          <Check size={13} />
                          <span>{featuredProjects[1].build[2]}</span>
                        </div>
                      </div>

                      <div className="tag-list mb-4 sm:mb-6">
                        {featuredProjects[1].stack.slice(0, 4).map((tag) => (
                          <span key={tag} className="text-[10px] sm:text-xs">{tag}</span>
                        ))}
                        {featuredProjects[1].stack.length > 4 && (
                          <span className="sm:hidden text-[10px] text-muted-foreground bg-transparent border-dashed">
                            +{featuredProjects[1].stack.length - 4} more
                          </span>
                        )}
                        {featuredProjects[1].stack.slice(4).map((tag) => (
                          <span key={tag} className="hidden sm:inline-block text-[10px] sm:text-xs">{tag}</span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-border">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProject(featuredProjects[1]);
                        }}
                        className="inline-flex items-center gap-1.5 text-xs font-mono text-[#ff7a3d] group-hover:underline cursor-pointer"
                      >
                        Inspect architecture <ArrowRight size={13} />
                      </button>

                      {featuredProjects[1].demo && (
                        <a
                          href={featuredProjects[1].demo.href}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1 text-xs font-mono text-foreground hover:text-[#ff7a3d] transition"
                        >
                          {featuredProjects[1].demo.label} <ExternalLink size={12} />
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="lg:col-span-7 xl:col-span-6 featured-visual-pane right-pane order-1 lg:order-2 relative overflow-hidden h-[220px] sm:h-[280px] lg:h-auto min-h-0 lg:min-h-[420px]">
                    <PixelSwap
                      pattern="pointer"
                      pixelSize={28}
                      pixelRadius={3}
                      pixelScale={0.25}
                      duration={420}
                      pixelDuration={300}
                      bounce={0.3}
                      intro={false}
                      aspectRatio="unset"
                      className="w-full h-full"
                      firstContent={<PortfolioVisual project={featuredProjects[1]} badge="02 / 04 · DASHBOARD" />}
                      secondContent={<ProjectXRay project={featuredProjects[1]} />}
                    />
                    <span className="hidden sm:flex pointer-events-none absolute bottom-3 right-3 font-mono text-[9px] text-[#ff7a3d] bg-card/90 px-2 py-0.5 rounded border border-[#ff5e1e]/30 items-center gap-1 z-20 shadow-sm backdrop-blur-sm">
                      <Sparkles size={10} /> Hover for Pixel Swap X-Ray
                    </span>
                  </div>
                </div>
              </SpotlightCard>

              {/* Featured project 03 */}
              <SpotlightCard
                theme={themeMode}
                spotlightColor={
                  themeMode === "dark"
                    ? "rgba(255, 94, 30, 0.22)"
                    : "rgba(255, 94, 30, 0.14)"
                }
                borderGlow={0.65}
                className="featured-project-card cursor-pointer group"
                onClick={() => setSelectedProject(featuredProjects[2])}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                  <div className="lg:col-span-5 xl:col-span-6 p-4 sm:p-6 lg:p-9 flex flex-col justify-between order-2 lg:order-1">
                    <div>
                      <div className="flex items-center justify-between font-mono text-xs mb-2">
                        <span className="text-muted-foreground">{featuredProjects[2].category}</span>
                        <span className="status-badge status-live">
                          <i className="w-1.5 h-1.5 rounded-full bg-current animate-ping" />
                          {featuredProjects[2].status}
                        </span>
                      </div>

                      <div className="mb-2">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-mono bg-amber-500/10 text-amber-400 border border-amber-500/25">
                          Competitive Market Analysis
                        </span>
                      </div>

                      <h3 className="font-editorial text-2xl sm:text-3xl md:text-4xl text-foreground font-normal leading-tight mb-2 sm:mb-3">
                        {featuredProjects[2].name}
                      </h3>

                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-3 sm:mb-4">
                        {featuredProjects[2].summary}
                      </p>

                      <div className="hidden sm:space-y-1.5 sm:block mb-4 text-xs text-foreground/90 font-mono">
                        <div className="flex items-center gap-2 text-amber-400">
                          <Check size={13} />
                          <span>{featuredProjects[2].build[0]}</span>
                        </div>
                        <div className="flex items-center gap-2 text-amber-400">
                          <Check size={13} />
                          <span>{featuredProjects[2].build[1]}</span>
                        </div>
                        <div className="flex items-center gap-2 text-amber-400">
                          <Check size={13} />
                          <span>{featuredProjects[2].build[2]}</span>
                        </div>
                      </div>

                      <div className="tag-list mb-4 sm:mb-6">
                        {featuredProjects[2].stack.slice(0, 4).map((tag) => (
                          <span key={tag} className="text-[10px] sm:text-xs">{tag}</span>
                        ))}
                        {featuredProjects[2].stack.length > 4 && (
                          <span className="sm:hidden text-[10px] text-muted-foreground bg-transparent border-dashed">
                            +{featuredProjects[2].stack.length - 4} more
                          </span>
                        )}
                        {featuredProjects[2].stack.slice(4).map((tag) => (
                          <span key={tag} className="hidden sm:inline-block text-[10px] sm:text-xs">{tag}</span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-border">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProject(featuredProjects[2]);
                        }}
                        className="inline-flex items-center gap-1.5 text-xs font-mono text-[#ff7a3d] group-hover:underline cursor-pointer"
                      >
                        Inspect architecture <ArrowRight size={13} />
                      </button>

                      {featuredProjects[2].demo && (
                        <a
                          href={featuredProjects[2].demo.href}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1 text-xs font-mono text-foreground hover:text-[#ff7a3d] transition"
                        >
                          {featuredProjects[2].demo.label} <ExternalLink size={12} />
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="lg:col-span-7 xl:col-span-6 featured-visual-pane right-pane order-1 lg:order-2 relative overflow-hidden h-[220px] sm:h-[280px] lg:h-auto min-h-0 lg:min-h-[420px]">
                    <PixelSwap
                      pattern="pointer"
                      pixelSize={28}
                      pixelRadius={3}
                      pixelScale={0.25}
                      duration={420}
                      pixelDuration={300}
                      bounce={0.3}
                      intro={false}
                      aspectRatio="unset"
                      className="w-full h-full"
                      firstContent={<PortfolioVisual project={featuredProjects[2]} badge="03 / 04 · CASE STUDY" />}
                      secondContent={<ProjectXRay project={featuredProjects[2]} />}
                    />
                    <span className="hidden sm:flex pointer-events-none absolute bottom-3 right-3 font-mono text-[9px] text-[#ff7a3d] bg-card/90 px-2 py-0.5 rounded border border-[#ff5e1e]/30 items-center gap-1 z-20 shadow-sm backdrop-blur-sm">
                      <Sparkles size={10} /> Hover for Pixel Swap X-Ray
                    </span>
                  </div>
                </div>
              </SpotlightCard>

              {/* Featured project 04 */}
              <SpotlightCard
                theme={themeMode}
                spotlightColor={
                  themeMode === "dark"
                    ? "rgba(56, 189, 248, 0.22)"
                    : "rgba(56, 189, 248, 0.14)"
                }
                borderGlow={0.65}
                className="featured-project-card cursor-pointer group"
                onClick={() => setSelectedProject(featuredProjects[3])}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                  <div className="lg:col-span-5 xl:col-span-6 p-4 sm:p-6 lg:p-9 flex flex-col justify-between order-2 lg:order-1">
                    <div>
                      <div className="flex items-center justify-between font-mono text-xs mb-2">
                        <span className="text-muted-foreground">{featuredProjects[3].category}</span>
                        <span className="status-badge status-client-work">
                          <i className="w-1.5 h-1.5 rounded-full bg-current" />
                          {featuredProjects[3].status}
                        </span>
                      </div>

                      <div className="mb-2">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-mono bg-sky-500/10 text-sky-400 border border-sky-500/25">
                          Public Issue Management Concept
                        </span>
                      </div>

                      <h3 className="font-editorial text-2xl sm:text-3xl md:text-4xl text-foreground font-normal leading-tight mb-2 sm:mb-3">
                        {featuredProjects[3].name}
                      </h3>

                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-3 sm:mb-4">
                        {featuredProjects[3].summary}
                      </p>

                      <div className="hidden sm:space-y-1.5 sm:block mb-4 text-xs text-foreground/90 font-mono">
                        <div className="flex items-center gap-2 text-sky-400">
                          <Check size={13} />
                          <span>{featuredProjects[3].build[0]}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sky-400">
                          <Check size={13} />
                          <span>{featuredProjects[3].build[1]}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sky-400">
                          <Check size={13} />
                          <span>{featuredProjects[3].build[2]}</span>
                        </div>
                      </div>

                      <div className="tag-list mb-4 sm:mb-6">
                        {featuredProjects[3].stack.slice(0, 4).map((tag) => (
                          <span key={tag} className="text-[10px] sm:text-xs">{tag}</span>
                        ))}
                        {featuredProjects[3].stack.length > 4 && (
                          <span className="sm:hidden text-[10px] text-muted-foreground bg-transparent border-dashed">
                            +{featuredProjects[3].stack.length - 4} more
                          </span>
                        )}
                        {featuredProjects[3].stack.slice(4).map((tag) => (
                          <span key={tag} className="hidden sm:inline-block text-[10px] sm:text-xs">{tag}</span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-border">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProject(featuredProjects[3]);
                        }}
                        className="inline-flex items-center gap-1.5 text-xs font-mono text-[#ff7a3d] group-hover:underline cursor-pointer"
                      >
                        Inspect architecture <ArrowRight size={13} />
                      </button>
                    </div>
                  </div>

                  <div className="lg:col-span-7 xl:col-span-6 featured-visual-pane right-pane order-1 lg:order-2 relative overflow-hidden h-[220px] sm:h-[280px] lg:h-auto min-h-0 lg:min-h-[420px]">
                    <PixelSwap
                      pattern="pointer"
                      pixelSize={28}
                      pixelRadius={3}
                      pixelScale={0.25}
                      duration={420}
                      pixelDuration={300}
                      bounce={0.3}
                      intro={false}
                      aspectRatio="unset"
                      className="w-full h-full"
                      firstContent={<PortfolioVisual project={featuredProjects[3]} badge="04 / 04 · CONCEPT" />}
                      secondContent={<ProjectXRay project={featuredProjects[3]} />}
                    />
                    <span className="hidden sm:flex pointer-events-none absolute bottom-3 right-3 font-mono text-[9px] text-[#ff7a3d] bg-card/90 px-2 py-0.5 rounded border border-[#ff5e1e]/30 items-center gap-1 z-20 shadow-sm backdrop-blur-sm">
                      <Sparkles size={10} /> Hover for Pixel Swap X-Ray
                    </span>
                  </div>
                </div>
              </SpotlightCard>
            </div>
          ) : null}
          {filterCategory === "All" && (
            <h3 className="font-editorial text-2xl sm:text-3xl mt-8 mb-4">Additional Projects</h3>
          )}
          <div className="projects-grid">
            {filteredProjects.map((project, index) => (
              <SpotlightCard
                key={project.slug}
                theme={themeMode}
                spotlightColor={
                  themeMode === "dark"
                    ? "rgba(255, 94, 30, 0.22)"
                    : "rgba(255, 94, 30, 0.14)"
                }
                borderGlow={0.6}
                className="cursor-pointer group"
                onClick={() => setSelectedProject(project)}
              >
                <div className="project-visual-frame relative overflow-hidden">
                  <PixelSwap
                    pattern="pointer"
                    pixelSize={24}
                    pixelRadius={2}
                    pixelScale={0.25}
                    duration={380}
                    pixelDuration={280}
                    bounce={0.3}
                    intro={false}
                    aspectRatio="unset"
                    className="w-full h-full"
                    firstContent={<PortfolioVisual project={project} compact />}
                    secondContent={<ProjectXRay project={project} compact />}
                  />
                  <span className="pointer-events-none absolute top-3 right-3 font-mono text-[10px] text-muted-foreground bg-card/80 px-2 py-0.5 rounded border border-border z-20">
                    {String(index + 1).padStart(2, "0")} / {String(filteredProjects.length).padStart(2, "0")}
                  </span>
                  <span className="pointer-events-none absolute bottom-2 right-2 font-mono text-[9px] text-[#ff7a3d] bg-card/90 px-1.5 py-0.5 rounded border border-[#ff5e1e]/30 flex items-center gap-1 z-20">
                    <Sparkles size={9} /> Pixel Swap
                  </span>
                </div>

                <div className="project-card-body">
                  <div className="project-card-kicker">
                    <span>{project.category}</span>
                    <span
                      className={`status-badge ${
                        project.status === "Project"
                          ? "status-live"
                          : project.status === "Case Study"
                          ? "status-pre-launch"
                          : "status-client-work"
                      }`}
                    >
                      <i className="w-1.5 h-1.5 rounded-full bg-current" />
                      {project.status}
                    </span>
                  </div>

                  <h3 className="font-editorial text-2xl font-normal leading-tight mb-1.5 text-foreground">{project.name}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-3">{project.summary}</p>

                  <div className="tag-list mb-4">
                    {project.stack.slice(0, 4).map((tag) => (
                      <span key={tag} className="text-[10px] sm:text-xs">{tag}</span>
                    ))}
                    {project.stack.length > 4 && (
                      <span className="sm:hidden text-[10px] text-muted-foreground bg-transparent border-dashed">
                        +{project.stack.length - 4} more
                      </span>
                    )}
                    {project.stack.slice(4).map((tag) => (
                      <span key={tag} className="hidden sm:inline-block text-[10px] sm:text-xs">{tag}</span>
                    ))}
                  </div>

                  <div className="project-links">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProject(project);
                      }}
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-[#ff7a3d] group-hover:underline cursor-pointer"
                    >
                      Inspect architecture <ArrowRight size={13} />
                    </button>

                    {project.demo && (
                      <a
                        href={project.demo.href}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 text-xs font-mono text-muted-foreground hover:text-foreground"
                      >
                        Live demo <ExternalLink size={12} />
                      </a>
                    )}
                  </div>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Section 04: Methodology (HOW I WORK) */}
      <section id="process" className="page-section bg-subtle-section border-t border-b border-border transition-colors duration-300">
        <div className="shell-container">
          <div className="section-heading mb-8">
            <div className="eyebrow">
              <span className="eyebrow-number">■ 03</span>
              <span>METHODOLOGY & EXECUTION</span>
            </div>
            <div className="section-heading-copy">
              <h2>How I work with data.</h2>
              <p>
                I start with the business question, prepare the data, check the results, and communicate what I find.
              </p>
            </div>
          </div>

          <MethodologyFlexCarousel />
        </div>
      </section>

      {/* 7. Section 04: Skills in Context */}
      <section id="skills" className="page-section">
        <div className="shell-container">
          <div className="section-heading">
            <div className="eyebrow">
              <span className="eyebrow-number">■ 04</span>
              <span>TECHNICAL CAPABILITIES</span>
            </div>
            <div className="section-heading-copy">
              <h2>Technical Skills</h2>
              <p>
                Explore the tools and techniques I use for programming, analytics, business intelligence, databases, and machine learning.
              </p>
            </div>
          </div>

          <SkillsShowcase themeMode={themeMode} onSelectProject={setSelectedProject} />
        </div>
      </section>

      {/* 8. Dual Call-to-Action */}
      <section className="page-section">
        <div className="shell-container dual-cta-grid gap-4 sm:gap-6">
          <div className="dual-cta-cell p-5 sm:p-8 rounded-2xl">
            <div className="eyebrow mb-2">
              <span className="eyebrow-number">■ 05</span>
              <span>ABOUT ME</span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-editorial font-normal leading-tight mt-1 mb-2">
              About Me
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-4 sm:mb-6">
              I'm Ankit Maurya, an aspiring Data Analyst and Data Science enthusiast based in Delhi, India.
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-4 sm:mb-6">
              I have a strong foundation in Python, SQL, Power BI, Excel, Tableau, data visualization, and machine learning.
              I enjoy solving real-world business problems through data analytics, interactive dashboards, predictive modeling, and AI-powered applications.
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-4 sm:mb-6">
              My projects include QueryPilot, an AI-powered SQL analyst, a Rockstar Games Business Analytics Dashboard,
              and an Ola vs Uber vs Rapido competitive market analysis.
              I'm passionate about combining analytical thinking, business understanding, and modern technologies to develop meaningful data-driven solutions.
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-4 sm:mb-6">
              <strong className="text-foreground">Soft Skills</strong><br />
              Analytical Thinking · Problem Solving · Critical Thinking · Data Storytelling · Business Analysis ·
              Communication · Adaptability · Attention to Detail · Continuous Learning
            </p>
            <div className="dual-cta-actions flex flex-wrap items-center gap-2.5 sm:gap-4 mt-auto">
              <Magnet padding={15} magnetStrength={2}>
                <Button
                  onClick={copyEmail}
                  className="rounded-full bg-[#ff5e1e] px-4 sm:px-5 py-2 sm:py-2.5 text-xs font-medium text-white hover:bg-[#ff7a3d]"
                >
                  <Mail size={13} className="mr-1.5" /> Connect via Email
                </Button>
              </Magnet>
              <a
                href="mailto:ankitmourya7874@gmail.com?subject=Interview%20Request%20-%20Ankit%20Maurya"
                className="font-mono text-xs text-foreground hover:text-[#ff7a3d] inline-flex items-center gap-1"
              >
                Book 15-min call <ArrowUpRight size={13} />
              </a>
            </div>
          </div>

          <div className="dual-cta-cell p-5 sm:p-8 rounded-2xl">
            <div className="eyebrow mb-2">
              <span className="eyebrow-number">■ 06</span>
              <span>EDUCATION</span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-editorial font-normal leading-tight mt-1 mb-2">
              Education & Training
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-4 sm:mb-6">
              <strong className="text-foreground">Bachelor of Commerce (Honours)</strong><br />
              University of Delhi<br />
              August 2023 – August 2026
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-4 sm:mb-6">
              <strong className="text-foreground">Data Analytics &amp; Data Science Training</strong><br />
              IT Vedant<br />
              Focus: Python, SQL, Power BI, Excel, Tableau, Statistics, Machine Learning, and Data Analytics.
            </p>
            <div className="dual-cta-actions flex flex-wrap items-center gap-2.5 sm:gap-4 mt-auto">
              <a
                href="#skills"
                className="rounded-full border border-border bg-card px-4 sm:px-5 py-2 sm:py-2.5 font-mono text-xs text-foreground hover:border-[#ff5e1e] hover:text-[#ff7a3d] transition inline-flex items-center gap-2"
              >
                View Technical Skills <ArrowRight size={13} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Section 07: Contact Panel */}
      <section id="contact" className="page-section bg-subtle-section border-t border-border transition-colors duration-300">
        <div className="shell-container contact-grid">
          <div>
            <div className="eyebrow mb-2">
              <span className="eyebrow-number">■ 07</span>
              <span>GET IN TOUCH</span>
            </div>
            <div className="flex items-center gap-3.5 mb-3 sm:mb-4">
              <img
                src="/ankit.jpeg"
                alt="Ankit Maurya"
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-[#ff5e1e]/40 shadow-lg shadow-[#ff5e1e]/10"
              />
              <div>
                <span className="font-editorial text-lg text-foreground font-medium block leading-snug">Ankit Maurya</span>
                <span className="text-xs font-mono text-muted-foreground">Data Analyst | Business Intelligence &amp; AI Enthusiast</span>
              </div>
            </div>
            <div className="hidden sm:block h-10 sm:h-12 w-full max-w-xs mb-2">
              <TechText
                key={`contact-badge-${themeMode}`}
                text="GET IN TOUCH"
                fontFamily='"JetBrains Mono", monospace'
                fontSize={26}
                fontWeight={600}
                color={themeMode === "dark" ? "#f4f4f1" : "#141416"}
                accentColor="#ff5e1e"
                align="left"
                intro="metrics"
                clickKick={true}
                dashLength={3}
                dashGap={2}
              />
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-normal leading-tight">
              Let's Connect & Build Something Meaningful.
            </h2>
            <p className="mt-3 text-muted-foreground text-xs sm:text-sm leading-relaxed max-w-lg">
              I'm interested in opportunities involving Data Analytics, Business Intelligence, Python Development, Machine Learning, and AI-powered solutions.
            </p>

            <a
              href="mailto:ankitmourya7874@gmail.com"
              className="contact-email group cursor-pointer text-xs sm:text-sm"
              title="Email Ankit Maurya"
            >
              <Mail size={15} className="text-[#ff7a3d]" />
              <span className="truncate">ankitmourya7874@gmail.com</span>
              <ArrowUpRight size={13} className="opacity-0 group-hover:opacity-100 transition shrink-0" />
            </a>

            <div className="mt-4 sm:mt-6 flex items-center gap-2 font-mono text-[11px] sm:text-xs text-emerald-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>Open to opportunities</span>
              <a className="sm:hidden hover:underline" href="https://github.com/ankitmauryaa1" target="_blank" rel="noreferrer">GitHub</a>
              <a className="sm:hidden hover:underline" href="https://www.linkedin.com/in/ankitmauryaa/" target="_blank" rel="noreferrer">LinkedIn</a>
            </div>

            {/* Structured Telemetry Card (Desktop Only - hidden on mobile to avoid redundant length) */}
            <div className="hidden sm:block mt-8 p-4 rounded-xl border border-border bg-card/60 backdrop-blur-sm space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-border/60 text-muted-foreground text-[11px]">
                <span className="uppercase tracking-wider">Direct Channels</span>
                <span className="text-emerald-500 font-medium flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Active
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-muted-foreground">
                <div>
                  <span className="block text-[10px] text-muted-foreground/60 uppercase">Base Location</span>
                  <span className="text-foreground font-medium">Delhi, India</span>
                </div>
                <div>
                  <span className="block text-[10px] text-muted-foreground/60 uppercase">Timezone</span>
                  <span className="text-foreground font-medium">IST (UTC +5:30)</span>
                </div>
                <div>
                  <span className="block text-[10px] text-muted-foreground/60 uppercase">Availability</span>
                  <span className="text-emerald-500 font-medium">Open to opportunities</span>
                </div>
                <div>
                  <span className="block text-[10px] text-muted-foreground/60 uppercase">Social Profiles</span>
                  <span className="text-foreground font-medium">
                    <a href="https://github.com/ankitmauryaa1" target="_blank" rel="noreferrer">GitHub</a>
                    {" · "}
                    <a href="https://www.linkedin.com/in/ankitmauryaa/" target="_blank" rel="noreferrer">LinkedIn</a>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <form
            onSubmit={(e: FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              const form = new FormData(e.currentTarget);
              const name = form.get("name");
              const email = form.get("email");
              const msg = form.get("message");
              const mailto = `mailto:ankitmourya7874@gmail.com?subject=Portfolio%20Inquiry%20from%20${encodeURIComponent(
                String(name)
              )}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${msg}`)}`;
              window.location.href = mailto;
              toast.success("Drafting email in your default mail app!");
            }}
            className="contact-form p-4 sm:p-6 lg:p-8 rounded-2xl"
          >
            <div className="form-row">
              <label>
                Name <span>*</span>
                <Input
                  name="name"
                  required
                  placeholder="Your name"
                  className="bg-card border-border text-foreground placeholder:text-muted-foreground text-xs sm:text-sm"
                />
              </label>
              <label>
                Email <span>*</span>
                <Input
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="bg-card border-border text-foreground placeholder:text-muted-foreground text-xs sm:text-sm"
                />
              </label>
            </div>

            <label>
              What can we build together? <span>*</span>
              <Textarea
                name="message"
                rows={3}
                required
                placeholder="Share a brief overview of your role, challenge, or project..."
                className="bg-card border-border text-foreground placeholder:text-muted-foreground text-xs sm:text-sm"
              />
            </label>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <Button
                type="submit"
                className="rounded-full bg-[#ff5e1e] px-5 sm:px-6 py-2.5 text-xs font-medium text-white hover:bg-[#ff7a3d]"
              >
                Send message <Send size={13} className="ml-2" />
              </Button>
              <span className="font-mono text-[10px] sm:text-[11px] text-muted-foreground">
                Direct client-side email dispatch
              </span>
            </div>
          </form>
        </div>
      </section>

      {/* 12. Minimalist Monograph Footer */}
      <footer className="site-footer">
        <div className="shell-container">
          <div className="footer-top">
            <div className="flex items-center gap-3.5">
              <img
                src="/ankit.jpeg"
                alt="Ankit Maurya"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl object-cover border border-border"
              />
              <div>
                <span className="sm:hidden font-editorial text-2xl font-normal text-foreground block">
                  Ankit Maurya<span className="text-[#ff5e1e]">.</span>
                </span>
                <div className="hidden sm:block h-10 sm:h-12 w-48 sm:w-60">
                  <TechText
                    key={`footer-name-${themeMode}`}
                    text="Ankit Maurya."
                    fontFamily='"Instrument Serif", Georgia, serif'
                    fontSize={32}
                    fontWeight={400}
                    color={themeMode === "dark" ? "#f4f4f1" : "#141416"}
                    accentColor="#ff5e1e"
                    align="left"
                    intro="type"
                    clickKick={true}
                    dashLength={3}
                    dashGap={2}
                  />
                </div>
                <span className="font-mono text-[10px] sm:text-[11px] text-muted-foreground block -mt-0.5 sm:-mt-1">
                  DATA ANALYST · BUSINESS INTELLIGENCE &amp; AI ENTHUSIAST
                </span>
              </div>
            </div>

            <div className="footer-links text-xs sm:text-sm">
              <a href="https://github.com/ankitmauryaa1" target="_blank" rel="noreferrer">
                GitHub ↗
              </a>
              <a href="https://www.linkedin.com/in/ankitmauryaa/" target="_blank" rel="noreferrer">
                LinkedIn ↗
              </a>
              <a href="#hero">Back to top ↑</a>
            </div>
          </div>

          <div className="footer-bottom text-[10px] sm:text-xs">
            <span>
              © {new Date().getFullYear()} ANKIT MAURYA · BUILT WITH REACT BITS, TAILWIND & SHADCN
            </span>
            <span className="text-muted-foreground font-mono text-[10px] sm:text-[11px]">
              DELHI, INDIA [28°36'N 77°13'E] / THE WORLD
            </span>
          </div>
        </div>
      </footer>

      {/* 13. Slide-Over Architectural Case Study Sheet */}
      <Sheet open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
        <SheetContent
          side="right"
          data-lenis-prevent
          className="w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl bg-popover border-l border-border text-popover-foreground overflow-y-auto p-4 sm:p-6 md:p-10"
        >
          {selectedProject && (
            <div className="space-y-6">
              <SheetHeader className="text-left space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-[#ff7a3d] uppercase tracking-wider">
                    {selectedProject.category}
                  </span>
                  <span
                    className={`status-badge ${
                      selectedProject.status === "Project"
                        ? "status-live"
                        : selectedProject.status === "Case Study"
                        ? "status-pre-launch"
                        : "status-client-work"
                    }`}
                  >
                    {selectedProject.status}
                  </span>
                </div>
                <SheetTitle className="font-editorial text-3xl md:text-4xl font-normal text-foreground">
                  {selectedProject.name}
                </SheetTitle>
                <SheetDescription className="text-muted-foreground text-sm">
                  {selectedProject.role}
                </SheetDescription>
              </SheetHeader>

              {/* Visual preview */}
              <div className="rounded-xl border border-border overflow-hidden bg-card p-2">
                <PortfolioVisual project={selectedProject} />
              </div>

              {/* Summary & Description */}
              <div className="space-y-3">
                <h4 className="font-mono text-xs text-muted-foreground uppercase tracking-wider border-b border-border pb-1">
                  Executive Summary
                </h4>
                <p className="text-sm text-foreground/90 leading-relaxed">
                  {selectedProject.description}
                </p>
              </div>

              {/* Architecture Pipeline */}
              {selectedProject.architecture.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-mono text-xs text-muted-foreground uppercase tracking-wider border-b border-border pb-1">
                    Architecture Pipeline
                  </h4>
                  <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                    {selectedProject.architecture.map((step, idx) => (
                      <div key={step} className="flex items-center gap-2">
                        <span className="rounded bg-muted border border-border px-3 py-1 text-foreground">
                          {step}
                        </span>
                        {idx < selectedProject.architecture.length - 1 && (
                          <ChevronRight size={14} className="text-[#ff7a3d]" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Technical Stack */}
              {selectedProject.stack.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-mono text-xs text-muted-foreground uppercase tracking-wider border-b border-border pb-1">
                    Technology Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.stack.map((item) => (
                      <span
                        key={item}
                        className="rounded bg-[#ff5e1e]/10 border border-[#ff5e1e]/30 px-2.5 py-1 font-mono text-xs text-[#ff7a3d]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Outcomes & Notes */}
              <div className="space-y-3">
                <h4 className="font-mono text-xs text-muted-foreground uppercase tracking-wider border-b border-border pb-1">
                  Project Summary
                </h4>
                <p className="text-sm text-muted-foreground bg-muted p-4 rounded-lg border border-border leading-relaxed">
                  {selectedProject.outcome}
                </p>
              </div>

              {/* Differentiator / Field Notes */}
              {selectedProject.build.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-mono text-xs text-muted-foreground uppercase tracking-wider border-b border-border pb-1">
                    Project Highlights
                  </h4>
                  <ul className="space-y-1.5 text-xs text-muted-foreground list-disc list-inside">
                    {selectedProject.build.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Live demo CTA */}
              {selectedProject.demo && (
                <div className="pt-4 border-t border-border">
                  <Button
                    asChild
                    className="w-full rounded-full bg-[#ff5e1e] py-3 text-xs font-medium text-white hover:bg-[#ff7a3d]"
                  >
                    <a href={selectedProject.demo.href} target="_blank" rel="noreferrer">
                      Launch {selectedProject.demo.label} <ExternalLink size={14} className="ml-2" />
                    </a>
                  </Button>
                </div>
              )}
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* 14. Command Palette Dialog (⌘K) */}
      <CommandDialog open={cmdOpen} onOpenChange={setCmdOpen}>
        <CommandInput placeholder="Search projects, skills, or quick actions..." />
        <CommandList data-lenis-prevent className="bg-popover text-popover-foreground">
          <CommandEmpty>No matching results found.</CommandEmpty>

          <CommandGroup heading="Projects & Systems">
            {projects.map((p) => (
              <CommandItem
                key={p.slug}
                onSelect={() => {
                  setSelectedProject(p);
                  setCmdOpen(false);
                }}
                className="flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Code2 size={14} className="text-[#ff7a3d]" />
                  <span>{p.name}</span>
                </div>
                <span className="font-mono text-[10px] text-muted-foreground">{p.status}</span>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Quick Actions">
            <CommandItem
              onSelect={() => {
                copyEmail();
                setCmdOpen(false);
              }}
              className="cursor-pointer"
            >
              <Copy size={14} className="mr-2 text-[#ff7a3d]" />
              <span>Copy Email (ankitmourya7874@gmail.com)</span>
            </CommandItem>
            <CommandItem
              onSelect={() => {
                toggleMotion();
                setCmdOpen(false);
              }}
              className="cursor-pointer"
            >
              <Play size={14} className="mr-2 text-[#ff7a3d]" />
              <span>Toggle Animations (On / Off)</span>
            </CommandItem>
            <CommandItem
              onSelect={() => {
                window.location.href = "#contact";
                setCmdOpen(false);
              }}
              className="cursor-pointer"
            >
              <Mail size={14} className="mr-2 text-[#ff7a3d]" />
              <span>Jump to Contact Form</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>

      {/* Floating Corner Tech Stack Folder (React Bits Folder Float - Desktop) */}
      <FolderFloat className="hidden sm:block" />
    </div>
  );
}
