import { useState, type FormEvent, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Bot, Braces, BriefcaseBusiness,
  Check, ChevronDown, CircleDot, Code2, Database, FileText, Github, Globe2,
  Layers3, Linkedin, Mail, MapPin, MessageCircle, MonitorUp, Network, Search,
  Send, Workflow,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PortfolioVisual, ProjectExternalIcon, SkillsVisual, VisualSearchIcon } from "@/components/portfolio-visual";
import { projects, writingPosts, type PortfolioProject, type ProjectCategory } from "@/lib/portfolio-data";

function Eyebrow({ number, children }: { number?: string; children: ReactNode }) {
  return <span className="eyebrow">{number && <span className="eyebrow-number">{number}</span>}{children}</span>;
}

function SectionTitle({ number, title, description }: { number: string; title: string; description?: string }) {
  return <div className="section-heading"><Eyebrow number={number}>FIELD NOTES</Eyebrow><div className="section-heading-copy"><h2>{title}</h2>{description && <p>{description}</p>}</div></div>;
}

function ProjectLinks({ project, compact = false }: { project: PortfolioProject; compact?: boolean }) {
  return (
    <div className={`project-links${compact ? " project-links-compact" : ""}`}>
      {project.demo ? <a href={project.demo.href} target="_blank" rel="noreferrer" className="project-link project-link-live"><span className="link-status-dot" /> Live demo <ProjectExternalIcon /></a> : <span className="project-link" title="Available on request"><span className="link-status-dot link-status-muted" /> Live demo <small>Available on request</small></span>}
      <span className="project-link project-link-muted" title="Available on request"><Github size={14} /> Code <small>Available on request</small></span>
      <Link to="/work/$slug" params={{ slug: project.slug }} className="project-link project-link-case">Case study <ArrowRight size={14} /></Link>
    </div>
  );
}

function ProjectCard({ project, index }: { project: PortfolioProject; index: number }) {
  return (
    <article className="project-card">
      <Link to="/work/$slug" params={{ slug: project.slug }} className="project-image-link" aria-label={`View ${project.name} case study`}>
        <PortfolioVisual project={project} compact />
        <span className="project-index">0{index + 1} / 06</span>
      </Link>
      <div className="project-card-body">
        <div className="project-card-kicker"><span>{project.category}</span><span className={`status status-${project.status.toLowerCase().replace(" ", "-")}`}><i />{project.status}</span></div>
        <h3><Link to="/work/$slug" params={{ slug: project.slug }}>{project.name}</Link></h3>
        <p>{project.summary}</p>
        <div className="tag-list">{project.stack.slice(0, 3).map((tag) => <span key={tag}>{tag}</span>)}</div>
        <ProjectLinks project={project} compact />
      </div>
    </article>
  );
}

function HeroIllustration() {
  return (
    <div className="hero-portrait" role="img" aria-label="Profile photo of Ankit Maurya">
      <div className="portrait-grid" />
      <span className="portrait-coordinate">28°36′N<br />77°13′E</span>
      <div className="relative z-10 w-44 h-44 rounded-2xl overflow-hidden border-2 border-[#ff5e1e]/40 shadow-2xl mx-auto my-4 bg-card/60 p-1">
        <img src="/ankit.jpeg" alt="Ankit Maurya" className="w-full h-full object-cover rounded-xl" />
      </div>
      <div className="portrait-caption">
        <span className="portrait-caption-mark"><CircleDot size={13} /></span>
        <span>ANKIT MAURYA<small>Data Science & AI/ML Engineer</small></span>
        <ArrowDown size={15} />
      </div>
      <span className="portrait-side-note">BUILD / MEASURE / ITERATE</span>
    </div>
  );
}

function HeroMiniCard() {
  return (
    <div className="hero-console">
      <div className="console-top"><span className="console-live"><i /> CURRENT FOCUS</span><span>AM / 001</span></div>
      <div className="console-body"><div className="console-symbol"><Bot size={24} /></div><div><span className="console-kicker">PRODUCTS IN PROGRESS</span><strong>Models meet<br />real-world signals.</strong></div></div>
      <div className="console-bottom"><span>COMAI · BLINK · ANOVATION</span><ArrowUpRight size={15} /></div>
    </div>
  );
}

