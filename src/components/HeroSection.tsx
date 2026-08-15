import React from 'react';
import { 
  ShieldCheck, 
  Search, 
  GitFork, 
  CheckCircle2, 
  Sliders, 
  BookOpen, 
  EyeOff, 
  FileSpreadsheet,
  Terminal, 
  Tag, 
  Users, 
  Scale,
  ArrowRight,
  ExternalLink,
  Flame
} from 'lucide-react';

interface HeroSectionProps {
  onOpenInstall: () => void;
  onSelectFeature?: (featureId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ 
  onOpenInstall,
  onSelectFeature 
}) => {
  const highlights = [
    {
      id: 'smart-routing',
      title: 'Smart routing',
      description: 'Lightweight decisions stay lightweight; consequential decisions can receive deeper review.',
      icon: GitFork,
    },
    {
      id: 'specialist-agents',
      title: '14 specialist agents',
      description: 'Distinct lenses for evidence, options, risk, failure, verification, quantitative reasoning, and QC.',
      icon: Users,
    },
    {
      id: 'evidence-gates',
      title: 'Evidence gates',
      description: 'Decision-critical claims receive more scrutiny than optional details.',
      icon: ShieldCheck,
    },
    {
      id: 'anti-anchoring',
      title: 'Anti-anchoring',
      description: 'Independent views are formed before a leading conclusion becomes an anchor.',
      icon: EyeOff,
    },
    {
      id: 'failure-first',
      title: 'Failure-first analysis',
      description: 'Attention goes to the failure mode most capable of changing the action.',
      icon: Search,
    },
    {
      id: 'counterfactual',
      title: 'Counterfactual testing',
      description: 'Identify the exact fact that would actually flip the recommendation.',
      icon: Sliders,
    },
    {
      id: 'stopping-rules',
      title: 'Stopping rules',
      description: 'Stop when additional work is unlikely to change the action.',
      icon: CheckCircle2,
    },
    {
      id: 'decision-ledger',
      title: 'Decision Ledger',
      description: 'Optionally record decisions, reasoning, risks, and outcomes locally in JSONL.',
      icon: FileSpreadsheet,
    },
  ];

  return (
    <section id="home" className="relative pt-28 sm:pt-36 pb-16 min-h-screen flex flex-col justify-between">
      {/* Upper Hero Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column (Hero Content) */}
          <div className="lg:col-span-7 flex flex-col items-start z-10">
            
            {/* Eyebrow Pill */}
            <div 
              id="hero-eyebrow"
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#120724] border border-purple-500/25 text-purple-300 text-xs font-mono tracking-wide uppercase mb-6"
            >
              <Flame className="w-3.5 h-3.5 text-purple-400" />
              <span>Adaptive Decision Pressure-Testing for Claude Code</span>
            </div>

            {/* Main Headline */}
            <h1 
              id="hero-title"
              className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl tracking-tight text-white leading-[1.1] mb-5"
            >
              Make important <br />
              <span className="text-purple-300">
                decisions
              </span> <br />
              harder to fool.
            </h1>

            {/* Subtitle / Value Proposition */}
            <p 
              id="hero-tagline"
              className="text-purple-200/90 font-medium text-sm sm:text-base mb-3"
            >
              Verify the facts · Challenge the weak point · Find the failure mode · Stop when the decision is stable
            </p>

            <p 
              id="hero-description"
              className="text-zinc-300 text-sm sm:text-base leading-relaxed max-w-xl mb-6 font-normal"
            >
              Crucible is an adaptive decision-review skill for Claude Code. It verifies evidence, challenges weak points, searches for failure modes, and stops when further work is unlikely to change the action.
            </p>

            {/* Core Principle Callout */}
            <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-800/30 text-xs sm:text-sm text-purple-200 mb-8 max-w-xl">
              <span className="font-semibold text-white">Guiding Principle:</span> More reasoning is not automatically better. The right amount of reasoning is better.
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 mb-8 w-full sm:w-auto">
              <button
                id="hero-install-btn"
                onClick={onOpenInstall}
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm transition-all duration-200 active:scale-95 group shadow-sm"
              >
                <Terminal className="w-4 h-4 text-purple-100" />
                <span>Install Plugin</span>
                <ArrowRight className="w-4 h-4 text-purple-200 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                id="hero-github-btn"
                href="https://github.com/smshahbaj/crucible"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-zinc-900/90 hover:bg-zinc-800 text-zinc-200 hover:text-white border border-purple-500/25 hover:border-purple-400 font-semibold text-sm transition-all duration-200 active:scale-95 group"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                <span>View on GitHub</span>
                <ExternalLink className="w-3.5 h-3.5 text-zinc-400 group-hover:text-purple-300 transition-colors" />
              </a>
            </div>

            {/* Real Project Metadata Badges */}
            <div className="flex flex-wrap items-center gap-5 text-xs text-zinc-400 font-mono">
              <div className="flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-purple-400" />
                <span>v1.0.0</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-purple-400" />
                <span>Claude Code Plugin</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-purple-400" />
                <span>14 Specialist Agents</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5 text-purple-400" />
                <span>MIT License</span>
              </div>
            </div>

          </div>

          {/* Right Column (Visual Focal Zone for Background Anvil & Atmospheric Smoke) */}
          <div className="lg:col-span-5 relative min-h-[220px] lg:min-h-[420px] flex items-center justify-center pointer-events-none">
            {/* Visual focus layer */}
          </div>

        </div>
      </div>

      {/* Highlights Grid (Directly from README) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-16 z-20">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs font-mono uppercase tracking-wider text-purple-400 font-semibold">
            Key Highlights
          </span>
          <span className="text-xs text-zinc-500 font-mono">
            Directly from repository specifications
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {highlights.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                id={`highlight-card-${item.id}`}
                onClick={() => onSelectFeature?.(item.id)}
                className="p-4 rounded-xl bg-[#0c0618]/80 hover:bg-[#15092a]/90 border border-purple-500/15 hover:border-purple-500/35 transition-all duration-200 cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-purple-950/60 border border-purple-800/40 text-purple-300 shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-display font-semibold text-white text-sm mb-1">
                      {item.title}
                    </h3>
                    <p className="text-zinc-400 text-xs leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
