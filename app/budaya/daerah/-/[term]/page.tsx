import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { LEXICON, type LexiconEntry } from "@/data/lexicon"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

// Same slugify as listing for consistent matching
function slugify(input: string) {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove combining diacritics
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
}

type EntryWithRegion = LexiconEntry & { regionKey: string }

function findEntryBySlug(slug: string): EntryWithRegion | null {
  for (const [regionKey, entries] of Object.entries(LEXICON)) {
    for (const e of entries) {
      if (slugify(e.term) === slug) return { ...e, regionKey }
    }
  }
  return null
}

export function generateMetadata({ params }: { params: { term: string } }): Metadata {
  const entry = findEntryBySlug(params.term)
  const title = entry ? `${entry.term} — Rincian Istilah Budaya` : "Istilah tidak ditemukan"
  const description =
    entry?.definition ||
    "Rincian istilah budaya termasuk pengertian, etimologi, makna kultural, varian, dan informasi terkait lainnya."
  return {
    title,
    description,
  }
}

export default function CulturalWordDetailPage({ params }: { params: { term: string } }) {
  const entry = findEntryBySlug(params.term)
  if (!entry) {
    notFound()
  }

  const heroAlt = `Ilustrasi untuk istilah ${entry!.term}`
  // Use placeholder image per guidelines; hard-code query string
  const heroSrc = `/placeholder.svg?height=360&width=640&query=${encodeURIComponent(
    `foto ilustrasi ${entry!.term} budaya`,
  )}`

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <header className="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground text-balance">{entry!.term}</h1>
            <p className="text-sm text-muted-foreground">Subkultur: {entry!.regionKey}</p>
          </div>
          <div className="flex gap-2">
            <Link href="/budaya/daerah/-">
              <Button variant="outline">Kembali ke daftar</Button>
            </Link>
            <Link href={`/budaya/daerah/${entry!.regionKey}`}>
              <Button className="bg-primary hover:bg-primary/90">Lihat glosarium {entry!.regionKey}</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        <section aria-label="Gambar ilustrasi" className="rounded-xl overflow-hidden border border-border bg-card/60">
          <img
            src={heroSrc || "/placeholder.svg"}
            alt={heroAlt}
            className="w-full h-[280px] md:h-[360px] object-cover"
            crossOrigin="anonymous"
          />
        </section>

        {/* Profil-like layout: three key cards similar to profile breakdown */}
        <section aria-label="Ringkasan istilah" className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Card className="bg-card/60 border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Definisi</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">{entry!.definition}</p>
            </CardContent>
          </Card>

          <Card className="bg-card/60 border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Etimologi</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">{entry!.etimologi || "—"}</p>
            </CardContent>
          </Card>

          <Card className="bg-card/60 border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Makna Kultural</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">{entry!.culturalMeaning || "—"}</p>
            </CardContent>
          </Card>
        </section>

        <section aria-label="Informasi tambahan" className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-card/60 border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Varian</CardTitle>
            </CardHeader>
            <CardContent>
              {entry!.variants && entry!.variants.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {entry!.variants.map((v, i) => (
                    <span key={i} className="px-3 py-1 rounded-full text-xs border border-border bg-background/60">
                      {v}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">—</p>
              )}
            </CardContent>
          </Card>

          <Card className="bg-card/60 border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Makna Umum</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">{entry!.commonMeaning || "—"}</p>
            </CardContent>
          </Card>

          <Card className="bg-card/60 border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Catatan</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">{entry!.note || "—"}</p>
            </CardContent>
          </Card>

          <Card className="bg-card/60 border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Ketersediaan Informasi</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">{entry!.availability || "—"}</p>
            </CardContent>
          </Card>
        </section>

        <section aria-label="Aksi lanjutan" className="flex items-center gap-3">
          <Link href="/budaya/daerah/-">
            <Button variant="outline">Kembali ke daftar</Button>
          </Link>
          <Link href={`/budaya/daerah/${entry!.regionKey}`}>
            <Button className="bg-primary hover:bg-primary/90">Telusuri subkultur {entry!.regionKey}</Button>
          </Link>
        </section>
      </main>
    </div>
  )
}
