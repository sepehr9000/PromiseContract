"use client";

import { useAccount, useConnect, useDisconnect } from "wagmi";
import Link from "next/link";
import {
  ConnectWallet,
  ConnectWalletText,
  Wallet,
  WalletDefault,
  WalletDropdown,
  WalletDropdownDisconnect,
  WalletDropdownLink,
} from "@coinbase/onchainkit/wallet";
import {
  Address,
  Avatar,
  EthBalance,
  Identity,
  Name,
} from "@coinbase/onchainkit/identity";

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
        // omitted for brevity
        <Wallet>
          <ConnectWallet className="bg-blue-500">
            <ConnectWalletText>Log In</ConnectWalletText>
            <Avatar className="h-6 w-6" />
            <Name className="text-white" />
          </ConnectWallet>
          <WalletDropdown>
            <Identity
              className="px-4 pt-3 pb-2 hover:bg-blue-500"
              hasCopyAddressOnClick
            >
              <Avatar />
              <Name />
              <Address />
              <EthBalance />
            </Identity>
            <WalletDropdownLink
              className="hover:bg-blue-200"
              icon="wallet"
              href="https://keys.coinbase.com"
            >
              Wallet
            </WalletDropdownLink>
            <WalletDropdownDisconnect className="hover:bg-blue-200" />
          </WalletDropdown>
        </Wallet>
        {/* Connect Wallet Button
        <button
          onClick={
            isConnected
              ? () => disconnect()
              : () => connect({ connector: connectors[0] })
          }
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          {isConnected ? "Disconnect" : "Connect Wallet"}
        </button> */}
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center space-y-8">
        {/* Join and Create Buttons */}
        <div className="space-x-4">
          <Link href="/join">
            <button className="px-20 py-8 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
              Join
            </button>
          </Link>
          <Link href="/create">
            <button className="px-20 py-8 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
              Create
            </button>
          </Link>
          <Link href="/mygroup">
            <button className="px-20 py-8 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
              My Group
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}
