"use client"

import { Badge } from "@/components/ui/badge"
import { Sparkles, BookOpen, Globe, Play, Users, TrendingUp } from "lucide-react"
import { AnimatedReveal } from "@/components/common/animated-reveal"
import { EnhancedButton } from "@/components/interactive/enhanced-button"
import { SafeCanvas } from "@/components/three/safe-canvas"
import { Environment, OrbitControls, Html } from "@react-three/drei"
import { useCulturalStats } from "@/hooks/use-cultural-stats"
import { useNavigation } from "@/hooks/use-navigation"
import { useRef, useState, Suspense } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import type { Group } from "three"
import * as THREE from "three"

interface HeroSectionProps {
  onNavClick: (section: string) => void
  showCities: boolean
  onGlobeClick: () => void
  onBackToGlobe: () => void
}

function LoadingSpinner() {
  return (
    <Html center>
      <div className="flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <span className="ml-2 text-sm text-muted-foreground">Loading 3D Sphere...</span>
      </div>
    </Html>
  )
}

function ModernSphere({ onGlobeClick }: { onGlobeClick: () => void }) {
  const groupRef = useRef<Group>(null)
  const sphereRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const [isZooming, setIsZooming] = useState(false)
  const [zoomStartTime, setZoomStartTime] = useState(0)
  const { camera } = useThree()

  useFrame((state, delta) => {
    if (groupRef.current && !isZooming) {
      // Smooth rotation and floating
      groupRef.current.rotation.y += delta * (hovered ? 0.15 : 0.08)
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.1

      // Scale on hover
      const targetScale = hovered ? 1.1 : 1
      groupRef.current.scale.lerp({ x: targetScale, y: targetScale, z: targetScale }, 0.1)
    }

    if (isZooming && groupRef.current) {
      const elapsed = state.clock.elapsedTime - zoomStartTime
      const duration = 2
      const progress = Math.min(elapsed / duration, 1)

      const easeOut = 1 - Math.pow(1 - progress, 3)

      const startScale = 1.5
      const endScale = 5
      const currentScale = startScale + (endScale - startScale) * easeOut
      groupRef.current.scale.setScalar(currentScale)

      groupRef.current.rotation.y += delta * (0.8 + easeOut * 1.5)

      if (progress >= 1) {
        onGlobeClick()
      }
    }

    // Dynamic material color based on time
    if (sphereRef.current) {
      const material = sphereRef.current.material as THREE.MeshStandardMaterial
      const time = state.clock.elapsedTime
      const r = Math.sin(time * 0.5) * 0.3 + 0.4
      const g = Math.sin(time * 0.3 + 2) * 0.3 + 0.4
      const b = Math.sin(time * 0.7 + 4) * 0.3 + 0.7
      material.color.setRGB(r, g, b)
      material.emissiveIntensity = hovered ? 0.3 : 0.1
    }
  })

  const handleClick = (e: any) => {
    e.stopPropagation()
    if (!isZooming) {
      setIsZooming(true)
      setZoomStartTime(performance.now() / 1000)
    }
  }

  return (
    <group
      ref={groupRef}
      onClick={handleClick}
      onPointerOver={(e) => {
        e.stopPropagation()
        setHovered(true)
        document.body.style.cursor = "pointer"
      }}
      onPointerOut={(e) => {
        e.stopPropagation()
        setHovered(false)
        document.body.style.cursor = "auto"
      }}
      scale={[1.5, 1.5, 1.5]}
    >
      {/* Main sphere */}
      <mesh ref={sphereRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          color="#6366f1"
          roughness={0.2}
          metalness={0.8}
          emissive="#6366f1"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Outer glow ring */}
      <mesh scale={[1.2, 1.2, 1.2]}>
        <torusGeometry args={[1, 0.02, 16, 100]} />
        <meshBasicMaterial color="#8b5cf6" transparent opacity={hovered ? 0.8 : 0.4} />
      </mesh>

      {/* Floating particles around sphere */}
      {Array.from({ length: 8 }, (_, i) => {
        const angle = (i / 8) * Math.PI * 2
        const radius = 2
        return (
          <mesh key={i} position={[Math.cos(angle) * radius, Math.sin(i * 0.5) * 0.3, Math.sin(angle) * radius]}>
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshBasicMaterial color="#a855f7" transparent opacity={0.6} />
          </mesh>
        )
      })}

      {/* Atmosphere glow */}
      <mesh scale={[1.3, 1.3, 1.3]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#6366f1" transparent opacity={hovered ? 0.15 : 0.08} side={THREE.BackSide} />
      </mesh>
    </group>
  )
}

function FloatingUICards() {
  const groupRef = useRef<Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2
    }
  })

  return (
    <group ref={groupRef}>
      {/* Floating card 1 */}
      <Html position={[3, 1, 0]} transform occlude>
        <div className="bg-card/80 backdrop-blur-sm border border-border rounded-lg p-3 w-32 hover-lift">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 bg-primary rounded-full"></div>
            <span className="text-xs font-medium">NFT #1234</span>
          </div>
          <div className="text-xs text-muted-foreground">0.5 ETH</div>
        </div>
      </Html>

      {/* Floating card 2 */}
      <Html position={[-3, -1, 0]} transform occlude>
        <div className="bg-card/80 backdrop-blur-sm border border-border rounded-lg p-3 w-32 hover-lift">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-primary" />
            <span className="text-xs font-medium">7k+ Users</span>
          </div>
          <div className="text-xs text-muted-foreground">Active Community</div>
        </div>
      </Html>

      {/* Floating card 3 */}
      <Html position={[2, -2, -1]} transform occlude>
        <div className="bg-card/80 backdrop-blur-sm border border-border rounded-lg p-3 w-32 hover-lift">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-xs font-medium">42k+ Sales</span>
          </div>
          <div className="text-xs text-muted-foreground">Volume</div>
        </div>
      </Html>
    </group>
  )
}

