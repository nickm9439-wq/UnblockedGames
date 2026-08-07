import React from 'react';
import { CATEGORIES } from '../types.js';
import {
  Gamepad2,
  Sparkles,
  Puzzle,
  Zap,
  RotateCcw,
  Trophy,
  Brain,
  Coffee,
  Star,
} from 'lucide-react';

export const CategoryFilter = ({
  selectedCategory,
  onSelectCategory,
  categoryCounts,
}) => {
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'All':
        return <Sparkles size={14} />;
      case 'Arcade':
        return <Gamepad2 size={14} />;
      case 'Puzzle':
        return <Puzzle size={14} />;
      case 'Action':
        return <Zap size={14} />;
      case 'Retro':
        return <RotateCcw size={14} />;
      case 'Sports':
        return <Trophy size={14} />;
      case 'Strategy':
        return <Brain size={14} />;
      case 'Casual':
        return <Coffee size={14} />;
      case 'Favorites':
        return <Star size={14} className="fill-amber-400 text-amber-400" />;
      default:
        return <Gamepad2 size={14} />;
    }
  };

  return (
    <div className="flex items-center gap-2 overflow-x-auto py-2 no-scrollbar scroll-smooth">
      {CATEGORIES.map((category) => {
        const isSelected = selectedCategory === category;
        const count = categoryCounts[category] || 0;

        return (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all whitespace-nowrap ${
              isSelected
                ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400 shadow-md shadow-emerald-500/5'
                : 'bg-zinc-900/60 border-zinc-800/80 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60 hover:border-zinc-700'
            }`}
          >
            <span className={isSelected ? 'text-emerald-400' : 'text-zinc-400'}>
              {getCategoryIcon(category)}
            </span>
            <span>{category}</span>
            <span
              className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                isSelected
                  ? 'bg-emerald-500/20 text-emerald-300'
                  : 'bg-zinc-800 text-zinc-500'
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
};
