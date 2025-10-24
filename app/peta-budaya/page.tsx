// app/peta-budaya/page.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, ArrowLeft, Info, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { AdvancedPopupMap, REGIONS, type Region } from "@/components/cultural/advanced-popup-map";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ParallaxBackground } from "@/components/common/parallax-background";
import { LEXICON } from "@/data/lexicon";

export default function PetaBudayaPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchResults, setSearchResults] = useState<Region[]>([]);
  const router = useRouter();

  // Handle search functionality
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      const results = REGIONS.filter(
        (region) =>
          region.name.toLowerCase().includes(query.toLowerCase()) ||
          region.highlights.some((element) =>
            element.toLowerCase().includes(query.toLowerCase())
          )
      );
      setSearchResults(results);
      setShowSearchResults(true);
      if (results.length > 0) {
        setSelectedRegion(results[0].id);
      }
    } else {
      setShowSearchResults(false);
      setSelectedRegion(null);
    }
  };

  // Handle region click
  const handleRegionClick = (regionId: string) => {
    router.push(`/budaya/daerah/${regionId}`);
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
        {/* Header */}
        <header className="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link href="/">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hover:bg-accent/10"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                </Link>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">
                    East Java Cultural Map
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Explore the cultural richness of each region
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 max-w-md w-full">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search regions or cultural items..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="pl-10 bg-background/50 border-border focus:ring-primary/20"
                  />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section aria-labelledby="hero-title" className="relative">
          <ParallaxBackground className="relative h-[320px] md:h-[420px] overflow-hidden">
            <Image
              src="/east-java-temple-sunset-landscape-with-traditional.jpg"
              alt="Cultural landscape of East Java"
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-background/20 to-background/90" />
            <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-end pb-8 md:pb-10">
              <Breadcrumb className="mb-3 md:mb-4">
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Culture Map</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
              <motion.h1
                id="hero-title"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-balance text-3xl md:text-5xl font-bold tracking-tight text-white"
              >
                Discover the Living Tapestry of East Java
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.05, ease: "easeOut" }}
                className="mt-2 md:mt-3 text-pretty text-sm md:text-base text-gray-200 max-w-2xl"
              >
                Navigate an elegant cultural map to explore regions, traditions,
                artifacts, and events—curated to reveal identity, history, and
                significance with clarity and beauty.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                className="mt-4 flex flex-col sm:flex-row items-start gap-3"
              >
                <Link href="#map">
                  <Button className="bg-primary hover:bg-primary/90">
                    Start Exploring
                  </Button>
                </Link>
                <Link href="/budaya/daerah/-">
                  <Button
                    variant="outline"
                    className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
                  >
                    <BookOpen className="h-4 w-4 mr-2" />
                    Glosarium Budaya
                  </Button>
                </Link>
                <Button variant="ghost" asChild>
                  <a
                    href="#how-to"
                    className="hover:underline text-gray-200"
                  >
                    How it works
                  </a>
                </Button>
              </motion.div>
            </div>
          </ParallaxBackground>
        </section>

        {/* How it works section */}
        <section
          id="how-to"
          aria-label="How it works"
          className="container mx-auto px-4 py-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="rounded-xl border border-border bg-card/60 backdrop-blur-sm p-4 md:p-5"
          >
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-foreground text-xs font-semibold">
                  1
                </span>
                Hover over any region on the map to see detailed information instantly.
              </li>
              <li className="flex items-start gap-3">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-foreground text-xs font-semibold">
                  2
                </span>
                Use the search box to find specific regions and their cultural highlights.
              </li>
              <li className="flex items-start gap-3">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-foreground text-xs font-semibold">
                  3
                </span>
                Click on a region to explore its full cultural glossary and traditions.
              </li>
            </ul>
          </motion.div>
        </section>

        {/* Main content with map */}
        <div id="map" className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left sidebar with search results */}
            <div className="lg:col-span-1">
              <div className="bg-card/50 backdrop-blur-sm rounded-xl shadow-sm border border-border p-6 sticky top-24">
                <h3 className="font-semibold text-foreground mb-2">Search Results</h3>
                <p className="text-xs text-muted-foreground mb-4">
                  {searchQuery 
                    ? `Found ${searchResults.length} region(s) matching "${searchQuery}"`
                    : "Search for regions or cultural elements"
                  }
                </p>
                
                <AnimatePresence>
                  {showSearchResults && searchResults.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-2"
                    >
                      {searchResults.map((region) => (
                        <motion.button
                          key={region.id}
                          onClick={() => handleRegionClick(region.id)}
                          className="w-full text-left p-3 rounded-lg border border-border hover:bg-accent/5 transition-colors"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <div 
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: region.color }}
                            />
                            <span className="font-medium text-sm">{region.name}</span>
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {region.description}
                          </p>
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Right side with map */}
            <div className="lg:col-span-3">
              <div className="bg-card/50 backdrop-blur-sm rounded-xl shadow-sm border border-border overflow-hidden">
                <div className="p-4 border-b border-border bg-gradient-to-r from-primary/5 to-accent/5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-semibold text-foreground">
                        Interactive Map of East Java
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        Hover over regions to explore their cultural heritage
                      </p>
                    </div>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-sm">
                          Hover to see details, click to explore glossary
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>

                {/* Map Component - UNCHANGED */}
                <div className="relative h-[600px]">
                  <AdvancedPopupMap onRegionClick={handleRegionClick} />
                </div>
              </div>

              {/* Selected region glossary preview */}
              <AnimatePresence>
                {selectedRegion && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="mt-6 bg-card/50 backdrop-blur-sm rounded-xl shadow-sm border border-border p-6"
                  >
                    {(() => {
                      const region = REGIONS.find((r) => r.id === selectedRegion);
                      if (!region) return null;
                      const terms = LEXICON[selectedRegion] || [];

                      return (
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold text-foreground">
                              {region.name} — Cultural Glossary
                            </h3>
                            <Link href={`/budaya/daerah/${region.id}`}>
                              <Button className="bg-primary hover:bg-primary/90">
                                View Full Glossary
                              </Button>
                            </Link>
                          </div>
                          
                          <div className="space-y-3">
                            {terms.slice(0, 6).map((entry, idx) => (
                              <div
                                key={idx}
                                className="rounded-lg border border-border bg-card/60 p-3"
                              >
                                <div className="font-semibold text-foreground">
                                  {entry.term}
                                </div>
                                <div className="text-sm text-muted-foreground mt-1">
                                  {entry.definition}
                                </div>
                              </div>
                            ))}
                            
                            {terms.length === 0 && (
                              <p className="text-sm text-muted-foreground text-center py-4">
                                No glossary entries available for this region yet.
                              </p>
                            )}
                            
                            {terms.length > 6 && (
                              <div className="text-center pt-2">
                                <Link href={`/budaya/daerah/${region.id}`}>
                                  <Button variant="outline" size="sm">
                                    View All ({terms.length} terms)
                                  </Button>
                                </Link>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })()}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Bottom divider */}
        <section aria-hidden="true" className="container mx-auto px-4 pb-10">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />
        </section>
      </div>
    </TooltipProvider>
  );
}
