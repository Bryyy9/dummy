"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, MapPin } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { SearchInput } from "@/components/search-input"
import { LEXICON, type LexiconEntry } from "@/data/lexicon"
import { SUBCULTURE_PROFILES } from "@/data/subculture-profiles"
import { getRegionHeroImage } from "@/data/region-images"
import { searchLexiconEntries, type SearchResult } from "@/lib/search-utils"

export default function RegionDetailPage() {
  const params = useParams()
  const regionId = params.id as string

  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [filteredItems, setFilteredItems] = useState<any[]>([])

  const [videoIndex, setVideoIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement | null>(null)

  const [autoRotate, setAutoRotate] = useState(true)
  const [viewerKey, setViewerKey] = useState(0)

  const [expandedIdx, setExpandedIdx] = useState<number | null>(null)

  const [isNavSticky, setIsNavSticky] = useState(false)
  const [activeSection, setActiveSection] = useState<string>("region-profile")
  const navRef = useRef<HTMLElement | null>(null)

  const [current3DModelIndex, setCurrent3DModelIndex] = useState(0)

  const lexicon: LexiconEntry[] = LEXICON[regionId] || []

  const heroImage = getRegionHeroImage(regionId)

  const profile = SUBCULTURE_PROFILES[regionId]
  const baseVideoSrc = "/videos/subculture-sample.mp4"
  const videos = [baseVideoSrc]
  const posters = [heroImage]

  const goPrev = () => setVideoIndex((i) => (i - 1 + videos.length) % videos.length)
  const goNext = () => setVideoIndex((i) => (i + 1) % videos.length)

  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    if (searchQuery.trim()) {
      const results = searchLexiconEntries(lexicon, searchQuery)
      setSearchResults(results)
    } else {
      setSearchResults([])
    }
  }, [searchQuery, lexicon])

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.load()
    if (isPlaying) {
      const playPromise = v.play()
      playPromise?.catch(() => setIsPlaying(false))
    }
  }, [videoIndex, isPlaying])

  useEffect(() => {
    const handleScroll = () => {
      const headerHeight = 64
      setIsNavSticky(window.scrollY > headerHeight)

      const sections = ["region-profile", "video-profile", "viewer-3d", "search-and-explore"]
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

  const galleryImages = [
    heroImage || "/subculture-gallery-1.jpg",
    "/subculture-gallery-2.jpg",
    "/subculture-gallery-3.jpg",
  ]

  const goToPrev = () => setCurrentImageIndex((i) => (i - 1 + galleryImages.length) % galleryImages.length)
  const goToNext = () => setCurrentImageIndex((i) => (i + 1) % galleryImages.length)

  const create3DModels = () => {
    if (!profile?.model3d) return []

    const primaryModel = {
      id: profile.model3d.sketchfabId,
      title: profile.model3d.title,
      description: profile.model3d.description,
      artifactType: profile.model3d.artifactType,
      tags: profile.model3d.tags,
    }

    // Create related artifact models based on highlights
    const relatedModels = profile.highlights.slice(0, 2).map((highlight, idx) => ({
      id: profile.model3d.sketchfabId, // In production, these would be different IDs
      title: `${highlight} - 3D Model`,
      description: `Interactive 3D representation of ${highlight} from ${profile.displayName}`,
      artifactType: highlight,
      tags: [highlight, "Artifact", "Interactive"],
    }))

    return [primaryModel, ...relatedModels]
  }

  const models3D = create3DModels()
  const go3DPrev = () => setCurrent3DModelIndex((i) => (i - 1 + models3D.length) % models3D.length)
  const go3DNext = () => setCurrent3DModelIndex((i) => (i + 1) % models3D.length)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 space-y-2">
          <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/peta-budaya" className="hover:underline">
                  Cultural Map
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-foreground font-medium">{regionId}</li>
            </ol>
          </nav>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/peta-budaya">
                <Button variant="ghost" size="sm" className="hover:bg-accent/10">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Map
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-foreground">{regionId} Glosarium Lokal</h1>
                <p className="text-sm text-muted-foreground">Terms and definitions for this subculture.</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* In-page subnav */}
      <nav
        ref={navRef}
        aria-label="Halaman sub-bab"
        className={`bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-[64px] z-40 border-b border-border transition-shadow duration-200 ${
          isNavSticky ? "shadow-md" : ""
        }`}
      >
        <div className="container mx-auto px-4">
          <ul className="flex gap-2 overflow-x-auto py-2 no-scrollbar">
            <li>
              <a
                href="#region-profile"
                className={`px-3 py-2 rounded-md text-sm transition-colors ${
                  activeSection === "region-profile"
                    ? "bg-primary/20 text-primary font-medium"
                    : "hover:bg-accent/20 text-foreground"
                }`}
              >
                Background
              </a>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <a
                href="#video-profile"
                className={`px-3 py-2 rounded-md text-sm transition-colors ${
                  activeSection === "video-profile"
                    ? "bg-primary/20 text-primary font-medium"
                    : "hover:bg-accent/20 text-foreground"
                }`}
              >
                Profile Video
              </a>
            </li>
            <li>
              <a
                href="#viewer-3d"
                className={`px-3 py-2 rounded-md text-sm transition-colors ${
                  activeSection === "viewer-3d"
                    ? "bg-primary/20 text-primary font-medium"
                    : "hover:bg-accent/20 text-foreground"
                }`}
              >
                3D Object
              </a>
            </li>
            <li>
              <a
                href="#search-and-explore"
                className={`px-3 py-2 rounded-md text-sm transition-colors ${
                  activeSection === "search-and-explore"
                    ? "bg-primary/20 text-primary font-medium"
                    : "hover:bg-accent/20 text-foreground"
                }`}
              >
                Search Terms
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero / CTA section with immersive image */}
      <section aria-label="Hero" className="relative overflow-hidden border-b border-border">
        <div className="relative">
          <img
            src={heroImage || "/placeholder.svg"}
            alt={`${regionId} cultural landscape`}
            className="h-[42vh] md:h-[52vh] w-full object-cover"
            crossOrigin="anonymous"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="mx-auto max-w-4xl px-4 text-center">
              <motion.h2
                className="text-balance text-3xl md:text-5xl font-semibold drop-shadow-sm"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Start your adventure in {regionId}
              </motion.h2>
              <motion.p
                className="mt-4 text-pretty text-sm md:text-base text-muted-foreground max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Explore cultural identity, historical roots, and why this region matters. Browse traditions, artifacts,
                and events in a beautifully curated experience.
              </motion.p>
              <motion.div
                className="mt-6 flex items-center justify-center gap-3"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
              >
                <a href="#search-and-explore">
                  <Button className="bg-primary hover:bg-primary/90">Start exploring</Button>
                </a>
                <a href="#region-profile">
                  <Button variant="outline">About the region</Button>
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-6 space-y-8">
        {/* Profile overview cards */}
        <section id="region-profile" className="bg-card/60 rounded-xl shadow-sm border border-border p-6">
          {(() => {
            const profile = SUBCULTURE_PROFILES[regionId]
            if (!profile)
              return (
                <p className="text-sm text-muted-foreground">
                  Detailed profile for this subculture is not yet available. Use the glossary below.
                </p>
              )

            const { displayName, history, highlights } = profile

            // Create gallery images - using hero image and placeholder variations

            return (
              <div className="space-y-6">
                {/* Image Gallery with Recent Articles Sidebar */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Image Carousel */}
                  <div className="lg:col-span-2">
                    <div className="relative rounded-lg overflow-hidden border border-border bg-background/50">
                      <div className="relative aspect-video">
                        <img
                          src={galleryImages[currentImageIndex] || "/placeholder.svg"}
                          alt={`${displayName} gallery image ${currentImageIndex + 1}`}
                          className="w-full h-full object-cover"
                          crossOrigin="anonymous"
                        />
                        {/* Navigation Arrows */}
                        <button
                          onClick={goToPrev}
                          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                          aria-label="Previous image"
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        <button
                          onClick={goToNext}
                          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                          aria-label="Next image"
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>

                      {/* Pagination Dots */}
                      <div className="flex items-center justify-center gap-2 py-4 bg-background/50">
                        {galleryImages.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setCurrentImageIndex(idx)}
                            className={`w-2 h-2 rounded-full transition-colors ${
                              idx === currentImageIndex ? "bg-primary" : "bg-muted-foreground/40"
                            }`}
                            aria-label={`Go to image ${idx + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Recent Articles Sidebar */}
                  <aside className="rounded-lg border border-border bg-background/50 p-4">
                    <h3 className="font-bold text-foreground mb-4">Recent Articles</h3>
                    <ul className="space-y-3">
                      {highlights.slice(0, 3).map((article, idx) => (
                        <li
                          key={idx}
                          className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                        >
                          {article}
                        </li>
                      ))}
                    </ul>
                  </aside>
                </div>

                {/* Descriptive Text Section */}
                <div className="rounded-lg border border-border bg-background/50 p-6 space-y-4">
                  <h2 className="text-2xl font-bold text-foreground">{displayName}</h2>
                  <div className="space-y-3 text-muted-foreground">
                    <p className="text-base leading-relaxed">{history}</p>
                    <p className="text-base leading-relaxed">
                      This subculture is characterized by its unique traditions, artistic expressions, and cultural
                      practices that have been preserved and evolved over generations. The community maintains strong
                      connections to its heritage while adapting to contemporary influences, creating a dynamic cultural
                      landscape.
                    </p>
                  </div>

                  {/* Key Highlights */}
                  <div className="pt-4">
                    <h3 className="font-semibold text-foreground mb-3">Key Cultural Elements</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span className="text-sm text-muted-foreground">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )
          })()}
        </section>

        <section
          id="video-profile"
          aria-label="Video subkultur"
          className="rounded-xl shadow-sm border border-border bg-card/60 p-6"
        >
          {(() => {
            const p = SUBCULTURE_PROFILES[regionId]
            if (!p?.video?.youtubeId) {
              return (
                <div className="text-center py-8">
                  <p className="text-sm text-muted-foreground">
                    Video profile for this subculture is not yet available.
                  </p>
                </div>
              )
            }
            return (
              <div className="space-y-4">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">Cultural Profile Video</h2>
                  <p className="text-sm text-muted-foreground">
                    Watch an in-depth exploration of {p.displayName}'s cultural heritage, traditions, and contemporary
                    expressions. This video provides visual context and authentic perspectives on the subculture.
                  </p>
                </div>

                <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-border bg-background/50">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${p.video.youtubeId}?rel=0&modestbranding=1`}
                    title={`${p.displayName} Cultural Profile Video`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="px-3 py-1 rounded-full text-xs border border-border bg-background/60 text-muted-foreground">
                    Documentary
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs border border-border bg-background/60 text-muted-foreground">
                    Cultural Heritage
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs border border-border bg-background/60 text-muted-foreground">
                    {p.displayName}
                  </span>
                </div>
              </div>
            )
          })()}
        </section>

        <section
          id="viewer-3d"
          aria-label="Penampil 3D"
          className="rounded-xl shadow-sm border border-border bg-card/60 p-6"
        >
          {(() => {
            const p = SUBCULTURE_PROFILES[regionId]
            if (!p?.model3d?.sketchfabId || models3D.length === 0) {
              return (
                <div className="text-center py-8">
                  <p className="text-sm text-muted-foreground">3D models for this subculture are not yet available.</p>
                </div>
              )
            }

            const currentModel = models3D[current3DModelIndex]

            return (
              <div className="space-y-4">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">3D Cultural Artifacts & Environments</h2>
                  <p className="text-sm text-muted-foreground">
                    Explore interactive 3D models representing artifacts, architectural elements, or cultural landscapes
                    of {p.displayName}. Rotate, zoom, and examine details from every angle to deepen your understanding
                    of the material culture.
                  </p>
                </div>

                {/* 3D Model Viewer */}
                <div className="relative w-full rounded-lg overflow-hidden border border-border bg-background/50">
                  <iframe
                    key={`model-${current3DModelIndex}`}
                    className="w-full"
                    style={{ height: "500px" }}
                    src={`https://sketchfab.com/models/${currentModel.id}/embed?autospin=1&autostart=1`}
                    title={`${currentModel.title}`}
                    allow="autoplay; fullscreen; xr-spatial-tracking"
                    allowFullScreen
                  />

                  {/* Navigation Arrows */}
                  {models3D.length > 1 && (
                    <>
                      <button
                        onClick={go3DPrev}
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                        aria-label="Previous 3D model"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button
                        onClick={go3DNext}
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                        aria-label="Next 3D model"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </>
                  )}
                </div>

                {/* Pagination Dots */}
                {models3D.length > 1 && (
                  <div className="flex items-center justify-center gap-2">
                    {models3D.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrent3DModelIndex(idx)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          idx === current3DModelIndex ? "bg-primary" : "bg-muted-foreground/40"
                        }`}
                        aria-label={`Go to 3D model ${idx + 1}`}
                      />
                    ))}
                  </div>
                )}

                {/* Model Information */}
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{currentModel.title}</h3>
                    <p className="text-sm text-muted-foreground">{currentModel.description}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {currentModel.tags.map((tag, idx) => (
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

        <section id="search-and-explore" className="bg-card/60 rounded-xl shadow-sm border border-border p-6">
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

        <section aria-label="Daftar istilah">
          {(() => {
            const displayItems = searchQuery ? searchResults.map((r) => r.entry) : lexicon

            return (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {displayItems.map((entry, i) => {
                  const isOpen = expandedIdx === i
                  const contentId = `lexicon-details-${i}`

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
                      <button
                        type="button"
                        className="w-full text-left px-4 py-3 flex items-start justify-between gap-3 hover:bg-accent/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                        aria-expanded={isOpen}
                        aria-controls={contentId}
                        onClick={() => setExpandedIdx((prev) => (prev === i ? null : i))}
                      >
                        <div>
                          <h3 className="font-semibold text-foreground">{entry.term}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">{entry.definition}</p>
                        </div>
                        <svg
                          className={`w-4 h-4 mt-1 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.23 7.21a.75.75 0 011.06.02L10 11.127l3.71-3.896a.75.75 0 111.08 1.04l-4.24 4.46a.75.75 0 01-1.08 0l-4.24-4.46a.75.75 0 01.02-1.06z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>

                      <motion.div
                        id={contentId}
                        initial={false}
                        animate={{
                          height: isOpen ? "auto" : 0,
                          opacity: isOpen ? 1 : 0,
                        }}
                        transition={{ duration: 0.24, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-4 pt-1">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="rounded-lg border border-border bg-background/50 p-3">
                              <h4 className="text-xs font-medium text-muted-foreground mb-1">Makna Etimologi</h4>
                              <p className="text-sm text-foreground/90">{entry.etimologi || "—"}</p>
                            </div>
                            <div className="rounded-lg border border-border bg-background/50 p-3">
                              <h4 className="text-xs font-medium text-muted-foreground mb-1">Makna Cultural</h4>
                              <p className="text-sm text-foreground/90">{entry.culturalMeaning || "—"}</p>
                            </div>
                            <div className="rounded-lg border border-border bg-background/50 p-3">
                              <h4 className="text-xs font-medium text-muted-foreground mb-1">Varian Makna</h4>
                              {entry.variants && entry.variants.length > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                  {entry.variants.map((v, idx) => (
                                    <span
                                      key={idx}
                                      className="px-2 py-0.5 rounded-full border border-border bg-card/60 text-xs"
                                    >
                                      {v}
                                    </span>
                                  ))}
                                </div>
                              ) : (
                                <p className="text-sm text-foreground/90">—</p>
                              )}
                            </div>
                            <div className="rounded-lg border border-border bg-background/50 p-3">
                              <h4 className="text-xs font-medium text-muted-foreground mb-1">Common Meaning</h4>
                              <p className="text-sm text-foreground/90">{entry.commonMeaning || "—"}</p>
                            </div>
                            <div className="rounded-lg border border-border bg-background/50 p-3">
                              <h4 className="text-xs font-medium text-muted-foreground mb-1">Keterangan</h4>
                              <p className="text-sm text-foreground/90">{entry.note || "—"}</p>
                            </div>
                            <div className="rounded-lg border border-border bg-background/50 p-3">
                              <h4 className="text-xs font-medium text-muted-foreground mb-1">
                                Ketersediaan Informasi lain
                              </h4>
                              <p className="text-sm text-foreground/90">{entry.availability || "—"}</p>
                            </div>
                          </div>
                        </div>
                      </motion.div>

                      <div className="px-4 pb-3">
                        <Link
                          href={`/budaya/daerah/-/${termSlug}`}
                          aria-label={`Lihat rincian untuk istilah ${entry.term}`}
                        >
                          <Button size="sm" className="w-full md:w-auto">
                            Rincian
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
    </div>
  )
}
