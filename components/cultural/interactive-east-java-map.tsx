"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, MapPin } from "lucide-react"
import { subRegionMappings } from "@/data/sub-culture"

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
  backgroundSrc?: string
}

export function InteractiveEastJavaMap({
  regions,
  selectedRegion,
  onRegionClick,
  zoom,
  center,
  searchQuery,
  backgroundSrc = "/maps/jawa-perprovinsi-subculture.svg",
}: InteractiveEastJavaMapProps) {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null)
  const [mapTransform, setMapTransform] = useState({ scale: 1, translateX: 0, translateY: 0 })
  const [animationPhase, setAnimationPhase] = useState(0)
  const [svgInner, setSvgInner] = useState<string | null>(null)
  const svgInlineGroupRef = useRef<SVGGElement | null>(null)
  const unbindFnsRef = useRef<Array<() => void>>([])

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

  useEffect(() => {
    let cancelled = false
    async function loadSvg() {
      try {
        const res = await fetch(backgroundSrc, { cache: "force-cache" })
        const text = await res.text()
        const parser = new DOMParser()
        const doc = parser.parseFromString(text, "image/svg+xml")
        const root = doc.querySelector("svg")
        const inner = root ? root.innerHTML : text
        if (!cancelled) setSvgInner(inner)
      } catch {
        if (!cancelled) setSvgInner(null)
      }
    }
    loadSvg()
    return () => {
      cancelled = true
    }
  }, [backgroundSrc])

  useEffect(() => {
    unbindFnsRef.current.forEach((fn) => fn())
    unbindFnsRef.current = []

    const root = svgInlineGroupRef.current
    if (!root || !svgInner) return

    subRegionMappings.forEach((m) => {
      const el = root.querySelector<SVGElement>(m.selector)
      if (!el) return

      el.setAttribute("tabindex", "0")
      el.setAttribute("role", "button")
      el.setAttribute("aria-label", m.label || m.id)
      el.classList.add("cursor-pointer")

      const handleClick = () => onRegionClick(m.id)
      const handleKey = (e: KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          onRegionClick(m.id)
        }
      }
      const handleEnter = () => setHoveredRegion(m.id)
      const handleLeave = () => setHoveredRegion(null)

      el.addEventListener("click", handleClick as any)
      el.addEventListener("keydown", handleKey as any)
      el.addEventListener("mouseenter", handleEnter as any)
      el.addEventListener("mouseleave", handleLeave as any)

      unbindFnsRef.current.push(() => {
        el.removeEventListener("click", handleClick as any)
        el.removeEventListener("keydown", handleKey as any)
        el.removeEventListener("mouseenter", handleEnter as any)
        el.removeEventListener("mouseleave", handleLeave as any)
      })
    })

    return () => {
      unbindFnsRef.current.forEach((fn) => fn())
      unbindFnsRef.current = []
    }
  }, [svgInner, onRegionClick])

  useEffect(() => {
    const root = svgInlineGroupRef.current
    if (!root) return
    subRegionMappings.forEach((m) => {
      const el = root.querySelector<SVGElement>(m.selector)
      if (!el) return
      const isSelected = selectedRegion === m.id
      const isHovered = hoveredRegion === m.id
      if (isSelected) {
        el.style.transition = "filter 200ms ease, stroke 200ms ease, stroke-width 200ms ease"
        el.style.stroke = "#ff6b35"
        el.style.strokeWidth = "1.5"
        el.style.filter = "drop-shadow(0 0 8px rgba(255, 107, 53, 0.5))"
      } else if (isHovered) {
        el.style.transition = "filter 150ms ease, stroke 150ms ease, stroke-width 150ms ease"
        el.style.stroke = "#003b5c"
        el.style.strokeWidth = "1.2"
        el.style.filter = "drop-shadow(0 0 6px rgba(0, 59, 92, 0.35))"
      } else {
        el.style.stroke = ""
        el.style.strokeWidth = ""
        el.style.filter = ""
      }
    })
  }, [hoveredRegion, selectedRegion])

  const filteredRegions = regions.filter(
    (region) =>
      !searchQuery ||
      region.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      region.culturalElements.some((element) => element.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <div className="relative w-full h-full overflow-hidden bg-gradient-to-br from-blue-50 to-cyan-50">
      <motion.div
        className="absolute inset-0"
        animate={{
          scale: mapTransform.scale,
          x: mapTransform.translateX,
          y: mapTransform.translateY,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
        style={{ willChange: "transform" }}
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          role="img"
          aria-label="Peta budaya Jawa - sub-daerah interaktif"
        >
          {svgInner ? (
            <g ref={svgInlineGroupRef} dangerouslySetInnerHTML={{ __html: svgInner }} />
          ) : (
            <image
              href={backgroundSrc}
              x="0"
              y="0"
              width="100"
              height="100"
              preserveAspectRatio="xMidYMid meet"
              opacity="1"
            />
          )}

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
