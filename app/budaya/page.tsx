// app/budaya/daerah/page.tsx
"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, MapPin, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"

type SubcultureProfile = {
  displayName: string
  demographics: {
    population: string
    area: string
    density: string
    languages: string[]
  }
  history: string
  highlights: string[]
  video: {
    youtubeId: string
    title: string
    description: string
    duration: string
    tags: string[]
  }
  model3d: {
    sketchfabId: string
    title: string
    description: string
    artifactType: string
    tags: string[]
  }
}

const SUBCULTURE_PROFILES: Record<string, SubcultureProfile> = {
  arekan: {
    displayName: "Arekan",
    demographics: {
      population: "± 5.1M (fiksi)",
      area: "6.200 km²",
      density: "825/km²",
      languages: ["Jawa Arek", "Madura", "Indonesia"],
    },
    history:
      "Berakar dari budaya pesisir perkotaan, Arekan tumbuh dalam kosmopolitanisme pelabuhan dengan seni tutur dan teater rakyat yang kuat.",
    highlights: ["Ludruk dan Remo", "Kuliner pesisir (rujak cingur)", "Ekspresi urban egaliter"],
    video: {
      youtubeId: "dQw4w9WgXcQ",
      title: "Arekan Culture: Urban Heritage & Traditions",
      description:
        "Explore the vibrant urban culture of Arekan, featuring traditional Ludruk theater, Remo dance, and iconic coastal cuisine.",
      duration: "12:45",
      tags: ["Ludruk", "Remo Dance", "Urban Culture"],
    },
    model3d: {
      sketchfabId: "3c5c5c5c5c5c5c5c",
      title: "Arekan Traditional Mask & Costume",
      description: "Interactive 3D model showcasing traditional Arekan theatrical masks and costumes.",
      artifactType: "Theatrical Mask & Costume",
      tags: ["Mask", "Costume", "Theater"],
    },
  },
  madura: {
    displayName: "Madura",
    demographics: {
      population: "± 4.2M (fiksi)",
      area: "5.200 km²",
      density: "808/km²",
      languages: ["Madura", "Indonesia"],
    },
    history: "Tradisi pesantren, maritim, dan jejaring dagang membentuk identitas Madura lintas kepulauan.",
    highlights: ["Karapan Sapi", "Keris dan kriya logam", "Tradisi pesantren"],
    video: {
      youtubeId: "dQw4w9WgXcQ",
      title: "Madura: Island Culture & Maritime Traditions",
      description: "Discover the rich maritime heritage of Madura, featuring the famous Karapan Sapi (bull racing).",
      duration: "14:20",
      tags: ["Karapan Sapi", "Bull Racing", "Maritime"],
    },
    model3d: {
      sketchfabId: "3c5c5c5c5c5c5c5c",
      title: "Madura Traditional Keris & Metalwork",
      description: "Explore the intricate craftsmanship of traditional Madura keris (daggers) and metalwork.",
      artifactType: "Keris & Metalwork",
      tags: ["Keris", "Metalwork", "Craftsmanship"],
    },
  },
  "madura-base": {
    displayName: "Madura-Base",
    demographics: {
      population: "± 1.1M (fiksi)",
      area: "1.900 km²",
      density: "579/km²",
      languages: ["Madura", "Indonesia"],
    },
    history:
      "Wilayah basis subkultur Madura dengan penguatan praktik keseharian—anyaman, ritual kampung, dan solidaritas komunal.",
    highlights: ["Anyaman & kriya serat", "Kuliner harian", "Ritual kampung"],
    video: {
      youtubeId: "dQw4w9WgXcQ",
      title: "Madura-Base: Daily Life & Community Traditions",
      description: "Experience the everyday cultural practices of Madura-Base communities.",
      duration: "11:30",
      tags: ["Weaving", "Daily Life", "Community"],
    },
    model3d: {
      sketchfabId: "3c5c5c5c5c5c5c5c",
      title: "Madura Traditional Weaving Loom",
      description: "Interactive 3D model of a traditional Madura weaving loom.",
      artifactType: "Weaving Loom",
      tags: ["Loom", "Weaving", "Textile"],
    },
  },
  "madura-bawean": {
    displayName: "Madura-Bawean",
    demographics: {
      population: "± 70K (fiksi)",
      area: "196 km²",
      density: "357/km²",
      languages: ["Bawean", "Madura", "Indonesia"],
    },
    history: "Subkultur kepulauan dengan tradisi maritim, bahasa lokal, dan musik rakyat yang hidup.",
    highlights: ["Tradisi maritim", "Bahasa lokal", "Kesenian pulau"],
    video: {
      youtubeId: "dQw4w9WgXcQ",
      title: "Bawean Island: Maritime Heritage & Local Arts",
      description: "Explore the unique maritime culture of Bawean Island.",
      duration: "13:15",
      tags: ["Maritime", "Island Culture", "Fishing"],
    },
    model3d: {
      sketchfabId: "3c5c5c5c5c5c5c5c",
      title: "Bawean Traditional Fishing Boat",
      description: "3D model of a traditional Bawean fishing boat.",
      artifactType: "Fishing Boat",
      tags: ["Boat", "Maritime", "Fishing"],
    },
  },
  "madura-kangean": {
    displayName: "Madura-Kangean",
    demographics: {
      population: "± 85K (fiksi)",
      area: "488 km²",
      density: "174/km²",
      languages: ["Madura", "Indonesia"],
    },
    history: "Jejaring pulau-pulau timur dengan identitas pesisir, perikanan, dan perdagangan.",
    highlights: ["Ritus pesisir", "Perikanan", "Kriya lokal"],
    video: {
      youtubeId: "dQw4w9WgXcQ",
      title: "Kangean Islands: Coastal Rituals & Trade Heritage",
      description: "Discover the coastal culture of Kangean Islands.",
      duration: "12:00",
      tags: ["Coastal", "Fishing", "Trade"],
    },
    model3d: {
      sketchfabId: "3c5c5c5c5c5c5c5c",
      title: "Kangean Coastal Shrine & Ritual Space",
      description: "Interactive 3D model of a traditional Kangean coastal shrine.",
      artifactType: "Shrine & Ritual Space",
      tags: ["Shrine", "Ritual", "Architecture"],
    },
  },
  mataraman: {
    displayName: "Mataraman",
    demographics: {
      population: "± 3.6M (fiksi)",
      area: "7.300 km²",
      density: "493/km²",
      languages: ["Jawa Mataraman", "Indonesia"],
    },
    history: "Warna kebudayaan Jawa Mataraman—tata krama, gamelan, dan wayang—membentuk lanskap kebudayaan setempat.",
    highlights: ["Gamelan & wayang", "Adab Mataraman", "Seni tutur"],
    video: {
      youtubeId: "dQw4w9WgXcQ",
      title: "Mataraman: Classical Javanese Culture & Arts",
      description: "Experience the refined culture of Mataraman, featuring classical gamelan music and wayang.",
      duration: "15:45",
      tags: ["Gamelan", "Wayang", "Classical Arts"],
    },
    model3d: {
      sketchfabId: "3c5c5c5c5c5c5c5c",
      title: "Mataraman Gamelan Orchestra",
      description: "3D model of a traditional Mataraman gamelan orchestra.",
      artifactType: "Musical Instrument Ensemble",
      tags: ["Gamelan", "Musical Instrument", "Orchestra"],
    },
  },
  osing: {
    displayName: "Osing (Using)",
    demographics: {
      population: "± 1.1M (fiksi)",
      area: "5.800 km²",
      density: "190/km²",
      languages: ["Osing/Using", "Jawa", "Indonesia"],
    },
    history: "Subkultur Osing mempunyai bahasa, musik, dan tarian khas; identitas kultural kuat di Banyuwangi.",
    highlights: ["Gandrung", "Barong & musik tradisional", "Batik Using"],
    video: {
      youtubeId: "dQw4w9WgXcQ",
      title: "Osing Culture: Gandrung Dance & Banyuwangi Heritage",
      description: "Immerse yourself in the vibrant Osing culture of Banyuwangi.",
      duration: "14:30",
      tags: ["Gandrung", "Dance", "Barong"],
    },
    model3d: {
      sketchfabId: "3c5c5c5c5c5c5c5c",
      title: "Osing Gandrung Costume & Jewelry",
      description: "Interactive 3D model showcasing the elaborate costumes and jewelry.",
      artifactType: "Costume & Jewelry",
      tags: ["Costume", "Jewelry", "Dance"],
    },
  },
  panaragan: {
    displayName: "Panaragan",
    demographics: {
      population: "± 0.9M (fiksi)",
      area: "4.400 km²",
      density: "205/km²",
      languages: ["Jawa", "Indonesia"],
    },
    history: "Kekuatan seni rakyat dan kerajinan kayu menjadi aksen keseharian Panaragan.",
    highlights: ["Kerajinan kayu", "Seni rakyat", "Upacara lokal"],
    video: {
      youtubeId: "dQw4w9WgXcQ",
      title: "Panaragan: Woodcraft & Folk Arts Traditions",
      description: "Discover the rich folk arts and woodcraft traditions of Panaragan.",
      duration: "11:50",
      tags: ["Woodcraft", "Folk Arts", "Carving"],
    },
    model3d: {
      sketchfabId: "3c5c5c5c5c5c5c5c",
      title: "Panaragan Wooden Sculpture & Carving",
      description: "3D model of traditional Panaragan wooden sculptures.",
      artifactType: "Wooden Sculpture",
      tags: ["Sculpture", "Woodcarving", "Folk Art"],
    },
  },
  pandalungan: {
    displayName: "Pandalungan",
    demographics: {
      population: "± 2.2M (fiksi)",
      area: "6.000 km²",
      density: "367/km²",
      languages: ["Jawa", "Madura", "Indonesia"],
    },
    history: "Perpaduan Jawa—Madura melahirkan dialek, kuliner, dan ritus yang khas tapal kuda.",
    highlights: ["Dialek Pandalungan", "Kuliner pesisir", "Tradisi campuran"],
    video: {
      youtubeId: "dQw4w9WgXcQ",
      title: "Pandalungan: Javanese-Madurese Cultural Fusion",
      description: "Explore the unique cultural fusion of Pandalungan.",
      duration: "13:40",
      tags: ["Cultural Fusion", "Javanese", "Madurese"],
    },
    model3d: {
      sketchfabId: "3c5c5c5c5c5c5c5c",
      title: "Pandalungan Hybrid Architectural Elements",
      description: "Interactive 3D model showcasing the architectural fusion.",
      artifactType: "Architecture & Design",
      tags: ["Architecture", "Fusion", "Design"],
    },
  },
  samin: {
    displayName: "Samin",
    demographics: {
      population: "± 35K (fiksi)",
      area: "380 km²",
      density: "92/km²",
      languages: ["Jawa", "Indonesia"],
    },
    history: "Komunitas Samin dikenal lewat etika kejujuran, laku sederhana, dan sejarah gerakan sosial.",
    highlights: ["Etika Samin", "Pertanian", "Komunitas mandiri"],
    video: {
      youtubeId: "dQw4w9WgXcQ",
      title: "Samin Community: Ethics, Simplicity & Social Movement",
      description: "Learn about the Samin community and their philosophy.",
      duration: "12:20",
      tags: ["Community", "Ethics", "Agriculture"],
    },
    model3d: {
      sketchfabId: "3c5c5c5c5c5c5c5c",
      title: "Samin Traditional Agricultural Tools",
      description: "3D model of traditional Samin agricultural tools.",
      artifactType: "Agricultural Tools",
      tags: ["Agriculture", "Tools", "Farming"],
    },
  },
  tengger: {
    displayName: "Tengger",
    demographics: {
      population: "± 110K (fiksi)",
      area: "1.200 km²",
      density: "92/km²",
      languages: ["Jawa Tenggeran", "Indonesia"],
    },
    history: "Komunitas pegunungan dengan ritus Yadnya Kasada dan lanskap Bromo yang sakral.",
    highlights: ["Yadnya Kasada", "Pegunungan Bromo", "Pertanian dataran tinggi"],
    video: {
      youtubeId: "dQw4w9WgXcQ",
      title: "Tengger: Mountain Rituals & Sacred Bromo Landscape",
      description: "Experience the spiritual culture of Tengger communities.",
      duration: "14:10",
      tags: ["Ritual", "Mountain", "Bromo"],
    },
    model3d: {
      sketchfabId: "3c5c5c5c5c5c5c5c",
      title: "Tengger Mount Bromo Sacred Landscape",
      description: "Interactive 3D model of the sacred Mount Bromo landscape.",
      artifactType: "Sacred Landscape",
      tags: ["Landscape", "Mountain", "Bromo"],
    },
  },
}

const subcultures = Object.entries(SUBCULTURE_PROFILES).map(([key, profile]) => ({
  id: key,
  ...profile,
}))

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
          {subcultures.map((subculture, index) => (
            <motion.section
              key={subculture.id}
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
                  <Link href={`/budaya/daerah/${subculture.id}`}>
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
                  {subculture.highlights.map((highlight, i) => (
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
                      {subculture.video.tags.map((tag, i) => (
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
                        {subculture.model3d.tags.map((tag, i) => (
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
                <Link href={`/budaya/daerah/${subculture.id}`}>
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