function HomePage() {
  const selected = projects.slice(0, 6);
  const skillGroups = [
    { icon: <Braces size={18} />, name: "Programming & Data Wrangling", skills: ["Python", "SQL", "Structured data"], projects: [0, 3, 4, 5] },
    { icon: <Bot size={18} />, name: "Machine Learning & AI", skills: ["Conversational AI", "LLM agents", "NLP", "Predictive tooling"], projects: [0, 1, 2] },
    { icon: <Layers3 size={18} />, name: "Data Analytics & Visualisation", skills: ["Sales reconciliation", "Funnel analysis", "Attribution", "Classification"], projects: [3, 4, 5] },
    { icon: <Database size={18} />, name: "Databases & Pipelines", skills: ["Data audits", "Data sourcing", "Workflow design"], projects: [2, 3, 4] },
    { icon: <MonitorUp size={18} />, name: "Deployment & MLOps direction", skills: ["Live web products", "Automated operations", "Pre-launch product building"], projects: [0, 1, 2] },
    { icon: <Workflow size={18} />, name: "E-commerce & Growth Analytics", skills: ["COD / prepaid analysis", "GA4 / Meta attribution", "App-stack optimisation"], projects: [0, 3] },
  ];

  return (
    <>
      <section className="hero-section">
        <div className="shell-container hero-grid">
          <div className="hero-copy">
            <Eyebrow number="01">DATA SCIENCE · AI / ML ENGINEERING · FOUNDER</Eyebrow>
            <h1>Ankit<br /><span>Maurya</span><i>.</i></h1>
            <h2>Data scientist and AI/ML engineer turning messy data into deployed models and decisions.</h2>
            <p className="hero-proof">Student founder shipping data-driven products: conversational AI for WhatsApp commerce, hyperlocal discovery ranking, and e-commerce revenue analytics.</p>
            <div className="hero-cta"><Button asChild className="button-primary"><Link to="/work">View my work <ArrowRight size={16} /></Link></Button><a className="text-action" href="mailto:ankitmourya7874@gmail.com?subject=CV%20request"><FileText size={15} /> Download CV <span>PDF placeholder</span></a></div>
            <div className="hero-meta"><span><MapPin size={14} /> Delhi, India</span><span className="meta-separator" /><span>BCA · Guru Gobind Singh Indraprastha University</span></div>
            <div className="hero-socials"><a href="https://github.com/ankitmauryaa1" target="_blank" rel="noreferrer" aria-label="GitHub profile @ankitmauryaa1"><Github size={16} /><span>GitHub</span><small>@ankitmauryaa1</small></a><a href="https://www.linkedin.com/in/ankitmauryaa?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noreferrer" aria-label="LinkedIn profile @ankitmauryaa"><Linkedin size={16} /><span>LinkedIn</span><small>@ankitmauryaa</small></a><a href="https://x.com/ashutosh_sahni0" target="_blank" rel="noreferrer" aria-label="X profile @ashutosh_sahni0">𝕏 <span>X</span><small>@ashutosh_sahni0</small></a><a href="https://instagram.com/finess_833" target="_blank" rel="noreferrer" aria-label="Instagram profile @finess_833"><span className="ig-glyph">◎</span><span>Instagram</span><small>@finess_833</small></a></div>
          </div>
          <div className="hero-visual-column"><HeroIllustration /><HeroMiniCard /></div>
          <a className="hero-scroll" href="#proof"><span>SCROLL TO EXPLORE</span><span className="scroll-stem" /><ArrowDown size={13} /></a>
        </div>
      </section>

      <section id="proof" className="proof-strip"><div className="shell-container proof-grid"><div className="proof-item"><span className="proof-number">03</span><span><strong>Data & AI products built</strong><small>Across AI and analytics</small></span></div><div className="proof-item"><span className="proof-number">06</span><span><strong>Case studies</strong><small>Live demo or board preview</small></span></div><div className="proof-item"><span className="proof-number">02</span><span><strong>Live client-facing platforms</strong><small>anovation.in · comai.in</small></span></div><div className="proof-item"><span className="proof-number proof-map"><MapPin size={19} /></span><span><strong>Delhi · Remote worldwide</strong><small>Open to work</small></span></div></div></section>

      <section className="page-section work-section" id="work"><div className="shell-container"><SectionTitle number="02" title="Selected work" description="Products and client work, documented with the evidence available today." /><div className="projects-grid">{selected.map((project, index) => <ProjectCard project={project} index={index} key={project.slug} />)}</div><div className="section-tail"><span className="eyebrow">01 — 06 / PROJECT INDEX</span><Button asChild variant="outline" className="button-outline"><Link to="/work">Explore all projects <ArrowRight size={15} /></Link></Button></div></div></section>

      <section className="process-section"><div className="shell-container"><SectionTitle number="03" title="How I work" description="A practical loop from a business question to a system that can be checked." /><div className="process-grid">{[
        ["01", "Frame the question", "Audit the data"], ["02", "Build a baseline", "Model or pipeline"], ["03", "Validate & measure", "Against ground truth"], ["04", "Deploy & iterate", "Monitor what changes"],
      ].map(([number, title, subtitle]) => <div className="process-step" key={number}><span className="process-number">{number}</span><div className="process-mark"><i /><i /><i /></div><strong>{title}</strong><span>{subtitle}</span></div>)}</div><p className="process-note"><span>↳</span> Focused on practical, reproducible ML — clean data pipelines and measurable lift over black-box hype.</p></div></section>

      <section className="page-section skills-section"><div className="shell-container"><SectionTitle number="04" title="Skills, shown in context" description="No proficiency bars. Follow the evidence back to the project." /><div className="skills-grid">{skillGroups.map((group) => <article className="skill-group" key={group.name}><div className="skill-group-title"><span>{group.icon}</span><h3>{group.name}</h3><span className="skill-count">{String(group.skills.length).padStart(2, "0")}</span></div><div className="skill-tags">{group.skills.map((skill) => <span key={skill}>{skill}</span>)}</div><div className="skill-evidence"><SkillsVisual />{group.projects.map((projectIndex) => <Link key={projects[projectIndex]?.slug} to="/work/$slug" params={{ slug: projects[projectIndex]?.slug ?? "" }}>{projects[projectIndex]?.shortName} <ArrowUpRight size={11} /></Link>)}</div></article>)}</div></div></section>

      <section className="timeline-section"><div className="shell-container"><SectionTitle number="05" title="Building in public, learning by shipping" description="Milestones, without invented dates." /><div className="timeline-list">{[
        ["IN PROGRESS", "BCA · Guru Gobind Singh Indraprastha University", "Delhi · Expected graduation: [YEAR TO CONFIRM]", "education"],
        ["FOUNDED", "Anovation", "AI & data automation agency for startups and SMBs.", "agency"],
        ["PRODUCT", "COMAI / Merchant AI", "WhatsApp conversational AI; automated COD order verification. Entered in the Paytm Build for India hackathon as Merchant AI.", "comai"],
        ["CO-BUILT · ~6 MONTHS", "Blink", "Hyperlocal discovery, geospatial Live Radar, and an NLP-powered AI Wingman. Pre-launch.", "blink"],
        ["CLIENT WORK", "E-commerce analytics", "Sales reconciliation, COD tracking, funnel and attribution optimisation. Client name withheld.", "client"],
      ].map(([date, title, note, key], index) => <div className="timeline-entry" key={key}><div className="timeline-track"><span className="timeline-dot" />{index < 4 && <i />}</div><span className="timeline-date">{date}</span><div className="timeline-copy"><strong>{title}</strong><p>{note}</p></div>{index === 0 ? <span className="timeline-evidence">BCA</span> : <Link to="/work/$slug" params={{ slug: key === "comai" ? projects[0].slug : key === "blink" ? projects[1].slug : key === "agency" ? projects[2].slug : projects[3].slug }} className="timeline-evidence">CASE STUDY <ArrowUpRight size={12} /></Link>}</div>)}</div></div></section>

      <section className="page-section writing-section"><div className="shell-container"><SectionTitle number="06" title="Writing from the build log" description="Working notes on the problems behind the products." /><div className="writing-grid">{writingPosts.map((post, index) => <article className="writing-card" key={post.title}><div className="writing-card-top"><span className="writing-sequence">0{index + 1}</span><span>{post.topic}</span><ArrowUpRight size={15} /></div><h3>{post.title}</h3><p>{post.excerpt}</p><Link to="/work/$slug" params={{ slug: post.projectSlug }}>Project notes <ArrowRight size={14} /></Link></article>)}</div></div></section>

      <section className="testimonials-section"><div className="shell-container"><SectionTitle number="07" title="Words from collaborators" description="No testimonials published yet." /><div className="testimonial-grid">{[1, 2].map((n) => <blockquote key={n}><span className="quote-mark">“</span><p>Testimonial placeholder — replace with a real quote, name, and role. Do not invent quotes.</p><footer><span className="placeholder-avatar">[ ]</span><span><strong>[Name to confirm]</strong><small>[Role · Organisation]</small></span><span className="placeholder-label">PLACEHOLDER</span></footer></blockquote>)}</div></div></section>

      <section className="dual-cta-section"><div className="shell-container dual-cta-grid"><div className="dual-cta-cell"><Eyebrow number="08">FOR RECRUITERS</Eyebrow><h2>Hiring for Data Science, Analytics, or AI / ML?</h2><p>See my CV and book a 15-minute intro call.</p><div className="dual-cta-actions"><Button asChild className="button-primary"><a href="mailto:ankitmourya7874@gmail.com?subject=CV%20request">CV placeholder <FileText size={15} /></a></Button><a className="text-action" href="mailto:ankitmourya7874@gmail.com?subject=Intro%20call">Book an intro call <ArrowUpRight size={14} /></a></div></div><div className="dual-cta-cell"><Eyebrow number="09">FOR STARTUPS & SMBS</Eyebrow><h2>Need custom AI models or data analytics for your business?</h2><p>Explore practical AI workflows, predictive tooling, and analytics services.</p><Button asChild variant="outline" className="button-outline"><Link to="/services">See services <ArrowRight size={15} /></Link></Button></div></div></section>

      <ContactPanel compact />
    </>
  );
}

