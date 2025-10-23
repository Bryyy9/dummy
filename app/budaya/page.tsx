// app/budaya/daerah/page.tsx
"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, MapPin, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SUBCULTURE_PROFILES } from "@/data/subculture-profiles"

export default function SubculturesGalleryPage() {
  const [selectedSubculture, setSelectedSubculture] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-8">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-4xl font-bold text-foreground mb-2">Subkultur Daerah</h1>
            <p className="text-muted-foreground max-w-2xl">
              Jelajahi kekayaan budaya dari berbagai subkultur di Jawa Timur. Setiap subkultur memiliki video dokumenter
              dan model 3D interaktif yang menampilkan warisan budaya unik mereka.
            </p>
          </motion.div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Subcultures Grid */}
        <div className="space-y-16">
          {Object.entries(SUBCULTURE_PROFILES).map(([id, subculture], index) => (
            <motion.section
              key={id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="rounded-2xl border border-border bg-card/60 overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              {/* Section Header */}
              <div className="bg-gradient-to-r from-primary/10 to-accent/10 border-b border-border p-6 md:p-8">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h2 className="text-3xl font-bold text-foreground mb-2">{subculture.displayName}</h2>
                    <p className="text-muted-foreground max-w-2xl">{subculture.history}</p>
                  </div>
                  <Link href={`/budaya/daerah/${id}`}>
                    <Button variant="outline" size="sm" className="shrink-0 bg-transparent">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Glosarium
                    </Button>
                  </Link>
                </div>

                {/* Demographics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="rounded-lg bg-background/50 border border-border p-3">
                    <div className="text-xs text-muted-foreground mb-1">Populasi</div>
                    <div className="font-semibold text-sm text-foreground">{subculture.demographics.population}</div>
                  </div>
                  <div className="rounded-lg bg-background/50 border border-border p-3">
                    <div className="text-xs text-muted-foreground mb-1">Area</div>
                    <div className="font-semibold text-sm text-foreground">{subculture.demographics.area}</div>
                  </div>
                  <div className="rounded-lg bg-background/50 border border-border p-3">
                    <div className="text-xs text-muted-foreground mb-1">Kepadatan</div>
                    <div className="font-semibold text-sm text-foreground">{subculture.demographics.density}</div>
                  </div>
                  <div className="rounded-lg bg-background/50 border border-border p-3">
                    <div className="text-xs text-muted-foreground mb-1">Bahasa</div>
                    <div className="font-semibold text-sm text-foreground">{subculture.demographics.languages[0]}</div>
                  </div>
                </div>

                {/* Highlights */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {subculture.highlights.map((highlight: string, i: number) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full text-xs border border-border bg-background/50 text-muted-foreground"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>

              {/* Media Section */}
              <div className="p-6 md:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Video Section */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-2 flex items-center gap-2">
                        <span className="w-1 h-6 bg-primary rounded-full" />
                        Video Dokumenter
                      </h3>
                      <p className="text-sm text-muted-foreground">{subculture.video.description}</p>
                    </div>

                    <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-border bg-background/50">
                      <iframe
                        className="w-full h-full"
                        src={`https://www.youtube.com/embed/${subculture.video.youtubeId}?rel=0&modestbranding=1`}
                        title={subculture.video.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        loading="lazy"
                      />
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {subculture.video.tags.map((tag: string, i: number) => (
                        <span
                          key={i}
                          className="px-2 py-1 rounded-full text-xs border border-border bg-background/50 text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* 3D Model Section */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-2 flex items-center gap-2">
                        <span className="w-1 h-6 bg-accent rounded-full" />
                        Model 3D Interaktif
                      </h3>
                      <p className="text-sm text-muted-foreground">{subculture.model3d.description}</p>
                    </div>

                    <div className="relative w-full rounded-lg overflow-hidden border border-border bg-background/50">
                      <iframe
                        className="w-full"
                        style={{ height: "400px" }}
                        src={`https://sketchfab.com/models/${subculture.model3d.sketchfabId}/embed?autospin=1&autostart=1`}
                        title={subculture.model3d.title}
                        allow="autoplay; fullscreen; xr-spatial-tracking"
                        allowFullScreen
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-2">
                        {subculture.model3d.tags.map((tag: string, i: number) => (
                          <span
                            key={i}
                            className="px-2 py-1 rounded-full text-xs border border-border bg-background/50 text-muted-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="rounded-lg border border-border bg-background/50 p-3">
                        <p className="text-xs text-muted-foreground">
                          <strong>Tipe Artefak:</strong> {subculture.model3d.artifactType}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer CTA */}
              <div className="border-t border-border bg-background/30 px-6 md:px-8 py-4 flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Pelajari lebih lanjut tentang {subculture.displayName} dan istilah budayanya
                </p>
                <Link href={`/budaya/daerah/${id}`}>
                  <Button variant="ghost" size="sm" className="hover:bg-accent/20">
                    Jelajahi Glosarium
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </motion.section>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 rounded-2xl border border-border bg-gradient-to-r from-primary/10 to-accent/10 p-8 md:p-12 text-center"
        >
          <h2 className="text-2xl font-bold text-foreground mb-4">Ingin Mempelajari Lebih Lanjut?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Jelajahi glosarium lengkap dari semua subkultur atau kembali ke peta budaya untuk melihat distribusi
            geografis.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/budaya/daerah/-">
              <Button className="bg-primary hover:bg-primary/90">
                <BookOpen className="w-4 h-4 mr-2" />
                Glosarium Lengkap
              </Button>
            </Link>
            <Link href="/peta-budaya">
              <Button variant="outline">
                <MapPin className="w-4 h-4 mr-2" />
                Kembali ke Peta Budaya
              </Button>
            </Link>
          </div>
        </motion.section>
      </main>
    </div>
  )
}
