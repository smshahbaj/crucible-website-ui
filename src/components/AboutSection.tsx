import React from 'react';
import { User, Globe, Mail, Github, Code, Flame } from 'lucide-react';
import { CrucibleLogo } from './CrucibleLogo';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="relative py-20 z-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/50 border border-purple-500/25 text-purple-300 text-xs font-mono mb-4">
            <User className="w-3.5 h-3.5" />
            <span>AUTHOR & PROJECT</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight mb-3">
            SM Shahbaj
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Crucible is an independent open-source decision-review plugin created for Claude Code.
          </p>
        </div>

        {/* Author Card */}
        <div className="rounded-xl bg-[#0c0618]/90 border border-purple-500/20 p-6 sm:p-8 backdrop-blur-xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Left: Summary */}
            <div className="md:col-span-7 space-y-4">
              <CrucibleLogo size="md" />

              <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed">
                Crucible is an adaptive decision-review skill for Claude Code that verifies evidence, challenges weak points, searches for failure modes, and stops when further work is unlikely to change the action.
              </p>

              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 rounded-lg bg-purple-950/30 border border-purple-800/30 text-purple-200">
                  <div className="text-zinc-400 mb-0.5 text-[11px]">VERSION</div>
                  <div className="font-bold text-white">v1.0.0</div>
                </div>
                <div className="p-3 rounded-lg bg-purple-950/30 border border-purple-800/30 text-purple-200">
                  <div className="text-zinc-400 mb-0.5 text-[11px]">LICENSE</div>
                  <div className="font-bold text-white">MIT License</div>
                </div>
              </div>
            </div>

            {/* Right: Author Links */}
            <div className="md:col-span-5 flex flex-col gap-2.5 md:border-l md:border-purple-900/30 md:pl-6">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1">
                Official Links & Contact
              </span>

              {/* Personal Website */}
              <a
                href="https://smshahbaj.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 rounded-lg bg-black/40 hover:bg-purple-950/40 border border-purple-900/30 hover:border-purple-500/40 text-zinc-200 hover:text-white transition-all text-xs font-medium group"
              >
                <div className="flex items-center gap-2">
                  <Globe className="w-3.5 h-3.5 text-purple-400" />
                  <span>smshahbaj.com</span>
                </div>
                <span className="text-purple-400 group-hover:translate-x-0.5 transition-transform font-mono text-[11px]">
                  Visit ↗
                </span>
              </a>

              {/* GitHub Profile */}
              <a
                href="https://github.com/smshahbaj"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 rounded-lg bg-black/40 hover:bg-purple-950/40 border border-purple-900/30 hover:border-purple-500/40 text-zinc-200 hover:text-white transition-all text-xs font-medium group"
              >
                <div className="flex items-center gap-2">
                  <Github className="w-3.5 h-3.5 text-purple-400" />
                  <span>github.com/smshahbaj</span>
                </div>
                <span className="text-purple-400 group-hover:translate-x-0.5 transition-transform font-mono text-[11px]">
                  Follow ↗
                </span>
              </a>

              {/* Repository */}
              <a
                href="https://github.com/smshahbaj/crucible"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 rounded-lg bg-black/40 hover:bg-purple-950/40 border border-purple-900/30 hover:border-purple-500/40 text-zinc-200 hover:text-white transition-all text-xs font-medium group"
              >
                <div className="flex items-center gap-2">
                  <Code className="w-3.5 h-3.5 text-purple-400" />
                  <span>github.com/smshahbaj/crucible</span>
                </div>
                <span className="text-purple-400 group-hover:translate-x-0.5 transition-transform font-mono text-[11px]">
                  Code ↗
                </span>
              </a>

              {/* Contact Email */}
              <a
                href="mailto:contact@smshahbaj.com"
                className="flex items-center justify-between p-2.5 rounded-lg bg-black/40 hover:bg-purple-950/40 border border-purple-900/30 hover:border-purple-500/40 text-zinc-200 hover:text-white transition-all text-xs font-medium group"
              >
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-purple-400" />
                  <span>contact@smshahbaj.com</span>
                </div>
                <span className="text-purple-400 group-hover:translate-x-0.5 transition-transform font-mono text-[11px]">
                  Email ↗
                </span>
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
