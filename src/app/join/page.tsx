"use client";

import { useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import Link from "next/link";

export default function CreatePage() {
  const { isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const [groupName, setGroupName] = useState("");

  const handleJoinGroup = () => {
    // Handle the logic for joining the group, such as sending groupName to the backend
    console.log("Joining group:", groupName);
  };

  return (
    <div className="min-h-screen flex flex-col p-4">
      {/* Header Section */}
      <header className="flex justify-between items-center mb-8">
        {/* Home Link */}
        <Link
          href="/"
          className="text-xl font-bold text-blue-700 hover:text-blue-500"
        >
          Home
        </Link>

        {/* Connect Wallet Button */}
        <button
          onClick={
            isConnected
              ? () => disconnect()
              : () => connect({ connector: connectors[0] })
          }
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          {isConnected ? "Disconnect" : "Connect Wallet"}
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center space-y-8">
        <h1 className="text-2xl font-bold">Create a Group</h1>

        {/* Group Name Input */}
        <div className="flex flex-col items-center space-y-4">
          <label htmlFor="groupName" className="text-lg font-medium">
            Group Name
          </label>
          <input
            type="text"
            id="groupName"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            className="px-4 py-2 border rounded w-64 text-center"
            placeholder="Enter group name"
          />
          <Link href="/mygroup">
            <button
              onClick={handleJoinGroup}
              className="px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600 transition"
            >
              Join Group
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}
