import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LEXICON, type LexiconEntry } from "@/data/lexicon";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Same slugify as listing for consistent matching
function slugify(input: string) {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove combining diacritics
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

type EntryWithRegion = LexiconEntry & { regionKey: string };

function findEntryBySlug(slug: string): EntryWithRegion | null {
  for (const [regionKey, entries] of Object.entries(LEXICON)) {
    for (const e of entries) {
      if (slugify(e.term) === slug) return { ...e, regionKey };
    }
  }
  return null;
}

// Fungsi untuk generate kode unik berdasarkan regionKey dan term
function generateTermCode(regionKey: string, term: string): string {
  const regionCode = regionKey.substring(0, 3).toUpperCase();
  const termCode = term.substring(0, 3).toUpperCase();
  const hash = Math.abs(
    term.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  ) % 1000;
  return `${regionCode}-${termCode}-${hash.toString().padStart(3, '0')}`;
}

export function generateMetadata({
  params,
}: {
  params: { term: string };
}): Metadata {
  const entry = findEntryBySlug(params.term);
  const title = entry
    ? `${entry.term} — Cultural Term Details`
    : "Term not found";
  const description =
    entry?.definition ||
    "Details of cultural terms including definition, etymology, cultural meaning, variants, and related information.";
  return {
    title,
    description,
  };
}

export default function CulturalWordDetailPage({
  params,
}: {
  params: { term: string };
}) {
  const entry = findEntryBySlug(params.term);
  if (!entry) {
    notFound();
  }

  const termCode = generateTermCode(entry.regionKey, entry.term);
  const heroAlt = `Illustration for the term ${entry!.term}`;
  const heroSrc = `/placeholder.svg?height=360&width=640&query=${encodeURIComponent(
    `illustration photo ${entry!.term} cultural term`
  )}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <header className="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold text-foreground text-balance">
                {entry!.term}
              </h1>
              <Badge 
                variant="outline" 
                className="text-xs font-mono bg-muted/50 text-muted-foreground border-border/50"
              >
                {termCode}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Subculture: {entry!.regionKey}
            </p>
          </div>
          
          <div className="flex gap-2">
            <Link href="/budaya/daerah/-">
              <Button variant="outline">Back to list</Button>
            </Link>
            <Link href={`/budaya/daerah/${entry!.regionKey}`}>
              <Button className="bg-primary hover:bg-primary/90">
                View glossary {entry!.regionKey}
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        <section
          aria-label="Illustrative image"
          className="rounded-xl overflow-hidden border border-border bg-card/60"
        >
          <img
            src={heroSrc || "/placeholder.svg"}
            alt={heroAlt}
            className="w-full h-[280px] md:h-[360px] object-cover"
            crossOrigin="anonymous"
          />
        </section>

        {/* Profile-like layout: three key cards similar to profile breakdown */}
        <section aria-label="Term summary" className="grid grid-cols-1 gap-4">
          <Card className="bg-card/60 border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Definition</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {entry!.definition}
              </p>
            </CardContent>
          </Card>
        </section>

        <section
          aria-label="Additional information"
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <Card className="bg-card/60 border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Variants</CardTitle>
            </CardHeader>
            <CardContent>
              {entry!.variants && entry!.variants.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {entry!.variants.map((v, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full text-xs border border-border bg-background/60"
                    >
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
              <CardTitle className="text-foreground">Reference</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {entry!.commonMeaning || "—"}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/60 border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {entry!.note || "—"}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/60 border-border">
            <CardHeader>
              <CardTitle className="text-foreground">
                Information Availability
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {entry!.availability || "—"}
              </p>
            </CardContent>
          </Card>
        </section>

        <section
          aria-label="Further actions"
          className="flex items-center gap-3"
        >
          <Link href="/budaya/daerah/-">
            <Button variant="outline">Back to list</Button>
          </Link>
          <Link href={`/budaya/daerah/${entry!.regionKey}`}>
            <Button className="bg-primary hover:bg-primary/90">
              Explore {entry!.regionKey} subculture
            </Button>
          </Link>
        </section>
      </main>
    </div>
  );
}
