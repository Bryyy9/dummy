"use client"

import { Globe } from "lucide-react"

interface FooterProps {
  onNavClick: (section: string) => void
  onCategoryClick: (category: string) => void
}

export function Footer({ onNavClick, onCategoryClick }: FooterProps) {
  const navigationLinks = [
    { id: "beranda", label: "Beranda" },
    { id: "eksplorasi", label: "Eksplorasi" },
    { id: "tentang", label: "Tentang" },
    { id: "kontak", label: "Kontak" },
  ]

  const categoryLinks = [
    { category: "tari", label: "Tari Tradisional" },
    { category: "makanan", label: "Kuliner" },
    { category: "batik", label: "Batik" },
    { category: "musik", label: "Musik" },
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
              Platform digital untuk melestarikan dan memperkenalkan warisan budaya Jawa Timur kepada dunia.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold mb-4">Navigasi</h4>
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
            <h4 className="font-semibold mb-4">Kategori Budaya</h4>
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

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Kontak</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>info@ubcorpra.ac.id</li>
              <li>+62 341 551611</li>
              <li>Universitas Brawijaya</li>
              <li>Malang, Jawa Timur</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© 2025 UB Corpora. Semua hak cipta dilindungi. Dibuat dengan ❤️ untuk budaya Jawa Timur.</p>
        </div>
      </div>
    </footer>
  )
}
