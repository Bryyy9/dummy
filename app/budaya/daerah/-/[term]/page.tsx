"use client"

import { use, useState, useEffect } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SUBCULTURE_PROFILES } from "@/data/subculture-profiles";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/layout/navigation";
import { ArrowLeft, Volume2, VolumeX, Loader2 } from "lucide-react";
import { Footer } from "@/components/layout/footer";
import { useNavigation } from "@/hooks/use-navigation";

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
}

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

export default function CulturalWordDetailPage({
  params,
}: {
  params: Promise<{ term: string }>;
}) {
  const { handleNavClick } = useNavigation();
  const resolvedParams = use(params);
  const [entry, setEntry] = useState<LexiconEntry | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Audio states
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioLoading, setAudioLoading] = useState(false);
  const [audioError, setAudioError] = useState<string | null>(null);
  const [audioInstance, setAudioInstance] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    const fetchEntry = async () => {
      try {
        const response = await fetch('https://be-corpora.vercel.app/api/v1/public/lexicons');
        if (!response.ok) {
          throw new Error('Failed to fetch lexicons');
        }
        const result = await response.json();
        if (result.success) {
          const foundEntry = result.data.find((item: LexiconEntry) =>
            slugify(item.term) === resolvedParams.term
          );
          if (foundEntry) {
            setEntry(foundEntry);
          } else {
            notFound();
          }
        } else {
          throw new Error(result.message || 'Failed to fetch data');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchEntry();
  }, [resolvedParams.term]);

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (audioInstance) {
        audioInstance.pause();
        audioInstance.src = '';
      }
    };
  }, [audioInstance]);

  const handlePlayAudio = async () => {
    // If no audio file, show error
    if (!entry?.audioFile) {
      setAudioError('Audio file not available for this term');
      return;
    }

    // If already playing, stop it
    if (isPlaying && audioInstance) {
      audioInstance.pause();
      audioInstance.currentTime = 0;
      setIsPlaying(false);
      return;
    }

    try {
      setAudioError(null);
      setAudioLoading(true);

      // Create new audio instance
      const audio = new Audio(entry.audioFile);
      setAudioInstance(audio);

      // Set up event listeners
      audio.onloadstart = () => {
        setAudioLoading(true);
      };

      audio.oncanplay = () => {
        setAudioLoading(false);
      };

      audio.onplay = () => {
        setIsPlaying(true);
        setAudioLoading(false);
      };

      audio.onended = () => {
        setIsPlaying(false);
        setAudioLoading(false);
      };

      audio.onerror = (e) => {
        setAudioError('Failed to load audio file');
        setIsPlaying(false);
        setAudioLoading(false);
        console.error('Audio error:', e);
      };

      // Play audio
      await audio.play();
    } catch (err) {
      setAudioError('Failed to play audio');
      setIsPlaying(false);
      setAudioLoading(false);
      console.error('Audio playback error:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/20 to-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Memuat detail istilah...</p>
        </div>
      </div>
    );
  }

  if (error || !entry) {
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

  const heroAlt = `Illustration for the term ${entry.term}`;
  const heroSrc = `/placeholder.svg?height=360&width=640&query=${encodeURIComponent(
    `illustration photo ${entry.term} cultural term`
  )}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <header className="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex flex-col gap-4 relative">
          {/* Back button */}
          <div className="flex items-center justify-between">
            <Link href={`/budaya/daerah/${regionId}`} aria-label={`Back to ${regionId} glossary`}>
              <Button variant="ghost" className="px-2 py-1 gap-2 inline-flex items-center">
                <ArrowLeft className="w-5 h-5" />
                <span className="text-sm">Back to {regionId}</span>
              </Button>
            </Link>

            {/* All Glossaries button on the right */}
            <Link href="/budaya/daerah/-" aria-label="View all glossaries">
              <Button variant="outline" className="px-3 py-2 gap-2 inline-flex items-center hover:bg-primary/10">
                <span className="text-sm hidden sm:inline">All Glossaries</span>
                <span className="text-sm sm:hidden">All</span>
              </Button>
            </Link>
          </div>

          {/* Header content with term and audio button */}
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold text-foreground text-balance">
                    {entry.term}
                  </h1>
                  
                  {/* Audio Pronunciation Button */}
                  <Button
                    onClick={handlePlayAudio}
                    disabled={audioLoading || !entry.audioFile}
                    variant="ghost"
                    size="sm"
                    className="h-9 w-9 p-0 hover:bg-primary/10 disabled:opacity-50 transition-all"
                    title={
                      !entry.audioFile 
                        ? 'Audio not available' 
                        : isPlaying 
                        ? 'Stop pronunciation' 
                        : 'Play pronunciation'
                    }
                    aria-label={`${isPlaying ? 'Stop' : 'Play'} pronunciation for ${entry.term}`}
                  >
                    {audioLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin text-primary" />
                    ) : audioError || !entry.audioFile ? (
                      <VolumeX className="w-5 h-5 text-muted-foreground" />
                    ) : isPlaying ? (
                      <div className="relative">
                        <Volume2 className="w-5 h-5 text-primary" />
                        <span className="absolute -top-1 -right-1 flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                      </div>
                    ) : (
                      <Volume2 className="w-5 h-5 text-foreground hover:text-primary transition-colors" />
                    )}
                  </Button>
                </div>
                
                <Badge
                  variant="outline"
                  className="text-xs font-mono bg-muted/50 text-muted-foreground border-border/50"
                >
                  {entry.domain}
                </Badge>
              </div>
              
              {entry.details.transliteration && (
                <p className="text-sm text-muted-foreground font-mono">
                  Transliteration:{" "}
                  <span className="text-foreground">{entry.details.transliteration}</span>
                </p>
              )}
              
              {/* Audio error message */}
              {audioError && (
                <div className="mt-2 flex items-center gap-2">
                  <div className="h-1 w-1 rounded-full bg-destructive animate-pulse" />
                  <p className="text-xs text-destructive">
                    {audioError}
                  </p>
                </div>
              )}
              
              {/* Audio playing indicator */}
              {isPlaying && !audioError && (
                <div className="mt-2 flex items-center gap-2">
                  <div className="h-1 w-1 rounded-full bg-primary animate-pulse" />
                  <p className="text-xs text-primary">
                    Playing pronunciation...
                  </p>
                </div>
              )}
              
              <p className="text-sm text-muted-foreground mt-1">
                Subculture: {entry.subculture.name} ({entry.subculture.province})
              </p>
              <p className="text-sm text-muted-foreground">
                Contributor: {entry.contributor}
              </p>
            </div>

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
                {entry.definition}
              </p>
            </CardContent>
          </Card>
        </section>

        <section
          aria-label="Illustrative image"
          className="rounded-xl overflow-hidden border border-border bg-card/60 aspect-video"
        >
          <img
            src={heroSrc}
            alt={heroAlt}
            className="w-full h-full object-cover"
          />
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
                {entry.details.variants || "—"}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/60 border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Common Meaning</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {entry.details.commonMeaning || "—"}
              </p>
            </CardContent>
          </Card>
        </section>

        <section
          aria-label="Additional information"
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <section
            aria-label="Illustrative image"
            className="rounded-xl overflow-hidden border border-border bg-card/60 aspect-video"
          >
            <img
              src={heroSrc}
              alt={heroAlt}
              className="w-full h-full object-cover"
            />
          </section>

          <section
            aria-label="Illustrative image"
            className="rounded-xl overflow-hidden border border-border bg-card/60 aspect-video"
          >
            <img
              src={heroSrc}
              alt={heroAlt}
              className="w-full h-full object-cover"
            />
          </section>
        </section>

        {/* 3D SUBCULTURE SECTION */}
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
      
            const currentModel = models3D[0]
      
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
              <p className="text-sm leading-relaxed text-muted-foreground">
                Available through cultural database
              </p>
            </CardContent>
          </Card>
        </section>
      </main>
      
      <Footer onNavClick={handleNavClick} />
    </div>
  );
}