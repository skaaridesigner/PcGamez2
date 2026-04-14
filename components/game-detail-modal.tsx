"use client";

import { useState } from "react";
import Image from "next/image";
import type { Game } from "@/lib/games-data";
import {
  X,
  Shield,
  ShoppingCart,
  Star,
  ChevronLeft,
  ChevronRight,
  Monitor,
  Clock,
  Calendar,
  Tag,
  User,
  Cpu,
  MemoryStick,
  HardDrive,
  Layers,
} from "lucide-react";

interface GameDetailModalProps {
  game: Game;
  onClose: () => void;
  onAddToCart: () => void;
  added: boolean;
}

type Tab = "overview" | "screenshots" | "system";

function RatingBar({ label, value, max = 10 }: { label: string; value: number; max?: number }) {
  const pct = Math.round((value / max) * 100);
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-muted-foreground w-16 shrink-0">{label}</span>
      <div className="flex-1 bg-muted rounded-full h-1.5 overflow-hidden">
        <div
          className="h-full rounded-full bg-amber-400 transition-all duration-700"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs font-semibold text-foreground w-8 text-right">{value}</span>
    </div>
  );
}

function ReqRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex gap-3 py-2.5 border-b border-border last:border-0">
      <span className="text-amber-400 mt-0.5 shrink-0">{icon}</span>
      <div className="flex flex-col gap-0.5 min-w-0">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{label}</span>
        <span className="text-sm text-foreground leading-relaxed">{value}</span>
      </div>
    </div>
  );
}

