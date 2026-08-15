import React, { useState } from 'react';
import { BookOpen, ShieldAlert, CheckCircle, Terminal, HelpCircle, Code, ChevronDown, ChevronUp } from 'lucide-react';

export const DocsAndFAQ: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const testCommands = [
    { label: 'Python Syntax Check', cmd: 'python3 -m compileall -q .' },
    { label: 'Core Test Suite', cmd: 'python3 -m pytest tests/ -v' },
    { label: 'Standalone Tests (No Pytest)', cmd: 'python3 scripts/run_tests_standalone.py' },
    { label: 'Package Validation', cmd: 'python3 scripts/validate.py' },
    { label: 'Routing Score Audit', cmd: 'python3 scripts/score_routing.py' },
    { label: '120-Case Benchmark', cmd: 'python3 scripts/run_benchmark.py --limit 120' },
    { label: 'Golden Benchmark', cmd: 'python3 scripts/run_golden_benchmark.py' },
    { label: 'Stress Test (200 iterations)', cmd: 'python3 scripts/stress_test.py --iterations 200' },
  ];

  const faqs = [
    {
      q: 'What is Crucible?',
      a: 'Crucible is an adaptive decision-review skill for Claude Code designed for decisions where reasoning quality matters—such as architecture selection, contract commitments, investment decisions, or strategy pressure-testing. It chooses a review depth based on stakes, uncertainty, reversibility, and evidence needs.',
    },
    {
      q: 'Does Crucible run 14 agents on every request?',
      a: 'No. Crucible does not turn every request into a large multi-agent debate. Routine edits and low-stakes questions stay lightweight on the Quick path. Consequential, irreversible decisions receive deeper specialized review.',
    },
    {
      q: 'What is Crucible NOT?',
      a: 'Crucible is not a promise of perfect answers, not a majority-vote truth machine, not a replacement for primary evidence, not a replacement for qualified professional advice (legal, financial, medical), and not a reason to expose private internal reasoning.',
    },
    {
      q: 'Do I need a separate API key or database to use Crucible?',
      a: 'No. Normal plugin usage in Claude Code does not require a database, separate server, or additional model API key. It runs natively as a Claude Code plugin.',
    },
    {
      q: 'What if Crucible does not trigger automatically in Claude Code?',
      a: 'You can explicitly invoke it anytime by prefixing your prompt with "/crucible Pressure-test this decision: ...". Routine edits and trivial lookups are intentionally kept lightweight by the router.',
    },
    {
      q: 'How does Crucible ensure benchmark honesty?',
      a: 'Crucible explicitly distinguishes offline contract validation (routing contracts, structured outputs, scoring) from live model quality. Offline scores are interpreted as engineering and regression evidence, not as proof of universal model accuracy.',
    },
  ];

  return (
    <section id="docs" className="relative py-20 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/50 border border-purple-500/25 text-purple-300 text-xs font-mono mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            <span>DOCUMENTATION & VERIFICATION</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight mb-4">
            Verification & Testing
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Engineered with transparent validation scripts, benchmark rigor, and explicit safety boundaries.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          
          {/* Left: What Crucible Is / Is Not */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* What Crucible is Not */}
            <div className="p-6 rounded-xl bg-[#0d0618] border border-purple-500/20 space-y-3">
              <div className="flex items-center gap-2 text-purple-300 font-semibold text-xs font-mono uppercase tracking-wider">
                <ShieldAlert className="w-4 h-4 text-purple-400" />
                <span>What Crucible Is Not</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-zinc-300">
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 font-bold">•</span>
                  <span>Not a promise of perfect answers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 font-bold">•</span>
                  <span>Not a “run 14 agents on everything” system</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 font-bold">•</span>
                  <span>Not a majority-vote truth machine</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 font-bold">•</span>
                  <span>Not a replacement for primary evidence or qualified professional advice</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 font-bold">•</span>
                  <span>Multiple agents reaching the same conclusion from the same evidence are not automatically independent evidence.</span>
                </li>
              </ul>
            </div>

            {/* Safety & Limitations */}
            <div className="p-6 rounded-xl bg-[#0a0414] border border-purple-900/30 space-y-3">
              <div className="text-xs font-mono uppercase tracking-wider text-purple-300 font-semibold">
                Safety & Decision Support Scope
              </div>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                Crucible is a decision-support system. For legal, medical, financial, employment, safety, security, or other high-impact matters, use appropriate qualified professionals and primary sources where necessary.
              </p>
              <div className="p-3 rounded-lg bg-black/40 border border-purple-900/20 text-xs text-zinc-300">
                <span className="text-purple-300 font-semibold">Surfaces:</span> Missing information, assumptions, trade-offs, failure modes, and conditions that flip a recommendation.
              </div>
            </div>

          </div>

          {/* Right: Testing & Validation CLI Commands */}
          <div className="lg:col-span-6 p-6 rounded-xl bg-[#090312] border border-purple-500/20 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-purple-900/30">
                <div className="flex items-center gap-2 text-white font-semibold text-xs font-mono uppercase tracking-wider">
                  <Terminal className="w-4 h-4 text-purple-400" />
                  <span>Repository Testing & Benchmarks</span>
                </div>
                <span className="text-[11px] text-zinc-500 font-mono">From Plugin Root</span>
              </div>

              <div className="space-y-2.5 font-mono text-xs">
                {testCommands.map((tc, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-black/50 border border-purple-950 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <span className="text-zinc-400 text-[11px]">{tc.label}:</span>
                    <code className="text-purple-300 font-semibold text-right select-all">{tc.cmd}</code>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-purple-900/30 text-[11px] text-zinc-400 font-mono">
              Offline contract scores validate regression behavior and structure, not universal model accuracy.
            </div>
          </div>

        </div>

        {/* FAQ Section */}
        <div id="faq" className="max-w-4xl mx-auto pt-10">
          <div className="flex items-center gap-2 text-white font-semibold text-base mb-6 font-display">
            <HelpCircle className="w-5 h-5 text-purple-400" />
            <span>Frequently Asked Questions</span>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-xl bg-[#0c0618] border border-purple-500/20 overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-4 text-left flex items-center justify-between gap-4 hover:bg-purple-950/20 transition-colors"
                  >
                    <span className="font-semibold text-white text-sm">
                      {faq.q}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-purple-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-zinc-400 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 text-zinc-300 text-xs sm:text-sm leading-relaxed border-t border-purple-950/50 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
