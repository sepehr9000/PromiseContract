"use client";

import { useAccount, useConnect, useDisconnect } from "wagmi";
import { WalletComponents } from "./wallet";
import TransactionComponents from "./TransactionComponents";
import Link from "next/link";

export default function App() {
  const { address, isConnected } = useAccount();
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { disconnect } = useDisconnect();

  return (
    <div className="min-h-screen flex flex-col p-4">
      <header className="flex justify-between items-center mb-8">
        <Link href="/" className="text-xl font-bold">
          Home
        </Link>
        {/* <WalletComponents /> */}
        <button
          onClick={
            isConnected
              ? () => disconnect()
              : () => connect({ connector: connectors[0] })
          }
          className="px-4 py-2 bg-blue-500 text-black rounded"
        >
          {isConnected ? "Disconnect" : "Connect Wallet"}
        </button>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center space-y-8">
        <div className="space-x-4">
          <Link href="/join">Join</Link>
          <Link href="/create">Create</Link>
        </div>

        {/* <TransactionComponents /> */}
      </main>
    </div>
  );
}
