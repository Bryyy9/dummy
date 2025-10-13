"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Globe, Home, Camera, Mail, Menu, X, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { useRouter } from "next/navigation"

interface NavigationProps {
  onNavClick: (section: string) => void
  className?: string
}

export function Navigation({ onNavClick, className }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showNavSearch, setShowNavSearch] = useState(false)
  const [navSearchQuery, setNavSearchQuery] = useState("")
  const router = useRouter()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleNavClick = (section: string) => {
    if (section === "peta-budaya") {
      router.push("/peta-budaya")
    } else {
      onNavClick(section)
    }
    setIsMenuOpen(false)
  }

  const navItems = [
    { id: "beranda", label: "Home", icon: Home },
    { id: "eksplorasi", label: "Gallery", icon: Camera },
    { id: "peta-budaya", label: "Cultural Map", icon: Globe },
    { id: "tentang", label: "About", icon: Globe },
    { id: "kontak", label: "Contact", icon: Mail },
  ]

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-xl supports-[backdrop-filter]:bg-background/80 border-b border-border/50 shadow-lg transition-all duration-300",
        className,
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center">
            <div className="relative w-32 h-16 flex items-center justify-center hover:scale-105 transition-transform duration-200 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg hover:shadow-xl hover:bg-white/20">
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
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const IconComponent = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg text-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300 group relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary/20"
                  aria-label={`Navigate to ${item.label.toLowerCase()}`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <IconComponent className="h-4 w-4 group-hover:scale-110 transition-transform duration-200 relative z-10" />
                  <span className="font-medium relative z-10">{item.label}</span>
                </button>
              )
            })}

            {/* Search Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowNavSearch(!showNavSearch)}
              className="ml-2"
              aria-label="Toggle search"
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={toggleMenu} aria-label="Toggle menu">
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Search Bar (when toggled) */}
        {showNavSearch && (
          <div className="pb-4">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <input
                type="text"
                placeholder="Search culture..."
                value={navSearchQuery}
                onChange={(e) => setNavSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                aria-label="Search culture"
              />
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl">
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => {
              const IconComponent = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className="flex items-center space-x-3 px-3 py-3 rounded-lg text-foreground hover:text-primary hover:bg-primary/5 transition-all duration-200 w-full text-left focus:outline-none focus:ring-2 focus:ring-primary/20"
                  aria-label={`Navigate to ${item.label.toLowerCase()}`}
                >
                  <IconComponent className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      )}
    </nav>
  )
}
