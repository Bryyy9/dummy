"use client"

import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Search, MapPin, Star, Clock, Bookmark, Newspaper } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { RegionProfile } from "@/components/cultural/region-profile"
import { FeaturedCarousel } from "@/components/cultural/featured-carousel"

// Data budaya per daerah
type CulturalItem = {
  id: string
  title: string
  category: "Tradition" | "Artifact" | "Event"
  description: string
  image?: string
  difficulty?: string
  duration?: string
  popularity?: number
  tags: string[]
  history?: string
  elements?: string[]
}

type RegionProfileData = {
  name: string
  description: string
  color: string
  population?: string
  established?: string
  highlights?: string[]
  identity: string
  historyText: string
  significance: string
  culturalItems: CulturalItem[]
}

const regionCulturalData: Record<string, RegionProfileData> = {
  surabaya: {
    name: "Surabaya",
    description: "A metropolitan city with distinctive urban culture",
    color: "#003b5c",
    population: "2.9 million",
    established: "1293",
    highlights: ["City of Heroes", "Economic Hub", "Heritage Buildings"],
    identity:
      "Known as the City of Heroes, Surabaya embodies strong urban identity, collective spirit, and iconic culinary traditions such as rujak cingur.",
    historyText:
      "From royal to colonial eras, Surabaya served as a vital port and center of resistance. The events of November 10, 1945 cemented its heroic identity.",
    significance:
      "Surabaya is a cultural and economic engine of East Java—an exchange node that fuels creative innovation.",
    culturalItems: [
      {
        id: "tari-remo",
        title: "Remo Dance",
        category: "Tradition",
        description: "A dance symbolizing bravery and pride in Surabaya.",
        tags: ["tradition", "dance", "surabaya"],
        duration: "45 minutes",
        popularity: 4.8,
      },
      {
        id: "rujak-cingur",
        title: "Rujak Cingur",
        category: "Artifact",
        description: "An iconic dish with petis sauce representing flavor acculturation.",
        tags: ["cuisine", "artifact", "surabaya"],
        duration: "30 minutes",
        popularity: 4.9,
      },
      {
        id: "festival-arek",
        title: "Arek Suroboyo Festival",
        category: "Event",
        description: "An urban cultural celebration with parades of arts and music.",
        tags: ["event", "festival", "surabaya"],
        duration: "1 day",
        popularity: 4.6,
      },
    ],
  },
  malang: {
    name: "Malang",
    description: "An education city with rich cultural heritage",
    color: "#00a3e0",
    population: "895 thousand",
    established: "760",
    highlights: ["Education City", "Cultural Tourism", "Signature Cuisine"],
    identity:
      "A cool mountain city with strong craft and visual arts traditions—Malangan batik and a vibrant creative community.",
    historyText:
      "From ancient kingdoms to colonial times, Malang evolved into a hub for education and culture, nurturing diverse art communities.",
    significance:
      "As an educational epicenter, Malang fosters intergenerational cultural dialogue and preservation through creative works.",
    culturalItems: [
      {
        id: "batik-malangan",
        title: "Malangan Batik",
        category: "Artifact",
        description: "Batik featuring flora-fauna motifs and local philosophy.",
        tags: ["batik", "artifact", "malang"],
        duration: "2 hours",
        popularity: 4.7,
      },
      {
        id: "topeng-malangan",
        title: "Malangan Mask Dance",
        category: "Tradition",
        description: "Mask performance with distinct characters and narrative arcs.",
        tags: ["dance", "tradition", "malang"],
        duration: "50 minutes",
        popularity: 4.6,
      },
    ],
  },
  kediri: {
    name: "Kediri",
    description: "A cultural center with puppet traditions and tobacco industry",
    color: "#a855f7",
    population: "268 thousand",
    established: "1042",
    highlights: ["Puppet Heritage", "Tobacco", "Historical Sites"],
    identity:
      "Kediri’s identity is rooted in traditional performing arts such as wayang and jaranan, upheld by communities that honor history.",
    historyText:
      "Since the Kadiri Kingdom era, Kediri has preserved longstanding traditions in performance arts and commerce.",
    significance:
      "Kediri plays a pivotal role in safeguarding traditional arts and inspiring East Javanese performance practices.",
    culturalItems: [
      {
        id: "jaranan-kediri",
        title: "Jaranan Kediri",
        category: "Tradition",
        description: "A distinctive horse dance performance from Kediri.",
        tags: ["tradition", "dance", "kediri"],
      },
      {
        id: "batik-kediri",
        title: "Kediri Batik",
        category: "Artifact",
        description: "Batik with region-specific motifs.",
        tags: ["batik", "artifact", "kediri"],
      },
    ],
  },
  jember: {
    name: "Jember",
    description: "A tobacco city with dynamic cultural festivals",
    color: "#c084fc",
    population: "332 thousand",
    established: "1929",
    highlights: ["Gandrung", "JFC Festival", "Plantations"],
    identity: "Jember is renowned for creative cultural parades and rich culinary traditions within a diverse society.",
    historyText: "The plantation economy shaped local culture and fostered nationally recognized creative events.",
    significance: "Jember is a stage for contemporary expressions that embrace local identity and global networks.",
    culturalItems: [
      {
        id: "jfc",
        title: "Jember Fashion Carnaval",
        category: "Event",
        description: "A large-scale cultural costume celebration.",
        tags: ["event", "festival", "jember"],
      },
      {
        id: "suwar-suwir",
        title: "Suwar-Suwir",
        category: "Artifact",
        description: "A signature confection made from fermented cassava.",
        tags: ["cuisine", "artifact", "jember"],
      },
    ],
  },
  probolinggo: {
    name: "Probolinggo",
    description: "Mango city with agrarian traditions and gateway to Bromo",
    color: "#ddd6fe",
    population: "217 thousand",
    established: "1918",
    highlights: ["Mango City", "Bromo", "Agrarian Traditions"],
    identity:
      "Agrarian identity appears in harvest traditions and produce-based cuisine, tied spiritually to Mount Bromo.",
    historyText: "Maritime trade and agriculture shaped a hybrid culture in Probolinggo.",
    significance:
      "A cultural and natural tourism hub that blends tradition with dramatic mountain and coastal landscapes.",
    culturalItems: [
      {
        id: "glipang",
        title: "Glipang Dance",
        category: "Tradition",
        description: "A lively community dance of Probolinggo.",
        tags: ["tradition", "dance", "probolinggo"],
      },
    ],
  },
  banyuwangi: {
    name: "Banyuwangi",
    description: "Eastern tip of Java with rich Using culture",
    color: "#7c3aed",
    population: "1.6 million",
    established: "1771",
    highlights: ["Using Culture", "Nature", "Gandrung"],
    identity: "Using traditions shape Banyuwangi’s identity—language, music, and the Gandrung performing arts.",
    historyText: "Migration and maritime trade expanded local cultural repertoires.",
    significance: "A living laboratory of culture that celebrates diversity through annual festivals.",
    culturalItems: [
      {
        id: "gandrung-sewu",
        title: "Gandrung Sewu",
        category: "Event",
        description: "A massive performance with thousands of Gandrung dancers.",
        tags: ["event", "dance", "banyuwangi"],
      },
      {
        id: "batik-using",
        title: "Using Batik",
        category: "Artifact",
        description: "Batik with motifs from the Using community.",
        tags: ["batik", "artifact", "banyuwangi"],
      },
    ],
  },
  ponorogo: {
    name: "Ponorogo",
    description: "City of Reog with majestic performance traditions",
    color: "#5b21b6",
    population: "855 thousand",
    established: "1496",
    highlights: ["Reog", "Traditional Arts", "Bamboo Crafts"],
    identity: "Reog symbolizes courage and spirituality—supported by strong craft communities.",
    historyText: "Growing from oral narratives and rituals, Reog has been passed down across generations.",
    significance: "Reog reinforces local pride and showcases cultural excellence.",
    culturalItems: [
      {
        id: "reog-ponorogo",
        title: "Reog Ponorogo",
        category: "Tradition",
        description: "An iconic lion mask performance.",
        tags: ["tradition", "performance", "ponorogo"],
      },
    ],
  },
  madiun: {
    name: "Madiun",
    description: "City of pecel with a historic railway legacy",
    color: "#4c1d95",
    population: "170 thousand",
    established: "1918",
    highlights: ["Pecel", "Historic Station", "Gamelan"],
    identity: "Madiun’s identity lives in its pecel cuisine and gamelan music, within a friendly urban community.",
    historyText: "Rail networks shaped the city’s growth and popular culture.",
    significance: "A culinary and music node enriching cultural tourism in western East Java.",
    culturalItems: [
      {
        id: "pecel-madiun",
        title: "Madiun Pecel",
        category: "Artifact",
        description: "A beloved dish with signature peanut sauce.",
        tags: ["cuisine", "artifact", "madiun"],
      },
    ],
  },
}

