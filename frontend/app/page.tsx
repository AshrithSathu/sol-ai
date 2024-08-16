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
      <div className="flex h-full flex-col items-center justify-center bg-black text-white">
        <div className="flex flex-col items-center space-y-4 md:flex-row md:space-x-1 md:space-y-0">
          <p className="text-2xl font-bold text-gray-300 sm:text-3xl md:text-4xl">
            Welcome to Wallet
          </p>
          <FlipWords
            words={["Talk", "Chat"]}
            className="text-2xl font-semibold text-white sm:text-3xl md:text-4xl"
          />
        </div>
      </div>
      <div className="absolute bottom-0 left-1/2 mb-4 -translate-x-1/2 transform">
        <Link
          href="/text"
          className="hover-text-change inline-block rounded border border-current px-8 py-3 text-sm font-medium text-gray-600 transition hover:rotate-2 hover:scale-110 focus:outline-none focus:ring active:text-indigo-500"
        ></Link>
      </div>
    </div>
  );
}
