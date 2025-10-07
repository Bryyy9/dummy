"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, MapPin, ArrowLeft, Filter, Info, Star, Users, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Link from "next/link"
import { InteractiveEastJavaMap } from "@/components/cultural/interactive-east-java-map"
import { SearchResults } from "@/components/cultural/search-results"
import { MapControls } from "@/components/cultural/map-controls"
import { useRouter } from "next/navigation" // import useRouter for redirect on region click
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

const eastJavaRegions = [
  {
    id: "surabaya",
    name: "Surabaya",
    coordinates: { x: 65, y: 45 },
    color: "#6366f1",
    culturalElements: ["Remo Dance", "Rujak Cingur", "Surabaya Batik", "Children’s Folk Songs"],
    description: "A metropolitan city with unique urban culture and rich historical heritage",
    population: "2.9 million",
    established: "1293",
    highlights: ["City of Heroes", "Economic Hub", "Heritage Buildings"],
    rating: 4.8,
    visitors: "1.2M/year",
  },
  {
    id: "malang",
    name: "Malang",
    coordinates: { x: 55, y: 55 },
    color: "#8b5cf6",
    culturalElements: ["Malangan Batik", "Malangan Mask Dance", "Rawon Malang", "Pottery Crafts"],
    description: "An education city with rich cultural heritage and cool mountain climate",
    population: "895 thousand",
    established: "760",
    highlights: ["Education City", "Cultural Tourism", "Signature Cuisine"],
    rating: 4.7,
    visitors: "800K/year",
  },
  {
    id: "kediri",
    name: "Kediri",
    coordinates: { x: 45, y: 50 },
    color: "#a855f7",
    culturalElements: ["Jaranan Dance", "Gethuk Pisang", "Kediri Batik", "Thengul Puppets"],
    description: "A cultural center with strong puppet traditions and tobacco industry",
    population: "268 thousand",
    established: "1042",
    highlights: ["Puppet Center", "Tobacco Industry", "Historic Sites"],
    rating: 4.5,
    visitors: "450K/year",
  },
  {
    id: "jember",
    name: "Jember",
    coordinates: { x: 75, y: 65 },
    color: "#c084fc",
    culturalElements: ["Gandrung Dance", "Suwar-Suwir", "Jember Batik", "Cultural Festivals"],
    description: "A tobacco city with vibrant traditional performances and cultural festivals",
    population: "332 thousand",
    established: "1929",
    highlights: ["Gandrung Dance", "JFC Festival", "Tobacco Plantations"],
    rating: 4.6,
    visitors: "600K/year",
  },
  {
    id: "probolinggo",
    name: "Probolinggo",
    coordinates: { x: 70, y: 40 },
    color: "#ddd6fe",
    culturalElements: ["Glipang Dance", "Probolinggo Mango", "Weaving Crafts", "Besanan Tradition"],
    description: "A mango city with unique agricultural traditions and gateway to Bromo",
    population: "217 thousand",
    established: "1918",
    highlights: ["Mango City", "Bromo Gateway", "Agricultural Traditions"],
    rating: 4.4,
    visitors: "350K/year",
  },
  {
    id: "banyuwangi",
    name: "Banyuwangi",
    coordinates: { x: 85, y: 70 },
    color: "#7c3aed",
    culturalElements: ["Seblang Dance", "Rujak Soto", "Using Batik", "Gandrung Sewu"],
    description: "The eastern tip of Java with diverse culture and stunning natural destinations",
    population: "1.6 million",
    established: "1771",
    highlights: ["Using Culture", "Nature Tourism", "Gandrung Festival"],
    rating: 4.9,
    visitors: "2.1M/year",
  },
  {
    id: "ponorogo",
    name: "Ponorogo",
    coordinates: { x: 35, y: 60 },
    color: "#5b21b6",
    culturalElements: ["Reog Ponorogo", "Dawet Jabung", "Bamboo Crafts", "Bujangganong Dance"],
    description: "City of Reog with grand performances and authentic cultural traditions",
    population: "855 thousand",
    established: "1496",
    highlights: ["Reog Ponorogo", "Traditional Arts", "Bamboo Crafts"],
    rating: 4.8,
    visitors: "700K/year",
  },
  {
    id: "madiun",
    name: "Madiun",
    coordinates: { x: 30, y: 45 },
    color: "#4c1d95",
    culturalElements: ["Beskalan Dance", "Madiun Pecel", "Madiun Batik", "Javanese Gamelan"],
    description: "City of pecel with distinctive culinary traditions and historic railway hub",
    population: "170 thousand",
    established: "1918",
    highlights: ["Madiun Pecel", "Historic Station", "Traditional Gamelan"],
    rating: 4.3,
    visitors: "280K/year",
  },
]

