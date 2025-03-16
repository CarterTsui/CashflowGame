import { create } from "zustand";
import { persist } from "zustand/middleware";

// Game tile types
export enum TileType {
  Income = "income",
  Expense = "expense",
  Investment = "investment",
  Opportunity = "opportunity",
  Risk = "risk",
  Event = "event",
  Go = "go",
}

// Event types for player history tracking
export type HistoryEvent = {
  type: 'income' | 'expense' | 'investment' | 'opportunity' | 'risk' | 'event' | 'liability' | 'passedGo';
  name: string;
  amount?: number;
};

// Player interface
export interface Player {
  id: string;
  name: string;
  cash: number;
  position: number;
  salary: number;
  passiveIncome: number;
  expenses: number;
  assets: Asset[];
  liabilities: Liability[];
  isInDebt: boolean;
  bankrupt: boolean;
  turnHistory: HistoryEvent[];
}

// Asset interface
export interface Asset {
  id: string;
  name: string;
  type: "realestate" | "stock" | "business" | "sidehustle";
  cost: number;
  cashFlow: number;
  owned: number;
}

// Liability interface
export interface Liability {
  id: string;
  name: string;
  amount: number;
  interestRate: number;
  minimumPayment: number;
}

// Game board tile
export interface Tile {
  id: number;
  name: string;
  type: TileType;
  description: string;
  action: (player: Player, gameState: GameState) => Player;
}

// Game state interface
export interface GameState {
  players: Player[];
  currentPlayerIndex: number;
  tiles: Tile[];
  boardSize: number;
  gameStarted: boolean;
  gameFinished: boolean;
  winner: Player | null;
  round: number;
  passingGoAmount: number;
  freedomAmount: number;
  availableAssets: Asset[];
  marketCondition: "bull" | "bear" | "neutral";
  events: HistoryEvent[];
}

// Game actions interface
interface GameActions {
  initializeGame: (players: string[]) => void;
  rollDice: (roll: number) => void;
  buyAsset: (playerId: string, assetId: string) => void;
  sellAsset: (playerId: string, assetId: string) => void;
  payDebt: (playerId: string, liabilityId: string, amount: number) => void;
  endTurn: () => void;
  resetGame: () => void;
}

