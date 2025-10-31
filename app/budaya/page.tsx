"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Search, ArrowLeft } from "lucide-react"
import { AnimatedReveal } from "@/components/common/animated-reveal"
import { EnhancedButton } from "@/components/interactive/enhanced-button"
import { NewsletterSection } from "@/components/sections/newsletter-section"
import { Footer } from "@/components//layout/footer"
import { useNavigation } from "@/hooks/use-navigation"
import { Input } from "@/components/ui/input"

interface SubcultureData {
  id: string
  name: string
  description: string
  image: string | null
  culture: {
    name: string
    province: string
  }
}

export default function SubculturesGalleryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [subcultures, setSubcultures] = useState<SubcultureData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { handleNavClick, handleCategoryNavigation } = useNavigation()

  useEffect(() => {
    const fetchSubcultures = async () => {
      try {
        const response = await fetch('https://be-corpora.vercel.app/api/v1/public/subcultures')
        if (!response.ok) {
          throw new Error('Failed to fetch subcultures')
        }
        const result = await response.json()
        if (result.success) {
          setSubcultures(result.data)
        } else {
          throw new Error(result.message || 'Failed to fetch data')
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchSubcultures()
  }, [])

  const handleCategoryClick = (category: string) => {
    handleCategoryNavigation(category)
  }

  const searchCategory = "subculture"
  const handleSearch = (value: string) => {
    setSearchQuery(value)
  }

  const filteredSubcultures = subcultures.filter((sc) =>
    sc.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-[#111827] text-foreground">
      {/* === HEADER (match Leksikon style) === */}
      <header className="text-center py-16 px-4 sm:px-6 lg:px-8">
        {/* Tombol Back sejajar dengan konten */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 text-left">
          <button
            onClick={() => (window.location.href = "/budaya/peta")}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali
          </button>
        </div>

        {/* Badge mirip Leksikon */}
        <Badge
          variant="secondary"
          className="bg-blue-950/60 text-blue-300 border border-blue-900 px-4 py-1 rounded-full mb-4"
        >
          🗺️ SUBKULTUR BUDAYA
        </Badge>

        <h1 className="text-4xl font-extrabold text-foreground mb-2">
          Jelajahi Subkultur Budaya
        </h1>
        <p className="text-base text-muted-foreground max-w-2xl mx-auto">
          Setiap subkultur memiliki karakter dan tradisi unik yang memperkaya identitas budaya Jawa Timur.
          Pilih salah satu wilayah untuk menjelajah lebih jauh.
        </p>

        {/* === Search Bar === */}
        <AnimatedReveal animation="fade-up" delay={150}>
          <div className="relative max-w-md mx-auto mt-10">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder={
                  searchCategory === "subculture"
                    ? "Cari wilayah budaya..."
                    : "Cari istilah budaya..."
                }
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 bg-background/50 border border-border focus:ring-primary/20"
              />
            </div>
          </div>
        </AnimatedReveal>
      </header>

      {/* === CONTENT === */}
      <main className="container mx-auto px-4 pb-16">
        {loading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading subcultures...</p>
            </div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <p className="text-red-500 mb-4">Error: {error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg"
              >
                Retry
              </button>
            </div>
          </div>
        ) : filteredSubcultures.length > 0 ? (
          <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-fr">
            {filteredSubcultures.map((sc, index) => (
              <AnimatedReveal
                key={sc.id}
                animation="scale-up"
                delay={200 + index * 100}
              >
                {/* === Card style disamakan dengan Leksikon === */}
                <div className="group relative overflow-hidden rounded-2xl bg-card/40 border border-border backdrop-blur-sm transition-all hover:shadow-lg hover:border-primary/40 h-full flex flex-col">
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                      style={{ backgroundImage: `url('${sc.image || "/placeholder.jpg"}')` }}
                      role="img"
                      aria-label={`Image of ${sc.name}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-black/50 backdrop-blur-sm border-white/20 text-white">
                        {sc.culture?.province || "Sub-region"}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="font-bold text-lg group-hover:text-primary transition-colors mb-2">
                      {sc.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 flex-1 line-clamp-3">
                      {sc.description}
                    </p>

                    {/* Tombol Explore style Leksikon */}
                    <EnhancedButton
                      size="lg"
                      className="w-full cursor-pointer mt-auto bg-gradient-to-r from-indigo-500 to-purple-500 hover:opacity-90 text-white border-none"
                      onClick={() =>
                        (window.location.href = `/budaya/daerah/${sc.id}`)
                      }
                    >
                      Explore
                    </EnhancedButton>
                  </div>
                </div>
              </AnimatedReveal>
            ))}
          </section>
        ) : (
          <p className="text-center text-muted-foreground mt-10">
            Subkultur tidak ditemukan.
          </p>
        )}
      </main>

      {/* <NewsletterSection /> */}
      <Footer onNavClick={handleNavClick} onCategoryClick={handleCategoryClick} />
    </div>
  )
}
