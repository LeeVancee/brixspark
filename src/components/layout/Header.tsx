import Link from "next/link";
import SearchButton from "./SearchButton";
import { Menu, Phone } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="w-full max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              className="text-xl font-semibold text-blue-500 hover:text-blue-600"
            >
              BRIXSPARK
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 text-sm text-gray-600">
            <Link
              href="#"
              className="hover:text-gray-900 transition-colors"
            >
              About Us
            </Link>
            <Link
              href="#"
              className="hover:text-gray-900 transition-colors"
            >
              Contact Us
            </Link>
            <span className="text-gray-500">(123) 456-7890</span>
            <SearchButton />
          </div>

          {/* Mobile Navigation */}
          <div className="flex lg:hidden items-center space-x-2">
            <SearchButton />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <SheetHeader>
                  <SheetTitle className="text-left text-blue-500 font-semibold">
                    BRIXSPARK
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col space-y-4 mt-8">
                  <Link
                    href="/about"
                    className="text-lg font-medium text-gray-800 hover:text-blue-500 transition-colors py-3 px-2 rounded-lg hover:bg-blue-50 border-b border-gray-100"
                  >
                    About Us
                  </Link>
                  <Link
                    href="/contact"
                    className="text-lg font-medium text-gray-800 hover:text-blue-500 transition-colors py-3 px-2 rounded-lg hover:bg-blue-50 border-b border-gray-100"
                  >
                    Contact Us
                  </Link>
                  <div className="flex items-center space-x-3 py-3 px-2 mt-4 bg-gray-50 rounded-lg">
                    <Phone className="h-5 w-5 text-blue-500" />
                    <span className="text-base font-medium text-gray-700">(123) 456-7890</span>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
