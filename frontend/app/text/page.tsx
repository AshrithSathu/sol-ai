import GlassContainer from "@/components/glass-container";
import TextInput from "@/components/text-input";
import React from "react";
import Starfield from "react-starfield";

export default function Text() {
  return (
    <div className="relative h-screen bg-black">
      <Starfield
        starCount={1000}
        starColor={[255, 255, 255]}
        speedFactor={0.05}
        backgroundColor="black"
      />
      <GlassContainer />
      <TextInput />
    </div>
  );
}
