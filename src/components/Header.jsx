import React from 'react';
import {
  Gamepad2,
  Search,
  ShieldAlert,
  ShieldCheck,
  Plus,
  FileJson,
  Star,
  X,
} from 'lucide-react';

export const Header = ({
  searchQuery,
  onSearchChange,
  onOpenPanic,
  onOpenCloaker,
  onOpenAddGame,
  onOpenJsonViewer,
  selectedCategory,
  onSelectCategory,
  favoritesCount,
  totalGamesCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/80 px-4 lg:px-8 py-3 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        {/* Brand & Stats */}
        <div className="flex items-center justify-between">
          <div
            onClick={() => onSelectCategory('All')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-zinc-950 rounded-[10px] flex items-center justify-center text-emerald-400">
                <Gamepad2 size={24} />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                  UNBLOCKED
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  HUB
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 font-medium flex items-center gap-2">
                <span>{totalGamesCount} Iframe Games</span>
                <span className="text-zinc-600">•</span>
                <span className="text-emerald-400 font-mono">100% Free & Working</span>
              </p>
            </div>
          </div>

          {/* Mobile Panic Shortcut */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={onOpenPanic}
              className="bg-red-500/20 text-red-400 border border-red-500/30 p-2 rounded-xl text-xs font-bold flex items-center gap-1 active:scale-95"
              title="Stealth Panic Screen (~)"
            >
              <ShieldAlert size={16} />
              <span>PANIC</span>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-md relative">
          <div className="relative flex items-center">
            <Search
              size={18}
              className="absolute left-3.5 text-zinc-400 pointer-events-none"
            />
            <input
              type="text"
              placeholder="Search 2048, Snake, Tetris, Puzzle..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-zinc-900/90 border border-zinc-800 rounded-xl pl-10 pr-9 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 text-zinc-400 hover:text-white p-0.5 rounded-full hover:bg-zinc-800"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Action Controls Toolbar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          {/* Favorites Filter */}
          <button
            onClick={() =>
              onSelectCategory(selectedCategory === 'Favorites' ? 'All' : 'Favorites')
            }
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all whitespace-nowrap ${
              selectedCategory === 'Favorites'
                ? 'bg-amber-500/20 border-amber-500/50 text-amber-300 shadow-md shadow-amber-500/10'
                : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:border-zinc-700'
            }`}
          >
            <Star
              size={15}
              className={selectedCategory === 'Favorites' ? 'fill-amber-400 text-amber-400' : 'text-amber-400'}
            />
            <span>Favorites</span>
            {favoritesCount > 0 && (
              <span className="bg-amber-500/20 text-amber-300 font-mono text-[10px] px-1.5 py-0.2 rounded-full">
                {favoritesCount}
              </span>
            )}
          </button>

          {/* Add Game */}
          <button
            onClick={onOpenAddGame}
            className="flex items-center gap-1.5 px-3 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-200 rounded-xl text-xs font-semibold transition-all whitespace-nowrap"
            title="Add a custom game iframe to games.json"
          >
            <Plus size={15} className="text-emerald-400" />
            <span className="hidden sm:inline">Add Game</span>
          </button>

          {/* JSON Inspector */}
          <button
            onClick={onOpenJsonViewer}
            className="flex items-center gap-1.5 px-3 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-200 rounded-xl text-xs font-semibold transition-all whitespace-nowrap"
            title="Inspect games.json file"
          >
            <FileJson size={15} className="text-amber-400" />
            <span className="hidden sm:inline">games.json</span>
          </button>

          {/* Tab Cloaker */}
          <button
            onClick={onOpenCloaker}
            className="flex items-center gap-1.5 px-3 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-200 rounded-xl text-xs font-semibold transition-all whitespace-nowrap"
            title="Disguise tab title as Google Docs or Canvas"
          >
            <ShieldCheck size={15} className="text-emerald-400" />
            <span className="hidden lg:inline">Cloak Tab</span>
          </button>

          {/* Panic Button */}
          <button
            onClick={onOpenPanic}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-red-600/20 transition-all whitespace-nowrap active:scale-95"
            title="Instant Stealth Google Docs Screen (Hotkey: ~ / Esc)"
          >
            <ShieldAlert size={15} />
            <span>PANIC (Esc)</span>
          </button>
        </div>
      </div>
    </header>
  );
};
