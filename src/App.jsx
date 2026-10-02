import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { InteractiveBackground } from "./components/InteractiveBackground";
import { HeroSection } from "./components/HeroSection";
import { ProjectModal } from "./components/projects/ProjectModal";
import { MiniGamesSection } from "./components/MiniGamesSection";
import { MiniAppsSection } from "./components/MiniAppsSection";
import { SkillsSection } from "./components/SkillsSection";
import { ExperienceEducation } from "./components/ExperienceEducation";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { CookieVaultModal } from "./components/cookies/CookieVaultModal";
import { getCookie, setCookie } from "./lib/cookies";
import { playClickSound } from "./lib/sound";
import { Cookie, Terminal, Volume2, VolumeX, ArrowUp } from "lucide-react";

export default function App() {
  const [theme, setTheme] = useState(() => getCookie("theme", "cyber"));
  const [soundEnabled, setSoundEnabled] = useState(() => getCookie("soundEnabled", true) !== false);
  const [visitorName, setVisitorName] = useState(() => getCookie("visitorName", ""));
  const [selectedProject, setSelectedProject] = useState(null);
  const [isCookieVaultOpen, setIsCookieVaultOpen] = useState(false);

  // Apply theme to HTML attribute
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    setCookie("theme", theme, 90);
  }, [theme]);

  // Sync sound setting
  const toggleSound = () => {
    playClickSound();
    const nextVal = !soundEnabled;
    setSoundEnabled(nextVal);
    setCookie("soundEnabled", nextVal, 90);
  };

  // Keyboard shortcut Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        const toolsElem = document.getElementById("tools");
        toolsElem?.scrollIntoView({ behavior: "smooth" });
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#070913] text-slate-100 font-body selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Dynamic Animated Canvas Constellation Background */}
      <InteractiveBackground theme={theme} />

      {/* Main Top Navigation Dock */}
      <Navbar
        currentTheme={theme}
        onThemeChange={(newTheme) => setTheme(newTheme)}
        soundEnabled={soundEnabled}
        onSoundToggle={toggleSound}
        onOpenCookies={() => {
          playClickSound();
          setIsCookieVaultOpen(true);
        }}
        onOpenTerminal={() => {
          document.getElementById("tools")?.scrollIntoView({ behavior: "smooth" });
        }}
        visitorName={visitorName}
      />

      <main className="relative z-10">
        {/* Hero Section */}
        <HeroSection
          visitorName={visitorName}
          onOpenTerminal={() => {
            document.getElementById("tools")?.scrollIntoView({ behavior: "smooth" });
          }}
          onOpenCookies={() => {
            setIsCookieVaultOpen(true);
          }}
        />

        {/* 15 Projects Section with Live Filter and Sandboxes */}
        {/* <ProjectsSection onOpenProject={(proj) => setSelectedProject(proj)} /> */}

        {/* Visitor Arcade with Cyber Snake, Code Typer, and Memory Matrix */}
        <MiniGamesSection />

        {/* Dev Tools Deck: Dev Calculator with Tape, Unit Converter, Terminal CLI */}
        <MiniAppsSection
          onSelectProject={(proj) => setSelectedProject(proj)}
          onSelectTheme={(t) => setTheme(t)}
        />

        {/* Skills Radar & Architecture Matrix */}
        <SkillsSection />

        {/* Experience Timeline (SDC ERP Modules) & Education */}
        <ExperienceEducation />

        {/* Direct Contact & Email Dispatcher */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenCookies={() => {
          playClickSound();
          setIsCookieVaultOpen(true);
        }}
        onOpenTerminal={() => {
          document.getElementById("tools")?.scrollIntoView({ behavior: "smooth" });
        }}
      />

      {/* Project Sandbox Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {/* Cookie Vault & In-Device Memory Modal */}
      <CookieVaultModal
        isOpen={isCookieVaultOpen}
        onClose={() => setIsCookieVaultOpen(false)}
        onNameChange={(name) => setVisitorName(name)}
      />

      {/* Floating Bottom Quick Tools Bar */}
      <div className="fixed bottom-4 right-4 z-40 flex items-center gap-2">
        <button
          onClick={() => {
            playClickSound();
            setIsCookieVaultOpen(true);
          }}
          className="flex h-11 w-11 items-center justify-center rounded-full glass border border-cyan-500/30 text-cyan-300 shadow-xl shadow-cyan-500/20 hover:scale-110 active:scale-95 transition-all"
          title="Open Cookie Memory Vault"
        >
          <Cookie className="h-5 w-5" />
        </button>

        <button
          onClick={() => {
            playClickSound();
            document.getElementById("tools")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="flex h-11 w-11 items-center justify-center rounded-full glass border border-violet-500/30 text-violet-300 shadow-xl shadow-violet-500/20 hover:scale-110 active:scale-95 transition-all"
          title="Jump to Dev Tools & Terminal"
        >
          <Terminal className="h-5 w-5" />
        </button>

        <button
          onClick={() => {
            playClickSound();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex h-11 w-11 items-center justify-center rounded-full glass border border-white/10 text-white shadow-xl hover:scale-110 active:scale-95 transition-all"
          title="Back to Top"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
