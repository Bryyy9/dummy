export type LexiconEntry = {
  term: string
  definition: string
  etimologi?: string
  culturalMeaning?: string
  variants?: string[]
  commonMeaning?: string
  note?: string
  availability?: string
}

export const LEXICON: Record<string, LexiconEntry[]> = {
  arekan: [
    {
      term: "Arek",
      definition: "Sebutan untuk gaya tutur dan identitas urban pesisir Surabaya dan sekitarnya.",
      etimologi: "Berakar dari ‘arek’ (anak/arekan) dalam ragam Jawa Arek.",
      culturalMeaning: "Merepresentasikan egalitarianisme urban pesisir dan solidaritas ‘arek Suroboyo’.",
      variants: ["arek", "arek-an"],
      commonMeaning: "Orang muda/anak dengan gaya tutur Arek.",
      note: "Sering muncul dalam ungkapan sehari-hari dan lagu daerah.",
      availability: "Banyak dokumentasi populer; penelitian akademik tersedia.",
    },
    {
      term: "Ludruk",
      definition: "Teater rakyat khas Surabaya dengan dialog jenaka dan kritik sosial.",
      culturalMeaning: "Ruang ekspresi sosial-politik rakyat kota pesisir.",
      variants: ["ludrukan"],
      availability: "Arsip pertunjukan dan kelompok komunitas masih aktif.",
    },
  ],
  madura: [
    {
      term: "Karapan Sapi",
      definition: "Lomba pacu sapi tradisional yang menjadi simbol budaya Madura.",
      etimologi: "Kemungkinan dari ‘kerapan’ (kejar/pacu) + sapi.",
      culturalMeaning: "Simbol prestise sosial, ekonomi, dan komunal.",
      variants: ["kerapan sapi"],
      commonMeaning: "Perlombaan sapi tradisional.",
      availability: "Dokumenter dan liputan media melimpah.",
    },
    { term: "Pesantren", definition: "Lembaga pendidikan Islam yang lekat dengan kehidupan masyarakat Madura." },
  ],
  "madura-base": [{ term: "Anyaman", definition: "Kerajinan menganyam serat alam untuk kebutuhan sehari-hari." }],
  "madura-bawean": [{ term: "Bawean", definition: "Pulau di utara Madura dengan tradisi maritim dan bahasa lokal." }],
  "madura-kangean": [
    { term: "Kangean", definition: "Gugus kepulauan timur laut dengan identitas pesisir dan perikanan." },
  ],
  mataraman: [
    { term: "Tata Krama", definition: "Etika sopan santun yang menonjol dalam budaya Mataraman." },
    { term: "Gamelan", definition: "Ansambel musik tradisional Jawa dengan instrumen perkusi bernada." },
  ],
  osing: [
    { term: "Using/Osing", definition: "Etnis dan bahasa lokal Banyuwangi dengan tradisi khas." },
    { term: "Gandrung", definition: "Tarian ikonik Banyuwangi sebagai ekspresi syukur dan kegembiraan." },
  ],
  panaragan: [{ term: "Seni Rakyat", definition: "Kesenian komunitas yang tumbuh dari tradisi lokal Panaragan." }],
  pandalungan: [
    { term: "Pandalungan", definition: "Identitas campuran Jawa–Madura, tampak pada dialek dan kebiasaan." },
  ],
  samin: [
    {
      term: "Samin",
      definition: "Komunitas dengan etika kejujuran dan kesederhanaan, dipengaruhi ajaran Samin Surosentiko.",
    },
  ],
  tengger: [
    { term: "Kasada", definition: "Ritual masyarakat Tengger di kawasan Bromo untuk persembahan." },
    { term: "Tengger", definition: "Komunitas pegunungan dengan tradisi dan kepercayaan khas." },
  ],
}
