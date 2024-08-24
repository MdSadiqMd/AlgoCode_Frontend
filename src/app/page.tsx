import Navbar from "@/components/ui/navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-white dark:bg-black bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)] dark:bg-[radial-gradient(100%_50%_at_50%_0%,rgba(255,255,255,0.13)_0,rgba(0,0,0,0)_50%,rgba(0,0,0,0)_100%)]">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center">
          <p className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 dark:from-neutral-400 dark:to-neutral-800 py-8">
            Backgrounds
          </p>
        </div>
      </div>
    </>
  );
}