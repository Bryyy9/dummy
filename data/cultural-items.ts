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
    title: "Reog Ponorogo Dance",
    subtitle: "Traditional Dance Art",
    description:
      "A traditional performance that portrays strength and bravery featuring the majestic Singa Barong lion mask. Recognized by UNESCO as cultural heritage.",
    badge: "Arts",
    category: "tari",
    region: "Ponorogo",
    difficulty: "Medium",
    duration: "45 minutes",
    popularity: 95,
    tags: ["dance", "traditional", "UNESCO", "ponorogo", "singa barong"],
    lastUpdated: "2024-01-15",
    relatedItems: [2, 5, 8],
  },
  {
    id: 2,
    title: "Malangan Batik",
    subtitle: "Textile Handicraft Art",
    description:
      "Distinctive batik from Malang with motifs inspired by nature and unique local culture. Known for bright colors and flora–fauna patterns.",
    badge: "Crafts",
    category: "batik",
    region: "Malang",
    difficulty: "High",
    duration: "2–3 days",
    popularity: 88,
    tags: ["batik", "textile", "malang", "craft", "motif"],
    lastUpdated: "2024-01-10",
    relatedItems: [1, 3, 7],
  },
  {
    id: 3,
    title: "Rujak Cingur",
    subtitle: "Signature Traditional Cuisine",
    description:
      "A Surabaya specialty made from fresh vegetables and sliced cow snout with a rich shrimp-paste (petis) sauce. A dish that reflects East Java’s culinary diversity.",
    badge: "Cuisine",
    category: "makanan",
    region: "Surabaya",
    difficulty: "Easy",
    duration: "30 minutes",
    popularity: 92,
    tags: ["cuisine", "surabaya", "rujak", "shrimp paste", "traditional"],
    lastUpdated: "2024-01-12",
    relatedItems: [4, 6, 9],
  },
  {
    id: 4,
    title: "Rawon",
    subtitle: "Signature Beef Soup Cuisine",
    description:
      "An iconic black beef soup from East Java flavored with kluwak (pangium edule) that brings a unique taste and aroma.",
    badge: "Cuisine",
    category: "makanan",
    region: "Surabaya",
    difficulty: "Medium",
    duration: "2 hours",
    popularity: 94,
    tags: ["cuisine", "rawon", "kluwak", "surabaya", "soup"],
    lastUpdated: "2024-01-08",
    relatedItems: [3, 5, 10],
  },
  {
    id: 5,
    title: "East Javanese Gamelan",
    subtitle: "Traditional Music",
    description:
      "A traditional ensemble with East Java’s distinctive character, different from Central Java and Yogyakarta gamelan.",
    badge: "Music",
    category: "musik",
    region: "Jawa Timur",
    difficulty: "High",
    duration: "1–2 hours",
    popularity: 85,
    tags: ["music", "gamelan", "traditional", "ensemble", "east java"],
    lastUpdated: "2024-01-05",
    relatedItems: [1, 6, 8],
  },
  {
    id: 6,
    title: "East Javanese Wayang Kulit",
    subtitle: "Traditional Puppet Theater",
    description:
      "A wayang kulit shadow-puppet performance in the East Javanese style with distinct narratives and presentation.",
    badge: "Performance",
    category: "wayang",
    region: "Jawa Timur",
    difficulty: "High",
    duration: "6–8 hours",
    popularity: 87,
    tags: ["wayang", "shadow puppets", "performance", "traditional", "story"],
    lastUpdated: "2024-01-03",
    relatedItems: [5, 7, 1],
  },
  {
    id: 7,
    title: "Plered Earthenware Craft",
    subtitle: "Clay Handicraft",
    description: "Traditional earthenware from Plered, Purwakarta, renowned for its quality and beautiful motifs.",
    badge: "Crafts",
    category: "kerajinan",
    region: "Plered",
    difficulty: "Medium",
    duration: "1–2 days",
    popularity: 78,
    tags: ["earthenware", "craft", "clay", "plered", "motif"],
    lastUpdated: "2024-01-01",
    relatedItems: [2, 8, 6],
  },
  {
    id: 8,
    title: "East Javanese Language",
    subtitle: "Local Language",
    description: "A Javanese dialect that developed in East Java with unique characteristics and vocabulary.",
    badge: "Language",
    category: "bahasa",
    region: "Jawa Timur",
    difficulty: "Medium",
    duration: "Ongoing",
    popularity: 82,
    tags: ["language", "javanese", "dialect", "communication", "culture"],
    lastUpdated: "2023-12-28",
    relatedItems: [1, 5, 7],
  },
  {
    id: 9,
    title: "Soto Lamongan",
    subtitle: "Signature Chicken Soup Cuisine",
    description:
      "Lamongan’s chicken soup with a clear, refreshing broth and distinctive spices, often served with crackers and sambal.",
    badge: "Cuisine",
    category: "makanan",
    region: "Lamongan",
    difficulty: "Easy",
    duration: "1 hour",
    popularity: 90,
    tags: ["soto", "lamongan", "chicken", "broth", "crackers"],
    lastUpdated: "2023-12-25",
    relatedItems: [3, 4, 10],
  },
  {
    id: 10,
    title: "Gandrung Dance of Banyuwangi",
    subtitle: "Coastal Traditional Dance",
    description:
      "A traditional dance from Banyuwangi that expresses the joy and spirit of East Java’s coastal communities.",
    badge: "Arts",
    category: "tari",
    region: "Banyuwangi",
    difficulty: "Medium",
    duration: "30 minutes",
    popularity: 86,
    tags: ["dance", "gandrung", "banyuwangi", "coastal", "traditional"],
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
