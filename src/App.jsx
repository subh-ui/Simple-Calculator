import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import "./App.css";
import ScientificCalculator from "./components/ScientificCalculator";
import UnitConverter from "./components/UnitConverter";
import CurrencyConverter from "./components/CurrencyConverter";

export default function App() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(0);

  const calculate = () => {
    try {
      let expression = input
        .replace(/sin\(/g, "Math.sin(")
        .replace(/cos\(/g, "Math.cos(")
        .replace(/tan\(/g, "Math.tan(")
        .replace(/sqrt\(/g, "Math.sqrt(")
        .replace(/log\(/g, "Math.log(")
        .replace(/exp\(/g, "Math.exp(")
        .replace(/pi/g, Math.PI)
        .replace(/e/g, Math.E);
      const evalResult = eval(expression);
      setResult(evalResult);
    } catch (err) {
      alert("Invalid expression");
    }
  };

  const BasicCalculator = () => (
    <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md">
      <input
        type="text"
        className="w-full p-2 text-xl border rounded"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="0"
      />
      <div className="grid grid-cols-4 gap-2 mt-4">
        {["C", "()", "%", "/", "7", "8", "9", "*", "4", "5", "6", "-", "1", "2", "3", "+", "+/-", "0", ".", "="].map((btn) => (
          <button
            key={btn}
            onClick={() => {
              if (btn === "=") calculate();
              else if (btn === "C") {
                setInput("");
                setResult(0);
              } else setInput(input + btn);
            }}
            className="bg-amber-400 rounded py-2 text-xl font-bold hover:bg-amber-500"
          >
            {btn}
          </button>
        ))}
      </div>
      <div className="mt-4 text-right text-2xl font-semibold">Result: {result}</div>
    </div>
  );

  return (
    <Router>
      <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-orange-500 via-amber-400 to-yellow-300 p-4">
        <h1 className="text-4xl font-bold mb-6 text-center text-white">Simple Calculator</h1>

        <nav className="w-full max-w-md bg-white shadow rounded-xl flex justify-around p-3 mb-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-orange-600 font-bold" : "text-gray-700 hover:text-orange-500"
            }
          >
            Basic
          </NavLink>
          <NavLink
            to="/scientific"
            className={({ isActive }) =>
              isActive ? "text-orange-600 font-bold" : "text-gray-700 hover:text-orange-500"
            }
          >
            Scientific
          </NavLink>
          <NavLink
            to="/unit"
            className={({ isActive }) =>
              isActive ? "text-orange-600 font-bold" : "text-gray-700 hover:text-orange-500"
            }
          >
            Unit
          </NavLink>
          <NavLink
            to="/currency"
            className={({ isActive }) =>
              isActive ? "text-orange-600 font-bold" : "text-gray-700 hover:text-orange-500"
            }
          >
            Currency
          </NavLink>
        </nav>

        <Routes>
          <Route path="/" element={<BasicCalculator />} />
          <Route path="/scientific" element={<ScientificCalculator input={input} setInput={setInput} />} />
          <Route path="/unit" element={<UnitConverter />} />
          <Route path="/currency" element={<CurrencyConverter />} />
        </Routes>
      </div>
    </Router>
  );
}