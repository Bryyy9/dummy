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
    description: "Kota kelahiran Reog Ponorogo yang terkenal",
    culturalItemsCount: 1,
    coordinates: { lat: -7.8744, lng: 111.4625 },
    specialties: ["Reog Ponorogo", "Tari Tradisional"],
  },
  {
    id: "malang",
    name: "Malang",
    description: "Kota dengan kerajinan batik yang khas",
    culturalItemsCount: 1,
    coordinates: { lat: -7.9666, lng: 112.6326 },
    specialties: ["Batik Malangan", "Kerajinan Tekstil"],
  },
  {
    id: "surabaya",
    name: "Surabaya",
    description: "Ibu kota Jawa Timur dengan kuliner yang beragam",
    culturalItemsCount: 2,
    coordinates: { lat: -7.2575, lng: 112.7521 },
    specialties: ["Rujak Cingur", "Rawon", "Kuliner Khas"],
  },
  {
    id: "lamongan",
    name: "Lamongan",
    description: "Kota dengan soto yang terkenal",
    culturalItemsCount: 1,
    coordinates: { lat: -7.1167, lng: 112.4167 },
    specialties: ["Soto Lamongan", "Kuliner Sup"],
  },
  {
    id: "banyuwangi",
    name: "Banyuwangi",
    description: "Kota pesisir dengan tari gandrung yang indah",
    culturalItemsCount: 1,
    coordinates: { lat: -8.2192, lng: 114.3691 },
    specialties: ["Tari Gandrung", "Budaya Pesisir"],
  },
  {
    id: "plered",
    name: "Plered",
    description: "Sentra kerajinan gerabah tradisional",
    culturalItemsCount: 1,
    coordinates: { lat: -6.7022, lng: 107.4731 },
    specialties: ["Gerabah", "Kerajinan Tanah Liat"],
  },
]

export const getRegionById = (id: string): Region | undefined => {
  return regions.find((region) => region.id === id)
}

export const getRegionByName = (name: string): Region | undefined => {
  return regions.find((region) => region.name.toLowerCase() === name.toLowerCase())
}
