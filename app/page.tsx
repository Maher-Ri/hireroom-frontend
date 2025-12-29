// import { Button } from "@/components/ui/button";

import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen w-full relative">
      {/* Radial Gradient Background from Top */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(125% 125% at 50% 10%, #fff 40%, #475569 100%)",
        }}
      />
      {/* Your Content/Components */}
      <div className="relative isolate z-10 px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-3xl pt-20 text-center">
          <h1 className="text-balance font-semibold text-5xl tracking-tight text-gray-900 sm:text-7xl">
            Your dream job is already looking for you
          </h1>
          <p className="text-pretty mt-8 text-lg font-medium text-gray-600 sm:text-xl/8">
            Discover Jobs from top companies, apply with a single click, and land
            your dream role faster than ever.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-4">
            <Link href="/jobs" className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Explore Jobs
            </Link>
            <Link href="/" className=" px-3.5 py-2.5 text-base font-semibold text-black">
              Learn more →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
