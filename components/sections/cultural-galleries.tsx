"use client"

import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import { AnimatedReveal } from "@/components/common/animated-reveal"
import { EnhancedButton } from "@/components/interactive/enhanced-button"
import Link from "next/link"

interface CulturalGalleriesProps {
  onNavClick: (section: string) => void
}

export function CulturalGalleries({ onNavClick }: CulturalGalleriesProps) {
  const subRegions = [
    {
      id: "arek",
      name: "Arek",
      description: "Subkultur perkotaan dengan karakter egaliter, lugas, dan dinamis.",
      image: "/sub-daerah-arek.jpg",
    },
    {
      id: "mataraman",
      name: "Mataraman",
      description: "Berakar pada tradisi agraris Jawa dengan tata krama yang halus dan tertata.",
      image: "/sub-daerah-mataraman.jpg",
    },
    {
      id: "pandalungan",
      name: "Pandalungan",
      description: "Akulturasi budaya Madura dan Jawa di wilayah tapal kuda.",
      image: "/sub-daerah-pandalungan.jpg",
    },
    {
      id: "osing",
      name: "Osing",
      description: "Kelompok etnis lokal Banyuwangi dengan tradisi dan bahasa khas.",
      image: "/sub-daerah-osing.jpg",
    },
    {
      id: "madura",
      name: "Madura",
      description: "Identitas kuat dengan tradisi maritim, religiusitas tinggi, dan kerja keras.",
      image: "/sub-daerah-madura.jpg",
    },
  ]

  return (
    <section className="py-20 bg-muted/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedReveal animation="fade-up">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="bg-card/80 backdrop-blur-sm border-border">
              Sub Daerah Budaya
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 text-balance">Jelajahi Sub Daerah Budaya</h2>
            <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto text-pretty">
              Setiap sub daerah memiliki karakter, tradisi, dan ekspresi budaya yang unik. Telusuri kartu di bawah untuk
              memulai.
            </p>
          </div>
        </AnimatedReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {subRegions.map((sr, index) => (
            <AnimatedReveal key={sr.id} animation="scale-up" delay={200 + index * 100}>
              <div className="group relative overflow-hidden rounded-xl bg-card border border-border hover-lift">
                <div className="aspect-[4/3] relative overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url('${sr.image}')` }}
                    role="img"
                    aria-label={`Gambar sub daerah ${sr.name}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-black/50 backdrop-blur-sm border-white/20 text-white">Sub Daerah</Badge>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{sr.name}</h3>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>

                  <p className="text-sm text-muted-foreground mb-4">{sr.description}</p>

                  <div className="flex items-center justify-end">
                    <Link href={`/budaya/daerah/${sr.id}`} aria-label={`Lihat rincian sub daerah ${sr.name}`}>
                      <EnhancedButton size="sm" className="min-w-[104px]">
                        Rincian
                      </EnhancedButton>
                    </Link>
                  </div>
                </div>
              </div>
            </AnimatedReveal>
          ))}
        </div>

        <AnimatedReveal animation="fade-up" delay={800}>
          <div className="text-center mt-12">
            <Link href="/budaya/daerah/-" aria-label="Buka Glosarium Budaya">
              <EnhancedButton size="lg" className="gradient-purple">
                Buka Glosarium Budaya
                <ArrowRight className="h-5 w-5 ml-2" />
              </EnhancedButton>
            </Link>
          </div>
        </AnimatedReveal>
      </div>
    </section>
  )
}
