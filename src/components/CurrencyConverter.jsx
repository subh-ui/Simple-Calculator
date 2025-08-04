import React, { useState, useEffect } from "react";

export default function CurrencyConverter() {
  const [currencyRates, setCurrencyRates] = useState({});
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [currencyAmount, setCurrencyAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(0);

  useEffect(() => {
    fetch(
      `https://v6.exchangerate-api.com/v6/685cf7e0bab07ef13cb10a93/latest/${fromCurrency}`
    )
      .then((res) => res.json())
      .then((data) => setCurrencyRates(data.conversion_rates));
  }, [fromCurrency]);

  const convertCurrency = () => {
    if (currencyRates[toCurrency]) {
      const rate = currencyRates[toCurrency];
      setConvertedAmount((currencyAmount * rate).toFixed(2));
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md mt-10">
      <h2 className="text-xl font-bold mb-4">Currency Converter</h2>
      <div className="flex mb-2">
        <input
          type="number"
          className="flex-1 p-2 border rounded mr-2"
          value={currencyAmount}
          onChange={(e) => setCurrencyAmount(e.target.value)}
        />
        <select
          className="p-2 border rounded mr-2"
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
        >
          {Object.keys(currencyRates).map((cur) => (
            <option key={cur} value={cur}>{cur}</option>
          ))}
        </select>
        <select
          className="p-2 border rounded"
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
        >
          {Object.keys(currencyRates).map((cur) => (
            <option key={cur} value={cur}>{cur}</option>
          ))}
        </select>
      </div>
      <button
        onClick={convertCurrency}
        className="w-full bg-orange-500 text-white py-2 rounded mb-2 hover:bg-orange-600"
      >
        Convert
      </button>
      <div className="text-right text-lg font-semibold">
        Converted Amount: {convertedAmount}
      </div>
    </div>
  );
}
