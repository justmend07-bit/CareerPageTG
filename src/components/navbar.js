'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Menu, X } from "lucide-react";

/* ---- Move Hook Outside Component ---- */
function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const media = window.matchMedia(query);
    setMatches(media.matches);

    const handler = (e) => setMatches(e.matches);
    media.addEventListener('change', handler);

    return () => media.removeEventListener('change', handler);
  }, [query]);

  return matches;
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);   // ✅ FIXED
  const isMobile = useMediaQuery('(max-width: 640px)');

  return (
    <>
      <nav className="w-full h-18 fixed top-0 left-0 z-50 bg-gradient-to-r from-white/80 via-amber-50/70 to-orange-100/70 backdrop-blur-md shadow-sm border-b border-orange-200">
        <div className="max-w-7xl px-2 md:px-0 flex items-center justify-between h-full relative">

          {/* Logo */}
          <div className="flex items-center space-x-1/2 ml-8">
            <Image
              src="/logo.png"
              alt="Tirth Ghumo Logo"
              width={110}
              height={110}
              className="rounded-lg transition-transform duration-300 hover:scale-105 mt-5
                   w-52 sm:w-58 md:w-60 lg:w-62 xl:w-68 h-auto object-contain"
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex flex-1 justify-center">
            <div className="flex items-center space-x-8 text-gray-700 font-semibold text-sm md:text-base">
              <a href="https://tirthghumo.in/" className="hover:text-orange-600 transition-colors">
                Home
              </a>
              <a href="#register" className="hover:text-orange-600 transition-colors">
                Register
              </a>
              <a href="/Career" className="hover:text-orange-600 transition-colors">
                Career
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-gray-700 focus:outline-none"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

        </div>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="md:hidden bg-gradient-to-b from-white/90 to-amber-100/80 backdrop-blur-md shadow-md border-t border-orange-200">
            <div className="flex flex-col items-center py-4 space-y-4 text-gray-700 font-semibold text-base">

              <a
                href="https://tirthghumo.in/"
                className="hover:text-orange-600 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </a>

              <a
                href="#register"
                className="hover:text-orange-600 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Register
              </a>

              <a
                href="/Career"
                className="hover:text-orange-600 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Career
              </a>

            </div>
          </div>
        )}
      </nav>
    </>
  );
}
