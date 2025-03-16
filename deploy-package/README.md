# CashFlow Tycoon

CashFlow Tycoon is a financial simulation game that teaches players about money management, investing, and building passive income to achieve financial freedom.

## 🎮 Features

- 🎲 Roll dice to move around the game board
- 💰 Earn income, manage expenses, and build passive income streams
- 🏢 Buy and sell various types of assets (real estate, stocks, businesses, side hustles)
- 🎯 Work toward financial freedom by building sufficient passive income
- 🎭 Experience random events that can impact your financial journey
- 🏆 Track achievements and milestones
- 💾 Save and load game progress using browser local storage

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or Bun package manager

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/cashflow-tycoon.git
cd cashflow-tycoon
```

2. Install dependencies
```bash
npm install
# or
bun install
```

3. Start the development server
```bash
npm run dev
# or
bun run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🏗️ Built With

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Shadcn UI](https://ui.shadcn.com/) - UI component library
- [Zustand](https://github.com/pmndrs/zustand) - State management
- [Radix UI](https://www.radix-ui.com/) - Headless UI components

## 📱 Game Mechanics

### Game Board
Move around a board with different tile types:
- Income: Earn additional cash
- Expense: Pay unexpected expenses
- Investment: Opportunities to buy assets
- Opportunity: Positive random events
- Risk: Negative random events
- Event: Draw special event cards
- Go: Collect salary when passing

### Financial Freedom
The goal is to reach financial freedom by building passive income that exceeds your target amount. You can generate passive income by:
- Buying real estate properties
- Investing in stocks
- Starting businesses
- Creating side hustles

### Save & Load
Your game progress is saved to browser local storage, allowing you to:
- Save multiple game sessions
- Load previous games
- Continue your financial journey across multiple play sessions

## 🧪 Testing the Save/Load Functionality

1. **Start a New Game**: Create a new game and make some progress
2. **Save Your Game**: Use the save button in the game interface
3. **Refresh the Browser**: Close or refresh your browser tab
4. **Load Your Game**: Use the load button to continue where you left off
5. **Try the Demo**: Visit the /save page to test the save/load system

## 🚢 Deployment

For deployment instructions, please see [DEPLOYMENT.md](./DEPLOYMENT.md).

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgements

- Inspired by Robert Kiyosaki's Cashflow board game
- Game icons provided by [Radix Icons](https://icons.radix-ui.com/)
