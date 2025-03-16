import GameBoard from "@/components/game/GameBoard";
import SetupGame from "@/components/game/SetupGame";

export default function GamePage() {
  return (
    <main className="min-h-screen bg-green-50 dark:bg-green-950 p-4 md:p-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-green-800 dark:text-green-300 mb-8 text-center">
          CashFlow Tycoon
        </h1>

        {/* This component renders either the setup screen or the game board */}
        <SetupGame />
      </div>
    </main>
  );
}
