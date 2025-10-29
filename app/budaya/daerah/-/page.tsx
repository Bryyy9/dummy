"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { LEXICON, type LexiconEntry } from "@/data/lexicon"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, MapPin, Search } from "lucide-react"
import { AnimatedReveal } from "@/components/common/animated-reveal"
import { Input } from "@/components/ui/input"

function slugify(input: string) {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
}

type EntryWithRegion = LexiconEntry & { regionKey: string }

export default function AllCulturalWordsPage() {
  const [region, setRegion] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const router = useRouter()
  const regions = useMemo(() => Object.keys(LEXICON), [])

  // gabungkan semua data leksikon
  const allEntries: EntryWithRegion[] = useMemo(() => {
    const list: EntryWithRegion[] = []
    for (const [regionKey, entries] of Object.entries(LEXICON)) {
      for (const e of entries) {
        list.push({ ...e, regionKey })
      }
    }
    return list.sort((a, b) => a.term.localeCompare(b.term))
  }, [])

  // filter berdasarkan region & search query
  const filteredEntries = useMemo(() => {
    return allEntries.filter((e) => {
      const matchRegion = region === "all" || e.regionKey === region
      const matchSearch = e.term.toLowerCase().includes(searchQuery.toLowerCase())
      return matchRegion && matchSearch
    })
  }, [allEntries, region, searchQuery])

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
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredEntries.length > 0 ? (
            filteredEntries.map((entry, idx) => {
              const termSlug = slugify(entry.term)
              return (
                // <Card
                //   key={`${entry.term}-${idx}`}
                //   className="bg-card/40 border border-border backdrop-blur-sm rounded-2xl p-4 transition-all hover:shadow-lg hover:border-primary/40"
                // >
                //   <CardHeader className="pb-2 flex items-start justify-between">
                //     <CardTitle className="text-xl font-semibold text-foreground">
                //       {entry.term}
                //     </CardTitle>
                //     <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-primary/10 text-primary">
                //       <span className="text-lg">🧺</span>
                //     </div>
                //   </CardHeader>

                //   <CardContent>
                //     <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
                //       {entry.definition}
                //     </p>

                //     <div className="flex items-center text-xs text-muted-foreground mb-4">
                //       <MapPin className="w-3 h-3 mr-1 text-primary" />
                //       Subkultur: {entry.regionKey}
                //     </div>

                //     <div className="flex gap-3">
                //       <Link href={`/budaya/daerah/-/${termSlug}`}>
                //         <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:opacity-90 text-white px-6">
                //           Lihat Detail
                //         </Button>
                //       </Link>
                //       <Link href={`/budaya/daerah/${entry.regionKey}`}>
                //         <Button
                //           variant="outline"
                //           className="border border-border hover:bg-background/60"
                //         >
                //           Glosarium
                //         </Button>
                //       </Link>
                //     </div>
                //   </CardContent>
                // </Card>
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

                    <div className="flex items-center text-xs text-muted-foreground mb-4">
                      <MapPin className="w-3 h-3 mr-1 text-primary" />
                      Subkultur: {entry.regionKey}
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
      </main>
    </div>
  )
}
