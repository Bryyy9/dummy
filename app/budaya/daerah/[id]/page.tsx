"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { MapPin } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { SearchInput } from "@/components/search-input"
import { Navigation } from "@/components/layout/navigation"
import { useNavigation } from "@/hooks/use-navigation"
import { Footer } from "@/components/layout/footer"
import { NewsletterSection } from "@/components/sections/newsletter-section"
import { Navbar } from "@/components/layout/navigation/navbar"

interface SearchResult {
  term: string
  definition: string
  category: string
  region: string
  slug: string
}

interface SubcultureData {
  subcultureId: number
  profile: {
    displayName: string
    history: string
    highlights: any[]
  }
  galleryImages: Array<{ url: string }>
  model3dArray: Array<{
    sketchfabId: string
    title: string
    description: string
    artifactType: string
    tags: any[]
  }>
  lexicon: Array<{
    term: string
    definition: string
    category: string
    slug: string
  }>
  heroImage: string | null
  culture: {
    name: string
    province: string
    region: string
  }
}

export default function RegionDetailPage() {
  const params = useParams()
  const regionId = params.id as string

  const { handleNavClick } = useNavigation()

  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [subcultureData, setSubcultureData] = useState<SubcultureData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [isNavSticky, setIsNavSticky] = useState(false)
  const [activeSection, setActiveSection] = useState<string>("region-profile")

  const [current3DModelIndex, setCurrent3DModelIndex] = useState(0)

  useEffect(() => {
    const fetchSubcultureData = async () => {
      try {
        setLoading(true)
        const response = await fetch(`http://localhost:8000/api/v1/public/subcultures/${regionId}`)
        if (!response.ok) {
          throw new Error('Failed to fetch subculture data')
        }
        const result = await response.json()
        if (result.success) {
          setSubcultureData(result.data)
        } else {
          throw new Error(result.message || 'Failed to fetch data')
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    if (regionId) {
      fetchSubcultureData()
    }
  }, [regionId])

  const carouselRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const [dragWidth, setDragWidth] = useState(0)

  const go3DPrev = () => setCurrent3DModelIndex((i) => (i - 1 + models3D.length) % models3D.length)
  const go3DNext = () => setCurrent3DModelIndex((i) => (i + 1) % models3D.length)

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchQuery.trim()) {
        try {
          const response = await fetch(`http://localhost:8000/api/v1/public/subcultures/${regionId}?search=${encodeURIComponent(searchQuery.trim())}`)
          if (response.ok) {
            const result = await response.json()
            if (result.success) {
              setSearchResults(result.data.searchResults || [])
            }
          }
        } catch (err) {
          console.error('Search failed:', err)
        }
      } else {
        setSearchResults([])
      }
    }

    const debounceTimer = setTimeout(fetchSearchResults, 300)
    return () => clearTimeout(debounceTimer)
  }, [searchQuery, regionId])

  useEffect(() => {
    const handleScroll = () => {
      const headerHeight = 64
      setIsNavSticky(window.scrollY > headerHeight)

      const sections = ["region-profile", "photo-gallery", "viewer-3d", "search-and-explore"]
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 200) {
            setActiveSection(sectionId)
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading subculture details...</p>
        </div>
      </div>
    )
  }

  if (error || !subcultureData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            {error || 'Subculture Not Found'}
          </h1>
          <Link href="/peta-budaya">
            <Button variant="outline">Back to Map</Button>
          </Link>
        </div>
      </div>
    )
  }

  const galleryImages = subcultureData.galleryImages.length > 0
    ? subcultureData.galleryImages.map((img) => img.url)
    : ["/subculture-gallery-1.jpg", "/subculture-gallery-2.jpg", "/subculture-gallery-3.jpg"]

  const models3D = subcultureData.model3dArray && subcultureData.model3dArray.length > 0
    ? subcultureData.model3dArray.map((model) => ({
        id: model.sketchfabId,
        title: model.title,
        description: model.description,
        artifactType: model.artifactType,
        tags: model.tags,
      }))
    : []

  return (
    
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Navigation onNavClick={handleNavClick} />
<section aria-label="Hero" className="relative overflow-hidden border-b border-border">
  <div className="relative">
    {/* Background Image */}
    <img
      src={subcultureData.heroImage || "/placeholder.svg"}
      alt={`${regionId} cultural landscape`}
      className="h-[65vh] md:h-[80vh] w-full object-cover"
      crossOrigin="anonymous"
    />
    {/* Overlay gradient */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

    {/* Hero Content */}
    <div className="absolute inset-0 flex flex-col justify-center items-start px-12 md:px-16 lg:px-24">
      {/* Breadcrumb */}
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-sm text-gray-200 mb-3"
        aria-label="Breadcrumb"
      >
        <ol className="flex items-center space-x-2">
          <li>
            <Link href="/" className="hover:underline">
              Home
            </Link>
          </li>
          <li aria-hidden="true">›</li>
          <li>
            <Link href="/peta-budaya" className="hover:underline">
              Culture Map
            </Link>
          </li>
        </ol>
      </motion.nav>

      {/* Headline */}
      <motion.h1
        className="text-4xl md:text-6xl font-extrabold text-white max-w-3xl leading-tight"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        Discover the Living Tapestry of {subcultureData.profile?.displayName || regionId}
      </motion.h1>

      {/* Subtext */}
      <motion.p
        className="mt-4 text-lg md:text-xl text-gray-200 max-w-2xl leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Navigate an elegant cultural map to explore regions, traditions, artifacts, and events—curated
        to reveal identity, history, and significance with clarity and beauty.
      </motion.p>
    </div>
  </div>
</section>

      {/* MAIN: tambahkan scroll-smooth supaya anchor jump lebih halus */}
      <main className="container mx-auto px-4 py-6 space-y-8 scroll-smooth">
        <nav
          aria-label="Halaman sub-bab"
          className={`bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-40 border-b border-border transition-shadow duration-200 ${
            isNavSticky ? "shadow-md" : ""
          }`}
        >
          <div className="container mx-auto px-4">
            <ul className="flex gap-2 overflow-x-auto py-2 no-scrollbar">
              <li>
                <a
                  href="#region-profile"
                  onClick={(e) => scrollToSection(e, "region-profile")}
                  className={`px-3 py-2 rounded-md text-sm transition-colors ${
                    activeSection === "region-profile"
                      ? "bg-primary/20 text-primary font-medium"
                      : "hover:bg-accent/20 text-foreground"
                  }`}
                >
                  Profile Subkulture
                </a>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <a
                  href="#photo-gallery"
                  onClick={(e) => scrollToSection(e, "photo-gallery")}
                  className={`px-3 py-2 rounded-md text-sm transition-colors ${
                    activeSection === "photo-gallery"
                      ? "bg-primary/20 text-primary font-medium"
                      : "hover:bg-accent/20 text-foreground"
                  }`}
                >
                  Galeri Foto
                </a>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <a
                  href="#viewer-3d"
                  onClick={(e) => scrollToSection(e, "viewer-3d")}
                  className={`px-3 py-2 rounded-md text-sm transition-colors ${
                    activeSection === "viewer-3d"
                      ? "bg-primary/20 text-primary font-medium"
                      : "hover:bg-accent/20 text-foreground"
                  }`}
                >
                  Model 3D
                </a>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <a
                  href="#search-and-explore"
                  onClick={(e) => scrollToSection(e, "search-and-explore")}
                  className={`px-3 py-2 rounded-md text-sm transition-colors ${
                    activeSection === "search-and-explore"
                      ? "bg-primary/20 text-primary font-medium"
                      : "hover:bg-accent/20 text-foreground"
                  }`}
                >
                  Kumpulan kata
                </a>
              </li>
            </ul>
          </div>
        </nav>

  {/* 2️⃣ PROFIL SUBCULTURE SECTION */}
  <section id="region-profile" className="bg-card/60 rounded-xl shadow-sm border border-border p-6 scroll-mt-24">
    {(() => {
      const profile = subcultureData.profile
      if (!profile)
        return (
          <p className="text-sm text-muted-foreground">
            Detailed profile for this subculture is not yet available.
          </p>
        )

            const { displayName, history, highlights } = profile

      return (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-foreground">Sekilas tentang {displayName}</h2>
          <p className="text-base leading-relaxed text-muted-foreground">{history}</p>
        </div>
      )
    })()}
  </section>

{/* 3️⃣ FOTO SUBCULTURE SECTION — Slider Fix */}
<section id="photo-gallery" className="bg-card/60 rounded-xl shadow-sm border border-border p-6 scroll-mt-24">
  <h2 className="text-2xl font-bold text-foreground mb-6">Serba-serbi {subcultureData.profile?.displayName}</h2>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {galleryImages.map((img, idx) => (
      <div
        key={idx}
        className="rounded-lg overflow-hidden border border-border bg-background/50 hover:scale-[1.02] transition-transform shadow-sm"
      >
        <img
          src={img}
          alt={`${subcultureData.profile?.displayName} foto ${idx + 1}`}
          className="w-full h-56 object-cover"
          crossOrigin="anonymous"
        />
      </div>
    ))}
  </div>
</section>



  {/* 4️⃣ 3D SUBCULTURE SECTION */}
  <section
    id="viewer-3d"
    aria-label="Penampil 3D"
    className="rounded-xl shadow-sm border border-border bg-card/60 p-6 scroll-mt-24"
  >
    {(() => {
      if (!subcultureData?.model3dArray || subcultureData.model3dArray.length === 0) {
        return (
          <div className="text-center py-8">
            <p className="text-sm text-muted-foreground">
              3D models for this subculture are not yet available.
            </p>
          </div>
        )
      }

      const currentModel = models3D[current3DModelIndex]

      return (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              3D Cultural Artifacts & Environments
            </h2>
            {models3D.length > 1 && (
              <div className="flex gap-2">
                <button
                  onClick={go3DPrev}
                  className="px-3 py-1 bg-primary/20 hover:bg-primary/30 rounded text-sm"
                  aria-label="Previous 3D model"
                >
                  ← Prev
                </button>
                <button
                  onClick={go3DNext}
                  className="px-3 py-1 bg-primary/20 hover:bg-primary/30 rounded text-sm"
                  aria-label="Next 3D model"
                >
                  Next →
                </button>
              </div>
            )}
          </div>

          <p className="text-sm text-muted-foreground">
            Jelajahi model 3D interaktif dari artefak budaya dan lingkungan suku {subcultureData.profile.displayName}.
            Model {current3DModelIndex + 1} dari {models3D.length}.
          </p>

          <div className="relative w-full rounded-lg overflow-hidden border border-border bg-background/50">
            <iframe
              key={`model-${currentModel.id}`}
              className="w-full"
              style={{ height: "500px" }}
              src={`https://sketchfab.com/models/${currentModel.id}/embed?autospin=1&autostart=1`}
              title={`${currentModel.title}`}
              allow="autoplay; fullscreen; xr-spatial-tracking"
              allowFullScreen
            />
          </div>

          {/* Model Information */}
          <div className="space-y-3">
            <div>
              <h3 className="font-semibold text-foreground mb-1">{currentModel.title}</h3>
              <p className="text-sm text-muted-foreground">{currentModel.description}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {currentModel.tags.map((tag: string, idx: number) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full text-xs border border-border bg-background/60 text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="rounded-lg border border-border bg-background/50 p-3">
              <p className="text-xs text-muted-foreground">
                <strong>Interaction Tips:</strong> Use your mouse or touch to rotate the model. Scroll to zoom in
                and out. Click the fullscreen icon for an immersive viewing experience.
              </p>
            </div>
          </div>
        </div>
      )
    })()}
  </section>

        {/* Bagian Search & Explore tetap */}
        <section
          id="search-and-explore"
          className="bg-card/60 rounded-xl shadow-sm border border-border p-6 scroll-mt-24"
        >
          <div className="flex flex-col gap-4" role="search">
            <div>
              <h2 className="text-xl font-bold text-foreground mb-2">Search Lexicon</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Search across terms, definitions, transliterations, and more to find exactly what you're looking for.
              </p>
            </div>
            <SearchInput
              aria-label={`Search terms in ${regionId}`}
              placeholder={`Search terms, definitions, transliterations...`}
              value={searchQuery}
              onChange={setSearchQuery}
              onClear={() => setSearchQuery("")}
              resultCount={searchResults.length}
              showResultCount={true}
            />
          </div>
        </section>

        <section aria-label="Daftar istilah" className="scroll-mt-24">
          {(() => {
            const displayItems = searchQuery ? searchResults : subcultureData.lexicon

            return (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {displayItems.map((entry, i) => {
                  const termSlug = entry.term
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/(^-|-$)/g, "")

                  return (
                    <article
                      key={`${entry.term}-${i}`}
                      className="rounded-xl shadow-sm border bg-card/60 border-border overflow-hidden"
                    >
                      <div className="px-4 py-3">
                        <h3 className="font-semibold text-foreground">{entry.term}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{entry.definition}</p>
                      </div>

                      <div className="px-4 pb-4">
                        <Link
                          href={`/budaya/daerah/-/${termSlug}`}
                          aria-label={`Lihat rincian untuk istilah ${entry.term}`}
                          className="block"
                        >
                          <Button
                            size="lg"
                            className="w-full bg-primary text-white hover:bg-primary/90 rounded-md py-3"
                          >
                            Detail &nbsp;→
                          </Button>
                        </Link>
                      </div>
                    </article>
                  )
                })}

                {displayItems.length === 0 && (
                  <div className="text-center py-12 col-span-full">
                    <MapPin className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {searchQuery ? "No results found" : "Belum ada entri"}
                    </h3>
                    <p className="text-muted-foreground">
                      {searchQuery
                        ? `No lexicon entries match "${searchQuery}". Try different keywords.`
                        : "Glosarium untuk subkultur ini belum tersedia."}
                    </p>
                  </div>
                )}
              </div>
            )
          })()}
        </section>
      </main>

      <NewsletterSection />
      <Footer onNavClick={handleNavClick} />
    </div>
  )

  function scrollToSection(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
    e.preventDefault()
    const el = document.getElementById(id)
    if (!el) return
    const SCROLL_OFFSET = 96
    const top = el.getBoundingClientRect().top + window.pageYOffset - SCROLL_OFFSET
    window.scrollTo({ top, behavior: "smooth" })
    if (history.replaceState) {
      history.replaceState(null, "", `#${id}`)
    } else {
      window.location.hash = `#${id}`
    }
  }
}
