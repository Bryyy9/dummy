"use client"

import { Badge } from "@/components/ui/badge"
import { Globe } from "lucide-react"
import { AnimatedReveal } from "@/components/common/animated-reveal"
import { useNavigation } from "@/hooks/use-navigation"
import dynamic from "next/dynamic"

// Dynamically import the globe component to avoid SSR issues
const InteractiveGlobe = dynamic(
  () => import("../three/interactive-globe").then((mod) => ({ default: mod.InteractiveGlobe })),
  {
    ssr: false,
    loading: () => (
      <div className="h-96 lg:h-[600px] w-full relative flex items-center justify-center bg-muted/20 rounded-lg">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto" />
          <p className="text-sm text-muted-foreground">Loading 3D Globe...</p>
        </div>
      </div>
    ),
  }
)

export function GlobeSection() {
  const { handleGlobeNavigation } = useNavigation()

  return (
    <section id="eksplorasi" className="py-20 bg-muted/30 relative scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatedReveal animation="fade-up">
          <div className="text-center mb-10">
            <Badge variant="secondary" className="bg-card/80 backdrop-blur-sm border-border">
              <Globe className="h-3 w-3 mr-1" />
              Interactive Cultural Map
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mt-4">Explore East Java Through 3D Globe</h2>
            <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
              Navigate our interactive 3D globe to discover cultural regions of East Java. 
              Click on the highlighted cities to explore their unique heritage and traditions.
            </p>
          </div>
        </AnimatedReveal>

        <AnimatedReveal animation="scale-up" delay={200}>
          <InteractiveGlobe onGlobeClick={handleGlobeNavigation} />
        </AnimatedReveal>

        {/* Additional Info */}
        <AnimatedReveal animation="fade-up" delay={400}>
          <div className="mt-12 grid md:grid-cols-3 gap-6 text-center">
            <div className="bg-card/60 rounded-lg p-6 border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">5 Major Cities</h3>
              <p className="text-sm text-muted-foreground">
                Explore cultural heritage from Surabaya, Malang, Banyuwangi, Ponorogo, and Lamongan
              </p>
            </div>
            
            <div className="bg-card/60 rounded-lg p-6 border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-6 h-6 text-primary">🏛️</div>
              </div>
              <h3 className="font-semibold mb-2">Rich Cultural Data</h3>
              <p className="text-sm text-muted-foreground">
                Discover traditional arts, cuisine, language, music, and crafts from each region
              </p>
            </div>
            
            <div className="bg-card/60 rounded-lg p-6 border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-6 h-6 text-primary">🗺️</div>
              </div>
              <h3 className="font-semibold mb-2">Interactive Experience</h3>
              <p className="text-sm text-muted-foreground">
                Rotate, zoom, and click to navigate through East Java's cultural landscape
              </p>
            </div>
          </div>
        </AnimatedReveal>
      </div>
    </section>
  )
}