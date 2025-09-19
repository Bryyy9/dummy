"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Sparkles, Shield, Compass, BookOpen, Music, Utensils, Palette, Globe } from "lucide-react"
import { AnimatedReveal } from "@/components/common/animated-reveal"
import { EnhancedButton } from "@/components/interactive/enhanced-button"
import { ParallaxBackground } from "@/components/common/parallax-background"
import { SafeCanvas } from "@/components/three/safe-canvas"
import { Environment, OrbitControls } from "@react-three/drei"
import { useCulturalStats } from "@/hooks/use-cultural-stats"
import { useNavigation } from "@/hooks/use-navigation"
import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import type { Mesh } from "three"

interface HeroSectionProps {
  onNavClick: (section: string) => void
  showCities: boolean
  onGlobeClick: () => void
  onBackToGlobe: () => void
}

function IndonesianGlobe({ onGlobeClick }: { onGlobeClick: () => void }) {
  const meshRef = useRef<Mesh>(null)

  // Auto rotation animation
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2
    }
  })

  return (
    <mesh
      ref={meshRef}
      onClick={onGlobeClick}
      scale={[2, 2, 2]}
      onPointerOver={(e) => {
        e.stopPropagation()
        document.body.style.cursor = "pointer"
      }}
      onPointerOut={(e) => {
        e.stopPropagation()
        document.body.style.cursor = "auto"
      }}
    >
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial
        color="#4a90e2"
        roughness={0.7}
        metalness={0.1}
        emissive="#001122"
        emissiveIntensity={0.1}
      />
    </mesh>
  )
}

function EastJavaCitiesView({ onBack }: { onBack: () => void }) {
  // 3D cities view implementation would go here
  return (
    <mesh onClick={onBack}>
      <boxGeometry args={[3, 3, 3]} />
      <meshStandardMaterial color="#10b981" />
    </mesh>
  )
}

