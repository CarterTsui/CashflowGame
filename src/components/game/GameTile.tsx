"use client";

import { useState } from "react";
import { Tile } from "@/lib/store";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface GameTileProps {
  tile: Tile;
  colorClass: string;
  playerPositions: number[];
  currentPlayerIndex: number;
  isCurrentPosition: boolean;
}

export default function GameTile({ tile, colorClass, playerPositions, currentPlayerIndex, isCurrentPosition }: GameTileProps) {
  // Map to generate player token colors
  const playerColors = [
    "bg-blue-500", "bg-red-500", "bg-yellow-500",
    "bg-purple-500", "bg-orange-500", "bg-teal-500"
  ];

  // Get players on this tile
  const playersOnTile = playerPositions
    .map((position, index) => ({ position, index }))
    .filter(player => player.position === tile.id);

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className={`relative ${colorClass} border-2 p-1 aspect-square rounded-md cursor-pointer ${
          isCurrentPosition ? 'ring-4 ring-green-400 ring-opacity-75' : ''
        }`}>
          <div className="text-white text-[10px] font-bold overflow-hidden">
            {tile.name}
          </div>

          {/* Player Tokens */}
          {playersOnTile.length > 0 && (
            <div className="absolute bottom-1 right-1 flex flex-wrap justify-end gap-1 max-w-[80%]">
              {playersOnTile.map(({ index }) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full ${playerColors[index % playerColors.length]} ${
                    index === currentPlayerIndex ? 'ring-1 ring-white' : ''
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">{tile.name}</h4>
            <p className="text-sm">{tile.description}</p>
            <div className="pt-2">
              <span className={`
                inline-flex items-center rounded-full px-2 py-1 text-xs font-medium
                ${getTileTypeClass(tile.type)}
              `}>
                {tile.type}
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

// Helper to get the appropriate class for each tile type
function getTileTypeClass(type: string): string {
  switch (type) {
    case 'income':
      return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300';
    case 'expense':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
    case 'investment':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    case 'opportunity':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
    case 'risk':
      return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
    case 'event':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
    case 'go':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
  }
}
