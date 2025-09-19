"use client"

import { Canvas } from "@react-three/fiber"
import { Suspense, useEffect, useState } from "react"
import type { ReactNode } from "react"

interface SafeCanvasProps {
  children: ReactNode
  camera?: any
  className?: string
  style?: React.CSSProperties
}

function LoadingFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-muted/20 rounded-lg">
      <div className="text-center space-y-4">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto" />
        <p className="text-sm text-muted-foreground">Memuat visualisasi 3D...</p>
      </div>
    </div>
  )
}

export function SafeCanvas({ children, camera, className, style }: SafeCanvasProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
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
            powerPreference: "high-performance"
          }}
          dpr={[1, 2]}
          performance={{ min: 0.5 }}
          style={{ width: '100%', height: '100%' }} // Pastikan Canvas mengisi container
          resize={{ scroll: false, debounce: { scroll: 50, resize: 0 } }}
        >
          <Suspense fallback={null}>
            {children}
          </Suspense>
        </Canvas>
      </Suspense>
    </div>
  )
}
