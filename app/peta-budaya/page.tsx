"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, MapPin, ArrowLeft, Info, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Link from "next/link"
import { InteractiveEastJavaMap } from "@/components/cultural/interactive-east-java-map"
import { SearchResults } from "@/components/cultural/search-results"
import { MapControls } from "@/components/cultural/map-controls"
import { useRouter } from "next/navigation"
import Image from "next/image"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { ParallaxBackground } from "@/components/common/parallax-background"
import { LEXICON } from "@/data/lexicon"

const eastJavaRegions = [
  {
    id: "arekan",
    name: "Arekan",
    coordinates: { x: 65, y: 45 },
    color: "#2563eb",
    culturalElements: ["Dialek Arek", "Remo", "Ludruk", "Rujak Cingur"],
    description: "Sub-kultur perkotaan pesisir dengan tradisi Arek yang egaliter dan ekspresif.",
    population: "—",
    established: "—",
    highlights: ["Ludruk", "Ekspresi Urban", "Kuliner Pesisir"],
    rating: 4.7,
    visitors: "—",
  },
  {
    id: "madura",
    name: "Madura",
    coordinates: { x: 70, y: 25 },
    color: "#dc2626",
    culturalElements: ["Keris", "Sape Sono", "Karapan Sapi", "Tradisi Pesantren"],
    description: "Identitas kepulauan dengan tradisi kuat, solidaritas komunal, dan Islam pesantren.",
    population: "—",
    established: "—",
    highlights: ["Karapan Sapi", "Tradisi Pesantren", "Keris"],
    rating: 4.8,
    visitors: "—",
  },
  {
    id: "madura-base",
    name: "Madura-Base",
    coordinates: { x: 65, y: 20 },
    color: "#ef4444",
    culturalElements: ["Anyaman", "Kuliner Khas", "Ritual Lokal"],
    description: "Basis sub-kultur Madura dengan penekanan pada tradisi sehari-hari dan anyaman.",
    population: "—",
    established: "—",
    highlights: ["Anyaman", "Kuliner Khas", "Ritual Kampung"],
    rating: 4.5,
    visitors: "—",
  },
  {
    id: "madura-bawean",
    name: "Madura-Bawean",
    coordinates: { x: 60, y: 10 },
    color: "#f97316",
    culturalElements: ["Kesenian Pulau", "Bahasa Lokal", "Laut & Perikanan"],
    description: "Sub-kultur kepulauan Bawean dengan tradisi maritim dan bahasa lokal.",
    population: "—",
    established: "—",
    highlights: ["Tradisi Maritim", "Bahasa Lokal", "Kesenian Pulau"],
    rating: 4.6,
    visitors: "—",
  },
  {
    id: "madura-kangean",
    name: "Madura-Kangean",
    coordinates: { x: 95, y: 30 },
    color: "#ea580c",
    culturalElements: ["Ritus Pesisir", "Perikanan", "Kriya"],
    description: "Kangean dengan identitas pesisir dan jaringan budaya kepulauan timur.",
    population: "—",
    established: "—",
    highlights: ["Ritus Pesisir", "Perikanan", "Kriya"],
    rating: 4.5,
    visitors: "—",
  },
  {
    id: "mataraman",
    name: "Mataraman",
    coordinates: { x: 30, y: 50 },
    color: "#16a34a",
    culturalElements: ["Gamelan", "Wayang", "Tata Krama Jawa"],
    description: "Sub-kultur bercorak Jawa Mataraman: tata krama halus, gamelan, dan wayang.",
    population: "—",
    established: "—",
    highlights: ["Wayang", "Gamelan", "Adab Mataraman"],
    rating: 4.7,
    visitors: "—",
  },
  {
    id: "osing",
    name: "Osing",
    coordinates: { x: 90, y: 70 },
    color: "#059669",
    culturalElements: ["Gandrung", "Barong", "Lare Using", "Batik Using"],
    description: "Osing/Using dengan bahasa dan kesenian khas Banyuwangi yang kuat.",
    population: "—",
    established: "—",
    highlights: ["Gandrung", "Barong", "Batik Using"],
    rating: 4.9,
    visitors: "—",
  },
  {
    id: "panaragan",
    name: "Panaragan",
    coordinates: { x: 40, y: 60 },
    color: "#0ea5e9",
    culturalElements: ["Kerajinan Kayu", "Seni Rakyat", "Upacara Lokal"],
    description: "Identitas lokal Panaragan yang lekat dengan seni rakyat dan kerajinan.",
    population: "—",
    established: "—",
    highlights: ["Seni Rakyat", "Kerajinan Kayu", "Upacara Lokal"],
    rating: 4.4,
    visitors: "—",
  },
  {
    id: "pandalungan",
    name: "Pandalungan",
    coordinates: { x: 80, y: 45 },
    color: "#7c3aed",
    culturalElements: ["Dialek Pandalungan", "Perpaduan Jawa-Madura", "Tradisi Pesisir"],
    description: "Perpaduan Jawa-Madura di tapal kuda: dialek khas dan tradisi pesisir.",
    population: "—",
    established: "—",
    highlights: ["Dialek Pandalungan", "Kuliner Pesisir", "Tradisi Campuran"],
    rating: 4.6,
    visitors: "—",
  },
  {
    id: "samin",
    name: "Samin",
    coordinates: { x: 25, y: 40 },
    color: "#10b981",
    culturalElements: ["Samin Surosentiko", "Etika Kejujuran", "Pertanian"],
    description: "Komunitas Samin yang dikenal pada etika kejujuran dan kesederhanaan.",
    population: "—",
    established: "—",
    highlights: ["Etika Samin", "Komunitas Agraris", "Sejarah Lokal"],
    rating: 4.3,
    visitors: "—",
  },
  {
    id: "tengger",
    name: "Tengger",
    coordinates: { x: 75, y: 55 },
    color: "#f59e0b",
    culturalElements: ["Yadnya Kasada", "Upacara Adat", "Gunung Bromo"],
    description: "Masyarakat Tengger pegunungan dengan ritus Kasada dan lanskap Bromo.",
    population: "—",
    established: "—",
    highlights: ["Kasada", "Pegunungan", "Identitas Tengger"],
    rating: 4.8,
    visitors: "—",
  },
]

