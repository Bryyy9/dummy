export interface Region {
  id: string
  name: string
  description: string
  culturalItemsCount: number
  coordinates?: {
    lat: number
    lng: number
  }
  specialties: string[]
}

export const regions: Region[] = [
  {
    id: "ponorogo",
    name: "Ponorogo",
    description: "The birthplace of the famous Reog Ponorogo.",
    culturalItemsCount: 1,
    coordinates: { lat: -7.8744, lng: 111.4625 },
    specialties: ["Reog Ponorogo", "Traditional Dance"],
  },
  {
    id: "malang",
    name: "Malang",
    description: "A city with distinctive batik craftsmanship.",
    culturalItemsCount: 1,
    coordinates: { lat: -7.9666, lng: 112.6326 },
    specialties: ["Malangan Batik", "Textile Craft"],
  },
  {
    id: "surabaya",
    name: "Surabaya",
    description: "Capital of East Java with diverse culinary traditions.",
    culturalItemsCount: 2,
    coordinates: { lat: -7.2575, lng: 112.7521 },
    specialties: ["Rujak Cingur", "Rawon", "Signature Cuisine"],
  },
  {
    id: "lamongan",
    name: "Lamongan",
    description: "A city famous for its soto.",
    culturalItemsCount: 1,
    coordinates: { lat: -7.1167, lng: 112.4167 },
    specialties: ["Soto Lamongan", "Soup Cuisine"],
  },
  {
    id: "banyuwangi",
    name: "Banyuwangi",
    description: "A coastal city known for its beautiful Gandrung dance.",
    culturalItemsCount: 1,
    coordinates: { lat: -8.2192, lng: 114.3691 },
    specialties: ["Gandrung Dance", "Coastal Culture"],
  },
  {
    id: "plered",
    name: "Plered",
    description: "A center of traditional earthenware crafts.",
    culturalItemsCount: 1,
    coordinates: { lat: -6.7022, lng: 107.4731 },
    specialties: ["Earthenware", "Clay Handicraft"],
  },
]

export const getRegionById = (id: string): Region | undefined => {
  return regions.find((region) => region.id === id)
}

export const getRegionByName = (name: string): Region | undefined => {
  return regions.find((region) => region.name.toLowerCase() === name.toLowerCase())
}
