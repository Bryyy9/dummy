"use client"

import { Badge } from "@/components/ui/badge"
import { Sparkles, BookOpen, Play } from "lucide-react"
import { AnimatedReveal } from "@/components/common/animated-reveal"
import { EnhancedButton } from "@/components/interactive/enhanced-button"

interface HeroSectionProps {
  onNavClick: (section: string) => void
}

export function HeroSection({ onNavClick }: HeroSectionProps) {
  return (
    <section id="beranda" className="pt-16 pb-20 relative overflow-hidden min-h-screen" role="banner">
      <div className="absolute inset-0 gradient-dark"></div>
      <div className="absolute inset-0 gradient-mesh"></div>

      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full animate-particle-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${4 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          <AnimatedReveal animation="fade-up" delay={200}>
            <div className="space-y-8">
              <div className="space-y-6">
                <AnimatedReveal animation="slide-right" delay={400}>
                  <div className="flex items-center space-x-2 mb-6">
                    <Badge className="bg-primary/20 text-primary border-primary/30 hover-glow">
                      <Sparkles className="h-3 w-3 mr-1" />
                      For Artists by Artist
                    </Badge>
                  </div>
                </AnimatedReveal>

                <AnimatedReveal animation="fade-up" delay={600}>
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                    THE FUTURE
                    <span className="block text-primary animate-gradient-shift bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                      Warisan Budaya
                    </span>
                    <span className="block">Jawa Timur</span>
                  </h1>
                </AnimatedReveal>

                <AnimatedReveal animation="fade-up" delay={800}>
                  <p className="text-xl text-muted-foreground max-w-2xl text-pretty leading-relaxed">
                    Jelajahi kekayaan budaya Jawa Timur melalui platform digital yang inovatif. Temukan kesenian tradisional, kuliner khas, bahasa daerah, dan warisan budaya yang telah diwariskan turun-temurun.
                  </p>
                </AnimatedReveal>
              </div>

              <AnimatedReveal animation="bounce-in" delay={1000}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <EnhancedButton
                    size="lg"
                    effect="glow"
                    className="text-lg px-8 py-4 gradient-purple"
                    onClick={() => onNavClick("eksplorasi")}
                    aria-label="Mulai eksplorasi"
                  >
                    <Play className="h-5 w-5 mr-2" />
                    Mulai Eksplorasi
                  </EnhancedButton>
                  <EnhancedButton
                    variant="outline"
                    size="lg"
                    effect="lift"
                    className="text-lg px-8 py-4 border-primary/30 hover:bg-primary/10"
                    onClick={() => onNavClick("tentang")}
                    aria-label="Pelajari lebih lanjut"
                  >
                    <BookOpen className="h-5 w-5 mr-2" />
                    Pelajari Lebih Lanjut
                  </EnhancedButton>
                </div>
              </AnimatedReveal>

              <AnimatedReveal animation="fade-up" delay={1200}>
                <div className="grid grid-cols-3 gap-8 pt-8">
                  <div className="text-center group hover-lift">
                    <div className="text-3xl font-bold text-primary group-hover:animate-pulse-glow transition-all duration-300">
                      7k+
                    </div>
                    <div className="text-sm text-muted-foreground">Creators</div>
                  </div>
                  <div className="text-center group hover-lift">
                    <div className="text-3xl font-bold text-primary group-hover:animate-pulse-glow transition-all duration-300">
                      42k+
                    </div>
                    <div className="text-sm text-muted-foreground">Artworks</div>
                  </div>
                  <div className="text-center group hover-lift">
                    <div className="text-3xl font-bold text-primary group-hover:animate-pulse-glow transition-all duration-300">
                      84k+
                    </div>
                    <div className="text-sm text-muted-foreground">Collections</div>
                  </div>
                </div>
              </AnimatedReveal>
            </div>
          </AnimatedReveal>

          {/* Panel visual pengganti globe 3D */}
          <AnimatedReveal animation="scale-up" delay={800}>
            <div className="h-96 lg:h-[600px] w-full relative rounded-xl border bg-card/50 backdrop-blur-sm flex items-center justify-center">
              <div className="text-center space-y-4 px-6">
                <Badge variant="secondary" className="bg-card/80 border-border">Highlight</Badge>
                <h3 className="text-2xl font-bold">Warisan Budaya Jawa Timur</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Section Globe 3D kini tersedia di bawah. Klik globe untuk menuju halaman Peta Budaya.
                </p>
              </div>
            </div>
          </AnimatedReveal>
        </div>
      </div>
    </section>
  )
}