export default function PetaBudayaPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)
  const [mapZoom, setMapZoom] = useState(1)
  const [mapCenter, setMapCenter] = useState({ x: 50, y: 50 })
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [searchResults, setSearchResults] = useState<any[]>([])
  const router = useRouter()

  // Handle search functionality
  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.trim()) {
      const results = eastJavaRegions.filter(
        (region) =>
          region.name.toLowerCase().includes(query.toLowerCase()) ||
          region.culturalElements.some((element) => element.toLowerCase().includes(query.toLowerCase())),
      )

      setSearchResults(results)
      setShowSearchResults(true)

      if (results.length > 0) {
        const firstResult = results[0]
        setMapCenter(firstResult.coordinates)
        setMapZoom(2)
        setSelectedRegion(firstResult.id)
      }
    } else {
      setShowSearchResults(false)
      setMapZoom(1)
      setMapCenter({ x: 50, y: 50 })
      setSelectedRegion(null)
    }
  }

  // Handle region click
  const handleRegionClick = (regionId: string) => {
    const region = eastJavaRegions.find((r) => r.id === regionId)
    if (region) {
      setSelectedRegion(region.id)
      setMapCenter(region.coordinates)
      setMapZoom(2)
    }
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
        <header className="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link href="/">
                  <Button variant="ghost" size="sm" className="hover:bg-accent/10">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                </Link>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">East Java Cultural Map</h1>
                  <p className="text-sm text-muted-foreground">Explore the cultural richness of each region</p>
                </div>
              </div>

              <div className="flex items-center gap-4 max-w-md w-full">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search regions or cultural items..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="pl-10 bg-background/50 border-border focus:ring-primary/20"
                  />
                </div>
                <MapControls
                  zoom={mapZoom}
                  onZoomIn={() => setMapZoom(Math.min(mapZoom + 0.5, 3))}
                  onZoomOut={() => setMapZoom(Math.max(mapZoom - 0.5, 0.5))}
                  onReset={() => {
                    setMapZoom(1)
                    setMapCenter({ x: 50, y: 50 })
                    setSelectedRegion(null)
                  }}
                />
              </div>
            </div>
          </div>
        </header>
        {/* Hero Section - UPDATED */}
        <section aria-labelledby="hero-title" className="relative">
          <ParallaxBackground className="relative h-[320px] md:h-[420px] overflow-hidden">
            <Image
              src="/east-java-temple-sunset-landscape-with-traditional.jpg"
              alt="Collage of cultural landscapes, textiles, and performers"
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-background/20 to-background/90" />
            <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-end pb-8 md:pb-10">
              <Breadcrumb className="mb-3 md:mb-4">
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Culture Map</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
              <motion.h1
                id="hero-title"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-balance text-3xl md:text-5xl font-bold tracking-tight text-foreground"
              >
                Discover the Living Tapestry of East Java
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.05, ease: "easeOut" }}
                className="mt-2 md:mt-3 text-pretty text-sm md:text-base text-muted-foreground max-w-2xl"
              >
                Navigate an elegant cultural map to explore regions, traditions, artifacts, and events—curated to reveal
                identity, history, and significance with clarity and beauty.
              </motion.p>
              
              {/* UPDATED: Added Glosarium button */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                className="mt-4 flex flex-col sm:flex-row items-start gap-3"
              >
                <Link href="#map">
                  <Button className="bg-primary hover:bg-primary/90">Start Exploring</Button>
                </Link>
                <Link href="/budaya/daerah/-">
                  <Button variant="outline" className="bg-white/10 backdrop-blur-sm border-white/30 text-foreground hover:bg-white/20">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Glosarium Budaya
                  </Button>
                </Link>
                <Button variant="ghost" asChild>
                  <a href="#how-to" className="hover:underline text-muted-foreground">
                    How it works
                  </a>
                </Button>
              </motion.div>
            </div>
          </ParallaxBackground>
        </section>


        <section id="how-to" aria-label="How it works" className="container mx-auto px-4 py-6">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="rounded-xl border border-border bg-card/60 backdrop-blur-sm p-4 md:p-5"
          >
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-foreground text-xs font-semibold">
                  1
                </span>
                Hover and click any region on the map to highlight cultural highlights instantly.
              </li>
              <li className="flex items-start gap-3">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-foreground text-xs font-semibold">
                  2
                </span>
                Gunakan kolom pencarian untuk menemukan istilah-istilah regional dan definisinya.
              </li>
              <li className="flex items-start gap-3">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-foreground text-xs font-semibold">
                  3
                </span>
                Open a region to view a full profile with identity, history, and significance.
              </li>
            </ul>
          </motion.div>
        </section>

        <div id="map" className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* left filters column */}
            <div className="lg:col-span-1">
              <div className="bg-card/50 backdrop-blur-sm rounded-xl shadow-sm border border-border p-6 sticky top-24">
                <h3 className="font-semibold text-foreground mb-2">Pencarian</h3>
                <p className="text-xs text-muted-foreground mb-4">
                  Cari istilah regional dan klik hasil untuk menyorot pada peta.
                </p>

                {/* Search Results */}
                <AnimatePresence>
                  {showSearchResults && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-2"
                    >
                      <SearchResults results={searchResults} onResultClick={handleRegionClick} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* right map column with visual framing */}
            <div className="lg:col-span-3">
              <div className="bg-card/50 backdrop-blur-sm rounded-xl shadow-sm border border-border overflow-hidden ring-1 ring-primary/5">
                <div className="p-4 border-b border-border bg-gradient-to-r from-primary/10 to-accent/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-semibold text-foreground">Interactive Map of East Java</h2>
                      <p className="text-sm text-muted-foreground">Click a region to view cultural details</p>
                    </div>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-sm">Use scroll to zoom, drag to navigate</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>

                <div className="relative h-[600px] bg-gradient-to-br from-background/50 to-muted/30">
                  <InteractiveEastJavaMap
                    regions={eastJavaRegions}
                    selectedRegion={selectedRegion}
                    onRegionClick={handleRegionClick}
                    zoom={mapZoom}
                    center={mapCenter}
                    searchQuery={searchQuery}
                    backgroundSrc="/maps/jawa-perprovinsi-subculture.svg"
                  />

                  <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-border">
                    <h4 className="font-semibold text-sm mb-2 text-foreground">Legend</h4>
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-primary"></div>
                        <span className="text-muted-foreground">Sub-culture region</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3 h-3 text-destructive" />
                        <span className="text-muted-foreground">Selected region</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* region preview panel with glossary */}
              <AnimatePresence>
                {selectedRegion && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="mt-6 bg-card/50 backdrop-blur-sm rounded-xl shadow-sm border border-border p-6"
                  >
                    {(() => {
                      const region = eastJavaRegions.find((r) => r.id === selectedRegion)
                      if (!region) return null

                      const terms = LEXICON[selectedRegion] || []

                      return (
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold text-foreground">{region.name} — Glosarium Lokal</h3>
                            <Link href={`/budaya/daerah/${region.id}`}>
                              <Button className="bg-primary hover:bg-primary/90">Buka Halaman Subkultur</Button>
                            </Link>
                          </div>

                          {/* Terms and definitions */}
                          <div className="space-y-3">
                            {terms.slice(0, 6).map((entry, idx) => (
                              <div key={idx} className="rounded-lg border border-border bg-card/60 p-3">
                                <div className="font-semibold text-foreground">{entry.term}</div>
                                <div className="text-sm text-muted-foreground">{entry.definition}</div>
                              </div>
                            ))}
                            {terms.length === 0 && (
                              <p className="text-sm text-muted-foreground">
                                Belum ada entri glosarium untuk subkultur ini.
                              </p>
                            )}
                            {terms.length > 6 && (
                              <div className="text-center pt-2">
                                <Link href={`/budaya/daerah/${region.id}`}>
                                  <Button variant="outline" size="sm">
                                    Lihat Semua ({terms.length} istilah)
                                  </Button>
                                </Link>
                              </div>
                            )}
                          </div>
                        </div>
                      )
                    })()}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <section aria-hidden="true" className="container mx-auto px-4 pb-10">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />
        </section>
      </div>
    </TooltipProvider>
  )
}