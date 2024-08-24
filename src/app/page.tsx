import Navbar from "@/components/ui/navbar";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";

export default function Home() {
  const words = [
    { text: "Build", className: "text-blue-700 dark:text-blue-400" },
    { text: "on", className: "text-gray-900 dark:text-gray-300" },
    { text: "Cloud.", className: "text-gray-900 dark:text-gray-300" },
  ];
  return (
    <>
      <div className="relative h-screen w-screen">
        <Navbar />
        <div className="absolute inset-0 z-[-2] bg-white dark:bg-black bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)] dark:bg-[radial-gradient(100%_50%_at_50%_0%,rgba(255,255,255,0.13)_0,rgba(0,0,0,0)_50%,rgba(0,0,0,0)_100%)]">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-4xl sm:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 dark:from-neutral-400 dark:to-neutral-800 py-8">
              <TypewriterEffectSmooth words={words} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
