"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { LEXICON, type LexiconEntry } from "@/data/lexicon"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Helper to create URL-safe slugs from terms.
function slugify(input: string) {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove combining diacritics
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
}

// Build a flattened list of all lexicon entries with region info
type EntryWithRegion = LexiconEntry & { regionKey: string }

export default function AllCulturalWordsPage() {
  const [region, setRegion] = useState<string>("all")
  const regions = useMemo(() => Object.keys(LEXICON), [])

  const allEntries: EntryWithRegion[] = useMemo(() => {
    const list: EntryWithRegion[] = []
    for (const [regionKey, entries] of Object.entries(LEXICON)) {
      for (const e of entries) {
        list.push({ ...e, regionKey })
      }
    }
    // Optional: stable sort by term
    list.sort((a, b) => a.term.localeCompare(b.term))
    return list
  }, [])

  const filteredEntries: EntryWithRegion[] = useMemo(() => {
    if (region === "all") return allEntries
    return allEntries.filter((e) => e.regionKey === region)
  }, [allEntries, region])

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <header className="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-foreground text-balance">Glosarium Budaya</h1>
          <p className="text-sm text-muted-foreground">
            Daftar kata-kata budaya dari berbagai subkultur daerah. Pilih subkultur untuk memfilter.
          </p>
          <div className="mt-4 flex items-center gap-2">
            <label htmlFor="region-filter" className="text-sm text-muted-foreground">
              Subkultur
            </label>
            <select
              id="region-filter"
              className="px-3 py-2 rounded-md border border-border bg-background text-sm text-foreground"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              aria-label="Filter subkultur"
            >
              <option value="all">Semua</option>
              {regions.map((rk) => (
                <option key={rk} value={rk}>
                  {rk}
                </option>
              ))}
            </select>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <section aria-label="Daftar kata budaya" className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredEntries.map((entry, idx) => {
            const termSlug = slugify(entry.term)
            return (
              <Card key={`${entry.term}-${idx}`} className="bg-card/60 border-border overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="text-foreground">{entry.term}</CardTitle>
                  <p className="text-sm text-muted-foreground line-clamp-2">{entry.definition}</p>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-xs text-muted-foreground mb-2">Subkultur: {entry.regionKey}</div>
                  <div className="mt-2 flex items-center gap-2">
                    <Link href={`/budaya/daerah/-/${termSlug}`} aria-label={`Lihat rincian ${entry.term}`}>
                      <Button className="bg-primary hover:bg-primary/90">Rincian</Button>
                    </Link>
                    <Link
                      href={`/budaya/daerah/${entry.regionKey}`}
                      className="text-sm text-muted-foreground hover:underline"
                      aria-label={`Buka glosarium subkultur ${entry.regionKey}`}
                    >
                      Glosarium {entry.regionKey}
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </section>
      </main>
    </div>
  )
}
