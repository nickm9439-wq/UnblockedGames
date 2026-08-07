import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft,
  Maximize2,
  Minimize2,
  RotateCcw,
  Star,
  ShieldAlert,
  Share2,
  Check,
  Code2,
} from 'lucide-react';

export const GamePlayer = ({
  game,
  onBack,
  isFavorite,
  onToggleFavorite,
  onOpenPanic,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [key, setKey] = useState(0); // For reloading iframe
  const iframeContainerRef = useRef(null);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!iframeContainerRef.current) return;

    if (!document.fullscreenElement) {
      iframeContainerRef.current.requestFullscreen().catch((err) => {
        console.error('Fullscreen request failed:', err);
      });
    } else {
      document.exitFullscreen().catch((err) => {
        console.error('Exit fullscreen failed:', err);
      });
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReload = () => {
    setKey((prev) => prev + 1);
  };

  return (
    <div className="flex flex-col gap-4 max-w-7xl mx-auto w-full animate-fadeIn">
      {/* Top Bar Navigation */}
      <div className="flex items-center justify-between bg-zinc-900 border border-zinc-800 rounded-2xl p-4 shadow-xl">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Back to Games</span>
          </button>
          <div className="h-6 w-px bg-zinc-800" />
          <div className="flex items-center gap-2">
            <span className="text-2xl">{game.thumbnail || '🎮'}</span>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span>{game.title}</span>
                <span className="text-[10px] font-mono font-normal bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                  Iframe
                </span>
              </h2>
              <p className="text-xs text-zinc-400">{game.category} • {game.plays.toLocaleString()} plays</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onToggleFavorite(game.id)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
              isFavorite
                ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
                : 'bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700'
            }`}
          >
            <Star size={15} className={isFavorite ? 'fill-amber-400 text-amber-400' : ''} />
            <span className="hidden sm:inline">{isFavorite ? 'Favorited' : 'Favorite'}</span>
          </button>

          <button
            onClick={handleReload}
            className="p-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl transition-colors"
            title="Reload Game Iframe"
          >
            <RotateCcw size={16} />
          </button>

          <button
            onClick={handleShare}
            className="p-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl transition-colors"
            title="Share Game"
          >
            {copied ? <Check size={16} className="text-emerald-400" /> : <Share2 size={16} />}
          </button>

          <button
            onClick={() => setShowCode(!showCode)}
            className={`p-2 rounded-xl transition-colors ${
              showCode ? 'bg-amber-500/20 text-amber-400' : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300'
            }`}
            title="View Raw JSON Iframe Code"
          >
            <Code2 size={16} />
          </button>

          <button
            onClick={toggleFullscreen}
            className="flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-400 text-black px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-md shadow-emerald-500/20"
          >
            {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            <span className="hidden sm:inline">{isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}</span>
          </button>

          <button
            onClick={onOpenPanic}
            className="p-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-500/30 rounded-xl transition-colors"
            title="Instant Panic Screen (~)"
          >
            <ShieldAlert size={16} />
          </button>
        </div>
      </div>

      {/* Raw Code Inspector Toggle */}
      {showCode && (
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-3 font-mono text-xs text-amber-300 animate-fadeIn">
          <div className="text-zinc-500 text-[11px] mb-1 font-sans">
            Raw HTML Iframe string stored in games.json:
          </div>
          <code className="break-all select-all">{game.iframeCode}</code>
        </div>
      )}

      {/* Main Game Iframe Stage */}
      <div
        ref={iframeContainerRef}
        className="relative w-full aspect-video min-h-[500px] max-h-[720px] bg-black rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl flex items-center justify-center"
      >
        <div
          key={key}
          className="w-full h-full"
          dangerouslySetInnerHTML={{ __html: game.iframeCode }}
        />
      </div>

      {/* Game Metadata & Controls Panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
          <h3 className="text-sm font-bold text-white mb-2">About {game.title}</h3>
          <p className="text-sm text-zinc-300 leading-relaxed mb-4">{game.description}</p>
          <div className="flex flex-wrap gap-2">
            {game.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] bg-zinc-800 text-zinc-400 px-2.5 py-1 rounded-lg border border-zinc-700/50"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-white mb-3">Controls</h3>
            <div className="space-y-2">
              {game.controls.map((control, idx) => (
                <div
                  key={idx}
                  className="bg-zinc-800/80 border border-zinc-700/50 px-3 py-2 rounded-xl text-xs font-mono text-emerald-400 flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>{control}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-zinc-800 text-[11px] text-zinc-500 flex justify-between items-center">
            <span>Embedded via JSON iframe</span>
            <span className="font-mono text-emerald-400">FPS: 60</span>
          </div>
        </div>
      </div>
    </div>
  );
};