export function HeroSection({ onNavClick, showCities, onGlobeClick, onBackToGlobe }: HeroSectionProps) {
  const stats = useCulturalStats()
  const { handleGlobeNavigation, handleCategoryNavigation } = useNavigation()

  const handleGlobeInteraction = () => {
    setTimeout(() => {
      handleGlobeNavigation()
    }, 2000)
  }

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
                    aria-label="Start exploring NFT collections"
                  >
                    <Play className="h-5 w-5 mr-2" />
                    Explore Collections
                  </EnhancedButton>
                  <EnhancedButton
                    variant="outline"
                    size="lg"
                    effect="lift"
                    className="text-lg px-8 py-4 border-primary/30 hover:bg-primary/10"
                    onClick={() => onNavClick("tentang")}
                    aria-label="Learn more about the platform"
                  >
                    <BookOpen className="h-5 w-5 mr-2" />
                    Learn More
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

          <AnimatedReveal animation="scale-up" delay={800}>
            <div className="h-96 lg:h-[600px] w-full relative">
              <SafeCanvas
                camera={{
                  position: [0, 0, 6],
                  fov: 50,
                  near: 0.1,
                  far: 1000,
                }}
                className="w-full h-full cursor-pointer"
                gl={{
                  antialias: true,
                  alpha: true,
                  powerPreference: "high-performance",
                }}
              >
                <ambientLight intensity={0.3} />
                <pointLight position={[10, 10, 10]} intensity={1.2} color="#6366f1" />
                <pointLight position={[-10, -10, -10]} intensity={0.8} color="#8b5cf6" />
                <spotLight position={[0, 20, 10]} intensity={1} angle={0.3} penumbra={1} color="#a855f7" />

                <Suspense fallback={<LoadingSpinner />}>
                  <ModernSphere onGlobeClick={handleGlobeInteraction} />
                  <FloatingUICards />
                </Suspense>

                <Environment preset="night" />

                <OrbitControls
                  enableZoom={true}
                  minDistance={4}
                  maxDistance={12}
                  autoRotate={true}
                  autoRotateSpeed={0.5}
                  enablePan={false}
                  enableDamping={true}
                  dampingFactor={0.05}
                  rotateSpeed={0.5}
                  zoomSpeed={0.8}
                  minPolarAngle={Math.PI * 0.2}
                  maxPolarAngle={Math.PI * 0.8}
                />
              </SafeCanvas>

              <div className="absolute top-4 right-4 z-10">
                <Badge variant="secondary" className="bg-card/80 backdrop-blur-sm border-border hover-lift">
                  <Globe className="h-3 w-3 mr-1" />
                  Interactive 3D
                </Badge>
              </div>

              <div className="absolute bottom-4 left-4 z-10">
                <div className="bg-card/80 backdrop-blur-sm border border-border px-4 py-3 rounded-lg text-sm space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                    <span className="text-muted-foreground">Drag to rotate</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2 h-2 bg-accent rounded-full animate-pulse"
                      style={{ animationDelay: "0.5s" }}
                    ></div>
                    <span className="text-muted-foreground">Click to explore</span>
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