// Create the game store
export const useGameStore = create<GameState & GameActions>()(
  persist(
    (set, get) => ({
      // Initial game state
      players: [],
      currentPlayerIndex: 0,
      tiles: [],
      boardSize: 24,
      gameStarted: false,
      gameFinished: false,
      winner: null,
      round: 1,
      passingGoAmount: 1000,
      freedomAmount: 5000,
      availableAssets: [],
      marketCondition: "neutral",
      events: [],

      // Game actions
      initializeGame: (playerNames) => {
        const initialTiles = generateGameBoard();
        const initialAssets = generateAssets();

        const players = playerNames.map((name, index) => ({
          id: `player-${index + 1}`,
          name,
          cash: 2000,
          position: 0,
          salary: 1000,
          passiveIncome: 0,
          expenses: 500,
          assets: [],
          liabilities: [],
          isInDebt: false,
          bankrupt: false,
          turnHistory: [],
        }));

        set({
          players,
          tiles: initialTiles,
          availableAssets: initialAssets,
          gameStarted: true,
          currentPlayerIndex: 0,
          round: 1,
        });
      },

      rollDice: (roll) => {
        const { players, currentPlayerIndex, tiles, boardSize } = get();
        const currentPlayer = { ...players[currentPlayerIndex] };
        const oldPosition = currentPlayer.position;

        // Move player
        currentPlayer.position = (currentPlayer.position + roll) % boardSize;

        // Check if passed GO
        if (currentPlayer.position < oldPosition) {
          currentPlayer.cash += get().passingGoAmount;
          currentPlayer.turnHistory.push({
            type: "passedGo",
            name: "Passed GO",
            amount: get().passingGoAmount,
          });
        }

        // Execute tile action
        const landedTile = tiles[currentPlayer.position];
        const updatedPlayer = landedTile.action(currentPlayer, get());

        // Update player in state
        const updatedPlayers = [...players];
        updatedPlayers[currentPlayerIndex] = updatedPlayer;

        set({ players: updatedPlayers });

        // Check win condition
        if (updatedPlayer.passiveIncome >= get().freedomAmount) {
          set({
            gameFinished: true,
            winner: updatedPlayer,
          });
        }
      },

      buyAsset: (playerId, assetId) => {
        const { players, availableAssets } = get();
        const playerIndex = players.findIndex(p => p.id === playerId);

        if (playerIndex === -1) return;

        const player = { ...players[playerIndex] };
        const asset = availableAssets.find(a => a.id === assetId);

        if (!asset) return;

        // Check if player has enough cash
        if (player.cash < asset.cost) return;

        // Buy the asset
        player.cash -= asset.cost;

        // Check if player already owns this type of asset
        const existingAssetIndex = player.assets.findIndex(a => a.id === assetId);

        if (existingAssetIndex >= 0) {
          // Increase owned count
          player.assets[existingAssetIndex].owned += 1;
        } else {
          // Add new asset to player's portfolio
          player.assets.push({
            ...asset,
            owned: 1,
          });
        }

        // Update passive income
        player.passiveIncome += asset.cashFlow;

        // Update player in state
        const updatedPlayers = [...players];
        updatedPlayers[playerIndex] = player;

        set({ players: updatedPlayers });
      },

      sellAsset: (playerId, assetId) => {
        const { players } = get();
        const playerIndex = players.findIndex(p => p.id === playerId);

        if (playerIndex === -1) return;

        const player = { ...players[playerIndex] };
        const assetIndex = player.assets.findIndex(a => a.id === assetId);

        if (assetIndex === -1) return;

        const asset = player.assets[assetIndex];

        // Get market value (50-80% of cost depending on market conditions)
        const marketMultiplier = get().marketCondition === "bull" ? 0.8 :
                                get().marketCondition === "bear" ? 0.5 : 0.65;
        const saleValue = asset.cost * marketMultiplier;

        // Sell one unit of the asset
        player.assets[assetIndex].owned -= 1;
        player.cash += saleValue;
        player.passiveIncome -= asset.cashFlow;

        // Remove asset from player if no more owned
        if (player.assets[assetIndex].owned <= 0) {
          player.assets = player.assets.filter((_, index) => index !== assetIndex);
        }

        // Update player in state
        const updatedPlayers = [...players];
        updatedPlayers[playerIndex] = player;

        set({ players: updatedPlayers });
      },

      payDebt: (playerId, liabilityId, amount) => {
        const { players } = get();
        const playerIndex = players.findIndex(p => p.id === playerId);

        if (playerIndex === -1) return;

        const player = { ...players[playerIndex] };
        const liabilityIndex = player.liabilities.findIndex(l => l.id === liabilityId);

        if (liabilityIndex === -1) return;

        // Check if player has enough cash
        if (player.cash < amount) return;

        const liability = player.liabilities[liabilityIndex];

        // Pay debt
        player.cash -= amount;
        liability.amount -= amount;

        // If fully paid, remove the liability
        if (liability.amount <= 0) {
          player.liabilities = player.liabilities.filter((_, index) => index !== liabilityIndex);

          // Update expenses (no more minimum payments)
          player.expenses -= liability.minimumPayment;
        } else {
          // Update the liability
          player.liabilities[liabilityIndex] = liability;
        }

        // Check if player is still in debt
        player.isInDebt = player.liabilities.length > 0;

        // Update player in state
        const updatedPlayers = [...players];
        updatedPlayers[playerIndex] = player;

        set({ players: updatedPlayers });
      },

      endTurn: () => {
        const { players, currentPlayerIndex } = get();

        // Process end of turn for current player
        const player = { ...players[currentPlayerIndex] };

        // Add salary and passive income
        player.cash += player.salary + player.passiveIncome;

        // Subtract expenses
        player.cash -= player.expenses;

        // Process liabilities (minimum payments)
        player.liabilities.forEach(liability => {
          const interest = liability.amount * (liability.interestRate / 100 / 12);
          liability.amount += interest;
          player.cash -= liability.minimumPayment;
        });

        // Check bankruptcy
        if (player.cash < 0) {
          player.isInDebt = true;

          // If can't sell assets to cover expenses, player is bankrupt
          const totalAssetValue = player.assets.reduce((total, asset) => {
            return total + (asset.cost * asset.owned * 0.5); // 50% of cost as liquidation value
          }, 0);

          if (Math.abs(player.cash) > totalAssetValue) {
            player.bankrupt = true;
          }
        }

        // Update player
        const updatedPlayers = [...players];
        updatedPlayers[currentPlayerIndex] = player;

        // Move to next player
        let nextPlayerIndex = (currentPlayerIndex + 1) % players.length;

        // Skip bankrupt players
        while (nextPlayerIndex !== currentPlayerIndex && updatedPlayers[nextPlayerIndex].bankrupt) {
          nextPlayerIndex = (nextPlayerIndex + 1) % players.length;
        }

        // Check if round is complete
        const isNewRound = nextPlayerIndex <= currentPlayerIndex;

        set({
          players: updatedPlayers,
          currentPlayerIndex: nextPlayerIndex,
          round: isNewRound ? get().round + 1 : get().round,
          // Randomly change market conditions each round
          marketCondition: isNewRound ?
            ["bull", "bear", "neutral"][Math.floor(Math.random() * 3)] as "bull" | "bear" | "neutral"
            : get().marketCondition,
        });

        // Check if only one player remains
        const activePlayers = updatedPlayers.filter(p => !p.bankrupt);
        if (activePlayers.length === 1) {
          set({
            gameFinished: true,
            winner: activePlayers[0],
          });
        }
      },

      resetGame: () => {
        set({
          players: [],
          currentPlayerIndex: 0,
          gameStarted: false,
          gameFinished: false,
          winner: null,
          round: 1,
        });
      }
    }),
    {
      name: "cashflow-tycoon-storage",
    }
  )
);