const regionImages: Record<string, { src: string; alt: string; caption?: string }[]> = {
  surabaya: [
    {
      src: "/surabaya-modern-city-with-traditional-cultural-ele.jpg",
      alt: "Surabaya cityscape with cultural elements",
    },
    { src: "/rujak-cingur-surabaya-lengkap.jpg", alt: "Rujak Cingur, Surabaya's iconic dish" },
    { src: "/historical-east-java-temple-and-traditional-archit.jpg", alt: "Historic architecture near Surabaya" },
  ],
  malang: [
    { src: "/malang-traditional-architecture-and-cultural-herit.jpg", alt: "Malang traditional architecture" },
    { src: "/koleksi-batik-malangan-berbagai-motif.jpg", alt: "Malangan batik motifs" },
    { src: "/proses-pembuatan-batik-malangan.jpg", alt: "Making Malangan batik" },
  ],
  kediri: [
    { src: "/koleksi-wayang-kulit-berbagai-karakter.jpg", alt: "Wayang characters collection" },
    { src: "/pertunjukan-wayang-kulit-dengan-dalang.jpg", alt: "Wayang kulit performance" },
    { src: "/historical-east-java-temple-and-traditional-archit.jpg", alt: "Historic site in East Java" },
  ],
  jember: [
    { src: "/traditional-east-java-dance-performance-with-color.jpg", alt: "Traditional dance performance" },
    { src: "/traditional-east-java-handicrafts-and-batik-art.jpg", alt: "Batik and handicrafts" },
    { src: "/east-java-temple-sunset-landscape-with-traditional.jpg", alt: "East Java landscape at sunset" },
  ],
  probolinggo: [
    { src: "/mount-bromo-sunrise-volcanic-landscape-east-java.jpg", alt: "Mount Bromo sunrise" },
    { src: "/traditional-east-java-food-and-culinary-dishes.jpg", alt: "Traditional East Java dishes" },
    { src: "/historical-east-java-temple-and-traditional-archit.jpg", alt: "Historical architecture" },
  ],
  banyuwangi: [
    { src: "/traditional-east-java-dance-performance-with-color.jpg", alt: "Gandrung dance performance" },
    { src: "/east-java-temple-sunset-landscape-with-traditional.jpg", alt: "Eastern Java coastline and temples" },
    { src: "/traditional-east-java-handicrafts-and-batik-art.jpg", alt: "Using batik crafts" },
  ],
  ponorogo: [
    { src: "/pertunjukan-reog-ponorogo-lengkap.jpg", alt: "Reog Ponorogo performance" },
    { src: "/penari-jathil-reog-ponorogo.jpg", alt: "Jathil dancer in Reog art" },
    { src: "/koleksi-wayang-kulit-berbagai-karakter.jpg", alt: "Wayang characters" },
  ],
  madiun: [
    { src: "/masyarakat-berbicara-bahasa-jawa-timuran.jpg", alt: "Local community of East Java" },
    { src: "/traditional-east-java-food-and-culinary-dishes.jpg", alt: "Culinary dishes of East Java" },
    { src: "/koleksi-batik-malangan-berbagai-motif.jpg", alt: "Batik collections" },
  ],
}