function ContactPanel({ compact = false }: { compact?: boolean }) {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "");
    const email = String(form.get("email") ?? "");
    const message = String(form.get("message") ?? "");
    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\nFrom: ${name}\nEmail: ${email}`);
    window.location.href = `mailto:ankitmourya7874@gmail.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  }

  return (
    <section className={`contact-section${compact ? " contact-section-home" : ""}`} id="contact"><div className="shell-container contact-grid"><div className="contact-intro"><Eyebrow number={compact ? "10" : undefined}>GET IN TOUCH</Eyebrow><h2>{compact ? "Have a real-world problem?" : "Let's talk about the work."}</h2><p>{compact ? "Recruiting for an early-career role or exploring a data / AI project?" : "For internships, fresher roles, or a data and AI project with a clear problem to solve."}</p><a href="mailto:ankitmourya7874@gmail.com" className="contact-email"><Mail size={16} /> ankitmourya7874@gmail.com <ArrowUpRight size={14} /></a><span className="response-note"><i /> I usually reply within 24 hours.</span><span className="contact-fallback">Form opens your default email client.</span></div><form className="contact-form" onSubmit={handleSubmit}><div className="form-row"><label htmlFor="contact-name">Name <span>*</span><Input id="contact-name" name="name" autoComplete="name" placeholder="Your name" required /></label><label htmlFor="contact-email">Email <span>*</span><Input id="contact-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required /></label></div><label htmlFor="contact-message">What are you working on? <span>*</span><Textarea id="contact-message" name="message" rows={4} placeholder="A little context helps me reply well." required /></label><div className="form-submit-row"><Button type="submit" className="button-primary">{submitted ? "Opening email app" : "Send an enquiry"} {submitted ? <Check size={15} /> : <Send size={14} />}</Button><span>Opens your email app</span></div><a href="mailto:ankitmourya7874@gmail.com?subject=Portfolio%20enquiry" className="mailto-link">Or email directly <ArrowUpRight size={12} /></a></form></div></section>
  );
}

