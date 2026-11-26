import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowUpRight, Github, Instagram, Linkedin, Menu, Moon, Pause, Play, Sun, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { navigationItems } from "@/lib/portfolio-data";

type ColorMode = "light" | "dark";

function initialMode(): ColorMode {
  if (typeof window === "undefined") return "light";
  const saved = window.localStorage.getItem("ankit-theme") || window.localStorage.getItem("ashutosh-theme");
  if (saved === "light" || saved === "dark") return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function SiteControls() {
  const [mode, setMode] = useState<ColorMode>(initialMode);
  const [motionEnabled, setMotionEnabled] = useState(true);

  useEffect(() => {
    window.localStorage.removeItem("ashutosh-motion");
    window.localStorage.removeItem("ankit-motion");
    const storedMotion = window.localStorage.getItem("ankit-motion-v2");
    const activeMotion = storedMotion !== "off";
    setMotionEnabled(activeMotion);
    document.documentElement.classList.toggle("dark", mode === "dark");
    document.documentElement.classList.toggle("motion-off", !activeMotion);
  }, [mode]);

  function toggleTheme() {
    const nextMode = mode === "dark" ? "light" : "dark";
    setMode(nextMode);
    window.localStorage.setItem("ankit-theme", nextMode);
  }

  function toggleMotion() {
    const nextEnabled = !motionEnabled;
    setMotionEnabled(nextEnabled);
    window.localStorage.setItem("ankit-motion-v2", nextEnabled ? "on" : "off");
    document.documentElement.classList.toggle("motion-off", !nextEnabled);
  }

  return (
    <div className="site-controls">
      <Button type="button" variant="ghost" size="icon" className="control-button" aria-label={mode === "dark" ? "Switch to light mode" : "Switch to dark mode"} title={mode === "dark" ? "Switch to light mode" : "Switch to dark mode"} onClick={toggleTheme}>
        {mode === "dark" ? <Sun /> : <Moon />}
      </Button>
      <Button type="button" variant="ghost" size="icon" className="control-button" aria-label={motionEnabled ? "Turn motion off" : "Turn motion on"} title={motionEnabled ? "Turn motion off" : "Turn motion on"} onClick={toggleMotion}>
        {motionEnabled ? <Pause /> : <Play />}
      </Button>
    </div>
  );
}

function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <>
      <div className="availability-bar">
        <div className="shell-container availability-inner">
          <span className="availability-copy"><i className="availability-dot" /> <strong>Open to internships & fresher roles</strong><span>— Data Science / Data Analyst / AI & ML · Delhi NCR onsite or remote</span></span>
          <span className="availability-code">DEL / REMOTE</span>
        </div>
      </div>
      <header className="site-header">
        <div className="shell-container nav-inner">
          <Link to="/" aria-label="Ankit Maurya home" className="wordmark">
            <span className="wordmark-icon overflow-hidden border border-[#ff5e1e]/40 p-0.5">
              <img src="/ankit.jpeg" alt="Ankit Maurya" className="w-full h-full object-cover rounded-md" />
            </span>
            <span>Ankit Maurya<small>DATA · AI · BUILD</small></span>
          </Link>
          <nav className={`main-nav${menuOpen ? " nav-open" : ""}`} aria-label="Main navigation">
            {navigationItems.map((item) => <Link key={item.to} to={item.to} className={`nav-link${pathname === item.to || (item.to === "/work" && pathname.startsWith("/work/")) ? " nav-link-active" : ""}`} aria-current={pathname === item.to ? "page" : undefined}>{item.label}</Link>)}
          </nav>
          <div className="nav-actions"><SiteControls /><Button type="button" variant="ghost" size="icon" className="menu-toggle" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button></div>
        </div>
      </header>
    </>
  );
}

function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const available = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(available > 0 ? Math.min(window.scrollY / available, 1) : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return <div className="scroll-progress" aria-hidden="true"><span style={{ transform: `scaleX(${progress})` }} /></div>;
}

function SocialLink({ href, label, children }: { href?: string; label: string; children: React.ReactNode }) {
  const className = "social-link";
  if (!href) return <span className={className} aria-label={`${label} — available on request`} title="Available on request">{children}<span className="social-name">{label}</span><span className="social-available">Available on request</span></span>;
  return <a className={className} href={href} target="_blank" rel="noreferrer" aria-label={`${label} profile`}>{children}<span className="social-name">{label}</span><ArrowUpRight size={12} /></a>;
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell-container footer-main">
        <div className="footer-about">
          <Link className="wordmark" to="/">
            <span className="wordmark-icon overflow-hidden border border-[#ff5e1e]/40 p-0.5">
              <img src="/ankit.jpeg" alt="Ankit Maurya" className="w-full h-full object-cover rounded-md" />
            </span>
            <span>Ankit Maurya<small>DATA · AI · BUILD</small></span>
          </Link>
          <p>Data science, machine learning, and products built around real-world problems.</p>
        </div>
        <div className="footer-links-block"><span className="eyebrow">SITEMAP</span><div className="footer-links">{navigationItems.map((item) => <Link key={item.to} to={item.to}>{item.label}</Link>)}<Link to="/work">All case studies</Link></div></div>
        <div className="footer-social-block"><span className="eyebrow">ELSEWHERE</span><div className="footer-socials"><SocialLink label="GitHub" href="https://github.com/ankitmauryaa1"><Github size={15} /></SocialLink><SocialLink label="LinkedIn" href="https://www.linkedin.com/in/ankitmauryaa?utm_source=share_via&utm_content=profile&utm_medium=member_android"><Linkedin size={15} /></SocialLink><SocialLink label="X" href="https://x.com/ashutosh_sahni0"><span className="x-glyph">𝕏</span></SocialLink><SocialLink label="Instagram" href="https://instagram.com/finess_833"><Instagram size={15} /></SocialLink></div></div>
      </div>
      <div className="shell-container footer-bottom"><span>© {new Date().getFullYear()} Ankit Maurya · Built with React</span><span>Last updated <time dateTime="2026-11-19">19 Nov 2026</time></span><a href="#top" className="back-top">Back to top ↑</a></div>
    </footer>
  );
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  return <><ScrollProgress /><div id="top"><SiteHeader /></div><main>{children}</main><SiteFooter /></>;
}