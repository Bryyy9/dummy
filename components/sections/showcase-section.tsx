"use client"

import type React from "react"

import { Badge } from "@/components/ui/badge"
import { AnimatedReveal } from "@/components/common/animated-reveal"
import { useState, useRef } from "react"

export function ShowcaseSection() {
  const [hoveredLogoIndex, setHoveredLogoIndex] = useState<number | null>(null)
  const [tooltipPosition, setTooltipPosition] = useState<"top" | "bottom">("top")
  const [tooltipAlignment, setTooltipAlignment] = useState<"left" | "center" | "right">("center")
  const tooltipRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const logos = [
    { src: "/partner-logo-1.png", alt: "Partner Logo 1" },
    { src: "/partner-logo-2.png", alt: "Partner Logo 2" },
    { src: "/partner-logo-abstract-geometric.png", alt: "Partner Logo 3" },
    { src: "/partner-logo-abstract-geometric.png", alt: "Partner Logo 4" },
    { src: "/partner-logo-abstract-5.png", alt: "Partner Logo 5" },
    { src: "/partner-logo-6.png", alt: "Partner Logo 6" },
  ]

  const handleMouseEnter = (index: number, event: React.MouseEvent) => {
    setHoveredLogoIndex(index)

    const element = event.currentTarget as HTMLElement
    const rect = element.getBoundingClientRect()
    const tooltipHeight = 48
    const spaceAbove = rect.top

    if (spaceAbove < tooltipHeight + 20) {
      setTooltipPosition("bottom")
    } else {
      setTooltipPosition("top")
    }

    const spaceLeft = rect.left
    const spaceRight = window.innerWidth - rect.right
    const tooltipWidth = 160 // approximate width of tooltip

    if (spaceLeft < tooltipWidth / 2 + 20) {
      setTooltipAlignment("left")
    } else if (spaceRight < tooltipWidth / 2 + 20) {
      setTooltipAlignment("right")
    } else {
      setTooltipAlignment("center")
    }
  }

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
      </div>

      <div className="group relative mt-12 w-screen -ml-[calc((100vw-100%)/2)] overflow-visible">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

        <div
          ref={containerRef}
          className="marquee relative overflow-visible w-full border-y border-border/60 bg-muted/20"
          aria-label="Scrolling partner logos"
        >
          <div className="marquee-track flex items-center gap-10 md:gap-14 py-6 will-change-transform px-8 sm:px-12 lg:px-16">
            {Array.from({ length: 2 }).map((_, dup) =>
              logos.map((logo, i) => {
                const logoIndex = i
                const isHovered = hoveredLogoIndex === logoIndex

                return (
                  <div
                    key={`${dup}-${i}`}
                    className="flex-shrink-0 opacity-80 hover:opacity-100 transition-opacity duration-200 relative group/logo"
                    aria-hidden={dup === 1 ? true : undefined}
                    onMouseEnter={(e) => handleMouseEnter(logoIndex, e)}
                    onMouseLeave={() => setHoveredLogoIndex(null)}
                  >
                    <img
                      src={logo.src || "/placeholder.svg"}
                      alt={logo.alt}
                      height={48}
                      width={120}
                      className="h-12 w-[120px] object-contain"
                    />

                    {isHovered && (
                      <div
                        ref={tooltipRef}
                        className={`absolute z-50 pointer-events-auto ${
                          tooltipPosition === "top" ? "bottom-full mb-3" : "top-full mt-3"
                        } ${
                          tooltipAlignment === "left"
                            ? "left-0"
                            : tooltipAlignment === "right"
                              ? "right-0"
                              : "left-1/2 -translate-x-1/2"
                        }`}
                      >
                        <div className="relative">
                          <div className="px-4 py-2.5 bg-foreground text-background text-sm font-semibold rounded-lg whitespace-normal max-w-xs shadow-xl border border-foreground/30 backdrop-blur-md animate-in fade-in zoom-in-95 duration-200">
                            {logo.alt}
                            <div
                              className={`absolute w-0 h-0 border-l-3 border-r-3 border-l-transparent border-r-transparent ${
                                tooltipAlignment === "left"
                                  ? "left-4"
                                  : tooltipAlignment === "right"
                                    ? "right-4"
                                    : "left-1/2 -translate-x-1/2"
                              } ${
                                tooltipPosition === "top"
                                  ? "top-full border-t-3 border-t-foreground"
                                  : "bottom-full border-b-3 border-b-foreground"
                              }`}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )
              }),
            )}
          </div>
        </div>
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
