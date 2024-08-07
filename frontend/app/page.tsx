import { FlipWords } from "@/components/ui/flip-words";
import Link from "next/link";
import Starfield from "react-starfield";

export default function Home() {
  return (
    <div className="relative h-screen">
      <Starfield
        starCount={1000}
        starColor={[255, 255, 255]}
        speedFactor={0.05}
        backgroundColor="black"
      />
      <div className="flex flex-col justify-center items-center h-full bg-black text-white">
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-1">
          <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-300">
            Welcome to Wallet
          </p>
          <FlipWords
            words={["Talk", "Chat"]}
            className="text-white text-2xl sm:text-3xl md:text-4xl font-semibold"
          />
        </div>
      </div>
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-4">
        <Link
          href="/text"
          className="hover-text-change inline-block rounded border border-current px-8 py-3 text-sm font-medium text-gray-600 transition hover:rotate-2 hover:scale-110 focus:outline-none focus:ring active:text-indigo-500"
        ></Link>
      </div>
    </div>
  );
}
