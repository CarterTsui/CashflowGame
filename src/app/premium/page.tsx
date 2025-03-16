import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { ArrowRightIcon, CheckIcon } from "@radix-ui/react-icons";

export default function PremiumPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 p-4 md:p-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-green-800 dark:text-green-300 mb-4 text-center">
          Upgrade Your Experience
        </h1>
        <p className="text-xl text-green-700 dark:text-green-400 text-center mb-12">
          Unlock premium features to accelerate your path to financial freedom
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Basic Plan */}
          <Card className="bg-white dark:bg-gray-800 shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl">Basic</CardTitle>
              <CardDescription className="text-lg">
                <span className="text-3xl font-bold">Free</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start">
                <CheckIcon className="h-5 w-5 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Standard gameplay experience</span>
              </div>
              <div className="flex items-start">
                <CheckIcon className="h-5 w-5 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Access to local multiplayer</span>
              </div>
              <div className="flex items-start">
                <CheckIcon className="h-5 w-5 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Basic in-game assets</span>
              </div>
              <div className="flex items-start">
                <CheckIcon className="h-5 w-5 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Standard market conditions</span>
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/game" className="w-full">
                <Button className="w-full bg-gray-600 hover:bg-gray-700">
                  Continue Free
                </Button>
              </Link>
            </CardFooter>
          </Card>

          {/* Premium Plan */}
          <Card className="bg-white dark:bg-gray-800 shadow-xl transform translate-y-[-10px] border-green-500">
            <div className="bg-green-600 text-white text-center py-2 font-medium">
              MOST POPULAR
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl">Premium</CardTitle>
              <CardDescription className="text-lg">
                <span className="text-3xl font-bold">$4.99</span> / month
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start">
                <CheckIcon className="h-5 w-5 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Everything in Basic</span>
              </div>
              <div className="flex items-start">
                <CheckIcon className="h-5 w-5 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                <span><strong>Financial Advisor</strong> boost (investment tips)</span>
              </div>
              <div className="flex items-start">
                <CheckIcon className="h-5 w-5 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Exclusive premium assets with higher returns</span>
              </div>
              <div className="flex items-start">
                <CheckIcon className="h-5 w-5 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                <span><strong>Lucky Dice</strong> - Roll twice and pick best roll</span>
              </div>
              <div className="flex items-start">
                <CheckIcon className="h-5 w-5 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Online multiplayer</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-green-600 hover:bg-green-700">
                Upgrade Now
              </Button>
            </CardFooter>
          </Card>

          {/* Tycoon Plan */}
          <Card className="bg-white dark:bg-gray-800 shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl">Tycoon</CardTitle>
              <CardDescription className="text-lg">
                <span className="text-3xl font-bold">$9.99</span> / month
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start">
                <CheckIcon className="h-5 w-5 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Everything in Premium</span>
              </div>
              <div className="flex items-start">
                <CheckIcon className="h-5 w-5 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                <span><strong>Fast-Track Wealth</strong> - Start with extra $1000</span>
              </div>
              <div className="flex items-start">
                <CheckIcon className="h-5 w-5 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                <span>VIP investment opportunities with highest returns</span>
              </div>
              <div className="flex items-start">
                <CheckIcon className="h-5 w-5 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Limited-time special events and challenges</span>
              </div>
              <div className="flex items-start">
                <CheckIcon className="h-5 w-5 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Advanced financial reports and analytics</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                Go Tycoon
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="mt-16 max-w-2xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-green-700 dark:text-green-300 mb-4">
            Why Upgrade?
          </h2>
          <div className="space-y-4">
            <p>
              Upgrading your CashFlow Tycoon experience isn't just about getting ahead in the game - it's about enhancing your financial education journey!
            </p>
            <p>
              With premium features, you'll have access to more realistic investment opportunities, expert financial advice, and special gameplay advantages that mirror real-world wealth building strategies.
            </p>
            <p>
              Our premium tiers are designed to enhance learning while keeping the game fun and engaging. The faster you build wealth in the game, the quicker you'll develop real financial intuition!
            </p>
            <div className="mt-6">
              <Link href="/game">
                <Button className="bg-green-600 hover:bg-green-700">
                  Back to Game <ArrowRightIcon className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
