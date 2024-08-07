import React from "react";

export default function TextInput() {
  return (
    <div className="absolute bottom-0 left-0 w-full p-2 bg-black bg-opacity-50 backdrop-blur-lg flex justify-center">
      <div className="w-5/6">
        <input
          type="text"
          className="p-2 mb-4 w-full rounded-lg bg-white bg-opacity-5 text-white placeholder-white focus:outline-none"
          placeholder="Type your message..."
        />
      </div>
    </div>
  );
}
