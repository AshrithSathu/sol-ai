import React from "react";

export default function TextInput() {
  return (
    <div className="absolute bottom-0 left-0 flex w-full justify-center bg-black bg-opacity-50 p-2 backdrop-blur-lg">
      <div className="w-5/6">
        <input
          type="text"
          className="mb-4 w-full rounded-lg bg-white bg-opacity-5 p-2 text-white placeholder-white focus:outline-none"
          placeholder="Type your message..."
        />
      </div>
    </div>
  );
}
