import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-8 bg-gradient-to-b from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold text-green-800 dark:text-green-300">
          CashFlow Tycoon
        </h1>
        <p className="text-xl md:text-2xl text-green-700 dark:text-green-400">
          Master your financial destiny through strategic investments and smart cash flow management
        </p>

        <div className="mt-8 relative w-full max-w-xl h-64 md:h-80 rounded-xl overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-green-800/20 dark:bg-green-950/40 backdrop-blur-sm flex items-center justify-center">
            <div className="text-center p-6 bg-white/90 dark:bg-black/80 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold text-green-700 dark:text-green-300 mb-3">
                Be the first to achieve Financial Freedom!
              </h2>
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                Manage your cash flow, make smart investments, and navigate financial challenges
              </p>
              <Link href="/game">
                <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-6 text-lg">
                  Start Playing <ArrowRightIcon className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 w-full max-w-3xl">
          <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md">
            <h3 className="font-bold text-xl text-green-700 dark:text-green-300 mb-2">Build Wealth</h3>
            <p className="text-gray-600 dark:text-gray-300">Invest in assets that generate passive income and grow your net worth</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md">
            <h3 className="font-bold text-xl text-green-700 dark:text-green-300 mb-2">Manage Risks</h3>
            <p className="text-gray-600 dark:text-gray-300">Navigate unexpected expenses and market downturns with strategic planning</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md">
            <h3 className="font-bold text-xl text-green-700 dark:text-green-300 mb-2">Learn Finance</h3>
            <p className="text-gray-600 dark:text-gray-300">Gain practical financial knowledge while having fun competing with friends</p>
          </div>
        </div>

        {/* Add a section with a button or link to the save functionality */}
        <div className="mt-6 text-center">
          <a href="/save" className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Try Save/Load Demo
          </a>
        </div>
      </div>
    </main>
  );
}