const categories: ("All" | ProjectCategory)[] = ["All", "AI & ML", "Data Analytics", "Recommendation & NLP", "E-commerce Data"];

function WorkPage() {
  const [filter, setFilter] = useState<(typeof categories)[number]>("All");
  const shown = filter === "All" ? projects : projects.filter((project) => project.category === filter);
  return <div className="inner-page work-page"><div className="shell-container"><div className="page-intro"><Eyebrow number="01">PROJECT INDEX / 2026</Eyebrow><h1>Work, with the evidence attached.</h1><p>Live products, early-stage builds, and client work. No fabricated outcomes; missing details are marked plainly.</p></div><div className="filter-row" role="group" aria-label="Filter projects by category">{categories.map((category) => <Button type="button" key={category} variant={filter === category ? "default" : "outline"} className={`filter-button${filter === category ? " filter-button-active" : ""}`} aria-pressed={filter === category} onClick={() => setFilter(category)}>{category}<span>{category === "All" ? projects.length : projects.filter((project) => project.category === category).length}</span></Button>)}</div><div className="projects-grid work-projects-grid">{shown.map((project, index) => <ProjectCard project={project} index={projects.indexOf(project)} key={project.slug} />)}</div><div className="work-note"><VisualSearchIcon /> No client data, unverified screenshots, or unpublished metrics are presented as real.</div></div></div>;
}

