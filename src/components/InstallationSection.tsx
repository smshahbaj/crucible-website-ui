import React, { useState } from 'react';
import { Terminal, Copy, Check, Download, CheckCircle2, ArrowRight, ShieldCheck, AlertCircle, HelpCircle } from 'lucide-react';

export const InstallationSection: React.FC = () => {
  const [installMethod, setInstallMethod] = useState<'marketplace' | 'local'>('marketplace');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const troubleshootingRows = [
    {
      symptom: '/plugin marketplace add fails',
      cause: "Path/URL doesn't point at a directory containing .claude-plugin/marketplace.json",
      fix: "Confirm you're pointing at the repository root, not a subdirectory",
    },
    {
      symptom: 'Marketplace adds but crucible isn\'t listed',
      cause: "Marketplace name in marketplace.json doesn't match what you referenced in install",
      fix: "Use crucible@crucible-marketplace exactly, or run /plugin marketplace list to see the registered name",
    },
    {
      symptom: '/crucible command not found after install',
      cause: 'Plugin loaded but Claude Code session wasn\'t reloaded',
      fix: 'Run /reload-plugins or start a new session',
    },
    {
      symptom: 'plugin.json / marketplace.json parse errors',
      cause: 'Manually edited JSON with a syntax error',
      fix: 'Run python3 -c "import json; json.load(open(\'.claude-plugin/plugin.json\'))" to locate the error',
    },
    {
      symptom: 'Update doesn\'t pick up new version',
      cause: 'Marketplace not refreshed',
      fix: 'Run /plugin marketplace update crucible-marketplace before /plugin update',
    },
  ];

  return (
    <section id="installation" className="relative py-20 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/50 border border-purple-500/25 text-purple-300 text-xs font-mono mb-4">
            <Download className="w-3.5 h-3.5" />
            <span>INSTALLATION GUIDE</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight mb-3">
            Install Crucible in Claude Code
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            This repository is both a Claude Code plugin (<code className="text-purple-300">.claude-plugin/plugin.json</code>) and a marketplace catalog (<code className="text-purple-300">.claude-plugin/marketplace.json</code>).
          </p>
        </div>

        {/* Requirements Box */}
        <div className="max-w-4xl mx-auto mb-8 p-4 rounded-xl bg-[#0a0515]/90 border border-purple-900/30 text-xs sm:text-sm text-zinc-300 space-y-2">
          <div className="font-semibold text-white flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-purple-300">
            <ShieldCheck className="w-4 h-4 text-purple-400" />
            <span>Requirements</span>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-300 pt-1">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
              <span><strong>Claude Code</strong> installed and working</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
              <span><strong>No separate API key</strong> or database required</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
              <span>Local copy or network access to add marketplace</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
              <span><strong>Python 3.10+</strong> only for optional benchmarks / ledger</span>
            </li>
          </ul>
        </div>

        {/* Installation Box */}
        <div className="max-w-4xl mx-auto rounded-xl bg-[#0d071d]/90 border border-purple-500/20 shadow-lg backdrop-blur-xl overflow-hidden mb-12">
          
          {/* Method Selection Tabs */}
          <div className="p-3 bg-[#080312] border-b border-purple-900/30 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setInstallMethod('marketplace')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                  installMethod === 'marketplace'
                    ? 'bg-purple-600 text-white'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-purple-950/30'
                }`}
              >
                Option A: Marketplace (Recommended)
              </button>
              <button
                onClick={() => setInstallMethod('local')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                  installMethod === 'local'
                    ? 'bg-purple-600 text-white'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-purple-950/30'
                }`}
              >
                Option B: Local --plugin-dir
              </button>
            </div>

            <span className="hidden sm:inline text-zinc-500 text-xs font-mono">
              v1.0.0
            </span>
          </div>

          {/* Tab Content */}
          <div className="p-6 sm:p-8 space-y-6">
            {installMethod === 'marketplace' ? (
              <div className="space-y-6">
                {/* Step 1 */}
                <div>
                  <div className="text-xs font-mono font-semibold text-purple-300 mb-1.5">
                    1. ADD THE MARKETPLACE
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-black/60 border border-purple-900/40 font-mono text-xs sm:text-sm text-purple-200">
                    <code>/plugin marketplace add smshahbaj/crucible</code>
                    <button
                      onClick={() => copyToClipboard('/plugin marketplace add smshahbaj/crucible', 'm1')}
                      className="flex items-center gap-1 px-2.5 py-1 rounded bg-purple-950 hover:bg-purple-900 border border-purple-600/30 text-xs text-purple-200"
                    >
                      {copiedKey === 'm1' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedKey === 'm1' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                </div>

                {/* Step 2 */}
                <div>
                  <div className="text-xs font-mono font-semibold text-purple-300 mb-1.5">
                    2. INSTALL THE PLUGIN
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-black/60 border border-purple-900/40 font-mono text-xs sm:text-sm text-purple-200">
                    <code>/plugin install crucible@crucible-marketplace</code>
                    <button
                      onClick={() => copyToClipboard('/plugin install crucible@crucible-marketplace', 'm2')}
                      className="flex items-center gap-1 px-2.5 py-1 rounded bg-purple-950 hover:bg-purple-900 border border-purple-600/30 text-xs text-purple-200"
                    >
                      {copiedKey === 'm2' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedKey === 'm2' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                </div>

                {/* Step 3 */}
                <div>
                  <div className="text-xs font-mono font-semibold text-purple-300 mb-1.5">
                    3. RUN CRUCIBLE
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-black/60 border border-purple-900/40 font-mono text-xs sm:text-sm text-purple-200">
                    <code>/crucible Pressure-test this decision before I commit: should we choose architecture A or B?</code>
                    <button
                      onClick={() => copyToClipboard('/crucible Pressure-test this decision before I commit: should we choose architecture A or B?', 'm3')}
                      className="flex items-center gap-1 px-2.5 py-1 rounded bg-purple-950 hover:bg-purple-900 border border-purple-600/30 text-xs text-purple-200"
                    >
                      {copiedKey === 'm3' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedKey === 'm3' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                </div>

                {/* Maintenance Commands */}
                <div className="pt-4 border-t border-purple-900/30 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                  <div className="p-3 rounded-lg bg-black/40 border border-purple-900/20">
                    <span className="text-zinc-400 block mb-1">To Update:</span>
                    <p className="text-purple-300">/plugin marketplace update crucible-marketplace</p>
                    <p className="text-purple-300">/plugin update crucible@crucible-marketplace</p>
                  </div>
                  <div className="p-3 rounded-lg bg-black/40 border border-purple-900/20">
                    <span className="text-zinc-400 block mb-1">To Uninstall:</span>
                    <p className="text-purple-300">/plugin uninstall crucible@crucible-marketplace</p>
                    <p className="text-purple-300">/plugin marketplace remove crucible-marketplace</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Option B: Local clone */}
                <div>
                  <div className="text-xs font-mono font-semibold text-purple-300 mb-1.5">
                    1. CLONE REPOSITORY
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-black/60 border border-purple-900/40 font-mono text-xs sm:text-sm text-purple-200 mb-2">
                    <code>git clone https://github.com/smshahbaj/crucible.git ~/crucible</code>
                    <button
                      onClick={() => copyToClipboard('git clone https://github.com/smshahbaj/crucible.git ~/crucible', 'l1')}
                      className="flex items-center gap-1 px-2.5 py-1 rounded bg-purple-950 hover:bg-purple-900 border border-purple-600/30 text-xs text-purple-200"
                    >
                      {copiedKey === 'l1' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedKey === 'l1' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <div className="text-[11px] text-zinc-400 font-mono">
                    Windows: <code>git clone https://github.com/smshahbaj/crucible.git .\crucible</code>
                  </div>
                </div>

                {/* Option B: Start Claude Code */}
                <div>
                  <div className="text-xs font-mono font-semibold text-purple-300 mb-1.5">
                    2. LAUNCH CLAUDE CODE WITH --PLUGIN-DIR
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-black/60 border border-purple-900/40 font-mono text-xs sm:text-sm text-purple-200 mb-2">
                    <code>claude --plugin-dir ~/crucible</code>
                    <button
                      onClick={() => copyToClipboard('claude --plugin-dir ~/crucible', 'l2')}
                      className="flex items-center gap-1 px-2.5 py-1 rounded bg-purple-950 hover:bg-purple-900 border border-purple-600/30 text-xs text-purple-200"
                    >
                      {copiedKey === 'l2' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedKey === 'l2' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <div className="text-[11px] text-zinc-400 font-mono">
                    Windows: <code>claude --plugin-dir ".\crucible"</code>
                  </div>
                </div>

                <div className="p-3.5 rounded-lg bg-amber-950/30 border border-amber-500/20 text-xs text-amber-200">
                  <strong>Notice:</strong> Do not manually copy <code className="font-mono">SKILL.md</code> into your project's <code className="font-mono">.claude/skills/</code> directory. Load the plugin so its skill, agents, and references stay together.
                </div>
              </div>
            )}

            {/* Verification Info */}
            <div className="pt-4 border-t border-purple-900/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-zinc-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Verify with command: <code className="text-purple-300 font-mono bg-black/40 px-1 py-0.5 rounded">/crucible Pressure-test this decision.</code></span>
              </div>
              <span className="font-mono text-zinc-500">Standalone: <code>python3 scripts/validate.py</code></span>
            </div>

          </div>

        </div>

        {/* Troubleshooting Table (Directly from README) */}
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-sm font-semibold text-white mb-4">
            <HelpCircle className="w-4 h-4 text-purple-400" />
            <span>Troubleshooting Reference</span>
          </div>

          <div className="rounded-xl border border-purple-900/30 bg-[#090414] overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#120724] border-b border-purple-900/40 text-purple-300 font-mono uppercase tracking-wider">
                <tr>
                  <th className="py-2.5 px-4 font-semibold">Symptom</th>
                  <th className="py-2.5 px-4 font-semibold">Likely Cause</th>
                  <th className="py-2.5 px-4 font-semibold">Fix</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-950 text-zinc-300">
                {troubleshootingRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-purple-950/20 transition-colors">
                    <td className="py-3 px-4 font-mono text-purple-200 whitespace-nowrap">{row.symptom}</td>
                    <td className="py-3 px-4 text-zinc-400">{row.cause}</td>
                    <td className="py-3 px-4 text-emerald-300/90">{row.fix}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
};
