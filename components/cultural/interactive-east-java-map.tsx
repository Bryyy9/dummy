"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, MapPin } from "lucide-react"

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
  const [animationPhase, setAnimationPhase] = useState(0)

  // Update map transform based on zoom and center
  useEffect(() => {
    const scale = zoom
    const translateX = (50 - center.x) * scale * 4
    const translateY = (50 - center.y) * scale * 4

    setMapTransform({ scale, translateX, translateY })
  }, [zoom, center])

  useEffect(() => {
    const timer1 = setTimeout(() => setAnimationPhase(1), 300)
    const timer2 = setTimeout(() => setAnimationPhase(2), 600)
    const timer3 = setTimeout(() => setAnimationPhase(3), 900)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [])

  // Filter regions based on search
  const filteredRegions = regions.filter(
    (region) =>
      !searchQuery ||
      region.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      region.culturalElements.some((element) => element.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <div className="relative w-full h-full overflow-hidden bg-gradient-to-br from-blue-50 to-cyan-50">
      {/* SVG Map Container */}
      <motion.div
        className="absolute inset-0"
        animate={{
          scale: mapTransform.scale,
          x: mapTransform.translateX,
          y: mapTransform.translateY,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full" style={{ minWidth: "100%", minHeight: "100%" }}>
          {/* East Java Outline */}
          <motion.path
            d="M15,35 Q25,30 35,32 Q45,28 55,30 Q65,25 75,28 Q85,30 90,35 L88,45 Q85,50 82,55 L85,65 Q88,70 85,75 Q80,80 75,78 Q70,82 65,80 Q60,85 55,82 Q50,88 45,85 Q40,82 35,85 Q30,80 25,78 Q20,75 18,70 Q15,65 18,60 Q15,55 18,50 Q15,45 18,40 Q15,38 15,35 Z"
            fill="rgba(0, 59, 92, 0.1)"
            stroke="#003b5c"
            strokeWidth="0.8"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: animationPhase >= 1 ? 1 : 0,
              opacity: animationPhase >= 1 ? 1 : 0,
            }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />

          {/* Coastal Lines */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: animationPhase >= 2 ? 0.6 : 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <path
              d="M15,35 Q30,30 45,32 Q60,28 75,30 Q85,32 90,35"
              fill="none"
              stroke="#00a3e0"
              strokeWidth="0.4"
              strokeDasharray="2,1"
            />
            <path
              d="M18,70 Q35,75 50,72 Q65,78 82,75"
              fill="none"
              stroke="#00a3e0"
              strokeWidth="0.4"
              strokeDasharray="2,1"
            />

            {/* Mountain ranges */}
            <path
              d="M25,45 L30,40 L35,45 L40,38 L45,45 L50,35 L55,45 L60,40 L65,45"
              fill="none"
              stroke="#8b5cf6"
              strokeWidth="0.3"
              opacity="0.4"
            />
          </motion.g>

          {/* Region Markers */}
          {filteredRegions.map((region, index) => {
            const isSelected = selectedRegion === region.id
            const isHovered = hoveredRegion === region.id
            const isHighlighted =
              searchQuery &&
              (region.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                region.culturalElements.some((element) => element.toLowerCase().includes(searchQuery.toLowerCase())))

            return (
              <motion.g
                key={region.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: animationPhase >= 3 ? 1 : 0,
                  opacity: animationPhase >= 3 ? 1 : 0,
                }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
              >
                {/* Ripple effect for selected region */}
                {isSelected && (
                  <motion.circle
                    cx={region.coordinates.x}
                    cy={region.coordinates.y}
                    r="8"
                    fill="none"
                    stroke="#ff6b35"
                    strokeWidth="1"
                    opacity="0.4"
                    animate={{
                      r: [6, 12, 6],
                      opacity: [0.6, 0.2, 0.6],
                    }}
                    transition={{
                      repeat: Number.POSITIVE_INFINITY,
                      duration: 2,
                      ease: "easeInOut",
                    }}
                  />
                )}

                {/* Region Circle */}
                <motion.circle
                  cx={region.coordinates.x}
                  cy={region.coordinates.y}
                  r={isSelected ? 4.5 : isHovered ? 4 : 3.5}
                  fill={region.color}
                  stroke={isSelected ? "#ff6b35" : isHighlighted ? "#ffd700" : "white"}
                  strokeWidth={isSelected ? 2.5 : isHighlighted ? 2 : 1.5}
                  className="cursor-pointer transition-all duration-300"
                  onClick={() => onRegionClick(region.id)}
                  onMouseEnter={() => setHoveredRegion(region.id)}
                  onMouseLeave={() => setHoveredRegion(null)}
                  animate={{
                    scale: isSelected ? 1.3 : isHovered ? 1.2 : 1,
                    opacity: isHighlighted ? 1 : 0.9,
                  }}
                  whileHover={{ scale: 1.25 }}
                  whileTap={{ scale: 0.9 }}
                  filter={isSelected ? "drop-shadow(0 0 8px rgba(255, 107, 53, 0.6))" : "none"}
                />

                {/* Region Label */}
                <motion.text
                  x={region.coordinates.x}
                  y={region.coordinates.y - 7}
                  textAnchor="middle"
                  className="text-xs font-bold fill-current pointer-events-none"
                  fill={isSelected ? "#ff6b35" : "#003b5c"}
                  animate={{
                    opacity: isSelected || isHovered || zoom > 1.5 ? 1 : 0.8,
                    fontSize: isSelected ? "1rem" : "0.8rem",
                    y: isSelected ? region.coordinates.y - 8 : region.coordinates.y - 7,
                  }}
                  style={{
                    textShadow: "1px 1px 2px rgba(255,255,255,0.8)",
                    fontWeight: isSelected ? "800" : "600",
                  }}
                >
                  {region.name}
                </motion.text>

                {/* Cultural Elements Indicator */}
                {(isSelected || isHovered) && (
                  <motion.g
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                  >
                    <circle
                      cx={region.coordinates.x + 5}
                      cy={region.coordinates.y - 5}
                      r="2"
                      fill="#ffd700"
                      stroke="white"
                      strokeWidth="0.8"
                    />
                    <MapPin
                      x={region.coordinates.x + 3.5}
                      y={region.coordinates.y - 6.5}
                      width="3"
                      height="3"
                      fill="#ff6b35"
                    />
                  </motion.g>
                )}

                {/* Search Highlight Ring */}
                {isHighlighted && (
                  <motion.circle
                    cx={region.coordinates.x}
                    cy={region.coordinates.y}
                    r="7"
                    fill="none"
                    stroke="#ffd700"
                    strokeWidth="1.5"
                    opacity="0.8"
                    animate={{
                      r: [6, 9, 6],
                      opacity: [0.8, 0.4, 0.8],
                    }}
                    transition={{
                      repeat: Number.POSITIVE_INFINITY,
                      duration: 1.5,
                      ease: "easeInOut",
                    }}
                  />
                )}
              </motion.g>
            )
          })}

          {/* Search Results Connections */}
          {searchQuery && filteredRegions.length > 1 && (
            <motion.g opacity="0.4" initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} transition={{ delay: 1 }}>
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
                    strokeWidth="1"
                    strokeDasharray="3,2"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.6 }}
                    transition={{ duration: 1.5, delay: index * 0.3 }}
                  />
                )
              })}
            </motion.g>
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
