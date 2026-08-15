import React, { useState } from 'react';
import { X, Terminal, Copy, Check, ExternalLink } from 'lucide-react';

interface InstallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InstallModal: React.FC<InstallModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState<string | null>(null);

  if (!isOpen) return null;

  const copy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-xl p-6 sm:p-8 rounded-xl bg-[#0c0618] border border-purple-500/30 shadow-2xl text-left">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-purple-900/30">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-purple-950/60 border border-purple-800/40 text-purple-300">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white font-display">
                Install Crucible Plugin
              </h3>
              <p className="text-xs text-zinc-400">
                Official release v1.0.0 for Claude Code
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-zinc-400 hover:text-white rounded-lg hover:bg-purple-950/40 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Steps */}
        <div className="space-y-4 text-xs font-mono">
          <div>
            <div className="text-purple-300 font-semibold mb-1">
              Step 1: Add the Marketplace in Claude Code
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-black/60 border border-purple-900/40 text-purple-200">
              <span className="truncate">/plugin marketplace add smshahbaj/crucible</span>
              <button
                onClick={() => copy('/plugin marketplace add smshahbaj/crucible', 's1')}
                className="ml-2 flex items-center gap-1 px-2.5 py-1 rounded bg-purple-950 hover:bg-purple-900 border border-purple-600/30 text-[11px] text-purple-200 shrink-0"
              >
                {copied === 's1' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied === 's1' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          <div>
            <div className="text-purple-300 font-semibold mb-1">
              Step 2: Install Crucible
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-black/60 border border-purple-900/40 text-purple-200">
              <span className="truncate">/plugin install crucible@crucible-marketplace</span>
              <button
                onClick={() => copy('/plugin install crucible@crucible-marketplace', 's2')}
                className="ml-2 flex items-center gap-1 px-2.5 py-1 rounded bg-purple-950 hover:bg-purple-900 border border-purple-600/30 text-[11px] text-purple-200 shrink-0"
              >
                {copied === 's2' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied === 's2' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          <div>
            <div className="text-purple-300 font-semibold mb-1">
              Step 3: Run /crucible
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-black/60 border border-purple-900/40 text-purple-200">
              <span className="truncate">/crucible Pressure-test this decision: should we choose architecture A or B?</span>
              <button
                onClick={() => copy('/crucible Pressure-test this decision: should we choose architecture A or B?', 's3')}
                className="ml-2 flex items-center gap-1 px-2.5 py-1 rounded bg-purple-950 hover:bg-purple-900 border border-purple-600/30 text-[11px] text-purple-200 shrink-0"
              >
                {copied === 's3' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied === 's3' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-purple-900/30 flex items-center justify-between text-xs">
          <a
            href="https://github.com/smshahbaj/crucible"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-purple-400 hover:text-purple-300 font-medium"
          >
            <span>View README on GitHub</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-medium transition-colors"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
