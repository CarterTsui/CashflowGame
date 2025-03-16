import { create } from "zustand";
import { persist } from "zustand/middleware";

// Game state interface with local storage
export const useGameStore = create(
  persist(
    (set, get) => ({
      // Your existing state and functions

      // Add a function to load games from local storage
      loadFromLocalStorage: () => {
        if (typeof window === 'undefined') return;

        try {
          const savedGames = localStorage.getItem('cashflow-tycoon-saves');
          if (savedGames) {
            const games = JSON.parse(savedGames);
            set({ saveGames: games });
          }
        } catch (error) {
          console.error('Error loading games from localStorage:', error);
        }
      },

      // Override saveGame function to use localStorage
      saveGame: (name) => {
        const saveGames = [...get().saveGames];
        const gameState = { ...get() };

        // Remove saveGames from the gameState to avoid circular reference
        const { saveGames: _, ...gameStateToSave } = gameState;

        const saveGame = {
          id: `save-${Date.now()}`,
          name,
          date: new Date().toISOString(),
          gameState: gameStateToSave
        };

        // Add new save game
        saveGames.push(saveGame);

        // Limit to 10 save games
        if (saveGames.length > 10) {
          saveGames.shift(); // Remove oldest save
        }

        // Save to Zustand store state
        set({ saveGames });

        // Also save to localStorage if available
        if (typeof window !== 'undefined') {
          try {
            localStorage.setItem('cashflow-tycoon-saves', JSON.stringify(saveGames));
            localStorage.setItem(`cashflow-tycoon-save-${saveGame.id}`,
                                 JSON.stringify(gameStateToSave));
          } catch (error) {
            console.error('Error saving game to localStorage:', error);
          }
        }

        return saveGame;
      },

      // Override loadGame function to use localStorage
      loadGame: (id) => {
        const { saveGames } = get();
        let saveGame = saveGames.find(save => save.id === id);

        // If not found in Zustand store, try localStorage
        if (!saveGame && typeof window !== 'undefined') {
          try {
            const gameState = localStorage.getItem(`cashflow-tycoon-save-${id}`);
            if (gameState) {
              // Restore game state from localStorage
              set({ ...JSON.parse(gameState) });
              return;
            }
          } catch (error) {
            console.error('Error loading game from localStorage:', error);
          }
        }

        // If found in Zustand store, use that
        if (saveGame) {
          set(saveGame.gameState);
        }
      },

      // Override deleteSaveGame function to use localStorage
      deleteSaveGame: (id) => {
        const saveGames = get().saveGames.filter(save => save.id !== id);
        set({ saveGames });

        // Also delete from localStorage
        if (typeof window !== 'undefined') {
          try {
            localStorage.setItem('cashflow-tycoon-saves', JSON.stringify(saveGames));
            localStorage.removeItem(`cashflow-tycoon-save-${id}`);
          } catch (error) {
            console.error('Error deleting game from localStorage:', error);
          }
        }
      }
    }),
    {
      name: "cashflow-tycoon-storage",
      // This configuration uses localStorage by default through the persist middleware
      // You can customize storage options here
    }
  )
);
