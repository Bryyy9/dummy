"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, MapPin, ArrowLeft, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { InteractiveEastJavaMap } from "@/components/cultural/interactive-east-java-map"
import { SearchResults } from "@/components/cultural/search-results"
import { MapControls } from "@/components/cultural/map-controls"

// Data subkultur Jawa Timur
const eastJavaRegions = [
  {
    id: "surabaya",
    name: "Surabaya",
    coordinates: { x: 65, y: 45 },
    color: "#003b5c",
    culturalElements: ["Tari Remo", "Rujak Cingur", "Batik Surabaya", "Lagu Dolanan"],
    description: "Kota metropolitan dengan budaya urban yang khas",
  },
  {
    id: "malang",
    name: "Malang",
    coordinates: { x: 55, y: 55 },
    color: "#00a3e0",
    culturalElements: ["Batik Malangan", "Topeng Malangan", "Rawon Malang", "Kerajinan Gerabah"],
    description: "Kota pendidikan dengan warisan budaya yang kaya",
  },
  {
    id: "kediri",
    name: "Kediri",
    coordinates: { x: 45, y: 50 },
    color: "#0077be",
    culturalElements: ["Tari Jaranan", "Gethuk Pisang", "Batik Kediri", "Wayang Thengul"],
    description: "Pusat kebudayaan dengan tradisi wayang yang kuat",
  },
  {
    id: "jember",
    name: "Jember",
    coordinates: { x: 75, y: 65 },
    color: "#005a8b",
    culturalElements: ["Tari Gandrung", "Suwar-Suwir", "Batik Jember", "Festival Budaya"],
    description: "Kota tembakau dengan seni pertunjukan tradisional",
  },
  {
    id: "probolinggo",
    name: "Probolinggo",
    coordinates: { x: 70, y: 40 },
    color: "#004d73",
    culturalElements: ["Tari Glipang", "Mangga Probolinggo", "Kerajinan Anyaman", "Besanan"],
    description: "Kota mangga dengan tradisi pertanian yang unik",
  },
  {
    id: "banyuwangi",
    name: "Banyuwangi",
    coordinates: { x: 85, y: 70 },
    color: "#003d5c",
    culturalElements: ["Tari Seblang", "Rujak Soto", "Batik Using", "Gandrung Sewu"],
    description: "Ujung timur Jawa dengan budaya yang beragam",
  },
  {
    id: "ponorogo",
    name: "Ponorogo",
    coordinates: { x: 35, y: 60 },
    color: "#0066a3",
    culturalElements: ["Reog Ponorogo", "Dawet Jabung", "Kerajinan Bambu", "Tari Bujangganong"],
    description: "Kota Reog dengan seni pertunjukan yang megah",
  },
  {
    id: "madiun",
    name: "Madiun",
    coordinates: { x: 30, y: 45 },
    color: "#004d80",
    culturalElements: ["Tari Beskalan", "Pecel Madiun", "Batik Madiun", "Gamelan Jawa"],
    description: "Kota pecel dengan tradisi kuliner yang khas",
  },
]

const culturalCategories = [
  { id: "tari", name: "Tari", icon: "💃", count: 12 },
  { id: "makanan", name: "Makanan", icon: "🍜", count: 15 },
  { id: "batik", name: "Batik", icon: "🎨", count: 8 },
  { id: "musik", name: "Musik", icon: "🎵", count: 6 },
  { id: "kerajinan", name: "Kerajinan", icon: "🏺", count: 10 },
  { id: "wayang", name: "Wayang", icon: "🎭", count: 4 },
]

export default function PetaBudayaPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [mapZoom, setMapZoom] = useState(1)
  const [mapCenter, setMapCenter] = useState({ x: 50, y: 50 })
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [searchResults, setSearchResults] = useState<any[]>([])

  // Handle search functionality
  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.trim()) {
      // Simulate search results and auto-zoom
      const results = eastJavaRegions.filter(
        (region) =>
          region.name.toLowerCase().includes(query.toLowerCase()) ||
          region.culturalElements.some((element) => element.toLowerCase().includes(query.toLowerCase())),
      )

      setSearchResults(results)
      setShowSearchResults(true)

      // Auto-zoom to first result
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
      setSelectedRegion(regionId)
      setMapCenter(region.coordinates)
      setMapZoom(2.5)
    }
  }

  // Handle category filter
  const handleCategoryFilter = (categoryId: string) => {
    setSelectedCategory(categoryId === selectedCategory ? null : categoryId)
    // Filter regions based on category
    // Implementation would filter based on cultural elements
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Kembali
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-[#003b5c]">Peta Budaya Jawa Timur</h1>
                <p className="text-sm text-muted-foreground">Jelajahi kekayaan budaya setiap daerah</p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex items-center gap-4 max-w-md w-full">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Cari daerah atau budaya..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10"
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

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Categories */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border p-6 sticky top-24">
              <h3 className="font-semibold text-[#003b5c] mb-4 flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Kategori Budaya
              </h3>
              <div className="space-y-2">
                {culturalCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryFilter(category.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                      selectedCategory === category.id ? "bg-[#003b5c] text-white" : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{category.icon}</span>
                      <span className="font-medium">{category.name}</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {category.count}
                    </Badge>
                  </button>
                ))}
              </div>

              {/* Search Results */}
              <AnimatePresence>
                {showSearchResults && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-6 pt-6 border-t"
                  >
                    <SearchResults results={searchResults} onResultClick={handleRegionClick} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Main Map Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
              <div className="p-4 border-b bg-gradient-to-r from-[#003b5c] to-[#00a3e0] text-white">
                <h2 className="text-lg font-semibold">Peta Interaktif Jawa Timur</h2>
                <p className="text-sm opacity-90">Klik pada daerah untuk melihat detail budaya</p>
              </div>

              <div className="relative h-[600px] bg-gradient-to-br from-blue-100 to-cyan-100">
                <InteractiveEastJavaMap
                  regions={eastJavaRegions}
                  selectedRegion={selectedRegion}
                  onRegionClick={handleRegionClick}
                  zoom={mapZoom}
                  center={mapCenter}
                  searchQuery={searchQuery}
                />

                {/* Map Legend */}
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                  <h4 className="font-semibold text-sm mb-2">Legenda</h4>
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#003b5c]"></div>
                      <span>Kota Besar</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#00a3e0]"></div>
                      <span>Kabupaten</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3 h-3 text-red-500" />
                      <span>Area Terpilih</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Selected Region Info */}
            <AnimatePresence>
              {selectedRegion && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mt-6 bg-white rounded-xl shadow-sm border p-6"
                >
                  {(() => {
                    const region = eastJavaRegions.find((r) => r.id === selectedRegion)
                    if (!region) return null

                    return (
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-xl font-bold text-[#003b5c]">{region.name}</h3>
                          <Link href={`/budaya/daerah/${region.id}`}>
                            <Button className="bg-[#00a3e0] hover:bg-[#0077be]">Lihat Detail Daerah</Button>
                          </Link>
                        </div>
                        <p className="text-muted-foreground mb-4">{region.description}</p>

                        <div>
                          <h4 className="font-semibold mb-2">Elemen Budaya:</h4>
                          <div className="flex flex-wrap gap-2">
                            {region.culturalElements.map((element, index) => (
                              <Badge key={index} variant="outline" className="border-[#00a3e0] text-[#003b5c]">
                                {element}
                              </Badge>
                            ))}
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
    </div>
  )
}
