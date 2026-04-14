"use client";

import type { Category } from "@/lib/games-data";
import { categories } from "@/lib/games-data";
import { Swords, Map, Wand2, Ghost, Trophy, Globe, LayoutGrid } from "lucide-react";

const categoryIcons: Record<Category, React.ReactNode> = {
  All: <LayoutGrid size={14} />,
  Action: <Swords size={14} />,
  Adventure: <Map size={14} />,
  RPG: <Wand2 size={14} />,
  Horror: <Ghost size={14} />,
  Sports: <Trophy size={14} />,
  "Open World": <Globe size={14} />,
};

interface CategoryFilterProps {
  activeCategory: Category;
  onCategoryChange: (category: Category) => void;
  gameCounts: Record<string, number>;
}

export function CategoryFilter({
  activeCategory,
  onCategoryChange,
  gameCounts,
}: CategoryFilterProps) {
  return (
    <nav aria-label="Game categories" className="max-w-7xl mx-auto px-4 py-4">
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              aria-pressed={isActive}
              className={`flex items-center gap-1.5 shrink-0 text-sm font-medium px-4 py-2 rounded-full border transition-all duration-200 ${
                isActive
                  ? "bg-amber-500 border-amber-500 text-black"
                  : "bg-card border-border text-muted-foreground hover:text-foreground hover:border-amber-500/50"
              }`}
            >
              {categoryIcons[cat]}
              <span>{cat}</span>
              <span
                className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${
                  isActive ? "bg-black/20 text-black" : "bg-muted text-muted-foreground"
                }`}
              >
                {gameCounts[cat] ?? 0}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
