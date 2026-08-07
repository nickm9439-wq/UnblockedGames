import React, { useState } from 'react';
import { X, Copy, Check, FileJson, Download, RefreshCw } from 'lucide-react';

export const JsonViewerModal = ({
  isOpen,
  onClose,
  games,
  onUpdateGamesJson,
  onResetDefault,
}) => {
  const [copied, setCopied] = useState(false);
  const [jsonString, setJsonString] = useState(() => JSON.stringify(games, null, 2));
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(games, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveJson = () => {
    try {
      const parsed = JSON.parse(jsonString);
      if (!Array.isArray(parsed)) {
        setError('JSON must be an array of game objects.');
        return;
      }
      onUpdateGamesJson(parsed);
      setIsEditing(false);
      setError('');
    } catch (err) {
      setError('Invalid JSON syntax. Please check formatting.');
    }
  };

  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(games, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'games.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-3xl p-6 shadow-2xl flex flex-col max-h-[85vh]">
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
          <div className="flex items-center gap-2 text-amber-400 font-semibold text-lg">
            <FileJson size={22} />
            <span>games.json File Inspector</span>
            <span className="text-xs bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded-full font-mono">
              {games.length} games stored
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-zinc-800 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="py-3 flex items-center justify-between text-xs text-zinc-400">
          <p>
            Each game entry is stored as an object containing title, category, and full{' '}
            <code className="text-amber-300 font-mono">&lt;iframe&gt;</code> code.
          </p>
          <div className="flex items-center gap-2">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors font-medium"
              >
                Edit Raw JSON
              </button>
            ) : (
              <button
                onClick={handleSaveJson}
                className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-black font-semibold rounded-lg transition-colors"
              >
                Apply JSON Changes
              </button>
            )}
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors flex items-center gap-1"
            >
              {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
              {copied ? 'Copied!' : 'Copy JSON'}
            </button>
            <button
              onClick={handleDownload}
              className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors flex items-center gap-1"
              title="Download games.json file"
            >
              <Download size={14} /> Download
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-3 p-2.5 bg-red-500/10 border border-red-500/30 text-red-400 text-xs rounded-lg">
            {error}
          </div>
        )}

        <div className="flex-1 min-h-[300px] overflow-hidden bg-zinc-950 rounded-xl border border-zinc-800 p-4 font-mono text-xs text-amber-200/90 overflow-y-auto">
          {isEditing ? (
            <textarea
              value={jsonString}
              onChange={(e) => setJsonString(e.target.value)}
              className="w-full h-full bg-transparent text-amber-300 outline-none resize-none font-mono"
            />
          ) : (
            <pre className="whitespace-pre-wrap break-all select-all">
              {JSON.stringify(games, null, 2)}
            </pre>
          )}
        </div>

        <div className="mt-4 pt-3 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-500">
          <button
            onClick={() => {
              if (confirm('Reset games.json catalog back to default?')) {
                onResetDefault();
                setJsonString(JSON.stringify(games, null, 2));
              }
            }}
            className="flex items-center gap-1 text-zinc-400 hover:text-red-400 transition-colors"
          >
            <RefreshCw size={13} /> Reset to Default Catalog
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
