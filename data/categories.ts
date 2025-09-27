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
    label: "All",
    icon: Globe,
    count: 10,
    description: "All cultural categories of East Java",
  },
  {
    value: "tari",
    label: "Dance",
    icon: Music,
    count: 2,
    description: "Traditional dances of East Java",
  },
  {
    value: "makanan",
    label: "Cuisine",
    icon: Utensils,
    count: 3,
    description: "Signature food and beverages of East Java",
  },
  {
    value: "batik",
    label: "Batik",
    icon: Palette,
    count: 1,
    description: "Batik arts from East Java",
  },
  {
    value: "musik",
    label: "Music",
    icon: Mic,
    count: 1,
    description: "Traditional music of East Java",
  },
  {
    value: "wayang",
    label: "Puppetry",
    icon: Users,
    count: 1,
    description: "Wayang performances",
  },
  {
    value: "kerajinan",
    label: "Handicrafts",
    icon: Palette,
    count: 1,
    description: "Traditional handmade crafts",
  },
  {
    value: "bahasa",
    label: "Language",
    icon: Languages,
    count: 1,
    description: "Local language and dialects",
  },
]

export const getCategoryByValue = (value: string): Category | undefined => {
  return categories.find((category) => category.value === value)
}

export const getCategoryCount = (categoryValue: string): number => {
  const category = getCategoryByValue(categoryValue)
  return category?.count || 0
}
