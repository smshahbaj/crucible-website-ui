import React from 'react';
import { ArrowUp, Globe, Mail, Github, Code } from 'lucide-react';
import { CrucibleLogo } from './CrucibleLogo';

interface FooterProps {
  onNavigate: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-20 border-t border-purple-900/30 bg-[#050209]/95 backdrop-blur-xl pt-12 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-purple-950/60 items-start">
          
          {/* Brand & Subtitle */}
          <div className="md:col-span-6 space-y-3">
            <CrucibleLogo size="md" />
            <p className="text-zinc-400 text-xs sm:text-sm max-w-md leading-relaxed font-normal">
              An adaptive decision-review skill for Claude Code. Verifies evidence, challenges weak points, searches for failure modes, and stops when further work is unlikely to change the action.
            </p>
            <div className="flex items-center gap-3 text-xs font-mono text-zinc-500 pt-1">
              <span>v1.0.0</span>
              <span>•</span>
              <span>MIT License</span>
              <span>•</span>
              <a 
                href="https://crucible.smshahbaj.com" 
                className="text-purple-400 hover:text-purple-300 transition-colors"
              >
                crucible.smshahbaj.com
              </a>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-3 space-y-2 text-xs sm:text-sm text-zinc-400">
            <span className="block text-xs font-mono uppercase tracking-wider text-purple-300 mb-2 font-semibold">
              Navigation
            </span>
            <div className="flex flex-col space-y-1.5">
              <button onClick={() => onNavigate('home')} className="text-left hover:text-purple-300 transition-colors">
                Home
              </button>
              <button onClick={() => onNavigate('features')} className="text-left hover:text-purple-300 transition-colors">
                How it Works
              </button>
              <button onClick={() => onNavigate('agents')} className="text-left hover:text-purple-300 transition-colors">
                14 Specialist Agents
              </button>
              <button onClick={() => onNavigate('installation')} className="text-left hover:text-purple-300 transition-colors">
                Installation
              </button>
              <button onClick={() => onNavigate('docs')} className="text-left hover:text-purple-300 transition-colors">
                Verification & FAQ
              </button>
              <button onClick={() => onNavigate('about')} className="text-left hover:text-purple-300 transition-colors">
                About SM Shahbaj
              </button>
            </div>
          </div>

          {/* Official Resources */}
          <div className="md:col-span-3 space-y-2 text-xs sm:text-sm text-zinc-400">
            <span className="block text-xs font-mono uppercase tracking-wider text-purple-300 mb-2 font-semibold">
              Official Links
            </span>
            <div className="flex flex-col space-y-1.5">
              <a
                href="https://github.com/smshahbaj/crucible"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-purple-300 transition-colors flex items-center gap-1.5"
              >
                <Github className="w-3.5 h-3.5 text-purple-400" />
                <span>GitHub Repository</span>
              </a>
              <a
                href="https://smshahbaj.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-purple-300 transition-colors flex items-center gap-1.5"
              >
                <Globe className="w-3.5 h-3.5 text-purple-400" />
                <span>Author Website (smshahbaj.com)</span>
              </a>
              <a
                href="mailto:contact@smshahbaj.com"
                className="hover:text-purple-300 transition-colors flex items-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5 text-purple-400" />
                <span>contact@smshahbaj.com</span>
              </a>
              <a
                href="https://github.com/smshahbaj"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-purple-300 transition-colors flex items-center gap-1.5"
              >
                <Code className="w-3.5 h-3.5 text-purple-400" />
                <span>@smshahbaj Profile</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Footer Row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 font-mono">
          <div className="flex items-center gap-2">
            <span>Crucible by</span>
            <a
              href="https://smshahbaj.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-300 hover:text-white font-semibold underline underline-offset-4"
            >
              SM Shahbaj
            </a>
            <span>• MIT Licensed Open Source</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1 rounded bg-purple-950/40 hover:bg-purple-900/60 border border-purple-800/30 text-purple-300 hover:text-white transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3 h-3" />
          </button>
        </div>

      </div>
    </footer>
  );
};
