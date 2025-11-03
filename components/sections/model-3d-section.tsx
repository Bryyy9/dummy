// components/ui/model-3d-section.tsx
"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Maximize2, RotateCcw, ZoomIn, ZoomOut, Info } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface Model3D {
  id: string
  title: string
  description: string
  artifactType?: string
  tags?: string[]
  embedUrl?: string
  thumbnailUrl?: string
}

interface Model3DSectionProps {
  models: Model3D[]
  title?: string
  description?: string
  subcultureName?: string
  className?: string
  showControls?: boolean
  autoRotate?: boolean
  height?: string
}

export function Model3DSection({
  models,
  title = "3D Cultural Artifacts & Environments",
  description,
  subcultureName,
  className,
  showControls = true,
  autoRotate = true,
  height = "600px",
}: Model3DSectionProps) {
  const [currentModelIndex, setCurrentModelIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showInfo, setShowInfo] = useState(true)

  if (!models || models.length === 0) {
    return (
      <div className={cn("text-center py-12", className)}>
        <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
          <RotateCcw className="w-8 h-8 text-muted-foreground" />
        </div>
        <p className="text-muted-foreground">No 3D models available</p>
      </div>
    )
  }

  const currentModel = models[currentModelIndex]
  const hasMultipleModels = models.length > 1

  const getSketchfabEmbedUrl = (modelId: string) => {
    return `https://sketchfab.com/models/${modelId}/embed?autospin=${autoRotate ? 1 : 0}&autostart=1&ui_theme=dark&ui_hint=0`
  }

  const goToPrevious = () => {
    setCurrentModelIndex((prev) => (prev === 0 ? models.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentModelIndex((prev) => (prev + 1) % models.length)
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  return (
    <section className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex-1">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              {title}
            </h3>
            {description && (
              <p className="text-muted-foreground leading-relaxed">
                {description || `Explore interactive 3D models of cultural artifacts and environments from ${subcultureName || 'the region'}.`}
              </p>
            )}
          </div>

          {/* Navigation Controls */}
          {hasMultipleModels && (
            <div className="flex items-center gap-2">
              <Button
                onClick={goToPrevious}
                variant="outline"
                size="sm"
                className="cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Badge variant="secondary" className="px-3">
                {currentModelIndex + 1} / {models.length}
              </Badge>
              <Button
                onClick={goToNext}
                variant="outline"
                size="sm"
                className="cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* 3D Viewer */}
      <motion.div
        key={currentModel.id}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="space-y-4"
      >
        {/* Model Container */}
        <Card className="overflow-hidden border-border bg-card/60 backdrop-blur-sm">
          <div className={cn(
            "relative w-full bg-gradient-to-br from-muted/50 to-muted/20",
            isFullscreen && "fixed inset-0 z-50 rounded-none"
          )}>
            {/* 3D Iframe */}
            <div 
              className="relative w-full" 
              style={{ height: isFullscreen ? '100vh' : height }}
            >
              <iframe
                key={`model-${currentModel.id}`}
                src={currentModel.embedUrl || getSketchfabEmbedUrl(currentModel.id)}
                title={currentModel.title}
                className="absolute top-0 left-0 w-full h-full border-0"
                allow="autoplay; fullscreen; xr-spatial-tracking"
                allowFullScreen
              />
            </div>

            {/* Floating Controls */}
            {showControls && (
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <Button
                  onClick={toggleFullscreen}
                  variant="secondary"
                  size="sm"
                  className="cursor-pointer backdrop-blur-sm bg-background/80 hover:bg-background/90"
                >
                  <Maximize2 className="w-4 h-4" />
                </Button>
                <Button
                  onClick={() => setShowInfo(!showInfo)}
                  variant="secondary"
                  size="sm"
                  className="cursor-pointer backdrop-blur-sm bg-background/80 hover:bg-background/90"
                >
                  <Info className="w-4 h-4" />
                </Button>
              </div>
            )}

            {/* Model Info Overlay */}
            {showInfo && !isFullscreen && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-4 left-4 right-4 bg-background/90 backdrop-blur-md border border-border rounded-lg p-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground mb-1">
                      {currentModel.title}
                    </h4>
                    {currentModel.artifactType && (
                      <Badge variant="outline" className="text-xs mb-2">
                        {currentModel.artifactType}
                      </Badge>
                    )}
                  </div>
                  <button
                    onClick={() => setShowInfo(false)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    ×
                  </button>
                </div>
              </motion.div>
            )}

            {/* Loading Indicator */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
            </div>
          </div>
        </Card>

        {/* Model Details */}
        <Card className="bg-card/60 backdrop-blur-sm border-border">
          <div className="p-6 space-y-4">
            <div>
              <h4 className="text-xl font-bold text-foreground mb-2">
                {currentModel.title}
              </h4>
              <p className="text-muted-foreground leading-relaxed">
                {currentModel.description}
              </p>
            </div>

            {/* Tags */}
            {currentModel.tags && currentModel.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
                {currentModel.tags.map((tag, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            {/* Interaction Tips */}
            <div className="pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground mb-2 font-medium">
                Interaction Tips:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <RotateCcw className="w-3 h-3" />
                  <span>Drag to rotate</span>
                </div>
                <div className="flex items-center gap-1">
                  <ZoomIn className="w-3 h-3" />
                  <span>Scroll to zoom</span>
                </div>
                <div className="flex items-center gap-1">
                  <Maximize2 className="w-3 h-3" />
                  <span>Click for fullscreen</span>
                </div>
                <div className="flex items-center gap-1">
                  <Info className="w-3 h-3" />
                  <span>Toggle info</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Model Thumbnails */}
      {hasMultipleModels && (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-foreground">
            More 3D Models
          </h4>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {models.map((model, index) => (
              <motion.button
                key={model.id}
                onClick={() => setCurrentModelIndex(index)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "group relative overflow-hidden rounded-xl transition-all",
                  "bg-gradient-to-br from-muted/50 to-muted/20 border-2",
                  currentModelIndex === index
                    ? "border-primary shadow-lg"
                    : "border-border hover:border-primary/50"
                )}
              >
                <div className="aspect-square relative">
                  {model.thumbnailUrl ? (
                    <img
                      src={model.thumbnailUrl}
                      alt={model.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <RotateCcw className="w-8 h-8 text-muted-foreground animate-spin" />
                    </div>
                  )}

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* Current Indicator */}
                  {currentModelIndex === index && (
                    <div className="absolute top-2 right-2 bg-primary text-white text-xs px-2 py-1 rounded">
                      Active
                    </div>
                  )}
                </div>

                <div className="p-3 border-t border-border">
                  <p className="text-sm font-medium text-foreground text-left line-clamp-2 group-hover:text-primary transition-colors">
                    {model.title}
                  </p>
                  {model.artifactType && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {model.artifactType}
                    </p>
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}