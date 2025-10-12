"use client"

import { Globe } from "lucide-react"
import Link from "next/link"

interface FooterProps {
  onNavClick: (section: string) => void
  onCategoryClick: (category: string) => void
}

export function Footer({ onNavClick, onCategoryClick }: FooterProps) {
  const navigationLinks = [
    { id: "beranda", label: "Home" },
    { id: "eksplorasi", label: "Explore" },
    { id: "tentang", label: "About" },
    { id: "kontak", label: "Contact" },
  ]

  const categoryLinks = [
    { category: "tari", label: "Traditional Dance" },
    { category: "makanan", label: "Cuisine" },
    { category: "batik", label: "Batik" },
    { category: "musik", label: "Music" },
  ]

  return (
    <footer className="bg-background border-t border-border py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/70 rounded-lg flex items-center justify-center">
                <Globe className="h-5 w-5 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-bold text-primary">UB Corpora</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              A digital platform to preserve and introduce East Java's cultural heritage to the world.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {navigationLinks.map((link) => (
                <li key={link.id}>
                  <button onClick={() => onNavClick(link.id)} className="hover:text-primary transition-colors">
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold mb-4">Cultural Categories</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {categoryLinks.map((link) => (
                <li key={link.category}>
                  <button
                    onClick={() => {
                      onCategoryClick(link.category)
                      onNavClick("eksplorasi")
                    }}
                    className="hover:text-primary transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Glosarium */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground mb-6">
              <li>info@ubcorpra.ac.id</li>
              <li>+62 341 551611</li>
              <li>Universitas Brawijaya</li>
              <li>Malang, East Java</li>
            </ul>
            
            <div>
              <h4 className="font-semibold mb-4">Glosarium</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/budaya/daerah/-" className="hover:text-primary transition-colors">
                    Semua Istilah Budaya
                  </Link>
                </li>
                <li>
                  <Link href="/peta-budaya" className="hover:text-primary transition-colors">
                    Peta Budaya
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© 2025 UB Corpora. All rights reserved. Built with ❤️ for East Java's culture.</p>
        </div>
      </div>
    </footer>
  )
}