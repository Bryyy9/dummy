"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Globe, Home, Camera, Mail, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { useRouter } from "next/navigation"

interface NavigationProps {
  onNavClick: (section: string) => void
  className?: string
}

export function Navigation({ onNavClick, className }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeNav, setActiveNav] = useState("beranda")
  const router = useRouter()

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const handleNavClick = (section: string) => {
    setActiveNav(section)
    if (section === "peta-budaya") {
      router.push("/peta-budaya")
    } else {
      onNavClick(section)
    }
    setIsMenuOpen(false)
  }

  const navItems = [
    { id: "beranda", label: "Home", icon: Home },
    { id: "eksplorasi", label: "Explore", icon: Camera },
    { id: "tentang", label: "About", icon: Globe },
    { id: "kontak", label: "Contact", icon: Mail },
  ]

  return (
    <nav
      className={cn(
        // 🎨 efek glassmorphism abu-abu elegan
        "fixed top-0 left-0 right-0 z-50 border-b border-white/10 shadow-md transition-all duration-300",
        "bg-[rgba(31,31,31,0.4)] backdrop-blur-2xl backdrop-saturate-150",
        "supports-[backdrop-filter]:bg-[rgba(31,31,31,0.4)] supports-[backdrop-filter]:backdrop-blur-2xl",
        "hover:shadow-lg hover:shadow-gray-500/10",
        className,
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
                onClick={() => handleNavClick("beranda")}
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

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMenu}
              aria-label="Toggle menu"
              className="text-gray-200 hover:bg-white/10"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
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
  )
}
