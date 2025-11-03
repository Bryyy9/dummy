"use client"

import { use, useState, useEffect } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SUBCULTURE_PROFILES } from "@/data/subculture-profiles";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/layout/navigation";
import { ArrowLeft, Volume2, VolumeX, Loader2, Image as ImageIcon, Maximize2, AlertCircle } from "lucide-react";
import { Footer } from "@/components/layout/footer";
import { useNavigation } from "@/hooks/use-navigation";
import { motion, AnimatePresence } from "framer-motion";

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
  const [hasAudioFile, setHasAudioFile] = useState(false);

  // Image gallery states
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

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
            // Check if audio file exists and is valid
            if (foundEntry.audioFile && foundEntry.audioFile.trim() !== '') {
              setHasAudioFile(true);
              console.log('Audio file found:', foundEntry.audioFile);
            } else {
              console.log('No audio file available for this term');
            }
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
        audioInstance.load();
      }
    };
  }, [audioInstance]);

  // ===== IMPROVED AUDIO HANDLER =====
  const handlePlayAudio = async () => {
    console.log('Play audio clicked');
    console.log('Entry:', entry);
    console.log('Audio file:', entry?.audioFile);

    // Check if audio file exists
    if (!entry?.audioFile || entry.audioFile.trim() === '') {
      setAudioError('Audio file not available for this term');
      console.error('No audio file available');
      return;
    }

    // If already playing, stop it
    if (isPlaying && audioInstance) {
      console.log('Stopping current playback');
      audioInstance.pause();
      audioInstance.currentTime = 0;
      setIsPlaying(false);
      return;
    }

    try {
      setAudioError(null);
      setAudioLoading(true);
      console.log('Creating audio instance with URL:', entry.audioFile);

      // Clean up previous instance
      if (audioInstance) {
        audioInstance.pause();
        audioInstance.src = '';
        audioInstance.load();
      }

      // Create new audio instance
      const audio = new Audio();
      
      // Set up event listeners BEFORE setting src
      audio.onloadstart = () => {
        console.log('Audio loading started');
        setAudioLoading(true);
      };

      audio.oncanplay = () => {
        console.log('Audio can play');
        setAudioLoading(false);
      };

      audio.oncanplaythrough = () => {
        console.log('Audio can play through');
        setAudioLoading(false);
      };

      audio.onplay = () => {
        console.log('Audio playing');
        setIsPlaying(true);
        setAudioLoading(false);
      };

      audio.onended = () => {
        console.log('Audio ended');
        setIsPlaying(false);
        setAudioLoading(false);
      };

      audio.onpause = () => {
        console.log('Audio paused');
        setIsPlaying(false);
      };

      audio.onerror = (e) => {
        console.error('Audio error:', e);
        console.error('Audio error details:', {
          error: audio.error,
          code: audio.error?.code,
          message: audio.error?.message,
          src: audio.src
        });
        
        let errorMessage = 'Failed to load audio file';
        if (audio.error) {
          switch (audio.error.code) {
            case MediaError.MEDIA_ERR_ABORTED:
              errorMessage = 'Audio loading was aborted';
              break;
            case MediaError.MEDIA_ERR_NETWORK:
              errorMessage = 'Network error while loading audio';
              break;
            case MediaError.MEDIA_ERR_DECODE:
              errorMessage = 'Audio file format not supported';
              break;
            case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
              errorMessage = 'Audio source not supported';
              break;
          }
        }
        
        setAudioError(errorMessage);
        setIsPlaying(false);
        setAudioLoading(false);
      };

      // Set the source
      audio.src = entry.audioFile;
      audio.load();
      
      setAudioInstance(audio);

      // Try to play
      const playPromise = audio.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log('Audio playback started successfully');
          })
          .catch((err) => {
            console.error('Play promise rejected:', err);
            setAudioError('Failed to play audio: ' + err.message);
            setIsPlaying(false);
            setAudioLoading(false);
          });
      }

    } catch (err) {
      console.error('Audio playback error:', err);
      setAudioError('Failed to play audio: ' + (err instanceof Error ? err.message : 'Unknown error'));
      setIsPlaying(false);
      setAudioLoading(false);
    }
  };

  // Test audio URL accessibility
  const testAudioUrl = async () => {
    if (!entry?.audioFile) return;
    
    try {
      const response = await fetch(entry.audioFile, { method: 'HEAD' });
      console.log('Audio URL test:', {
        url: entry.audioFile,
        status: response.status,
        contentType: response.headers.get('content-type'),
        accessible: response.ok
      });
    } catch (err) {
      console.error('Audio URL not accessible:', err);
    }
  };

  // Test URL when entry changes
  useEffect(() => {
    if (entry?.audioFile) {
      testAudioUrl();
    }
  }, [entry?.audioFile]);

  // Image gallery functions
  const galleryImages = [
    {
      url: `/placeholder.svg?height=600&width=800&query=${encodeURIComponent(
        `${entry?.term || 'cultural term'} illustration 1`
      )}`,
      alt: `${entry?.term || 'Cultural term'} - Main illustration`,
      caption: `Visual representation of ${entry?.term || 'the term'}`
    },
    {
      url: `/placeholder.svg?height=600&width=800&query=${encodeURIComponent(
        `${entry?.term || 'cultural term'} context 1`
      )}`,
      alt: `${entry?.term || 'Cultural term'} - Context view 1`,
      caption: `${entry?.term || 'Term'} in traditional context`
    },
    {
      url: `/placeholder.svg?height=600&width=800&query=${encodeURIComponent(
        `${entry?.term || 'cultural term'} context 2`
      )}`,
      alt: `${entry?.term || 'Cultural term'} - Context view 2`,
      caption: `Cultural significance of ${entry?.term || 'the term'}`
    },
    {
      url: `/placeholder.svg?height=600&width=800&query=${encodeURIComponent(
        `${entry?.term || 'cultural term'} detail`
      )}`,
      alt: `${entry?.term || 'Cultural term'} - Detail view`,
      caption: `Detailed view of ${entry?.term || 'the term'}`
    }
  ];

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  const goToPreviousImage = () => {
    setSelectedImageIndex((prev) => 
      prev === 0 ? galleryImages.length - 1 : prev - 1
    );
  };

  const goToNextImage = () => {
    setSelectedImageIndex((prev) => 
      (prev + 1) % galleryImages.length
    );
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
                  
                  {/* ===== IMPROVED AUDIO BUTTON ===== */}
                  <div className="relative">
                    <Button
                      onClick={handlePlayAudio}
                      disabled={audioLoading || !hasAudioFile}
                      variant="ghost"
                      size="sm"
                      className={`h-9 w-9 p-0 transition-all ${
                        hasAudioFile 
                          ? 'hover:bg-primary/10 cursor-pointer' 
                          : 'opacity-50 cursor-not-allowed'
                      }`}
                      title={
                        !hasAudioFile 
                          ? 'Audio not available' 
                          : isPlaying 
                          ? 'Stop pronunciation' 
                          : 'Play pronunciation'
                      }
                      aria-label={`${isPlaying ? 'Stop' : 'Play'} pronunciation for ${entry.term}`}
                    >
                      {audioLoading ? (
                        <Loader2 className="w-5 h-5 animate-spin text-primary" />
                      ) : !hasAudioFile ? (
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

                    {/* Audio Status Tooltip */}
                    {!hasAudioFile && (
                      <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 whitespace-nowrap bg-muted/90 backdrop-blur-sm text-xs text-muted-foreground px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        No audio available
                      </div>
                    )}
                  </div>
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
              
              {/* ===== IMPROVED ERROR DISPLAY ===== */}
              {audioError && (
                <div className="mt-2 flex items-center gap-2 bg-destructive/10 border border-destructive/20 rounded-md px-3 py-2">
                  <AlertCircle className="h-4 w-4 text-destructive flex-shrink-0" />
                  <p className="text-xs text-destructive">
                    {audioError}
                  </p>
                </div>
              )}
              
              {/* ===== IMPROVED PLAYING INDICATOR ===== */}
              {isPlaying && !audioError && (
                <div className="mt-2 flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-md px-3 py-2">
                  <div className="flex gap-1">
                    <div className="w-1 h-3 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0ms' }} />
                    <div className="w-1 h-3 bg-primary rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
                    <div className="w-1 h-3 bg-primary rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
                  </div>
                  <p className="text-xs text-primary font-medium">
                    Playing pronunciation...
                  </p>
                </div>
              )}
              
              {/* ===== AUDIO INFO ===== */}
              {hasAudioFile && !isPlaying && !audioError && (
                <div className="mt-2 flex items-center gap-2">
                  <div className="h-1 w-1 rounded-full bg-emerald-500" />
                  <p className="text-xs text-muted-foreground">
                    Audio pronunciation available - Click speaker icon to play
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

        {/* Image Gallery Section */}
        <section 
          aria-label="Visual Gallery"
          className="space-y-4"
        >
          {/* Section Header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-primary" />
                Visual Gallery
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Explore visual representations and contexts
              </p>
            </div>
            <Badge variant="secondary" className="text-xs">
              {galleryImages.length} Images
            </Badge>
          </div>

          {/* Main Featured Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative group"
          >
            <div 
              className="rounded-xl overflow-hidden border border-border bg-card/60 aspect-video cursor-pointer"
              onClick={() => openLightbox(selectedImageIndex)}
            >
              <div className="relative w-full h-full">
                <img
                  src={galleryImages[selectedImageIndex].url}
                  alt={galleryImages[selectedImageIndex].alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-black/50 backdrop-blur-sm rounded-full p-3">
                    <Maximize2 className="w-6 h-6 text-white" />
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="text-white text-sm font-medium">
                    {galleryImages[selectedImageIndex].caption}
                  </p>
                </div>

                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
                  {selectedImageIndex + 1} / {galleryImages.length}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Thumbnail Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {galleryImages.map((image, idx) => (
              <motion.button
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
                onClick={() => setSelectedImageIndex(idx)}
                className={`relative rounded-lg overflow-hidden border-2 transition-all duration-300 hover:scale-105 ${
                  idx === selectedImageIndex
                    ? "border-primary shadow-lg shadow-primary/20 scale-105"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <div className="aspect-video relative">
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                  
                  {idx !== selectedImageIndex && (
                    <div className="absolute inset-0 bg-black/20 hover:bg-black/0 transition-colors duration-300" />
                  )}

                  {idx === selectedImageIndex && (
                    <div className="absolute inset-0 bg-primary/10">
                      <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  )}

                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                    <p className="text-white text-xs truncate">
                      Image {idx + 1}
                    </p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </section>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {isLightboxOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
              onClick={closeLightbox}
            >
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-colors z-10"
                aria-label="Close lightbox"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToPreviousImage();
                }}
                className="absolute left-4 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 transition-colors z-10"
                aria-label="Previous image"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToNextImage();
                }}
                className="absolute right-4 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 transition-colors z-10"
                aria-label="Next image"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="relative max-w-6xl w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={galleryImages[selectedImageIndex].url}
                  alt={galleryImages[selectedImageIndex].alt}
                  className="w-full h-auto rounded-lg"
                />
                
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                  <p className="text-white text-lg font-medium">
                    {galleryImages[selectedImageIndex].caption}
                  </p>
                  <p className="text-white/70 text-sm mt-1">
                    {selectedImageIndex + 1} of {galleryImages.length}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

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

        {/* 3D Section */}
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