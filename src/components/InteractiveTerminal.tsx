import React, { useState } from 'react';
import { Terminal, Play, RotateCcw, ShieldAlert, CheckCircle2, ChevronRight, Scale, GitFork, Search } from 'lucide-react';

interface Scenario {
  id: string;
  label: string;
  command: string;
  depth: 'QUICK' | 'REVIEW' | 'DEEP';
  depthColor: string;
  depthBadge: string;
  stakes: string;
  evidenceNeed: string;
  reversibility: string;
  summary: string;
  lenses: string[];
  failureModeFound: string;
  counterfactualFlip: string;
  verdict: string;
}

export const InteractiveTerminal: React.FC = () => {
  const scenarios: Scenario[] = [
    {
      id: 'arch',
      label: 'Architecture A vs B',
      command: '/crucible Pressure-test: Should we ship monolithic architecture A or microservices B for our v2 backend?',
      depth: 'DEEP',
      depthColor: 'text-rose-400 border-rose-500/40 bg-rose-950/40',
      depthBadge: '🔴 DEEP REVIEW',
      stakes: 'High (Team throughput, distributed state failure surface, infra budget)',
      evidenceNeed: 'High (P99 latency requirements, distributed transaction boundaries)',
      reversibility: 'Low (Hard rollback after data partitioning)',
      summary: 'Evaluated distributed failure modes against team operational capacity.',
      lenses: ['Architecture Gate', 'Failure-First Scout', 'Counterfactual Tester', 'Operational QC'],
      failureModeFound: 'Saga compensation failure under partial network partitions during cross-service checkout transactions.',
      counterfactualFlip: 'If monthly checkout transactions exceed 500k and team grows beyond 8 backend engineers, microservices B becomes stable.',
      verdict: 'Recommend Architecture A (Modular Monolith) with strict boundary interfaces until throughput threshold is verified.',
    },
    {
      id: 'agreement',
      label: 'Sign Agreement',
      command: '/crucible Should I sign this vendor licensing agreement with auto-renewal clause?',
      depth: 'REVIEW',
      depthColor: 'text-amber-400 border-amber-500/40 bg-amber-950/40',
      depthBadge: '🟡 REVIEW',
      stakes: 'Medium (Vendor lock-in, 60-day renewal notice liability)',
      evidenceNeed: 'Medium (Termination penalty clauses & data extraction terms)',
      reversibility: 'Medium (Contractual duration is 24 months)',
      summary: 'Assessed unilateral term escalation and exit flexibility constraints.',
      lenses: ['Risk Estimator', 'Assumptions Challenger', 'Evidence Gatekeeper'],
      failureModeFound: 'Section 8.4 mandates vendor IP indemnity cap at $10k while user liability remains uncapped.',
      counterfactualFlip: 'If mutual liability cap of 12-month fees is agreed, signing becomes defensible.',
      verdict: 'Do not commit until indemnity parity and 30-day non-renewal notice are inserted.',
    },
    {
      id: 'tooling',
      label: 'Quick Switch',
      command: '/crucible Should we swap our development linter rule for import ordering?',
      depth: 'QUICK',
      depthColor: 'text-emerald-400 border-emerald-500/40 bg-emerald-950/40',
      depthBadge: '🟢 QUICK ROUTE',
      stakes: 'Low (Local styling consistency)',
      evidenceNeed: 'Low (Automated tooling support)',
      reversibility: 'High (Single config commit rollback)',
      summary: 'Lightweight review: minimal downside, zero architectural disruption.',
      lenses: ['Smart Router (Fast-path)'],
      failureModeFound: 'Trivial merge conflicts in open PR branches.',
      counterfactualFlip: 'None needed (trivial impact).',
      verdict: 'Approved. Merge rule update with auto-fix script.',
    },
  ];

  const [activeScenario, setActiveScenario] = useState<Scenario>(scenarios[0]);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [executionStep, setExecutionStep] = useState<number>(3);

  const runSimulation = (scenario: Scenario) => {
    setActiveScenario(scenario);
    setIsExecuting(true);
    setExecutionStep(1);

    setTimeout(() => {
      setExecutionStep(2);
    }, 450);

    setTimeout(() => {
      setExecutionStep(3);
      setIsExecuting(false);
    }, 900);
  };

  return (
    <section id="terminal" className="relative py-20 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/50 border border-purple-500/25 text-purple-300 text-xs font-mono mb-3">
            <Terminal className="w-3.5 h-3.5" />
            <span>INTERACTIVE SIMULATOR</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight mb-3">
            How Crucible Pressure-Tests Decisions
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Select a sample query to see how Crucible adapts review depth, evaluates evidence, challenges failure modes, and applies stopping rules.
          </p>
        </div>

        {/* Query Picker */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-8">
          {scenarios.map((s) => {
            const isSelected = activeScenario.id === s.id;
            return (
              <button
                key={s.id}
                onClick={() => runSimulation(s)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono transition-all duration-200 ${
                  isSelected
                    ? 'bg-purple-600 text-white font-semibold shadow-sm'
                    : 'bg-[#0d071d] text-zinc-400 hover:text-zinc-200 border border-purple-900/30'
                }`}
              >
                <span>{s.label}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded border ${s.depthColor}`}>
                  {s.depth}
                </span>
              </button>
            );
          })}
        </div>

        {/* Terminal Window */}
        <div className="max-w-4xl mx-auto rounded-xl bg-[#090312] border border-purple-500/25 shadow-2xl overflow-hidden font-mono text-xs">
          
          {/* Terminal Titlebar */}
          <div className="px-4 py-3 bg-[#110620] border-b border-purple-900/30 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="ml-2 text-zinc-400 text-[11px]">claude-code — /crucible v1.0.0</span>
            </div>
            <button
              onClick={() => runSimulation(activeScenario)}
              disabled={isExecuting}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-purple-950/60 hover:bg-purple-900 border border-purple-600/30 text-purple-200 text-[11px] transition-colors"
            >
              <RotateCcw className={`w-3 h-3 ${isExecuting ? 'animate-spin' : ''}`} />
              <span>Re-run</span>
            </button>
          </div>

          {/* Terminal Output Body */}
          <div className="p-5 sm:p-6 space-y-4 text-zinc-300">
            
            {/* Input Prompt */}
            <div className="space-y-1">
              <div className="text-zinc-500 text-[11px]">$ claude</div>
              <div className="text-purple-300 font-semibold flex items-start gap-2 text-xs sm:text-sm">
                <ChevronRight className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <span className="break-all">{activeScenario.command}</span>
              </div>
            </div>

            <div className="border-t border-purple-950/80 my-3" />

            {/* Step 1: Routing & Depth Assessment */}
            <div className="space-y-2">
              <div className="text-zinc-500 text-[11px] flex items-center gap-2">
                <GitFork className="w-3.5 h-3.5 text-purple-400" />
                <span className="uppercase tracking-wider font-semibold text-purple-300">[1] Smart Routing Analysis</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 p-3 rounded-lg bg-black/40 border border-purple-900/20 text-[11px]">
                <div>
                  <span className="text-zinc-500 block">Stakes:</span>
                  <span className="text-zinc-200 font-medium">{activeScenario.stakes}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block">Evidence Need:</span>
                  <span className="text-zinc-200 font-medium">{activeScenario.evidenceNeed}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block">Reversibility:</span>
                  <span className="text-zinc-200 font-medium">{activeScenario.reversibility}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs pt-1">
                <span className="text-zinc-400">Assigned Route:</span>
                <span className={`px-2 py-0.5 rounded font-bold border ${activeScenario.depthColor}`}>
                  {activeScenario.depthBadge}
                </span>
              </div>
            </div>

            {/* Step 2: Active Specialist Lenses */}
            {executionStep >= 2 && (
              <div className="space-y-2 pt-2 animate-in fade-in duration-200">
                <div className="text-zinc-500 text-[11px] flex items-center gap-2">
                  <Search className="w-3.5 h-3.5 text-purple-400" />
                  <span className="uppercase tracking-wider font-semibold text-purple-300">[2] Engaged Specialist Lenses</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {activeScenario.lenses.map((lens, i) => (
                    <span key={i} className="px-2.5 py-1 rounded bg-purple-950/40 border border-purple-800/30 text-purple-200 text-[11px]">
                      {lens}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Failure Mode & Counterfactual Pressure-Test */}
            {executionStep >= 3 && (
              <div className="space-y-3 pt-2 animate-in fade-in duration-300">
                <div className="p-3.5 rounded-lg bg-rose-950/20 border border-rose-500/25 space-y-1.5">
                  <div className="flex items-center gap-2 text-rose-300 font-semibold text-[11px]">
                    <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                    <span>FAILURE-FIRST ANALYSIS (Primary Failure Mode)</span>
                  </div>
                  <p className="text-zinc-300 text-xs leading-relaxed">
                    {activeScenario.failureModeFound}
                  </p>
                </div>

                <div className="p-3.5 rounded-lg bg-purple-950/20 border border-purple-500/25 space-y-1.5">
                  <div className="flex items-center gap-2 text-purple-300 font-semibold text-[11px]">
                    <Scale className="w-3.5 h-3.5 text-purple-400" />
                    <span>COUNTERFACTUAL FLIP CONDITION</span>
                  </div>
                  <p className="text-zinc-300 text-xs leading-relaxed">
                    {activeScenario.counterfactualFlip}
                  </p>
                </div>

                {/* Stopping Rule & Recommendation */}
                <div className="p-4 rounded-lg bg-emerald-950/25 border border-emerald-500/30 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-emerald-300 font-semibold text-[11px]">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>STOPPING RULE TRIGGERED — STABLE RECOMMENDATION</span>
                    </div>
                    <span className="text-[10px] text-zinc-400">EVOI &lt; Cost of additional search</span>
                  </div>
                  <p className="text-white text-xs sm:text-sm font-medium leading-relaxed pt-1">
                    {activeScenario.verdict}
                  </p>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
