import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LEXICON, type LexiconEntry } from "@/data/lexicon";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PronunciationButton } from "@/components/pronunciation-button";

// Same slugify as listing for consistent matching
function slugify(input: string) {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
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
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-foreground text-balance">
                  {entry!.term}
                </h1>
                <PronunciationButton
                  audioFile={entry!.audioFile}
                  term={entry!.term}
                  size="md"
                  variant="ghost"
                />
              </div>
              <Badge
                variant="outline"
                className="text-xs font-mono bg-muted/50 text-muted-foreground border-border/50"
              >
                {entry!.termCode}
              </Badge>
            </div>
            {entry!.transliterasi && (
              <p className="text-sm text-muted-foreground font-mono">
                Transliteration:{" "}
                <span className="text-foreground">{entry!.transliterasi}</span>
              </p>
            )}
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
          className="rounded-xl overflow-hidden border border-border bg-card/60 aspect-video"
        >
          {entry?.imageId ? (
            <iframe
              src={`https://drive.google.com/file/d/${entry.imageId}/preview`}
              className="pointer-events-none w-full h-full object-cover"
              allow="autoplay"
              scrolling="no"
            ></iframe>
          ) : (
            <img
              src="/placeholder.svg"
              alt="No image available"
              className="w-full h-full object-cover"
            />
          )}
        </section>

        {/* Profile-like layout */}
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
          {entry!.transliterasi && (
            <Card className="bg-card/60 border-border">
              <CardHeader>
                <CardTitle className="text-foreground">
                  Transliteration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <p className="text-sm leading-relaxed text-muted-foreground font-mono">
                    {entry!.transliterasi}
                  </p>
                  <PronunciationButton
                    audioFile={entry!.audioFile}
                    term={entry!.term}
                    size="sm"
                    variant="outline"
                  />
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="bg-card/60 border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Variants</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {entry!.variants}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/60 border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Etymology</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {entry!.etimologi || "—"}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/60 border-border">
            <CardHeader>
              <CardTitle className="text-foreground">
                Cultural Meaning
              </CardTitle>
            </CardHeader>
            <CardContent>
              {entry?.culturalMeaning ? (
                <a
                  href={entry.culturalMeaning}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline hover:text-blue-600"
                >
                  {entry.culturalMeaning}
                </a>
              ) : (
                <p className="text-sm leading-relaxed text-muted-foreground">
                  —
                </p>
              )}
            </CardContent>
          </Card>

          <Card className="bg-card/60 border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Common Meaning</CardTitle>
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
