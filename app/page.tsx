"use client"

import { useState, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, Environment, OrbitControls, Html } from "@react-three/drei"
import type * as THREE from "three"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Globe,
  Home,
  Compass,
  Info,
  Mail,
  Menu,
  X,
  Search,
  Users,
  Award,
  MapPin,
  ArrowLeft,
  Heart,
  Star,
  BookOpen,
  Camera,
  Music,
  Utensils,
  Palette,
  Languages,
  Play,
  Bookmark,
  Share2,
  Eye,
  Clock,
  Target,
  Lightbulb,
  Shield,
  Accessibility,
  HelpCircle,
  MessageCircle,
} from "lucide-react"

function smoothScrollTo(elementId: string) {
  const element = document.getElementById(elementId)
  if (element) {
    // Add visual feedback for user action
    const navbar = document.querySelector("nav")
    if (navbar) {
      navbar.classList.add("animate-pulse")
      setTimeout(() => navbar.classList.remove("animate-pulse"), 300)
    }

    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    })

    // Focus management for accessibility
    element.focus({ preventScroll: true })
  }
}

function IndonesianGlobe({ onGlobeClick }: { onGlobeClick: () => void }) {
  const globeRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)

  useFrame((state) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += hovered ? 0.005 : 0.003
    }
  })

  const handleClick = () => {
    setClicked(true)
    setTimeout(() => setClicked(false), 200)
    onGlobeClick()
  }

  return (
    <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.6}>
      <group>
        {/* Main Earth Globe with enhanced interaction */}
        <mesh
          ref={globeRef}
          onClick={handleClick}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          scale={clicked ? 1.05 : hovered ? 1.15 : 1}
        >
          <sphereGeometry args={[1.8, 64, 64]} />
          <meshStandardMaterial
            color={hovered ? "#1d4ed8" : "#1e40af"}
            roughness={0.4}
            metalness={0.1}
            transparent
            opacity={0.9}
          />
        </mesh>

        {/* Enhanced Indonesian islands with better visual hierarchy */}
        <mesh position={[-0.8, 0.3, 1.6]}>
          <sphereGeometry args={[0.25, 16, 16]} />
          <meshStandardMaterial color="#16a34a" />
        </mesh>

        <mesh position={[-0.2, -0.2, 1.75]}>
          <boxGeometry args={[0.6, 0.15, 0.12]} />
          <meshStandardMaterial color="#ca8a04" />
        </mesh>

        {/* East Java with enhanced visual prominence */}
        <mesh position={[0.15, -0.2, 1.76]}>
          <boxGeometry args={[0.2, 0.12, 0.08]} />
          <meshStandardMaterial
            color="#dc2626"
            emissive="#dc2626"
            emissiveIntensity={hovered ? 0.7 : clicked ? 0.9 : 0.3}
          />
        </mesh>

        <mesh position={[0.1, 0.4, 1.65]}>
          <sphereGeometry args={[0.35, 16, 16]} />
          <meshStandardMaterial color="#16a34a" />
        </mesh>

        <mesh position={[0.6, 0.1, 1.6]}>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial color="#16a34a" />
        </mesh>

        <mesh position={[1.2, -0.1, 1.4]}>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial color="#16a34a" />
        </mesh>

        <mesh position={[0.4, -0.35, 1.7]}>
          <sphereGeometry args={[0.08, 12, 12]} />
          <meshStandardMaterial color="#16a34a" />
        </mesh>

        {/* Enhanced interactive tooltip with better UX */}
        {hovered && (
          <Html position={[0, 2.8, 0]} center>
            <div className="bg-background/95 backdrop-blur-sm px-6 py-4 rounded-xl border shadow-xl text-center animate-in fade-in-0 zoom-in-95 max-w-xs">
              <div className="text-base font-semibold text-foreground mb-1">🇮🇩 Indonesia</div>
              <div className="text-sm text-muted-foreground mb-2">Klik untuk menjelajahi Jawa Timur</div>
              <div className="text-xs text-primary font-medium">Interaktif • 3D Experience</div>
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
  const [selectedCity, setSelectedCity] = useState<string | null>(null)

  const cities = [
    { name: "Surabaya", position: [0, 0, 0], color: "#dc2626", description: "Kota Pahlawan" },
    { name: "Malang", position: [-1.5, 0.5, 0], color: "#ca8a04", description: "Kota Apel" },
    { name: "Kediri", position: [-1, -0.5, 0], color: "#16a34a", description: "Kota Tahu" },
    { name: "Jember", position: [1.5, -0.5, 0], color: "#7c3aed", description: "Kota Tembakau" },
    { name: "Probolinggo", position: [1, 0.8, 0], color: "#0ea5e9", description: "Kota Mangga" },
    { name: "Banyuwangi", position: [2, -1, 0], color: "#f59e0b", description: "Sunrise of Java" },
  ]

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.4}>
      <group>
        {/* Back button in 3D space */}
        <Html position={[-3, 2, 0]} center>
          <Button
            onClick={onBack}
            variant="outline"
            size="sm"
            className="bg-background/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali ke Globe
          </Button>
        </Html>

        {/* Title */}
        <Html position={[0, 2.5, 0]} center>
          <div className="bg-background/95 backdrop-blur-sm px-6 py-3 rounded-xl border shadow-xl text-center">
            <h3 className="text-lg font-bold text-foreground">Kota-kota di Jawa Timur</h3>
            <p className="text-sm text-muted-foreground mt-1">Klik untuk menjelajahi setiap kota</p>
          </div>
        </Html>

        {/* Enhanced city representations */}
        {cities.map((city, index) => (
          <group key={city.name}>
            <mesh
              position={city.position as [number, number, number]}
              onClick={() => setSelectedCity(selectedCity === city.name ? null : city.name)}
              onPointerOver={(e) => {
                e.stopPropagation()
                document.body.style.cursor = "pointer"
              }}
              onPointerOut={() => {
                document.body.style.cursor = "auto"
              }}
              scale={selectedCity === city.name ? 1.3 : 1}
            >
              <sphereGeometry args={[0.3, 16, 16]} />
              <meshStandardMaterial
                color={city.color}
                emissive={city.color}
                emissiveIntensity={selectedCity === city.name ? 0.4 : 0.1}
              />
            </mesh>

            {/* City label */}
            <Html position={[city.position[0], city.position[1] + 0.6, city.position[2]]} center>
              <div
                className={`bg-background/90 backdrop-blur-sm px-3 py-2 rounded-lg border text-center transition-all duration-300 ${
                  selectedCity === city.name ? "shadow-xl scale-110" : "shadow-md"
                }`}
              >
                <div className="text-sm font-semibold text-foreground">{city.name}</div>
                <div className="text-xs text-muted-foreground">{city.description}</div>
                {selectedCity === city.name && (
                  <div className="text-xs text-primary mt-1 font-medium">Klik untuk detail</div>
                )}
              </div>
            </Html>
          </group>
        ))}
      </group>
    </Float>
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
  const [bookmarkedItems, setBookmarkedItems] = useState<Set<number>>(new Set())
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const culturalItems = [
    {
      id: 1,
      title: "Tari Reog Ponorogo",
      subtitle: "Kesenian Tari Tradisional",
      description:
        "Tarian tradisional yang menggambarkan kekuatan dan keberanian dengan topeng singa barong yang megah. Merupakan warisan budaya yang telah diakui UNESCO.",
      badge: "Kesenian",
      category: "tari",
      region: "Ponorogo",
      difficulty: "Menengah",
      duration: "45 menit",
      popularity: 95,
      tags: ["tari", "tradisional", "unesco", "ponorogo", "singa barong"],
      lastUpdated: "2024-01-15",
    },
    {
      id: 2,
      title: "Batik Malangan",
      subtitle: "Seni Kerajinan Tekstil",
      description:
        "Batik khas Malang dengan motif yang terinspirasi dari alam dan budaya lokal yang unik. Memiliki ciri khas warna-warna cerah dan motif flora fauna.",
      badge: "Kerajinan",
      category: "batik",
      region: "Malang",
      difficulty: "Tinggi",
      duration: "2-3 hari",
      popularity: 88,
      tags: ["batik", "tekstil", "malang", "kerajinan", "motif"],
      lastUpdated: "2024-01-10",
    },
    {
      id: 3,
      title: "Rujak Cingur",
      subtitle: "Kuliner Tradisional Khas",
      description:
        "Makanan khas Surabaya yang terbuat dari sayuran segar dan cingur sapi dengan bumbu petis yang kaya rasa. Hidangan yang mencerminkan keberagaman kuliner Jawa Timur.",
      badge: "Kuliner",
      category: "makanan",
      region: "Surabaya",
      difficulty: "Mudah",
      duration: "30 menit",
      popularity: 92,
      tags: ["kuliner", "surabaya", "rujak", "petis", "tradisional"],
      lastUpdated: "2024-01-12",
    },
    {
      id: 4,
      title: "Wayang Kulit",
      subtitle: "Seni Pertunjukan Klasik",
      description:
        "Pertunjukan tradisional menggunakan boneka kulit dengan cerita epik Jawa yang filosofis. Seni bercerita yang menggabungkan musik, drama, dan filosofi hidup.",
      badge: "Pertunjukan",
      category: "wayang",
      region: "Jawa Timur",
      difficulty: "Tinggi",
      duration: "6-8 jam",
      popularity: 85,
      tags: ["wayang", "pertunjukan", "filosofi", "epik", "tradisional"],
      lastUpdated: "2024-01-08",
    },
    {
      id: 5,
      title: "Bahasa Jawa Timuran",
      subtitle: "Bahasa Daerah Khas",
      description:
        "Dialek bahasa Jawa yang khas digunakan di wilayah Jawa Timur dengan logat yang unik dan kosakata yang berbeda dari bahasa Jawa pada umumnya.",
      badge: "Bahasa",
      category: "bahasa",
      region: "Jawa Timur",
      difficulty: "Menengah",
      duration: "Berkelanjutan",
      popularity: 78,
      tags: ["bahasa", "dialek", "komunikasi", "budaya", "jawa timur"],
      lastUpdated: "2024-01-05",
    },
    {
      id: 6,
      title: "Gamelan Jawa Timuran",
      subtitle: "Musik Tradisional Ensemble",
      description:
        "Ensemble musik tradisional dengan instrumen perunggu khas Jawa Timur yang harmonis. Memiliki karakteristik nada dan ritme yang berbeda dari gamelan daerah lain.",
      badge: "Musik",
      category: "musik",
      region: "Jawa Timur",
      difficulty: "Tinggi",
      duration: "2-3 jam",
      popularity: 82,
      tags: ["gamelan", "musik", "perunggu", "ensemble", "harmoni"],
      lastUpdated: "2024-01-14",
    },
    {
      id: 7,
      title: "Rawon",
      subtitle: "Kuliner Sup Tradisional",
      description:
        "Sup daging sapi berwarna hitam khas Surabaya dengan rempah kluwek yang kaya rasa. Hidangan yang menjadi ikon kuliner Jawa Timur dengan cita rasa yang unik.",
      badge: "Kuliner",
      category: "makanan",
      region: "Surabaya",
      difficulty: "Menengah",
      duration: "2 jam",
      popularity: 96,
      tags: ["rawon", "sup", "kluwek", "surabaya", "daging sapi"],
      lastUpdated: "2024-01-16",
    },
    {
      id: 8,
      title: "Tari Gandrung",
      subtitle: "Kesenian Tari Klasik",
      description:
        "Tarian tradisional Banyuwangi yang menggambarkan keanggunan wanita Jawa Timur. Tarian yang penuh dengan gerakan lemah gemulai dan makna filosofis yang dalam.",
      badge: "Kesenian",
      category: "tari",
      region: "Banyuwangi",
      difficulty: "Menengah",
      duration: "30 menit",
      popularity: 87,
      tags: ["gandrung", "tari", "banyuwangi", "keanggunan", "filosofis"],
      lastUpdated: "2024-01-11",
    },
    {
      id: 9,
      title: "Kerajinan Bambu",
      subtitle: "Seni Kerajinan Alam",
      description:
        "Berbagai kerajinan dari bambu yang mencerminkan kreativitas masyarakat Jawa Timur. Mulai dari alat rumah tangga hingga karya seni yang bernilai tinggi.",
      badge: "Kerajinan",
      category: "kerajinan",
      region: "Jawa Timur",
      difficulty: "Menengah",
      duration: "1-2 hari",
      popularity: 75,
      tags: ["bambu", "kerajinan", "alam", "kreativitas", "ramah lingkungan"],
      lastUpdated: "2024-01-09",
    },
  ]

  const categories = [
    { value: "semua", label: "Semua Kategori", icon: Globe, count: culturalItems.length },
    {
      value: "tari",
      label: "Tari Tradisional",
      icon: Music,
      count: culturalItems.filter((item) => item.category === "tari").length,
    },
    {
      value: "makanan",
      label: "Kuliner",
      icon: Utensils,
      count: culturalItems.filter((item) => item.category === "makanan").length,
    },
    {
      value: "batik",
      label: "Batik",
      icon: Palette,
      count: culturalItems.filter((item) => item.category === "batik").length,
    },
    {
      value: "musik",
      label: "Musik",
      icon: Music,
      count: culturalItems.filter((item) => item.category === "musik").length,
    },
    {
      value: "bahasa",
      label: "Bahasa",
      icon: Languages,
      count: culturalItems.filter((item) => item.category === "bahasa").length,
    },
    {
      value: "kerajinan",
      label: "Kerajinan",
      icon: Palette,
      count: culturalItems.filter((item) => item.category === "kerajinan").length,
    },
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

    if (category !== "semua") {
      filtered = filtered.filter((item) => item.category === category)
    }

    if (query.trim() !== "") {
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.subtitle.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase()) ||
          item.region.toLowerCase().includes(query.toLowerCase()) ||
          item.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase())),
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
    setIsMenuOpen(false)
  }

  const toggleBookmark = (itemId: number) => {
    const newBookmarks = new Set(bookmarkedItems)
    if (newBookmarks.has(itemId)) {
      newBookmarks.delete(itemId)
    } else {
      newBookmarks.add(itemId)
    }
    setBookmarkedItems(newBookmarks)
  }

  const displayItems = searchQuery || selectedCategory !== "semua" ? filteredItems : culturalItems

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Enhanced background with cultural patterns */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='batik-pattern' x='0' y='0' width='120' height='120' patternUnits='userSpaceOnUse'%3E%3Ccircle cx='20' cy='20' r='8' fill='%23ca8a04' opacity='0.4'/%3E%3Ccircle cx='60' cy='60' r='12' fill='%23ca8a04' opacity='0.3'/%3E%3Ccircle cx='100' cy='20' r='6' fill='%23ca8a04' opacity='0.5'/%3E%3Ccircle cx='20' cy='100' r='10' fill='%23ca8a04' opacity='0.2'/%3E%3Cpath d='M40 40 Q60 20 80 40 Q60 60 40 40' fill='none' stroke='%23ca8a04' strokeWidth='2' opacity='0.3'/%3E%3Cpath d='M80 80 Q100 60 120 80 Q100 100 80 80' fill='none' stroke='%23ca8a04' strokeWidth='2' opacity='0.3'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23batik-pattern)'/%3E%3C/svg%3E")`,
          }}
        />

        <div
          className="absolute inset-0 opacity-[0.02] rotate-45"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='textile-pattern' x='0' y='0' width='80' height='80' patternUnits='userSpaceOnUse'%3E%3Cpath d='M0 40 Q20 20 40 40 Q60 60 80 40' fill='none' stroke='%23dc2626' strokeWidth='1' opacity='0.6'/%3E%3Cpath d='M40 0 Q60 20 40 40 Q20 60 40 80' fill='none' stroke='%23dc2626' strokeWidth='1' opacity='0.6'/%3E%3Ccircle cx='40' cy='40' r='3' fill='%23dc2626' opacity='0.4'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23textile-pattern)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Cultural motif decorations */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-32 h-32 opacity-[0.025] rotate-12">
          <div className="w-full h-full text-amber-700">
            <svg viewBox="0 0 100 100" className="w-full h-full" fill="currentColor">
              <path d="M50 10 C60 15 65 25 60 35 L65 50 C70 60 65 70 55 75 L50 90 L45 75 C35 70 30 60 35 50 L40 35 C35 25 40 15 50 10 Z" />
              <circle cx="45" cy="30" r="3" fill="white" />
              <circle cx="55" cy="30" r="3" fill="white" />
            </svg>
          </div>
        </div>

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

        <div className="absolute top-1/3 right-1/3 w-20 h-20 opacity-[0.03] -rotate-12">
          <div className="w-full h-full text-red-700">
            <svg viewBox="0 0 100 100" className="w-full h-full" fill="currentColor">
              <path d="M50 10 L52 20 L48 30 L52 40 L48 50 L52 60 L48 70 L50 80 L48 70 L52 60 L48 50 L52 40 L48 30 L52 20 Z" />
              <ellipse cx="50" cy="15" rx="8" ry="4" />
            </svg>
          </div>
        </div>

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

      {/* Gradient overlays */}
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
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-xl supports-[backdrop-filter]:bg-background/80 border-b border-border/50 shadow-lg transition-all duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Enhanced logo with better accessibility */}
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/70 rounded-lg flex items-center justify-center shadow-md">
                  <Globe className="h-5 w-5 text-primary-foreground" />
                </div>
                <h1 className="text-xl font-bold text-primary font-[family-name:var(--font-manrope)] tracking-tight">
                  {"UB Corpora"}
                </h1>
                <Badge variant="secondary" className="text-xs hidden sm:inline-flex">
                  Budaya Jawa Timur
                </Badge>
              </div>

              {/* Enhanced desktop navigation with better UX */}
              <div className="hidden md:flex items-center space-x-1">
                <button
                  onClick={() => handleNavClick("beranda")}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg text-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300 group relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary/20"
                  aria-label="Navigasi ke beranda"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Home className="h-4 w-4 group-hover:scale-110 transition-transform duration-200 relative z-10" />
                  <span className="font-medium relative z-10">Beranda</span>
                </button>
                <button
                  onClick={() => handleNavClick("eksplorasi")}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg text-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300 group relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary/20"
                  aria-label="Navigasi ke eksplorasi budaya"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Compass className="h-4 w-4 group-hover:scale-110 transition-transform duration-200 relative z-10" />
                  <span className="font-medium relative z-10">Eksplorasi</span>
                </button>
                <button
                  onClick={() => handleNavClick("tentang")}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg text-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300 group relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary/20"
                  aria-label="Navigasi ke tentang kami"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Info className="h-4 w-4 group-hover:scale-110 transition-transform duration-200 relative z-10" />
                  <span className="font-medium relative z-10">Tentang</span>
                </button>
                <button
                  onClick={() => handleNavClick("kontak")}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg text-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300 group relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary/20"
                  aria-label="Navigasi ke kontak"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Mail className="h-4 w-4 group-hover:scale-110 transition-transform duration-200 relative z-10" />
                  <span className="font-medium relative z-10">Kontak</span>
                </button>

                {/* Enhanced integrated search with better accessibility */}
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
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && navSearchQuery) {
                            handleSearch(navSearchQuery)
                            handleNavClick("eksplorasi")
                            setShowNavSearch(false)
                          }
                        }}
                        autoFocus
                        aria-label="Pencarian budaya"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setShowNavSearch(false)
                          setNavSearchQuery("")
                        }}
                        className="h-6 w-6 p-0 hover:bg-muted-foreground/10"
                        aria-label="Tutup pencarian"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ) : (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowNavSearch(true)}
                      className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-primary/10 transition-all duration-300 group relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary/20"
                      aria-label="Buka pencarian"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <Search className="h-4 w-4 group-hover:scale-110 transition-transform duration-200 relative z-10" />
                      <span className="text-sm font-medium relative z-10">Cari</span>
                    </Button>
                  )}
                </div>

                {/* Help button for better UCD */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="ml-2 p-2 hover:bg-primary/10 transition-all duration-300"
                  aria-label="Bantuan navigasi"
                  title="Bantuan navigasi"
                >
                  <HelpCircle className="h-4 w-4" />
                </Button>
              </div>

              {/* Enhanced mobile menu button */}
              <div className="md:hidden flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowNavSearch(!showNavSearch)}
                  className="p-2"
                  aria-label="Toggle pencarian mobile"
                >
                  <Search className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-2"
                  aria-label="Toggle menu mobile"
                >
                  {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </Button>
              </div>
            </div>

            {/* Enhanced mobile search bar */}
            {showNavSearch && (
              <div className="md:hidden pb-4">
                <div className="flex items-center space-x-2 bg-muted/50 rounded-lg px-3 py-2 border border-border/50">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Cari budaya, kesenian, kuliner..."
                    value={navSearchQuery}
                    onChange={(e) => setNavSearchQuery(e.target.value)}
                    className="border-0 bg-transparent p-0 h-auto focus-visible:ring-0"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && navSearchQuery) {
                        handleSearch(navSearchQuery)
                        handleNavClick("eksplorasi")
                        setShowNavSearch(false)
                      }
                    }}
                    aria-label="Pencarian budaya mobile"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setShowNavSearch(false)
                      setNavSearchQuery("")
                    }}
                    className="h-6 w-6 p-0"
                    aria-label="Tutup pencarian mobile"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Enhanced mobile navigation with better accessibility */}
          {isMenuOpen && (
            <div className="md:hidden bg-card/95 backdrop-blur-sm border-t border-border shadow-lg">
              <div className="px-4 pt-4 pb-6 space-y-2">
                <button
                  onClick={() => handleNavClick("beranda")}
                  className="flex items-center space-x-3 px-3 py-3 rounded-lg text-foreground hover:text-primary hover:bg-primary/5 transition-all duration-200 w-full text-left focus:outline-none focus:ring-2 focus:ring-primary/20"
                  aria-label="Navigasi ke beranda"
                >
                  <Home className="h-5 w-5" />
                  <span className="font-medium">Beranda</span>
                </button>
                <button
                  onClick={() => handleNavClick("eksplorasi")}
                  className="flex items-center space-x-3 px-3 py-3 rounded-lg text-foreground hover:text-primary hover:bg-primary/5 transition-all duration-200 w-full text-left focus:outline-none focus:ring-2 focus:ring-primary/20"
                  aria-label="Navigasi ke eksplorasi budaya"
                >
                  <Compass className="h-5 w-5" />
                  <span className="font-medium">Eksplorasi</span>
                </button>
                <button
                  onClick={() => handleNavClick("tentang")}
                  className="flex items-center space-x-3 px-3 py-3 rounded-lg text-foreground hover:text-primary hover:bg-primary/5 transition-all duration-200 w-full text-left focus:outline-none focus:ring-2 focus:ring-primary/20"
                  aria-label="Navigasi ke tentang kami"
                >
                  <Info className="h-5 w-5" />
                  <span className="font-medium">Tentang</span>
                </button>
                <button
                  onClick={() => handleNavClick("kontak")}
                  className="flex items-center space-x-3 px-3 py-3 rounded-lg text-foreground hover:text-primary hover:bg-primary/5 transition-all duration-200 w-full text-left focus:outline-none focus:ring-2 focus:ring-primary/20"
                  aria-label="Navigasi ke kontak"
                >
                  <Mail className="h-5 w-5" />
                  <span className="font-medium">Kontak</span>
                </button>
              </div>
            </div>
          )}
        </nav>

        <section id="beranda" className="relative min-h-screen flex items-center" role="banner">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 -left-20 w-96 h-96 bg-gradient-to-r from-amber-100/20 to-orange-100/20 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-gradient-to-l from-emerald-100/20 to-teal-100/20 rounded-full blur-3xl" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center relative z-10">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-2 mb-4">
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                    <Star className="h-3 w-3 mr-1" />
                    Platform Budaya Digital
                  </Badge>
                  <Badge variant="outline" className="bg-emerald-100/50 text-emerald-700 border-emerald-200">
                    <Shield className="h-3 w-3 mr-1" />
                    Terpercaya
                  </Badge>
                </div>

                <h1 className="text-4xl md:text-6xl font-bold text-balance font-[family-name:var(--font-manrope)]">
                  Jelajahi Warisan
                  <span className="text-primary block">Budaya Jawa Timur</span>
                  <span className="text-2xl md:text-3xl font-normal block mt-2 text-muted-foreground">
                    yang Tak Ternilai
                  </span>
                </h1>

                <p className="text-lg text-muted-foreground max-w-lg text-pretty leading-relaxed">
                  Temukan kekayaan tradisi, budaya dan seni yang telah diwariskan turun temurun di kebudayaan Jawa
                  Timur. Mari bersama-sama menjaga warisan budaya untuk generasi mendatang.
                </p>

                {/* User value proposition */}
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <Eye className="h-4 w-4 text-primary" />
                    <span>Eksplorasi Interaktif</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <BookOpen className="h-4 w-4 text-primary" />
                    <span>Konten Edukatif</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Accessibility className="h-4 w-4 text-primary" />
                    <span>Mudah Diakses</span>
                  </div>
                </div>
              </div>

              {/* Enhanced CTA buttons with better UX */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="text-lg px-8 group relative overflow-hidden"
                  onClick={() => handleNavClick("eksplorasi")}
                  aria-label="Mulai menjelajahi budaya Jawa Timur"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Compass className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform duration-200" />
                  Mulai Eksplorasi Budaya
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 bg-transparent group"
                  onClick={() => handleNavClick("tentang")}
                  aria-label="Pelajari lebih lanjut tentang platform"
                >
                  <BookOpen className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform duration-200" />
                  Pelajari Lebih Lanjut
                </Button>
              </div>

              {/* Enhanced statistics with better visual hierarchy */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center group">
                  <div className="text-2xl font-bold text-primary group-hover:scale-110 transition-transform duration-200">
                    38
                  </div>
                  <div className="text-sm text-muted-foreground">Kabupaten Kota</div>
                </div>
                <div className="text-center group">
                  <div className="text-2xl font-bold text-primary group-hover:scale-110 transition-transform duration-200">
                    100+
                  </div>
                  <div className="text-sm text-muted-foreground">Kesenian Tradisional</div>
                </div>
                <div className="text-center group">
                  <div className="text-2xl font-bold text-primary group-hover:scale-110 transition-transform duration-200">
                    50+
                  </div>
                  <div className="text-sm text-muted-foreground">Kuliner Khas</div>
                </div>
              </div>

              {/* Quick access buttons */}
              <div className="flex flex-wrap gap-2 pt-4">
                <Button variant="ghost" size="sm" className="text-xs" onClick={() => handleNavClick("eksplorasi")}>
                  <Music className="h-3 w-3 mr-1" />
                  Tari Tradisional
                </Button>
                <Button variant="ghost" size="sm" className="text-xs" onClick={() => handleNavClick("eksplorasi")}>
                  <Utensils className="h-3 w-3 mr-1" />
                  Kuliner Khas
                </Button>
                <Button variant="ghost" size="sm" className="text-xs" onClick={() => handleNavClick("eksplorasi")}>
                  <Palette className="h-3 w-3 mr-1" />
                  Kerajinan
                </Button>
              </div>
            </div>

            {/* Enhanced 3D globe section */}
            <div className="h-96 lg:h-[600px] w-full relative">
              <div className="absolute top-4 right-4 z-10">
                <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                  <Globe className="h-3 w-3 mr-1" />
                  Interaktif 3D
                </Badge>
              </div>
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

        <section id="eksplorasi" className="py-20 bg-muted/30 relative" role="main">
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
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                  <Compass className="h-3 w-3 mr-1" />
                  Eksplorasi Budaya
                </Badge>
                <Badge variant="outline" className="bg-emerald-100/50 text-emerald-700 border-emerald-200">
                  <Target className="h-3 w-3 mr-1" />
                  Mudah Ditemukan
                </Badge>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-manrope)]">
                Eksplorasi
                <span className="text-primary block">Budaya Jawa Timur</span>
              </h2>

              <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
                Jelajahi kekayaan budaya Jawa Timur melalui berbagai aspek tradisi yang masih lestari hingga saat ini.
                Temukan kesenian, kuliner, bahasa, dan warisan budaya lainnya dengan mudah.
              </p>
            </div>

            {/* Enhanced search and filter interface */}
            <div className="max-w-4xl mx-auto mb-12 space-y-6">
              {/* Main search bar with better UX */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  placeholder="Cari kesenian, makanan, bahasa, musik, dan aspek budaya lainnya..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-12 h-14 text-base rounded-xl border-2 focus:border-primary transition-all duration-300"
                  aria-label="Pencarian konten budaya"
                />
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSearch("")}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                    aria-label="Hapus pencarian"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>

              {/* Enhanced category filters with counts */}
              <div className="flex flex-wrap gap-2 justify-center">
                {categories.map((category) => {
                  const IconComponent = category.icon
                  return (
                    <Button
                      key={category.value}
                      variant={selectedCategory === category.value ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleCategoryChange(category.value)}
                      className="rounded-full group relative overflow-hidden"
                      aria-label={`Filter kategori ${category.label}`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <IconComponent className="h-4 w-4 mr-2 relative z-10" />
                      <span className="relative z-10">{category.label}</span>
                      <Badge variant="secondary" className="ml-2 text-xs relative z-10">
                        {category.count}
                      </Badge>
                    </Button>
                  )
                })}
              </div>

              {/* View mode toggle */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    aria-label="Tampilan grid"
                  >
                    <div className="grid grid-cols-2 gap-1 h-4 w-4">
                      <div className="bg-current rounded-sm"></div>
                      <div className="bg-current rounded-sm"></div>
                      <div className="bg-current rounded-sm"></div>
                      <div className="bg-current rounded-sm"></div>
                    </div>
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    aria-label="Tampilan list"
                  >
                    <div className="space-y-1 h-4 w-4">
                      <div className="bg-current h-1 w-full rounded"></div>
                      <div className="bg-current h-1 w-full rounded"></div>
                      <div className="bg-current h-1 w-full rounded"></div>
                    </div>
                  </Button>
                </div>

                {/* Search results info with better UX */}
                {(searchQuery || selectedCategory !== "semua") && (
                  <div className="text-sm text-muted-foreground">
                    {displayItems.length > 0
                      ? `Ditemukan ${displayItems.length} hasil${searchQuery ? ` untuk "${searchQuery}"` : ""}${selectedCategory !== "semua" ? ` dalam kategori ${categories.find((c) => c.value === selectedCategory)?.label}` : ""}`
                      : `Tidak ada hasil${searchQuery ? ` untuk "${searchQuery}"` : ""}${selectedCategory !== "semua" ? ` dalam kategori ${categories.find((c) => c.value === selectedCategory)?.label}` : ""}`}
                  </div>
                )}
              </div>
            </div>

            {/* Enhanced content grid with better UCD */}
            <div
              className={`grid gap-6 ${viewMode === "grid" ? "md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1 max-w-4xl mx-auto"}`}
            >
              {displayItems.map((item, index) => (
                <Card
                  key={item.id}
                  className={`group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/20 ${
                    viewMode === "list" ? "flex flex-row" : ""
                  }`}
                >
                  {viewMode === "list" && (
                    <div className="w-24 h-24 bg-gradient-to-br from-primary/10 to-primary/5 rounded-l-lg flex items-center justify-center">
                      {item.category === "tari" && <Music className="h-8 w-8 text-primary" />}
                      {item.category === "makanan" && <Utensils className="h-8 w-8 text-primary" />}
                      {item.category === "batik" && <Palette className="h-8 w-8 text-primary" />}
                      {item.category === "musik" && <Music className="h-8 w-8 text-primary" />}
                      {item.category === "bahasa" && <Languages className="h-8 w-8 text-primary" />}
                      {item.category === "kerajinan" && <Palette className="h-8 w-8 text-primary" />}
                      {item.category === "wayang" && <Camera className="h-8 w-8 text-primary" />}
                    </div>
                  )}

                  <div className={viewMode === "list" ? "flex-1" : ""}>
                    <CardHeader className={viewMode === "list" ? "pb-2" : ""}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary" className="font-medium">
                            {item.badge}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {item.region}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleBookmark(item.id)}
                            className="h-8 w-8 p-0 hover:bg-primary/10"
                            aria-label={bookmarkedItems.has(item.id) ? "Hapus dari bookmark" : "Tambah ke bookmark"}
                          >
                            <Bookmark
                              className={`h-4 w-4 ${bookmarkedItems.has(item.id) ? "fill-primary text-primary" : "text-muted-foreground"}`}
                            />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 hover:bg-primary/10"
                            aria-label="Bagikan konten"
                          >
                            <Share2 className="h-4 w-4 text-muted-foreground" />
                          </Button>
                        </div>
                      </div>

                      <CardTitle className="font-[family-name:var(--font-manrope)] group-hover:text-primary transition-colors">
                        {item.title}
                      </CardTitle>
                      <CardDescription className="text-primary font-medium">{item.subtitle}</CardDescription>

                      {/* Enhanced metadata */}
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground mt-2">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{item.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Target className="h-3 w-3" />
                          <span>{item.difficulty}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="h-3 w-3 fill-current text-amber-500" />
                          <span>{item.popularity}%</span>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className={viewMode === "list" ? "pt-0" : ""}>
                      <p className="text-muted-foreground leading-relaxed mb-4">{item.description}</p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {item.tags.slice(0, 3).map((tag, tagIndex) => (
                          <Badge key={tagIndex} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {item.tags.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{item.tags.length - 3}
                          </Badge>
                        )}
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center justify-between">
                        <Button
                          size="sm"
                          variant="outline"
                          className="group bg-transparent"
                          onClick={() => (window.location.href = `/budaya/${item.id}`)}
                        >
                          <Eye className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
                          Lihat Detail
                        </Button>
                        <div className="text-xs text-muted-foreground">
                          Diperbarui {new Date(item.lastUpdated).toLocaleDateString("id-ID")}
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>

            {/* Enhanced no results state with better UX */}
            {(searchQuery || selectedCategory !== "semua") && displayItems.length === 0 && (
              <div className="text-center py-16">
                <div className="mb-6">
                  <div className="w-24 h-24 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="h-12 w-12 text-muted-foreground/50" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Tidak menemukan hasil yang sesuai</h3>
                  <p className="text-muted-foreground mb-6">
                    Coba gunakan kata kunci yang berbeda atau pilih kategori lain untuk menemukan konten budaya yang
                    Anda cari.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
                  <Button variant="outline" onClick={() => handleSearch("")}>
                    <X className="h-4 w-4 mr-2" />
                    Hapus Pencarian
                  </Button>
                  <Button variant="outline" onClick={() => handleCategoryChange("semua")}>
                    <Globe className="h-4 w-4 mr-2" />
                    Tampilkan Semua Kategori
                  </Button>
                </div>

                {/* Suggested searches */}
                <div className="text-sm text-muted-foreground">
                  <p className="mb-2">Coba cari:</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {["reog", "batik", "rawon", "gamelan", "wayang"].map((suggestion) => (
                      <Button
                        key={suggestion}
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSearch(suggestion)}
                        className="text-xs"
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        <section id="tentang" className="py-20 relative" role="complementary">
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
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Badge className="bg-primary/10 text-primary border-primary/20">
                  <Heart className="h-3 w-3 mr-1" />
                  Warisan Kita
                </Badge>
                <Badge variant="outline" className="bg-emerald-100/50 text-emerald-700 border-emerald-200">
                  <Shield className="h-3 w-3 mr-1" />
                  Terjaga & Lestari
                </Badge>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-manrope)]">
                Melestarikan Warisan
                <span className="text-primary block">Budaya Jawa Timur</span>
              </h2>

              <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
                UB Corpra adalah platform digital yang inovatif yang menggabungkan teknologi modern dengan kearifan
                lokal untuk melestarikan dan memperkenalkan warisan budaya Jawa Timur kepada dunia.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                {/* Enhanced mission card */}
                <Card className="group hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center space-x-2 mb-2">
                      <Target className="h-5 w-5 text-primary" />
                      <CardTitle className="font-[family-name:var(--font-manrope)]">Misi Kami</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      Menyediakan platform digital yang mudah diakses untuk memperkenalkan, mempelajari, dan
                      melestarikan warisan budaya Jawa Timur yang kaya dan beragam. Kami berkomitmen untuk menjembatani
                      generasi muda dengan tradisi leluhur melalui teknologi interaktif dan konten edukatif yang
                      menarik.
                    </p>
                  </CardContent>
                </Card>

                {/* Enhanced vision card */}
                <Card className="group hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center space-x-2 mb-2">
                      <Lightbulb className="h-5 w-5 text-primary" />
                      <CardTitle className="font-[family-name:var(--font-manrope)]">Visi Kami</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      Menjadi jembatan antara tradisi masa lalu dan generasi masa depan, memastikan warisan budaya Jawa
                      Timur tetap hidup, berkembang, dan dikenal luas. Kami ingin menciptakan ekosistem digital yang
                      mendukung pelestarian budaya berkelanjutan dan aksesible bagi semua kalangan.
                    </p>
                  </CardContent>
                </Card>

                {/* Enhanced features card */}
                <Card className="group hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center space-x-2 mb-2">
                      <Star className="h-5 w-5 text-primary" />
                      <CardTitle className="font-[family-name:var(--font-manrope)]">Fitur Unggulan</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-muted-foreground space-y-3">
                      <li className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span>Eksplorasi interaktif dengan teknologi 3D</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span>Database lengkap kesenian dan tradisi Jawa Timur</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span>Pencarian cerdas untuk menemukan konten budaya</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span>Kolaborasi dengan komunitas dan ahli budaya</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span>Konten multimedia yang edukatif dan menarik</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span>Aksesibilitas untuk semua pengguna</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* User testimonial or trust indicators */}
                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="pt-6">
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <span className="text-sm font-medium">4.9/5 dari pengguna</span>
                    </div>
                    <p className="text-sm text-muted-foreground italic">
                      "Platform yang luar biasa untuk mempelajari budaya Jawa Timur. Sangat mudah digunakan dan
                      kontennya sangat lengkap!"
                    </p>
                    <div className="text-xs text-muted-foreground mt-2">- Pengguna Platform</div>
                  </CardContent>
                </Card>
              </div>

              {/* Enhanced 3D visualization */}
              <div className="h-96 w-full relative">
                <div className="absolute top-4 right-4 z-10">
                  <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                    <Play className="h-3 w-3 mr-1" />
                    Animasi 3D
                  </Badge>
                </div>
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

        {/* Enhanced achievement section */}
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
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 mb-4">
                <Award className="h-3 w-3 mr-1" />
                Pencapaian Platform
              </Badge>

              <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-manrope)]">Pencapaian Kami</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
                Bangga menjadi bagian dari pelestarian budaya Jawa Timur dengan dukungan komunitas yang luas
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-3xl font-bold group-hover:text-primary transition-colors">
                    10,000+
                  </CardTitle>
                  <CardDescription className="font-medium">Pengguna Aktif</CardDescription>
                  <div className="text-xs text-muted-foreground mt-2">Tumbuh 25% setiap bulan</div>
                </CardHeader>
              </Card>

              <Card className="text-center group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Award className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-3xl font-bold group-hover:text-primary transition-colors">50+</CardTitle>
                  <CardDescription className="font-medium">Item Budaya</CardDescription>
                  <div className="text-xs text-muted-foreground mt-2">Terus bertambah setiap minggu</div>
                </CardHeader>
              </Card>

              <Card className="text-center group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <MapPin className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-3xl font-bold group-hover:text-primary transition-colors">7</CardTitle>
                  <CardDescription className="font-medium">Kota Jawa Timur</CardDescription>
                  <div className="text-xs text-muted-foreground mt-2">Target 38 kabupaten/kota</div>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Enhanced values section */}
        <section className="py-20 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-16">
              <Badge variant="outline" className="bg-emerald-100/50 text-emerald-700 border-emerald-200 mb-4">
                <Heart className="h-3 w-3 mr-1" />
                Nilai-Nilai Kami
              </Badge>

              <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-manrope)]">
                Nilai-Nilai Kami
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center group hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Accessibility className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="font-[family-name:var(--font-manrope)]">Aksesibilitas</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Memastikan platform budaya dapat diakses oleh semua kalangan tanpa terkecuali, dengan antarmuka yang
                    ramah pengguna.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center group hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="font-[family-name:var(--font-manrope)]">Inovasi</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Menggabungkan teknologi modern dengan kearifan tradisional untuk menciptakan pengalaman belajar yang
                    unik dan menarik.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center group hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="font-[family-name:var(--font-manrope)]">Kelestarian</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Berkomitmen untuk menjaga dan melestarikan warisan budaya Jawa Timur untuk generasi masa depan.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="kontak" className="py-20 bg-muted/30 relative" role="contentinfo">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-16">
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 mb-4">
                <MessageCircle className="h-3 w-3 mr-1" />
                Mari Berkolaborasi
              </Badge>

              <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-manrope)]">
                Mari Berkolaborasi
                <span className="text-primary block">untuk Budaya Jawa Timur</span>
              </h2>

              <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
                Kami terbuka untuk berkolaborasi dengan berbagai pihak yang peduli dengan pelestarian budaya Jawa Timur.
                Mari bersama-sama menjaga warisan budaya untuk generasi mendatang.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Enhanced collaboration options */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold mb-6">Cara Berkolaborasi</h3>

                <div className="grid gap-4">
                  <Card className="group hover:shadow-lg transition-all duration-300 hover:border-primary/20">
                    <CardHeader className="pb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Users className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-base">Pertanyaan Umum</CardTitle>
                          <CardDescription className="text-sm">
                            Informasi umum tentang platform dan budaya
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>

                  <Card className="group hover:shadow-lg transition-all duration-300 hover:border-primary/20">
                    <CardHeader className="pb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Heart className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-base">Kolaborasi</CardTitle>
                          <CardDescription className="text-sm">
                            Kerjasama penelitian, dokumentasi, dan pengembangan
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>

                  <Card className="group hover:shadow-lg transition-all duration-300 hover:border-primary/20">
                    <CardHeader className="pb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <BookOpen className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-base">Kontribusi Konten</CardTitle>
                          <CardDescription className="text-sm">
                            Berbagi pengetahuan dan dokumentasi budaya
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                </div>

                {/* Contact information */}
                <div className="mt-8 p-6 bg-primary/5 rounded-xl border border-primary/20">
                  <h4 className="font-semibold mb-4 flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-primary" />
                    Informasi Kontak
                  </h4>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>Email: info@ubcorpra.ac.id</p>
                    <p>Telepon: +62 341 551611</p>
                    <p>Alamat: Universitas Brawijaya, Malang, Jawa Timur</p>
                  </div>
                </div>
              </div>

              {/* Enhanced contact form with better UX */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MessageCircle className="h-5 w-5 mr-2 text-primary" />
                      Kirim Pesan
                    </CardTitle>
                    <CardDescription>Isi formulir di bawah ini untuk menghubungi tim kami</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="firstName" className="text-sm font-medium">
                          Nama Depan *
                        </label>
                        <Input id="firstName" placeholder="Masukkan nama depan" required aria-required="true" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="lastName" className="text-sm font-medium">
                          Nama Belakang
                        </label>
                        <Input id="lastName" placeholder="Masukkan nama belakang" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email *
                      </label>
                      <Input id="email" type="email" placeholder="nama@email.com" required aria-required="true" />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium">
                        Subjek *
                      </label>
                      <Input id="subject" placeholder="Topik pesan Anda" required aria-required="true" />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Pesan *
                      </label>
                      <textarea
                        id="message"
                        className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Tulis pesan Anda di sini..."
                        required
                        aria-required="true"
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="newsletter" className="rounded border-input" />
                      <label htmlFor="newsletter" className="text-sm text-muted-foreground">
                        Saya ingin menerima update tentang budaya Jawa Timur
                      </label>
                    </div>

                    <Button className="w-full group" size="lg">
                      <Mail className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
                      Kirim Pesan
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                      Dengan mengirim pesan, Anda menyetujui kebijakan privasi kami
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced footer */}
        <footer className="bg-background border-t border-border py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/70 rounded-lg flex items-center justify-center">
                    <Globe className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-bold text-primary">UB Corpora</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Platform digital untuk melestarikan dan memperkenalkan warisan budaya Jawa Timur kepada dunia.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Navigasi</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <button onClick={() => handleNavClick("beranda")} className="hover:text-primary transition-colors">
                      Beranda
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleNavClick("eksplorasi")}
                      className="hover:text-primary transition-colors"
                    >
                      Eksplorasi
                    </button>
                  </li>
                  <li>
                    <button onClick={() => handleNavClick("tentang")} className="hover:text-primary transition-colors">
                      Tentang
                    </button>
                  </li>
                  <li>
                    <button onClick={() => handleNavClick("kontak")} className="hover:text-primary transition-colors">
                      Kontak
                    </button>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Kategori Budaya</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <button
                      onClick={() => {
                        handleCategoryChange("tari")
                        handleNavClick("eksplorasi")
                      }}
                      className="hover:text-primary transition-colors"
                    >
                      Tari Tradisional
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        handleCategoryChange("makanan")
                        handleNavClick("eksplorasi")
                      }}
                      className="hover:text-primary transition-colors"
                    >
                      Kuliner
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        handleCategoryChange("batik")
                        handleNavClick("eksplorasi")
                      }}
                      className="hover:text-primary transition-colors"
                    >
                      Batik
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        handleCategoryChange("musik")
                        handleNavClick("eksplorasi")
                      }}
                      className="hover:text-primary transition-colors"
                    >
                      Musik
                    </button>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Kontak</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>info@ubcorpra.ac.id</li>
                  <li>+62 341 551611</li>
                  <li>Universitas Brawijaya</li>
                  <li>Malang, Jawa Timur</li>
                </ul>
              </div>
            </div>

            <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
              <p>© 2025 UB Corpora. Semua hak cipta dilindungi. Dibuat dengan ❤️ untuk budaya Jawa Timur.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
