"use client";
import GlassContainer from "@/components/glass-container";
import TextInput from "@/components/text-input";
import React, { useState } from "react";
import Starfield from "react-starfield";

import { Wallet } from "@/components/wallet";
function MyApp() {
  const [data, setData] = useState("");
  const handleSend = (input) => {
    setData(input);
  };
  return (
    <Wallet>
      <div className="relative h-screen bg-black">
        <Starfield
          starCount={1000}
          starColor={[255, 255, 255]}
          speedFactor={0.05}
          backgroundColor="black"
        />
        <GlassContainer data={data} />
        <TextInput onSend={handleSend} />
      </div>
    </Wallet>
  );
}

export default MyApp;
