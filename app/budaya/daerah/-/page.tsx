// app/budaya/daerah/-/page.tsx
"use client"

import { use, useState, useEffect } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/layout/navigation"
import {
  ArrowLeft,
  Volume2,
  VolumeX,
  Loader2,
  Image as ImageIcon,
  Maximize2,
  AlertCircle,
  Play,
  Search,
  ChevronLeft,
  ChevronRight,
  Home,
} from "lucide-react"
import { Footer } from "@/components/layout/footer"
import { useNavigation } from "@/hooks/use-navigation"
import { motion, AnimatePresence } from "framer-motion"
import { YouTubeSection } from "@/components/sections/youtube-section"
import { extractYouTubeId, getYouTubeThumbnail } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { useRouter, useSearchParams } from "next/navigation"

interface LexiconAsset {
  leksikonId: number
  assetId: number
  assetRole: string
  createdAt: string
  asset: {
    assetId: number
    namaFile: string
    tipe: string
    penjelasan: string
    url: string
    fileSize: string
    hashChecksum: string
    metadataJson: string
    status: string
    createdAt: string
    updatedAt: string
  }
}

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
  audioFile?: string
  leksikonAssets?: LexiconAsset[]
}

interface YouTubeVideo {
  videoId: string
  title: string
  description: string
  thumbnail: string
  duration?: string
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
  const { handleNavClick } = useNavigation()
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [region, setRegion] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [allLexicons, setAllLexicons] = useState<LexiconEntry[]>([])
  const [filteredLexicons, setFilteredLexicons] = useState<LexiconEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isSearching, setIsSearching] = useState(false)

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const ITEMS_PER_PAGE = 12

  const referrer = searchParams.get('from')

  const handleBack = () => {
    if (referrer) {
      router.push(referrer)
    } else if (window.history.length > 2) {
      router.back()
    } else {
      router.push('/')
    }
  }

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

  // Fetch all lexicons on initial load
  useEffect(() => {
    const fetchAllLexicons = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch('https://be-corpora.vercel.app/api/v1/public/lexicons', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const result = await response.json()
        
        if (result.success && Array.isArray(result.data)) {
          // Validate and filter data
          const validLexicons = result.data.filter((item: any) => 
            item && 
            typeof item.term === 'string' && 
            item.term.trim() !== ''
          )
          setAllLexicons(validLexicons)
          setFilteredLexicons(validLexicons)
        } else {
          throw new Error('Invalid data format')
        }
      } catch (err) {
        console.error('Fetch error:', err)
        setError(err instanceof Error ? err.message : 'Failed to load lexicons')
        setAllLexicons([])
        setFilteredLexicons([])
      } finally {
        setLoading(false)
      }
    }

    fetchAllLexicons()
  }, [])

  // Search and filter logic
  useEffect(() => {
    setIsSearching(true)
    
    // Debounce search
    const timeoutId = setTimeout(() => {
      let results = [...allLexicons]

      // Filter by region
      if (region !== "all") {
        results = results.filter((entry) => entry.regionKey === region)
      }

      // Filter by search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim()
        
        results = results.filter((entry) => {
          // Search in term
          const termMatch = entry.term.toLowerCase().includes(query)
          
          // Search in definition
          const definitionMatch = entry.definition.toLowerCase().includes(query)
          
          // Search in transliteration
          const transliterationMatch = entry.details?.transliteration?.toLowerCase().includes(query)
          
          // Search in IPA
          const ipaMatch = entry.details?.ipa?.toLowerCase().includes(query)
          
          // Search in domain
          const domainMatch = entry.domain?.toLowerCase().includes(query)
          
          // Search in subculture name
          const subcultureMatch = entry.subculture?.name?.toLowerCase().includes(query)
          
          // Search in common meaning
          const commonMeaningMatch = entry.details?.commonMeaning?.toLowerCase().includes(query)
          
          // Search in cultural meaning
          const culturalMeaningMatch = entry.details?.culturalMeaning?.toLowerCase().includes(query)

          return (
            termMatch ||
            definitionMatch ||
            transliterationMatch ||
            ipaMatch ||
            domainMatch ||
            subcultureMatch ||
            commonMeaningMatch ||
            culturalMeaningMatch
          )
        })
      }

      setFilteredLexicons(results)
      setIsSearching(false)
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [searchQuery, region, allLexicons])

  // Get unique regions
  const regions = Array.from(new Set(allLexicons.map(entry => entry.regionKey).filter(Boolean))).sort()

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [region, searchQuery])

  // Calculate pagination
  const totalPages = Math.ceil(filteredLexicons.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const paginatedEntries = filteredLexicons.slice(startIndex, endIndex)

  const goToPage = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const goToPreviousPage = () => {
    if (currentPage > 1) goToPage(currentPage - 1)
  }

  const goToNextPage = () => {
    if (currentPage < totalPages) goToPage(currentPage + 1)
  }

  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const maxPagesToShow = 5
    
    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i)
        pages.push('...')
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1)
        pages.push('...')
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i)
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
        {/* Navigation */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <div className="flex items-center justify-between">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>{getBackButtonText()}</span>
            </button>

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
        </p>

        {/* Filter + Search */}
        <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
          <div className="flex items-center gap-2">
            <label htmlFor="region-filter" className="text-sm font-medium text-muted-foreground">
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

          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Cari istilah budaya..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10 bg-background/50 border-border focus:ring-primary/20"
            />
            {isSearching && (
              <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 animate-spin text-primary" />
            )}
          </div>
        </div>

        {/* Results info */}
        {(searchQuery || region !== "all") && !loading && (
          <div className="mt-4 text-sm text-muted-foreground">
            {isSearching ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Mencari...
              </span>
            ) : (
              <>
                Menampilkan {filteredLexicons.length} hasil
                {searchQuery && ` untuk "${searchQuery}"`}
                {region !== "all" && ` di ${region}`}
              </>
            )}
          </div>
        )}
      </header>

      {/* Content */}
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
            <div className="text-center max-w-md">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <p className="text-red-500 mb-2 font-semibold">Terjadi Kesalahan</p>
              <p className="text-sm text-muted-foreground mb-4">{error}</p>
              <Button 
                onClick={() => window.location.reload()} 
                variant="outline" 
                className="cursor-pointer"
              >
                Coba Lagi
              </Button>
            </div>
          </div>
        ) : (
          <>
            {/* Cards Grid */}
            {paginatedEntries.length > 0 ? (
              <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr mb-8">
                {paginatedEntries.map((entry, index) => {
                  const term = entry.term || 'Unknown'
                  const definition = entry.definition || 'No definition available'
                  const subcultureName = entry.subculture?.name || 'Unknown'
                  const province = entry.subculture?.province || 'Unknown'
                  const domain = entry.domain || 'General'
                  const contributor = entry.contributor || 'Anonymous'
                  const regionKey = entry.regionKey || 'unknown'
                  const termSlug = slugify(term)
                  
                  return (
                    <motion.div
                      key={`${termSlug}-${index}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <Card className="bg-card/40 border border-border backdrop-blur-sm rounded-2xl p-4 transition-all hover:shadow-lg hover:border-primary/40 h-full flex flex-col">
                        <CardHeader className="pb-2 flex items-center justify-between">
                          <CardTitle className="text-xl font-semibold text-foreground">
                            {term}
                          </CardTitle>
                          <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <span className="text-lg">🧺</span>
                          </div>
                        </CardHeader>

                        <CardContent className="flex-1 flex flex-col">
                          <p className="text-sm text-muted-foreground mb-3 line-clamp-3 flex-1">
                            {definition}
                          </p>

                          <div className="flex items-center text-xs text-muted-foreground mb-2">
                            <span className="font-medium">Subkultur:</span> {subcultureName} ({province})
                          </div>

                          <div className="flex items-center text-xs text-muted-foreground mb-2">
                            <span className="font-medium">Domain:</span> {domain}
                          </div>

                          <div className="flex items-center text-xs text-muted-foreground mb-4">
                            <span className="font-medium">Kontributor:</span> {contributor}
                          </div>

                          <div className="flex justify-between items-center mt-auto">
                            <Link href={`/budaya/daerah/-/${termSlug}`} className="flex-1 mr-2">
                              <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:opacity-90 text-white w-full cursor-pointer">
                                Detail
                              </Button>
                            </Link>
                            <Link href={`/budaya/daerah/${regionKey}`}>
                              <Button
                                variant="outline"
                                className="border border-border hover:bg-background/60 cursor-pointer"
                              >
                                Subculture
                              </Button>
                            </Link>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )
                })}
              </section>
            ) : (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground mb-2">Tidak ada hasil ditemukan</p>
                <p className="text-sm text-muted-foreground">
                  {searchQuery 
                    ? `Tidak ada leksikon yang cocok dengan "${searchQuery}"` 
                    : 'Coba kata kunci atau filter yang berbeda'}
                </p>
                {(searchQuery || region !== "all") && (
                  <Button 
                    onClick={() => {
                      setSearchQuery("")
                      setRegion("all")
                    }}
                    variant="outline"
                    className="mt-4 cursor-pointer"
                  >
                    Reset Filter
                  </Button>
                )}
              </div>
            )}

            {/* Pagination */}
            {filteredLexicons.length > 0 && totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-card/40 backdrop-blur-sm rounded-xl border border-border">
                {/* Info */}
                <div className="text-sm text-muted-foreground order-2 sm:order-1">
                  Menampilkan <span className="font-medium text-foreground">{startIndex + 1}</span>-
                  <span className="font-medium text-foreground">{Math.min(endIndex, filteredLexicons.length)}</span> dari{' '}
                  <span className="font-medium text-foreground">{filteredLexicons.length}</span> leksikon
                </div>

                {/* Pagination Controls */}
                <div className="flex items-center gap-2 order-1 sm:order-2">
                  {/* Previous Button */}
                  <Button
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                    variant="outline"
                    size="sm"
                    className={`cursor-pointer transition-all ${
                      currentPage === 1
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:bg-primary/10'
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span className="hidden sm:inline ml-1">Sebelumnya</span>
                  </Button>

                  {/* Page Numbers */}
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
                          className={`min-w-[40px] cursor-pointer transition-all ${
                            currentPage === page
                              ? 'bg-primary text-primary-foreground font-semibold'
                              : 'hover:bg-primary/10'
                          }`}
                        >
                          {page}
                        </Button>
                      )
                    })}
                  </div>

                  {/* Next Button */}
                  <Button
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                    variant="outline"
                    size="sm"
                    className={`cursor-pointer transition-all ${
                      currentPage === totalPages
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:bg-primary/10'
                    }`}
                  >
                    <span className="hidden sm:inline mr-1">Selanjutnya</span>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>

                {/* Mobile: Page Info */}
                <div className="sm:hidden text-sm text-muted-foreground order-3">
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