function ArchitectureDiagram({ project }: { project: PortfolioProject }) {
  return <div className="architecture-diagram" aria-label={`Conceptual ${project.name} system flow`}>
    {project.architecture.map((item, index) => <div className="architecture-node" key={item}><span>0{index + 1}</span><strong>{item}</strong>{index < project.architecture.length - 1 && <ArrowRight size={15} />}</div>)}
    <span className="diagram-note">Conceptual flow · implementation detail available on request</span>
  </div>;
}

function CaseStudyPage({ slug }: { slug: string }) {
  const project = projects.find((item) => item.slug === slug);
  if (!project) return <div className="inner-page"><div className="shell-container not-found-inline"><Eyebrow>PROJECT NOT FOUND</Eyebrow><h1>This project isn't in the index.</h1><Button asChild variant="outline" className="button-outline"><Link to="/work"><ArrowLeft size={15} /> Back to all work</Link></Button></div></div>;
  const index = projects.indexOf(project);
  const previous = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  return <div className="inner-page case-page"><div className="shell-container"><div className="case-breadcrumb"><Link to="/work"><ArrowLeft size={14} /> All projects</Link><span>/</span><span>{project.category}</span><span className={`status status-${project.status.toLowerCase().replace(" ", "-")}`}><i />{project.status}</span></div><div className="case-hero"><div><Eyebrow number={`0${index + 1}`}>CASE STUDY / {project.category.toUpperCase()}</Eyebrow><h1>{project.name}</h1><p>{project.summary}</p><div className="case-meta"><span><strong>ROLE</strong>{project.role}</span><span><strong>TIMELINE</strong>{project.timeline}</span></div><ProjectLinks project={project} /></div><PortfolioVisual project={project} /></div><div className="case-body"><aside className="case-toc"><span className="eyebrow">ON THIS PAGE</span>{["Problem", "Method", "Build", "Architecture", "Outcomes", "Visuals", "Links", "Reflection"].map((title) => <a key={title} href={`#case-${title.toLowerCase()}`}>{title}<ArrowUpRight size={12} /></a>)}</aside><div className="case-content">
        <section id="case-problem" className="case-section"><Eyebrow number="01">PROBLEM</Eyebrow><h2>Start with the problem.</h2><p>{project.description}</p><p className="case-honesty"><CircleDot size={13} /> No measured result or outcome beyond the supplied facts is claimed here.</p></section>
        <section id="case-method" className="case-section"><Eyebrow number="02">DATA & METHODOLOGY</Eyebrow><h2>Inputs shape the approach.</h2><p>Specific cleaning steps, feature definitions, datasets, and model-evaluation methods were not supplied. The documented inputs and approach are:</p><ul className="case-list">{project.inputs.map((item) => <li key={item}><Check size={14} />{item}</li>)}</ul><div className="method-note"><span><Database size={16} /></span><p>Dataset details, transformations, and validation protocol: <strong>available on request</strong>.</p></div></section>
        <section id="case-build" className="case-section"><Eyebrow number="03">WHAT I BUILT</Eyebrow><h2>Work that can be inspected.</h2><ul className="case-list build-list">{project.build.map((item, buildIndex) => <li key={item}><span className="build-index">0{buildIndex + 1}</span>{item}</li>)}</ul><div className="tag-list case-tags">{project.stack.map((tag) => <span key={tag}>{tag}</span>)}</div></section>
        <section id="case-architecture" className="case-section"><Eyebrow number="04">ARCHITECTURE</Eyebrow><h2>The system at a glance.</h2><p>Conceptual data and product flow — not a claim about undisclosed infrastructure.</p><ArchitectureDiagram project={project} /></section>
        <section id="case-outcomes" className="case-section"><Eyebrow number="05">OUTCOMES / HONESTLY</Eyebrow><h2>What is known today.</h2><div className="outcome-box"><span className="outcome-marker"><Check size={15} /></span><p><strong>Known outcome</strong>{project.outcome}</p></div>{project.target && <div className="target-box"><span className="target-marker">TARGET</span><p><strong>Target, not a measured result</strong>{project.target}</p></div>}<span className="dated-note">Status as of 19 Nov 2026 · project dates and measured metrics were not supplied.</span></section>
        <section id="case-visuals" className="case-section"><Eyebrow number="06">SCREENSHOTS & VISUALS</Eyebrow><h2>A labelled interface illustration.</h2><p>Illustrative product view only — not a production screenshot or client dataset.</p><div className="case-visual-frame"><PortfolioVisual project={project} /><span>PRODUCT / DATA VISUAL · ILLUSTRATION</span></div></section>
        <section id="case-links" className="case-section"><Eyebrow number="07">LINKS & REPRODUCIBILITY</Eyebrow><h2>Go to the source.</h2><div className="case-resource-list">{project.demo ? <a href={project.demo.href} target="_blank" rel="noreferrer"><span className="resource-icon"><Globe2 size={16} /></span><span><strong>Live demo</strong><small>{project.demo.href}</small></span><ProjectExternalIcon /></a> : <div className="case-resource-unavailable"><span className="resource-icon"><Globe2 size={16} /></span><span><strong>Live demo</strong><small>Available on request</small></span></div>}<div className="case-resource-unavailable"><span className="resource-icon"><Github size={16} /></span><span><strong>Source code</strong><small>Available on request</small></span></div><div className="case-resource-unavailable"><span className="resource-icon"><FileText size={16} /></span><span><strong>Notebook / walkthrough</strong><small>Available on request</small></span></div></div></section>
        <section id="case-reflection" className="case-section"><Eyebrow number="08">WHAT I'D DO DIFFERENTLY</Eyebrow><h2>What I would test next.</h2><ul className="reflection-list">{project.differentiator.map((item, reflectionIndex) => <li key={item}><span>0{reflectionIndex + 1}</span>{item}</li>)}</ul></section>
      </div></div><nav className="case-pagination" aria-label="Project navigation"><Link to="/work/$slug" params={{ slug: previous.slug }}><ArrowLeft size={16} /><span><small>PREVIOUS</small><strong>{previous.shortName}</strong></span></Link><Link to="/work"><span className="case-grid-symbol">▦</span><span className="case-pagination-all">All work</span></Link><Link to="/work/$slug" params={{ slug: next.slug }}><span><small>NEXT</small><strong>{next.shortName}</strong></span><ArrowRight size={16} /></Link></nav></div></div>;
}

