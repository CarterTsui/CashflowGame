import SimpleSaveLoad from "@/components/game/SimpleSaveLoad";

export default function SavePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-8 bg-gradient-to-b from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-green-800 dark:text-green-300">
          CashFlow Tycoon
        </h1>
        <p className="text-center mb-8 text-green-700 dark:text-green-400">
          Save and Load Game Functionality
        </p>

        <SimpleSaveLoad />

        <div className="mt-8 text-center">
          <a
            href="/"
            className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
          >
            Return to Home
          </a>
        </div>
      </div>
    </main>
  );
}
