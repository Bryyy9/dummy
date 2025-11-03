"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Globe,
  Home,
  Camera,
  Mail,
  Menu,
  X,
  Map,
  BookOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

interface NavigationProps {
  onNavClick: (section: string) => void;
  className?: string;
}

export function Navigation({ onNavClick, className }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("beranda");
  const router = useRouter();
  const pathname = usePathname();

  // Cek apakah sedang di halaman peta-budaya
  const isPetaBudaya = pathname === "/peta-budaya";

  // Cek apakah sedang di halaman subculture (budaya/daerah/[id])
  const isSubculture =
    pathname.startsWith("/budaya/daerah/") && pathname !== "/budaya/daerah/-";

  useEffect(() => {
    // Update active nav based on current path
    if (isPetaBudaya) {
      setActiveNav("peta-budaya");
    } else if (isSubculture) {
      setActiveNav("subculture");
    }
  }, [isPetaBudaya, isSubculture]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // components/layout/navigation.tsx
  const handleNavClick = (section: string) => {
    setActiveNav(section);
    if (section === "peta-budaya") {
      router.push("/peta-budaya");
    } else if (section === "lexicons") {
      // Pass current path as referrer
      const currentPath = window.location.pathname;
      router.push(`/budaya/daerah/-?from=${encodeURIComponent(currentPath)}`);
    } else if (section === "beranda" && (isPetaBudaya || isSubculture)) {
      router.push("/");
    } else {
      onNavClick(section);
    }
    setIsMenuOpen(false);
  };
  // Nav items untuk halaman normal
  const normalNavItems = [
    { id: "beranda", label: "Home", icon: Home },
    { id: "eksplorasi", label: "Explore", icon: Camera },
    { id: "tentang", label: "About", icon: Globe },
    { id: "kontak", label: "Contact", icon: Mail },
  ];

  // Nav items untuk halaman peta-budaya (hanya Home)
  const petaBudayaNavItems = [{ id: "beranda", label: "Home", icon: Home }];

  // Nav items untuk halaman subculture (Home, Peta Budaya, dan Lexicons)
  const subcultureNavItems = [
    { id: "beranda", label: "Home", icon: Home },
    { id: "peta-budaya", label: "Subculture Map", icon: Map },
    { id: "lexicons", label: "Lexicons Glosarium", icon: BookOpen },
  ];

  // Pilih nav items berdasarkan halaman
  const navItems = isSubculture
    ? subcultureNavItems
    : isPetaBudaya
    ? petaBudayaNavItems
    : normalNavItems;

  return (
    <nav
      className={cn(
        // 🎨 efek glassmorphism abu-abu elegan
        "fixed top-0 left-0 right-0 z-50 border-b border-white/10 shadow-md transition-all duration-300",
        "bg-[rgba(31,31,31,0.4)] backdrop-blur-2xl backdrop-saturate-150",
        "supports-[backdrop-filter]:bg-[rgba(31,31,31,0.4)] supports-[backdrop-filter]:backdrop-blur-2xl",
        "hover:shadow-lg hover:shadow-gray-500/10",
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center">
            <div className="relative w-32 h-16 flex items-center justify-center hover:scale-105 transition-transform duration-200 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 shadow-md hover:shadow-lg hover:bg-white/20">
              <Image
                src="/Logo.png"
                alt="UB Corpora Logo"
                width={120}
                height={60}
                className="object-contain cursor-pointer rounded-lg"
                priority
                onClick={() => {
                  if (isPetaBudaya || isSubculture) {
                    router.push("/");
                  } else {
                    handleNavClick("beranda");
                  }
                }}
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={cn(
                  "relative px-5 py-2 rounded-lg font-medium text-gray-200 transition-all duration-300",
                  "hover:text-white ",
                  "after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:w-0 after:h-[2px] after:bg-gray-300 after:transition-all after:duration-300 hover:after:w-1/2",
                  activeNav === item.id &&
                    "text-white after:w-1/2 after:bg-gray-200 shadow-inner"
                )}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button - untuk halaman normal */}
          {!isPetaBudaya && !isSubculture && (
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMenu}
                aria-label="Toggle menu"
                className="text-gray-200 hover:bg-white/10"
              >
                {isMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          )}

          {/* Mobile - Jika di peta-budaya, tampilkan tombol Home langsung */}
          {isPetaBudaya && (
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push("/")}
                className="text-gray-200 hover:bg-white/10"
              >
                <Home className="h-5 w-5 mr-2" />
                Home
              </Button>
            </div>
          )}

          {/* Mobile - Jika di subculture, tampilkan tombol Home, Map, dan Lexicons */}
          {isSubculture && (
            <div className="md:hidden flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push("/budaya/daerah/-")}
                className="text-gray-200 hover:bg-white/10"
              >
                <BookOpen className="h-5 w-5 mr-1" />
                Lexicons
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push("/peta-budaya")}
                className="text-gray-200 hover:bg-white/10"
              >
                <Map className="h-5 w-5 mr-1" />
                Map
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push("/")}
                className="text-gray-200 hover:bg-white/10"
              >
                <Home className="h-5 w-5 mr-1" />
                Home
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu - hanya tampil jika bukan di peta-budaya atau subculture */}
      {!isPetaBudaya && !isSubculture && isMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-[rgba(31,31,31,0.7)] backdrop-blur-2xl">
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={cn(
                  "flex items-center space-x-3 px-3 py-3 rounded-lg text-gray-200 hover:text-white hover:bg-white/10 transition-all duration-200 w-full text-left",
                  activeNav === item.id && "text-white bg-white/10"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
