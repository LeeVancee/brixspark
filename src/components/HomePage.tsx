import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Footer from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
    {/* Main Content Container - Elementor Style */}
    <div className="w-full max-w-[1400px] mx-auto px-4 py-16 lg:py-24 relative">
      <div className="flex flex-col lg:flex-row items-center min-h-[70vh]">
        
        {/* Left Column - LEGO Person Image (50% width) */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-start order-1 lg:order-1">
          <div className="relative">
            <Image
              src="/home-n.png"
              alt="LEGO Person with Instructions"
              width={381}
              height={528}
              className="max-w-full h-auto transform translate-y-32 translate-x-40"
              priority
            />
          </div>
        </div>
        
        {/* Right Column - Text and Search (50% width) */}
        <div className="w-full lg:w-1/2 text-center lg:text-left space-y-8 order-2 lg:order-2 lg:pl-12">
          {/* Main Title */}
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight">
            Search for instructions
          </h2>
          
          {/* Subtitle */}
          <div className="text-lg lg:text-xl text-gray-300">
            <p>Enter the model number and the LEGO number to get the instruction.</p>
          </div>
          
          {/* Search Form */}
          <div className="max-w-md mx-auto lg:mx-0">
            <form method="get" className="flex gap-2">
              <Input
                name="s"
                placeholder="Search..."
                className="flex-1 h-12 text-base bg-white border-white/20 placeholder:text-gray-500"
              />
              <Button 
                type="submit"
                size="lg"
                className="h-12 px-6 bg-gray-900 hover:bg-gray-800 text-white"
              >
                <Search className="w-5 h-5" />
              </Button>
            </form>
          </div>
        </div>
        
      </div>
    </div>
    
    {/* Wave Shape Divider */}
    <div className="absolute bottom-20 left-0 w-full overflow-hidden leading-none z-10">
      <svg
        className="relative block w-full h-64 lg:h-80 transform rotate-180"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1000 100"
        preserveAspectRatio="none"
        fill="white"
      >
        <path d="M421.9,6.5c22.6-2.5,51.5,0.4,75.5,5.3c23.6,4.9,70.9,23.5,100.5,35.7c75.8,32.2,133.7,44.5,192.6,49.7c23.6,2.1,48.7,3.5,103.4-2.5c54.7-6,106.2-25.6,106.2-25.6V0H0v30.3c0,0,72,32.6,158.4,30.5c39.2-0.7,92.8-6.7,134-22.4c21.2-8.1,52.2-18.2,79.7-24.2C399.3,7.9,411.6,7.5,421.9,6.5z"></path>
      </svg>
    </div>
    
    {/* Footer */}
    <Footer />
  </div>
  )
}
