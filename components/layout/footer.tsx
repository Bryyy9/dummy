// components/layout/footer.tsx
"use client"

import type React from "react"

import Link from "next/link"
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"

interface FooterProps {
  onNavClick: (section: string) => void
  onCategoryClick?: (category: string) => void
}

export function Footer({ onNavClick, onCategoryClick }: FooterProps) {
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter subscription
    console.log("Newsletter subscription")
  }

  const quickLinks = [
    { label: "Home", section: "beranda" },
    { label: "About", section: "tentang" },
    { label: "Exploration", section: "eksplorasi" },
    { label: "Contact", section: "kontak" },
  ]

  const culturalLinks = [
    { label: "Cultural Map", href: "/peta-budaya" },
    { label: "Sub-regions", href: "/budaya" },
    { label: "Cultural Glossary", href: "/budaya/daerah/-" },
  ]

  const resources = [
    { label: "Documentation", href: "#" },
    { label: "Research", href: "#" },
    { label: "Gallery", href: "#" },
    { label: "Events", href: "#" },
  ]

  return (
    <footer className="bg-gradient-to-br from-muted/50 via-background to-muted/30 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Newsletter Section */}
        <div className="border-b border-border pb-8 mb-8">
          <div className="max-w-md mx-auto text-center">
            <h3 className="font-semibold text-foreground mb-2">Stay Updated</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Subscribe to our newsletter for the latest updates on East Java's cultural heritage.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <Input type="email" placeholder="Enter your email" className="flex-1" required />
              <Button type="submit">Subscribe</Button>
            </form>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="relative w-40 h-20 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg">
              <Image
                src="/Logo.png"
                alt="UB Corpora Logo"
                width={150}
                height={75}
                className="object-contain"
                priority
              />
            </div>
            <p className="text-sm text-muted-foreground text-pretty">
              A digital platform dedicated to preserving and introducing the cultural wealth of East Java to present and
              future generations.
            </p>
            <div className="flex space-x-3">
              <Button variant="ghost" size="icon" className="hover:bg-primary/10" asChild>
                <a href="https://facebook.com/universitasbrawijaya" target="_blank" rel="noopener noreferrer">
                  <Facebook className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-primary/10" asChild>
                <a href="https://instagram.com/universitasbrawijaya" target="_blank" rel="noopener noreferrer">
                  <Instagram className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-primary/10" asChild>
                <a href="https://twitter.com/universitasub" target="_blank" rel="noopener noreferrer">
                  <Twitter className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.section}>
                  <button
                    onClick={() => onNavClick(link.section)}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Cultural Content */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Cultural Content</h3>
            <ul className="space-y-2">
              {culturalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Resources</h3>
            <ul className="space-y-2">
              {resources.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-border pt-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div className="flex items-start space-x-3">
              <Mail className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium text-foreground">Email</p>
                <a
                  href="mailto:info@ubcorpra.ac.id"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  info@ubcorpra.ac.id
                </a>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Phone className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium text-foreground">Phone</p>
                <a href="tel:+62341551611" className="text-muted-foreground hover:text-primary transition-colors">
                  +62 341 551611
                </a>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <MapPin className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium text-foreground">Address</p>
                <p className="text-muted-foreground">
                  Universitas Brawijaya
                  <br />
                  Malang, East Java
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>© 2025 UB Corpora. All rights reserved.</span>
              <span className="hidden md:inline">•</span>
              <span className="hidden md:inline">Made with</span>
              <Heart className="h-4 w-4 text-red-500 fill-current hidden md:inline" />
              <span className="hidden md:inline">by Universitas Brawijaya</span>
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
