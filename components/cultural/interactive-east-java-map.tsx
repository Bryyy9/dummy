"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search } from "lucide-react"

interface Region {
  id: string
  name: string
  coordinates: { x: number; y: number }
  color: string
  culturalElements: string[]
  description: string
}

interface InteractiveEastJavaMapProps {
  regions: Region[]
  selectedRegion: string | null
  onRegionClick: (regionId: string) => void
  zoom: number
  center: { x: number; y: number }
  searchQuery: string
}

export function InteractiveEastJavaMap({
  regions,
  selectedRegion,
  onRegionClick,
  zoom,
  center,
  searchQuery,
}: InteractiveEastJavaMapProps) {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null)
  const [mapTransform, setMapTransform] = useState({ scale: 1, translateX: 0, translateY: 0 })

  // Update map transform based on zoom and center
  useEffect(() => {
    const scale = zoom
    const translateX = (50 - center.x) * scale * 4
    const translateY = (50 - center.y) * scale * 4

    setMapTransform({ scale, translateX, translateY })
  }, [zoom, center])

  // Filter regions based on search
  const filteredRegions = regions.filter(
    (region) =>
      !searchQuery ||
      region.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      region.culturalElements.some((element) => element.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* SVG Map Container */}
      <motion.div
        className="absolute inset-0"
        animate={{
          scale: mapTransform.scale,
          x: mapTransform.translateX,
          y: mapTransform.translateY,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full" style={{ minWidth: "100%", minHeight: "100%" }}>
          {/* East Java Outline */}
          <path
            d="M10,30 L90,30 L90,80 L70,85 L50,80 L30,85 L10,75 Z"
            fill="rgba(0, 59, 92, 0.1)"
            stroke="#003b5c"
            strokeWidth="0.5"
            className="transition-all duration-300"
          />

          {/* Coastal Lines */}
          <path d="M10,30 Q30,25 50,30 Q70,35 90,30" fill="none" stroke="#00a3e0" strokeWidth="0.3" opacity="0.6" />
          <path d="M10,75 Q30,80 50,75 Q70,70 90,80" fill="none" stroke="#00a3e0" strokeWidth="0.3" opacity="0.6" />

          {/* Region Markers */}
          {filteredRegions.map((region) => {
            const isSelected = selectedRegion === region.id
            const isHovered = hoveredRegion === region.id
            const isHighlighted =
              searchQuery &&
              (region.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                region.culturalElements.some((element) => element.toLowerCase().includes(searchQuery.toLowerCase())))

            return (
              <g key={region.id}>
                {/* Region Circle */}
                <motion.circle
                  cx={region.coordinates.x}
                  cy={region.coordinates.y}
                  r={isSelected ? 4 : isHovered ? 3.5 : 3}
                  fill={region.color}
                  stroke={isSelected ? "#ff6b35" : isHighlighted ? "#ffd700" : "white"}
                  strokeWidth={isSelected ? 2 : isHighlighted ? 1.5 : 1}
                  className="cursor-pointer transition-all duration-200"
                  onClick={() => onRegionClick(region.id)}
                  onMouseEnter={() => setHoveredRegion(region.id)}
                  onMouseLeave={() => setHoveredRegion(null)}
                  animate={{
                    scale: isSelected ? 1.2 : isHovered ? 1.1 : 1,
                    opacity: isHighlighted ? 1 : 0.9,
                  }}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                />

                {/* Region Label */}
                <motion.text
                  x={region.coordinates.x}
                  y={region.coordinates.y - 6}
                  textAnchor="middle"
                  className="text-xs font-semibold fill-current pointer-events-none"
                  fill={isSelected ? "#ff6b35" : "#003b5c"}
                  animate={{
                    opacity: isSelected || isHovered || zoom > 1.5 ? 1 : 0.7,
                    fontSize: isSelected ? "0.9rem" : "0.7rem",
                  }}
                >
                  {region.name}
                </motion.text>

                {/* Cultural Elements Indicator */}
                {(isSelected || isHovered) && (
                  <motion.circle
                    cx={region.coordinates.x + 4}
                    cy={region.coordinates.y - 4}
                    r="1.5"
                    fill="#ffd700"
                    stroke="white"
                    strokeWidth="0.5"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                  />
                )}

                {/* Search Highlight Ring */}
                {isHighlighted && (
                  <motion.circle
                    cx={region.coordinates.x}
                    cy={region.coordinates.y}
                    r="6"
                    fill="none"
                    stroke="#ffd700"
                    strokeWidth="1"
                    opacity="0.6"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1.2, opacity: 0.6 }}
                    transition={{
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                      duration: 1.5,
                    }}
                  />
                )}
              </g>
            )
          })}

          {/* Search Results Connections */}
          {searchQuery && filteredRegions.length > 1 && (
            <g opacity="0.3">
              {filteredRegions.slice(0, -1).map((region, index) => {
                const nextRegion = filteredRegions[index + 1]
                return (
                  <motion.line
                    key={`connection-${region.id}-${nextRegion.id}`}
                    x1={region.coordinates.x}
                    y1={region.coordinates.y}
                    x2={nextRegion.coordinates.x}
                    y2={nextRegion.coordinates.y}
                    stroke="#ffd700"
                    strokeWidth="0.5"
                    strokeDasharray="2,2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                  />
                )
              })}
            </g>
          )}
        </svg>
      </motion.div>

      {/* Hover Tooltip */}
      <AnimatePresence>
        {hoveredRegion && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute pointer-events-none z-10"
            style={{
              left: "50%",
              top: "20%",
              transform: "translateX(-50%)",
            }}
          >
            {(() => {
              const region = regions.find((r) => r.id === hoveredRegion)
              if (!region) return null

              return (
                <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border p-3 max-w-xs">
                  <h4 className="font-semibold text-[#003b5c] mb-1">{region.name}</h4>
                  <p className="text-xs text-muted-foreground mb-2">{region.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {region.culturalElements.slice(0, 3).map((element, index) => (
                      <span key={index} className="text-xs bg-[#00a3e0]/10 text-[#003b5c] px-2 py-1 rounded">
                        {element}
                      </span>
                    ))}
                    {region.culturalElements.length > 3 && (
                      <span className="text-xs text-muted-foreground">
                        +{region.culturalElements.length - 3} lainnya
                      </span>
                    )}
                  </div>
                </div>
              )
            })()}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Indicator */}
      {searchQuery && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-4 left-4 bg-yellow-100 border border-yellow-300 rounded-lg px-3 py-2 text-sm"
        >
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-yellow-600" />
            <span className="text-yellow-800">
              Ditemukan {filteredRegions.length} hasil untuk "{searchQuery}"
            </span>
          </div>
        </motion.div>
      )}
    </div>
  )
}
