"use client";

import Link from "next/link";
import { Bricolage_Grotesque, Space_Mono } from 'next/font/google';

import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import { Testimonials } from "@/components/ui/testimonials";

const fontHeading = Bricolage_Grotesque({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading',
});

const fontBody = Space_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
  weight: "400"
});

export default function Home() {
  const words = [
    { text: "Build", className: "text-blue-700 dark:text-blue-400" },
    { text: "on", className: "text-gray-900 dark:text-gray-300" },
    { text: "Cloud.", className: "text-gray-900 dark:text-gray-300" },
  ];

  const testimonials = [
    {
      quote: "AlgoCode saved me from a mid-life crisis—now I only panic about algorithms!",
      name: "K.V.N.P.S. Akhil",
      title: "Game Developer Extraordinaire",
      href: "/akhil.jpg",
    },
    {
      quote: "Customer service so good, I thought I was talking to my mom. She also says I’m special.",
      name: "S. Bargava Ravikanth",
      title: "AR/VR Sorcerer",
      href: "/ravikanth.jpg",
    },
    {
      quote: "Using AlgoCode made me so productive, I finished my work and my colleague's too. Now they avoid me.",
      name: "Hussain Sharif",
      title: "Code Ninja",
      href: "/sharif.jpg",
    },
    {
      quote: "I built this website, so giving it anything less than 5 stars would be awkward, right?",
      name: "Sadiq Mohammad",
      title: "Self-Proclaimed Genius",
      href: "/sadiq.jpg",
    },
    {
      quote: "I’ve tried every Cloud IDE out there—this one finally convinced me to stop looking.",
      name: "Mohitananda Sanjay",
      title: "Frontend Wizard",
      href: "/sanjay.jpg",
    },
  ];

  return (
    <>
      <style jsx global>{`
        :root {
          --font-heading: ${fontHeading.style.fontFamily};
          --font-body: ${fontBody.style.fontFamily};
        }
        body {
          font-family: var(--font-body);
        }
        h1, h2, h3, h4, h5, h6 {
          font-family: var(--font-heading);
        }
      `}</style>
      <div className="flex flex-col min-h-[100dvh]">
        <header className="px-4 lg:px-6 h-14 flex items-center">
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <Navbar />
          </nav>
        </header>
        <main className="flex-1">
          <section className="w-full py-12 md:py-18 lg:py-20">
            <div className="container px-4 md:px-6">
              <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                <div className="flex flex-col justify-center space-y-4">
                  <div className="space-y-2">
                    <h1 className="text-3xl text-muted-foreground font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                      <TypewriterEffectSmooth words={words} />
                    </h1>
                    <p className="max-w-[600px] text-muted-foreground dark:text-[#CCFFFF] md:text-xl">
                      Run your code in the cloud, no installs needed! Thanks to Docker🐳 (and me 😉).
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 min-[400px]:flex-row">
                    <Link
                      href="#"
                      className="inline-flex h-10 items-center justify-center rounded-md dark:bg-[#CCFFFF] bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                      prefetch={false}
                    >
                      Try the IDE
                    </Link>
                  </div>
                </div>
                <div
                  contentEditable={true}
                  suppressContentEditableWarning={true}
                  className=" h-[570px] aspect-square overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
                >
                  <pre className="bg-[#f0ece3] dark:bg-[#282c34] text-[#abb2bf] p-6 rounded-lg overflow-auto">
                    <code className="block p-4 rounded-lg bg-[#F0ECE3] dark:bg-[#282c34] text-[#282c34] dark:text-[#abb2bf]">
                      <span className="text-purple-700 dark:text-purple-400">public class</span> <span className="text-yellow-700 dark:text-yellow-300">AlgoCode</span> {'{'}
                      <br />
                      {'    '}<span className="text-purple-700 dark:text-purple-400">public static void</span> <span className="text-blue-600 dark:text-blue-400">main</span>(<span className="text-yellow-700 dark:text-yellow-300">String</span>[] args) {'{'}
                      <br />
                      {'      '}<span className="text-purple-700 dark:text-purple-400">while</span> (<span className="text-red-600 dark:text-red-400">true</span>) {'{'}
                      <br />
                      {'        '}<span className="text-purple-700 dark:text-purple-400">try</span> {'{'}
                      <br />
                      {'          '}<span className="text-blue-600 dark:text-blue-400">solveAllProblems</span>();
                      <br />
                      {'          '}<span className="text-purple-700 dark:text-purple-400">break</span>;
                      <br />
                      {'        '}{'}'} <span className="text-purple-700 dark:text-purple-400">catch</span> (<span className="text-yellow-700 dark:text-yellow-300">CoffeeNotFoundException</span> e) {'{'}
                      <br />
                      {'          '}<span className="text-blue-600 dark:text-blue-400">drinkMoreCoffee</span>();
                      <br />
                      {'        '}{'}'} <span className="text-purple-700 dark:text-purple-400">catch</span> (<span className="text-yellow-700 dark:text-yellow-300">BrainNotFoundException</span> e) {'{'}
                      <br />
                      {'            '}<span className="text-yellow-700 dark:text-yellow-300">System</span>.out.println(<span className="text-green-700 dark:text-green-300">"Error 404: Brain not found. Have you tried turning it off and on again?"</span>);
                      <br />
                      {'        '}{'}'} <span className="text-purple-700 dark:text-purple-400">catch</span> (<span className="text-yellow-700 dark:text-yellow-300">StackOverflowError</span> e) {'{'}
                      <br />
                      {'            '}<span className="text-yellow-700 dark:text-yellow-300">System</span>.out.println(<span className="text-green-700 dark:text-green-300">"Oops! Your code is more recursive than your procrastination."</span>);
                      <br />
                      {'        '}{'}'}
                      <br />
                      {'      '}{'}'}
                      <br />
                      {'    '}{'}'}
                      <br />
                      {'    '}<span className="text-purple-700 dark:text-purple-400">private static void</span> <span className="text-blue-600 dark:text-blue-400">solveAllProblems</span>() {'{'}
                      <br />
                      {'        '}<span className="text-gray-600 dark:text-gray-500">// TODO: Implement this method (good luck!)</span>
                      <br />
                      {'    '}{'}'}
                      <br />
                      {'    '}<span className="text-purple-700 dark:text-purple-400">private static void</span> <span className="text-blue-600 dark:text-blue-400">drinkMoreCoffee</span>() {'{'}
                      <br />
                      {'        '}<span className="text-yellow-700 dark:text-yellow-300">System</span>.out.println(<span className="text-green-700 dark:text-green-300">"Refueling programmer... Please wait."</span>);
                      <br />
                      {'    '}{'}'}
                      <br />
                      {'}'}
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </section>
          <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm dark:text-[#CCFFFF]">Key Features</div>
                  <h2 className="text-3xl dark:text-[#CCFFFF] font-bold tracking-tighter sm:text-5xl">
                    Elevate Your Problem-Solving Journey
                  </h2>
                  <p className="max-w-[900px] text-muted-foreground dark:text-[#CCFFFF] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    The ultimate coding playground where your bugs fear to tread. Code, run, and laugh as your TLEs turn into LOLs!
                  </p>
                </div>
              </div>
              <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
                <div className="flex flex-col text-muted-foreground dark:text-[#CCFFFF] justify-center space-y-4">
                  <ul className="grid gap-6">
                    <li>
                      <div className="grid gap-1">
                        <h3 className="text-xl font-bold">Code It. Run It. Smash TLEs.</h3>
                        <p>
                          From Java to Python to C++, we've got your back. All thanks to Docker-powered sorcery! 🧙‍♂️
                        </p>
                      </div>
                    </li>
                    <li>
                      <div className="grid gap-1">
                        <h3 className="text-xl font-bold">Microservices for the Win</h3>
                        <p>
                          Built for speed and scale, these microservices handle your code like a boss. 🥊
                        </p>
                      </div>
                    </li>
                    <li>
                      <div className="grid gap-1">
                        <h3 className="text-xl font-bold">AWS Cloud Party</h3>
                        <p>
                          Deployed on AWS with auto-scaling and load balancers. Because why not have some cloud fun? ☁️🎉
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
                <img
                  src="/code.png"
                  alt="Features"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                  width="550"
                  height="310"
                />
              </div>
            </div>
          </section>
          <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-muted dark:text-[#CCFFFF] px-3 py-1 text-sm">Testimonials</div>
                  <h2 className="text-3xl font-bold tracking-tighter dark:text-[#CCFFFF] sm:text-5xl">What Our Users Say</h2>
                  <p className="max-w-[900px] text-muted-foreground dark:text-[#CCFFFF] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Hear from our satisfied users and learn how our AlgoCode has transformed their
                    problem-solving experience.
                  </p>
                </div>
              </div>
              <div className="mx-auto w-full items-center gap-6 py-12">
                <Testimonials items={testimonials} speed="slow" />
              </div>
            </div>
          </section>
        </main>
        <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6">
          <Footer />
        </footer>
      </div>
    </>
  );
}