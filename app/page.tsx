"use client";

import { useState, useMemo } from "react";
import { games, categories } from "@/lib/games-data";
import type { Category } from "@/lib/games-data";
import { StoreHeader } from "@/components/store-header";
import { CategoryFilter } from "@/components/category-filter";
import { GameCard } from "@/components/game-card";
import { PackageSearch } from "lucide-react";

export default function StorePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filteredGames = useMemo(() => {
    return games.filter((game) => {
      const matchesCategory =
        activeCategory === "All" || game.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        game.title.toLowerCase().includes(q) ||
        game.developer.toLowerCase().includes(q) ||
        game.category.toLowerCase().includes(q) ||
        game.tags.some((tag) => tag.toLowerCase().includes(q)) ||
        (game.subtitle?.toLowerCase().includes(q) ?? false);
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  const gameCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const cat of categories) {
      counts[cat] =
        cat === "All"
          ? games.length
          : games.filter((g) => g.category === cat).length;
    }
    return counts;
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <StoreHeader searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <main>
        <CategoryFilter
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          gameCounts={gameCounts}
        />

        <section className="max-w-7xl mx-auto px-4 pb-12">
          {/* Results summary */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-muted-foreground">
              {filteredGames.length === 0
                ? "No games found"
                : `${filteredGames.length} game${filteredGames.length === 1 ? "" : "s"} found`}
              {activeCategory !== "All" && (
                <span className="text-amber-500 font-medium"> in {activeCategory}</span>
              )}
              {searchQuery && (
                <span>
                  {" "}
                  for{" "}
                  <span className="text-foreground font-medium">
                    &ldquo;{searchQuery}&rdquo;
                  </span>
                </span>
              )}
            </p>
            {(searchQuery || activeCategory !== "All") && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("All");
                }}
                className="text-xs text-amber-500 hover:text-amber-400 font-medium transition-colors"
              >
                Clear filters
              </button>
            )}
          </div>

          {/* Game Grid */}
          {filteredGames.length > 0 ? (
            <ul
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
              aria-label="Games list"
            >
              {filteredGames.map((game) => (
                <li key={game.id}>
                  <GameCard game={game} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <PackageSearch size={48} className="text-muted-foreground" />
              <div className="text-center">
                <p className="text-foreground font-semibold text-lg">No games found</p>
                <p className="text-muted-foreground text-sm mt-1">
                  Try a different search term or browse all categories.
                </p>
              </div>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("All");
                }}
                className="bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm px-5 py-2 rounded-xl transition-colors"
              >
                Browse All Games
              </button>
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center">
          <p className="text-xs text-muted-foreground">
            GameVault &mdash; All games are 100% official and legitimate. No cracks, no piracy,
            no third-party Steam accounts. &copy; {new Date().getFullYear()} GameVault.
          </p>
        </div>
      </footer>
    </div>
  );
}
