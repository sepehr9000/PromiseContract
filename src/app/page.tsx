"use client";

import { useAccount, useConnect, useDisconnect } from "wagmi";
import Link from "next/link";

export default function App() {
  const { address, isConnected } = useAccount();
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { disconnect } = useDisconnect();

  return (
    <div className="min-h-screen flex flex-col p-4">
      {/* Header Section */}
      <header className="flex justify-between items-center mb-8">
        {/* Home Link */}
        <Link
          href="/"
          className="text-xl font-bold text-blue-500 hover:text-blue-500"
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
        {/* Join and Create Buttons */}
        <div className="space-x-4">
          <Link href="/join">
            <button className="px-80 py-80 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
              Join
            </button>
          </Link>
          <Link href="/create">
            <button className="px-80 py-80 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
              Create
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}
