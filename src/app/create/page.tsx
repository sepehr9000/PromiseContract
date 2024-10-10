// src/app/create.tsx
"use client";
import Link from "next/link";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreatePage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [cadence, setCadence] = useState("");
  const [endDate, setEndDate] = useState("");
  const [maxUsers, setMaxUsers] = useState("");
  const [rewardWallet, setRewardWallet] = useState("");

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here (e.g., send the data to an API or backend)
    console.log({
      name,
      description,
      cadence,
      endDate,
      maxUsers,
      rewardWallet,
    });

    // For now, redirect back to home after form submission
    router.push("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Create a New Promise</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-4">
        <div>
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">Cadence (in hours)</label>
          <input
            type="number"
            value={cadence}
            onChange={(e) => setCadence(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">Promise End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">Max # of Users</label>
          <input
            type="number"
            value={maxUsers}
            onChange={(e) => setMaxUsers(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded"
          />
        </div>
        <div className="relative">
          <label className="block text-gray-700 flex items-center">
            Reward Wallet Destination (optional)
            {/* Tooltip Icon */}
            <span className="ml-2 text-gray-500 relative group cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v2m0 4h.01M12 5a7 7 0 1 1 0 14 7 7 0 0 1 0-14z"
                />
              </svg>
              {/* Tooltip */}
              <span className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-64 p-2 bg-gray-700 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                If nothing is entered, the prize money pool is redistributed
                evenly to those still in the competition by the end date.
              </span>
            </span>
          </label>
          <input
            type="text"
            value={rewardWallet}
            onChange={(e) => setRewardWallet(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded"
            placeholder="Leave blank to redistribute funds"
          />
        </div>
        <Link href="/success">
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </Link>
      </form>
    </div>
  );
}
