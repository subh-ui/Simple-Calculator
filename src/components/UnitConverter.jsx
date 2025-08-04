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
      <h2 className="text-xl font-bold mb-4">Unit Converter</h2>
      <select
        className="w-full p-2 border rounded mb-2"
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

      <div className="flex mb-2 gap-2">
        <input
          type="number"
          className="flex-1 p-2 border rounded"
          value={unitValue}
          onChange={(e) => setUnitValue(e.target.value)}
        />
        <select
          className="p-2 border rounded"
          value={fromUnit}
          onChange={(e) => setFromUnit(e.target.value)}
        >
          {Object.keys(unitTable[unitCategory]).map((u) => (
            <option key={u} value={u}>{u}</option>
          ))}
        </select>
        <select
          className="p-2 border rounded"
          value={toUnit}
          onChange={(e) => setToUnit(e.target.value)}
        >
          {Object.keys(unitTable[unitCategory]).map((u) => (
            <option key={u} value={u}>{u}</option>
          ))}
        </select>
      </div>
      <button onClick={convertUnit} className="w-full bg-yellow-400 py-2 rounded hover:bg-yellow-500 mb-2">
        Convert
      </button>
      <div className="text-right font-semibold">Converted: {unitConverted}</div>
    </div>
  );
}
