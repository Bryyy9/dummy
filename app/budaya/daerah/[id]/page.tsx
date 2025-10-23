"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, MapPin, Play } from "lucide-react"
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
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null)

  const [isNavSticky, setIsNavSticky] = useState(false)
  const [activeSection, setActiveSection] = useState<string>("region-profile")
  const navRef = useRef<HTMLElement | null>(null)

  const lexicon: LexiconEntry[] = LEXICON[regionId] || []

  const heroImage = getRegionHeroImage(regionId)

  const profile = SUBCULTURE_PROFILES[regionId]

  useEffect(() => {
    if (searchQuery.trim()) {
      const results = searchLexiconEntries(lexicon, searchQuery)
      setSearchResults(results)
    } else {
      setSearchResults([])
    }
  }, [searchQuery, lexicon])

  useEffect(() => {
    const handleScroll = () => {
      const headerHeight = 64
      setIsNavSticky(window.scrollY > headerHeight)

      const sections = ["region-profile", "search-and-explore"]
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
                Profile
              </a>
            </li>
            <li aria-hidden="true">/</li>
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
        {/* Profile section */}
        <section id="region-profile" className="bg-card/60 rounded-xl shadow-sm border border-border p-6 md:p-8">
          {(() => {
            const profile = SUBCULTURE_PROFILES[regionId]
            if (!profile)
              return (
                <p className="text-sm text-muted-foreground">
                  Detailed profile for this subculture is not yet available. Use the glossary below.
                </p>
              )
            const { displayName, history, highlights } = profile
            return (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-start">
                {/* Left: Profile Information */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-white font-bold text-lg">
                      {displayName.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{displayName}</h3>
                      <p className="text-xs text-muted-foreground">Subculture Profile</p>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-lg">
                        ★
                      </span>
                    ))}
                  </div>

                  {/* Description */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-foreground text-sm">About {displayName}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{history}</p>

                    {/* Highlights */}
                    <div className="space-y-2">
                      <h5 className="text-xs font-medium text-muted-foreground uppercase">Key Highlights</h5>
                      <ul className="space-y-1">
                        {highlights.map((h, i) => (
                          <li key={i} className="text-sm text-foreground flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Center: Large Image */}
                <div className="flex flex-col gap-3">
                  <div className="relative w-full aspect-square rounded-lg overflow-hidden border border-border bg-background/50">
                    <img
                      src={heroImage || "/placeholder.svg?height=400&width=400&query=subculture"}
                      alt={`${displayName} cultural imagery`}
                      className="w-full h-full object-cover"
                      crossOrigin="anonymous"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground text-center">Cultural imagery of {displayName}</p>
                </div>

                {/* Right: Video Preview */}
                <div className="flex flex-col gap-3">
                  {profile.video?.youtubeId ? (
                    <>
                      <div className="relative w-full aspect-square rounded-lg overflow-hidden border border-border bg-background/50 group cursor-pointer">
                        <img
                          src={`https://img.youtube.com/vi/${profile.video.youtubeId}/maxresdefault.jpg`}
                          alt={profile.video.title}
                          className="w-full h-full object-cover group-hover:opacity-80 transition-opacity"
                          crossOrigin="anonymous"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                          <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                            <Play className="w-6 h-6 text-primary fill-primary ml-1" />
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="text-xs font-medium text-foreground line-clamp-2">{profile.video.title}</p>
                        <a
                          href={`https://www.youtube.com/watch?v=${profile.video.youtubeId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button size="sm" variant="outline" className="w-full bg-transparent">
                            See more travel perks
                          </Button>
                        </a>
                      </div>
                    </>
                  ) : (
                    <div className="w-full aspect-square rounded-lg border border-border bg-background/50 flex items-center justify-center">
                      <p className="text-sm text-muted-foreground">Video not available</p>
                    </div>
                  )}
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
