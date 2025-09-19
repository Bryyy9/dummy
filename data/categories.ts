import { Music, Utensils, Palette, Globe, Mic, Users, Languages } from "lucide-react"

export interface Category {
  value: string
  label: string
  icon: any
  count: number
  description?: string
}

export const categories: Category[] = [
  {
    value: "semua",
    label: "Semua",
    icon: Globe,
    count: 10,
    description: "Semua kategori budaya Jawa Timur",
  },
  {
    value: "tari",
    label: "Tari",
    icon: Music,
    count: 2,
    description: "Tarian tradisional Jawa Timur",
  },
  {
    value: "makanan",
    label: "Kuliner",
    icon: Utensils,
    count: 3,
    description: "Makanan dan minuman khas Jawa Timur",
  },
  {
    value: "batik",
    label: "Batik",
    icon: Palette,
    count: 1,
    description: "Seni batik khas Jawa Timur",
  },
  {
    value: "musik",
    label: "Musik",
    icon: Mic,
    count: 1,
    description: "Musik tradisional Jawa Timur",
  },
  {
    value: "wayang",
    label: "Wayang",
    icon: Users,
    count: 1,
    description: "Seni pertunjukan wayang",
  },
  {
    value: "kerajinan",
    label: "Kerajinan",
    icon: Palette,
    count: 1,
    description: "Kerajinan tangan tradisional",
  },
  {
    value: "bahasa",
    label: "Bahasa",
    icon: Languages,
    count: 1,
    description: "Bahasa dan dialek daerah",
  },
]

export const getCategoryByValue = (value: string): Category | undefined => {
  return categories.find((category) => category.value === value)
}

export const getCategoryCount = (categoryValue: string): number => {
  const category = getCategoryByValue(categoryValue)
  return category?.count || 0
}
