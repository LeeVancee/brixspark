import Link from "next/link";
import SearchButton from "./SearchButton";

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

          {/* Right Navigation */}
          <div className="flex items-center space-x-6 text-sm text-gray-600">
            <Link
              href="/about"
              className="hover:text-gray-900 transition-colors"
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="hover:text-gray-900 transition-colors"
            >
              Contact Us
            </Link>
            <span className="text-gray-500">(123) 456-7890</span>
            <SearchButton />
          </div>
        </div>
      </div>
    </header>
  );
}
