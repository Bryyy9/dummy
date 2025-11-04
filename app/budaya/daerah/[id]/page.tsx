// app/budaya/daerah/[id]/page.tsx
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/search-input";
import { Navigation } from "@/components/layout/navigation";
import { useNavigation } from "@/hooks/use-navigation";
import { Footer } from "@/components/layout/footer";
import { Model3DSection, type Model3D } from "@/components/sections/model-3d-section";
import { YouTubeSection, type YouTubeVideo } from "@/components/sections/youtube-section";


interface SearchResult {
  term: string;
  definition: string;
  category: string;
  region: string;
  slug: string;
}

interface SubcultureData {
  subcultureId: number;
  profile: {
    displayName: string;
    history: string;
    highlights: any[];
  };
  galleryImages: Array<{ 
    url: string;
    description?: string;
    caption?: string;
  }>;
  model3dArray: Array<{
    sketchfabId: string;
    title: string;
    description: string;
    artifactType: string;
    tags: any[];
  }>;
  youtubeVideos: Array<{
    videoId: string;
    title: string;
    description: string;
    thumbnail: string;
    duration?: string;
  }>;
  lexicon: Array<{
    term: string;
    definition: string;
    category: string;
    slug: string;
  }>;
  heroImage: string | null;
  culture: {
    name: string;
    province: string;
    region: string;
  };
}