// Generate initial game board
function generateGameBoard(): Tile[] {
  const tiles: Tile[] = [];

  // GO Tile
  tiles.push({
    id: 0,
    name: "GO",
    type: TileType.Go,
    description: "Collect your salary as you pass GO!",
    action: (player, _) => {
      return player;
    },
  });

  // Income Tiles
  tiles.push({
    id: 1,
    name: "Side Hustle",
    type: TileType.Income,
    description: "Earn extra income from a side gig!",
    action: (player, _) => {
      const amount = 200;
      player.cash += amount;
      player.turnHistory.push({
        type: "income",
        name: "Side Hustle",
        amount,
      });
      return player;
    },
  });

  tiles.push({
    id: 2,
    name: "Freelance Gig",
    type: TileType.Income,
    description: "You got a freelance project!",
    action: (player, _) => {
      const amount = 300;
      player.cash += amount;
      player.turnHistory.push({
        type: "income",
        name: "Freelance Gig",
        amount,
      });
      return player;
    },
  });

  // Expense Tiles
  tiles.push({
    id: 3,
    name: "Car Repair",
    type: TileType.Expense,
    description: "Your car needs urgent repairs!",
    action: (player, _) => {
      const amount = 300;
      player.cash -= amount;
      player.turnHistory.push({
        type: "expense",
        name: "Car Repair",
        amount,
      });
      return player;
    },
  });

  tiles.push({
    id: 4,
    name: "Medical Bills",
    type: TileType.Expense,
    description: "Unexpected medical expenses!",
    action: (player, _) => {
      const amount = 500;
      player.cash -= amount;
      player.turnHistory.push({
        type: "expense",
        name: "Medical Bills",
        amount,
      });
      return player;
    },
  });

  // Investment Tiles
  tiles.push({
    id: 5,
    name: "Real Estate Investment",
    type: TileType.Investment,
    description: "Opportunity to invest in real estate!",
    action: (player, gameState) => {
      player.turnHistory.push({
        type: "opportunity",
        name: "Real Estate Investment",
      });
      return player;
    },
  });

  tiles.push({
    id: 6,
    name: "Stock Market",
    type: TileType.Investment,
    description: "Opportunity to invest in stocks!",
    action: (player, gameState) => {
      player.turnHistory.push({
        type: "opportunity",
        name: "Stock Market",
      });
      return player;
    },
  });

  // Risk Tiles
  tiles.push({
    id: 7,
    name: "Market Crash",
    type: TileType.Risk,
    description: "The market crashes! All investments lose value.",
    action: (player, _) => {
      // Reduce value of assets by 20%
      player.assets.forEach(asset => {
        asset.cashFlow = Math.round(asset.cashFlow * 0.8);
      });

      player.passiveIncome = player.assets.reduce((total, asset) => {
        return total + (asset.cashFlow * asset.owned);
      }, 0);

      player.turnHistory.push({
        type: "risk",
        name: "Market Crash",
      });

      return player;
    },
  });

  tiles.push({
    id: 8,
    name: "Job Loss",
    type: TileType.Risk,
    description: "You lost your job! No salary until you find a new one.",
    action: (player, _) => {
      const oldSalary = player.salary;
      player.salary = 0;

      player.turnHistory.push({
        type: "risk",
        name: "Job Loss",
        amount: oldSalary,
      });

      return player;
    },
  });

  // Opportunity Tiles
  tiles.push({
    id: 9,
    name: "New Job Offer",
    type: TileType.Opportunity,
    description: "You got a better job offer with higher salary!",
    action: (player, _) => {
      const increase = Math.round(player.salary * 0.2);
      player.salary += increase;

      player.turnHistory.push({
        type: "opportunity",
        name: "New Job Offer",
        amount: increase,
      });

      return player;
    },
  });

  tiles.push({
    id: 10,
    name: "Business Opportunity",
    type: TileType.Opportunity,
    description: "Chance to start your own business!",
    action: (player, gameState) => {
      player.turnHistory.push({
        type: "opportunity",
        name: "Business Opportunity",
      });
      return player;
    },
  });

  // Event Tiles
  tiles.push({
    id: 11,
    name: "Tax Audit",
    type: TileType.Event,
    description: "You're being audited by the tax authorities!",
    action: (player, _) => {
      const penalty = Math.round(player.cash * 0.1);
      player.cash -= penalty;

      player.turnHistory.push({
        type: "event",
        name: "Tax Audit",
        amount: penalty,
      });

      return player;
    },
  });

  // Add more tiles to reach boardSize of 24
  tiles.push({
    id: 12,
    name: "Rental Income",
    type: TileType.Income,
    description: "Collect rental income from your properties!",
    action: (player, _) => {
      const amount = player.assets.filter(a => a.type === "realestate").length * 100;
      player.cash += amount;

      player.turnHistory.push({
        type: "income",
        name: "Rental Income",
        amount,
      });

      return player;
    },
  });

  tiles.push({
    id: 13,
    name: "Property Tax",
    type: TileType.Expense,
    description: "Time to pay property taxes!",
    action: (player, _) => {
      const amount = player.assets.filter(a => a.type === "realestate").length * 50;
      player.cash -= amount;

      player.turnHistory.push({
        type: "expense",
        name: "Property Tax",
        amount,
      });

      return player;
    },
  });

  tiles.push({
    id: 14,
    name: "Online Business",
    type: TileType.Investment,
    description: "Opportunity to invest in an online business!",
    action: (player, _) => {
      player.turnHistory.push({
        type: "opportunity",
        name: "Online Business",
      });
      return player;
    },
  });

  tiles.push({
    id: 15,
    name: "Credit Card Debt",
    type: TileType.Expense,
    description: "You've accumulated credit card debt!",
    action: (player, _) => {
      // Add a liability
      const debt = {
        id: `liability-cc-${Date.now()}`,
        name: "Credit Card",
        amount: 1000,
        interestRate: 18,
        minimumPayment: 100,
      };

      player.liabilities.push(debt);
      player.expenses += debt.minimumPayment;
      player.isInDebt = true;

      player.turnHistory.push({
        type: "liability",
        name: "Credit Card Debt",
        amount: debt.amount,
      });

      return player;
    },
  });

  tiles.push({
    id: 16,
    name: "Dividend Payout",
    type: TileType.Income,
    description: "Your stocks pay dividends!",
    action: (player, _) => {
      const amount = player.assets.filter(a => a.type === "stock").length * 75;
      player.cash += amount;

      player.turnHistory.push({
        type: "income",
        name: "Dividend Payout",
        amount,
      });

      return player;
    },
  });

  tiles.push({
    id: 17,
    name: "Home Renovation",
    type: TileType.Expense,
    description: "Your home needs renovations!",
    action: (player, _) => {
      const amount = 600;
      player.cash -= amount;

      player.turnHistory.push({
        type: "expense",
        name: "Home Renovation",
        amount,
      });

      return player;
    },
  });

  tiles.push({
    id: 18,
    name: "Financial Education",
    type: TileType.Investment,
    description: "Invest in your financial education!",
    action: (player, _) => {
      const cost = 200;
      player.cash -= cost;

      // Increased passive income from all future investments by 10%
      player.turnHistory.push({
        type: "investment",
        name: "Financial Education",
        amount: cost,
      });

      return player;
    },
  });

  tiles.push({
    id: 19,
    name: "Inheritance",
    type: TileType.Income,
    description: "You received an inheritance!",
    action: (player, _) => {
      const amount = 1500;
      player.cash += amount;

      player.turnHistory.push({
        type: "income",
        name: "Inheritance",
        amount,
      });

      return player;
    },
  });

  tiles.push({
    id: 20,
    name: "Business Expansion",
    type: TileType.Investment,
    description: "Opportunity to expand your business!",
    action: (player, _) => {
      player.turnHistory.push({
        type: "opportunity",
        name: "Business Expansion",
      });
      return player;
    },
  });

  tiles.push({
    id: 21,
    name: "Economic Boom",
    type: TileType.Event,
    description: "The economy is booming! All investment income increases.",
    action: (player, _) => {
      // Increase value of assets by 15%
      player.assets.forEach(asset => {
        asset.cashFlow = Math.round(asset.cashFlow * 1.15);
      });

      player.passiveIncome = player.assets.reduce((total, asset) => {
        return total + (asset.cashFlow * asset.owned);
      }, 0);

      player.turnHistory.push({
        type: "event",
        name: "Economic Boom",
      });

      return player;
    },
  });

  tiles.push({
    id: 22,
    name: "Loan Payment",
    type: TileType.Expense,
    description: "Time to make loan payments!",
    action: (player, _) => {
      const amount = player.liabilities.reduce((total, liability) => {
        return total + liability.minimumPayment;
      }, 0);

      if (amount > 0) {
        player.cash -= amount;

        player.turnHistory.push({
          type: "expense",
          name: "Loan Payment",
          amount,
        });
      }

      return player;
    },
  });

  tiles.push({
    id: 23,
    name: "Cryptocurrency Investment",
    type: TileType.Investment,
    description: "Opportunity to invest in cryptocurrency!",
    action: (player, _) => {
      player.turnHistory.push({
        type: "opportunity",
        name: "Cryptocurrency Investment",
      });
      return player;
    },
  });

  return tiles;
}

