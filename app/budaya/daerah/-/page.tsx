"use client"

import { useState, useMemo, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, MapPin, Search } from "lucide-react"
import { AnimatedReveal } from "@/components/common/animated-reveal"
import { Input } from "@/components/ui/input"

interface LexiconEntry {
  term: string
  definition: string
  regionKey: string
  subculture: {
    name: string
    province: string
  }
  domain: string
  contributor: string
  details: {
    ipa: string
    transliteration: string
    etymology: string
    culturalMeaning: string
    commonMeaning: string
    translation: string
    variants: string
    translationVariants: string
    otherDescription: string
  }
}

function slugify(input: string) {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
}

export default function AllCulturalWordsPage() {
  const [region, setRegion] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [lexicons, setLexicons] = useState<LexiconEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchLexicons = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/v1/public/lexicons')
        if (!response.ok) {
          throw new Error('Failed to fetch lexicons')
        }
        const result = await response.json()
        if (result.success) {
          setLexicons(result.data)
        } else {
          throw new Error(result.message || 'Failed to fetch data')
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchLexicons()
  }, [])

  // Get unique regions from the lexicons data
  const regions = useMemo(() => {
    const uniqueRegions = [...new Set(lexicons.map(entry => entry.regionKey))]
    return uniqueRegions
  }, [lexicons])

  // filter berdasarkan region & search query
  const filteredEntries = useMemo(() => {
    return lexicons.filter((entry) => {
      const matchRegion = region === "all" || entry.regionKey === region
      const matchSearch = entry.term.toLowerCase().includes(searchQuery.toLowerCase())
      return matchRegion && matchSearch
    })
  }, [lexicons, region, searchQuery])

  return (
    <div className="min-h-screen bg-[#111827] text-foreground">
      {/* Header */}
      <header className="text-center py-16 px-4 sm:px-6 lg:px-8">
        {/* Tombol Back sejajar dengan card */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 text-left">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali
          </button>
        </div>

        {/* Badge */}
        <Badge
          variant="secondary"
          className="bg-blue-950/60 text-blue-300 border border-blue-900 px-4 py-1 rounded-full mb-4"
        >
          🧩 LEKSIKON BUDAYA
        </Badge>

        <h1 className="text-4xl font-extrabold text-foreground mb-2">
          Jelajahi Leksikon Budaya
        </h1>
        <p className="text-base text-muted-foreground max-w-2xl mx-auto">
          Temukan kekayaan istilah dan tradisi dari berbagai sub-budaya Jawa Timur.
          Setiap leksikon menyimpan cerita unik yang membentuk identitas lokal.
        </p>

        {/* Filter + Search */}
        <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
          {/* Filter dropdown */}
          <div className="flex items-center gap-2">
            <label
              htmlFor="region-filter"
              className="text-sm font-medium text-muted-foreground"
            >
              Filter Subkultur:
            </label>
            <select
              id="region-filter"
              className="px-4 py-2 rounded-md border border-border bg-background text-sm text-foreground shadow-sm"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
            >
              <option value="all">Semua Leksikon</option>
              {regions.map((rk) => (
                <option key={rk} value={rk}>
                  {rk}
                </option>
              ))}
            </select>
          </div>

          {/* Search Input */}
          <AnimatedReveal animation="fade-up" delay={150}>
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Cari istilah budaya..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background/50 border-border focus:ring-primary/20"
              />
            </div>
          </AnimatedReveal>
        </div>
      </header>

      {/* Konten Utama */}
      <main className="container mx-auto px-4 pb-16">
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Memuat leksikon budaya...</p>
            </div>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center py-16">
            <div className="text-center">
              <p className="text-red-500 mb-4">Error: {error}</p>
              <Button onClick={() => window.location.reload()} variant="outline">
                Coba Lagi
              </Button>
            </div>
          </div>
        ) : (
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredEntries.length > 0 ? (
              filteredEntries.map((entry, idx) => {
                const termSlug = slugify(entry.term)
                return (
                  <Card
                    key={`${entry.term}-${idx}`}
                    className="bg-card/40 border border-border backdrop-blur-sm rounded-2xl p-4 transition-all hover:shadow-lg hover:border-primary/40"
                  >
                    {/* Header dibikin align tengah biar title & icon sejajar */}
                    <CardHeader className="pb-2 flex items-center justify-between">
                      <CardTitle className="text-xl font-semibold text-foreground">
                        {entry.term}
                      </CardTitle>
                      <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <span className="text-lg">🧺</span>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
                        {entry.definition}
                      </p>

                      <div className="flex items-center text-xs text-muted-foreground mb-2">
                        <MapPin className="w-3 h-3 mr-1 text-primary" />
                        Subkultur: {entry.subculture.name} ({entry.subculture.province})
                      </div>

                      <div className="flex items-center text-xs text-muted-foreground mb-2">
                        <span className="font-medium">Domain:</span> {entry.domain}
                      </div>

                      <div className="flex items-center text-xs text-muted-foreground mb-4">
                        <span className="font-medium">Kontributor:</span> {entry.contributor}
                      </div>

                      {/* Tombol kanan kiri */}
                      <div className="flex justify-between items-center mt-4">
                        <Link href={`/budaya/daerah/-/${termSlug}`}>
                          <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:opacity-90 text-white px-6">
                            Lihat Detail
                          </Button>
                        </Link>
                        <Link href={`/budaya/daerah/${entry.regionKey}`}>
                          <Button
                            variant="outline"
                            className="border border-border hover:bg-background/60"
                          >
                            Glosarium
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                )
              })
            ) : (
              <p className="text-center text-muted-foreground col-span-full">
                Tidak ada hasil ditemukan.
              </p>
            )}
          </section>
        )}
      </main>
    </div>
  )
}
