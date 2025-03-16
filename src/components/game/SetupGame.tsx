"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useGameStore } from "@/lib/store";
import GameBoard from "./GameBoard";
import { PlusIcon, TrashIcon, PlayIcon } from "@radix-ui/react-icons";

export default function SetupGame() {
  const { gameStarted, initializeGame, resetGame } = useGameStore();
  const [players, setPlayers] = useState<string[]>(['Player 1', 'Player 2']);
  const [currentInput, setCurrentInput] = useState('');

  const handleAddPlayer = () => {
    if (currentInput.trim() && players.length < 6) {
      setPlayers([...players, currentInput.trim()]);
      setCurrentInput('');
    }
  };

  const handleRemovePlayer = (index: number) => {
    if (players.length > 2) {
      setPlayers(players.filter((_, i) => i !== index));
    }
  };

  const handleUpdatePlayer = (index: number, name: string) => {
    const updatedPlayers = [...players];
    updatedPlayers[index] = name;
    setPlayers(updatedPlayers);
  };

  const handleStartGame = () => {
    if (players.length >= 2) {
      // Filter out empty player names
      const validPlayers = players.filter(p => p.trim() !== '');
      if (validPlayers.length >= 2) {
        initializeGame(validPlayers);
      }
    }
  };

  if (gameStarted) {
    return <GameBoard onResetGame={resetGame} />;
  }

  return (
    <div className="max-w-lg mx-auto">
      <Card className="bg-white dark:bg-gray-800 shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl text-green-700 dark:text-green-300">
            Game Setup
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-3 text-green-600 dark:text-green-400">
              Players (2-6)
            </h3>
            <div className="space-y-3">
              {players.map((player, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    value={player}
                    onChange={(e) => handleUpdatePlayer(index, e.target.value)}
                    placeholder={`Player ${index + 1}`}
                    className="flex-1"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    disabled={players.length <= 2}
                    onClick={() => handleRemovePlayer(index)}
                  >
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {players.length < 6 && (
            <div className="flex gap-2">
              <Input
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                placeholder="New player name"
                className="flex-1"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleAddPlayer();
                  }
                }}
              />
              <Button
                onClick={handleAddPlayer}
                disabled={!currentInput.trim() || players.length >= 6}
                className="bg-green-600 hover:bg-green-700"
              >
                <PlusIcon className="h-4 w-4 mr-1" /> Add
              </Button>
            </div>
          )}

          <div className="space-y-2">
            <h3 className="text-lg font-medium mb-1 text-green-600 dark:text-green-400">
              Game Rules
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              • Each player starts with $2,000 cash
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              • You earn a salary of $1,000 each round
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              • Regular expenses are $500 per round
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              • First player to achieve $5,000 in passive income wins
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleStartGame}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-lg"
            disabled={players.filter(p => p.trim() !== '').length < 2}
          >
            <PlayIcon className="h-5 w-5 mr-2" /> Start Game
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
