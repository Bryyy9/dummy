"use client"

import { useState, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment, Float, Html } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Menu,
  X,
  Users,
  Award,
  MapPin,
  Heart,
  Globe,
  Handshake,
  Search,
  Filter,
  Home,
  Compass,
  Info,
  Mail,
} from "lucide-react"
import type * as THREE from "three"

const smoothScrollTo = (elementId: string) => {
  const element = document.getElementById(elementId)
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    })
  }
}

// Enhanced Indonesian Globe Component with realistic geography
function IndonesianGlobe({ onGlobeClick }: { onGlobeClick: () => void }) {
  const globeRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.003
    }
  })

  return (
    <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.6}>
      <group>
        {/* Main Earth Globe */}
        <mesh
          ref={globeRef}
          onClick={onGlobeClick}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          scale={hovered ? 1.15 : 1}
        >
          <sphereGeometry args={[1.8, 64, 64]} />
          <meshStandardMaterial color="#1e40af" roughness={0.4} metalness={0.1} transparent opacity={0.9} />
        </mesh>

        {/* Sumatra */}
        <mesh position={[-0.8, 0.3, 1.6]}>
          <sphereGeometry args={[0.25, 16, 16]} />
          <meshStandardMaterial color="#16a34a" />
        </mesh>

        {/* Java (highlighted) */}
        <mesh position={[-0.2, -0.2, 1.75]}>
          <boxGeometry args={[0.6, 0.15, 0.12]} />
          <meshStandardMaterial color="#ca8a04" />
        </mesh>

        {/* East Java (special highlight) */}
        <mesh position={[0.15, -0.2, 1.76]}>
          <boxGeometry args={[0.2, 0.12, 0.08]} />
          <meshStandardMaterial color="#dc2626" emissive="#dc2626" emissiveIntensity={hovered ? 0.5 : 0.3} />
        </mesh>

        {/* Kalimantan */}
        <mesh position={[0.1, 0.4, 1.65]}>
          <sphereGeometry args={[0.35, 16, 16]} />
          <meshStandardMaterial color="#16a34a" />
        </mesh>

        {/* Sulawesi */}
        <mesh position={[0.6, 0.1, 1.6]}>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial color="#16a34a" />
        </mesh>

        {/* Papua */}
        <mesh position={[1.2, -0.1, 1.4]}>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial color="#16a34a" />
        </mesh>

        {/* Bali & Nusa Tenggara */}
        <mesh position={[0.4, -0.35, 1.7]}>
          <sphereGeometry args={[0.08, 12, 12]} />
          <meshStandardMaterial color="#16a34a" />
        </mesh>

        {/* Interactive tooltip */}
        {hovered && (
          <Html position={[0, 2.8, 0]} center>
            <div className="bg-background/95 backdrop-blur-sm px-4 py-3 rounded-lg border shadow-lg text-center animate-in fade-in-0 zoom-in-95">
              <div className="text-sm font-semibold text-foreground">🇮🇩 Indonesia</div>
              <div className="text-xs text-muted-foreground mt-1">Klik untuk menjelajahi Jawa Timur</div>
            </div>
          </Html>
        )}

        {/* Atmospheric glow effect */}
        <mesh scale={2.2}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshBasicMaterial color="#3b82f6" transparent opacity={0.1} side={2} />
        </mesh>
      </group>
    </Float>
  )
}