// Generate initial assets
function generateAssets(): Asset[] {
  return [
    // Real Estate
    {
      id: "asset-re-1",
      name: "Small Apartment",
      type: "realestate",
      cost: 1000,
      cashFlow: 100,
      owned: 0,
    },
    {
      id: "asset-re-2",
      name: "Duplex",
      type: "realestate",
      cost: 2000,
      cashFlow: 200,
      owned: 0,
    },
    {
      id: "asset-re-3",
      name: "Commercial Property",
      type: "realestate",
      cost: 3000,
      cashFlow: 300,
      owned: 0,
    },

    // Stocks
    {
      id: "asset-stock-1",
      name: "Tech Stocks",
      type: "stock",
      cost: 500,
      cashFlow: 25,
      owned: 0,
    },
    {
      id: "asset-stock-2",
      name: "Dividend Stocks",
      type: "stock",
      cost: 800,
      cashFlow: 50,
      owned: 0,
    },
    {
      id: "asset-stock-3",
      name: "Index Fund",
      type: "stock",
      cost: 1000,
      cashFlow: 40,
      owned: 0,
    },

    // Businesses
    {
      id: "asset-biz-1",
      name: "Dropshipping Store",
      type: "business",
      cost: 1200,
      cashFlow: 150,
      owned: 0,
    },
    {
      id: "asset-biz-2",
      name: "Food Truck",
      type: "business",
      cost: 2500,
      cashFlow: 300,
      owned: 0,
    },
    {
      id: "asset-biz-3",
      name: "Software as a Service",
      type: "business",
      cost: 4000,
      cashFlow: 500,
      owned: 0,
    },

    // Side Hustles
    {
      id: "asset-side-1",
      name: "Blog/YouTube Channel",
      type: "sidehustle",
      cost: 300,
      cashFlow: 30,
      owned: 0,
    },
    {
      id: "asset-side-2",
      name: "Affiliate Marketing",
      type: "sidehustle",
      cost: 500,
      cashFlow: 60,
      owned: 0,
    },
    {
      id: "asset-side-3",
      name: "Print on Demand",
      type: "sidehustle",
      cost: 700,
      cashFlow: 80,
      owned: 0,
    },
  ];
}
