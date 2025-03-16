"use client";

import { useState, useEffect } from "react";
import ReactDice from "react-dice-roll";
import { useGameStore } from "@/lib/store";

interface DiceRollProps {
  onComplete: (value: number) => void;
}

export default function DiceRoll({ onComplete }: DiceRollProps) {
  const [value, setValue] = useState<1 | 2 | 3 | 4 | 5 | 6>(1);

  useEffect(() => {
    // Auto-roll when the component mounts
    const timer = setTimeout(() => {
      // We'll let the dice library handle the actual roll
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleRoll = (rollValue: number) => {
    // Since rollValue is 1-6, we can safely cast it
    setValue(rollValue as 1 | 2 | 3 | 4 | 5 | 6);

    // Use a timeout to allow the dice animation to complete
    setTimeout(() => {
      onComplete(rollValue);
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center">
      <div style={{ height: '100px', width: '100px' }}>
        <ReactDice
          onRoll={handleRoll}
          defaultValue={value}
          size={80}
        />
      </div>
      <p className="mt-4 text-lg font-medium">
        {value > 0 ? `You rolled a ${value}!` : "Rolling..."}
      </p>
    </div>
  );
}
