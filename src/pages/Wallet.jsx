import React, { useEffect, useState, useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import { toast } from "react-toastify";

function Wallet() {
  const apiUrl = import.meta.env.VITE_BACKEND_URL;
  const { token } = useContext(StoreContext);
  const [balance, setBalance] = useState(null);
  const [amount, setAmount] = useState("");

  // Fetch wallet balance
  async function fetchWallet() {
    try {
      const res = await fetch(`${apiUrl}/wallet/balance`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setBalance(data.wallet.balance);
    } catch (err) {
      console.error("Error fetching wallet:", err);
    }
  };

  // Fund wallet
  async function handleFund() {
    if (!amount || parseFloat(amount) <= 0) {
      return toast.warning("Please enter a valid amount");
    }

    try {
      const res = await fetch(`${apiUrl}/wallet/fund`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ amount: parseFloat(amount) }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Wallet funded successfully!");
        setAmount("");
        fetchWallet(); // Refresh balance
      } else {
        toast.error(data.message || "Failed to fund wallet.");
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
      console.error(err);
    }
  }

  useEffect(() => {
    if (token) {
      fetchWallet();
    }
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-xl mx-auto bg-white p-6 rounded shadow flex flex-col items-center">
        <h2 className="text-2xl font-semibold mb-4 text-center text-black-700">
          Wallet
        </h2>
        <div className="mb-6">
          <p className="text-gray-700 text-lg">
            Current Balance:{" "}
            <span className="font-bold text-green-600">
              ₦{balance !== null ? balance.toFixed(2) : "Loading..."}
            </span>
          </p>
        </div>

        <div className="mb-4">
          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <button
          onClick={handleFund}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
        >
          Fund Wallet
        </button>
      </div>
    </div>
  );
}

export default Wallet;
