import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export default function Component() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="w-full p-4 flex justify-between items-center bg-background">
        <Link href="/">
          <Button variant="ghost">
            <Home className="h-6 w-6" />
            <span className="sr-only">Home</span>
          </Button>
        </Link>
        <Button>Connect Wallet</Button>
      </header>
      <main className="flex-grow flex items-center justify-center">
        <div className="space-x-4">
          <Button size="lg">Join</Button>
          <Button size="lg">Create</Button>
        </div>
      </main>
    </div>
  );
}
