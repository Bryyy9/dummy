"use client"

import { Suspense, useEffect, useState } from "react"
import type { ReactNode } from "react"

interface SafeCanvasProps {
  children: ReactNode
  camera?: any
  className?: string
  style?: React.CSSProperties
  gl?: any
}

function LoadingFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-muted/20 rounded-lg">
      <div className="text-center space-y-4">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto" />
        <p className="text-sm text-muted-foreground">Loading 3D visualization...</p>
      </div>
    </div>
  )
}

export function SafeCanvas({ children, camera, className, style, gl }: SafeCanvasProps) {
  const [isMounted, setIsMounted] = useState(false)
  const [isSupported, setIsSupported] = useState(true)
  const [Canvas, setCanvas] = useState<any>(null)

  useEffect(() => {
    // Check for WebGL support
    try {
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      if (!context) {
        setIsSupported(false)
      }
    } catch (e) {
      setIsSupported(false)
    }
    
    // Dynamic import Canvas
    import('@react-three/fiber').then((module) => {
      setCanvas(() => module.Canvas)
      setIsMounted(true)
    }).catch((err) => {
      console.error('Failed to load Canvas:', err)
      setIsSupported(false)
      setIsMounted(true)
    })
  }, [])

  // Return loading fallback during SSR and initial client render
  if (!isMounted || !isSupported || !Canvas) {
    return <LoadingFallback />
  }

  return (
    <div className={className} style={style}>
      <Suspense fallback={<LoadingFallback />}>
        <Canvas
          camera={camera || { position: [0, 0, 6], fov: 50 }}
          gl={{ 
            antialias: true, 
            alpha: true,
            powerPreference: "high-performance",
            failIfMajorPerformanceCaveat: false,
            ...gl
          }}
          dpr={[1, 2]}
          performance={{ min: 0.5 }}
          style={{ width: '100%', height: '100%' }}
          resize={{ scroll: false, debounce: { scroll: 50, resize: 0 } }}
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0) // Transparent background
          }}
          frameloop="demand"
        >
          <Suspense fallback={null}>
            {children}
          </Suspense>
        </Canvas>
      </Suspense>
    </div>
  )
}