function AboutPage() {
  const groups = [
    ["Programming & Data Wrangling", ["Python", "SQL", "Structured data"]],
    ["Machine Learning & AI", ["Conversational AI", "LLM agents", "NLP", "Predictive tooling"]],
    ["Data Analytics & Visualisation", ["Sales reconciliation", "Funnel analysis", "Attribution tracking"]],
    ["Databases & Pipelines", ["Data audits", "Data sourcing", "Workflow automation"]],
    ["Deployment & MLOps direction", ["Live product building", "Automated operations", "Pre-launch iteration"]],
    ["E-commerce & Growth Analytics", ["COD / prepaid", "GA4 / Meta", "App-stack optimisation"]],
  ];
  return <div className="inner-page about-page"><div className="shell-container"><div className="page-intro"><Eyebrow number="01">ABOUT / THE PERSON BEHIND THE PRODUCTS</Eyebrow><h1>Curious about the data.<br />Serious about the outcome.</h1><p>I'm Ankit Maurya — a Delhi-based BCA student, data scientist, AI/ML engineer, and student founder.</p></div><div className="about-split"><div className="about-story"><Eyebrow>THE THROUGH-LINE</Eyebrow><h2>Build for the real constraints.</h2><p>I work at the intersection of data science, AI/ML, and products. My projects bring those ideas into practical settings: WhatsApp commerce, hyperlocal discovery, and e-commerce operations.</p><p>Alongside my BCA at Guru Gobind Singh Indraprastha University, I founded Anovation to help startups and SMBs put AI workflows, predictive tooling, and data automation to work.</p><p>I care about clear problem definitions, reproducible pipelines, and showing what has actually been measured — and what hasn't.</p><div className="about-signature"><span>AM.</span><span>DELHI, INDIA<small>OPEN TO WORK · ONSITE / REMOTE</small></span></div></div><HeroIllustration /></div><section className="about-timeline"><SectionTitle number="02" title="Timeline" description="No dates supplied are filled in by assumption." />{[
        ["IN PROGRESS", "BCA", "Guru Gobind Singh Indraprastha University, Delhi. Expected graduation: [YEAR TO CONFIRM]."],
        ["FOUNDED", "Anovation", "Custom AI/ML solutions and data automation for startups and SMBs."],
        ["HACKATHON ENTRY", "COMAI / Merchant AI", "Conversational AI for WhatsApp, including automated COD order verification; entered in Paytm Build for India as Merchant AI."],
        ["CO-BUILT · ~6 MONTHS", "Blink", "Hyperlocal discovery app with geospatial Live Radar, local discovery, meetups, and AI Wingman. Pre-launch."],
        ["CLIENT WORK", "E-commerce analytics", "Sales reconciliation, COD tracking, funnel and attribution optimisation. Client name withheld."],
      ].map(([date, title, note]) => <div className="about-timeline-row" key={title}><span>{date}</span><strong>{title}</strong><p>{note}</p></div>)}</section><section className="about-skills"><SectionTitle number="03" title="Skills & evidence" description="Use the project links to see where each area is applied." /><div className="about-skill-grid">{groups.map(([name, skills], index) => <div className="about-skill" key={name}><span className="about-skill-number">0{index + 1}</span><h3>{name}</h3><div className="skill-tags">{(skills as string[]).map((skill) => <span key={skill}>{skill}</span>)}</div><Link to="/work">See project evidence <ArrowRight size={13} /></Link></div>)}</div></section><div className="about-education"><span><BriefcaseBusiness size={18} /></span><div><Eyebrow>EDUCATION</Eyebrow><h3>Bachelor of Computer Applications</h3><p>Guru Gobind Singh Indraprastha University · Delhi · In progress</p><small>Expected graduation: [YEAR TO CONFIRM]</small></div></div></div></div>;
}

