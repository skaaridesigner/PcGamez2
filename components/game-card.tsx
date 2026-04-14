"use client";

import { useState } from "react";
import Image from "next/image";
import type { Game } from "@/lib/games-data";
import { ShoppingCart, Star } from "lucide-react";
import { GameDetailModal } from "@/components/game-detail-modal";

interface GameCardProps {
  game: Game;
}

export function GameCard({ game }: GameCardProps) {
  const [showModal, setShowModal] = useState(false);
  const [added, setAdded] = useState(false);

  function handleAddToCart() {
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  const numericRating = parseFloat(game.rating);

  return (
    <>
      <article
        className="group relative flex flex-col rounded-xl overflow-hidden cursor-pointer border border-border bg-card hover:border-amber-500/60 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/10 hover:-translate-y-1"
        onClick={() => setShowModal(true)}
      >
        {/* Game Cover */}
        <div className="relative aspect-[3/4] overflow-hidden">
          <Image
            src={game.image}
            alt={`${game.title} game cover`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
          {/* Category badge */}
          <span className="absolute top-2 left-2 bg-amber-500 text-black text-xs font-bold px-2 py-0.5 rounded-full">
            {game.category}
          </span>
          {/* Age rating */}
          <span className="absolute bottom-2 left-2 bg-black/80 text-foreground text-xs font-bold px-1.5 py-0.5 rounded border border-border">
            {game.ageRating}+
          </span>
          {/* Metascore badge */}
          <span
            className={`absolute bottom-2 right-2 text-white text-xs font-bold px-1.5 py-0.5 rounded ${
              game.metascore >= 90
                ? "bg-green-600"
                : game.metascore >= 75
                ? "bg-yellow-600"
                : "bg-red-600"
            }`}
          >
            {game.metascore}
          </span>
        </div>

        {/* Card Info */}
        <div className="flex flex-col gap-1 p-3 flex-1">
          <h3 className="font-bold text-foreground text-sm leading-tight line-clamp-1">
            {game.title}
            {game.subtitle && (
              <span className="text-muted-foreground font-normal"> — {game.subtitle}</span>
            )}
          </h3>
          <p className="text-xs text-muted-foreground line-clamp-1">{game.developer}</p>

          {/* Stars */}
          <div className="flex items-center gap-1 mt-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                size={10}
                className={
                  s <= Math.round(numericRating / 2)
                    ? "text-amber-400 fill-amber-400"
                    : "text-muted-foreground"
                }
              />
            ))}
            <span className="text-xs text-muted-foreground ml-1">{game.rating}</span>
          </div>

          <div className="flex items-center justify-between mt-auto pt-2">
            <span className="text-amber-400 font-bold text-base">&#8377;{game.price}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart();
              }}
              className="flex items-center gap-1 bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold px-2.5 py-1.5 rounded-lg transition-colors"
              aria-label={`Add ${game.title} to cart`}
            >
              <ShoppingCart size={12} />
              {added ? "Added!" : "Add"}
            </button>
          </div>
        </div>
      </article>

      {showModal && (
        <GameDetailModal
          game={game}
          onClose={() => setShowModal(false)}
          onAddToCart={handleAddToCart}
          added={added}
        />
      )}
    </>
  );
}
