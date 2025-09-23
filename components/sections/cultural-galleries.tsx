"use client"

import { Badge } from "@/components/ui/badge"
import { Camera, Play, ArrowRight, Star } from "lucide-react"
import { AnimatedReveal } from "@/components/common/animated-reveal"
import { EnhancedButton } from "@/components/interactive/enhanced-button"

interface CulturalGalleriesProps {
  onNavClick: (section: string) => void
}

export function CulturalGalleries({ onNavClick }: CulturalGalleriesProps) {
  const galleries = [
    {
      id: "kesenian",
      title: "Kesenian Tradisional",
      description: "Tari, musik, dan pertunjukan tradisional Jawa Timur",
      image: "/traditional-east-java-dance-performance-with-color.jpg",
      count: "120+ Foto",
      rating: 4.9,
    },
    {
      id: "kuliner",
      title: "Kuliner Khas",
      description: "Cita rasa autentik makanan tradisional daerah",
      image: "/traditional-east-java-food-and-culinary-dishes.jpg",
      count: "85+ Foto",
      rating: 4.8,
    },
    {
      id: "arsitektur",
      title: "Arsitektur Bersejarah",
      description: "Bangunan dan candi bersejarah yang memukau",
      image: "/historical-east-java-temple-and-traditional-archit.jpg",
      count: "95+ Foto",
      rating: 4.9,
    },
    {
      id: "kerajinan",
      title: "Kerajinan Tangan",
      description: "Karya seni dan kerajinan tradisional yang indah",
      image: "/traditional-east-java-handicrafts-and-batik-art.jpg",
      count: "150+ Foto",
      rating: 4.7,
    },
  ]

  return (
    <section className="py-20 bg-muted/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedReveal animation="fade-up">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="bg-card/80 backdrop-blur-sm border-border">
              <Camera className="h-3 w-3 mr-1" />
              Galeri Budaya
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mt-4">Jelajahi Kekayaan Budaya</h2>
            <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
              Temukan keindahan warisan budaya Jawa Timur melalui koleksi foto dan dokumentasi yang menakjubkan
            </p>
          </div>
        </AnimatedReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {galleries.map((gallery, index) => (
            <AnimatedReveal key={gallery.id} animation="scale-up" delay={200 + index * 100}>
              <div className="group relative overflow-hidden rounded-xl bg-card border border-border hover-lift cursor-pointer">
                <div className="aspect-[4/3] relative overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{
                      backgroundImage: `url('${gallery.image}')`,
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                      <Play className="h-6 w-6 text-white ml-1" />
                    </div>
                  </div>

                  {/* Rating badge */}
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-black/50 backdrop-blur-sm border-white/20 text-white">
                      <Star className="h-3 w-3 mr-1 fill-current" />
                      {gallery.rating}
                    </Badge>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{gallery.title}</h3>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{gallery.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{gallery.count}</span>
                    <EnhancedButton
                      size="sm"
                      variant="outline"
                      className="border-primary/30 hover:bg-primary/10"
                      onClick={() => onNavClick("eksplorasi")}
                    >
                      Lihat Galeri
                    </EnhancedButton>
                  </div>
                </div>
              </div>
            </AnimatedReveal>
          ))}
        </div>

        <AnimatedReveal animation="fade-up" delay={800}>
          <div className="text-center mt-12">
            <EnhancedButton size="lg" className="gradient-purple" onClick={() => onNavClick("eksplorasi")}>
              Lihat Semua Galeri
              <ArrowRight className="h-5 w-5 ml-2" />
            </EnhancedButton>
          </div>
        </AnimatedReveal>
      </div>
    </section>
  )
}
