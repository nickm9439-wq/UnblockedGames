import React from 'react';
import { X, ShieldCheck, Check } from 'lucide-react';

export const CLOAK_OPTIONS = [
  {
    id: 'default',
    name: 'Default',
    title: 'Unblocked Games Hub',
    icon: '🎮',
  },
  {
    id: 'google-docs',
    name: 'Google Docs',
    title: 'Untitled document - Google Docs',
    icon: '📄',
  },
  {
    id: 'google-drive',
    name: 'Google Drive',
    title: 'My Drive - Google Drive',
    icon: '📁',
  },
  {
    id: 'canvas-lms',
    name: 'Canvas LMS',
    title: 'Dashboard | Canvas',
    icon: '🎓',
  },
  {
    id: 'google-classroom',
    name: 'Google Classroom',
    title: 'Classes | Google Classroom',
    icon: '🏫',
  },
  {
    id: 'calculator',
    name: 'Desmos Calculator',
    title: 'Desmos | Scientific Calculator',
    icon: '🧮',
  },
  {
    id: 'wikipedia',
    name: 'Wikipedia',
    title: 'Industrial Revolution - Wikipedia',
    icon: '🌐',
  },
];

export const TabCloakerModal = ({
  isOpen,
  onClose,
  activeCloak,
  onSelectCloak,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-md p-6 shadow-2xl">
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
          <div className="flex items-center gap-2 text-emerald-400 font-semibold text-lg">
            <ShieldCheck size={22} />
            <span>Tab Cloaker (Stealth Mask)</span>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-zinc-800 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <p className="text-zinc-400 text-sm mt-3 mb-4">
          Choose a disguise to change your browser tab title and icon to match school work apps!
        </p>

        <div className="space-y-2 max-h-[320px] overflow-y-auto pr-1">
          {CLOAK_OPTIONS.map((option) => {
            const isSelected = activeCloak === option.id;
            return (
              <button
                key={option.id}
                onClick={() => {
                  onSelectCloak(option);
                  onClose();
                }}
                className={`w-full flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                  isSelected
                    ? 'bg-emerald-500/10 border-emerald-500/50 text-white'
                    : 'bg-zinc-800/50 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center gap-3 text-left">
                  <span className="text-2xl">{option.icon}</span>
                  <div>
                    <div className="font-medium text-sm text-white">{option.name}</div>
                    <div className="text-xs text-zinc-400 font-mono truncate max-w-[220px]">
                      {option.title}
                    </div>
                  </div>
                </div>
                {isSelected && (
                  <span className="bg-emerald-500 text-black p-1 rounded-full text-xs">
                    <Check size={14} />
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-6 pt-4 border-t border-zinc-800 flex justify-between items-center text-xs text-zinc-400">
          <span>Tip: Press <kbd className="px-1.5 py-0.5 bg-zinc-800 border border-zinc-700 rounded text-zinc-200">~</kbd> for instant panic screen</span>
          <button
            onClick={onClose}
            className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-xl text-xs font-medium transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
