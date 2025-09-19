export interface CulturalItem {
  id: number
  title: string
  subtitle: string
  description: string
  badge: string
  category: string
  region: string
  difficulty: string
  duration: string
  popularity: number
  tags: string[]
  lastUpdated: string
  imageUrl?: string
  videoUrl?: string
  audioUrl?: string
  relatedItems?: number[]
}

export const culturalItems: CulturalItem[] = [
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
    relatedItems: [2, 5, 8],
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
    relatedItems: [1, 3, 7],
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
    relatedItems: [4, 6, 9],
  },
  {
    id: 4,
    title: "Rawon",
    subtitle: "Kuliner Sup Daging Khas",
    description:
      "Sup daging sapi berwarna hitam khas Jawa Timur dengan bumbu kluwek yang memberikan cita rasa unik dan aroma yang menggugah selera.",
    badge: "Kuliner",
    category: "makanan",
    region: "Surabaya",
    difficulty: "Menengah",
    duration: "2 jam",
    popularity: 94,
    tags: ["kuliner", "rawon", "kluwek", "surabaya", "sup"],
    lastUpdated: "2024-01-08",
    relatedItems: [3, 5, 10],
  },
  {
    id: 5,
    title: "Gamelan Jawa Timuran",
    subtitle: "Musik Tradisional",
    description:
      "Ensemble musik tradisional dengan karakteristik khas Jawa Timur yang berbeda dari gamelan Jawa Tengah dan Yogyakarta.",
    badge: "Musik",
    category: "musik",
    region: "Jawa Timur",
    difficulty: "Tinggi",
    duration: "1-2 jam",
    popularity: 85,
    tags: ["musik", "gamelan", "tradisional", "ensemble", "jawa timur"],
    lastUpdated: "2024-01-05",
    relatedItems: [1, 6, 8],
  },
  {
    id: 6,
    title: "Wayang Kulit Jawa Timuran",
    subtitle: "Seni Pertunjukan Tradisional",
    description:
      "Pertunjukan wayang kulit dengan gaya khas Jawa Timur yang memiliki karakteristik berbeda dalam cerita dan gaya penyajian.",
    badge: "Pertunjukan",
    category: "wayang",
    region: "Jawa Timur",
    difficulty: "Tinggi",
    duration: "6-8 jam",
    popularity: 87,
    tags: ["wayang", "kulit", "pertunjukan", "tradisional", "cerita"],
    lastUpdated: "2024-01-03",
    relatedItems: [5, 7, 1],
  },
  {
    id: 7,
    title: "Kerajinan Gerabah Plered",
    subtitle: "Kerajinan Tanah Liat",
    description:
      "Kerajinan gerabah tradisional dari Plered, Purwakarta yang terkenal dengan kualitas dan keindahan motifnya.",
    badge: "Kerajinan",
    category: "kerajinan",
    region: "Plered",
    difficulty: "Menengah",
    duration: "1-2 hari",
    popularity: 78,
    tags: ["gerabah", "kerajinan", "tanah liat", "plered", "motif"],
    lastUpdated: "2024-01-01",
    relatedItems: [2, 8, 6],
  },
  {
    id: 8,
    title: "Bahasa Jawa Timuran",
    subtitle: "Bahasa Daerah",
    description:
      "Dialek bahasa Jawa yang berkembang di wilayah Jawa Timur dengan karakteristik dan kosakata yang unik.",
    badge: "Bahasa",
    category: "bahasa",
    region: "Jawa Timur",
    difficulty: "Menengah",
    duration: "Berkelanjutan",
    popularity: 82,
    tags: ["bahasa", "jawa", "dialek", "komunikasi", "budaya"],
    lastUpdated: "2023-12-28",
    relatedItems: [1, 5, 7],
  },
  {
    id: 9,
    title: "Soto Lamongan",
    subtitle: "Kuliner Sup Ayam Khas",
    description:
      "Soto ayam khas Lamongan dengan kuah bening yang segar dan bumbu yang khas, dilengkapi dengan kerupuk dan sambal.",
    badge: "Kuliner",
    category: "makanan",
    region: "Lamongan",
    difficulty: "Mudah",
    duration: "1 jam",
    popularity: 90,
    tags: ["soto", "lamongan", "ayam", "kuah", "kerupuk"],
    lastUpdated: "2023-12-25",
    relatedItems: [3, 4, 10],
  },
  {
    id: 10,
    title: "Tari Gandrung Banyuwangi",
    subtitle: "Tari Tradisional Pesisir",
    description:
      "Tarian tradisional dari Banyuwangi yang menggambarkan kegembiraan dan semangat masyarakat pesisir Jawa Timur.",
    badge: "Kesenian",
    category: "tari",
    region: "Banyuwangi",
    difficulty: "Menengah",
    duration: "30 menit",
    popularity: 86,
    tags: ["tari", "gandrung", "banyuwangi", "pesisir", "tradisional"],
    lastUpdated: "2023-12-20",
    relatedItems: [1, 6, 8],
  },
]

export const getCulturalItemById = (id: number): CulturalItem | undefined => {
  return culturalItems.find((item) => item.id === id)
}

export const getCulturalItemsByCategory = (category: string): CulturalItem[] => {
  if (category === "semua") return culturalItems
  return culturalItems.filter((item) => item.category === category)
}

export const searchCulturalItems = (query: string): CulturalItem[] => {
  if (!query.trim()) return culturalItems

  const lowercaseQuery = query.toLowerCase()
  return culturalItems.filter(
    (item) =>
      item.title.toLowerCase().includes(lowercaseQuery) ||
      item.description.toLowerCase().includes(lowercaseQuery) ||
      item.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery)) ||
      item.region.toLowerCase().includes(lowercaseQuery),
  )
}

export const getRelatedItems = (itemId: number): CulturalItem[] => {
  const item = getCulturalItemById(itemId)
  if (!item || !item.relatedItems) return []

  return item.relatedItems
    .map((id) => getCulturalItemById(id))
    .filter((item): item is CulturalItem => item !== undefined)
}
