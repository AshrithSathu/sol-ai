"use client";
import React, { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";

interface TextInputProps {
  onSend: (message: string) => void;
}

export default function TextInput({ onSend }: TextInputProps) {
  const [input, setInput] = useState("");
  const { publicKey, signTransaction } = useWallet();

  const handleSend = async () => {
    if (!publicKey || !signTransaction) {
      console.error("Wallet not connected or signTransaction not available");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/api/groq", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: input,
          walletAddress: publicKey.toBase58(), // Send wallet address as string
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data.message); // Handle the response message as needed
      onSend(input);
      setInput("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="absolute bottom-0 left-0 flex w-full justify-center bg-black bg-opacity-50 p-2 backdrop-blur-lg">
      <div className="flex w-5/6 items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="mb-4 w-full rounded-lg bg-white bg-opacity-5 p-2 text-white placeholder-white focus:outline-none"
          placeholder="Type your message..."
        />
        <button
          type="button"
          onClick={handleSend}
          className="mb-4 ml-2 rounded-lg bg-blue-500 p-2 text-white hover:bg-blue-600 focus:outline-none"
        >
          Send
        </button>
      </div>
    </div>
  );
}
