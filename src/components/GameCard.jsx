import React from 'react';
import { Star, Play, Flame } from 'lucide-react';

export const GameCard = ({
  game,
  onPlay,
  isFavorite,
  onToggleFavorite,
}) => {
  return (
    <div
      onClick={() => onPlay(game)}
      className="group bg-zinc-900/80 hover:bg-zinc-900 border border-zinc-800 hover:border-emerald-500/40 rounded-2xl p-4 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/5 hover:-translate-y-1 flex flex-col justify-between cursor-pointer relative overflow-hidden"
    >
      {/* Top badges & Favorite button */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] font-semibold text-zinc-400 bg-zinc-800/80 border border-zinc-700/50 px-2.5 py-0.5 rounded-full font-mono">
            {game.category}
          </span>
          <div className="flex items-center gap-1.5">
            {game.featured && (
              <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1">
                <Flame size={12} /> HOT
              </span>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(game.id);
              }}
              className="p-1.5 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 text-zinc-400 hover:text-amber-400 transition-colors"
              title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Star
                size={16}
                className={isFavorite ? 'fill-amber-400 text-amber-400' : ''}
              />
            </button>
          </div>
        </div>

        {/* Thumbnail Emoji & Main Content */}
        <div className="flex items-start gap-3.5 mb-3">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-850 border border-zinc-700/60 flex items-center justify-center text-3xl shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-inner">
            {game.thumbnail || '🎮'}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-bold text-white text-base group-hover:text-emerald-400 transition-colors truncate">
              {game.title}
            </h3>
            <p className="text-xs text-zinc-400 line-clamp-2 mt-0.5 leading-relaxed">
              {game.description}
            </p>
          </div>
        </div>
      </div>

      {/* Footer stats & Play Action */}
      <div className="pt-3 border-t border-zinc-800/60 flex items-center justify-between mt-2">
        <div className="flex items-center gap-3 text-xs text-zinc-400 font-mono">
          <span className="flex items-center gap-1 text-amber-400">
            <Star size={13} className="fill-amber-400" />
            <span>{game.rating.toFixed(1)}</span>
          </span>
          <span>•</span>
          <span>{game.plays.toLocaleString()} plays</span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onPlay(game);
          }}
          className="flex items-center gap-1 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-black border border-emerald-500/30 hover:border-emerald-500 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm group-hover:bg-emerald-500 group-hover:text-black"
        >
          <Play size={14} className="fill-current" />
          <span>Play</span>
        </button>
      </div>
    </div>
  );
};