export default function RegionDetailPage() {
  const params = useParams();
  const regionId = params.id as string;

  const { handleNavClick } = useNavigation();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [subcultureData, setSubcultureData] = useState<SubcultureData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isNavSticky, setIsNavSticky] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("region-profile");

  const [showLexiconOnly, setShowLexiconOnly] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);
  const [isGalleryAutoPlaying, setIsGalleryAutoPlaying] = useState(true);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const AUTOPLAY_DURATION = 5000;

  // Fetch subculture data
  useEffect(() => {
    const fetchSubcultureData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://be-corpora.vercel.app/api/v1/public/subcultures/${regionId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch subculture data");
        }
        const result = await response.json();
        if (result.success) {
          setSubcultureData(result.data);
        } else {
          throw new Error(result.message || "Failed to fetch data");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (regionId) {
      fetchSubcultureData();
    }
  }, [regionId]);

  // Gallery images
  const galleryImages = subcultureData?.galleryImages && subcultureData.galleryImages.length > 0
    ? subcultureData.galleryImages.map((img, idx) => ({
        url: img.url,
        description: img.description || `${subcultureData.profile?.displayName} - Image ${idx + 1}`,
        caption: img.caption || `Cultural heritage of ${subcultureData.profile?.displayName}`
      }))
    : [
        {
          url: "/subculture-gallery-1.jpg",
          description: "Traditional Architecture",
          caption: "Historic buildings showcasing traditional design"
        },
        {
          url: "/subculture-gallery-2.jpg",
          description: "Cultural Ceremonies",
          caption: "Local ceremonies and traditional practices"
        },
        {
          url: "/subculture-gallery-3.jpg",
          description: "Daily Life",
          caption: "Everyday activities and community life"
        },
      ];

  // Auto-play functions
  const startAutoPlay = useCallback(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }

    if (galleryImages.length <= 1) {
      return;
    }

    autoPlayRef.current = setInterval(() => {
      setCurrentGalleryIndex((prev) => {
        const nextIndex = (prev + 1) % galleryImages.length;
        return nextIndex;
      });
    }, AUTOPLAY_DURATION);
  }, [galleryImages.length]);

  const stopAutoPlay = useCallback(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (isGalleryAutoPlaying) {
      startAutoPlay();
    } else {
      stopAutoPlay();
    }

    return () => {
      stopAutoPlay();
    };
  }, [isGalleryAutoPlaying, startAutoPlay, stopAutoPlay]);

  // Gallery navigation functions
  const goToPreviousImage = () => {
    setIsGalleryAutoPlaying(false);
    stopAutoPlay();
    setCurrentGalleryIndex((prev) => 
      prev === 0 ? (galleryImages.length - 1) : prev - 1
    );
  };

  const goToNextImage = () => {
    setIsGalleryAutoPlaying(false);
    stopAutoPlay();
    setCurrentGalleryIndex((prev) => 
      (prev + 1) % galleryImages.length
    );
  };

  const goToImage = (index: number) => {
    setIsGalleryAutoPlaying(false);
    stopAutoPlay();
    setCurrentGalleryIndex(index);
  };

  const toggleAutoPlay = () => {
    setIsGalleryAutoPlaying((prev) => !prev);
  };

  // Transform model3dArray to Model3D format
  const models3D: Model3D[] = subcultureData?.model3dArray && subcultureData.model3dArray.length > 0
    ? subcultureData.model3dArray.map((model) => ({
        id: model.sketchfabId,
        title: model.title,
        description: model.description,
        artifactType: model.artifactType,
        tags: model.tags,
      }))
    : [];

  // Transform youtubeVideos to YouTubeVideo format
  const youtubeVideos: YouTubeVideo[] = subcultureData?.youtubeVideos && subcultureData.youtubeVideos.length > 0
    ? subcultureData.youtubeVideos.map((video) => ({
        videoId: video.videoId,
        title: video.title,
        description: video.description,
        thumbnail: video.thumbnail,
        duration: video.duration,
      }))
    : [];

  // Search functionality
  useEffect(() => {
    const runClientFilter = () => {
      if (!searchQuery.trim()) {
        setSearchResults([]);
        return;
      }

      const lexicon = subcultureData?.lexicon || [];
      if (Array.isArray(lexicon) && lexicon.length > 0) {
        const q = searchQuery.trim().toLowerCase();

        const filtered = lexicon.filter((entry: any) => {
          const term = (entry.term || "").toString().toLowerCase();
          const def = (entry.definition || "").toString().toLowerCase();
          const trans = (entry.transliterasi || "").toString().toLowerCase();
          const code = (entry.termCode || "").toString().toLowerCase();
          const category = (entry.category || "").toString().toLowerCase();

          return (
            term.includes(q) ||
            def.includes(q) ||
            trans.includes(q) ||
            code.includes(q) ||
            category.includes(q)
          );
        });

        const mapped = filtered.map((entry: any) => ({
          term: entry.term,
          definition: entry.definition,
          category: entry.category || "",
          region: subcultureData?.culture?.name || subcultureData?.culture?.region || regionId,
          slug: entry.slug ||
            (entry.term || "")
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .replace(/[^\w\s-]/g, "")
              .toLowerCase()
              .replace(/\s+/g, "-")
              .replace(/(^-|-$)/g, ""),
        }));

        setSearchResults(mapped);
      }
    };

    const debounceTimer = setTimeout(runClientFilter, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery, regionId, subcultureData]);

  // Scroll handling
  useEffect(() => {
    const handleScroll = () => {
      const headerHeight = 64;
      setIsNavSticky(window.scrollY > headerHeight);

      const sections = [
        "region-profile",
        "photo-gallery",
        "viewer-3d",
        "youtube-videos",
        "search-and-explore",
      ];
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(sectionId);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Pagination logic
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const displayItems = searchQuery ? searchResults : subcultureData?.lexicon || [];
  const totalPages = Math.ceil(displayItems.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedItems = displayItems.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    const element = document.getElementById("search-and-explore");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading subculture details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !subcultureData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            {error || "Subculture Not Found"}
          </h1>
          <Link href="/peta-budaya">
            <Button variant="outline">Back to Map</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Navigation onNavClick={handleNavClick} />

      {/* Hero Section */}
      <section aria-label="Hero" className="relative overflow-hidden border-b border-border">
        <div className="relative">
          <img
            src={subcultureData.heroImage || "/placeholder.svg"}
            alt={`${regionId} cultural landscape`}
            className="h-[65vh] md:h-[80vh] w-full object-cover"
            crossOrigin="anonymous"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          <div className="absolute inset-0 flex flex-col justify-center items-start px-12 md:px-16 lg:px-24">
            <motion.nav
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-sm text-gray-200 mb-3"
              aria-label="Breadcrumb"
            >
              <ol className="flex items-center space-x-2">
                <li>
                  <Link href="/" className="hover:underline">Home</Link>
                </li>
                <li aria-hidden="true">›</li>
                <li>
                  <Link href="/peta-budaya" className="hover:underline">Culture Map</Link>
                </li>
              </ol>
            </motion.nav>

            <motion.h1
              className="text-4xl md:text-6xl font-extrabold text-white max-w-3xl leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              Discover the Living Tapestry of{" "}
              {subcultureData.profile?.displayName || regionId}
            </motion.h1>

            <motion.p
              className="mt-4 text-lg md:text-xl text-gray-200 max-w-2xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Navigate an elegant cultural map to explore regions, traditions,
              artifacts, and events—curated to reveal identity, history, and
              significance with clarity and beauty.
            </motion.p>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-6 space-y-8 scroll-smooth">
        {/* Navigation Tabs */}
        <nav
          aria-label="Halaman sub-bab"
          className={`bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-40 border-b border-border transition-shadow duration-200 ${
            isNavSticky ? "shadow-md" : ""
          }`}
        >
          <div className="container mx-auto px-4">
            <ul className="flex gap-2 overflow-x-auto py-2 no-scrollbar items-center">
              <li>
                <a
                  href="#region-profile"
                  onClick={(e) => {
                    scrollToSection(e, "region-profile");
                    setShowLexiconOnly(false);
                  }}
                  className={`px-3 py-2 rounded-md text-sm transition-colors inline-block ${
                    activeSection === "region-profile" && !showLexiconOnly
                      ? "bg-primary/20 text-primary font-medium"
                      : "hover:bg-accent/20 text-foreground"
                  }`}
                >
                  Profile Subkulture
                </a>
              </li>
              <li aria-hidden="true" className="text-muted-foreground">/</li>
              <li>
                <a
                  href="#photo-gallery"
                  onClick={(e) => {
                    scrollToSection(e, "photo-gallery");
                    setShowLexiconOnly(false);
                  }}
                  className={`px-3 py-2 rounded-md text-sm transition-colors inline-block ${
                    activeSection === "photo-gallery" && !showLexiconOnly
                      ? "bg-primary/20 text-primary font-medium"
                      : "hover:bg-accent/20 text-foreground"
                  }`}
                >
                  Galeri Foto
                </a>
              </li>
              <li aria-hidden="true" className="text-muted-foreground">/</li>
              <li>
                <a
                  href="#viewer-3d"
                  onClick={(e) => {
                    scrollToSection(e, "viewer-3d");
                    setShowLexiconOnly(false);
                  }}
                  className={`px-3 py-2 rounded-md text-sm transition-colors inline-block ${
                    activeSection === "viewer-3d" && !showLexiconOnly
                      ? "bg-primary/20 text-primary font-medium"
                      : "hover:bg-accent/20 text-foreground"
                  }`}
                >
                  Model 3D
                </a>
              </li>
              <li aria-hidden="true" className="text-muted-foreground">/</li>
              <li>
                <a
                  href="#youtube-videos"
                  onClick={(e) => {
                    scrollToSection(e, "youtube-videos");
                    setShowLexiconOnly(false);
                  }}
                  className={`px-3 py-2 rounded-md text-sm transition-colors inline-block ${
                    activeSection === "youtube-videos" && !showLexiconOnly
                      ? "bg-primary/20 text-primary font-medium"
                      : "hover:bg-accent/20 text-foreground"
                  }`}
                >
                  Video YouTube
                </a>
              </li>
              <li aria-hidden="true" className="text-muted-foreground">/</li>
              <li>
                <button
                  onClick={() => {
                    setShowLexiconOnly(true);
                    setCurrentPage(1);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className={`px-3 py-2 rounded-md text-sm transition-colors inline-block ${
                    showLexiconOnly
                      ? "bg-primary/20 text-primary font-medium"
                      : "hover:bg-accent/20 text-foreground"
                  }`}
                >
                  Kumpulan kata
                </button>
              </li>
            </ul>
          </div>
        </nav>

        {!showLexiconOnly ? (
          <>
            {/* Region Profile Section */}
            <section
              id="region-profile"
              className="bg-card/60 rounded-xl shadow-sm border border-border p-6 scroll-mt-24"
            >
              {(() => {
                const profile = subcultureData.profile;
                if (!profile)
                  return (
                    <p className="text-sm text-muted-foreground">
                      Detailed profile for this subculture is not yet available.
                    </p>
                  );

                const { displayName, history } = profile;

                return (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-foreground">
                      Sekilas tentang {displayName}
                    </h2>
                    <p className="text-base leading-relaxed text-muted-foreground">
                      {history}
                    </p>
                  </div>
                );
              })()}
            </section>

            {/* Photo Gallery Section */}
            <section
              id="photo-gallery"
              className="bg-card/60 rounded-xl shadow-sm border border-border p-6 scroll-mt-24"
            >
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Serba-serbi {subcultureData.profile?.displayName}
              </h2>

              {/* Main Carousel Display */}
              <div className="relative rounded-xl overflow-hidden border border-border bg-background/50 mb-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentGalleryIndex}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                    className="relative aspect-video"
                  >
                    <img
                      src={galleryImages[currentGalleryIndex].url}
                      alt={galleryImages[currentGalleryIndex].description}
                      className="w-full h-full object-cover"
                      crossOrigin="anonymous"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-2xl font-bold mb-2"
                      >
                        {galleryImages[currentGalleryIndex].description}
                      </motion.h3>
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-sm text-gray-200"
                      >
                        {galleryImages[currentGalleryIndex].caption}
                      </motion.p>
                    </div>

                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                      {currentGalleryIndex + 1} / {galleryImages.length}
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Arrows */}
                <button
                  onClick={goToPreviousImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all hover:scale-110 z-10"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={goToNextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all hover:scale-110 z-10"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Auto-play toggle */}
                <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
                  <button
                    onClick={toggleAutoPlay}
                    className="bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm hover:bg-black/70 transition-colors"
                  >
                    {isGalleryAutoPlaying ? "⏸ Pause" : "▶ Play"}
                  </button>
                </div>
              </div>

              {/* Thumbnail Navigation */}
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => goToImage(idx)}
                    className={`relative rounded-lg overflow-hidden border-2 transition-all hover:scale-105 ${
                      idx === currentGalleryIndex
                        ? "border-primary shadow-lg scale-105"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="aspect-video">
                      <img
                        src={img.url}
                        alt={img.description}
                        className="w-full h-full object-cover"
                        crossOrigin="anonymous"
                      />
                    </div>
                    {idx === currentGalleryIndex && (
                      <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                      <p className="text-white text-xs truncate">
                        {img.description}
                      </p>
                    </div>
                  </button>
                ))}
              </div>

              {/* Progress indicator */}
              {isGalleryAutoPlaying && (
                <div className="mt-4">
                  <div className="w-full bg-muted/30 rounded-full h-1 overflow-hidden">
                    <motion.div
                      key={`progress-${currentGalleryIndex}`}
                      className="h-full bg-primary"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{
                        duration: AUTOPLAY_DURATION / 1000,
                        ease: "linear",
                      }}
                    />
                  </div>
                </div>
              )}
            </section>

            {/* 3D Model Section */}
            <section
              id="viewer-3d"
              className="scroll-mt-24"
            >
              <Model3DSection
                models={models3D}
                title="3D Cultural Artifacts & Environments"
                description={`Jelajahi model 3D interaktif dari artefak budaya dan lingkungan suku ${subcultureData.profile?.displayName}.`}
                subcultureName={subcultureData.profile?.displayName}
                showControls={true}
                autoRotate={true}
                height="600px"
              />
            </section>

            {/* YouTube Videos Section */}
            <section
              id="youtube-videos"
              className="scroll-mt-24"
            >
              <YouTubeSection
                videos={youtubeVideos}
                title="Video Dokumentasi Budaya"
                description={`Tonton video dokumentasi budaya dan kehidupan sehari-hari suku ${subcultureData.profile?.displayName}.`}
                subcultureName={subcultureData.profile?.displayName}
                autoPlay={false}
                showThumbnails={true}
                columns={3}
              />
            </section>
          </>
        ) : (
          <>
            {/* Lexicon Section */}
            <section
              id="search-and-explore"
              className="bg-card/60 rounded-xl shadow-sm border border-border p-6 scroll-mt-24"
            >
              <div className="flex flex-col gap-4" role="search">
                <div>
                  <h2 className="text-xl font-bold text-foreground mb-2">
                    Search Lexicon
                  </h2>
                  <p className="text-sm text-muted-foreground mb-4">
                    Search across terms, definitions, transliterations, and more
                    to find exactly what you're looking for.
                  </p>
                </div>
                <SearchInput
                  aria-label={`Search terms in ${regionId}`}
                  placeholder={`Search terms, definitions, transliterations...`}
                  value={searchQuery}
                  onChange={setSearchQuery}
                  onClear={() => setSearchQuery("")}
                  resultCount={searchResults.length}
                  showResultCount={true}
                />
              </div>
            </section>

            <section aria-label="Daftar istilah" className="scroll-mt-24">
              {(() => {
                return (
                  <>
                    {/* Items Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      {paginatedItems.map((entry, i) => {
                        const termSlug = entry.term
                          .normalize("NFD")
                          .replace(/[\u0300-\u036f]/g, "")
                          .toLowerCase()
                          .replace(/[^a-z0-9]+/g, "-")
                          .replace(/(^-|-$)/g, "");

                        return (
                          <article
                            key={`${entry.term}-${i}`}
                            className="rounded-xl shadow-sm border bg-card/60 border-border overflow-hidden"
                          >
                            <div className="px-4 py-3">
                              <h3 className="font-semibold text-foreground">
                                {entry.term}
                              </h3>
                              <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                                {entry.definition}
                              </p>
                            </div>

                            <div className="px-4 pb-4">
                              <Link
                                href={`/budaya/daerah/-/${termSlug}`}
                                aria-label={`Lihat rincian untuk istilah ${entry.term}`}
                                className="block"
                              >
                                <Button
                                  size="lg"
                                  className="w-full bg-primary text-white hover:bg-primary/90 rounded-md py-3"
                                >
                                  Detail &nbsp;→
                                </Button>
                              </Link>
                            </div>
                          </article>
                        );
                      })}

                      {displayItems.length === 0 && (
                        <div className="text-center py-12 col-span-full">
                          <MapPin className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                          <h3 className="text-lg font-semibold text-foreground mb-2">
                            {searchQuery ? "No results found" : "Belum ada entri"}
                          </h3>
                          <p className="text-muted-foreground">
                            {searchQuery
                              ? `No lexicon entries match "${searchQuery}". Try different keywords.`
                              : "Glosarium untuk subkultur ini belum tersedia."}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Pagination Controls */}
                    {displayItems.length > 0 && totalPages > 1 && (
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 p-4 bg-card/40 rounded-xl border border-border">
                        {/* Info */}
                        <div className="text-sm text-muted-foreground">
                          Showing {startIndex + 1}-{Math.min(endIndex, displayItems.length)} of {displayItems.length} entries
                        </div>

                        {/* Pagination Buttons */}
                        <div className="flex items-center gap-2">
                          {/* Previous Button */}
                          <button
                            onClick={goToPreviousPage}
                            disabled={currentPage === 1}
                            className={`px-3 py-2 rounded-lg border transition-all ${
                              currentPage === 1
                                ? "border-border/50 text-muted-foreground cursor-not-allowed opacity-50"
                                : "border-border hover:bg-primary/10 hover:border-primary text-foreground"
                            }`}
                            aria-label="Previous page"
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </button>

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
                                );
                              }

                              const page = pageNum as number;
                              return (
                                <button
                                  key={page}
                                  onClick={() => goToPage(page)}
                                  className={`min-w-[40px] px-3 py-2 rounded-lg border transition-all ${
                                    currentPage === page
                                      ? "bg-primary text-primary-foreground border-primary font-semibold"
                                      : "border-border hover:bg-primary/10 hover:border-primary text-foreground"
                                  }`}
                                  aria-label={`Go to page ${page}`}
                                  aria-current={currentPage === page ? "page" : undefined}
                                >
                                  {page}
                                </button>
                              );
                            })}
                          </div>

                          {/* Next Button */}
                          <button
                            onClick={goToNextPage}
                            disabled={currentPage === totalPages}
                            className={`px-3 py-2 rounded-lg border transition-all ${
                              currentPage === totalPages
                                ? "border-border/50 text-muted-foreground cursor-not-allowed opacity-50"
                                : "border-border hover:bg-primary/10 hover:border-primary text-foreground"
                            }`}
                            aria-label="Next page"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Mobile: Page Info */}
                        <div className="sm:hidden text-sm text-muted-foreground">
                          Page {currentPage} of {totalPages}
                        </div>
                      </div>
                    )}
                  </>
                );
              })()}
            </section>
          </>
        )}
      </main>

      <Footer onNavClick={handleNavClick} />
    </div>
  );

  function scrollToSection(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const SCROLL_OFFSET = 96;
    const top = el.getBoundingClientRect().top + window.pageYOffset - SCROLL_OFFSET;
    window.scrollTo({ top, behavior: "smooth" });
    if (history.replaceState) {
      history.replaceState(null, "", `#${id}`);
    } else {
      window.location.hash = `#${id}`;
    }
  }
}