"use client"

import { Badge } from "@/components/ui/badge"
import { EnhancedButton } from "@/components/interactive/enhanced-button"
import { SafeCanvas } from "@/components/three/safe-canvas"
import { Environment, OrbitControls, Html } from "@react-three/drei"
import { useRef, useState, Suspense } from "react"
import { useFrame } from "@react-three/fiber"
import type { Group } from "three"
import * as THREE from "three"
import { Globe, Users, TrendingUp } from "lucide-react"
import { AnimatedReveal } from "@/components/common/animated-reveal"
import { useNavigation } from "@/hooks/use-navigation"

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

function ModernSphere({ onDone }: { onDone: () => void }) {
  const groupRef = useRef<Group>(null)
  const sphereRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const [isZooming, setIsZooming] = useState(false)
  const [zoomStart, setZoomStart] = useState(0)

  useFrame((state, delta) => {
    if (groupRef.current && !isZooming) {
      groupRef.current.rotation.y += delta * (hovered ? 0.15 : 0.08)
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.1
      const targetScale = hovered ? 1.1 : 1
      groupRef.current.scale.lerp({ x: targetScale, y: targetScale, z: targetScale }, 0.1)
    }

    if (isZooming && groupRef.current) {
      const elapsed = state.clock.elapsedTime - zoomStart
      const duration = 2
      const progress = Math.min(elapsed / duration, 1)
      const easeOut = 1 - Math.pow(1 - progress, 3)
      const startScale = 1.5
      const endScale = 5
      const currentScale = startScale + (endScale - startScale) * easeOut
      groupRef.current.scale.setScalar(currentScale)
      groupRef.current.rotation.y += delta * (0.8 + easeOut * 1.5)
      if (progress >= 1) onDone()
    }

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
      setZoomStart(performance.now() / 1000)
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
      <mesh ref={sphereRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial color="#6366f1" roughness={0.2} metalness={0.8} emissive="#6366f1" emissiveIntensity={0.1} />
      </mesh>

      <mesh scale={[1.2, 1.2, 1.2]}>
        <torusGeometry args={[1, 0.02, 16, 100]} />
        <meshBasicMaterial color="#8b5cf6" transparent opacity={hovered ? 0.8 : 0.4} />
      </mesh>

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
      <Html position={[3, 1, 0]} transform occlude>
        <div className="bg-card/80 backdrop-blur-sm border border-border rounded-lg p-3 w-32 hover-lift">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-primary" />
            <span className="text-xs font-medium">7k+ Users</span>
          </div>
          <div className="text-xs text-muted-foreground">Active Community</div>
        </div>
      </Html>
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

export function GlobeSection() {
  const { handleGlobeNavigation } = useNavigation()
  const goToMap = () => {
    // dipanggil setelah animasi zoom selesai
    handleGlobeNavigation()
  }

  return (
    <section id="eksplorasi" className="py-20 bg-muted/30 relative scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatedReveal animation="fade-up">
          <div className="text-center mb-10">
            <Badge variant="secondary" className="bg-card/80 backdrop-blur-sm border-border">
              <Globe className="h-3 w-3 mr-1" />
              Peta Budaya Interaktif
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mt-4">Jelajahi Lewat Globe 3D</h2>
            <p className="text-lg text-muted-foreground mt-2">
              Klik globe untuk masuk ke halaman peta budaya dan mulai eksplorasi daerah.
            </p>
          </div>
        </AnimatedReveal>

        <AnimatedReveal animation="scale-up" delay={200}>
          <div className="h-96 lg:h-[600px] w-full relative">
            <SafeCanvas
              camera={{ position: [0, 0, 6], fov: 50, near: 0.1, far: 1000 }}
              className="w-full h-full cursor-pointer"
              gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
            >
              <ambientLight intensity={0.3} />
              <pointLight position={[10, 10, 10]} intensity={1.2} color="#6366f1" />
              <pointLight position={[-10, -10, -10]} intensity={0.8} color="#8b5cf6" />
              <spotLight position={[0, 20, 10]} intensity={1} angle={0.3} penumbra={1} color="#a855f7" />

              <Suspense fallback={<LoadingSpinner />}>
                <ModernSphere onDone={goToMap} />
                <FloatingUICards />
              </Suspense>

              <Environment preset="night" />
              <OrbitControls
                enableZoom
                minDistance={4}
                maxDistance={12}
                autoRotate
                autoRotateSpeed={0.5}
                enablePan={false}
                enableDamping
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
          </div>
        </AnimatedReveal>
      </div>
    </section>
  )
}