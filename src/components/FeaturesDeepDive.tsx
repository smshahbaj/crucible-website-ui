import React from 'react';
import { 
  GitFork, 
  ShieldCheck, 
  Search, 
  Sliders, 
  FileSpreadsheet, 
  Scale, 
  AlertTriangle, 
  CheckCircle2, 
  Code,
  Terminal,
  Layers,
  ArrowDown
} from 'lucide-react';

export const FeaturesDeepDive: React.FC = () => {
  return (
    <section id="features" className="relative py-20 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/50 border border-purple-500/25 text-purple-300 text-xs font-mono mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>HOW CRUCIBLE WORKS</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight mb-4">
            Adaptive Decision Scrutiny
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Spend review budget where it can plausibly flip the action. Crucible does not turn every request into a large multi-agent debate.
          </p>
        </div>

        {/* Adaptive Pipeline & Review Depths Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          
          {/* Left: Execution Flow Diagram */}
          <div className="lg:col-span-5 p-6 rounded-xl bg-[#0b0517] border border-purple-500/20 flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-purple-300 font-semibold mb-4 flex items-center gap-2">
                <GitFork className="w-4 h-4 text-purple-400" />
                <span>Decision Lifecycle</span>
              </div>
              
              <div className="space-y-3 font-mono text-xs">
                <div className="p-3 rounded-lg bg-black/50 border border-purple-900/30 text-white font-medium">
                  1. Input Decision & Frame Question
                </div>
                <div className="flex justify-center text-purple-400">
                  <ArrowDown className="w-4 h-4" />
                </div>
                <div className="p-3 rounded-lg bg-purple-950/30 border border-purple-800/40 text-purple-200">
                  2. Route by stakes, uncertainty, reversibility & evidence needs
                </div>
                <div className="flex justify-center text-purple-400">
                  <ArrowDown className="w-4 h-4" />
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-[11px] font-bold">
                  <span className="p-2 rounded bg-emerald-950/40 border border-emerald-500/30 text-emerald-300">QUICK</span>
                  <span className="p-2 rounded bg-amber-950/40 border border-amber-500/30 text-amber-300">REVIEW</span>
                  <span className="p-2 rounded bg-rose-950/40 border border-rose-500/30 text-rose-300">DEEP</span>
                </div>
                <div className="flex justify-center text-purple-400">
                  <ArrowDown className="w-4 h-4" />
                </div>
                <div className="p-3 rounded-lg bg-black/50 border border-purple-900/30 text-zinc-300 space-y-1">
                  <div>• Targeted specialist lenses</div>
                  <div>• Evidence / verification gates</div>
                  <div>• Challenge / failure test</div>
                  <div>• Quality control & stopping rule</div>
                </div>
                <div className="flex justify-center text-purple-400">
                  <ArrowDown className="w-4 h-4" />
                </div>
                <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-500/40 text-emerald-200 font-semibold text-center">
                  Stable, Defensible Recommendation
                </div>
              </div>
            </div>

            <p className="text-zinc-500 text-[11px] font-mono mt-6 pt-4 border-t border-purple-900/30">
              Specialized verification, comparison, or red-team work is conditional—not automatically run for every request.
            </p>
          </div>

          {/* Right: Review Depths Table & Core Pillars */}
          <div className="lg:col-span-7 space-y-6 flex flex-col justify-between">
            
            {/* Depths Table */}
            <div className="rounded-xl border border-purple-900/30 bg-[#090414] overflow-hidden">
              <div className="p-3.5 bg-[#120724] border-b border-purple-900/40 text-xs font-mono font-semibold text-purple-300 uppercase tracking-wider">
                Review Depths & Routing
              </div>
              <div className="divide-y divide-purple-950/80 text-xs">
                <div className="p-4 flex items-start gap-3">
                  <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-emerald-950/50 border border-emerald-500/30 text-emerald-300 shrink-0">
                    🟢 QUICK
                  </span>
                  <div>
                    <div className="font-semibold text-white mb-0.5">Low-stakes, clear, reversible choices</div>
                    <div className="text-zinc-400 leading-relaxed">
                      Fast path for routine decisions where deep multi-agent debate is unnecessary overhead.
                    </div>
                  </div>
                </div>

                <div className="p-4 flex items-start gap-3">
                  <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-amber-950/50 border border-amber-500/30 text-amber-300 shrink-0">
                    🟡 REVIEW
                  </span>
                  <div>
                    <div className="font-semibold text-white mb-0.5">Meaningful trade-offs or uncertainty</div>
                    <div className="text-zinc-400 leading-relaxed">
                      Engages key risk and evidence lenses to pressure-test critical assumptions without unbounded search.
                    </div>
                  </div>
                </div>

                <div className="p-4 flex items-start gap-3">
                  <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-rose-950/50 border border-rose-500/30 text-rose-300 shrink-0">
                    🔴 DEEP
                  </span>
                  <div>
                    <div className="font-semibold text-white mb-0.5">High downside, conflicting evidence, irreversible</div>
                    <div className="text-zinc-400 leading-relaxed">
                      Rigorous counterfactual testing, adversarial red-teaming, and quantitative verification before commitment.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stopping Rules Callout */}
            <div className="p-5 rounded-xl bg-purple-950/20 border border-purple-500/20 space-y-2">
              <div className="flex items-center gap-2 text-purple-300 font-semibold text-xs font-mono uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4 text-purple-400" />
                <span>Stopping Rules & Efficiency</span>
              </div>
              <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed">
                Crucible stops when additional reasoning or search is unlikely to change the action. This prevents endless multi-agent loops and keeps decision support prompt and practical.
              </p>
            </div>

          </div>

        </div>

        {/* Decision Ledger Box (From README) */}
        <div className="p-6 sm:p-8 rounded-xl bg-[#090414] border border-purple-900/30 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-purple-900/30">
            <div className="flex items-center gap-2 text-white font-semibold text-sm sm:text-base">
              <FileSpreadsheet className="w-4 h-4 text-purple-400" />
              <span>Optional Decision Ledger</span>
            </div>
            <span className="text-xs font-mono text-purple-300">
              skills/crucible/references/ledger.md
            </span>
          </div>

          <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
            Crucible includes an optional local ledger to record decisions, reasoning, identified risks, and subsequent real-world outcomes in standard JSONL format.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-xs">
            <div className="p-3 rounded-lg bg-black/50 border border-purple-950 text-zinc-300">
              <span className="text-purple-400 block mb-1 text-[11px] font-semibold"># Record Decision</span>
              <code>python3 scripts/decision_ledger.py --add record.json --ledger .crucible/ledger.jsonl</code>
            </div>
            <div className="p-3 rounded-lg bg-black/50 border border-purple-950 text-zinc-300">
              <span className="text-purple-400 block mb-1 text-[11px] font-semibold"># Render Record</span>
              <code>python3 scripts/decision_ledger.py --render record.json</code>
            </div>
            <div className="p-3 rounded-lg bg-black/50 border border-purple-950 text-zinc-300">
              <span className="text-purple-400 block mb-1 text-[11px] font-semibold"># Generate Report</span>
              <code>python3 scripts/decision_ledger.py --report --ledger .crucible/ledger.jsonl</code>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
