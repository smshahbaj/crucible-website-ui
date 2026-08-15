import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { BackgroundViewport } from './components/BackgroundViewport';
import { HeroSection } from './components/HeroSection';
import { InteractiveTerminal } from './components/InteractiveTerminal';
import { AgentsSection } from './components/AgentsSection';
import { FeaturesDeepDive } from './components/FeaturesDeepDive';
import { InstallationSection } from './components/InstallationSection';
import { DocsAndFAQ } from './components/DocsAndFAQ';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import { InstallModal } from './components/InstallModal';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isInstallModalOpen, setIsInstallModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      if (totalScroll > 0) {
        setScrollProgress(Math.min(1, Math.max(0, currentScroll / totalScroll)));
      }

      // Update active section based on scroll position
      const sections = ['home', 'features', 'installation', 'agents', 'docs', 'changelog', 'faq', 'about'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 250 && rect.bottom >= 200) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectFeature = (featureId: string) => {
    if (featureId === 'evidence-gates' || featureId === 'failure-analysis' || featureId === 'stopping-rules') {
      handleNavigate('features');
    } else {
      handleNavigate('features');
    }
  };

  return (
    <div className="relative min-h-screen bg-[#050209] text-white selection:bg-purple-600 selection:text-white">
      {/* 3D Background Viewport & Motion Video Container with Interactive Cursor Smoke */}
      <BackgroundViewport scrollProgress={scrollProgress} />

      {/* Top Fixed Navigation */}
      <Navbar 
        activeSection={activeSection} 
        onNavigate={handleNavigate}
        onOpenInstallModal={() => setIsInstallModalOpen(true)}
      />

      {/* Main Foreground Content (Scrolls cleanly with crisp typography & glass panels) */}
      <main className="relative z-10">
        {/* Hero Section matching exact screenshot layout & text */}
        <HeroSection 
          onOpenInstall={() => setIsInstallModalOpen(true)}
          onSelectFeature={handleSelectFeature}
        />

        {/* Live Interactive Pressure-Testing Terminal */}
        <InteractiveTerminal />

        {/* 14 Specialist Agents Matrix */}
        <AgentsSection />

        {/* Architectural Pillars & Interactive Stopping Rule Engine */}
        <FeaturesDeepDive />

        {/* Installation & Quickstart for Claude Code */}
        <InstallationSection />

        {/* Documentation, Changelog & FAQ */}
        <DocsAndFAQ />

        {/* About SM Shahbaj & Official Metadata */}
        <AboutSection />
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Install Modal Popup */}
      <InstallModal 
        isOpen={isInstallModalOpen} 
        onClose={() => setIsInstallModalOpen(false)} 
      />
    </div>
  );
}
