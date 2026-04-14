"use client";

import { Search, ShoppingCart, Shield, Gamepad2 } from "lucide-react";

interface StoreHeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export function StoreHeader({ searchQuery, onSearchChange }: StoreHeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-card/90 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 py-3">
        {/* Top row: Logo + Trust badge + Cart */}
        <div className="flex items-center justify-between gap-4 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="bg-amber-500 p-1.5 rounded-lg">
              <Gamepad2 size={20} className="text-black" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground leading-none">GameVault</h1>
              <p className="text-xs text-muted-foreground leading-none mt-0.5">PC Games Store</p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 bg-green-950/50 border border-green-800/50 rounded-full px-3 py-1.5">
            <Shield size={12} className="text-green-400" />
            <span className="text-xs text-green-300 font-medium">100% Official &amp; Legitimate</span>
          </div>

          <button
            className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm px-3 py-2 rounded-lg transition-colors"
            aria-label="View cart"
          >
            <ShoppingCart size={16} />
            <span className="hidden sm:inline">Cart</span>
          </button>
        </div>

        {/* Search bar */}
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search games by title, genre, developer..."
            className="w-full bg-muted border border-border rounded-xl pl-9 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/60 transition-colors"
            aria-label="Search games"
          />
        </div>
      </div>
    </header>
  );
}
