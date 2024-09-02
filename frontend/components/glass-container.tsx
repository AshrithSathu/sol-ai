import React from "react";

export default function GlassContainer({ data }: { data: string }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="h-5/6 w-5/6 rounded-lg bg-white bg-opacity-5 p-4 text-white backdrop-blur-lg">
        {data}
      </div>
    </div>
  );
}
