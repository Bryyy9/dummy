// Centralized subculture profiles data
// Contains demographic information, history, media references, gallery images, and 3D models for all subcultures

export interface GalleryImage {
  url: string
  title: string
  description?: string
  alt: string
}

export interface Model3D {
  sketchfabId: string
  title: string
  description: string
  artifactType: string
  tags: string[]
}

export interface SubcultureProfile {
  displayName: string
  demographics: {
    population: string
    area: string
    density: string
    languages: string[]
  }
  history: string
  highlights: string[]
  video: {
    youtubeId: string
    title: string
    description: string
    duration: string
    tags: string[]
  }
  galleryImages: GalleryImage[]
  model3dArray: Model3D[]
}

export const SUBCULTURE_PROFILES: Record<string, SubcultureProfile> = {
  arekan: {
    displayName: "Arekan",
    demographics: {
      population: "± 5.1M (fiksi)",
      area: "6.200 km²",
      density: "825/km²",
      languages: ["Jawa Arek", "Madura", "Indonesia"],
    },
    history:
      "Rooted in urban coastal culture, Arekan developed within port cosmopolitanism and features strong oral traditions and folk theatre.",
    highlights: ["Ludruk and Remo", "Coastal cuisine (rujak cingur)", "Urban egalitarian expression"],
    video: {
      youtubeId: "dQw4w9WgXcQ",
      title: "Arekan Culture: Ludruk and Remo",
      description: "A documentary on the dynamic folk theatre and oral traditions of Arekan.",
      duration: "12:45",
      tags: ["Ludruk", "Remo", "Folk Theatre", "Coastal Culture"],
    },
    galleryImages: [
      {
        url: "/subculture-gallery-1.jpg",
        title: "Arekan Ludruk Performance",
        description: "A lively and entertaining Ludruk folk theatre performance",
        alt: "Arekan Ludruk performance with traditional costumes",
      },
      {
        url: "/subculture-gallery-2.jpg",
        title: "Traditional Remo Dance",
        description: "Remo dance showcasing urban expression and coastal energy",
        alt: "Remo dancer in traditional Arekan costume",
      },
      {
        url: "/subculture-gallery-3.jpg",
        title: "Arekan Coastal Cuisine",
        description: "Rujak cingur and other coastal specialties typical of Arekan",
        alt: "Traditional Arekan rujak cingur dish",
      },
            {
        url: "/subculture-gallery-3.jpg",
        title: "Kuliner Pesisir Arekan",
        description: "Rujak cingur dan hidangan khas pesisir Arekan",
        alt: "Hidangan tradisional rujak cingur Arekan",
      },
                  {
        url: "/subculture-gallery-3.jpg",
        title: "Kuliner Pesisir Arekan",
        description: "Rujak cingur dan hidangan khas pesisir Arekan",
        alt: "Hidangan tradisional rujak cingur Arekan",
      },
    ],
    model3dArray: [
      {
        sketchfabId: "3c5c5c5c5c5c5c5c",
        title: "Ludruk Arekan Mask",
        description: "Interactive 3D model of a traditional Ludruk Arekan theatrical mask with carved details.",
        artifactType: "Theatre Mask",
        tags: ["Mask", "Ludruk", "Craft", "Theatre"],
      },
      {
        sketchfabId: "3c5c5c5c5c5c5c5d",
        title: "Arekan Gamelan Instrument",
        description: "3D model of traditional gamelan instruments used in Ludruk performances.",
        artifactType: "Musical Instrument",
        tags: ["Gamelan", "Music", "Instrument", "Traditional"],
      },
      {
        sketchfabId: "3c5c5c5c5c5c5c5e",
        title: "Remo Costume",
        description: "3D model of a traditional Remo dancer costume with Arekan ornamentation.",
        artifactType: "Dance Costume",
        tags: ["Remo", "Costume", "Dance", "Traditional Attire"],
      },
    ],
  },
  madura: {
    displayName: "Madura",
    demographics: {
      population: "± 4.2M (fiksi)",
      area: "5.200 km²",
      density: "808/km²",
      languages: ["Madura", "Indonesia"],
    },
    history: "The pesantren tradition, maritime culture, and trading networks shape Madura's identity across the islands.",
    highlights: ["Karapan Sapi (bull racing)", "Keris and metalcraft", "Pesantren traditions"],
    video: {
      youtubeId: "dQw4w9WgXcQ",
      title: "Karapan Sapi (Madura Bull Racing)",
      description: "A documentary about Madura's iconic bull-racing tradition.",
      duration: "15:30",
      tags: ["Karapan Sapi", "Tradition", "Folk Sport"],
    },
    galleryImages: [
      {
        url: "/subculture-gallery-1.jpg",
        title: "Karapan Sapi (Bull Racing)",
        description: "Traditional bull racing, a hallmark of Madura's cultural identity.",
        alt: "Karapan Sapi with traditionally decorated bulls",
      },
      {
        url: "/subculture-gallery-2.jpg",
        title: "Traditional Madurese Kris",
        description: "A kris with distinctive carvings showcasing Madurese metalcraft expertise.",
        alt: "Madurese kris with traditional hilt and sheath",
      },
      {
        url: "/subculture-gallery-3.jpg",
        title: "Pesantren Life",
        description: "The strong pesantren (Islamic boarding school) tradition in Madurese daily life.",
        alt: "A traditional pesantren setting in Madura",
      },
    ],
    model3dArray: [
      {
        sketchfabId: "3c5c5c5c5c5c5c5c",
        title: "Madurese Kris",
        description: "A 3D model of a traditional Madurese kris featuring distinctive carvings and metallurgical details.",
        artifactType: "Traditional Weapon",
        tags: ["Kris", "Metalcraft", "Weapon", "Handicraft"],
      },
      {
        sketchfabId: "3c5c5c5c5c5c5c5f",
        title: "Karapan Sapi Saddle",
        description: "A 3D model of the traditional saddle used in Madura's Karapan Sapi.",
        artifactType: "Karapan Equipment",
        tags: ["Karapan Sapi", "Saddle", "Equipment", "Traditional"],
      },
    ],
  },
  "madura-base": {
    displayName: "Madura-Base",
    demographics: {
      population: "± 1.1M (fiksi)",
      area: "1.900 km²",
      density: "579/km²",
      languages: ["Madura", "Indonesia"],
    },
    history:
      "The Madura-Base area represents the subculture's everyday practices—basket weaving, village rituals, and strong communal solidarity.",
    highlights: ["Weaving & fiber crafts", "Daily cuisine", "Village rituals"],
    video: {
      youtubeId: "dQw4w9WgXcQ",
      title: "Daily Life in Madura-Base",
      description: "A documentary about daily practices and communal rituals in Madura-Base.",
      duration: "18:20",
      tags: ["Daily Life", "Ritual", "Community"],
    },
    galleryImages: [
      {
        url: "/subculture-gallery-1.jpg",
        title: "Traditional Weaving",
        description: "Fiber weaving handicrafts that are part of Madura-Base daily life.",
        alt: "The process of traditional fiber weaving",
      },
      {
        url: "/subculture-gallery-2.jpg",
        title: "Village Ritual",
        description: "Communal rituals that strengthen social solidarity in Madura-Base villages.",
        alt: "A communal ritual event in a Madura-Base village",
      },
    ],
    model3dArray: [
      {
        sketchfabId: "3c5c5c5c5c5c5c5c",
        title: "Traditional Madurese Weaving",
        description: "A 3D model of traditional Madurese fiber weaving showcasing local techniques.",
        artifactType: "Fiber Handicraft",
        tags: ["Weaving", "Fiber Craft", "Handicraft", "Traditional"],
      },
    ],
  },
  "madura-bawean": {
    displayName: "Madura-Bawean",
    demographics: {
      population: "± 70K (fiksi)",
      area: "196 km²",
      density: "357/km²",
      languages: ["Bawean", "Madura", "Indonesia"],
    },
    history: "An island subculture with a living maritime tradition, local dialects, and vibrant folk music.",
    highlights: ["Maritime traditions", "Local language", "Island performing arts"],
    video: {
      youtubeId: "dQw4w9WgXcQ",
      title: "Bawean Maritime Culture",
      description: "A documentary about Bawean's maritime traditions and island arts.",
      duration: "14:15",
      tags: ["Maritime", "Island", "Local Arts"],
    },
    galleryImages: [
      {
        url: "/subculture-gallery-1.jpg",
        title: "Traditional Bawean Boat",
        description: "A traditional fishing boat that symbolizes Bawean's maritime heritage.",
        alt: "Traditional Bawean boat at sea",
      },
      {
        url: "/subculture-gallery-2.jpg",
        title: "Bawean Folk Music",
        description: "A local folk music performance from Bawean.",
        alt: "Traditional Bawean musicians with local instruments",
      },
    ],
    model3dArray: [
      {
        sketchfabId: "3c5c5c5c5c5c5c5c",
        title: "Traditional Bawean Boat",
        description: "A 3D model of a traditional Bawean boat with characteristic maritime construction.",
        artifactType: "Boat",
        tags: ["Boat", "Maritime", "Transport", "Traditional"],
      },
    ],
  },
  "madura-kangean": {
    displayName: "Madura-Kangean",
    demographics: {
      population: "± 85K (fiksi)",
      area: "488 km²",
      density: "174/km²",
      languages: ["Madura", "Indonesia"],
    },
    history: "An eastern island network characterized by coastal identity, fishing, and trade.",
    highlights: ["Coastal rites", "Fishing", "Local craft"],
    video: {
      youtubeId: "dQw4w9WgXcQ",
      title: "Kangean Fisheries",
      description: "A documentary about fishing traditions and trade in Kangean.",
      duration: "13:40",
      tags: ["Fisheries", "Trade", "Coast"],
    },
    galleryImages: [
      {
        url: "/subculture-gallery-1.jpg",
        title: "Kangean Fishermen",
        description: "Fishing traditions that are the main livelihood of Kangean residents.",
        alt: "Kangean fishermen with their catch",
      },
      {
        url: "/subculture-gallery-2.jpg",
        title: "Kangean Traditional Market",
        description: "A local trading market in Kangean",
        alt: "A traditional market with Kangean seafood",
      },
    ],
    model3dArray: [
      {
        sketchfabId: "3c5c5c5c5c5c5c5c",
        title: "Kangean Fishing Gear",
        description: "A 3D model of traditional Kangean fishing gear with local design features.",
        artifactType: "Fishing Equipment",
        tags: ["Fishing Gear", "Fisheries", "Traditional"],
      },
    ],
  },
  mataraman: {
    displayName: "Mataraman",
    demographics: {
      population: "± 3.6M (fiksi)",
      area: "7.300 km²",
      density: "493/km²",
      languages: ["Jawa Mataraman", "Indonesia"],
    },
    history: "The cultural hues of Mataraman Java — manners, gamelan music, and wayang theater — shape the local cultural landscape.",
    highlights: ["Gamelan & wayang", "Mataraman etiquette", "Oral storytelling arts"],
    video: {
      youtubeId: "dQw4w9WgXcQ",
      title: "Mataraman Gamelan and Wayang",
      description: "A documentary exploring Mataraman's gamelan music and shadow-puppet (wayang kulit) traditions.",
      duration: "20:10",
      tags: ["Gamelan", "Wayang", "Traditional Arts"],
    },
    galleryImages: [
      {
        url: "/subculture-gallery-1.jpg",
        title: "Wayang Kulit Performance",
        description: "A grand Mataraman shadow-puppet (wayang kulit) performance rich in symbolism.",
        alt: "Wayang kulit performance with traditional screen and lighting",
      },
      {
        url: "/subculture-gallery-2.jpg",
        title: "Gamelan Orchestra",
        description: "A Mataraman gamelan ensemble performing traditional repertoire.",
        alt: "Gamelan musicians during a traditional performance",
      },
      {
        url: "/subculture-gallery-3.jpg",
        title: "Mataraman Etiquette",
        description: "Ceremonies and social etiquette that are part of Mataraman cultural life.",
        alt: "A traditional Mataraman ceremony with customary attire",
      },
    ],
    model3dArray: [
      {
        sketchfabId: "3c5c5c5c5c5c5c5c",
        title: "Mataraman Shadow Puppet (Wayang Kulit)",
        description: "A 3D model of a traditional Mataraman shadow puppet (wayang kulit) featuring fine carving details.",
        artifactType: "Wayang Kulit",
        tags: ["Wayang", "Shadow Puppet", "Performing Arts", "Traditional"],
      },
      {
        sketchfabId: "3c5c5c5c5c5c5c5g",
        title: "Gamelan Instrument",
        description: "A 3D model of a Mataraman gamelan instrument known for its distinctive acoustic qualities.",
        artifactType: "Musical Instrument",
        tags: ["Gamelan", "Music", "Instrument", "Traditional"],
      },
    ],
  },
  osing: {
    displayName: "Osing (Using)",
    demographics: {
      population: "± 1.1M (fiksi)",
      area: "5.800 km²",
      density: "190/km²",
      languages: ["Osing/Using", "Jawa", "Indonesia"],
    },
    history: "Subkultur Osing mempunyai bahasa, musik, dan tarian khas; identitas kultural kuat di Banyuwangi.",
    highlights: ["Gandrung", "Barong & musik tradisional", "Batik Using"],
    video: {
      youtubeId: "dQw4w9WgXcQ",
      title: "Gandrung dan Barong Osing",
      description: "Dokumenter tentang tarian Gandrung dan Barong tradisional Osing.",
      duration: "16:50",
      tags: ["Gandrung", "Barong", "Tarian Tradisional"],
    },
    galleryImages: [
      {
        url: "/subculture-gallery-1.jpg",
        title: "Tarian Gandrung",
        description: "Tarian Gandrung yang penuh ekspresi dan energi Osing",
        alt: "Penari Gandrung dalam kostum tradisional Osing",
      },
      {
        url: "/subculture-gallery-2.jpg",
        title: "Topeng Barong Osing",
        description: "Topeng Barong dengan desain khas Osing",
        alt: "Topeng Barong Osing dengan warna-warna cerah",
      },
      {
        url: "/subculture-gallery-3.jpg",
        title: "Batik Using",
        description: "Motif batik tradisional Using dari Banyuwangi",
        alt: "Kain batik Using dengan motif tradisional",
      },
    ],
    model3dArray: [
      {
        sketchfabId: "3c5c5c5c5c5c5c5c",
        title: "Topeng Barong Osing",
        description: "Model 3D dari topeng Barong tradisional Osing dengan detail warna dan ukiran.",
        artifactType: "Topeng Tarian",
        tags: ["Topeng", "Barong", "Tarian", "Kerajinan"],
      },
      {
        sketchfabId: "3c5c5c5c5c5c5c5h",
        title: "Kostum Gandrung Osing",
        description: "Model 3D dari kostum tradisional penari Gandrung Osing.",
        artifactType: "Kostum Tarian",
        tags: ["Gandrung", "Kostum", "Tarian", "Pakaian Tradisional"],
      },
    ],
  },
  panaragan: {
    displayName: "Panaragan",
    demographics: {
      population: "± 0.9M (fiksi)",
      area: "4.400 km²",
      density: "205/km²",
      languages: ["Jawa", "Indonesia"],
    },
    history: "Kekuatan seni rakyat dan kerajinan kayu menjadi aksen keseharian Panaragan.",
    highlights: ["Kerajinan kayu", "Seni rakyat", "Upacara lokal"],
    video: {
      youtubeId: "dQw4w9WgXcQ",
      title: "Kerajinan Kayu Panaragan",
      description: "Dokumenter tentang kerajinan kayu dan seni rakyat Panaragan.",
      duration: "11:30",
      tags: ["Kerajinan Kayu", "Seni Rakyat", "Tradisional"],
    },
    galleryImages: [
      {
        url: "/subculture-gallery-1.jpg",
        title: "Ukiran Kayu Panaragan",
        description: "Kerajinan ukiran kayu yang menampilkan keahlian Panaragan",
        alt: "Ukiran kayu tradisional Panaragan dengan detail halus",
      },
      {
        url: "/subculture-gallery-2.jpg",
        title: "Seni Rakyat Panaragan",
        description: "Pertunjukan seni rakyat lokal Panaragan",
        alt: "Pertunjukan seni rakyat tradisional Panaragan",
      },
    ],
    model3dArray: [
      {
        sketchfabId: "3c5c5c5c5c5c5c5c",
        title: "Ukiran Kayu Panaragan",
        description: "Model 3D dari ukiran kayu tradisional Panaragan dengan motif khas.",
        artifactType: "Ukiran Kayu",
        tags: ["Ukiran", "Kayu", "Kerajinan", "Seni"],
      },
    ],
  },
  pandalungan: {
    displayName: "Pandalungan",
    demographics: {
      population: "± 2.2M (fiksi)",
      area: "6.000 km²",
      density: "367/km²",
      languages: ["Jawa", "Madura", "Indonesia"],
    },
    history: "Perpaduan Jawa–Madura melahirkan dialek, kuliner, dan ritus yang khas tapal kuda.",
    highlights: ["Dialek Pandalungan", "Kuliner pesisir", "Tradisi campuran"],
    video: {
      youtubeId: "dQw4w9WgXcQ",
      title: "Budaya Pandalungan",
      description: "Dokumenter tentang perpaduan budaya Jawa-Madura di Pandalungan.",
      duration: "17:25",
      tags: ["Jawa-Madura", "Dialek", "Kuliner"],
    },
    galleryImages: [
      {
        url: "/subculture-gallery-1.jpg",
        title: "Kuliner Pandalungan",
        description: "Hidangan khas Pandalungan yang memadukan cita rasa Jawa dan Madura",
        alt: "Hidangan tradisional Pandalungan",
      },
      {
        url: "/subculture-gallery-2.jpg",
        title: "Upacara Tradisional Pandalungan",
        description: "Upacara adat yang menggabungkan tradisi Jawa dan Madura",
        alt: "Upacara adat Pandalungan",
      },
    ],
    model3dArray: [
      {
        sketchfabId: "3c5c5c5c5c5c5c5c",
        title: "Artefak Pandalungan",
        description: "Model 3D dari artefak budaya Pandalungan yang menggabungkan elemen Jawa-Madura.",
        artifactType: "Artefak Budaya",
        tags: ["Pandalungan", "Budaya", "Tradisional"],
      },
    ],
  },
  samin: {
    displayName: "Samin",
    demographics: {
      population: "± 35K (fiksi)",
      area: "380 km²",
      density: "92/km²",
      languages: ["Jawa", "Indonesia"],
    },
    history: "Komunitas Samin dikenal lewat etika kejujuran, laku sederhana, dan sejarah gerakan sosial.",
    highlights: ["Etika Samin", "Pertanian", "Komunitas mandiri"],
    video: {
      youtubeId: "dQw4w9WgXcQ",
      title: "Komunitas Samin",
      description: "Dokumenter tentang komunitas Samin dan etika kejujuran mereka.",
      duration: "19:15",
      tags: ["Komunitas", "Etika", "Gerakan Sosial"],
    },
    galleryImages: [
      {
        url: "/subculture-gallery-1.jpg",
        title: "Kehidupan Komunitas Samin",
        description: "Kehidupan sehari-hari komunitas Samin yang sederhana dan etis",
        alt: "Anggota komunitas Samin dalam aktivitas sehari-hari",
      },
      {
        url: "/subculture-gallery-2.jpg",
        title: "Pertanian Samin",
        description: "Praktik pertanian tradisional komunitas Samin",
        alt: "Petani Samin di sawah dengan alat tradisional",
      },
    ],
    model3dArray: [
      {
        sketchfabId: "3c5c5c5c5c5c5c5c",
        title: "Alat Pertanian Samin",
        description: "Model 3D dari alat pertanian tradisional Samin dengan desain sederhana.",
        artifactType: "Alat Pertanian",
        tags: ["Pertanian", "Alat Tradisional", "Komunitas"],
      },
    ],
  },
  tengger: {
    displayName: "Tengger",
    demographics: {
      population: "± 110K (fiksi)",
      area: "1.200 km²",
      density: "92/km²",
      languages: ["Jawa Tenggeran", "Indonesia"],
    },
    history: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    highlights: ["Yadnya Kasada", "Pegunungan Bromo", "Pertanian dataran tinggi"],
    video: {
      youtubeId: "dQw4w9WgXcQ",
      title: "Yadnya Kasada Tengger",
      description: "Dokumenter tentang ritus Yadnya Kasada dan tradisi Tengger di Bromo.",
      duration: "22:40",
      tags: ["Yadnya Kasada", "Bromo", "Ritus Tradisional"],
    },
    galleryImages: [
      {
        url: "/subculture-gallery-1.jpg",
        title: "Gunung Bromo Sakral",
        description: "Pemandangan Gunung Bromo yang sakral bagi komunitas Tengger",
        alt: "Gunung Bromo dengan kabut pagi",
      },
      {
        url: "/subculture-gallery-2.jpg",
        title: "Ritus Yadnya Kasada",
        description: "Upacara Yadnya Kasada yang megah di Gunung Bromo",
        alt: "Upacara Yadnya Kasada dengan sesaji di Bromo",
      },
      {
        url: "/subculture-gallery-3.jpg",
        title: "Kehidupan Pegunungan Tengger",
        description: "Kehidupan sehari-hari komunitas Tengger di pegunungan",
        alt: "Rumah tradisional Tengger di pegunungan Bromo",
      },
    ],
    model3dArray: [
      {
        sketchfabId: "e0197431bb6b49c78f9cd53313b94d5d",
        title: "Gunung Bromo",
        description: "Model 3D interaktif dari Gunung Bromo yang sakral bagi Tengger dengan detail topografi.",
        artifactType: "Lanskap Alam",
        tags: ["Bromo", "Gunung", "Lanskap", "Sakral"],
      },
      {
        sketchfabId: "894a54c735a8431197ae9a3d2d61c6b3",
        title: "Candi Peninggalan Tengger",
        description: "Model 3D dari candi peninggalan budaya Tengger di sekitar Bromo.",
        artifactType: "Arsitektur Kuno",
        tags: ["Candi", "Arsitektur", "Peninggalan", "Tradisional"],
      },
    ],
  },
}
