"use client"

import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import { AnimatedReveal } from "@/components/common/animated-reveal"
import { EnhancedButton } from "@/components/interactive/enhanced-button"

interface CulturalGalleriesProps {
  onNavClick: (section: string) => void
  subcultures?: Array<{
    id: number
    slug: string
    name: string
    description: string
    culture: string
    province: string
    heroImage: string | null
  }>
}

export function CulturalGalleries({ onNavClick, subcultures }: CulturalGalleriesProps) {
  const defaultSubRegions = [
    {
      id: "mataraman",
      name: "Mataraman",
      description:
        "Rooted in Javanese agrarian traditions with refined, orderly etiquette.",
      image: "/sub-daerah-mataraman.jpg",
      slug: "mataraman",
    },
    {
      id: "pandalungan",
      name: "Pandalungan",
      description:
        "A cultural blend of Madurese and Javanese influences in the horseshoe region.",
      image: "/sub-daerah-pandalungan.jpg",
      slug: "pandalungan",
    },
    {
      id: "osing",
      name: "Osing",
      description:
        "A local Banyuwangi ethnic group with distinctive traditions and language.",
      image: "/sub-daerah-osing.jpg",
      slug: "osing",
    },
    {
      id: "madura",
      name: "Madura",
      description:
        "A strong identity characterized by maritime traditions, deep religiosity, and industriousness.",
      image: "/sub-daerah-madura.jpg",
      slug: "madura",
    },
  ]

  const displaySubcultures = subcultures ? subcultures.map(sc => ({
    id: sc.id.toString(),
    name: sc.name,
    description: sc.description,
    image: sc.heroImage || "/sub-daerah-pandalungan.jpg",
    slug: sc.slug,
  })) : defaultSubRegions

  return (
    <section className="py-20 bg-muted/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <AnimatedReveal animation="fade-up">
          <div className="text-center mb-12">
            <Badge
              variant="secondary"
              className="bg-card/80 backdrop-blur-sm border-border"
            >
              Cultural Sub-regions
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 text-balance">
              Explore Cultural Sub-regions
            </h2>
            <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto text-pretty">
              Each sub-region has its own unique character, traditions, and
              cultural expressions. Browse the cards below to get started.
            </p>
          </div>
        </AnimatedReveal>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-fr">
          {displaySubcultures.map((sr, index) => (
            <AnimatedReveal
              key={sr.id}
              animation="scale-up"
              delay={200 + index * 100}
            >
              <div className="group relative overflow-hidden rounded-xl bg-card border border-border hover-lift h-full flex flex-col">
                {/* Image */}
                <div className="aspect-[4/3] relative overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url('${sr.image}')` }}
                    role="img"
                    aria-label={`Image of ${sr.name} sub-region`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-black/50 backdrop-blur-sm border-white/20 text-white">
                      Sub-region
                    </Badge>
                  </div>
                </div>

                {/* Text Content */}
                <div className="p-4 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
                      {sr.name}
                    </h3>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4 flex-1 line-clamp-3">
                    {sr.description}
                  </p>

                  {/* Button */}
                  <div className="flex items-center justify-end mt-auto">
                    <EnhancedButton
                      size="lg"
                      className="w-full cursor-pointer"
                      onClick={() =>
                        (window.location.href = `/budaya/daerah/${sr.slug}`)
                      }
                    >
                      Explore
                    </EnhancedButton>
                  </div>
                </div>
              </div>
            </AnimatedReveal>
          ))}
        </div>

        {/* Bottom Button */}
        <AnimatedReveal animation="fade-up" delay={800}>
          <div className="text-center mt-12">
            <EnhancedButton
              size="lg"
              className="w-full md:w-auto gradient-purple cursor-pointer"
              onClick={() => (window.location.href = "/budaya")}
            >
              Open Sub Cultural Glossary
              <ArrowRight className="h-5 w-5 ml-2" />
            </EnhancedButton>
          </div>
        </AnimatedReveal>
      </div>
    </section>
  )
}

