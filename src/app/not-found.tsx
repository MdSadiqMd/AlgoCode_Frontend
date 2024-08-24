import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen mt-7">
        <Link href="/" className="font-serif font-medium text-2xl">
          Return to <span className="text-blue-600">Home</span>
        </Link>
        <Image
          src="/notfound.png"
          alt="mockup"
          width={3000}
          height={3000}
          className="w-full md:w-auto max-w-2xl mx-auto"
        />
      </div>
    </div>
  );
}