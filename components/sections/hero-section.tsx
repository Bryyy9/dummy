"use client"

import { Badge } from "@/components/ui/badge"
import { Sparkles, Play, ArrowRight } from "lucide-react"
import { AnimatedReveal } from "@/components/common/animated-reveal"
import { EnhancedButton } from "@/components/interactive/enhanced-button"

interface HeroSectionProps {
  onNavClick: (section: string) => void
}

export function HeroSection({ onNavClick }: HeroSectionProps) {
  return (
    <section id="beranda" className="pt-16 pb-20 relative overflow-hidden min-h-screen" role="banner">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(31, 41, 55, 0.7), rgba(31, 41, 55, 0.8)), url('/east-java-temple-sunset-landscape-with-traditional.jpg')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-background/90" />
      </div>

      {/* Cultural pattern overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='batik-pattern' x='0' y='0' width='120' height='120' patternUnits='userSpaceOnUse'%3E%3Ccircle cx='20' cy='20' r='8' fill='%23ca8a04' opacity='0.4'/%3E%3Ccircle cx='60' cy='60' r='12' fill='%23ca8a04' opacity='0.3'/%3E%3Ccircle cx='100' cy='20' r='6' fill='%23ca8a04' opacity='0.5'/%3E%3Ccircle cx='20' cy='100' r='10' fill='%23ca8a04' opacity='0.2'/%3E%3Cpath d='M40 40 Q60 20 80 40 Q60 60 40 40' fill='none' stroke='%23ca8a04' strokeWidth='2' opacity='0.3'/%3E%3Cpath d='M80 80 Q100 60 120 80 Q100 100 80 80' fill='none' stroke='%23ca8a04' strokeWidth='2' opacity='0.3'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23batik-pattern)'/%3E%3C/svg%3E")`,
          }}
        />
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
                      Nusantara Cultural Heritage
                    </Badge>
                  </div>
                </AnimatedReveal>

                <AnimatedReveal animation="fade-up" delay={600}>
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-white">East Java</h1>
                  <p className="text-xl text-gray-200 max-w-2xl text-pretty leading-relaxed mt-6">
                    East Java is an Indonesian province rich in cultural heritage, from traditional arts to distinctive
                    cuisine. Explore the diversity passed down through generations via this innovative digital platform.
                  </p>
                </AnimatedReveal>
              </div>

              <AnimatedReveal animation="bounce-in" delay={1000}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <EnhancedButton
                    size="lg"
                    effect="glow"
                    className="text-lg px-8 py-4 bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 transition-all duration-300"
                    onClick={() => onNavClick("eksplorasi")}
                    aria-label="View gallery"
                  >
                    <Play className="h-5 w-5 mr-2" />
                    Gallery
                  </EnhancedButton>
                </div>
              </AnimatedReveal>

             
            </div>
          </AnimatedReveal>

          <AnimatedReveal animation="scale-up" delay={800}>
            <div className="space-y-4">
              {/* Main destination card */}
              <div className="relative h-64 rounded-xl overflow-hidden group cursor-pointer">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{
                    backgroundImage: `url('/mount-bromo-sunrise-volcanic-landscape-east-java.jpg')`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white text-xl font-bold mb-2">Bromo Tengger</h3>
                  <EnhancedButton
                    size="sm"
                    className="bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30"
                    onClick={() => onNavClick("eksplorasi")}
                  >
                    Explore
                  </EnhancedButton>
                </div>
              </div>

              {/* Secondary destination cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="relative h-32 rounded-xl overflow-hidden group cursor-pointer">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{
                      backgroundImage: `url('/malang-traditional-architecture-and-cultural-herit.jpg')`,
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2">
                    <h4 className="text-white text-sm font-bold mb-1">Panaragan</h4>
                    <EnhancedButton
                      size="sm"
                      className="bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 text-xs px-3 py-1"
                      onClick={() => onNavClick("eksplorasi")}
                    >
                      Explore
                    </EnhancedButton>
                  </div>
                </div>

                <div className="relative h-32 rounded-xl overflow-hidden group cursor-pointer">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{
                      backgroundImage: `url('/surabaya-modern-city-with-traditional-cultural-ele.jpg')`,
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2">
                    <h4 className="text-white text-sm font-bold mb-1">Arekan</h4>
                    <EnhancedButton
                      size="sm"
                      className="bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 text-xs px-3 py-1"
                      onClick={() => onNavClick("eksplorasi")}
                    >
                      Explore
                    </EnhancedButton>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedReveal>
        </div>
      </div>
    </section>
  )
}
