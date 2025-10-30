"use client"

import { use } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LEXICON, type LexiconEntry } from "@/data/lexicon";
import { SUBCULTURE_PROFILES } from "@/data/subculture-profiles";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PronunciationButton } from "@/components/pronunciation-button";
import { Navigation } from "@/components/layout/navigation";
import { ArrowLeft } from "lucide-react";
import { Footer } from "@/components/layout/footer";
import { useNavigation } from "@/hooks/use-navigation";

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

export default function CulturalWordDetailPage({
  params,
}: {
  params: Promise<{ term: string }>;
}) {
  const { handleNavClick } = useNavigation();
  const resolvedParams = use(params);
  const entry = findEntryBySlug(resolvedParams.term);
  if (!entry) {
    notFound();
  }

  const regionId = entry.regionKey;
  const profile = SUBCULTURE_PROFILES[regionId];

  const models3D = profile?.model3dArray && profile.model3dArray.length > 0
    ? profile.model3dArray.map((model) => ({
        id: model.sketchfabId,
        title: model.title,
        description: model.description,
        artifactType: model.artifactType,
        tags: model.tags,
      }))
    : [];

  const heroAlt = `Illustration for the term ${entry!.term}`;
  const heroSrc = `/placeholder.svg?height=360&width=640&query=${encodeURIComponent(
    `illustration photo ${entry!.term} cultural term`
  )}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <header className="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-40">
        {/* container switched to flex-col so Back button sits above the original header content */}
        <div className="container mx-auto px-4 py-4 flex flex-col gap-4 relative">
          {/* Back button placed in its own row above header content */}
          <div className="flex items-center">
            <Link href="/budaya/daerah/-" aria-label="Back to glossary list">
              <Button variant="ghost" className="px-2 py-1 gap-2 inline-flex items-center">
                <ArrowLeft className="w-5 h-5" />
                <span className="text-sm">Back</span>
              </Button>
            </Link>
          </div>

          {/* Original header content kept in the next row (unchanged positions relative to each other) */}
          <div className="flex items-center justify-between">
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

            {/* keep right-side empty/placeholder to preserve previous spacing if needed */}
            <div aria-hidden className="w-10" />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">

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

        <section
          aria-label="Additional information"
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
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
              <CardTitle className="text-foreground">Common Meaning</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {entry!.reference || "—"}
              </p>
            </CardContent>
          </Card>
{/*           
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
        </section> */}

          {/* <Card className="bg-card/60 border-border">
            <CardHeader>
              <CardTitle className="text-foreground">
                Information Availability
              </CardTitle>
            </CardHeader>
            <CardContent>
              {entry?.availability ? (
                <a
                  href={entry.availability}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline hover:text-blue-600"
                >
                  {entry.availability}
                </a>
              ) : (
                <p className="text-sm leading-relaxed text-muted-foreground">
                  —
                </p>
              )}
            </CardContent>
          </Card> */}
        </section>

        <section
          aria-label="Additional information"
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >


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


        </section>
          {/* 4️⃣ 3D SUBCULTURE SECTION */}
          <section
            id="viewer-3d"
            aria-label="Penampil 3D"
            className="rounded-xl shadow-sm border border-border bg-card/60 p-6 scroll-mt-24"
          >
            {(() => {
              const p = SUBCULTURE_PROFILES[regionId]
              if (!p?.model3dArray || p.model3dArray.length === 0) {
                return (
                  <div className="text-center py-8">
                    <p className="text-sm text-muted-foreground">
                      3D models for this subculture are not yet available.
                    </p>
                  </div>
                )
              }
        
              const currentModel = models3D[0] // Show first model only
        
              return (
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    3D Cultural Artifacts & Environments
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Jelajahi model 3D interaktif dari artefak budaya dan lingkungan suku {p.displayName}.
                  </p>
        
                  <div className="relative w-full rounded-lg overflow-hidden border border-border bg-background/50">
                    <iframe
                      key={`model-${currentModel.id}`}
                      className="w-full"
                      style={{ height: "500px" }}
                      src={`https://sketchfab.com/models/${currentModel.id}/embed?autospin=1&autostart=1`}
                      title={`${currentModel.title}`}
                      allow="autoplay; fullscreen; xr-spatial-tracking"
                      allowFullScreen
                    />
                  </div>
                </div>
              )
            })()}
          </section>

        <section aria-label="Term summary" className="grid grid-cols-1 gap-4">
          <Card className="bg-card/60 border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Information Availability</CardTitle>
            </CardHeader>
            <CardContent>
              {entry?.availability ? (
                <a
                  href={entry.availability}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline hover:text-blue-600"
                >
                  {entry.availability}
                </a>
              ) : (
                <p className="text-sm leading-relaxed text-muted-foreground">
                  —
                </p>
              )}
            </CardContent>
          </Card>
        </section>

      </main>
      <Footer onNavClick={handleNavClick} />
    </div>
  );
}
