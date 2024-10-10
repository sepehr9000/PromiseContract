"use client";

import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      {/* Big Blue Check Mark */}
      <div className="mb-8 flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-32 w-32 text-blue-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      {/* Success Message */}
      <h1 className="text-3xl font-bold text-gray-700 mb-4">Success!</h1>
      <p className="text-lg text-gray-600 mb-8">
        Your action was completed successfully.
      </p>

      {/* Return Home Button */}
      <Link href="/">
        <button className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105">
          Return Home
        </button>
      </Link>
    </div>
  );
}