function EastJavaCitiesView({ onBack }: { onBack: () => void }) {
  const cities = [
    { name: "Surabaya", position: [0, 0.8, 0], description: "Kota Pahlawan" },
    { name: "Malang", position: [-1.2, 0.2, 0], description: "Kota Apel" },
    { name: "Kediri", position: [1.0, 0.3, 0], description: "Kota Tahu" },
    { name: "Blitar", position: [0.3, -0.6, 1.0], description: "Kota Proklamator" },
    { name: "Madiun", position: [-0.8, 0.5, -0.7], description: "Kota Gadis" },
    { name: "Jember", position: [0.9, -0.4, 0.8], description: "Kota Karnaval" },
    { name: "Banyuwangi", position: [1.3, -0.3, 0.5], description: "Sunrise of Java" },
    { name: "Probolinggo", position: [0.7, 0.1, 0.9], description: "Kota Bayuangga" },
    { name: "Pasuruan", position: [0.2, 0.4, 0.8], description: "Kota Tape" },
    { name: "Mojokerto", position: [-0.4, 0.6, 0.6], description: "Kota Majapahit" },
  ]

  return (
    <group>
      {cities.map((city, index) => (
        <Float key={city.name} speed={1.5 + index * 0.1} rotationIntensity={0.3} floatIntensity={0.4}>
          <group position={city.position as [number, number, number]}>
            {/* City marker */}
            <mesh>
              <sphereGeometry args={[0.12, 16, 16]} />
              <meshStandardMaterial color="#dc2626" emissive="#dc2626" emissiveIntensity={0.4} />
            </mesh>

            {/* Pulsing ring effect */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.15, 0.2, 16]} />
              <meshBasicMaterial color="#dc2626" transparent opacity={0.3} />
            </mesh>

            {/* City information */}
            <Html position={[0, 0.4, 0]} center>
              <div className="bg-background/95 backdrop-blur-sm px-3 py-2 rounded-lg border shadow-lg text-center min-w-[120px]">
                <div className="text-sm font-semibold text-foreground">{city.name}</div>
                <div className="text-xs text-muted-foreground">{city.description}</div>
              </div>
            </Html>
          </group>
        </Float>
      ))}

      <Html position={[0, -2.5, 0]} center>
        <div className="flex flex-col items-center space-y-2">
          <div className="text-center mb-2">
            <div className="text-lg font-bold text-foreground">Jawa Timur</div>
            <div className="text-sm text-muted-foreground">{cities.length} Kota/Kabupaten</div>
          </div>
          <Button onClick={onBack} variant="outline" size="sm" className="shadow-lg bg-transparent">
            ← Kembali ke Globe
          </Button>
        </div>
      </Html>
    </group>
  )
}