export function GameDetailModal({ game, onClose, onAddToCart, added }: GameDetailModalProps) {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [activeScreenshot, setActiveScreenshot] = useState(0);

  const numericRating = parseFloat(game.rating);
  const metascoreColor =
    game.metascore >= 90
      ? "bg-green-500"
      : game.metascore >= 75
      ? "bg-yellow-500"
      : "bg-red-500";

  function prevShot() {
    setActiveScreenshot((i) => (i === 0 ? game.screenshots.length - 1 : i - 1));
  }
  function nextShot() {
    setActiveScreenshot((i) => (i === game.screenshots.length - 1 ? 0 : i + 1));
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${game.title} details`}
    >
      <div
        className="relative bg-card border border-border rounded-2xl w-full max-w-4xl max-h-[92vh] overflow-y-auto shadow-2xl shadow-black/60"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 bg-black/60 hover:bg-black/80 rounded-full p-1.5 transition-colors"
          aria-label="Close"
        >
          <X size={16} className="text-white" />
        </button>

        {/* Hero section */}
        <div className="flex flex-col sm:flex-row">
          {/* Cover */}
          <div className="relative sm:w-52 md:w-60 shrink-0 aspect-[3/4] sm:aspect-auto sm:min-h-80">
            <Image
              src={game.image}
              alt={`${game.title} cover`}
              fill
              className="object-cover rounded-t-2xl sm:rounded-l-2xl sm:rounded-tr-none"
              sizes="240px"
              priority
            />
            <div className="absolute bottom-0 left-0 right-0 sm:rounded-bl-2xl bg-gradient-to-t from-black/80 to-transparent p-3">
              <span className="text-xs font-bold bg-amber-500 text-black px-2 py-0.5 rounded-full">
                {game.category}
              </span>
            </div>
          </div>

          {/* Header info */}
          <div className="flex flex-col gap-3 p-5 flex-1 min-w-0">
            {/* Title */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-foreground text-balance leading-tight">
                {game.title}
              </h2>
              {game.subtitle && (
                <p className="text-sm text-amber-400 font-medium mt-0.5">{game.subtitle}</p>
              )}
            </div>

            {/* Meta row */}
            <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <User size={12} className="text-amber-400" />
                {game.developer}
              </span>
              <span className="flex items-center gap-1">
                <Calendar size={12} className="text-amber-400" />
                {game.releaseYear}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={12} className="text-amber-400" />
                {game.playTime}
              </span>
              <span className="flex items-center gap-1 bg-muted px-2 py-0.5 rounded-full border border-border">
                {game.ageRating}+
              </span>
            </div>

            {/* Ratings */}
            <div className="flex flex-wrap gap-3">
              {/* User Rating */}
              <div className="flex items-center gap-2 bg-muted/60 border border-border rounded-xl px-3 py-2">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      size={11}
                      className={
                        s <= Math.round(numericRating / 2)
                          ? "text-amber-400 fill-amber-400"
                          : "text-muted-foreground"
                      }
                    />
                  ))}
                </div>
                <span className="text-sm font-bold text-foreground">{game.rating}</span>
                <span className="text-xs text-muted-foreground">({game.ratingCount})</span>
              </div>

              {/* Metascore */}
              <div className="flex items-center gap-2 bg-muted/60 border border-border rounded-xl px-3 py-2">
                <span className={`${metascoreColor} text-white text-xs font-bold px-1.5 py-0.5 rounded`}>
                  {game.metascore}
                </span>
                <span className="text-xs text-muted-foreground">Metascore</span>
              </div>

              {/* User score */}
              <div className="flex items-center gap-2 bg-muted/60 border border-border rounded-xl px-3 py-2">
                <span className="text-sm font-bold text-foreground">{game.userScore}</span>
                <span className="text-xs text-muted-foreground">User Score</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5">
              {game.genre.map((g) => (
                <span
                  key={g}
                  className="flex items-center gap-1 text-xs bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2.5 py-1 rounded-full"
                >
                  <Tag size={10} />
                  {g}
                </span>
              ))}
              {game.tags.map((t) => (
                <span
                  key={t}
                  className="text-xs bg-muted text-muted-foreground border border-border px-2.5 py-1 rounded-full"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Price + CTA */}
            <div className="flex items-center justify-between mt-auto pt-2 gap-3 flex-wrap">
              <div>
                <p className="text-xs text-muted-foreground">Price</p>
                <p className="text-2xl font-bold text-amber-400">&#8377;{game.price}</p>
              </div>
              <button
                onClick={onAddToCart}
                className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black font-bold px-5 py-2.5 rounded-xl transition-colors text-sm"
              >
                <ShoppingCart size={16} />
                {added ? "Added to Cart!" : "Add to Cart"}
              </button>
            </div>
          </div>
        </div>

        {/* Legitimate notice */}
        <div className="mx-5 mb-1">
          <div className="flex items-start gap-2 bg-green-950/40 border border-green-800/50 rounded-lg px-3 py-2.5">
            <Shield size={13} className="text-green-400 mt-0.5 shrink-0" />
            <p className="text-xs text-green-300 leading-relaxed">
              <strong className="text-green-400">100% Legitimate</strong> — Official PC game key via Steam. No cracks, no piracy, no third-party accounts.
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border px-5 mt-4">
          {(["overview", "screenshots", "system"] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2.5 text-sm font-medium capitalize border-b-2 transition-colors -mb-px ${
                activeTab === tab
                  ? "border-amber-500 text-amber-400"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab === "system" ? "System Req." : tab}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="p-5">
          {/* OVERVIEW TAB */}
          {activeTab === "overview" && (
            <div className="flex flex-col gap-6">
              <div>
                <h3 className="text-sm font-bold text-foreground mb-2">About This Game</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{game.description}</p>
              </div>

              {/* Detail ratings breakdown */}
              <div>
                <h3 className="text-sm font-bold text-foreground mb-3">Rating Breakdown</h3>
                <div className="flex flex-col gap-2">
                  <RatingBar label="Overall" value={numericRating} />
                  <RatingBar label="Gameplay" value={Math.min(10, numericRating + 0.2)} />
                  <RatingBar label="Story" value={Math.min(10, numericRating - 0.1)} />
                  <RatingBar label="Graphics" value={Math.min(10, numericRating + 0.4)} />
                  <RatingBar label="Sound" value={Math.min(10, numericRating - 0.2)} />
                  <RatingBar label="Value" value={Math.min(10, numericRating - 0.3)} />
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  Based on {game.ratingCount} user reviews
                </p>
              </div>

              {/* Game info grid */}
              <div>
                <h3 className="text-sm font-bold text-foreground mb-3">Game Details</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    { label: "Developer", value: game.developer },
                    { label: "Publisher", value: game.publisher },
                    { label: "Release Year", value: String(game.releaseYear) },
                    { label: "Play Time", value: game.playTime },
                    { label: "Age Rating", value: `${game.ageRating}+` },
                    { label: "Platform", value: "PC (Steam)" },
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-muted/40 border border-border rounded-lg p-3">
                      <p className="text-xs text-muted-foreground">{label}</p>
                      <p className="text-sm font-semibold text-foreground mt-0.5 truncate">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SCREENSHOTS TAB */}
          {activeTab === "screenshots" && (
            <div className="flex flex-col gap-4">
              {/* Main viewer */}
              <div className="relative aspect-video rounded-xl overflow-hidden bg-black group">
                <Image
                  key={activeScreenshot}
                  src={game.screenshots[activeScreenshot]}
                  alt={`${game.title} screenshot ${activeScreenshot + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 896px) 100vw, 896px"
                />
                <button
                  onClick={prevShot}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 rounded-full p-1.5 transition-all opacity-0 group-hover:opacity-100"
                  aria-label="Previous screenshot"
                >
                  <ChevronLeft size={18} className="text-white" />
                </button>
                <button
                  onClick={nextShot}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 rounded-full p-1.5 transition-all opacity-0 group-hover:opacity-100"
                  aria-label="Next screenshot"
                >
                  <ChevronRight size={18} className="text-white" />
                </button>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/60 text-white text-xs px-2 py-0.5 rounded-full">
                  {activeScreenshot + 1} / {game.screenshots.length}
                </div>
              </div>

              {/* Thumbnail strip */}
              <div className="grid grid-cols-5 gap-2">
                {game.screenshots.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveScreenshot(i)}
                    className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                      i === activeScreenshot
                        ? "border-amber-500"
                        : "border-border hover:border-amber-500/50"
                    }`}
                    aria-label={`View screenshot ${i + 1}`}
                  >
                    <Image
                      src={src}
                      alt={`Thumbnail ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="120px"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* SYSTEM REQUIREMENTS TAB */}
          {activeTab === "system" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Minimum */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Monitor size={14} className="text-amber-400" />
                  <h3 className="text-sm font-bold text-foreground">Minimum Requirements</h3>
                </div>
                <div className="bg-muted/30 border border-border rounded-xl px-4 py-1">
                  <ReqRow icon={<Layers size={13} />} label="OS" value={game.minReqs.os} />
                  <ReqRow icon={<Cpu size={13} />} label="CPU" value={game.minReqs.processor} />
                  <ReqRow icon={<MemoryStick size={13} />} label="RAM" value={game.minReqs.memory} />
                  <ReqRow icon={<Monitor size={13} />} label="GPU" value={game.minReqs.graphics} />
                  <ReqRow icon={<Layers size={13} />} label="DirectX" value={game.minReqs.directX} />
                  <ReqRow icon={<HardDrive size={13} />} label="Storage" value={game.minReqs.storage} />
                  {game.minReqs.additionalNotes && (
                    <ReqRow icon={<Tag size={13} />} label="Notes" value={game.minReqs.additionalNotes} />
                  )}
                </div>
              </div>

              {/* Recommended */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Monitor size={14} className="text-green-400" />
                  <h3 className="text-sm font-bold text-foreground">Recommended Requirements</h3>
                </div>
                <div className="bg-muted/30 border border-green-800/30 rounded-xl px-4 py-1">
                  <ReqRow icon={<Layers size={13} />} label="OS" value={game.recReqs.os} />
                  <ReqRow icon={<Cpu size={13} />} label="CPU" value={game.recReqs.processor} />
                  <ReqRow icon={<MemoryStick size={13} />} label="RAM" value={game.recReqs.memory} />
                  <ReqRow icon={<Monitor size={13} />} label="GPU" value={game.recReqs.graphics} />
                  <ReqRow icon={<Layers size={13} />} label="DirectX" value={game.recReqs.directX} />
                  <ReqRow icon={<HardDrive size={13} />} label="Storage" value={game.recReqs.storage} />
                  {game.recReqs.additionalNotes && (
                    <ReqRow icon={<Tag size={13} />} label="Notes" value={game.recReqs.additionalNotes} />
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
