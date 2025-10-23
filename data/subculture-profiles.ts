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
  video: {
    youtubeId: string
    title: string
    description: string
    duration: string
    tags: string[]
  }
  model3d: {
    sketchfabId: string
    title: string
    description: string
    artifactType: string
    tags: string[]
  }
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
    video: {
      youtubeId: "dQw4w9WgXcQ",
      title: "Budaya Arekan: Ludruk dan Remo",
      description: "Dokumenter tentang tradisi teater rakyat dan seni tutur Arekan yang dinamis.",
      duration: "12:45",
      tags: ["Ludruk", "Remo", "Teater Rakyat", "Budaya Pesisir"],
    },
    model3d: {
      sketchfabId: "3c5c5c5c5c5c5c5c",
      title: "Topeng Ludruk Arekan",
      description: "Model 3D interaktif dari topeng tradisional Ludruk Arekan.",
      artifactType: "Topeng Teater",
      tags: ["Topeng", "Ludruk", "Kerajinan", "Teater"],
    },
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
    video: {
      youtubeId: "dQw4w9WgXcQ",
      title: "Karapan Sapi Madura",
      description: "Dokumenter tentang tradisi balap sapi yang ikonik di Madura.",
      duration: "15:30",
      tags: ["Karapan Sapi", "Tradisi", "Olahraga Rakyat"],
    },
    model3d: {
      sketchfabId: "3c5c5c5c5c5c5c5c",
      title: "Keris Madura",
      description: "Model 3D dari keris tradisional Madura dengan ukiran khas.",
      artifactType: "Senjata Tradisional",
      tags: ["Keris", "Kriya Logam", "Senjata", "Kerajinan"],
    },
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
    video: {
      youtubeId: "dQw4w9WgXcQ",
      title: "Kehidupan Sehari-hari Madura-Base",
      description: "Dokumenter tentang praktik keseharian dan ritual komunal di Madura-Base.",
      duration: "18:20",
      tags: ["Kehidupan Sehari-hari", "Ritual", "Komunitas"],
    },
    model3d: {
      sketchfabId: "3c5c5c5c5c5c5c5c",
      title: "Anyaman Tradisional Madura",
      description: "Model 3D dari kerajinan anyaman serat tradisional Madura.",
      artifactType: "Kerajinan Serat",
      tags: ["Anyaman", "Kriya Serat", "Kerajinan", "Tradisional"],
    },
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
    video: {
      youtubeId: "dQw4w9WgXcQ",
      title: "Budaya Maritim Bawean",
      description: "Dokumenter tentang tradisi maritim dan kesenian pulau Bawean.",
      duration: "14:15",
      tags: ["Maritim", "Pulau", "Kesenian Lokal"],
    },
    model3d: {
      sketchfabId: "3c5c5c5c5c5c5c5c",
      title: "Perahu Tradisional Bawean",
      description: "Model 3D dari perahu tradisional Bawean.",
      artifactType: "Perahu",
      tags: ["Perahu", "Maritim", "Transportasi", "Tradisional"],
    },
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
    video: {
      youtubeId: "dQw4w9WgXcQ",
      title: "Perikanan Kangean",
      description: "Dokumenter tentang tradisi perikanan dan perdagangan di Kangean.",
      duration: "13:40",
      tags: ["Perikanan", "Perdagangan", "Pesisir"],
    },
    model3d: {
      sketchfabId: "3c5c5c5c5c5c5c5c",
      title: "Alat Tangkap Ikan Kangean",
      description: "Model 3D dari alat tangkap ikan tradisional Kangean.",
      artifactType: "Alat Perikanan",
      tags: ["Alat Tangkap", "Perikanan", "Tradisional"],
    },
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
    video: {
      youtubeId: "dQw4w9WgXcQ",
      title: "Gamelan dan Wayang Mataraman",
      description: "Dokumenter tentang tradisi gamelan dan wayang kulit Mataraman.",
      duration: "20:10",
      tags: ["Gamelan", "Wayang", "Seni Tradisional"],
    },
    model3d: {
      sketchfabId: "3c5c5c5c5c5c5c5c",
      title: "Wayang Kulit Mataraman",
      description: "Model 3D dari wayang kulit tradisional Mataraman.",
      artifactType: "Wayang Kulit",
      tags: ["Wayang", "Kulit", "Seni Pertunjukan", "Tradisional"],
    },
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
    model3d: {
      sketchfabId: "3c5c5c5c5c5c5c5c",
      title: "Topeng Barong Osing",
      description: "Model 3D dari topeng Barong tradisional Osing.",
      artifactType: "Topeng Tarian",
      tags: ["Topeng", "Barong", "Tarian", "Kerajinan"],
    },
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
    model3d: {
      sketchfabId: "3c5c5c5c5c5c5c5c",
      title: "Ukiran Kayu Panaragan",
      description: "Model 3D dari ukiran kayu tradisional Panaragan.",
      artifactType: "Ukiran Kayu",
      tags: ["Ukiran", "Kayu", "Kerajinan", "Seni"],
    },
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
    model3d: {
      sketchfabId: "3c5c5c5c5c5c5c5c",
      title: "Artefak Pandalungan",
      description: "Model 3D dari artefak budaya Pandalungan.",
      artifactType: "Artefak Budaya",
      tags: ["Pandalungan", "Budaya", "Tradisional"],
    },
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
    model3d: {
      sketchfabId: "3c5c5c5c5c5c5c5c",
      title: "Alat Pertanian Samin",
      description: "Model 3D dari alat pertanian tradisional Samin.",
      artifactType: "Alat Pertanian",
      tags: ["Pertanian", "Alat Tradisional", "Komunitas"],
    },
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
    video: {
      youtubeId: "dQw4w9WgXcQ",
      title: "Yadnya Kasada Tengger",
      description: "Dokumenter tentang ritus Yadnya Kasada dan tradisi Tengger di Bromo.",
      duration: "22:40",
      tags: ["Yadnya Kasada", "Bromo", "Ritus Tradisional"],
    },
    model3d: {
      sketchfabId: "e0197431bb6b49c78f9cd53313b94d5d",
      title: "Gunung Bromo",
      description: "Model 3D interaktif dari Gunung Bromo yang sakral bagi Tengger.",
      artifactType: "Lanskap Alam",
      tags: ["Bromo", "Gunung", "Lanskap", "Sakral"],
    },
  },
}
