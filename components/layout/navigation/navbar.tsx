// components\layout\navigation\navbar.tsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface NavbarProps {
  className?: string;
}

export function Navbar({ className }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Cek apakah sedang di halaman subculture detail
  const isSubculture = pathname.startsWith("/budaya/daerah/") && pathname !== "/budaya/daerah/-";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const smoothScrollTo = (elementId: string) => {
    // Jika bukan di homepage, redirect ke homepage dulu
    if (pathname !== "/") {
      window.location.href = `/#${elementId}`;
      return;
    }

    const element = document.getElementById(elementId);
    if (element) {
      const navbarHeight = 80;
      const elementPosition = element.offsetTop - navbarHeight;

      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
    setIsOpen(false);
  };

  const navItems = [
    { id: "beranda", label: "Home" },
    { id: "tentang", label: "About" },
    { id: "budaya", label: "Culture" },
    { id: "eksplorasi", label: "Explore" },
    { id: "kontak", label: "Contact" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-slate-900/90 backdrop-blur-md shadow-lg"
          : "bg-transparent",
        className
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <div
                className={cn(
                  "relative w-40 h-20 flex items-center justify-center hover:scale-105 transition-transform duration-200 rounded-2xl shadow-lg hover:shadow-xl cursor-pointer",
                  isScrolled
                    ? "bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20"
                    : "bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30"
                )}
              >
                <Image
                  src="/Logo.png"
                  alt="UB Corpora Logo"
                  width={150}
                  height={75}
                  className="object-contain rounded-xl"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Conditional Navigation */}
          {isSubculture ? (
            // Navbar untuk Subculture - tombol Subculture Map dan Home
            <>
              <div className="hidden md:flex items-center space-x-6">
                <Link href="/">
                  <button
                    className={cn(
                      "relative px-4 py-2 font-medium transition-colors duration-200 group",
                      isScrolled ? "text-white" : "text-white"
                    )}
                  >
                    Home
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-0 bg-white transition-all duration-300 group-hover:w-full" />
                  </button>
                </Link>
                <Link href="/peta-budaya">
                  <button
                    className={cn(
                      "relative px-4 py-2 font-medium transition-colors duration-200 group",
                      isScrolled ? "text-white" : "text-white"
                    )}
                  >
                    Subculture Map
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-0 bg-white transition-all duration-300 group-hover:w-full" />
                  </button>
                </Link>
              </div>

              {/* Mobile - Subculture */}
              <div className="md:hidden flex items-center gap-2">
                <Link href="/peta-budaya">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "transition-colors duration-200",
                      isScrolled
                        ? "text-white hover:text-cyan-300"
                        : "text-white hover:text-cyan-300"
                    )}
                  >
                    Map
                  </Button>
                </Link>
                <Link href="/">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "transition-colors duration-200",
                      isScrolled
                        ? "text-white hover:text-cyan-300"
                        : "text-white hover:text-cyan-300"
                    )}
                  >
                    Home
                  </Button>
                </Link>
              </div>
            </>
          ) : (
            // Navbar lengkap untuk halaman lain (termasuk peta-budaya)
            <>
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => smoothScrollTo(item.id)}
                    className={cn(
                      "transition-colors duration-200 font-medium",
                      isScrolled
                        ? "text-white hover:text-cyan-300"
                        : "text-white hover:text-yellow-600"
                    )}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "md:hidden",
                  "text-white hover:text-cyan-300"
                )}
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </>
          )}
        </div>

        {/* Mobile Navigation - muncul di semua halaman kecuali subculture detail */}
        {!isSubculture && isOpen && (
          <div className="md:hidden bg-[#1a4d5c]/98 backdrop-blur-sm border-t border-white/20">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => smoothScrollTo(item.id)}
                  className="block w-full text-left px-3 py-2 text-white hover:text-cyan-300 hover:bg-white/10 rounded-md transition-colors duration-200"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}