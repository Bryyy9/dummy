"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Sparkles, Shield, Compass, BookOpen, Music, Utensils, Palette, Globe } from "lucide-react"
import { AnimatedReveal } from "@/components/common/animated-reveal"
import { EnhancedButton } from "@/components/interactive/enhanced-button"
import { ParallaxBackground } from "@/components/common/parallax-background"
import { SafeCanvas } from "@/components/three/safe-canvas"
import { Environment, OrbitControls, Html, useTexture } from "@react-three/drei"
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
        <span className="ml-2 text-sm text-muted-foreground">Loading Earth...</span>
      </div>
    </Html>
  )
}

function RealisticEarthGlobe({ onGlobeClick }: { onGlobeClick: () => void }) {
  const groupRef = useRef<Group>(null)
  const earthRef = useRef<THREE.Mesh>(null)
  const cloudsRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const [isZooming, setIsZooming] = useState(false)
  const [zoomStartTime, setZoomStartTime] = useState(0)
  const { camera } = useThree()

  const earthTexture = useTexture("/textures/TERRE_baseColor.jpeg")
  const cloudsTexture = useTexture("/textures/NUAGES_baseColor.png")
  const normalTexture = useTexture("/textures/TERRE_emissive.jpeg")
  const roughnessTexture = useTexture("/textures/TERRE_metallicRoughness.png")

  useFrame((state, delta) => {
    if (groupRef.current && !isZooming) {
      // Normal rotation and floating
      groupRef.current.rotation.y += delta * (hovered ? 0.08 : 0.12)
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.08
      
      // Smooth scale transition on hover
      const targetScale = hovered ? 1.03 : 1
      groupRef.current.scale.lerp({ x: targetScale, y: targetScale, z: targetScale }, 0.08)
    }

    if (isZooming && groupRef.current) {
      const elapsed = state.clock.elapsedTime - zoomStartTime
      const duration = 1.8 // Reduced from 2 seconds
      const progress = Math.min(elapsed / duration, 1)
      
      // Smooth easing function (ease-out cubic)
      const easeOut = 1 - Math.pow(1 - progress, 2.5)

      // Smooth scale transition
      const startScale = 2
      const endScale = 4.5 // Reduced from 10
      const currentScale = startScale + (endScale - startScale) * easeOut
      groupRef.current.scale.setScalar(currentScale)

      // Gentle rotation acceleration
      groupRef.current.rotation.y += delta * (0.5 + easeOut * 1.2)

      // Smooth camera movement
      const startZ = 8
      const endZ = 5.5 // Less dramatic zoom
      const targetZ = startZ - (startZ - endZ) * easeOut
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.06)

      // Add subtle floating during zoom
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * (0.15 * easeOut)

      if (progress >= 1) {
        onGlobeClick()
      }
    }

    // Clouds rotation
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += delta * 0.03
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
      scale={[2, 2, 2]}
      rotation={[Math.PI, 0, 0]}
    >
      <mesh ref={earthRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          map={earthTexture}
          normalMap={normalTexture}
          roughnessMap={roughnessTexture}
          roughness={0.8}
          metalness={0.1}
          emissive="#001122"
          emissiveIntensity={0.1}
        />
      </mesh>

      <mesh ref={cloudsRef} scale={[1.01, 1.01, 1.01]}>
        <sphereGeometry args={[32, 32]} />
        <meshStandardMaterial
          map={cloudsTexture}
          transparent
          opacity={0.4}
          alphaMap={cloudsTexture}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Subtle atmosphere glow */}
      <mesh scale={[1.02, 1.02, 1.02]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial 
          color="#4a90e2" 
          transparent 
          opacity={hovered ? 0.12 : 0.06} 
          side={THREE.BackSide} 
        />
      </mesh>

      {/* Subtle particle effect during zoom */}
      {isZooming && (
        <group>
          {Array.from({ length: 12 }, (_, i) => (
            <mesh 
              key={i} 
              position={[
                (Math.random() - 0.5) * 3, 
                (Math.random() - 0.5) * 3, 
                (Math.random() - 0.5) * 3
              ]}
            >
              <sphereGeometry args={[0.015, 8, 8]} />
              <meshBasicMaterial 
                color="#4a90e2" 
                transparent 
                opacity={0.4} 
              />
            </mesh>
          ))}
        </group>
      )}
    </group>
  )
}

function FallbackEarthGlobe({ onGlobeClick }: { onGlobeClick: () => void }) {
  const groupRef = useRef<Group>(null)
  const [hovered, setHovered] = useState(false)
  const [isZooming, setIsZooming] = useState(false)
  const [zoomStartTime, setZoomStartTime] = useState(0)
  const { camera } = useThree()

  useFrame((state, delta) => {
    if (groupRef.current && !isZooming) {
      groupRef.current.rotation.y += delta * (hovered ? 0.08 : 0.12)
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.08
      const targetScale = hovered ? 1.03 : 1
      groupRef.current.scale.lerp({ x: targetScale, y: targetScale, z: targetScale }, 0.08)
    }

    if (isZooming && groupRef.current) {
      const elapsed = state.clock.elapsedTime - zoomStartTime
      const duration = 1.8
      const progress = Math.min(elapsed / duration, 1)
      const easeOut = 1 - Math.pow(1 - progress, 2.5)

      const startScale = 2
      const endScale = 4.5
      const currentScale = startScale + (endScale - startScale) * easeOut
      groupRef.current.scale.setScalar(currentScale)
      groupRef.current.rotation.y += delta * (0.5 + easeOut * 1.2)

      const startZ = 8
      const endZ = 5.5
      const targetZ = startZ - (startZ - endZ) * easeOut
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.06)

      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * (0.15 * easeOut)

      if (progress >= 1) {
        onGlobeClick()
      }
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
      scale={[2, 2, 2]}
      rotation={[Math.PI, 0, 0]}
    >
      <mesh>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          color="#4a90e2"
          roughness={0.7}
          metalness={0.1}
          emissive="#001122"
          emissiveIntensity={0.1}
        />
      </mesh>

      <mesh scale={[1.02, 1.02, 1.02]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial 
          color="#4a90e2" 
          transparent 
          opacity={hovered ? 0.12 : 0.06} 
          side={THREE.BackSide} 
        />
      </mesh>
    </group>
  )
}

function EarthGlobeWithFallback({ onGlobeClick }: { onGlobeClick: () => void }) {
  return (
    <Suspense fallback={<FallbackEarthGlobe onGlobeClick={onGlobeClick} />}>
      <RealisticEarthGlobe onGlobeClick={onGlobeClick} />
    </Suspense>
  )
}

function EastJavaCitiesView({ onBack }: { onBack: () => void }) {
  const groupRef = useRef<Group>(null)

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2 // Reduced rotation speed
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1 // Reduced floating
    }
  })

  return (
    <group ref={groupRef} onClick={onBack}>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial
          color="#10b981"
          emissive="#064e3b"
          emissiveIntensity={0.2}
          roughness={0.3}
          metalness={0.1}
        />
      </mesh>

      {Array.from({ length: 8 }, (_, i) => {
        const angle = (i / 8) * Math.PI * 2
        const radius = 4
        return (
          <mesh key={i} position={[Math.cos(angle) * radius, Math.sin(i * 0.5) * 0.5, Math.sin(angle) * radius]}>
            <boxGeometry args={[0.8, 1.5, 0.8]} />
            <meshStandardMaterial color="#059669" emissive="#065f46" emissiveIntensity={0.1} />
          </mesh>
        )
      })}

      <Html position={[0, 3, 0]} center>
        <div className="bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-muted-foreground">
          Click to return to Earth
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
    }, 1800) // Reduced delay to match new animation duration
  }

  return (
    <section id="beranda" className="pt-16 pb-20 relative overflow-hidden parallax-container" role="banner">
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

          <AnimatedReveal animation="scale-up" delay={800}>
            <div className="h-96 lg:h-[600px] w-full relative">
              <div className="absolute top-4 right-4 z-10">
                <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm hover-lift">
                  <Globe className="h-3 w-3 mr-1" />
                  Interactive 3D Earth
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
                gl={{
                  antialias: true,
                  alpha: true,
                  powerPreference: "high-performance",
                }}
              >
                <ambientLight intensity={0.4} />
                <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
                <pointLight position={[-10, -10, -10]} intensity={0.8} color="#4a90e2" />
                <spotLight position={[0, 20, 10]} intensity={1.2} angle={0.3} penumbra={1} color="#fbbf24" />
                <directionalLight position={[5, 5, 5]} intensity={0.6} color="#ffffff" />

                <Suspense fallback={<LoadingSpinner />}>
                  {showCities ? (
                    <EastJavaCitiesView onBack={onBackToGlobe} />
                  ) : (
                    <EarthGlobeWithFallback onGlobeClick={handleGlobeInteraction} />
                  )}
                </Suspense>

                <Environment preset="sunset" />

                <OrbitControls
                  enableZoom={true}
                  minDistance={5}
                  maxDistance={15}
                  autoRotate={!showCities}
                  autoRotateSpeed={0.2} // Reduced auto-rotate speed
                  enablePan={false}
                  enableDamping={true}
                  dampingFactor={0.08} // Increased damping for smoother controls
                  rotateSpeed={0.4} // Reduced rotate speed
                  zoomSpeed={0.6} // Reduced zoom speed
                  minPolarAngle={Math.PI * 0.2}
                  maxPolarAngle={Math.PI * 0.8}
                />
              </SafeCanvas>

              <div className="absolute bottom-4 left-4 z-10">
                <div className="bg-background/80 backdrop-blur-sm px-3 py-2 rounded-lg text-xs text-muted-foreground space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                    <span>Drag to rotate</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2 h-2 bg-secondary rounded-full animate-pulse"
                      style={{ animationDelay: "0.5s" }}
                    ></div>
                    <span>Scroll to zoom</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2 h-2 bg-accent rounded-full animate-pulse"
                      style={{ animationDelay: "1s" }}
                    ></div>
                    <span>Click for smooth zoom</span>
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