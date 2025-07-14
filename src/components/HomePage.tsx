"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useSearchForm } from "@/hooks/useSearchForm";

export default function HomePage() {
  const { searchQuery, isLoading, handleSubmit, handleQueryChange } = useSearchForm();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
      {/* Main Content Container - Elementor Style */}
      <div className="w-full mx-auto px-4 py-12 lg:py-16 relative">
        <div className="flex flex-col lg:flex-row items-center min-h-[85vh] lg:min-h-[70vh]">
          {/* Text and Search Section - Order 1 on mobile, Order 2 on desktop */}
          <div className="w-full lg:w-1/2 text-center lg:text-left space-y-6 lg:space-y-8 order-1 lg:order-2 lg:pl-12 relative z-20 mt-8 lg:mt-0">
            {/* Main Title */}
            <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight">
              Search for instructions
            </h2>

            {/* Subtitle */}
            <div className="text-base md:text-lg lg:text-xl text-gray-300">
              <p>
                Enter the model number and the LEGO number to get the
                instruction.
              </p>
            </div>

            {/* Search Form */}
            <div className="w-full max-w-sm md:max-w-md mx-auto lg:mx-0">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <Input
                  value={searchQuery}
                  onChange={(e) => handleQueryChange(e.target.value)}
                  placeholder="Search..."
                  className="flex-1 h-12 text-base bg-white border-white/20 placeholder:text-gray-500"
                />
                <Button
                  type="submit"
                  size="lg"
                  className="h-12 px-6 bg-gray-900 hover:bg-gray-800 text-white disabled:opacity-50"
                  disabled={!searchQuery.trim() || isLoading}
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Search className="w-5 h-5" />
                  )}
                </Button>
              </form>
            </div>
          </div>

          {/* LEGO Person Image Section - Order 2 on mobile, Order 1 on desktop */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-start order-2 lg:order-1 mt-12 lg:mt-0">
            <div className="relative z-5">
              <Image
                src="/home-n.png"
                alt="LEGO Person with Instructions"
                width={381}
                height={528}
                className="max-w-full h-auto w-3/4 md:w-auto transform translate-y-16 translate-x-0 lg:translate-y-32 lg:translate-x-40"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Wave Shape Divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10">
        <svg
          className="relative block w-full h-80 lg:h-80 transform rotate-180"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1000 100"
          preserveAspectRatio="none"
          fill="white"
        >
          {/* Mobile wave - gentler curve */}
          <path
            className="block lg:hidden"
            d="M0,30 Q250,10 500,20 T1000,30 V0 H0 Z"
          ></path>
          {/* Desktop wave - original curve */}
          <path
            className="hidden lg:block"
            d="M421.9,6.5c22.6-2.5,51.5,0.4,75.5,5.3c23.6,4.9,70.9,23.5,100.5,35.7c75.8,32.2,133.7,44.5,192.6,49.7c23.6,2.1,48.7,3.5,103.4-2.5c54.7-6,106.2-25.6,106.2-25.6V0H0v30.3c0,0,72,32.6,158.4,30.5c39.2-0.7,92.8-6.7,134-22.4c21.2-8.1,52.2-18.2,79.7-24.2C399.3,7.9,411.6,7.5,421.9,6.5z"
          ></path>
        </svg>
      </div>
    </div>
  );
}
