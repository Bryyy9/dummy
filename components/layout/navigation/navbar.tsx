"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface NavbarProps {
  className?: string
}

export function Navbar({ className }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const smoothScrollTo = (elementId: string) => {
    const element = document.getElementById(elementId)
    if (element) {
      const navbarHeight = 80
      const elementPosition = element.offsetTop - navbarHeight

      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      })
    }
    setIsOpen(false)
  }

  const navItems = [
    { id: "beranda", label: "Home" },
    { id: "tentang", label: "About" },
    { id: "budaya", label: "Culture" },
    { id: "eksplorasi", label: "Explore" },
    { id: "kontak", label: "Contact" },
  ]

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-transparent",
        className,
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <div className="flex items-center">
            <div className="relative w-40 h-20 flex items-center justify-center hover:scale-105 transition-transform duration-200 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30 shadow-lg hover:shadow-xl hover:bg-white/30">
              <Image
                src="/Logo.png"
                alt="UB Corpora Logo"
                width={150}
                height={75}
                className="object-contain cursor-pointer rounded-xl"
                priority
                onClick={() => smoothScrollTo("beranda")}
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => smoothScrollTo(item.id)}
                className="text-gray-700 hover:text-yellow-600 transition-colors duration-200 font-medium"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => smoothScrollTo(item.id)}
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:text-yellow-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
