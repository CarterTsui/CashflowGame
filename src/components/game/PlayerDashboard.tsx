"use client";

import { Player, Liability } from "@/lib/store";
import { Card } from "@/components/ui/card";
import {
  HomeIcon,
  RocketIcon,
  BarChartIcon,
  PlusIcon,
  MinusIcon,
  ExclamationTriangleIcon
} from "@radix-ui/react-icons";

interface PlayerDashboardProps {
  player: Player;
}

export default function PlayerDashboard({ player }: PlayerDashboardProps) {
  // Calculate total asset value
  const totalAssetValue = player.assets.reduce((total, asset) => {
    return total + (asset.cost * asset.owned);
  }, 0);

  // Calculate total liabilities
  const totalLiabilities = player.liabilities.reduce((total, liability) => {
    return total + liability.amount;
  }, 0);

  // Calculate net worth
  const netWorth = player.cash + totalAssetValue - totalLiabilities;

  // Get counts by asset type
  const assetCounts = {
    realestate: player.assets.filter(a => a.type === "realestate")
      .reduce((count, asset) => count + asset.owned, 0),
    stock: player.assets.filter(a => a.type === "stock")
      .reduce((count, asset) => count + asset.owned, 0),
    business: player.assets.filter(a => a.type === "business")
      .reduce((count, asset) => count + asset.owned, 0),
    sidehustle: player.assets.filter(a => a.type === "sidehustle")
      .reduce((count, asset) => count + asset.owned, 0),
  };

  return (
    <div className="player-dashboard space-y-4">
      <div className="flex flex-col">
        <h2 className="text-xl font-bold text-green-700 dark:text-green-300">
          {player.name}'s Dashboard
        </h2>

        {player.bankrupt && (
          <div className="mt-2 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 p-2 rounded-md flex items-center">
            <ExclamationTriangleIcon className="mr-2 h-5 w-5" />
            <span className="font-medium">Bankrupt!</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="bg-green-50 dark:bg-green-900 p-3 rounded-md">
          <div className="text-xs text-green-600 dark:text-green-400 font-medium">Cash</div>
          <div className="text-xl font-bold">${player.cash}</div>
        </div>
        <div className="bg-blue-50 dark:bg-blue-900 p-3 rounded-md">
          <div className="text-xs text-blue-600 dark:text-blue-400 font-medium">Net Worth</div>
          <div className="text-xl font-bold">${netWorth}</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="bg-green-50 dark:bg-green-900 p-3 rounded-md">
          <div className="text-xs text-green-600 dark:text-green-400 font-medium">Income</div>
          <div className="flex flex-col">
            <div className="flex justify-between">
              <span className="text-sm">Salary:</span>
              <span className="text-sm font-medium">${player.salary}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Passive:</span>
              <span className="text-sm font-medium">${player.passiveIncome}</span>
            </div>
            <div className="flex justify-between border-t mt-1 pt-1">
              <span className="text-sm">Total:</span>
              <span className="text-sm font-bold">${player.salary + player.passiveIncome}</span>
            </div>
          </div>
        </div>
        <div className="bg-red-50 dark:bg-red-900 p-3 rounded-md">
          <div className="text-xs text-red-600 dark:text-red-400 font-medium">Expenses</div>
          <div className="flex flex-col">
            <div className="flex justify-between">
              <span className="text-sm">Regular:</span>
              <span className="text-sm font-medium">${player.expenses}</span>
            </div>
            {player.liabilities.length > 0 ? (
              <>
                <div className="flex justify-between">
                  <span className="text-sm">Debt Payments:</span>
                  <span className="text-sm font-medium">
                    ${player.liabilities.reduce((total, l) => total + l.minimumPayment, 0)}
                  </span>
                </div>
                <div className="flex justify-between border-t mt-1 pt-1">
                  <span className="text-sm">Total:</span>
                  <span className="text-sm font-bold">
                    ${player.expenses + player.liabilities.reduce((total, l) => total + l.minimumPayment, 0)}
                  </span>
                </div>
              </>
            ) : (
              <div className="flex justify-between border-t mt-1 pt-1">
                <span className="text-sm">Total:</span>
                <span className="text-sm font-bold">${player.expenses}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Cash Flow</h3>
        <div className={`p-2 rounded-md text-center font-medium ${
          player.salary + player.passiveIncome - player.expenses - player.liabilities.reduce((total, l) => total + l.minimumPayment, 0) >= 0
            ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
            : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
        }`}>
          ${player.salary + player.passiveIncome - player.expenses - player.liabilities.reduce((total, l) => total + l.minimumPayment, 0)} per turn
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Assets</h3>
        <div className="grid grid-cols-4 gap-1 text-center">
          <div className="bg-blue-50 dark:bg-blue-900 p-2 rounded-md">
            <HomeIcon className="h-4 w-4 mx-auto mb-1" />
            <span className="text-xs font-medium block">Properties</span>
            <span className="text-lg font-bold">{assetCounts.realestate}</span>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900 p-2 rounded-md">
            <BarChartIcon className="h-4 w-4 mx-auto mb-1" />
            <span className="text-xs font-medium block">Stocks</span>
            <span className="text-lg font-bold">{assetCounts.stock}</span>
          </div>
          <div className="bg-yellow-50 dark:bg-yellow-900 p-2 rounded-md">
            <BriefcaseIcon className="h-4 w-4 mx-auto mb-1" />
            <span className="text-xs font-medium block">Business</span>
            <span className="text-lg font-bold">{assetCounts.business}</span>
          </div>
          <div className="bg-green-50 dark:bg-green-900 p-2 rounded-md">
            <RocketIcon className="h-4 w-4 mx-auto mb-1" />
            <span className="text-xs font-medium block">Side Hustles</span>
            <span className="text-lg font-bold">{assetCounts.sidehustle}</span>
          </div>
        </div>
      </div>

      {player.liabilities.length > 0 && (
        <div>
          <h3 className="text-sm font-medium mb-2">Liabilities</h3>
          <Card className="bg-red-50 dark:bg-red-900 p-3">
            {player.liabilities.map((liability) => (
              <LiabilityItem key={liability.id} liability={liability} />
            ))}
          </Card>
        </div>
      )}
    </div>
  );
}

// Liability Item Component
function LiabilityItem({ liability }: { liability: Liability }) {
  return (
    <div className="flex justify-between items-center py-1 border-b last:border-b-0 dark:border-red-800">
      <div>
        <div className="font-medium text-sm">{liability.name}</div>
        <div className="text-xs text-red-600 dark:text-red-400">
          ${liability.amount} ({liability.interestRate}% interest)
        </div>
      </div>
      <div className="text-xs text-red-600 dark:text-red-400">
        Min Payment: ${liability.minimumPayment}
      </div>
    </div>
  );
}

// Briefcase Icon
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
