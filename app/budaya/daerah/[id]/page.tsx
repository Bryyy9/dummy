"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Search, MapPin, Star, Clock, Bookmark, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useParams } from "next/navigation"

// Data budaya per daerah
const regionCulturalData = {
  surabaya: {
    name: "Surabaya",
    description: "Kota metropolitan dengan budaya urban yang khas",
    color: "#003b5c",
    culturalItems: [
      {
        id: "tari-remo",
        title: "Tari Remo",
        category: "Tari",
        description: "Tarian tradisional yang menggambarkan kepahlawanan dan kegagahan",
        image: "/images/tari-remo.jpg",
        difficulty: "Sedang",
        duration: "45 menit",
        popularity: 4.8,
        tags: ["Tradisional", "Pahlawan", "Energik"],
        history: "Tari Remo berasal dari cerita kepahlawanan Jawa Timur...",
        elements: ["Gerakan dinamis", "Kostum khas", "Musik gamelan"],
      },
      {
        id: "rujak-cingur",
        title: "Rujak Cingur",
        category: "Makanan",
        description: "Makanan khas Surabaya dengan cingur sapi sebagai bahan utama",
        image: "/images/rujak-cingur.jpg",
        difficulty: "Mudah",
        duration: "30 menit",
        popularity: 4.9,
        tags: ["Kuliner", "Pedas", "Khas"],
        history: "Rujak Cingur sudah ada sejak zaman kolonial...",
        elements: ["Cingur sapi", "Bumbu petis", "Sayuran segar"],
      },
    ],
  },
  malang: {
    name: "Malang",
    description: "Kota pendidikan dengan warisan budaya yang kaya",
    color: "#00a3e0",
    culturalItems: [
      {
        id: "batik-malangan",
        title: "Batik Malangan",
        category: "Batik",
        description: "Batik khas Malang dengan motif yang unik dan filosofi mendalam",
        image: "/images/batik-malangan.jpg",
        difficulty: "Sulit",
        duration: "2 jam",
        popularity: 4.7,
        tags: ["Seni", "Filosofi", "Warisan"],
        history: "Batik Malangan berkembang pada masa kerajaan...",
        elements: ["Motif khas", "Warna natural", "Teknik tradisional"],
      },
    ],
  },
}

export default function RegionDetailPage() {
  const params = useParams()
  const regionId = params.id as string
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [filteredItems, setFilteredItems] = useState<any[]>([])

  const regionData = regionCulturalData[regionId as keyof typeof regionCulturalData]

  useEffect(() => {
    if (!regionData) return

    let items = regionData.culturalItems

    // Filter by search query
    if (searchQuery) {
      items = items.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }

    // Filter by category
    if (selectedCategory) {
      items = items.filter((item) => item.category === selectedCategory)
    }

    setFilteredItems(items)
  }, [searchQuery, selectedCategory, regionData])

  if (!regionData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#003b5c] mb-4">Daerah Tidak Ditemukan</h1>
          <Link href="/peta-budaya">
            <Button>Kembali ke Peta</Button>
          </Link>
        </div>
      </div>
    )
  }

  const categories = [...new Set(regionData.culturalItems.map((item) => item.category))]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/peta-budaya">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Kembali ke Peta
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold" style={{ color: regionData.color }}>
                  Budaya {regionData.name}
                </h1>
                <p className="text-sm text-muted-foreground">{regionData.description}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Bookmark className="w-4 h-4 mr-2" />
                Simpan Daerah
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Bagikan
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Cari elemen budaya di daerah ini..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                variant={selectedCategory === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(null)}
              >
                Semua
              </Button>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {searchQuery && (
            <div className="mt-4 text-sm text-muted-foreground">
              Ditemukan {filteredItems.length} hasil untuk "{searchQuery}"
            </div>
          )}
        </div>

        {/* Cultural Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 relative">
                  <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                    <MapPin className="w-8 h-8" />
                  </div>
                  <div className="absolute top-3 left-3">
                    <Badge style={{ backgroundColor: regionData.color }} className="text-white">
                      {item.category}
                    </Badge>
                  </div>
                  <div className="absolute top-3 right-3">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 bg-white/80">
                      <Bookmark className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-[#003b5c] mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{item.description}</p>

                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {item.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      {item.popularity}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {item.tags.slice(0, 3).map((tag: string, idx: number) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <Link href={`/budaya/${item.id}`}>
                    <Button className="w-full" style={{ backgroundColor: regionData.color }}>
                      Pelajari Lebih Lanjut
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <MapPin className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-lg font-semibold text-[#003b5c] mb-2">Tidak Ada Hasil Ditemukan</h3>
            <p className="text-muted-foreground mb-4">Coba ubah kata kunci pencarian atau filter kategori</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("")
                setSelectedCategory(null)
              }}
            >
              Reset Pencarian
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
