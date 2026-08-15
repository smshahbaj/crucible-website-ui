import React, { useState, useEffect } from 'react';
import { Terminal, Github } from 'lucide-react';
import { CrucibleLogo } from './CrucibleLogo';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenInstallModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  activeSection, 
  onNavigate,
  onOpenInstallModal 
}) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'features', label: 'How it Works' },
    { id: 'agents', label: 'Specialists' },
    { id: 'installation', label: 'Install' },
    { id: 'docs', label: 'Verification & FAQ' },
    { id: 'about', label: 'About' },
  ];

  return (
    <header 
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled 
          ? 'bg-[#06020c]/90 backdrop-blur-md border-b border-purple-900/30 py-3' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: Brand Logo */}
        <button 
          id="nav-logo-btn"
          onClick={() => onNavigate('home')}
          className="focus:outline-none rounded-lg text-left"
        >
          <CrucibleLogo size="md" />
        </button>

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1 sm:space-x-2">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => onNavigate(item.id)}
                className={`relative px-3 py-1.5 text-xs sm:text-sm font-medium transition-colors ${
                  isActive 
                    ? 'text-white font-semibold' 
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-2 right-2 h-[2px] bg-purple-500 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-2.5">
          <a
            id="nav-github-btn"
            href="https://github.com/smshahbaj/crucible"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900/90 hover:bg-zinc-800 text-zinc-200 hover:text-white border border-purple-500/20 text-xs font-medium transition-all"
          >
            <Github className="w-3.5 h-3.5 text-purple-300" />
            <span className="font-semibold">GitHub</span>
          </a>

          <button
            id="nav-install-cta"
            onClick={onOpenInstallModal}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold transition-all active:scale-95 shadow-sm"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Install</span>
          </button>
        </div>
      </div>

      {/* Mobile nav bar pills */}
      <div className="flex md:hidden overflow-x-auto py-2 px-4 space-x-2 scrollbar-none border-t border-purple-900/20 mt-2 bg-[#080312]/95">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`whitespace-nowrap px-3 py-1 text-xs rounded-full transition-colors ${
                isActive 
                  ? 'bg-purple-600 text-white font-semibold' 
                  : 'text-zinc-400 hover:text-zinc-200 bg-purple-950/20'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </header>
  );
};
