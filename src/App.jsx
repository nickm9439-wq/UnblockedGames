import React, { useState, useEffect } from 'react';
import initialGames from './data/games.json';
import { Header } from './components/Header.jsx';
import { CategoryFilter } from './components/CategoryFilter.jsx';
import { GameCard } from './components/GameCard.jsx';
import { GamePlayer } from './components/GamePlayer.jsx';
import { PanicOverlay } from './components/PanicOverlay.jsx';
import { TabCloakerModal } from './components/TabCloakerModal.jsx';
import { AddGameModal } from './components/AddGameModal.jsx';
import { JsonViewerModal } from './components/JsonViewerModal.jsx';
import { Gamepad2, ShieldAlert, Sparkles } from 'lucide-react';

export function App() {
  // Games state loaded from LocalStorage or games.json
  const [games, setGames] = useState(() => {
    try {
      const saved = localStorage.getItem('unblocked_games_catalog');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to parse saved games:', e);
    }
    return initialGames;
  });

  // Active playing game state
  const [activeGame, setActiveGame] = useState(null);

  // Category and search query
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Favorites state
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('unblocked_games_favorites');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return ['2048', 'snake', 'tetris'];
  });

  // Modals state
  const [isPanicActive, setIsPanicActive] = useState(false);
  const [isCloakerOpen, setIsCloakerOpen] = useState(false);
  const [isAddGameOpen, setIsAddGameOpen] = useState(false);
  const [isJsonViewerOpen, setIsJsonViewerOpen] = useState(false);

  // Tab cloaker active state
  const [activeCloak, setActiveCloak] = useState(() => {
    return localStorage.getItem('unblocked_tab_cloak') || 'default';
  });

  // Save games to LocalStorage whenever updated
  useEffect(() => {
    localStorage.setItem('unblocked_games_catalog', JSON.stringify(games));
  }, [games]);

  // Save favorites to LocalStorage
  useEffect(() => {
    localStorage.setItem('unblocked_games_favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Global Panic Hotkey Listener (~ or Escape)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '`' || e.key === '~') {
        e.preventDefault();
        setIsPanicActive((prev) => !prev);
      } else if (e.key === 'Escape' && isPanicActive) {
        setIsPanicActive(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPanicActive]);

  // Handle Tab Cloaker metadata changes
  const applyCloak = (option) => {
    setActiveCloak(option.id);
    localStorage.setItem('unblocked_tab_cloak', option.id);
    document.title = option.title;

    // Change favicon
    let favicon = document.querySelector("link[rel*='icon']");
    if (!favicon) {
      favicon = document.createElement('link');
      favicon.rel = 'shortcut icon';
      document.getElementsByTagName('head')[0].appendChild(favicon);
    }

    if (option.id === 'google-docs') {
      favicon.href = 'https://ssl.gstatic.com/docs/documents/images/kix-favicon7.ico';
    } else if (option.id === 'google-drive') {
      favicon.href = 'https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_32dp.png';
    } else if (option.id === 'canvas-lms') {
      favicon.href = 'https://du11hjcvx0uqb.cloudfront.net/dist/images/favicon-e10d657a73.ico';
    } else if (option.id === 'google-classroom') {
      favicon.href = 'https://ssl.gstatic.com/classroom/favicon.png';
    } else {
      favicon.href = '/favicon.ico';
    }
  };

  const toggleFavorite = (gameId) => {
    setFavorites((prev) =>
      prev.includes(gameId) ? prev.filter((id) => id !== gameId) : [...prev, gameId]
    );
  };

  const handleAddGame = (newGame) => {
    setGames((prev) => [newGame, ...prev]);
  };

  const handlePlayGame = (game) => {
    // Increment plays count
    setGames((prev) =>
      prev.map((g) => (g.id === game.id ? { ...g, plays: g.plays + 1 } : g))
    );
    setActiveGame(game);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetDefaultCatalog = () => {
    setGames(initialGames);
    localStorage.removeItem('unblocked_games_catalog');
  };

  // Filter games based on search, category, or favorites
  const filteredGames = games.filter((game) => {
    const matchesSearch =
      game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    if (selectedCategory === 'All') return true;
    if (selectedCategory === 'Favorites') return favorites.includes(game.id);
    return game.category === selectedCategory;
  });

  // Calculate counts per category
  const categoryCounts = games.reduce((acc, game) => {
    acc[game.category] = (acc[game.category] || 0) + 1;
    return acc;
  }, {});
  categoryCounts['All'] = games.length;
  categoryCounts['Favorites'] = favorites.length;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-black">
      {/* Panic Overlay (Stealth Mode) */}
      {isPanicActive && <PanicOverlay onClose={() => setIsPanicActive(false)} />}

      {/* Navigation Header */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenPanic={() => setIsPanicActive(true)}
        onOpenCloaker={() => setIsCloakerOpen(true)}
        onOpenAddGame={() => setIsAddGameOpen(true)}
        onOpenJsonViewer={() => setIsJsonViewerOpen(true)}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        favoritesCount={favorites.length}
        totalGamesCount={games.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-6 space-y-6">
        {/* Active Game Player Mode */}
        {activeGame ? (
          <GamePlayer
            game={activeGame}
            onBack={() => setActiveGame(null)}
            isFavorite={favorites.includes(activeGame.id)}
            onToggleFavorite={toggleFavorite}
            onOpenPanic={() => setIsPanicActive(true)}
          />
        ) : (
          <>
            {/* Category Filter Pills Bar */}
            <CategoryFilter
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              categoryCounts={categoryCounts}
            />

            {/* Featured Hero Banner if "All" selected & no search */}
            {selectedCategory === 'All' && !searchQuery && (
              <div className="bg-gradient-to-r from-zinc-900 via-zinc-900/90 to-emerald-950/40 border border-zinc-800/80 rounded-3xl p-6 lg:p-8 relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 max-w-2xl space-y-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold rounded-full">
                    <Sparkles size={14} />
                    <span>HTML5 & JS Iframe Games Catalog</span>
                  </div>
                  <h1 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                    Play Unblocked Games Anywhere, Anytime
                  </h1>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    No downloads, no restrictions. All games are securely stored as HTML iframe embeds inside a light <code className="text-amber-300 font-mono">games.json</code> file. Includes instant Panic key (<kbd className="px-1 bg-zinc-800 rounded">~</kbd>) and tab disguises.
                  </p>

                  <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-zinc-300 font-medium">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> 100% Unblocked
                    </span>
                    <span className="text-zinc-600">•</span>
                    <span>Offline JSON Storage</span>
                    <span className="text-zinc-600">•</span>
                    <span>School Safe Cloaker</span>
                  </div>
                </div>
              </div>
            )}

            {/* Games Grid Heading */}
            <div className="flex items-center justify-between pt-2">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Gamepad2 size={20} className="text-emerald-400" />
                <span>
                  {selectedCategory === 'All'
                    ? 'All Unblocked Games'
                    : selectedCategory === 'Favorites'
                    ? 'Your Favorite Games'
                    : `${selectedCategory} Games`}
                </span>
                <span className="text-xs text-zinc-500 font-mono font-normal">
                  ({filteredGames.length})
                </span>
              </h2>

              {searchQuery && (
                <span className="text-xs text-zinc-400">
                  Showing results for "{searchQuery}"
                </span>
              )}
            </div>

            {/* Games Grid */}
            {filteredGames.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredGames.map((game) => (
                  <GameCard
                    key={game.id}
                    game={game}
                    onPlay={handlePlayGame}
                    isFavorite={favorites.includes(game.id)}
                    onToggleFavorite={toggleFavorite}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-12 text-center max-w-md mx-auto space-y-3">
                <div className="text-4xl">🔍</div>
                <h3 className="text-base font-bold text-white">No games found</h3>
                <p className="text-xs text-zinc-400">
                  Try searching for another title, or add a custom iframe game to your games.json file!
                </p>
                <button
                  onClick={() => setIsAddGameOpen(true)}
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold rounded-xl transition-all"
                >
                  + Add Custom Game
                </button>
              </div>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-zinc-800/80 bg-zinc-950/80 py-8 px-4 lg:px-8 text-center text-xs text-zinc-500 space-y-2">
        <div className="flex items-center justify-center gap-4 text-zinc-400 font-medium">
          <button onClick={() => setIsCloakerOpen(true)} className="hover:text-emerald-400">
            Tab Cloaker
          </button>
          <span>•</span>
          <button onClick={() => setIsPanicActive(true)} className="hover:text-red-400">
            Panic Screen (Esc)
          </button>
          <span>•</span>
          <button onClick={() => setIsJsonViewerOpen(true)} className="hover:text-amber-400">
            View games.json
          </button>
        </div>
        <p>Unblocked Games Hub • Iframe JSON Catalog Engine • Built for HTML, JS & CSS</p>
      </footer>

      {/* Modals */}
      <TabCloakerModal
        isOpen={isCloakerOpen}
        onClose={() => setIsCloakerOpen(false)}
        activeCloak={activeCloak}
        onSelectCloak={applyCloak}
      />

      <AddGameModal
        isOpen={isAddGameOpen}
        onClose={() => setIsAddGameOpen(false)}
        onAddGame={handleAddGame}
      />

      <JsonViewerModal
        isOpen={isJsonViewerOpen}
        onClose={() => setIsJsonViewerOpen(false)}
        games={games}
        onUpdateGamesJson={(updated) => setGames(updated)}
        onResetDefault={handleResetDefaultCatalog}
      />
    </div>
  );
}

export default App;
