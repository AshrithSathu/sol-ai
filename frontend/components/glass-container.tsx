import React from "react";

export default function GlassContainer() {
  return (
    <div className="absolute inset-0 flex justify-center items-center">
      <div className="bg-white bg-opacity-5 backdrop-blur-lg rounded-lg w-5/6 h-5/6 p-4 text-white"></div>
    </div>
  );
}