export default function RegionDetailPage() {
  const params = useParams()
  const regionId = params.id as string

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [filteredItems, setFilteredItems] = useState<CulturalItem[]>([])

  const regionData = regionCulturalData[regionId as keyof typeof regionCulturalData]

  // Compute categories and recent items
  const categories = useMemo(
    () => (regionData ? [...new Set(regionData.culturalItems.map((i) => i.category))] : []),
    [regionData],
  )
  const recentItems = useMemo(() => (regionData ? regionData.culturalItems.slice(0, 5) : []), [regionData])

  useEffect(() => {
    if (!regionData) return
    let items = regionData.culturalItems

    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      items = items.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.tags.some((t) => t.toLowerCase().includes(q)),
      )
    }
    if (selectedCategory) {
      items = items.filter((item) => item.category === selectedCategory)
    }
    setFilteredItems(items)
  }, [searchQuery, selectedCategory, regionData])

  const heroImage =
    (regionImages[regionId]?.[0]?.src as string) ||
    `/placeholder.svg?height=640&width=1280&query=${encodeURIComponent(`${regionData?.name || "Region"} cultural landscape`)}`

  if (!regionData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Region Not Found</h1>
          <Link href="/peta-budaya">
            <Button variant="outline">Back to Map</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 space-y-2">
          <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/peta-budaya" className="hover:underline">
                  Cultural Map
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-foreground font-medium">{regionData?.name}</li>
            </ol>
          </nav>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/peta-budaya">
                <Button variant="ghost" size="sm" className="hover:bg-accent/10">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Map
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-foreground">{regionData.name} Cultural Profile</h1>
                <p className="text-sm text-muted-foreground">{regionData.description}</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-2 overflow-x-auto">
              <Button
                variant={selectedCategory === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(null)}
                className="whitespace-nowrap"
              >
                All
              </Button>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="whitespace-nowrap"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Hero / CTA section with immersive image */}
      <section aria-label="Hero" className="relative overflow-hidden border-b border-border">
        <div className="relative">
          <img
            src={heroImage || "/placeholder.svg"}
            alt={`${regionData.name} cultural landscape`}
            className="h-[42vh] md:h-[52vh] w-full object-cover"
            crossOrigin="anonymous"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="mx-auto max-w-4xl px-4 text-center">
              <motion.h2
                className="text-balance text-3xl md:text-5xl font-semibold drop-shadow-sm"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Start your adventure in {regionData.name}
              </motion.h2>
              <motion.p
                className="mt-4 text-pretty text-sm md:text-base text-muted-foreground max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Explore cultural identity, historical roots, and why this region matters. Browse traditions, artifacts,
                and events in a beautifully curated experience.
              </motion.p>
              <motion.div
                className="mt-6 flex items-center justify-center gap-3"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
              >
                <a href="#search-and-explore">
                  <Button className="bg-primary hover:bg-primary/90">Start exploring</Button>
                </a>
                <a href="#region-profile">
                  <Button variant="outline">About the region</Button>
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-6 space-y-8">
        {/* Category pills (mobile) */}
        <div className="md:hidden -mx-4 px-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(null)}
              className="whitespace-nowrap"
            >
              All
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="whitespace-nowrap"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Featured carousel + recent items */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <FeaturedCarousel
              title="Featured Highlights"
              images={(regionImages[regionId] || []).map((img, i) => ({
                ...img,
                src:
                  img?.src && img.src.startsWith("/")
                    ? img.src
                    : `/placeholder.svg?height=600&width=1067&query=${encodeURIComponent(
                        `${regionData.name} cultural highlight ${i + 1}`,
                      )}`,
              }))}
            />
          </div>
          <aside className="lg:col-span-1">
            <div className="bg-card/60 rounded-xl shadow-sm border border-border p-6">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Newspaper className="w-4 h-4 text-primary" />
                Recent Highlights
              </h3>
              <ul className="space-y-3">
                {recentItems.map((it) => (
                  <li key={it.id} className="border-b border-border pb-3 last:border-0 last:pb-0">
                    <Link href={`/budaya/${it.id}`} className="hover:underline">
                      <p className="text-sm font-medium text-foreground">{it.title}</p>
                    </Link>
                    <p className="text-xs text-muted-foreground">{it.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </section>

        {/* Comprehensive profile section */}
        <section id="region-profile">
          <RegionProfile
            name={regionData.name}
            color={regionData.color}
            identity={regionData.identity}
            history={regionData.historyText}
            significance={regionData.significance}
            facts={[
              ...(regionData.population ? [{ label: "Population", value: regionData.population }] : []),
              ...(regionData.established ? [{ label: "Established", value: regionData.established }] : []),
              ...(regionData.highlights && regionData.highlights.length
                ? [{ label: "Highlights", value: regionData.highlights.slice(0, 3).join(", ") }]
                : []),
            ]}
          />
        </section>

        {/* Search and Filter */}
        <section id="search-and-explore" className="bg-card/60 rounded-xl shadow-sm border border-border p-6">
          <div className="flex flex-col md:flex-row gap-4" role="search">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  aria-label={`Search in ${regionData.name}`}
                  placeholder={`Search traditions, artifacts, or events in ${regionData.name}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-background/50 border-border focus:ring-primary/20"
                />
              </div>
            </div>
            <div className="flex gap-2 md:hidden" aria-label="Category filters">
              <Button
                variant={selectedCategory === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(null)}
              >
                All
              </Button>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
          {searchQuery && (
            <div className="mt-4 text-sm text-muted-foreground">
              Found {filteredItems.length} result{filteredItems.length === 1 ? "" : "s"} for "{searchQuery}"
            </div>
          )}
        </section>

        {/* Cultural Items Grid */}
        <section aria-label="Search results">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05 }}
                  className="rounded-xl shadow-sm border overflow-hidden hover:shadow-md transition-shadow bg-card/60 border-border"
                >
                  <div className="aspect-video bg-gradient-to-br from-muted/40 to-muted relative">
                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                      <MapPin className="w-8 h-8" />
                    </div>
                    <div className="absolute top-3 left-3">
                      <Badge style={{ backgroundColor: regionData.color }} className="text-white">
                        {item.category}
                      </Badge>
                    </div>
                    <div className="absolute top-3 right-3">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 bg-background/70">
                        <Bookmark className="w-4 h-4" />
                        <span className="sr-only">Bookmark</span>
                      </Button>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-semibold mb-2 text-foreground">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{item.description}</p>

                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                      {item.duration && (
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {item.duration}
                        </div>
                      )}
                      {typeof item.popularity === "number" && (
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          {item.popularity}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {item.tags.slice(0, 3).map((tag, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <Link href={`/budaya/${item.id}`}>
                      <Button className="w-full">Learn More</Button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Empty state */}
          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <MapPin className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No Results</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your search or category filters.</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCategory(null)
                }}
              >
                Reset Search
              </Button>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}
