import React, { useState } from "react";

export default function UnitConverter() {
  const unitTable = {
    Length: { m: 1, cm: 100, km: 0.001 },
    Area: { "m²": 1, "cm²": 10000, "km²": 0.000001 },
    Speed: { "m/s": 1, "km/h": 3.6, "mph": 2.23694 },
    Time: { s: 1, min: 1 / 60, hr: 1 / 3600 }
  };

  const [unitCategory, setUnitCategory] = useState("Length");
  const [fromUnit, setFromUnit] = useState("m");
  const [toUnit, setToUnit] = useState("cm");
  const [unitValue, setUnitValue] = useState(1);
  const [unitConverted, setUnitConverted] = useState(0);

  const convertUnit = () => {
    const base = unitTable[unitCategory][fromUnit];
    const target = unitTable[unitCategory][toUnit];
    setUnitConverted(((unitValue / base) * target).toFixed(3));
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md mt-4">
      <h2 className="text-xl font-bold mb-4 text-center sm:text-left">Unit Converter</h2>

      {/* Category dropdown */}
      <select
        className="w-full p-2 border rounded mb-3"
        value={unitCategory}
        onChange={(e) => {
          const cat = e.target.value;
          setUnitCategory(cat);
          const firstUnit = Object.keys(unitTable[cat])[0];
          setFromUnit(firstUnit);
          setToUnit(firstUnit);
        }}
      >
        {Object.keys(unitTable).map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      {/* Converting options */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2 mb-3">
        <input
          type="number"
          className="w-full sm:flex-1 p-2 border rounded mb-2 sm:mb-0"
          value={unitValue}
          onChange={(e) => setUnitValue(e.target.value)}
        />

        <select
          className="w-full sm:w-auto p-2 border rounded mb-2 sm:mb-0"
          value={fromUnit}
          onChange={(e) => setFromUnit(e.target.value)}
        >
          {Object.keys(unitTable[unitCategory]).map((u) => (
            <option key={u} value={u}>{u}</option>
          ))}
        </select>

        <select
          className="w-full sm:w-auto p-2 border rounded"
          value={toUnit}
          onChange={(e) => setToUnit(e.target.value)}
        >
          {Object.keys(unitTable[unitCategory]).map((u) => (
            <option key={u} value={u}>{u}</option>
          ))}
        </select>
      </div>

      {/* Button */}
      <button
        onClick={convertUnit}
        className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 transition"
      >
        Convert
      </button>

      {/* Result */}
      <div className="text-right font-semibold mt-2">
        Converted: {unitConverted}
      </div>
    </div>
  );
}
