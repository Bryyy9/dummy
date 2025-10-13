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
      definition: "A designation for the speech style and urban coastal identity of Surabaya and its surroundings.",
      etimologi: "Derived from 'arek' (child/young person) in the Arek Javanese dialect.",
      culturalMeaning: "Represents coastal urban egalitarianism and the 'arek Suroboyo' solidarity.",
      variants: ["arek", "arek-an"],
      commonMeaning: "Young person/child with the Arek speech style.",
      note: "Frequently appears in everyday expressions and regional songs.",
      availability: "Extensive popular documentation; academic research is available.",
    },
    {
      term: "Ludruk",
      definition: "A folk theatre from Surabaya characterized by humorous dialogue and social critique.",
      culturalMeaning: "A space for socio-political expression of the coastal urban community.",
      variants: ["ludrukan"],
      availability: "Performance archives and active community troupes exist.",
    },
  ],
  madura: [
    {
      term: "Karapan Sapi",
      definition: "A traditional bull racing competition that has become a cultural symbol of Madura.",
      etimologi: "Possibly from 'kerapan' (chase/race) + 'sapi' (bull).",
      culturalMeaning: "A symbol of social, economic, and communal prestige.",
      variants: ["kerapan sapi"],
      commonMeaning: "Traditional bull racing.",
      availability: "Plentiful documentaries and media coverage.",
    },
    { term: "Pesantren", definition: "An Islamic boarding school closely integrated with Madurese community life." },
  ],
  "madura-base": [{ term: "Anyaman", definition: "Weaving crafts using natural fibers for everyday needs." }],
  "madura-bawean": [{ term: "Bawean", definition: "An island north of Madura with maritime traditions and a local language." }],
  "madura-kangean": [
    { term: "Kangean", definition: "A northeastern island cluster with a coastal identity and fishing culture." },
  ],
  mataraman: [
    { term: "Tata Krama", definition: "Etiquette and manners that are prominent in Mataraman culture." },
    { term: "Gamelan", definition: "A traditional Javanese musical ensemble of tuned percussion instruments." },
  ],
  osing: [
    { term: "Using/Osing", definition: "The local Banyuwangi ethnic group and language with distinctive traditions." },
    { term: "Gandrung", definition: "An iconic Banyuwangi dance performed as an expression of gratitude and joy." },
  ],
  panaragan: [{ term: "Seni Rakyat", definition: "Community arts that emerge from Panaragan's local traditions." }],
  pandalungan: [
    { term: "Pandalungan", definition: "A mixed Javanese–Madura identity reflected in dialect and customs." },
  ],
  samin: [
    {
      term: "Samin",
      definition: "A community known for an ethic of honesty and simple agrarian life, influenced by Samin Surosentiko teachings.",
    },
  ],
  tengger: [
    { term: "Kasada", definition: "The Kasada ritual of the Tengger people at Mount Bromo involving offerings." },
    { term: "Tengger", definition: "A mountain community with distinctive traditions and beliefs." },
  ],
}
