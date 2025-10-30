"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { MapPin, Play } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { SearchInput } from "@/components/search-input"
import { LEXICON, type LexiconEntry } from "@/data/lexicon"
import { SUBCULTURE_PROFILES } from "@/data/subculture-profiles"
import { getRegionHeroImage } from "@/data/region-images"
import { searchLexiconEntries, type SearchResult } from "@/lib/search-utils"
import { Navigation } from "@/components/layout/navigation"
import { useNavigation } from "@/hooks/use-navigation"
import { Footer } from "@/components/layout/footer"
import { NewsletterSection } from "@/components/sections/newsletter-section"
import { YouTubeVideosSection } from "@/components/cultural/youtube-videos-section"

export default function RegionDetailPage() {
  const params = useParams()
  const regionId = params.id as string

  const { handleNavClick } = useNavigation()

  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])

  const [isNavSticky, setIsNavSticky] = useState(false)
  const [activeSection, setActiveSection] = useState<string>("region-profile")

  const lexicon: LexiconEntry[] = LEXICON[regionId] || []

  const heroImage = getRegionHeroImage(regionId)

  const profile = SUBCULTURE_PROFILES[regionId]

  const carouselRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const [dragWidth, setDragWidth] = useState(0)

  const models3D =
    profile?.model3dArray && profile.model3dArray.length > 0
      ? profile.model3dArray.map((model) => ({
          id: model.sketchfabId,
          title: model.title,
          description: model.description,
          artifactType: model.artifactType,
          tags: model.tags,
        }))
      : []

  useEffect(() => {
    if (searchQuery.trim()) {
      const currentLexicon = LEXICON[regionId] || []
      const results = searchLexiconEntries(currentLexicon, searchQuery)
      setSearchResults(results)
    } else {
      setSearchResults([])
    }
  }, [searchQuery, regionId])

  useEffect(() => {
    const handleScroll = () => {
      const headerHeight = 64
      setIsNavSticky(window.scrollY > headerHeight)

      const sections = ["region-profile", "photo-gallery", "viewer-3d", "videos-section", "search-and-explore"]
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

  useEffect(() => {
    if (carouselRef.current && innerRef.current) {
      const scrollWidth = innerRef.current.scrollWidth
      const offsetWidth = carouselRef.current.offsetWidth
      setDragWidth(scrollWidth - offsetWidth)
    }
  }, [profile])

  if (!lexicon.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Region Not Found</h1>
          <Link href="/peta-budaya">
            <Button variant="outline">Back to Map</Button>
          </Link>
        </div>
      </div>
    )
  }

  const galleryImages = profile?.galleryImages?.map((img) => img.url) || [
    heroImage || "/subculture-gallery-1.jpg",
    "/subculture-gallery-2.jpg",
    "/subculture-gallery-3.jpg",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Navigation onNavClick={handleNavClick} />
      <section aria-label="Hero" className="relative overflow-hidden border-b border-border">
        <div className="relative">
          {/* Background Image */}
          <img
            src={heroImage || "/placeholder.svg"}
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
              Discover the Living Tapestry of {profile?.displayName || regionId}
            </motion.h1>

            {/* Subtext */}
            <motion.p
              className="mt-4 text-lg md:text-xl text-gray-200 max-w-2xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Navigate an elegant cultural map to explore regions, traditions, artifacts, and events—curated to reveal
              identity, history, and significance with clarity and beauty.
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
                  href="#videos-section"
                  onClick={(e) => scrollToSection(e, "videos-section")}
                  className={`px-3 py-2 rounded-md text-sm transition-colors flex items-center gap-1 ${
                    activeSection === "videos-section"
                      ? "bg-primary/20 text-primary font-medium"
                      : "hover:bg-accent/20 text-foreground"
                  }`}
                >
                  <Play className="w-4 h-4" />
                  Video
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
            const profile = SUBCULTURE_PROFILES[regionId]
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
        <section
          id="photo-gallery"
          className="bg-card/60 rounded-xl shadow-sm border border-border p-6 overflow-hidden scroll-mt-24"
        >
          <h2 className="text-2xl font-bold text-foreground mb-6">Serba-serbi {profile?.displayName}</h2>

          {/* Carousel wrapper */}
          <motion.div ref={carouselRef} className="overflow-hidden cursor-grab active:cursor-grabbing">
            <motion.div ref={innerRef} drag="x" dragConstraints={{ right: 0, left: -dragWidth }} className="flex gap-4">
              {galleryImages.map((img, idx) => (
                <motion.div
                  key={idx}
                  className="min-w-[300px] md:min-w-[340px] rounded-lg overflow-hidden border border-border bg-background/50 hover:scale-[1.02] transition-transform shadow-sm"
                  whileHover={{ scale: 1.03 }}
                >
                  <img
                    src={img || "/placeholder.svg"}
                    alt={`${profile?.displayName} foto ${idx + 1}`}
                    className="w-full h-56 object-cover"
                    crossOrigin="anonymous"
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <p className="text-center text-sm text-muted-foreground mt-4">Geser untuk melihat lebih banyak foto →</p>
        </section>

             {/* 5️⃣ VIDEO SECTION */}
        {profile?.video && (
          <section
            id="videos-section"
            aria-label="Video Budaya"
            className="rounded-xl shadow-sm border border-border bg-card/60 p-6 scroll-mt-24"
          >
            <h2 className="text-2xl font-bold text-foreground mb-6">Video Dokumenter {profile.displayName}</h2>
            <YouTubeVideosSection videos={[profile.video]} subcultureName={profile.displayName} />
          </section>
        )}

        {/* 4️⃣ 3D SUBCULTURE SECTION */}
        <section
          id="viewer-3d"
          aria-label="Penampil 3D"
          className="rounded-xl shadow-sm border border-border bg-card/60 p-6 scroll-mt-24"
        >
          {(() => {
            const p = SUBCULTURE_PROFILES[regionId]
            if (!p?.model3dArray || p.model3dArray.length === 0) {
              return (
                <div className="text-center py-8">
                  <p className="text-sm text-muted-foreground">3D models for this subculture are not yet available.</p>
                </div>
              )
            }

            const currentModel = models3D[0] // Show first model only

            return (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground mb-2">3D Cultural Artifacts & Environments</h2>
                <p className="text-sm text-muted-foreground">
                  Jelajahi model 3D interaktif dari artefak budaya dan lingkungan suku {p.displayName}.
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
            const displayItems = searchQuery ? searchResults.map((r) => r.entry) : lexicon

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
