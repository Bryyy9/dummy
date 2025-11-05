export interface Category {
  value: string;
  label: string;
  icon?: string;
  description?: string;
}

export const categories: Category[] = [
  { value: "semua", label: "All Categories", description: "All cultural aspects" },
  { value: "tari", label: "Dance", description: "Traditional dance" },
  { value: "makanan", label: "Food", description: "Traditional cuisine" },
  { value: "batik", label: "Batik", description: "Batik and woven textiles" },
  { value: "musik", label: "Music", description: "Music and musical instruments" },
  { value: "wayang", label: "Wayang", description: "Wayang performance arts" },
  { value: "kerajinan", label: "Crafts", description: "Handicrafts" },
  { value: "bahasa", label: "Language", description: "Regional languages" },
];