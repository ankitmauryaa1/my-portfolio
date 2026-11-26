'use client';

import React, { useState, useMemo, useCallback, useRef } from 'react';
import FlexCarousel, {
  type BendPreset,
  type FlexCarouselItem,
  type FlexCarouselHandle
} from './FlexCarousel';
import {
  Play,
  Pause,
  Compass,
  LayoutGrid,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Cpu,
  BarChart3,
  Server,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Activity,
  Layers,
  Terminal
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface MethodologyStep {
  number: string;
  title: string;
  subtitle: string;
  subtitleLines: string[];
  tag: string;
  icon: typeof ShieldCheck;
  diagramType: 'audit' | 'baseline' | 'validate' | 'deploy';
  specs: { label: string; val: string }[];
  deliverables: { title: string; desc: string }[];
  appliedIn: { name: string; impact: string; context: string; link?: string };
  philosophy: string;
}

export const METHODOLOGY_STEPS: MethodologyStep[] = [
  {
    number: "01",
    title: "Frame the question",
    subtitle: "Identify the business question, inspect the data, and define the measures that matter.",
    subtitleLines: ["Identify the business question, inspect the data,", "and define the measures that matter."],
    tag: "BUSINESS QUESTION & DATA REVIEW",
    icon: ShieldCheck,
    diagramType: "audit",
    specs: [
      { label: "QUESTION", val: "Business objective" },
      { label: "DATA QUALITY", val: "Missing values" },
      { label: "KEY METRICS", val: "Clear definitions" },
    ],
    deliverables: [
      { title: "Define the objective", desc: "Translate a business question into specific questions the data can answer." },
      { title: "Check the data", desc: "Review missing values, duplicates, and the fields used to join tables." },
      { title: "Choose the KPIs", desc: "Define each measure and the period or segment it describes." },
    ],
    appliedIn: {
      name: "Ola vs Uber vs Rapido",
      impact: "Market share and ride trends",
      context: "Compare platform performance and look for city-level opportunities.",
    },
    philosophy: "A clear business question helps determine which data to collect and what a useful result looks like.",
  },
  {
    number: "02",
    title: "Build a baseline",
    subtitle: "Start with a simple model or analytical comparison before testing more complex approaches.",
    subtitleLines: ["Start with a simple model or analytical comparison", "before testing more complex approaches."],
    tag: "BASELINE & MODEL COMPARISON",
    icon: Cpu,
    diagramType: "baseline",
    specs: [
      { label: "TARGET", val: "Outcome to predict" },
      { label: "BASELINE", val: "Simple comparison" },
      { label: "COMPARISON", val: "Consistent evaluation" },
    ],
    deliverables: [
      { title: "Start with a simple model", desc: "Set a baseline that makes later comparisons meaningful." },
      { title: "Compare model families", desc: "Explore approaches such as linear regression, decision trees, or random forests." },
      { title: "Review the trade-offs", desc: "Consider interpretability and the type of errors each model makes." },
    ],
    appliedIn: {
      name: "Loan Approval Prediction",
      impact: "Random Forest and Decision Tree",
      context: "Explore classification models for loan approval prediction.",
    },
    philosophy: "A baseline gives each model comparison a reference point.",
  },
  {
    number: "03",
    title: "Validate & measure",
    subtitle: "Check the results on held-out data and explore where the models make errors.",
    subtitleLines: ["Check the results on held-out data and explore", "where the models make errors."],
    tag: "MODEL EVALUATION",
    icon: BarChart3,
    diagramType: "validate",
    specs: [
      { label: "SPLIT", val: "Training and test data" },
      { label: "ERROR ANALYSIS", val: "Review residuals" },
      { label: "METRICS", val: "Match the task" },
    ],
    deliverables: [
      { title: "Hold out evaluation data", desc: "Check how well a model performs on data kept separate from training." },
      { title: "Inspect errors", desc: "Look for patterns in the errors that aggregate scores can hide." },
      { title: "Compare results", desc: "Use evaluation metrics suited to the prediction task." },
    ],
    appliedIn: {
      name: "Medical Insurance Cost Prediction",
      impact: "Linear Regression, Ridge, and Lasso",
      context: "Compare regression approaches for estimating insurance costs.",
    },
    philosophy: "Inspecting individual errors helps explain when predictions are more or less reliable.",
  },
  {
    number: "04",
    title: "Present the results",
    subtitle: "Turn the analysis into clear charts, dashboards, or an interactive data application.",
    subtitleLines: ["Turn the analysis into clear charts, dashboards,", "or an interactive data application."],
    tag: "DATA STORYTELLING & DELIVERY",
    icon: Server,
    diagramType: "deploy",
    specs: [
      { label: "AUDIENCE", val: "Business users" },
      { label: "INTERFACE", val: "Interactive dashboard" },
      { label: "PURPOSE", val: "Communicate findings" },
    ],
    deliverables: [
      { title: "Choose clear visuals", desc: "Use charts and tables that fit the question and the data." },
      { title: "Build the interface", desc: "Use dashboard pages and interactive views to organize the analysis." },
      { title: "Explain the findings", desc: "Summarize what the data shows and the questions it leaves open." },
    ],
    appliedIn: {
      name: "Rockstar Games Business Analytics Dashboard",
      impact: "Four interactive Power BI pages",
      context: "Present business performance, player trends, financials, and GTA VI predictions.",
    },
    philosophy: "A dashboard should help the reader find the relevant measure and understand the context behind it.",
  },
];

function xmlEscape(str: string): string {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function generateCardSvg(step: MethodologyStep): string {
  const width = 720;
  const height = 900;

  let diagramSvg = '';

  if (step.diagramType === 'audit') {
    diagramSvg = `
      <g transform="translate(60, 370)">
        <rect x="0" y="0" width="600" height="280" rx="16" fill="#111116" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
        <line x1="0" y1="50" x2="600" y2="50" stroke="rgba(255,255,255,0.05)" stroke-dasharray="4 4"/>
        <text x="24" y="32" fill="#8c8c94" font-family="monospace" font-size="12" letter-spacing="1">SIGNAL INGESTION &amp; AUDIT PIPELINE</text>
        <circle cx="560" cy="28" r="4" fill="#ff5e1e"/>
        <text x="545" y="32" fill="#ff5e1e" font-family="monospace" font-size="10" text-anchor="end">DATA REVIEW</text>

        <g transform="translate(30, 85)">
          <rect x="0" y="20" width="140" height="90" rx="10" fill="#16161c" stroke="rgba(255,94,30,0.3)" stroke-width="1.5"/>
          <text x="14" y="45" fill="#ff7a3d" font-family="monospace" font-size="11">01 / RAW SIGNALS</text>
          <text x="14" y="68" fill="#e4e4df" font-family="sans-serif" font-size="13" font-weight="600">Source data</text>
          <text x="14" y="88" fill="#8c8c94" font-family="monospace" font-size="10">Review records</text>

          <line x1="140" y1="65" x2="190" y2="65" stroke="#ff5e1e" stroke-width="2" stroke-dasharray="4 2"/>
          <polygon points="190,61 200,65 190,69" fill="#ff5e1e"/>

          <rect x="200" y="10" width="150" height="110" rx="10" fill="#1c1815" stroke="#ff5e1e" stroke-width="2"/>
          <rect x="210" y="22" width="60" height="18" rx="4" fill="rgba(255,94,30,0.2)"/>
          <text x="216" y="35" fill="#ff5e1e" font-family="monospace" font-size="10" font-weight="bold">GUARD</text>
          <text x="210" y="58" fill="#ffffff" font-family="sans-serif" font-size="13" font-weight="bold">Data quality</text>
          <text x="210" y="78" fill="#a1a1aa" font-family="monospace" font-size="11">Missing values</text>
          <text x="210" y="98" fill="#34d399" font-family="monospace" font-size="10">Check joins</text>

          <line x1="350" y1="65" x2="400" y2="65" stroke="#ff5e1e" stroke-width="2"/>
          <polygon points="400,61 410,65 400,69" fill="#ff5e1e"/>

          <rect x="410" y="20" width="130" height="90" rx="10" fill="#16161c" stroke="rgba(255,255,255,0.1)" stroke-width="1.5"/>
          <text x="424" y="45" fill="#8c8c94" font-family="monospace" font-size="11">TARGET SPEC</text>
          <text x="424" y="68" fill="#e4e4df" font-family="sans-serif" font-size="13" font-weight="600">Define KPIs</text>
          <text x="424" y="88" fill="#34d399" font-family="monospace" font-size="10">Document measures</text>
        </g>

        <g transform="translate(30, 235)">
          <text x="0" y="16" fill="#8c8c94" font-family="monospace" font-size="11">HARNESS: <tspan fill="#e4e4df">Review inputs</tspan></text>
          <text x="320" y="16" fill="#8c8c94" font-family="monospace" font-size="11">INTEGRITY: <tspan fill="#34d399">Check data quality</tspan></text>
        </g>
      </g>
    `;
  } else if (step.diagramType === 'baseline') {
    diagramSvg = `
      <g transform="translate(60, 370)">
        <rect x="0" y="0" width="600" height="280" rx="16" fill="#111116" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
        <line x1="0" y1="50" x2="600" y2="50" stroke="rgba(255,255,255,0.05)" stroke-dasharray="4 4"/>
        <text x="24" y="32" fill="#8c8c94" font-family="monospace" font-size="12" letter-spacing="1">ILLUSTRATIVE MODEL COMPARISON</text>
        <circle cx="560" cy="28" r="4" fill="#38bdf8"/>
        <text x="545" y="32" fill="#38bdf8" font-family="monospace" font-size="10" text-anchor="end">BENCHMARK</text>

        <g transform="translate(40, 80)">
          <text x="0" y="20" fill="#8c8c94" font-family="monospace" font-size="12">Simple prior</text>
          <rect x="140" y="8" width="80" height="16" rx="4" fill="#27272a"/>
          <text x="235" y="21" fill="#8c8c94" font-family="monospace" font-size="11">Reference</text>

          <text x="0" y="60" fill="#e4e4df" font-family="monospace" font-size="12" font-weight="bold">Simple Rules</text>
          <rect x="140" y="48" width="230" height="16" rx="4" fill="rgba(255,94,30,0.3)"/>
          <rect x="140" y="48" width="210" height="16" rx="4" fill="#ff5e1e"/>
          <text x="360" y="61" fill="#ff7a3d" font-family="monospace" font-size="11" font-weight="bold">Baseline</text>

          <text x="0" y="100" fill="#8c8c94" font-family="monospace" font-size="12">Linear model</text>
          <rect x="140" y="88" width="270" height="16" rx="4" fill="#3b82f6"/>
          <text x="420" y="101" fill="#93c5fd" font-family="monospace" font-size="11">Example model</text>

          <text x="0" y="140" fill="#8c8c94" font-family="monospace" font-size="12">Tree-based model</text>
          <rect x="140" y="128" width="285" height="16" rx="4" fill="#6366f1" opacity="0.6"/>
          <text x="435" y="141" fill="#c7d2fe" font-family="monospace" font-size="11">Example model</text>
        </g>

        <g transform="translate(40, 245)">
          <text x="0" y="0" fill="#34d399" font-family="monospace" font-size="11">DECISION: Compare models using the same evaluation criteria.</text>
        </g>
      </g>
    `;
  } else if (step.diagramType === 'validate') {
    diagramSvg = `
      <g transform="translate(60, 370)">
        <rect x="0" y="0" width="600" height="280" rx="16" fill="#111116" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
        <line x1="0" y1="50" x2="600" y2="50" stroke="rgba(255,255,255,0.05)" stroke-dasharray="4 4"/>
        <text x="24" y="32" fill="#8c8c94" font-family="monospace" font-size="12" letter-spacing="1">STRATIFIED 5-FOLD CV &amp; ATTRIBUTION</text>
        <circle cx="560" cy="28" r="4" fill="#a855f7"/>
        <text x="545" y="32" fill="#a855f7" font-family="monospace" font-size="10" text-anchor="end">EXAMPLE</text>

        <g transform="translate(40, 80)">
          ${[0, 1, 2, 3, 4]
            .map((i) => {
              const y = i * 26;
              return `
              <g transform="translate(0, ${y})">
                <text x="0" y="14" fill="#8c8c94" font-family="monospace" font-size="11">Fold 0${i + 1}</text>
                ${[0, 1, 2, 3, 4]
                  .map((j) => {
                    const x = 70 + j * 75;
                    const isVal = j === i;
                    return `<rect x="${x}" y="2" width="68" height="16" rx="4" fill="${isVal ? '#ff5e1e' : '#1e1e24'}" stroke="${isVal ? '#ff7a3d' : 'rgba(255,255,255,0.04)'}"/>
                  <text x="${x + 34}" y="14" fill="${isVal ? '#ffffff' : '#6b7280'}" font-family="monospace" font-size="9" text-anchor="middle">${isVal ? 'VAL' : 'TRAIN'}</text>`;
                  })
                  .join('')}
                <rect x="460" y="2" width="70" height="16" rx="4" fill="#09090b" stroke="#34d399" stroke-dasharray="2 2"/>
                <text x="495" y="14" fill="#34d399" font-family="monospace" font-size="9" text-anchor="middle">HOLD-OUT</text>
              </g>
            `;
            })
            .join('')}
        </g>

        <g transform="translate(40, 245)">
          <text x="0" y="0" fill="#8c8c94" font-family="monospace" font-size="11">MEAN AUC: <tspan fill="#ffffff" font-weight="bold">Compare scores</tspan></text>
          <text x="280" y="0" fill="#8c8c94" font-family="monospace" font-size="11">ERROR SLICES: <tspan fill="#ff7a3d">Segmented by Cohort</tspan></text>
        </g>
      </g>
    `;
  } else if (step.diagramType === 'deploy') {
    diagramSvg = `
      <g transform="translate(60, 370)">
        <rect x="0" y="0" width="600" height="280" rx="16" fill="#111116" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
        <line x1="0" y1="50" x2="600" y2="50" stroke="rgba(255,255,255,0.05)" stroke-dasharray="4 4"/>
        <text x="24" y="32" fill="#8c8c94" font-family="monospace" font-size="12" letter-spacing="1">DASHBOARD &amp; PRESENTATION FLOW</text>
        <circle cx="560" cy="28" r="4" fill="#10b981"/>
        <text x="545" y="32" fill="#10b981" font-family="monospace" font-size="10" text-anchor="end">ILLUSTRATION</text>

        <g transform="translate(30, 85)">
          <rect x="0" y="10" width="160" height="100" rx="10" fill="#16161c" stroke="#10b981" stroke-width="1.5"/>
          <text x="14" y="35" fill="#34d399" font-family="monospace" font-size="10" font-weight="bold">DATA MODEL</text>
          <text x="14" y="60" fill="#ffffff" font-family="sans-serif" font-size="14" font-weight="bold">Prepared data</text>
          <text x="14" y="80" fill="#8c8c94" font-family="monospace" font-size="10">Business measures</text>
          <text x="14" y="98" fill="#a1a1aa" font-family="monospace" font-size="10">Defined KPIs</text>

          <line x1="160" y1="60" x2="210" y2="60" stroke="#10b981" stroke-width="2"/>
          <polygon points="210,56 220,60 210,64" fill="#10b981"/>

          <rect x="220" y="10" width="160" height="100" rx="10" fill="#121516" stroke="rgba(255,255,255,0.08)"/>
          <text x="234" y="35" fill="#8c8c94" font-family="monospace" font-size="10">INTERACTIVE CHARTS</text>
          <path d="M 234 75 Q 250 50, 260 70 T 290 65 T 320 80 T 350 55 T 370 70" fill="none" stroke="#ff5e1e" stroke-width="2"/>
          <text x="234" y="98" fill="#ff7a3d" font-family="monospace" font-size="10">Illustrative trend</text>

          <line x1="380" y1="60" x2="430" y2="60" stroke="#10b981" stroke-width="2"/>
          <polygon points="430,56 440,60 430,64" fill="#10b981"/>

          <rect x="440" y="10" width="130" height="100" rx="10" fill="#18151c" stroke="#a855f7" stroke-width="1.5"/>
          <text x="454" y="35" fill="#c084fc" font-family="monospace" font-size="10">FINDINGS</text>
          <text x="454" y="60" fill="#ffffff" font-family="sans-serif" font-size="13" font-weight="bold">Business insights</text>
          <text x="454" y="80" fill="#34d399" font-family="monospace" font-size="10">Share results</text>
          <text x="454" y="98" fill="#8c8c94" font-family="monospace" font-size="10">Explain context</text>
        </g>

        <g transform="translate(30, 245)">
          <text x="0" y="0" fill="#8c8c94" font-family="monospace" font-size="11">PRESENTATION: <tspan fill="#34d399">Highlight the findings and limitations</tspan></text>
        </g>
      </g>
    `;
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
    <defs>
      <linearGradient id="bgGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#0e0e12"/>
        <stop offset="100%" stop-color="#070709"/>
      </linearGradient>
      <linearGradient id="borderGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="rgba(255,94,30,0.5)"/>
        <stop offset="30%" stop-color="rgba(255,255,255,0.12)"/>
        <stop offset="100%" stop-color="rgba(255,255,255,0.03)"/>
      </linearGradient>
      <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
        <path d="M 24 0 L 0 0 0 24" fill="none" stroke="rgba(255,255,255,0.02)" stroke-width="1"/>
      </pattern>
      <radialGradient id="glow" cx="20%" cy="10%" r="50%">
        <stop offset="0%" stop-color="rgba(255,94,30,0.12)"/>
        <stop offset="100%" stop-color="rgba(0,0,0,0)"/>
      </radialGradient>
    </defs>

    <rect x="2" y="2" width="${width - 4}" height="${height - 4}" rx="28" fill="url(#bgGrad)" stroke="url(#borderGrad)" stroke-width="2"/>
    <rect x="2" y="2" width="${width - 4}" height="${height - 4}" rx="28" fill="url(#glow)"/>
    <rect x="2" y="2" width="${width - 4}" height="${height - 4}" rx="28" fill="url(#grid)"/>

    <g transform="translate(60, 60)">
      <rect x="0" y="0" width="105" height="26" rx="6" fill="rgba(255,94,30,0.12)" stroke="rgba(255,94,30,0.3)" stroke-width="1"/>
      <text x="10" y="17" fill="#ff7a3d" font-family="monospace" font-size="11" font-weight="bold">${xmlEscape(step.number)} // PHASE</text>
      <text x="125" y="17" fill="#8c8c94" font-family="monospace" font-size="11" letter-spacing="0.5">${xmlEscape(step.tag)}</text>
      <circle cx="590" cy="13" r="3" fill="#ff5e1e"/>
      <text x="580" y="17" fill="#8c8c94" font-family="monospace" font-size="10" text-anchor="end">SYSTEM STANDARD</text>
    </g>

    <text x="60" y="165" fill="#ff5e1e" font-family="monospace" font-size="44" font-weight="bold" letter-spacing="-1">${xmlEscape(step.number)}</text>
    <line x1="125" y1="150" x2="160" y2="150" stroke="rgba(255,255,255,0.15)" stroke-width="2"/>

    <text x="60" y="225" fill="#f4f4f1" font-family="system-ui, -apple-system, sans-serif" font-size="34" font-weight="700" letter-spacing="-0.5">${xmlEscape(step.title)}</text>

    <text x="60" y="268" fill="#a1a1aa" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="400">
      ${step.subtitleLines.map((line, i) => `<tspan x="60" dy="${i === 0 ? 0 : 26}">${xmlEscape(line)}</tspan>`).join('')}
    </text>

    ${diagramSvg}

    <g transform="translate(60, 690)">
      <rect x="0" y="0" width="600" height="90" rx="14" fill="#0d0d12" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>
      ${step.specs
        .map(
          (m, idx) => `
        <g transform="translate(${20 + idx * 190}, 24)">
          <text x="0" y="12" fill="#8c8c94" font-family="monospace" font-size="10">${xmlEscape(m.label)}</text>
          <text x="0" y="38" fill="#f4f4f1" font-family="monospace" font-size="13" font-weight="bold">${xmlEscape(m.val)}</text>
        </g>
      `
        )
        .join('')}
    </g>

    <g transform="translate(60, 830)">
      <text x="0" y="0" fill="#52525b" font-family="monospace" font-size="10" letter-spacing="1">DATA ANALYTICS // FROM QUESTION TO FINDINGS</text>
      <text x="600" y="0" fill="#ff7a3d" font-family="monospace" font-size="10" text-anchor="end">CLICK OR DRAG TO EXPLORE</text>
    </g>
  </svg>`;

  const base64 = typeof window !== 'undefined'
    ? window.btoa(unescape(encodeURIComponent(svg)))
    : Buffer.from(svg).toString('base64');
  return `data:image/svg+xml;base64,${base64}`;
}

export function MethodologyFlexCarousel() {
  const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('carousel');
  const [preset, setPreset] = useState<BendPreset>('liquid');
  const [autoplay, setAutoplay] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const carouselRef = useRef<FlexCarouselHandle>(null);

  // Generate SVG card items
  const items: FlexCarouselItem[] = useMemo(() => {
    return METHODOLOGY_STEPS.map((s) => ({
      src: generateCardSvg(s),
      alt: `${s.number} ${s.title}`,
      title: `${s.number} ${s.title}`,
      subtitle: s.subtitle,
      number: s.number,
      step: s
    }));
  }, []);

  const currentStep = METHODOLOGY_STEPS[activeIndex % METHODOLOGY_STEPS.length] || METHODOLOGY_STEPS[0];

  const handleSelect = useCallback((idx: number) => {
    setActiveIndex(idx % METHODOLOGY_STEPS.length);
  }, []);

  const handleChange = useCallback((idx: number) => {
    setActiveIndex(idx % METHODOLOGY_STEPS.length);
  }, []);

  const handleTabClick = (idx: number) => {
    setActiveIndex(idx);
    carouselRef.current?.goTo(idx);
  };

  const handlePrev = () => {
    const nextIdx = (activeIndex - 1 + METHODOLOGY_STEPS.length) % METHODOLOGY_STEPS.length;
    setActiveIndex(nextIdx);
    carouselRef.current?.prev();
  };

  const handleNext = () => {
    const nextIdx = (activeIndex + 1) % METHODOLOGY_STEPS.length;
    setActiveIndex(nextIdx);
    carouselRef.current?.next();
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* 1. Mobile-Optimized Executive Methodology Card (< md) */}
      <div className="md:hidden flex flex-col gap-3.5">
        {/* Phase Pill Selector Bar */}
        <div className="grid grid-cols-4 gap-1.5 p-1 rounded-xl bg-card/80 border border-border">
          {METHODOLOGY_STEPS.map((step, idx) => {
            const isActive = idx === activeIndex % METHODOLOGY_STEPS.length;
            return (
              <button
                key={step.number}
                type="button"
                onClick={() => handleTabClick(idx)}
                className={`py-2 px-1 rounded-lg text-center font-mono transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#ff5e1e] text-white shadow-md font-semibold'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <span className="block text-[10px] opacity-80">{step.number}</span>
                <span className="block text-[11px] truncate">{step.title.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Active Phase Focused Card */}
        <div className="p-4 rounded-2xl border border-border bg-card/70 backdrop-blur-md space-y-3.5 shadow-lg">
          <div className="flex items-center justify-between pb-2.5 border-b border-border/60">
            <span className="font-mono text-[10px] font-semibold text-[#ff7a3d] tracking-wider uppercase">
              PHASE {currentStep.number} // {currentStep.tag}
            </span>
            <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 flex items-center gap-1 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              METHODOLOGY
            </span>
          </div>

          <div>
            <h3 className="text-xl font-editorial font-normal text-foreground leading-snug">
              {currentStep.title}
            </h3>
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
              {currentStep.subtitle}
            </p>
          </div>

          {/* Key specs pills */}
          <div className="grid grid-cols-2 gap-2 font-mono text-[11px]">
            {currentStep.specs.slice(0, 2).map((sp) => (
              <div key={sp.label} className="p-2 rounded-lg bg-muted/60 border border-border/60">
                <span className="block text-[9px] text-muted-foreground uppercase">{sp.label}</span>
                <span className="block text-[#ff7a3d] font-semibold truncate">{sp.val}</span>
              </div>
            ))}
          </div>

          {/* Top deliverable highlight */}
          {currentStep.deliverables[0] && (
            <div className="p-3 rounded-xl bg-muted/40 border border-border/60 text-xs">
              <div className="flex items-center gap-1.5 font-medium text-foreground text-xs mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff5e1e]" />
                <span>{currentStep.deliverables[0].title}</span>
              </div>
              <p className="text-muted-foreground text-[11px] leading-relaxed pl-3">
                {currentStep.deliverables[0].desc}
              </p>
            </div>
          )}

          {/* Real-World Case Evidence */}
          <div className="p-3 rounded-xl bg-[#ff5e1e]/5 border border-[#ff5e1e]/25 text-xs">
            <div className="font-mono text-[9px] text-[#ff7a3d] font-bold uppercase mb-0.5 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff5e1e]" />
              Applied in {currentStep.appliedIn.name}
            </div>
            <p className="text-emerald-400 font-mono text-[11px] font-medium">
              ↳ {currentStep.appliedIn.impact}
            </p>
          </div>

          {/* Step navigation buttons */}
          <div className="flex items-center justify-between pt-2 border-t border-border/60 font-mono text-xs">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrev}
              className="h-7 px-2.5 text-xs gap-1 border-border text-muted-foreground hover:text-foreground cursor-pointer"
            >
              <ChevronLeft size={13} />
              <span>Prev</span>
            </Button>
            <span className="text-[11px] text-muted-foreground">
              {currentStep.number} of 04
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleNext}
              className="h-7 px-2.5 text-xs gap-1 border-border text-muted-foreground hover:text-foreground cursor-pointer"
            >
              <span>Next</span>
              <ChevronRight size={13} />
            </Button>
          </div>
        </div>
      </div>

      {/* 2. Desktop WebGL Flex Carousel & Detailed Console (hidden md:flex) */}
      <div className="hidden md:flex flex-col gap-6">
        {/* Top Bar: Controls & Presets */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-3 rounded-xl bg-card/60 border border-border backdrop-blur-md">
          {/* Left: View Mode Toggle */}
          <div className="flex items-center gap-1 p-1 bg-muted/60 rounded-lg border border-border/50 text-xs font-mono">
            <button
              type="button"
              onClick={() => setViewMode('carousel')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
                viewMode === 'carousel'
                  ? 'bg-solar text-white font-semibold shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Sparkles size={13} />
              <span>Flex Carousel (Liquid Glass)</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
                viewMode === 'grid'
                  ? 'bg-solar text-white font-semibold shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <LayoutGrid size={13} />
              <span>Full Grid</span>
            </button>
          </div>

          {/* Right: Carousel specific controls */}
          {viewMode === 'carousel' && (
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
              {/* Optical Lens Preset Selector */}
              <div className="hidden sm:flex items-center gap-1.5">
                <span className="text-muted-foreground flex items-center gap-1">
                  <Compass size={12} className="text-solar" /> Lens:
                </span>
                {(['liquid', 'ribbon', 'vortex', 'arch'] as BendPreset[]).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPreset(p)}
                    className={`px-2.5 py-1 rounded-md text-[11px] capitalize transition-colors ${
                      preset === p
                        ? 'bg-accent text-solar font-medium border border-solar/30'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>

              {/* Autoplay Play/Pause Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setAutoplay(!autoplay)}
                className="h-7 px-2.5 text-xs gap-1.5 border-border hover:border-solar/40"
              >
                {autoplay ? (
                  <>
                    <Pause size={11} className="text-solar" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Play size={11} className="text-solar fill-solar" />
                    <span>Autoplay</span>
                  </>
                )}
              </Button>
            </div>
          )}
        </div>

        {/* Main Display Area */}
        {viewMode === 'carousel' ? (
          <div className="relative w-full rounded-2xl overflow-hidden border border-border bg-[#070709] shadow-2xl">
            {/* Subtle Ambient Glow */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(255,94,30,0.06)_0%,transparent_70%)]" />

            {/* Liquid Glass Edge Indicator Hint */}
            <div className="absolute top-3 left-4 z-10 flex items-center gap-2 pointer-events-none">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-[11px] text-muted-foreground tracking-wide">
                OGL WebGL2 · Liquid Glass Refraction · Infinite Flow
              </span>
            </div>

            <div className="absolute top-3 right-4 z-10 hidden sm:flex items-center gap-2 pointer-events-none">
              <span className="font-mono text-[11px] text-muted-foreground">
                Click slide or tabs below to center ↳
              </span>
            </div>

            {/* WebGL React Bits Flex Carousel */}
            <div className="w-full h-[380px] sm:h-[480px] md:h-[580px] py-2">
              <FlexCarousel
                ref={carouselRef}
                items={items}
                preset={preset}
                intro="rise"
                cardHeight={0.78}
                gap={18}
                radius={24}
                fit="portrait"
                squeeze={0.16}
                focusOnClick={false}
                autoplay={autoplay}
                interval={4.5}
                captions={false}
                captureWheel={false}
                onSelect={handleSelect}
                onChange={handleChange}
                className="w-full h-full"
              />
            </div>
          </div>
        ) : (
          /* Static 4-Card Grid Overview */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {METHODOLOGY_STEPS.map((step, idx) => {
              const Icon = step.icon;
              const isCurrent = idx === activeIndex % METHODOLOGY_STEPS.length;
              return (
                <div
                  key={step.number}
                  onClick={() => setActiveIndex(idx)}
                  className={`group cursor-pointer rounded-2xl border p-5 transition-all duration-300 flex flex-col justify-between ${
                    isCurrent
                      ? 'bg-card border-solar shadow-[0_0_24px_rgba(255,94,30,0.15)] ring-1 ring-solar/40'
                      : 'bg-card/70 border-border hover:border-solar/40 hover:bg-card'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-sm font-bold text-solar tracking-wider">
                        {step.number}
                      </span>
                      <span className="p-2 rounded-lg bg-accent text-solar group-hover:scale-110 transition-transform">
                        <Icon size={16} />
                      </span>
                    </div>

                    <h3 className="text-base font-semibold text-foreground mb-2 group-hover:text-solar transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                      {step.subtitle}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-border/50">
                    <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider mb-1">
                      Key Spec
                    </div>
                    <div className="font-mono text-xs font-medium text-foreground">
                      {step.specs[0]?.val}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Synchronized Methodology Engineering Console (Desktop) */}
        <div className="rounded-2xl border border-border bg-card shadow-xl overflow-hidden backdrop-blur-md">
          {/* Interactive Phase Navigation Tab Bar */}
          <div className="border-b border-border bg-muted/20 p-2.5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {METHODOLOGY_STEPS.map((step, idx) => {
                const isActive = idx === activeIndex % METHODOLOGY_STEPS.length;
                return (
                  <button
                    key={step.number}
                    type="button"
                    onClick={() => handleTabClick(idx)}
                    className={`group relative flex items-center justify-between p-3 rounded-xl text-left transition-all duration-200 border ${
                      isActive
                        ? 'bg-card border-solar/50 shadow-[0_2px_12px_rgba(255,94,30,0.12)]'
                        : 'bg-card/40 border-border/60 hover:border-solar/30 hover:bg-card/80'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span
                        className={`font-mono text-xs font-bold px-1.5 py-0.5 rounded transition-colors ${
                          isActive
                            ? 'bg-solar text-white'
                            : 'bg-muted text-muted-foreground group-hover:text-foreground'
                        }`}
                      >
                        {step.number}
                      </span>
                      <span
                        className={`text-xs font-medium truncate transition-colors ${
                          isActive
                            ? 'text-foreground font-semibold'
                            : 'text-muted-foreground group-hover:text-foreground'
                        }`}
                      >
                        {step.title}
                      </span>
                    </div>

                    <span
                      className={`w-1.5 h-1.5 rounded-full shrink-0 transition-all ${
                        isActive ? 'bg-solar ring-2 ring-solar/40 scale-125' : 'bg-transparent'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Phase Details Content Area */}
          <div className="p-4 sm:p-6 md:p-8">
            {/* Header row */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-6 border-b border-border">
              <div className="flex items-start gap-4">
                <span className="flex items-center justify-center w-14 h-14 rounded-2xl bg-solar/10 border border-solar/30 font-mono text-2xl font-bold text-solar shrink-0">
                  {currentStep.number}
                </span>
                <div>
                  <div className="font-mono text-xs text-solar tracking-wider uppercase mb-1 flex items-center gap-2">
                    <span>PHASE {currentStep.number}</span>
                    <span>//</span>
                    <span>{currentStep.tag}</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
                    {currentStep.title}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground mt-1">
                    {currentStep.subtitle}
                  </p>
                </div>
              </div>

              {/* System Status Pill & Stepper Controls */}
              <div className="flex items-center md:items-end justify-between md:justify-start md:flex-col gap-2 shrink-0 font-mono text-xs">
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-medium inline-flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  ANALYSIS WORKFLOW
                </span>

                <div className="flex items-center gap-1.5 mt-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePrev}
                    aria-label="Previous methodology step"
                    className="h-7 px-2.5 text-xs gap-1 border-border hover:border-solar/40 text-muted-foreground hover:text-foreground"
                  >
                    <ChevronLeft size={13} />
                    <span>Prev</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleNext}
                    aria-label="Next methodology step"
                    className="h-7 px-2.5 text-xs gap-1 border-border hover:border-solar/40 text-muted-foreground hover:text-foreground"
                  >
                    <span>Next</span>
                    <ChevronRight size={13} />
                  </Button>
                </div>
              </div>
            </div>

            {/* Grid: Execution Checkpoints & Real-World Evidence */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
              {/* Left 7 Columns: Core Philosophy & Execution Checkpoints */}
              <div className="lg:col-span-7 flex flex-col justify-between gap-6">
                {/* Philosophy block */}
                <div className="p-4 rounded-xl bg-muted/40 border border-border/80">
                  <div className="font-mono text-[11px] text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Terminal size={12} className="text-solar" />
                    Engineering Stance &amp; Rationale
                  </div>
                  <p className="text-sm text-foreground/90 leading-relaxed font-sans">
                    {currentStep.philosophy}
                  </p>
                </div>

                {/* Execution Checkpoints */}
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-solar" />
                    Key Activities
                  </h4>
                  <div className="space-y-3">
                    {currentStep.deliverables.map((item, i) => (
                      <div
                        key={i}
                        className="p-3.5 rounded-xl bg-card border border-border/60 hover:border-solar/30 transition-colors"
                      >
                        <div className="text-sm font-semibold text-foreground mb-1 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-solar shrink-0" />
                          <span>{item.title}</span>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed pl-3.5">
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right 5 Columns: Quantitative Specs & Case Study Callout */}
              <div className="lg:col-span-5 flex flex-col justify-between gap-6">
                {/* Quantitative Specs Box */}
                <div className="p-5 rounded-xl bg-muted/30 border border-border">
                  <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-4 flex items-center gap-1.5">
                    <Activity size={13} className="text-solar" />
                    Quantitative Guardrails
                  </div>
                  <div className="space-y-3">
                    {currentStep.specs.map((sp) => (
                      <div
                        key={sp.label}
                        className="p-3 rounded-lg bg-card/80 border border-border/60 flex items-center justify-between font-mono"
                      >
                        <span className="text-xs text-muted-foreground">{sp.label}</span>
                        <span className="text-xs font-bold text-solar">{sp.val}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Related project card */}
                <div className="p-5 rounded-xl bg-gradient-to-br from-solar/10 via-card to-card border border-solar/30 flex flex-col justify-between gap-3">
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-wider text-solar font-bold mb-1 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-solar" />
                      RELATED PROJECT
                    </div>
                    <h5 className="text-base font-bold text-foreground">
                      {currentStep.appliedIn.name}
                    </h5>
                    <div className="mt-2 text-xs font-mono font-medium text-emerald-400">
                      ↳ {currentStep.appliedIn.impact}
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed mt-2">
                      {currentStep.appliedIn.context}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-solar/20 flex items-center justify-between text-[11px] font-mono text-muted-foreground">
                    <span>PORTFOLIO PROJECT</span>
                    <a
                      href="#work"
                      className="text-solar hover:underline inline-flex items-center gap-1 font-semibold"
                    >
                      View Project <ArrowRight size={11} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
