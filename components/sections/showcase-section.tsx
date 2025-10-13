"use client"

import { Badge } from "@/components/ui/badge"
import { EnhancedButton } from "@/components/interactive/enhanced-button"
import { AnimatedReveal } from "@/components/common/animated-reveal"

export function ShowcaseSection() {
  const logos = [
    { src: "/partner-logo-1.png", alt: "Partner Logo 1" },
    { src: "/partner-logo-2.png", alt: "Partner Logo 2" },
    { src: "/partner-logo-abstract-geometric.png", alt: "Partner Logo 3" },
    { src: "/partner-logo-abstract-geometric.png", alt: "Partner Logo 4" },
    { src: "/partner-logo-abstract-5.png", alt: "Partner Logo 5" },
    { src: "/partner-logo-6.png", alt: "Partner Logo 6" },
  ]

  return (
    <section
      aria-labelledby="showcase-heading"
      className="relative py-20 bg-gradient-to-b from-background via-muted/20 to-background overflow-hidden"
    >
      {/* Subtle animated background accents */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 rounded-full bg-amber-200/20 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <AnimatedReveal animation="fade-up" delay={150}>
            <Badge className="bg-primary/10 text-primary border-primary/20">Discover • Explore • Connect</Badge>
          </AnimatedReveal>

          <AnimatedReveal animation="fade-up" delay={300}>
            <h2 id="showcase-heading" className="text-3xl md:text-4xl font-bold text-balance">
              A Gateway to Cultural Discovery
              <span className="block text-primary">Stories, Places, and Living Heritage</span>
            </h2>
          </AnimatedReveal>

          <AnimatedReveal animation="fade-up" delay={450}>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed text-pretty">
              Navigate a world of traditions, artifacts, and events from every region. Enjoy a sleek, modern experience
              with beautiful visuals and intuitive navigation across devices.
            </p>
          </AnimatedReveal>
        </div>

        {/* Bento-style grid with subtle motion and immersive imagery */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
          <AnimatedReveal animation="slide-right" delay={300}>
            <article
              className="md:col-span-4 relative rounded-2xl overflow-hidden bg-muted/30 border border-border/60"
              aria-label="Feature: Interactive Cultural Map"
            >
              <div
                className="aspect-[16/9] md:aspect-[16/8] bg-cover bg-center transition-transform duration-700 hover:scale-[1.03]"
                style={{
                  backgroundImage: "url('/immersive-cultural-map-with-diverse-patterns.jpg')",
                }}
                role="img"
                aria-label="Immersive cultural map with diverse patterns"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/20 to-transparent" />
              <div className="absolute inset-x-6 bottom-6">
                <h3 className="text-xl md:text-2xl font-semibold">Explore the Cultural Map</h3>
                <p className="text-sm text-muted-foreground max-w-prose mt-2">
                  Pan, zoom, and select regions to uncover curated stories about identity, history, and significance.
                </p>
                <div className="mt-4">
                  <EnhancedButton size="sm" className="px-4">
                    Open Map
                  </EnhancedButton>
                </div>
              </div>
            </article>
          </AnimatedReveal>

          <AnimatedReveal animation="slide-left" delay={350}>
            <article
              className="md:col-span-2 relative rounded-2xl overflow-hidden bg-muted/30 border border-border/60"
              aria-label="Feature: Curated Collections"
            >
              <div
                className="aspect-[16/9] md:aspect-[4/5] bg-cover bg-center transition-transform duration-700 hover:scale-[1.03]"
                style={{
                  backgroundImage: "url('/curated-cultural-collection-artifacts.jpg')",
                }}
                role="img"
                aria-label="Curated cultural collection artifacts"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/20 to-transparent" />
              <div className="absolute inset-x-5 bottom-5">
                <h3 className="text-lg md:text-xl font-semibold">Curated Collections</h3>
                <p className="text-sm text-muted-foreground">
                  Browse themed galleries of artifacts, textiles, music, and culinary heritage.
                </p>
              </div>
            </article>
          </AnimatedReveal>

          <AnimatedReveal animation="slide-right" delay={400}>
            <article
              className="md:col-span-2 relative rounded-2xl overflow-hidden bg-muted/30 border border-border/60"
              aria-label="Feature: Live Events"
            >
              <div
                className="aspect-[16/9] md:aspect-[4/5] bg-cover bg-center transition-transform duration-700 hover:scale-[1.03]"
                style={{
                  backgroundImage: "url('/traditional-festival-with-performers.jpg')",
                }}
                role="img"
                aria-label="Traditional festival with performers"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/20 to-transparent" />
              <div className="absolute inset-x-5 bottom-5">
                <h3 className="text-lg md:text-xl font-semibold">Live Events</h3>
                <p className="text-sm text-muted-foreground">
                  Find festivals and performances that bring culture to life around you.
                </p>
              </div>
            </article>
          </AnimatedReveal>

          <AnimatedReveal animation="slide-left" delay={450}>
            <article
              className="md:col-span-4 relative rounded-2xl overflow-hidden bg-muted/30 border border-border/60"
              aria-label="Feature: Stories & Oral Histories"
            >
              <div
                className="aspect-[16/9] md:aspect-[16/8] bg-cover bg-center transition-transform duration-700 hover:scale-[1.03]"
                style={{
                  backgroundImage: "url('/oral-histories-and-storytelling-sessions.jpg')",
                }}
                role="img"
                aria-label="Oral histories and storytelling sessions"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/20 to-transparent" />
              <div className="absolute inset-x-6 bottom-6">
                <h3 className="text-xl md:text-2xl font-semibold">Stories & Oral Histories</h3>
                <p className="text-sm text-muted-foreground max-w-prose mt-2">
                  Dive into deeply researched narratives recorded with local communities and cultural bearers.
                </p>
              </div>
            </article>
          </AnimatedReveal>
        </div>

        <div className="group relative mt-12">
          {/* Edge fade for visual polish */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent" />

          <div
            className="marquee relative overflow-hidden rounded-xl border border-border/60 bg-muted/20"
            aria-label="Scrolling partner logos"
          >
            {/* Track: duplicated content for seamless loop */}
            <div className="marquee-track flex items-center gap-10 md:gap-14 py-6 will-change-transform">
              {Array.from({ length: 2 }).map((_, dup) =>
                logos.map((logo, i) => (
                  <div
                    key={`${dup}-${i}`}
                    className="flex-shrink-0 opacity-80 hover:opacity-100 transition-opacity duration-200"
                    aria-hidden={dup === 1 ? true : undefined}
                  >
                    <img
                      src={logo.src || "/placeholder.svg"}
                      alt={logo.alt}
                      height={48}
                      width={120}
                      className="h-12 w-[120px] object-contain"
                    />
                  </div>
                )),
              )}
            </div>
          </div>
        </div>

        {/* Optional CTA below ticker for continuity with page style */}
        <AnimatedReveal animation="fade-up" delay={600}>
          <div className="text-center mt-10">
            <EnhancedButton size="lg" effect="glow" className="px-8">
              Start Exploring
            </EnhancedButton>
          </div>
        </AnimatedReveal>
      </div>

      <style jsx>{`
        @keyframes marquee-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .marquee-track {
          animation: marquee-left 30s linear infinite;
        }
        /* Pause on hover for better interaction */
        .group:hover .marquee-track {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}
