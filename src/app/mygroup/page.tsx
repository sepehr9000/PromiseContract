"use client";

import { useState } from "react";
import Link from "next/link"; // Import Link from next

// Dummy Data (for active participants and users to verify)
const dummyParticipants = [
  { username: "Alice", active: true },
  { username: "Bob", active: false },
  { username: "Charlie", active: true },
];

const dummyUsersToVerify = [
  { username: "Dave", image: "/user-dave.jpg" },
  { username: "Eve", image: "/user-eve.jpg" },
];

export default function JoinGroupPage() {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [verifiedUsers, setVerifiedUsers] = useState({});

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadedImage(e.target.files[0]);
    }
  };

  const handleVerifyUser = (username: string, isVerified: boolean) => {
    setVerifiedUsers((prev) => ({
      ...prev,
      [username]: isVerified,
    }));
  };

  const handleSubmitImage = () => {
    console.log("Image submitted:", uploadedImage);
    // Add logic to upload the image to your backend or cloud storage
  };

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      {/* Link to go back to the Home Page */}
      <Link
        href="/"
        className="text-xl font-bold text-blue-500 hover:text-blue-600"
      >
        Home
      </Link>

      {/* Group Name Section */}
      <section className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Group Name</h1>
        <p className="text-lg mb-4">Next Submission Date: 2024-12-31</p>
        <div className="flex items-center space-x-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="border border-gray-300 px-4 py-2"
          />
          <button
            onClick={handleSubmitImage}
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </section>

      {/* Verify Users Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Verify Users</h2>
        <div className="space-y-4">
          {dummyUsersToVerify.map((user) => (
            <div
              key={user.username}
              className="flex items-center justify-between bg-white shadow-md p-4 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={user.image}
                  alt={`${user.username}'s image`}
                  className="h-16 w-16 object-cover rounded-full border"
                />
                <span className="text-lg font-semibold">{user.username}</span>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() => handleVerifyUser(user.username, true)}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  ✓
                </button>
                <button
                  onClick={() => handleVerifyUser(user.username, false)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Active Participants Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Active Participants</h2>
        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left">Username</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {dummyParticipants.map((participant) => (
              <tr key={participant.username}>
                <td className="px-4 py-2 border-b">{participant.username}</td>
                <td className="px-4 py-2 border-b">
                  {participant.active ? (
                    <span className="text-green-500 font-semibold">✓</span>
                  ) : (
                    <span className="text-red-500 font-semibold">✕</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
