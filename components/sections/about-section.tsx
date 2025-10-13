"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Users, BookOpen, Globe, Award, Sparkles } from "lucide-react"
import { AnimatedReveal } from "@/components/common/animated-reveal"
import { EnhancedButton } from "@/components/interactive/enhanced-button"
import { TeamTickerSection } from "@/components/sections/team-ticker-section"

interface AboutSectionProps {
  onNavClick: (section: string) => void
}

export function AboutSection({ onNavClick }: AboutSectionProps) {
  const members = [
    { name: "Rizky Pratama", role: "Koordinator Riset" },
    { name: "Sari Wulandari", role: "Kurator Konten" },
    { name: "Bima Nugraha", role: "Pengembang Frontend" },
    { name: "Dewi Anindya", role: "Desain UI/UX" },
    { name: "Haryo Putra", role: "Pengembang Backend" },
    { name: "Nadia Safitri", role: "Dokumentasi & Arsip" },
    { name: "Galih Mahendra", role: "Analis Data" },
    { name: "Putri Larasati", role: "Relasi Komunitas" },
  ]
  return (
    <section
      id="tentang"
      className="py-20 bg-gradient-to-br from-background via-muted/30 to-background relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 opacity-[0.03] rotate-12">
          <div className="w-full h-full text-primary animate-float">
            <svg viewBox="0 0 100 100" className="w-full h-full" fill="currentColor">
              <path d="M50 10 C60 15 65 25 60 35 L65 50 C70 60 65 70 55 75 L50 90 L45 75 C35 70 30 60 35 50 L40 35 C35 25 40 15 50 10 Z" />
              <circle cx="45" cy="30" r="3" fill="white" />
              <circle cx="55" cy="30" r="3" fill="white" />
            </svg>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <AnimatedReveal animation="fade-up" delay={200}>
            <Badge className="bg-primary/10 text-primary border-primary/20 mb-4">
              <Heart className="h-3 w-3 mr-1" />
              About the Platform
            </Badge>
          </AnimatedReveal>

          <AnimatedReveal animation="fade-up" delay={400}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">
              Preserving Cultural Heritage
              <span className="text-primary block">East Java</span>
            </h2>
          </AnimatedReveal>

          <AnimatedReveal animation="fade-up" delay={600}>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
              A digital platform dedicated to preserving, documenting, and introducing the cultural wealth of East Java
              to present and future generations.
            </p>
          </AnimatedReveal>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <AnimatedReveal animation="slide-up" delay={800}>
            <Card className="border-0 shadow-lg hover-lift bg-gradient-to-br from-background to-muted/50">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Complete Documentation</h3>
                <p className="text-muted-foreground text-pretty">
                  Collecting and documenting various aspects of East Java's culture, from art and cuisine to local
                  traditions.
                </p>
              </CardContent>
            </Card>
          </AnimatedReveal>

          <AnimatedReveal animation="slide-up" delay={1000}>
            <Card className="border-0 shadow-lg hover-lift bg-gradient-to-br from-background to-muted/50">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Community Collaboration</h3>
                <p className="text-muted-foreground text-pretty">
                  Involving the community, cultural practitioners, and academics in sustainable cultural preservation
                  efforts
                </p>
              </CardContent>
            </Card>
          </AnimatedReveal>

          <AnimatedReveal animation="slide-up" delay={1200}>
            <Card className="border-0 shadow-lg hover-lift bg-gradient-to-br from-background to-muted/50">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-8 w-8 text-amber-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Global Access</h3>
                <p className="text-muted-foreground text-pretty">
                  Introducing East Java's culture to the world through an easily accessible digital platform.
                </p>
              </CardContent>
            </Card>
          </AnimatedReveal>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <AnimatedReveal animation="slide-right" delay={1400}>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">Our Vision & Mission</h3>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">Vision:</strong> To be the leading digital platform for the
                    preservation and promotion of East Java's culture.
                  </p>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">Mission:</strong>To document, conserve, and showcase the rich
                    cultural heritage of East Java to the world.
                  </p>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">Objective:</strong>To enhance public appreciation and
                    understanding of local cultural heritage.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedReveal>

          <AnimatedReveal animation="slide-left" delay={1600}>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-6 bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg">
                <Award className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">Documented Cultures</div>
              </div>

              <div className="text-center p-6 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg">
                <Users className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-emerald-600">38</div>
                <div className="text-sm text-muted-foreground">Regions/Cities</div>
              </div>

              <div className="text-center p-6 bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg">
                <BookOpen className="h-8 w-8 text-amber-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-amber-600">12</div>
                <div className="text-sm text-muted-foreground">Cultural Categories</div>
              </div>

              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                <Sparkles className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-600">100+</div>
                <div className="text-sm text-muted-foreground">Contributors</div>
              </div>
            </div>
          </AnimatedReveal>
        </div>

        <AnimatedReveal animation="fade-up" delay={1800}>
          <div className="text-center mt-16">
            <EnhancedButton size="lg" effect="glow" className="text-lg px-8" onClick={() => onNavClick("eksplorasi")}>
              <Globe className="h-5 w-5 mr-2" />
              Start Cultural Exploration
            </EnhancedButton>
          </div>
        </AnimatedReveal>

        <div className="mt-16 lg:mt-20">
          <AnimatedReveal animation="fade-up" delay={2000}>
            <TeamTickerSection members={members} />
          </AnimatedReveal>
        </div>
      </div>
    </section>
  )
}
