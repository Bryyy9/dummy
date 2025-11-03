// app/budaya/daerah/-/page.tsx
"use client"

import { useState, useMemo, useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, MapPin, Search, ChevronLeft, ChevronRight, Home } from "lucide-react"
import { AnimatedReveal } from "@/components/common/animated-reveal"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"

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
  const searchParams = useSearchParams()

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const ITEMS_PER_PAGE = 12

  // Get referrer from URL params
  const referrer = searchParams.get('from')

  // Smart back navigation
  const handleBack = () => {
    if (referrer) {
      // Navigate to specific referrer
      router.push(referrer)
    } else if (window.history.length > 2) {
      // Use browser back if available
      router.back()
    } else {
      // Fallback to home
      router.push('/')
    }
  }

  // Get back button text based on referrer
  const getBackButtonText = () => {
    if (!referrer) return 'Kembali'
    
    if (referrer === '/') return 'Kembali ke Beranda'
    if (referrer === '/peta-budaya') return 'Kembali ke Peta Budaya'
    if (referrer.startsWith('/budaya/daerah/') && referrer !== '/budaya/daerah/-') {
      return 'Kembali ke Glosarium'
    }
    if (referrer === '/budaya') return 'Kembali ke Budaya'
    
    return 'Kembali'
  }

  useEffect(() => {
    const fetchLexicons = async () => {
      try {
        const response = await fetch('https://be-corpora.vercel.app/api/v1/public/lexicons')
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
    return uniqueRegions.sort()
  }, [lexicons])

  // Filter berdasarkan region & search query
  const filteredEntries = useMemo(() => {
    return lexicons.filter((entry) => {
      const matchRegion = region === "all" || entry.regionKey === region
      const matchSearch = 
        entry.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.definition.toLowerCase().includes(searchQuery.toLowerCase())
      return matchRegion && matchSearch
    })
  }, [lexicons, region, searchQuery])

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [region, searchQuery])

  // Calculate pagination
  const totalPages = Math.ceil(filteredEntries.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const paginatedEntries = filteredEntries.slice(startIndex, endIndex)

  // Pagination handlers
  const goToPage = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1)
    }
  }

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1)
    }
  }

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const maxPagesToShow = 5
    
    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i)
        }
        pages.push('...')
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1)
        pages.push('...')
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        pages.push(1)
        pages.push('...')
        pages.push(currentPage - 1)
        pages.push(currentPage)
        pages.push(currentPage + 1)
        pages.push('...')
        pages.push(totalPages)
      }
    }
    
    return pages
  }

  return (
    <div className="min-h-screen bg-[#111827] text-foreground">
      {/* Header */}
      <header className="text-center py-16 px-4 sm:px-6 lg:px-8">
        {/* Navigation Buttons */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <div className="flex items-center justify-between">
            {/* Back Button */}
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>{getBackButtonText()}</span>
            </button>

            {/* Home Button (fallback) */}
            {!referrer && (
              <Link href="/">
                <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                  <Home className="w-4 h-4" />
                  <span className="hidden sm:inline">Beranda</span>
                </button>
              </Link>
            )}
          </div>
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
              className="px-4 py-2 rounded-md border border-border bg-background text-sm text-foreground shadow-sm cursor-pointer"
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

        {/* Results info */}
        {(searchQuery || region !== "all") && (
          <div className="mt-4 text-sm text-muted-foreground">
            Menampilkan {filteredEntries.length} hasil
            {searchQuery && ` untuk "${searchQuery}"`}
            {region !== "all" && ` di ${region}`}
          </div>
        )}
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
              <Button onClick={() => window.location.reload()} variant="outline" className="cursor-pointer">
                Coba Lagi
              </Button>
            </div>
          </div>
        ) : (
          <>
            {/* Cards Grid */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {paginatedEntries.length > 0 ? (
                paginatedEntries.map((entry, idx) => {
                  const termSlug = slugify(entry.term)
                  return (
                    <motion.div
                      key={`${entry.term}-${idx}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                    >
                      <Card className="bg-card/40 border border-border backdrop-blur-sm rounded-2xl p-4 transition-all hover:shadow-lg hover:border-primary/40 h-full flex flex-col">
                        <CardHeader className="pb-2 flex items-center justify-between">
                          <CardTitle className="text-xl font-semibold text-foreground">
                            {entry.term}
                          </CardTitle>
                          <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <span className="text-lg">🧺</span>
                          </div>
                        </CardHeader>

                        <CardContent className="flex-1 flex flex-col">
                          <p className="text-sm text-muted-foreground mb-3 line-clamp-3 flex-1">
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

                          <div className="flex justify-between items-center mt-auto">
                            <Link href={`/budaya/daerah/-/${termSlug}`} className="flex-1 mr-2">
                              <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:opacity-90 text-white w-full cursor-pointer">
                                Lihat Detail
                              </Button>
                            </Link>
                            <Link href={`/budaya/daerah/${entry.regionKey}`}>
                              <Button
                                variant="outline"
                                className="border border-border hover:bg-background/60 cursor-pointer"
                              >
                                Glosarium
                              </Button>
                            </Link>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )
                })
              ) : (
                <div className="col-span-full text-center py-16">
                  <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground mb-2">Tidak ada hasil ditemukan</p>
                  <p className="text-sm text-muted-foreground">
                    Coba kata kunci atau filter yang berbeda
                  </p>
                </div>
              )}
            </section>

            {/* Pagination */}
            {filteredEntries.length > 0 && totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-card/40 backdrop-blur-sm rounded-xl border border-border">
                <div className="text-sm text-muted-foreground">
                  Menampilkan {startIndex + 1}-{Math.min(endIndex, filteredEntries.length)} dari {filteredEntries.length} entri
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                    variant="outline"
                    size="sm"
                    className={`cursor-pointer ${
                      currentPage === 1
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:bg-primary/10'
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span className="hidden sm:inline ml-1">Sebelumnya</span>
                  </Button>

                  <div className="flex items-center gap-1">
                    {getPageNumbers().map((pageNum, idx) => {
                      if (pageNum === '...') {
                        return (
                          <span
                            key={`ellipsis-${idx}`}
                            className="px-3 py-2 text-muted-foreground"
                          >
                            ...
                          </span>
                        )
                      }

                      const page = pageNum as number
                      return (
                        <Button
                          key={page}
                          onClick={() => goToPage(page)}
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          className={`min-w-[40px] cursor-pointer ${
                            currentPage === page
                              ? 'bg-primary text-primary-foreground'
                              : 'hover:bg-primary/10'
                          }`}
                        >
                          {page}
                        </Button>
                      )
                    })}
                  </div>

                  <Button
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                    variant="outline"
                    size="sm"
                    className={`cursor-pointer ${
                      currentPage === totalPages
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:bg-primary/10'
                    }`}
                  >
                    <span className="hidden sm:inline mr-1">Selanjutnya</span>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>

                <div className="sm:hidden text-sm text-muted-foreground">
                  Halaman {currentPage} dari {totalPages}
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}