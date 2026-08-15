import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Search, 
  GitFork, 
  EyeOff, 
  Sliders, 
  FileSpreadsheet, 
  Scale, 
  CheckCircle2, 
  Users, 
  ShieldAlert, 
  FileSearch, 
  Calculator, 
  CheckSquare, 
  Lock,
  Layers
} from 'lucide-react';

interface SpecialistAgent {
  id: string;
  name: string;
  category: 'Core' | 'Risk & Failure' | 'Verification' | 'Operations';
  role: string;
  description: string;
  icon: any;
}

export const AgentsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const agents: SpecialistAgent[] = [
    {
      id: 'smart-router',
      name: 'Smart Router',
      category: 'Core',
      role: 'Adaptive Review Depth Assessor',
      description: 'Evaluates stakes, reversibility, uncertainty, and evidence needs to select Quick, Review, or Deep paths.',
      icon: GitFork,
    },
    {
      id: 'evidence-gatekeeper',
      name: 'Evidence Gatekeeper',
      category: 'Core',
      role: 'Critical Claim Verifier',
      description: 'Applies higher verification thresholds to decision-critical claims compared to secondary details.',
      icon: ShieldCheck,
    },
    {
      id: 'anti-anchor',
      name: 'Anti-Anchoring Lens',
      category: 'Core',
      role: 'Cognitive Bias Neutralizer',
      description: 'Forms independent baseline viewpoints before a leading option becomes an anchoring conclusion.',
      icon: EyeOff,
    },
    {
      id: 'failure-first',
      name: 'Failure-First Scout',
      category: 'Risk & Failure',
      role: 'Adversarial Failure Mode Finder',
      description: 'Identifies the precise failure mode most capable of changing the action.',
      icon: Search,
    },
    {
      id: 'counterfactual',
      name: 'Counterfactual Tester',
      category: 'Risk & Failure',
      role: 'Recommendation Inversion Analyst',
      description: 'Determines what specific fact, metric, or boundary condition would actually flip the decision.',
      icon: Sliders,
    },
    {
      id: 'downside-estimator',
      name: 'Downside Risk Estimator',
      category: 'Risk & Failure',
      role: 'Worst-Case Exposure Modeler',
      description: 'Quantifies tail risk, maximum exposure, and irrevocable consequences before commitment.',
      icon: ShieldAlert,
    },
    {
      id: 'reversibility',
      name: 'Reversibility Evaluator',
      category: 'Risk & Failure',
      role: 'Option Preserver & Exit Planner',
      description: 'Distinguishes one-way doors from two-way doors, calculating unwinding costs.',
      icon: Scale,
    },
    {
      id: 'quant-modeler',
      name: 'Quantitative Modeler',
      category: 'Verification',
      role: 'Numerical & ROI Pressure-Tester',
      description: 'Evaluates cost models, ROI estimates, performance bounds, and financial metrics for validity.',
      icon: Calculator,
    },
    {
      id: 'assumptions-scanner',
      name: 'Assumptions Scanner',
      category: 'Verification',
      role: 'Hidden Premise Exposer',
      description: 'Surfaces unstated assumptions that must hold true for the proposed decision to succeed.',
      icon: FileSearch,
    },
    {
      id: 'security-reviewer',
      name: 'Security & Compliance Gate',
      category: 'Verification',
      role: 'Threat & Governance Analyst',
      description: 'Checks for regulatory, contractual, security, and vulnerability liabilities.',
      icon: Lock,
    },
    {
      id: 'qc-controller',
      name: 'Quality Controller',
      category: 'Operations',
      role: 'Decision Robustness Checker',
      description: 'Enforces completeness, consistency, and sound logic across the synthesized review.',
      icon: CheckSquare,
    },
    {
      id: 'stopping-evaluator',
      name: 'Stopping Rule Engine',
      category: 'Operations',
      role: 'Information Gain Evaluator',
      description: 'Terminates deliberation when additional work is unlikely to change the action.',
      icon: CheckCircle2,
    },
    {
      id: 'options-expander',
      name: 'Options Generator',
      category: 'Operations',
      role: 'False Dichotomy Breaker',
      description: 'Generates non-obvious third alternatives to prevent artificial either/or constraints.',
      icon: Layers,
    },
    {
      id: 'ledger-recorder',
      name: 'Ledger Recorder',
      category: 'Operations',
      role: 'Local Outcome Logger',
      description: 'Records structured decision records, risks, and follow-ups to local JSONL storage.',
      icon: FileSpreadsheet,
    },
  ];

  const categories = [
    { id: 'all', label: 'All 14 Agents' },
    { id: 'Core', label: 'Core & Routing' },
    { id: 'Risk & Failure', label: 'Risk & Failure' },
    { id: 'Verification', label: 'Verification' },
    { id: 'Operations', label: 'Operations & QC' },
  ];

  const filteredAgents = activeCategory === 'all'
    ? agents
    : agents.filter((a) => a.category === activeCategory);

  return (
    <section id="agents" className="relative py-20 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/50 border border-purple-500/25 text-purple-300 text-xs font-mono mb-4">
            <Users className="w-3.5 h-3.5" />
            <span>14 SPECIALIST AGENTS</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight mb-4">
            Specialized Lenses for High-Stakes Review
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Distinct lenses for evidence, options, risk, failure, verification, quantitative reasoning, and quality control. Conditioned by adaptive routing.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 ${
                activeCategory === cat.id
                  ? 'bg-purple-600 text-white font-semibold'
                  : 'bg-[#0d071d] text-zinc-400 hover:text-zinc-200 border border-purple-900/30'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAgents.map((agent) => {
            const Icon = agent.icon;
            return (
              <div
                key={agent.id}
                id={`agent-card-${agent.id}`}
                className="p-5 rounded-xl bg-[#0c0618]/90 border border-purple-500/15 hover:border-purple-500/35 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2 rounded-lg bg-purple-950/60 border border-purple-800/40 text-purple-300">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-purple-400/80 px-2 py-0.5 rounded bg-purple-950/40 border border-purple-900/30">
                      {agent.category}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-white text-base mb-1">
                    {agent.name}
                  </h3>
                  <div className="text-xs text-purple-300 font-mono mb-2">
                    {agent.role}
                  </div>
                  <p className="text-zinc-400 text-xs leading-relaxed">
                    {agent.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
