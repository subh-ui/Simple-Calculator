import React from "react";

export default function ScientificCalculator({ input, setInput }) {
  const buttons = [
    "sin(", "cos(", "tan(", "sqrt(", "log(", "exp(", "pi", "e", "^"
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md mt-4 mb-10">
      <h2 className="text-xl font-bold mb-4">Scientific Calculator</h2>
      <div className="grid grid-cols-4 gap-2 mb-4">
        {buttons.map((btn) => (
          <button
            key={btn}
            onClick={() => setInput(input + btn)}
            className="bg-red-400 rounded py-2 text-lg font-bold hover:bg-red-500"
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
}
