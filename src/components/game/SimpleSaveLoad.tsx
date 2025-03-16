"use client";

import { useState, useEffect } from "react";

// Simple localstorage-based save/load component
export default function SimpleSaveLoad() {
  const [saves, setSaves] = useState([]);
  const [gameName, setGameName] = useState("");
  const [message, setMessage] = useState("");

  // Load saved games on component mount
  useEffect(() => {
    loadSavedGames();
  }, []);

  // Function to load saved games from localStorage
  const loadSavedGames = () => {
    try {
      const savedGames = localStorage.getItem('cashflow-tycoon-saves');
      if (savedGames) {
        setSaves(JSON.parse(savedGames));
      }
    } catch (error) {
      console.error('Error loading games:', error);
      setMessage('Error loading saved games');
    }
  };

  // Function to save current game
  const saveGame = () => {
    const name = gameName.trim() || `Game ${new Date().toLocaleDateString()}`;

    try {
      // Get current game state - in a real app this would come from your store
      const gameState = {
        players: [{ name: 'Player 1', cash: 1000, position: 0 }],
        round: 1,
        currentTime: new Date().toISOString(),
      };

      // Create save object
      const saveGame = {
        id: `save-${Date.now()}`,
        name,
        date: new Date().toISOString(),
        gameState
      };

      // Get existing saves
      const existingSaves = JSON.parse(localStorage.getItem('cashflow-tycoon-saves') || '[]');

      // Add new save
      existingSaves.push(saveGame);

      // Save both the list and the individual game
      localStorage.setItem('cashflow-tycoon-saves', JSON.stringify(existingSaves));
      localStorage.setItem(`cashflow-tycoon-save-${saveGame.id}`, JSON.stringify(gameState));

      // Update state
      setSaves(existingSaves);
      setGameName("");
      setMessage(`Game "${name}" saved successfully!`);

      // Clear message after 3 seconds
      setTimeout(() => setMessage(""), 3000);

    } catch (error) {
      console.error('Error saving game:', error);
      setMessage('Error saving game');
    }
  };

  // Function to load a game
  const loadGame = (id) => {
    try {
      const gameState = localStorage.getItem(`cashflow-tycoon-save-${id}`);
      if (gameState) {
        const parsedState = JSON.parse(gameState);

        // In a real app, you would set this to your store
        console.log('Loaded game state:', parsedState);

        setMessage(`Game loaded successfully! (check console)`);

        // Clear message after 3 seconds
        setTimeout(() => setMessage(""), 3000);
      }
    } catch (error) {
      console.error('Error loading game:', error);
      setMessage('Error loading game');
    }
  };

  // Function to delete a save
  const deleteGame = (id) => {
    try {
      // Filter out the game to delete
      const filteredSaves = saves.filter(save => save.id !== id);

      // Update localStorage
      localStorage.setItem('cashflow-tycoon-saves', JSON.stringify(filteredSaves));
      localStorage.removeItem(`cashflow-tycoon-save-${id}`);

      // Update state
      setSaves(filteredSaves);
      setMessage(`Game deleted successfully!`);

      // Clear message after 3 seconds
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error('Error deleting game:', error);
      setMessage('Error deleting game');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-4">Save/Load Game Demo</h2>

      {/* Save Game Form */}
      <div className="mb-6 p-4 border border-gray-200 rounded-md">
        <h3 className="text-lg font-semibold mb-2">Save Current Game</h3>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={gameName}
            onChange={(e) => setGameName(e.target.value)}
            placeholder="Enter save name"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
          />
          <button
            onClick={saveGame}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </div>

      {/* Saved Games List */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Saved Games</h3>
        {saves.length === 0 ? (
          <p className="text-gray-500">No saved games found</p>
        ) : (
          <ul className="space-y-2">
            {saves.map((save) => (
              <li
                key={save.id}
                className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 border border-gray-200 rounded-md gap-2"
              >
                <div>
                  <div className="font-medium">{save.name}</div>
                  <div className="text-sm text-gray-500">
                    {new Date(save.date).toLocaleString()}
                  </div>
                </div>
                <div className="flex gap-2 mt-2 sm:mt-0">
                  <button
                    onClick={() => loadGame(save.id)}
                    className="flex-1 sm:flex-none bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 text-sm"
                  >
                    Load
                  </button>
                  <button
                    onClick={() => deleteGame(save.id)}
                    className="flex-1 sm:flex-none bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Message Display */}
      {message && (
        <div className="mt-4 p-3 bg-blue-100 text-blue-700 rounded-md">
          {message}
        </div>
      )}
    </div>
  );
}