const culturalCategories = [
  { id: "tari", name: "Traditional Dance", icon: "💃", count: 12, description: "Signature dances of East Java" },
  { id: "makanan", name: "Cuisine", icon: "🍜", count: 15, description: "Traditional food and beverages" },
  { id: "batik", name: "Batik & Textiles", icon: "🎨", count: 8, description: "Batik and textile crafts" },
  { id: "musik", name: "Music & Songs", icon: "🎵", count: 6, description: "Traditional music and folk songs" },
  { id: "kerajinan", name: "Handicrafts", icon: "🏺", count: 10, description: "Handmade crafts and visual arts" },
  { id: "wayang", name: "Puppetry & Theater", icon: "🎭", count: 4, description: "Wayang and theater performances" },
]

export default function PetaBudayaPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [mapZoom, setMapZoom] = useState(1)
  const [mapCenter, setMapCenter] = useState({ x: 50, y: 50 })
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [searchResults, setSearchResults] = useState<any[]>([])
  const router = useRouter() // add router instance

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
      // Keep UI feedback if needed, but redirect immediately for seamless flow
      router.push(`/budaya/daerah/${region.id}`)
      return
    }
  }

  // Handle category filter
  const handleCategoryFilter = (categoryId: string) => {
    setSelectedCategory(categoryId === selectedCategory ? null : categoryId)
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

        <section aria-labelledby="hero-title" className="relative">
          <ParallaxBackground className="relative h-[320px] md:h-[420px] overflow-hidden">
            <Image
              src="/images/peta-hero.jpg"
              alt="Collage of cultural landscapes, textiles, and performers"
              fill
              priority
              className="object-cover"
            />
            {/* Overlay for contrast and mood */}
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
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                className="mt-4 flex items-center gap-3"
              >
                <Link href="#map">
                  <Button className="bg-primary hover:bg-primary/90">Start Exploring</Button>
                </Link>
                <Button variant="ghost" asChild>
                  <a href="#how-to" className="hover:underline">
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
                Use categories and search to find traditions, artifacts, or events relevant to your interests.
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
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Filter className="w-4 h-4 text-primary" />
                  Cultural Categories
                </h3>
                <div className="space-y-2">
                  {culturalCategories.map((category) => (
                    <Tooltip key={category.id}>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() => handleCategoryFilter(category.id)}
                          className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 hover:scale-[1.02] ${
                            selectedCategory === category.id
                              ? "bg-primary text-primary-foreground shadow-lg"
                              : "hover:bg-accent/10 text-foreground"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-lg">{category.icon}</span>
                            <span className="font-medium text-sm">{category.name}</span>
                          </div>
                          <Badge
                            variant={selectedCategory === category.id ? "secondary" : "outline"}
                            className="text-xs"
                          >
                            {category.count}
                          </Badge>
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        <p className="text-sm">{category.description}</p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>

                <AnimatePresence>
                  {showSearchResults && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-6 pt-6 border-t border-border"
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
                  />

                  <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-border">
                    <h4 className="font-semibold text-sm mb-2 text-foreground">Legend</h4>
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-primary"></div>
                        <span className="text-muted-foreground">Major City</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-accent"></div>
                        <span className="text-muted-foreground">Regency</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3 h-3 text-destructive" />
                        <span className="text-muted-foreground">Selected Area</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* region preview panel animations remain below */}
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

                      return (
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                                {region.name}
                                <div className="flex items-center gap-1">
                                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                  <span className="text-sm text-muted-foreground">{region.rating}</span>
                                </div>
                              </h3>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                                <div className="flex items-center gap-1">
                                  <Users className="w-4 h-4" />
                                  <span>{region.population}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  <span>Est. {region.established}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <MapPin className="w-4 h-4" />
                                  <span>{region.visitors}</span>
                                </div>
                              </div>
                            </div>
                            <Link href={`/budaya/daerah/${region.id}`}>
                              <Button className="bg-primary hover:bg-primary/90">View Region Details</Button>
                            </Link>
                          </div>

                          <p className="text-muted-foreground mb-4">{region.description}</p>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                              <h4 className="font-semibold mb-2 text-foreground">Cultural Elements:</h4>
                              <div className="flex flex-wrap gap-2">
                                {region.culturalElements.map((element, index) => (
                                  <Badge key={index} variant="outline" className="border-primary/30 text-foreground">
                                    {element}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-2 text-foreground">Highlights:</h4>
                              <div className="flex flex-wrap gap-2">
                                {region.highlights.map((highlight, index) => (
                                  <Badge key={index} variant="secondary" className="bg-accent/20 text-foreground">
                                    {highlight}
                                  </Badge>
                                ))}
                              </div>
                            </div>
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
