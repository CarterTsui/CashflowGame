"use client";

import { useState } from "react";
import { useGameStore, Player, TileType, Asset, HistoryEvent } from "@/lib/store";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import {
  HomeIcon,
  RocketIcon,
  PlusIcon,
  MinusIcon,
  ReloadIcon,
  ExclamationTriangleIcon,
  BarChartIcon,
  CheckIcon,
  Cross1Icon,
  ChevronDownIcon
} from "@radix-ui/react-icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PlayerDashboard from "./PlayerDashboard";
import GameTile from "./GameTile";
import DiceRoll from "./DiceRoll";

// Define color map for tile types
const tileColorMap: Record<TileType, string> = {
  [TileType.Go]: "bg-green-600 border-green-700",
  [TileType.Income]: "bg-emerald-500 border-emerald-600",
  [TileType.Expense]: "bg-red-500 border-red-600",
  [TileType.Investment]: "bg-blue-500 border-blue-600",
  [TileType.Opportunity]: "bg-purple-500 border-purple-600",
  [TileType.Risk]: "bg-orange-500 border-orange-600",
  [TileType.Event]: "bg-yellow-500 border-yellow-600",
};

// Interface for the props
interface GameBoardProps {
  onResetGame: () => void;
}

export default function GameBoard({ onResetGame }: GameBoardProps) {
  const {
    players,
    currentPlayerIndex,
    tiles,
    gameFinished,
    winner,
    rollDice,
    endTurn,
    availableAssets,
    buyAsset,
    sellAsset,
    round,
    marketCondition,
    freedomAmount,
  } = useGameStore();

  const [diceValue, setDiceValue] = useState<number | null>(null);
  const [showDiceRoll, setShowDiceRoll] = useState(false);
  const [showAssetStore, setShowAssetStore] = useState(false);
  const [selectedAssetType, setSelectedAssetType] = useState<'realestate' | 'stock' | 'business' | 'sidehustle' | 'all'>('all');
  const [showGameOverDialog, setShowGameOverDialog] = useState(gameFinished);

  const currentPlayer = players[currentPlayerIndex];

  // Calculate the passive income percentage toward the win condition
  const calculatePassiveIncomeProgress = (player: Player) => {
    return Math.min(100, (player.passiveIncome / freedomAmount) * 100);
  };

  // Get player initials for the avatar
  const getPlayerInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  // Filter assets based on selected type
  const filteredAssets = selectedAssetType === 'all'
    ? availableAssets
    : availableAssets.filter(asset => asset.type === selectedAssetType);

  // Handle dice roll
  const handleDiceRoll = () => {
    setShowDiceRoll(true);
    // We'll handle the actual roll in the DiceRoll component
  };

  // Handle dice roll completion
  const handleDiceRollComplete = (value: number) => {
    setDiceValue(value);
    setShowDiceRoll(false);
    rollDice(value);
  };

  // Handle end turn
  const handleEndTurn = () => {
    endTurn();
    setDiceValue(null);
  };

  // Check if game is over when the component renders
  if (gameFinished && !showGameOverDialog) {
    setShowGameOverDialog(true);
  }

  return (
    <div className="game-board">
      {/* Market Condition Banner */}
      <div className={`mb-4 p-2 text-center text-white rounded-md font-medium ${
        marketCondition === 'bull' ? 'bg-green-600' :
        marketCondition === 'bear' ? 'bg-red-600' : 'bg-blue-600'
      }`}>
        {marketCondition === 'bull' ? '📈 Bull Market: Asset values are high!' :
         marketCondition === 'bear' ? '📉 Bear Market: Asset values are low!' :
         '📊 Neutral Market: Asset values are stable.'}
        <span className="ml-2 text-sm">Round: {round}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Player Dashboard */}
        <div className="lg:col-span-1">
          <Card className="bg-white dark:bg-gray-800 shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="flex justify-between items-center">
                <span>Player Dashboard</span>
                <Button variant="outline" size="sm" onClick={() => setShowAssetStore(true)}>
                  <StoreIcon className="mr-2 h-4 w-4" /> Asset Store
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <PlayerDashboard player={currentPlayer} />

              <div className="mt-6">
                <h3 className="text-sm font-medium mb-2 flex items-center">
                  <TargetIcon className="mr-2 h-4 w-4" /> Progress to Financial Freedom
                </h3>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Passive Income: ${currentPlayer.passiveIncome}</span>
                    <span>Goal: ${freedomAmount}</span>
                  </div>
                  <Progress
                    value={calculatePassiveIncomeProgress(currentPlayer)}
                    className="h-2"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              {!diceValue ? (
                <Button
                  onClick={handleDiceRoll}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  Roll Dice
                </Button>
              ) : (
                <Button
                  onClick={handleEndTurn}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  End Turn
                </Button>
              )}

              <div className="flex justify-between w-full">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onResetGame}
                >
                  <ReloadIcon className="mr-2 h-4 w-4" /> New Game
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>

        {/* Center and Right Columns - Game Board */}
        <div className="lg:col-span-2">
          <Card className="bg-white dark:bg-gray-800 shadow-md h-full">
            <CardHeader className="pb-2">
              <CardTitle>
                <div className="flex justify-between items-center">
                  <span>Game Board</span>
                  <div className="flex items-center gap-2">
                    {players.map((player, index) => (
                      <Avatar
                        key={player.id}
                        className={`${
                          index === currentPlayerIndex
                            ? 'ring-2 ring-green-500 ring-offset-2'
                            : ''
                        } ${
                          player.bankrupt ? 'opacity-50' : ''
                        }`}
                      >
                        <AvatarFallback className={`
                          ${index === 0 ? 'bg-blue-500' : ''}
                          ${index === 1 ? 'bg-red-500' : ''}
                          ${index === 2 ? 'bg-yellow-500' : ''}
                          ${index === 3 ? 'bg-purple-500' : ''}
                          ${index === 4 ? 'bg-orange-500' : ''}
                          ${index === 5 ? 'bg-teal-500' : ''}
                        `}>
                          {getPlayerInitials(player.name)}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Game Board Grid */}
              <div className="grid grid-cols-8 gap-1 mb-4">
                {tiles.map((tile, index) => (
                  <GameTile
                    key={tile.id}
                    tile={tile}
                    colorClass={tileColorMap[tile.type]}
                    playerPositions={players.map(p => p.position)}
                    currentPlayerIndex={currentPlayerIndex}
                    isCurrentPosition={currentPlayer.position === index}
                  />
                ))}
              </div>

              {/* Last Action Display */}
              {currentPlayer.turnHistory.length > 0 && (
                <Card className="bg-gray-100 dark:bg-gray-700 p-3 text-sm">
                  <h3 className="font-medium mb-1">Last Event:</h3>
                  <p>
                    {renderLastAction(currentPlayer.turnHistory[currentPlayer.turnHistory.length - 1])}
                  </p>
                </Card>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Dice Roll Dialog */}
      <Dialog open={showDiceRoll} onOpenChange={setShowDiceRoll}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Rolling Dice</DialogTitle>
          </DialogHeader>
          <div className="flex justify-center py-10">
            <DiceRoll onComplete={handleDiceRollComplete} />
          </div>
        </DialogContent>
      </Dialog>

      {/* Asset Store Dialog */}
      <Dialog open={showAssetStore} onOpenChange={setShowAssetStore}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Asset Store</DialogTitle>
          </DialogHeader>
          <Tabs defaultValue="all">
            <TabsList className="grid grid-cols-5 mb-4">
              <TabsTrigger
                value="all"
                onClick={() => setSelectedAssetType('all')}
              >
                All
              </TabsTrigger>
              <TabsTrigger
                value="realestate"
                onClick={() => setSelectedAssetType('realestate')}
              >
                <HomeIcon className="mr-1 h-4 w-4" /> Real Estate
              </TabsTrigger>
              <TabsTrigger
                value="stock"
                onClick={() => setSelectedAssetType('stock')}
              >
                <BarChartIcon className="mr-1 h-4 w-4" /> Stocks
              </TabsTrigger>
              <TabsTrigger
                value="business"
                onClick={() => setSelectedAssetType('business')}
              >
                <BriefcaseIcon className="mr-1 h-4 w-4" /> Business
              </TabsTrigger>
              <TabsTrigger
                value="sidehustle"
                onClick={() => setSelectedAssetType('sidehustle')}
              >
                <RocketIcon className="mr-1 h-4 w-4" /> Side Hustle
              </TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="m-0">
              <AssetList
                assets={filteredAssets}
                currentPlayer={currentPlayer}
                onBuy={buyAsset}
                onSell={sellAsset}
              />
            </TabsContent>
            <TabsContent value="realestate" className="m-0">
              <AssetList
                assets={filteredAssets}
                currentPlayer={currentPlayer}
                onBuy={buyAsset}
                onSell={sellAsset}
              />
            </TabsContent>
            <TabsContent value="stock" className="m-0">
              <AssetList
                assets={filteredAssets}
                currentPlayer={currentPlayer}
                onBuy={buyAsset}
                onSell={sellAsset}
              />
            </TabsContent>
            <TabsContent value="business" className="m-0">
              <AssetList
                assets={filteredAssets}
                currentPlayer={currentPlayer}
                onBuy={buyAsset}
                onSell={sellAsset}
              />
            </TabsContent>
            <TabsContent value="sidehustle" className="m-0">
              <AssetList
                assets={filteredAssets}
                currentPlayer={currentPlayer}
                onBuy={buyAsset}
                onSell={sellAsset}
              />
            </TabsContent>
          </Tabs>
          <DialogFooter>
            <p className="text-xs text-gray-500 dark:text-gray-400 w-full text-center">
              Remember: assets generate passive income which brings you closer to financial freedom!
            </p>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Game Over Dialog */}
      <Dialog open={showGameOverDialog} onOpenChange={setShowGameOverDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl">
              Game Over!
            </DialogTitle>
          </DialogHeader>
          <div className="py-6 text-center">
            {winner ? (
              <div className="space-y-4">
                <div className="flex justify-center">
                  <Avatar className="h-20 w-20 border-4 border-green-500">
                    <AvatarFallback className="text-2xl bg-green-600">
                      {getPlayerInitials(winner.name)}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <h3 className="text-xl font-bold">{winner.name} Wins!</h3>
                <p>
                  They achieved financial freedom with ${winner.passiveIncome} in passive income!
                </p>
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md">
                  <h4 className="font-medium mb-2">Final Stats:</h4>
                  <p>Cash: ${winner.cash}</p>
                  <p>Assets: {winner.assets.reduce((count, asset) => count + asset.owned, 0)}</p>
                  <p>Total Rounds: {round}</p>
                </div>
              </div>
            ) : (
              <p>The game has ended.</p>
            )}
          </div>
          <DialogFooter>
            <Button className="w-full" onClick={onResetGame}>
              Play Again
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Helper function to render the last action
function renderLastAction(event: HistoryEvent): string {
  if (!event) return "No action yet";

  switch (event.type) {
    case "income":
      return `Received $${event.amount} from ${event.name}.`;
    case "expense":
      return `Paid $${event.amount} for ${event.name}.`;
    case "investment":
      return `Invested $${event.amount} in ${event.name}.`;
    case "opportunity":
      return `Found an opportunity: ${event.name}.`;
    case "risk":
      return `Faced a risk: ${event.name}.`;
    case "event":
      return `Event occurred: ${event.name}.`;
    case "liability":
      return `Acquired a liability: ${event.name} for $${event.amount}.`;
    case "passedGo":
      return `Passed GO and collected $${event.amount}.`;
    default:
      return `${event.type}: ${event.name}`;
  }
}

// Asset List Component
interface AssetListProps {
  assets: Asset[];
  currentPlayer: Player;
  onBuy: (playerId: string, assetId: string) => void;
  onSell: (playerId: string, assetId: string) => void;
}

function AssetList({ assets, currentPlayer, onBuy, onSell }: AssetListProps) {
  return (
    <div className="max-h-[300px] overflow-y-auto">
      <div className="grid grid-cols-1 gap-3">
        {assets.map((asset) => {
          const playerOwns = currentPlayer.assets.find(a => a.id === asset.id);
          const canAfford = currentPlayer.cash >= asset.cost;

          return (
            <Card key={asset.id} className="flex flex-col p-3 bg-gray-50 dark:bg-gray-700">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">{asset.name}</h3>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                    <span className="mr-2">Cost: ${asset.cost}</span>
                    <span className="text-green-600">+${asset.cashFlow}/turn</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {playerOwns && (
                    <div className="flex items-center">
                      <span className="text-sm font-medium mr-2">Owned: {playerOwns.owned}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onSell(currentPlayer.id, asset.id)}
                      >
                        <MinusIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                  <Button
                    size="sm"
                    className="bg-green-600 hover:bg-green-700"
                    disabled={!canAfford}
                    onClick={() => onBuy(currentPlayer.id, asset.id)}
                  >
                    <PlusIcon className="h-4 w-4 mr-1" /> Buy
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

// Define icons not available in Radix
function StoreIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"></path>
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
      <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"></path>
      <path d="M2 7h20"></path>
      <path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7"></path>
    </svg>
  );
}

function BriefcaseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="20" height="14" x="2" y="7" rx="2" ry="2"></rect>
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
    </svg>
  );
}

function TargetIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10"></circle>
      <circle cx="12" cy="12" r="6"></circle>
      <circle cx="12" cy="12" r="2"></circle>
    </svg>
  );
}