function WritingPage() {
  return <div className="inner-page writing-page"><div className="shell-container"><div className="page-intro"><Eyebrow number="01">WRITING / BUILD LOG</Eyebrow><h1>Notes from the messy middle.</h1><p>Topics I’m working through across data, products, and practical AI. These are starter build-log entries, not published articles.</p></div><div className="writing-list">{writingPosts.map((post, index) => <article className="writing-list-item" key={post.title}><span className="writing-list-number">0{index + 1}</span><div><span className="writing-list-topic">{post.topic} <span>/</span> BUILD LOG TOPIC</span><h2>{post.title}</h2><p>{post.excerpt}</p><Link to="/work/$slug" params={{ slug: post.projectSlug }}>View related case study <ArrowRight size={14} /></Link></div><span className="writing-status">NOTES / DRAFT</span></article>)}</div><div className="writing-footnote"><FileText size={16} /><p>Full articles aren't published yet. Each topic links to its related project notes.</p></div></div></div>;
}

function ServicesPage() {
  const services = [
    { num: "01", icon: <Bot size={19} />, title: "Custom AI / ML models & workflows", description: "Problem scoping, model baselines, conversational AI, and custom workflow automation for a defined business use case.", output: "A scoped approach, reproducible workflow, and clearly communicated validation plan." },
    { num: "02", icon: <Database size={19} />, title: "Data analytics & BI dashboards", description: "Data audits, cleaning and reconciliation, structured reporting, and dashboards that support operating decisions.", output: "A documented data model and decision-focused analytics view." },
    { num: "03", icon: <Network size={19} />, title: "E-commerce funnel & attribution", description: "Sales-channel reconciliation, COD versus prepaid tracking, GA4 / Meta attribution reviews, and app-stack optimisation.", output: "A baseline-first analysis with explicit data definitions and attribution caveats." },
  ];
  return <div className="inner-page services-page"><div className="shell-container"><div className="page-intro"><Eyebrow number="01">ANOVATION / SERVICES</Eyebrow><h1>Data & AI that fit the way you work.</h1><p>Practical support for startups and SMBs — start with a business problem, understand the data, then choose the simplest useful system.</p><Button asChild className="button-primary"><Link to="/contact">Discuss a project <ArrowRight size={15} /></Link></Button></div><div className="services-list">{services.map((service) => <article className="service-row" key={service.num}><div className="service-icon">{service.icon}</div><span className="service-number">{service.num}</span><div className="service-content"><h2>{service.title}</h2><p>{service.description}</p><div className="service-output"><Check size={14} /><span><strong>Typical focus</strong>{service.output}</span></div></div><Link to="/contact" className="service-enquire">Enquire <ArrowUpRight size={15} /></Link></article>)}</div><div className="service-principles"><Eyebrow number="02">WORKING PRINCIPLES</Eyebrow><div><p><Check size={14} /> Start with the question, not a model.</p><p><Check size={14} /> Baselines and assumptions stay visible.</p><p><Check size={14} /> Targets never get presented as results.</p></div></div><div className="services-cta"><div><Eyebrow>START WITH A CONVERSATION</Eyebrow><h2>Have a data or AI problem to scope?</h2><p>Share the context and what a useful outcome would look like.</p></div><Button asChild className="button-primary"><Link to="/contact">Get in touch <ArrowRight size={15} /></Link></Button></div></div></div>;
}

function ContactPage() {
  return <div className="inner-page contact-page"><div className="shell-container"><div className="page-intro"><Eyebrow number="01">CONTACT / START A CONVERSATION</Eyebrow><h1>Tell me what you're building.</h1><p>Internship and fresher roles, a data question, or an Anovation project — a little context is a great start.</p></div><ContactPanel /><div className="contact-bottom-links"><a href="mailto:ankitmourya7874@gmail.com"><Mail size={15} /> Email <span>ankitmourya7874@gmail.com</span></a><a href="https://x.com/ashutosh_sahni0" target="_blank" rel="noreferrer">𝕏 <span>@ashutosh_sahni0</span><ArrowUpRight size={13} /></a><span><MapPin size={15} /> Delhi · Remote worldwide</span></div></div></div>;
}

export { AboutPage, CaseStudyPage, ContactPage, HomePage, ServicesPage, WorkPage, WritingPage };