export default function CulturalHeritagePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showCities, setShowCities] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredItems, setFilteredItems] = useState<any[]>([])
  const [selectedCategory, setSelectedCategory] = useState("semua")
  const [navSearchQuery, setNavSearchQuery] = useState("")
  const [showNavSearch, setShowNavSearch] = useState(false)

  const culturalItems = [
    {
      title: "Tari Reog Ponorogo",
      subtitle: "Kesenian Tari",
      description:
        "Tarian tradisional yang menggambarkan kekuatan dan keberanian dengan topeng singa barong yang megah",
      badge: "Kesenian",
      category: "tari",
      region: "Ponorogo",
    },
    {
      title: "Batik Malangan",
      subtitle: "Seni Kerajinan",
      description: "Batik khas Malang dengan motif yang terinspirasi dari alam dan budaya lokal yang unik",
      badge: "Kerajinan",
      category: "batik",
      region: "Malang",
    },
    {
      title: "Rujak Cingur",
      subtitle: "Kuliner Tradisional",
      description: "Makanan khas Surabaya yang terbuat dari sayuran segar dan cingur sapi dengan bumbu petis",
      badge: "Kuliner",
      category: "makanan",
      region: "Surabaya",
    },
    {
      title: "Wayang Kulit",
      subtitle: "Seni Pertunjukan",
      description: "Pertunjukan tradisional menggunakan boneka kulit dengan cerita epik Jawa yang filosofis",
      badge: "Pertunjukan",
      category: "wayang",
      region: "Jawa Timur",
    },
    {
      title: "Bahasa Jawa Timuran",
      subtitle: "Bahasa Daerah",
      description: "Dialek bahasa Jawa yang khas digunakan di wilayah Jawa Timur dengan logat yang unik",
      badge: "Bahasa",
      category: "bahasa",
      region: "Jawa Timur",
    },
    {
      title: "Gamelan Jawa Timuran",
      subtitle: "Musik Tradisional",
      description: "Ensemble musik tradisional dengan instrumen perunggu khas Jawa Timur yang harmonis",
      badge: "Musik",
      category: "musik",
      region: "Jawa Timur",
    },
    {
      title: "Rawon",
      subtitle: "Kuliner Tradisional",
      description: "Sup daging sapi berwarna hitam khas Surabaya dengan rempah kluwek yang kaya rasa",
      badge: "Kuliner",
      category: "makanan",
      region: "Surabaya",
    },
    {
      title: "Tari Gandrung",
      subtitle: "Kesenian Tari",
      description: "Tarian tradisional Banyuwangi yang menggambarkan keanggunan wanita Jawa Timur",
      badge: "Kesenian",
      category: "tari",
      region: "Banyuwangi",
    },
    {
      title: "Kerajinan Bambu",
      subtitle: "Seni Kerajinan",
      description: "Berbagai kerajinan dari bambu yang mencerminkan kreativitas masyarakat Jawa Timur",
      badge: "Kerajinan",
      category: "kerajinan",
      region: "Jawa Timur",
    },
  ]

  const categories = [
    { value: "semua", label: "Semua Kategori" },
    { value: "tari", label: "Tari Tradisional" },
    { value: "makanan", label: "Kuliner" },
    { value: "batik", label: "Batik" },
    { value: "musik", label: "Musik" },
    { value: "bahasa", label: "Bahasa" },
    { value: "kerajinan", label: "Kerajinan" },
  ]

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    filterItems(query, selectedCategory)
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    filterItems(searchQuery, category)
  }

  const filterItems = (query: string, category: string) => {
    let filtered = culturalItems

    // Filter by category
    if (category !== "semua") {
      filtered = filtered.filter((item) => item.category === category)
    }

    // Filter by search query
    if (query.trim() !== "") {
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.subtitle.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase()) ||
          item.region.toLowerCase().includes(query.toLowerCase()),
      )
    }

    setFilteredItems(filtered)
  }

  const handleGlobeClick = () => {
    setShowCities(true)
  }

  const handleBackToGlobe = () => {
    setShowCities(false)
  }

  const handleNavClick = (sectionId: string) => {
    smoothScrollTo(sectionId)
    setIsMenuOpen(false) // Close mobile menu after navigation
  }

  const displayItems = searchQuery || selectedCategory !== "semua" ? filteredItems : culturalItems

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Traditional batik pattern background */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='batik-pattern' x='0' y='0' width='120' height='120' patternUnits='userSpaceOnUse'%3E%3Ccircle cx='20' cy='20' r='8' fill='%23ca8a04' opacity='0.4'/%3E%3Ccircle cx='60' cy='60' r='12' fill='%23ca8a04' opacity='0.3'/%3E%3Ccircle cx='100' cy='20' r='6' fill='%23ca8a04' opacity='0.5'/%3E%3Ccircle cx='20' cy='100' r='10' fill='%23ca8a04' opacity='0.2'/%3E%3Cpath d='M40 40 Q60 20 80 40 Q60 60 40 40' fill='none' stroke='%23ca8a04' strokeWidth='2' opacity='0.3'/%3E%3Cpath d='M80 80 Q100 60 120 80 Q100 100 80 80' fill='none' stroke='%23ca8a04' strokeWidth='2' opacity='0.3'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23batik-pattern)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Traditional Indonesian textile pattern */}
        <div
          className="absolute inset-0 opacity-[0.02] rotate-45"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='textile-pattern' x='0' y='0' width='80' height='80' patternUnits='userSpaceOnUse'%3E%3Cpath d='M0 40 Q20 20 40 40 Q60 60 80 40' fill='none' stroke='%23dc2626' strokeWidth='1' opacity='0.6'/%3E%3Cpath d='M40 0 Q60 20 40 40 Q20 60 40 80' fill='none' stroke='%23dc2626' strokeWidth='1' opacity='0.6'/%3E%3Ccircle cx='40' cy='40' r='3' fill='%23dc2626' opacity='0.4'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23textile-pattern)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Wayang puppet silhouette */}
        <div className="absolute top-20 left-10 w-32 h-32 opacity-[0.025] rotate-12">
          <div className="w-full h-full text-amber-700">
            <svg viewBox="0 0 100 100" className="w-full h-full" fill="currentColor">
              <path d="M50 10 C60 15 65 25 60 35 L65 50 C70 60 65 70 55 75 L50 90 L45 75 C35 70 30 60 35 50 L40 35 C35 25 40 15 50 10 Z" />
              <circle cx="45" cy="30" r="3" fill="white" />
              <circle cx="55" cy="30" r="3" fill="white" />
            </svg>
          </div>
        </div>

        {/* Traditional flower motif */}
        <div className="absolute top-40 right-20 w-24 h-24 opacity-[0.03] -rotate-45">
          <div className="w-full h-full text-emerald-700">
            <svg viewBox="0 0 100 100" className="w-full h-full" fill="currentColor">
              <path d="M50 20 Q60 30 50 40 Q40 30 50 20 Z" />
              <path d="M50 60 Q60 70 50 80 Q40 70 50 60 Z" />
              <path d="M20 50 Q30 40 40 50 Q30 60 20 50 Z" />
              <path d="M80 50 Q70 40 60 50 Q70 60 80 50 Z" />
              <circle cx="50" cy="50" r="8" />
            </svg>
          </div>
        </div>

        {/* Javanese temple silhouette */}
        <div className="absolute bottom-32 left-1/4 w-28 h-28 opacity-[0.02] rotate-45">
          <div className="w-full h-full text-orange-600">
            <svg viewBox="0 0 100 100" className="w-full h-full" fill="currentColor">
              <rect x="20" y="60" width="60" height="30" />
              <polygon points="15,60 50,30 85,60" />
              <rect x="40" y="70" width="20" height="20" />
              <rect x="45" y="40" width="10" height="30" />
            </svg>
          </div>
        </div>

        {/* Traditional kris pattern */}
        <div className="absolute top-1/3 right-1/3 w-20 h-20 opacity-[0.03] -rotate-12">
          <div className="w-full h-full text-red-700">
            <svg viewBox="0 0 100 100" className="w-full h-full" fill="currentColor">
              <path d="M50 10 L52 20 L48 30 L52 40 L48 50 L52 60 L48 70 L50 80 L48 70 L52 60 L48 50 L52 40 L48 30 L52 20 Z" />
              <ellipse cx="50" cy="15" rx="8" ry="4" />
            </svg>
          </div>
        </div>

        {/* Batik spiral motif */}
        <div className="absolute bottom-1/4 right-1/4 w-36 h-36 opacity-[0.02] rotate-90">
          <div className="w-full h-full text-blue-700">
            <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M50 10 Q70 30 50 50 Q30 70 50 90 Q70 70 50 50 Q30 30 50 10" />
              <circle cx="50" cy="50" r="15" />
              <circle cx="50" cy="50" r="25" />
            </svg>
          </div>
        </div>
      </div>

      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50/30 via-transparent to-orange-50/20" />
        <div className="absolute inset-0 bg-gradient-to-tl from-emerald-50/20 via-transparent to-blue-50/15" />
        <div className="absolute inset-0 bg-gradient-to-r from-red-50/10 via-transparent to-yellow-50/15" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-amber-50/5 to-transparent" />
      </div>

      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23000000' fillOpacity='1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3Ccircle cx='27' cy='7' r='1'/%3E%3Ccircle cx='47' cy='7' r='1'/%3E%3Ccircle cx='7' cy='27' r='1'/%3E%3Ccircle cx='27' cy='27' r='1'/%3E%3Ccircle cx='47' cy='27' r='1'/%3E%3Ccircle cx='7' cy='47' r='1'/%3E%3Ccircle cx='27' cy='47' r='1'/%3E%3Ccircle cx='47' cy='47' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Main content with higher z-index */}
      <div className="relative z-10">
        <nav className="sticky top-0 z-50 bg-background/90 backdrop-blur-xl supports-[backdrop-filter]:bg-background/75 border-b border-border/50 shadow-lg transition-all duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo with enhanced styling */}
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/70 rounded-lg flex items-center justify-center shadow-md">
                  <Globe className="h-5 w-5 text-primary-foreground" />
                </div>
                <h1 className="text-xl font-bold text-primary font-[family-name:var(--font-manrope)] tracking-tight">
                  UB Corpra
                </h1>
              </div>

              {/* Desktop Navigation with enhanced hover effects */}
              <div className="hidden md:flex items-center space-x-1">
                <button
                  onClick={() => handleNavClick("beranda")}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg text-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300 group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Home className="h-4 w-4 group-hover:scale-110 transition-transform duration-200 relative z-10" />
                  <span className="font-medium relative z-10">Beranda</span>
                </button>
                <button
                  onClick={() => handleNavClick("eksplorasi")}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg text-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300 group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Compass className="h-4 w-4 group-hover:scale-110 transition-transform duration-200 relative z-10" />
                  <span className="font-medium relative z-10">Eksplorasi</span>
                </button>
                <button
                  onClick={() => handleNavClick("tentang")}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg text-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300 group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Info className="h-4 w-4 group-hover:scale-110 transition-transform duration-200 relative z-10" />
                  <span className="font-medium relative z-10">Tentang</span>
                </button>
                <button
                  onClick={() => handleNavClick("kontak")}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg text-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300 group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Mail className="h-4 w-4 group-hover:scale-110 transition-transform duration-200 relative z-10" />
                  <span className="font-medium relative z-10">Kontak</span>
                </button>

                {/* Enhanced Integrated Search in Navbar */}
                <div className="ml-4 relative">
                  {showNavSearch ? (
                    <div className="flex items-center space-x-2 bg-muted/60 backdrop-blur-sm rounded-lg px-3 py-2 min-w-[280px] border border-border/50 shadow-sm">
                      <Search className="h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Cari budaya, kesenian, kuliner..."
                        value={navSearchQuery}
                        onChange={(e) => setNavSearchQuery(e.target.value)}
                        className="border-0 bg-transparent p-0 h-auto focus-visible:ring-0 text-sm placeholder:text-muted-foreground/70"
                        onBlur={() => {
                          if (!navSearchQuery) setShowNavSearch(false)
                        }}
                        autoFocus
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setShowNavSearch(false)
                          setNavSearchQuery("")
                        }}
                        className="h-6 w-6 p-0 hover:bg-muted-foreground/10"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ) : (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowNavSearch(true)}
                      className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-primary/10 transition-all duration-300 group relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <Search className="h-4 w-4 group-hover:scale-110 transition-transform duration-200 relative z-10" />
                      <span className="text-sm font-medium relative z-10">Cari</span>
                    </Button>
                  )}
                </div>
              </div>

              {/* Mobile menu button with enhanced styling */}
              <div className="md:hidden flex items-center space-x-2">
                {/* Mobile search button */}
                <Button variant="ghost" size="sm" onClick={() => setShowNavSearch(!showNavSearch)} className="p-2">
                  <Search className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
                  {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </Button>
              </div>
            </div>

            {/* Mobile search bar */}
            {showNavSearch && (
              <div className="md:hidden pb-4">
                <div className="flex items-center space-x-2 bg-muted/50 rounded-lg px-3 py-2 border border-border/50">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Cari budaya, kesenian, kuliner..."
                    value={navSearchQuery}
                    onChange={(e) => setNavSearchQuery(e.target.value)}
                    className="border-0 bg-transparent p-0 h-auto focus-visible:ring-0"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setShowNavSearch(false)
                      setNavSearchQuery("")
                    }}
                    className="h-6 w-6 p-0"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Enhanced Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden bg-card/95 backdrop-blur-sm border-t border-border shadow-lg">
              <div className="px-4 pt-4 pb-6 space-y-2">
                <button
                  onClick={() => handleNavClick("beranda")}
                  className="flex items-center space-x-3 px-3 py-3 rounded-lg text-foreground hover:text-primary hover:bg-primary/5 transition-all duration-200 w-full text-left"
                >
                  <Home className="h-5 w-5" />
                  <span className="font-medium">Beranda</span>
                </button>
                <button
                  onClick={() => handleNavClick("eksplorasi")}
                  className="flex items-center space-x-3 px-3 py-3 rounded-lg text-foreground hover:text-primary hover:bg-primary/5 transition-all duration-200 w-full text-left"
                >
                  <Compass className="h-5 w-5" />
                  <span className="font-medium">Eksplorasi</span>
                </button>
                <button
                  onClick={() => handleNavClick("tentang")}
                  className="flex items-center space-x-3 px-3 py-3 rounded-lg text-foreground hover:text-primary hover:bg-primary/5 transition-all duration-200 w-full text-left"
                >
                  <Info className="h-5 w-5" />
                  <span className="font-medium">Tentang</span>
                </button>
                <button
                  onClick={() => handleNavClick("kontak")}
                  className="flex items-center space-x-3 px-3 py-3 rounded-lg text-foreground hover:text-primary hover:bg-primary/5 transition-all duration-200 w-full text-left"
                >
                  <Mail className="h-5 w-5" />
                  <span className="font-medium">Kontak</span>
                </button>
              </div>
            </div>
          )}
        </nav>

        {/* Hero Section */}
        <section id="beranda" className="relative min-h-screen flex items-center">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 -left-20 w-96 h-96 bg-gradient-to-r from-amber-100/20 to-orange-100/20 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-gradient-to-l from-emerald-100/20 to-teal-100/20 rounded-full blur-3xl" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center relative z-10">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold text-balance font-[family-name:var(--font-manrope)]">
                  Jelajahi Warisan
                  <span className="text-primary block">Budaya Jawa Timur</span>
                  <span className="text-2xl md:text-3xl font-normal block mt-2">yang Tak Ternilai</span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-lg text-pretty">
                  Temukan kekayaan tradisi, budaya dan seni yang telah diwariskan turun temurun di kebudayaan Jawa
                  Timur. Mari bersama-sama menjaga warisan budaya untuk generasi mendatang.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-lg px-8">
                  Mulai Eksplorasi Budaya
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent">
                  Pelajari Lebih Lanjut
                </Button>
              </div>

              {/* Statistics */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">38</div>
                  <div className="text-sm text-muted-foreground">Kabupaten Kota</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">100+</div>
                  <div className="text-sm text-muted-foreground">Kesenian Tradisional</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">50+</div>
                  <div className="text-sm text-muted-foreground">Kuliner Khas</div>
                </div>
              </div>
            </div>

            <div className="h-96 lg:h-[600px] w-full">
              <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
                <ambientLight intensity={0.4} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3b82f6" />
                <spotLight position={[0, 10, 0]} intensity={0.8} angle={0.3} penumbra={1} />
                {showCities ? (
                  <EastJavaCitiesView onBack={handleBackToGlobe} />
                ) : (
                  <IndonesianGlobe onGlobeClick={handleGlobeClick} />
                )}
                <Environment preset="city" />
                <OrbitControls enableZoom={false} autoRotate={!showCities} autoRotateSpeed={0.5} enablePan={false} />
              </Canvas>
            </div>
          </div>
        </section>

        {/* Exploration Section */}
        <section id="eksplorasi" className="py-20 bg-muted/30 relative">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-10 left-10 w-32 h-32 opacity-[0.03]">
              <svg viewBox="0 0 100 100" className="w-full h-full text-primary">
                <path d="M50 5 L60 35 L90 35 L68 57 L78 87 L50 70 L22 87 L32 57 L10 35 L40 35 Z" fill="currentColor" />
              </svg>
            </div>
            <div className="absolute bottom-10 right-10 w-28 h-28 opacity-[0.02] rotate-45">
              <svg viewBox="0 0 100 100" className="w-full h-full text-amber-600">
                <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="6" />
                <circle cx="50" cy="50" r="15" fill="currentColor" />
              </svg>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-manrope)]">
                Eksplorasi
                <span className="text-primary block">Budaya Jawa Timur</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
                Jelajahi kekayaan budaya Jawa Timur melalui berbagai aspek tradisi yang masih lestari hingga saat ini
              </p>
            </div>

            <div className="max-w-4xl mx-auto mb-12 space-y-6">
              {/* Search bar */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  placeholder="Cari kesenian, makanan, bahasa, musik, dan aspek budaya lainnya..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-12 h-14 text-base rounded-xl border-2 focus:border-primary"
                />
              </div>

              {/* Category filters */}
              <div className="flex flex-wrap gap-2 justify-center">
                {categories.map((category) => (
                  <Button
                    key={category.value}
                    variant={selectedCategory === category.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleCategoryChange(category.value)}
                    className="rounded-full"
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    {category.label}
                  </Button>
                ))}
              </div>

              {/* Search results info */}
              {(searchQuery || selectedCategory !== "semua") && (
                <div className="text-center">
                  <div className="text-sm text-muted-foreground">
                    {displayItems.length > 0
                      ? `Ditemukan ${displayItems.length} hasil${searchQuery ? ` untuk "${searchQuery}"` : ""}${selectedCategory !== "semua" ? ` dalam kategori ${categories.find((c) => c.value === selectedCategory)?.label}` : ""}`
                      : `Tidak ada hasil${searchQuery ? ` untuk "${searchQuery}"` : ""}${selectedCategory !== "semua" ? ` dalam kategori ${categories.find((c) => c.value === selectedCategory)?.label}` : ""}`}
                  </div>
                </div>
              )}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayItems.map((item, index) => (
                <Card
                  key={index}
                  className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/20"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary" className="font-medium">
                        {item.badge}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {item.region}
                      </Badge>
                    </div>
                    <CardTitle className="font-[family-name:var(--font-manrope)] group-hover:text-primary transition-colors">
                      {item.title}
                    </CardTitle>
                    <CardDescription className="text-primary font-medium">{item.subtitle}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* No results state */}
            {(searchQuery || selectedCategory !== "semua") && displayItems.length === 0 && (
              <div className="text-center py-16">
                <div className="mb-4">
                  <Search className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
                  <p className="text-lg font-medium text-muted-foreground mb-2">Tidak menemukan hasil yang sesuai</p>
                  <p className="text-muted-foreground">Coba gunakan kata kunci yang berbeda atau pilih kategori lain</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button variant="outline" onClick={() => handleSearch("")}>
                    Hapus Pencarian
                  </Button>
                  <Button variant="outline" onClick={() => handleCategoryChange("semua")}>
                    Tampilkan Semua Kategori
                  </Button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Heritage Preservation Section */}
        <section id="tentang" className="py-20 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-50/30 via-transparent to-orange-50/20" />
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/3 left-1/4 w-40 h-40 opacity-[0.02] -rotate-12">
              <svg viewBox="0 0 100 100" className="w-full h-full text-emerald-600">
                <polygon points="50,10 90,90 10,90" fill="currentColor" />
              </svg>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center space-y-4 mb-16">
              <Badge className="mb-4">Warisan Kita</Badge>
              <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-manrope)]">
                Melestarikan Warisan
                <span className="text-primary block">Budaya Jawa Timur</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
                UB Corpra adalah platform digital yang inovatif yang menggabungkan teknologi modern dengan kearifan
                lokal untuk melestarikan dan memperkenalkan warisan budaya Jawa Timur kepada dunia.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-[family-name:var(--font-manrope)]">Misi Kami</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Menyediakan platform digital yang mudah diakses untuk memperkenalkan, mempelajari, dan
                      melestarikan warisan budaya Jawa Timur yang kaya dan beragam. Kami berkomitmen untuk menjembatani
                      generasi muda dengan tradisi leluhur melalui teknologi interaktif dan konten edukatif yang
                      menarik.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="font-[family-name:var(--font-manrope)]">Visi Kami</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Menjadi jembatan antara tradisi masa lalu dan generasi masa depan, memastikan warisan budaya Jawa
                      Timur tetap hidup, berkembang, dan dikenal luas. Kami ingin menciptakan ekosistem digital yang
                      mendukung pelestarian budaya berkelanjutan dan aksesible bagi semua kalangan.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="font-[family-name:var(--font-manrope)]">Fitur Unggulan</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-muted-foreground space-y-2">
                      <li>• Eksplorasi interaktif dengan teknologi 3D</li>
                      <li>• Database lengkap kesenian dan tradisi Jawa Timur</li>
                      <li>• Pencarian cerdas untuk menemukan konten budaya</li>
                      <li>• Kolaborasi dengan komunitas dan ahli budaya</li>
                      <li>• Konten multimedia yang edukatif dan menarik</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="h-96 w-full">
                <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                  <ambientLight intensity={0.6} />
                  <pointLight position={[10, 10, 10]} />
                  <Float speed={2} rotationIntensity={1} floatIntensity={2}>
                    <mesh>
                      <torusGeometry args={[1, 0.3, 16, 100]} />
                      <meshStandardMaterial color="#a16207" />
                    </mesh>
                  </Float>
                  <Environment preset="city" />
                  <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
                </Canvas>
              </div>
            </div>
          </div>
        </section>

        {/* Achievement Section */}
        <section className="py-20 bg-muted/30 relative">
          <div className="absolute inset-0 opacity-[0.02]">
            <div
              className="absolute inset-0 text-primary"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ca8a04' fillOpacity='1'%3E%3Cpath d='M20 20c0 11.046-8.954 20-20 20s-20-8.954-20-20 8.954-20 20-20 20 8.954 20 20zM0 0h20v20H0V0zm20 20h20v20H20V20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-manrope)]">Pencapaian Kami</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
                Bangga menjadi bagian dari pelestarian budaya Jawa Timur dengan dukungan komunitas yang luas
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center">
                <CardHeader>
                  <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle className="text-3xl font-bold">10,000+</CardTitle>
                  <CardDescription>Pengguna Aktif</CardDescription>
                </CardHeader>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <Award className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle className="text-3xl font-bold">50+</CardTitle>
                  <CardDescription>Item Budaya</CardDescription>
                </CardHeader>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle className="text-3xl font-bold">7</CardTitle>
                  <CardDescription>Kota Jawa Timur</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-foreground text-background relative">
          <div className="absolute inset-0 opacity-[0.03]">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='1'%3E%3Ccircle cx='3' cy='3' r='1'/%3E%3Ccircle cx='13' cy='13' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-manrope)]">
                Nilai-Nilai Kami
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center space-y-4">
                <Heart className="h-12 w-12 mx-auto text-primary" />
                <h3 className="text-xl font-bold font-[family-name:var(--font-manrope)]">Autentisitas</h3>
                <p className="text-background/80">
                  Menyajikan informasi budaya yang akurat dan otentik dari sumber-sumber terpercaya
                </p>
              </div>

              <div className="text-center space-y-4">
                <Globe className="h-12 w-12 mx-auto text-primary" />
                <h3 className="text-xl font-bold font-[family-name:var(--font-manrope)]">Inovasi</h3>
                <p className="text-background/80">
                  Menggunakan teknologi modern untuk mempresentasikan budaya tradisional dengan cara yang menarik
                </p>
              </div>

              <div className="text-center space-y-4">
                <Handshake className="h-12 w-12 mx-auto text-primary" />
                <h3 className="text-xl font-bold font-[family-name:var(--font-manrope)]">Kolaboratif</h3>
                <p className="text-background/80">
                  Bekerja sama dengan komunitas lokal dan ahli budaya untuk memastikan akurasi informasi
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Collaboration Section */}
        <section id="kontak" className="py-20 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50/20 via-transparent to-amber-50/30" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center space-y-4 mb-16">
              <Badge className="mb-4">Bergabung Bersama</Badge>
              <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-manrope)]">
                Mari Berkolaborasi
                <span className="text-primary block">untuk Budaya Jawa Timur</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
                Kami terbuka untuk berkolaborasi dan menerima kontribusi dari semua pihak yang peduli dengan pelestarian
                budaya Jawa Timur.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Collaboration Options */}
              <div className="space-y-6">
                <div className="grid gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="font-[family-name:var(--font-manrope)]">Pertanyaan Umum</CardTitle>
                      <CardDescription>
                        Hubungi kami untuk pertanyaan umum tentang platform dan layanan kami
                      </CardDescription>
                    </CardHeader>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="font-[family-name:var(--font-manrope)]">Kolaborasi</CardTitle>
                      <CardDescription>
                        Bergabunglah dengan kami dalam misi pelestarian budaya Jawa Timur
                      </CardDescription>
                    </CardHeader>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="font-[family-name:var(--font-manrope)]">Kontribusi Konten</CardTitle>
                      <CardDescription>
                        Bagikan pengetahuan dan konten budaya untuk memperkaya platform kami
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </div>
              </div>

              {/* Contact Form */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-[family-name:var(--font-manrope)]">Kirim Pesan</CardTitle>
                    <CardDescription>Informasi Kontak</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Nama</label>
                        <Input placeholder="Masukkan nama Anda" />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Email</label>
                        <Input type="email" placeholder="nama@email.com" />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Pesan</label>
                        <Textarea placeholder="Tulis pesan Anda di sini..." className="min-h-[120px]" />
                      </div>
                      <Button className="w-full">Kirim Pesan</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-foreground text-background py-12 relative">
          <div className="absolute inset-0 opacity-[0.02]">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='1'%3E%3Cpath d='M15 0C6.716 0 0 6.716 0 15c0 8.284 6.716 15 15 15 8.284 0 15-6.716 15-15 0-8.284-6.716-15-15-15zm0 28C7.82 28 2 22.18 2 15S7.82 2 15 2s13 5.82 13 13-5.82 13-13 13z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-bold font-[family-name:var(--font-manrope)]">UB Corpra</h3>
              <p className="text-background/80 max-w-md mx-auto">
                Melestarikan warisan budaya Jawa Timur untuk generasi mendatang
              </p>
              <div className="flex justify-center space-x-6 pt-4">
                <a href="#tentang" className="text-background/60 hover:text-primary transition-colors">
                  Tentang
                </a>
                <a href="#eksplorasi" className="text-background/60 hover:text-primary transition-colors">
                  Eksplorasi
                </a>
                <a href="#kontak" className="text-background/60 hover:text-primary transition-colors">
                  Kontak
                </a>
              </div>
              <div className="pt-8 border-t border-background/20">
                <p className="text-background/60 text-sm">© 2024 UB Corpra. Semua hak dilindungi.</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