export function HeroSection({ onNavClick, showCities, onGlobeClick, onBackToGlobe }: HeroSectionProps) {
  const stats = useCulturalStats()
  const { handleGlobeNavigation, handleCategoryNavigation } = useNavigation()

  const handleGlobeInteraction = () => {
    onGlobeClick()
    // Navigate to map page after a short delay to show the interaction
    setTimeout(() => {
      handleGlobeNavigation()
    }, 1000)
  }

  return (
    <section id="beranda" className="pt-16 pb-20 relative overflow-hidden parallax-container" role="banner">
      {/* Background decorations */}
      <ParallaxBackground speed={0.3} className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-32 h-32 opacity-[0.025] rotate-12">
          <div className="w-full h-full text-amber-700 animate-float">
            <svg viewBox="0 0 100 100" className="w-full h-full" fill="currentColor">
              <path d="M50 10 C60 15 65 25 60 35 L65 50 C70 60 65 70 55 75 L50 90 L45 75 C35 70 30 60 35 50 L40 35 C35 25 40 15 50 10 Z" />
              <circle cx="45" cy="30" r="3" fill="white" />
              <circle cx="55" cy="30" r="3" fill="white" />
            </svg>
          </div>
        </div>
      </ParallaxBackground>

      <ParallaxBackground speed={0.5} className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-40 right-20 w-24 h-24 opacity-[0.03] -rotate-45">
          <div className="w-full h-full text-emerald-700 animate-float" style={{ animationDelay: "1s" }}>
            <svg viewBox="0 0 100 100" className="w-full h-full" fill="currentColor">
              <path d="M50 20 Q60 30 50 40 Q40 30 50 20 Z" />
              <path d="M50 60 Q60 70 50 80 Q40 70 50 60 Z" />
              <path d="M20 50 Q30 40 40 50 Q30 60 20 50 Z" />
              <path d="M80 50 Q70 40 60 50 Q70 60 80 50 Z" />
              <circle cx="50" cy="50" r="8" />
            </svg>
          </div>
        </div>
      </ParallaxBackground>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[600px]">
          {/* Content */}
          <AnimatedReveal animation="fade-up" delay={200}>
            <div className="space-y-8">
              <div className="space-y-4">
                <AnimatedReveal animation="slide-right" delay={400}>
                  <div className="flex items-center space-x-2 mb-4">
                    <Badge className="bg-primary/10 text-primary border-primary/20 hover-glow">
                      <Sparkles className="h-3 w-3 mr-1" />
                      Platform Digital Budaya
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-emerald-100/50 text-emerald-700 border-emerald-200 hover-lift"
                    >
                      <Shield className="h-3 w-3 mr-1" />
                      Terpercaya
                    </Badge>
                  </div>
                </AnimatedReveal>

                <AnimatedReveal animation="fade-up" delay={600}>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-manrope)] leading-tight">
                    Warisan Budaya
                    <span className="text-primary block animate-shimmer bg-gradient-to-r from-primary via-amber-500 to-primary bg-clip-text">
                      Jawa Timur
                    </span>
                  </h1>
                </AnimatedReveal>

                <AnimatedReveal animation="fade-up" delay={800}>
                  <p className="text-lg md:text-xl text-muted-foreground max-w-2xl text-pretty leading-relaxed">
                    Jelajahi kekayaan budaya Jawa Timur melalui platform digital yang inovatif. Temukan kesenian
                    tradisional, kuliner khas, bahasa daerah, dan warisan budaya yang telah diwariskan turun-temurun.
                  </p>
                </AnimatedReveal>
              </div>

              {/* Features */}
              <AnimatedReveal animation="scale-up" delay={1000}>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2 group">
                    <div className="w-2 h-2 bg-primary rounded-full group-hover:animate-pulse-glow"></div>
                    <span>Eksplorasi Interaktif</span>
                  </div>
                  <div className="flex items-center space-x-2 group">
                    <div className="w-2 h-2 bg-primary rounded-full group-hover:animate-pulse-glow"></div>
                    <span>Konten Edukatif</span>
                  </div>
                  <div className="flex items-center space-x-2 group">
                    <div className="w-2 h-2 bg-primary rounded-full group-hover:animate-pulse-glow"></div>
                    <span>Mudah Diakses</span>
                  </div>
                  <div className="flex items-center space-x-2 group">
                    <div className="w-2 h-2 bg-primary rounded-full group-hover:animate-pulse-glow"></div>
                    <span>Responsif</span>
                  </div>
                </div>
              </AnimatedReveal>

              {/* Action buttons */}
              <AnimatedReveal animation="bounce-in" delay={1200}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <EnhancedButton
                    size="lg"
                    effect="glow"
                    className="text-lg px-8"
                    onClick={() => onNavClick("eksplorasi")}
                    aria-label="Mulai menjelajahi budaya Jawa Timur"
                  >
                    <Compass className="h-5 w-5 mr-2" />
                    Mulai Eksplorasi Budaya
                  </EnhancedButton>
                  <EnhancedButton
                    variant="outline"
                    size="lg"
                    effect="lift"
                    className="text-lg px-8 bg-transparent"
                    onClick={() => onNavClick("tentang")}
                    aria-label="Pelajari lebih lanjut tentang platform"
                  >
                    <BookOpen className="h-5 w-5 mr-2" />
                    Pelajari Lebih Lanjut
                  </EnhancedButton>
                </div>
              </AnimatedReveal>

              {/* Stats */}
              <AnimatedReveal animation="fade-up" delay={1400}>
                <div className="grid grid-cols-3 gap-6 pt-8">
                  <div className="text-center group hover-lift">
                    <div className="text-2xl font-bold text-primary group-hover:animate-pulse-glow transition-all duration-300">
                      {stats.totalRegions}
                    </div>
                    <div className="text-sm text-muted-foreground">Kabupaten Kota</div>
                  </div>
                  <div className="text-center group hover-lift">
                    <div className="text-2xl font-bold text-primary group-hover:animate-pulse-glow transition-all duration-300">
                      {stats.totalItems}+
                    </div>
                    <div className="text-sm text-muted-foreground">Kesenian Tradisional</div>
                  </div>
                  <div className="text-center group hover-lift">
                    <div className="text-2xl font-bold text-primary group-hover:animate-pulse-glow transition-all duration-300">
                      {stats.categoryStats.find((cat) => cat.category === "Kuliner")?.count || 0}+
                    </div>
                    <div className="text-sm text-muted-foreground">Kuliner Khas</div>
                  </div>
                </div>
              </AnimatedReveal>

              {/* Quick access buttons */}
              <AnimatedReveal animation="slide-left" delay={1600}>
                <div className="flex flex-wrap gap-2 pt-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs hover-glow"
                    onClick={() => handleCategoryNavigation("Tari Tradisional")}
                  >
                    <Music className="h-3 w-3 mr-1" />
                    Tari Tradisional
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs hover-glow"
                    onClick={() => handleCategoryNavigation("Kuliner")}
                  >
                    <Utensils className="h-3 w-3 mr-1" />
                    Kuliner Khas
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs hover-glow"
                    onClick={() => handleCategoryNavigation("Kerajinan")}
                  >
                    <Palette className="h-3 w-3 mr-1" />
                    Kerajinan
                  </Button>
                </div>
              </AnimatedReveal>
            </div>
          </AnimatedReveal>

          {/* 3D Globe */}
          <AnimatedReveal animation="scale-up" delay={800}>
            <div className="h-96 lg:h-[600px] w-full relative">
              <div className="absolute top-4 right-4 z-10">
                <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm hover-lift">
                  <Globe className="h-3 w-3 mr-1" />
                  Interaktif 3D
                </Badge>
              </div>
              <SafeCanvas
                camera={{
                  position: [0, 0, 8],
                  fov: 45,
                  near: 0.1,
                  far: 1000,
                }}
                className="w-full h-full cursor-pointer"
              >
                <ambientLight intensity={0.6} />
                <pointLight position={[10, 10, 10]} intensity={1.2} />
                <pointLight position={[-10, -10, -10]} intensity={0.7} color="#3b82f6" />
                <spotLight position={[0, 15, 5]} intensity={1.0} angle={0.4} penumbra={1} />
                {showCities ? (
                  <EastJavaCitiesView onBack={onBackToGlobe} />
                ) : (
                  <IndonesianGlobe onGlobeClick={handleGlobeInteraction} />
                )}
                <Environment preset="city" />
                <OrbitControls
                  enableZoom={true}
                  minDistance={5}
                  maxDistance={15}
                  autoRotate={!showCities}
                  autoRotateSpeed={0.5}
                  enablePan={false}
                />
              </SafeCanvas>
            </div>
          </AnimatedReveal>
        </div>
      </div>
    </section>
  )
}
