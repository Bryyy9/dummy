// Centralized subculture profiles data
// Contains demographic information, history, and media references for all subcultures

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
  modelPath?: string
  videoSrc?: string
  youtubeId?: string
  sketchfabId?: string
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
      "Berakar dari budaya pesisir perkotaan, Arekan tumbuh dalam kosmopolitanisme pelabuhan dengan seni tutur dan teater rakyat yang kuat.",
    highlights: ["Ludruk dan Remo", "Kuliner pesisir (rujak cingur)", "Ekspresi urban egaliter"],
    modelPath: "/assets/3d/duck.glb",
    videoSrc: "/videos/subculture-sample.mp4",
    youtubeId: "dQw4w9WgXcQ",
    sketchfabId: "3c5c5c5c5c5c5c5c",
  },
  madura: {
    displayName: "Madura",
    demographics: {
      population: "± 4.2M (fiksi)",
      area: "5.200 km²",
      density: "808/km²",
      languages: ["Madura", "Indonesia"],
    },
    history: "Tradisi pesantren, maritim, dan jejaring dagang membentuk identitas Madura lintas kepulauan.",
    highlights: ["Karapan Sapi", "Keris dan kriya logam", "Tradisi pesantren"],
    modelPath: "/assets/3d/duck.glb",
    videoSrc: "/videos/subculture-sample.mp4",
    youtubeId: "dQw4w9WgXcQ",
    sketchfabId: "3c5c5c5c5c5c5c5c",
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
      "Wilayah basis subkultur Madura dengan penguatan praktik keseharian—anyaman, ritual kampung, dan solidaritas komunal.",
    highlights: ["Anyaman & kriya serat", "Kuliner harian", "Ritual kampung"],
    modelPath: "/assets/3d/duck.glb",
    videoSrc: "/videos/subculture-sample.mp4",
    youtubeId: "dQw4w9WgXcQ",
    sketchfabId: "3c5c5c5c5c5c5c5c",
  },
  "madura-bawean": {
    displayName: "Madura-Bawean",
    demographics: {
      population: "± 70K (fiksi)",
      area: "196 km²",
      density: "357/km²",
      languages: ["Bawean", "Madura", "Indonesia"],
    },
    history: "Subkultur kepulauan dengan tradisi maritim, bahasa lokal, dan musik rakyat yang hidup.",
    highlights: ["Tradisi maritim", "Bahasa lokal", "Kesenian pulau"],
    modelPath: "/assets/3d/duck.glb",
    videoSrc: "/videos/subculture-sample.mp4",
    youtubeId: "dQw4w9WgXcQ",
    sketchfabId: "3c5c5c5c5c5c5c5c",
  },
  "madura-kangean": {
    displayName: "Madura-Kangean",
    demographics: {
      population: "± 85K (fiksi)",
      area: "488 km²",
      density: "174/km²",
      languages: ["Madura", "Indonesia"],
    },
    history: "Jejaring pulau-pulau timur dengan identitas pesisir, perikanan, dan perdagangan.",
    highlights: ["Ritus pesisir", "Perikanan", "Kriya lokal"],
    modelPath: "/assets/3d/duck.glb",
    videoSrc: "/videos/subculture-sample.mp4",
    youtubeId: "dQw4w9WgXcQ",
    sketchfabId: "3c5c5c5c5c5c5c5c",
  },
  mataraman: {
    displayName: "Mataraman",
    demographics: {
      population: "± 3.6M (fiksi)",
      area: "7.300 km²",
      density: "493/km²",
      languages: ["Jawa Mataraman", "Indonesia"],
    },
    history: "Warna kebudayaan Jawa Mataraman—tata krama, gamelan, dan wayang—membentuk lanskap kebudayaan setempat.",
    highlights: ["Gamelan & wayang", "Adab Mataraman", "Seni tutur"],
    modelPath: "/assets/3d/duck.glb",
    videoSrc: "/videos/subculture-sample.mp4",
    youtubeId: "dQw4w9WgXcQ",
    sketchfabId: "3c5c5c5c5c5c5c5c",
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
    modelPath: "/assets/3d/duck.glb",
    videoSrc: "/videos/subculture-sample.mp4",
    youtubeId: "dQw4w9WgXcQ",
    sketchfabId: "3c5c5c5c5c5c5c5c",
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
    modelPath: "/assets/3d/duck.glb",
    videoSrc: "/videos/subculture-sample.mp4",
    youtubeId: "dQw4w9WgXcQ",
    sketchfabId: "3c5c5c5c5c5c5c5c",
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
    modelPath: "/assets/3d/duck.glb",
    videoSrc: "/videos/subculture-sample.mp4",
    youtubeId: "dQw4w9WgXcQ",
    sketchfabId: "3c5c5c5c5c5c5c5c",
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
    modelPath: "/assets/3d/duck.glb",
    videoSrc: "/videos/subculture-sample.mp4",
    youtubeId: "dQw4w9WgXcQ",
    sketchfabId: "3c5c5c5c5c5c5c5c",
  },
  tengger: {
    displayName: "Tengger",
    demographics: {
      population: "± 110K (fiksi)",
      area: "1.200 km²",
      density: "92/km²",
      languages: ["Jawa Tenggeran", "Indonesia"],
    },
    history: "Komunitas pegunungan dengan ritus Yadnya Kasada dan lanskap Bromo yang sakral.",
    highlights: ["Yadnya Kasada", "Pegunungan Bromo", "Pertanian dataran tinggi"],
    modelPath: "/assets/3d/duck.glb",
    videoSrc: "/videos/subculture-sample.mp4",
    youtubeId: "dQw4w9WgXcQ",
    sketchfabId: "84f5b344957540a295743def72f1db66",
  },
}
