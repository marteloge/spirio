export interface Plant {
  id: string;
  slug: string;

  // Names
  name_no: string;       // Norwegian
  name_se?: string;      // Swedish
  name_dk?: string;      // Danish
  name_latin: string;    // Scientific

  // Description
  description: string;   // Rich Norwegian description (also used for embedding)
  embedding_text?: string; // Full text sent to OpenAI for embedding (auto-generated)

  // Appearance
  colors: string[];      // ['rosa', 'hvit', 'lilla']
  imageColor: string;    // For placeholder gradient
  height_min_cm: number;
  height_max_cm: number;
  bloom_months: number[]; // [5, 6, 7] = mai, juni, juli

  // Growing conditions
  sunlight: "sol" | "halvskygge" | "skygge" | "sol-halvskygge";
  soil_moisture: "tørr" | "normal" | "fuktig";
  drought_tolerant: boolean;

  // Norwegian zones (THE moat)
  hardiness_zones: number[]; // H1–H8 (1 = coldest, 8 = warmest coast)

  // Use cases — drives "what is this good for" searches
  use_cases: string[];   // ['snittblomst', 'pollinatorer', 'krukke', 'grunndekning', 'tørrbuketter', 'hekk']
  cut_flower: boolean;
  scent: "ingen" | "svak" | "sterk";
  attracts_pollinators: boolean;

  // Propagation
  available_as: string[];    // ['frø', 'plante', 'løk', 'knolle']
  difficulty: "lett" | "middels" | "krevende";
  sow_months_indoor?: number[];
  sow_months_outdoor?: number[];

  // Taxonomy
  plant_type: "stauder" | "ettårig" | "toårig" | "busk" | "tre" | "klatreplante" | "løk" | "knolle";
  categories: string[];  // Free-form tags for search
}

// Helper: build the embedding text from a plant's structured data
// This is what gets sent to OpenAI text-embedding-3-small
export function buildEmbeddingText(p: Plant): string {
  const parts = [
    p.name_no,
    p.name_se,
    p.name_dk,
    p.name_latin,
    p.description,
    `Farger: ${p.colors.join(", ")}`,
    `Vekstsoner: H${p.hardiness_zones.join(", H")}`,
    `Lys: ${p.sunlight}`,
    `Jord: ${p.soil_moisture}`,
    p.drought_tolerant ? "tørketålende" : "",
    `Bruk: ${p.use_cases.join(", ")}`,
    p.cut_flower ? "snittblomst, bukett, bryllup, kurvblomst" : "",
    p.scent !== "ingen" ? `duftende, duft ${p.scent}` : "",
    p.attracts_pollinators ? "bier, humler, sommerfugler, pollinatorer" : "",
    `Type: ${p.plant_type}`,
    `Vanskelighetsgrad: ${p.difficulty}`,
    `Tilgjengelig som: ${p.available_as.join(", ")}`,
    p.categories.join(", "),
  ];
  return parts.filter(Boolean).join(". ");
}

export const mockPlants: Plant[] = [
  {
    id: "1",
    slug: "pion",
    name_no: "Pion",
    name_se: "Pion",
    name_dk: "Pæon",
    name_latin: "Paeonia lactiflora",
    description:
      "Frodig, fyldig blomst i rosa og hvite nyanser. Dufter herlig og er en klassiker i norske hager. Trives i sol og halvskygge med god, næringsrik jord. Utmerket snittblomst — holder seg lenge i vase.",
    colors: ["rosa", "hvit", "rød"],
    imageColor: "#d4a0b0",
    height_min_cm: 60,
    height_max_cm: 100,
    bloom_months: [6, 7],
    sunlight: "sol-halvskygge",
    soil_moisture: "normal",
    drought_tolerant: false,
    hardiness_zones: [1, 2, 3, 4, 5],
    use_cases: ["snittblomst", "pollinatorer", "bed", "hage", "bryllup", "tørrbuketter"],
    cut_flower: true,
    scent: "sterk",
    attracts_pollinators: true,
    available_as: ["plante"],
    difficulty: "lett",
    plant_type: "stauder",
    categories: ["flerårig", "duftende", "sommerblomst", "klassisk"],
  },
  {
    id: "2",
    slug: "lavendel",
    name_no: "Lavendel",
    name_se: "Lavendel",
    name_dk: "Lavendel",
    name_latin: "Lavandula angustifolia",
    description:
      "Aromatiske lilla blomsteraks som tiltrekker humler og bier i massevis. Tørketålende og trives best i sol med veldrenert jord. Perfekt for grenser, krydderbed og tørrbuketter.",
    colors: ["lilla", "blå"],
    imageColor: "#9b8db5",
    height_min_cm: 30,
    height_max_cm: 60,
    bloom_months: [6, 7, 8],
    sunlight: "sol",
    soil_moisture: "tørr",
    drought_tolerant: true,
    hardiness_zones: [2, 3, 4],
    use_cases: ["pollinatorer", "tørrbuketter", "krukke", "grenser", "krydderbed"],
    cut_flower: true,
    scent: "sterk",
    attracts_pollinators: true,
    available_as: ["frø", "plante"],
    difficulty: "lett",
    plant_type: "stauder",
    categories: ["flerårig", "duftende", "tørketålende", "humlevennlig"],
  },
  {
    id: "3",
    slug: "georgine",
    name_no: "Georgine",
    name_se: "Dahlia",
    name_dk: "Dahlia",
    name_latin: "Dahlia pinnata",
    description:
      "Storslagne sommerblomster i alt fra lys rosa til djupkarmesinfarge. Blomstrer fra juli til frost og er uovertruffen som snittblomst. Knollene lagres inne om vinteren.",
    colors: ["rosa", "rød", "oransje", "hvit", "lilla"],
    imageColor: "#c96b7a",
    height_min_cm: 40,
    height_max_cm: 150,
    bloom_months: [7, 8, 9, 10],
    sunlight: "sol",
    soil_moisture: "normal",
    drought_tolerant: false,
    hardiness_zones: [2, 3, 4],
    use_cases: ["snittblomst", "bed", "hage", "bryllup"],
    cut_flower: true,
    scent: "ingen",
    attracts_pollinators: true,
    available_as: ["knolle", "frø"],
    difficulty: "middels",
    plant_type: "knolle",
    categories: ["sommerblomst", "snittblomst", "knolle"],
  },
  {
    id: "4",
    slug: "solbrud",
    name_no: "Solbrud",
    name_se: "Solöga",
    name_dk: "Solhatt",
    name_latin: "Rudbeckia fulgida",
    description:
      "Gule, solformede blomster med mørk midtknapp. Robust og lettstelt flerårig som blomstrer fra august til oktober. Tiltrekker bier og sommerfugler i store mengder.",
    colors: ["gul", "oransje"],
    imageColor: "#e8b84b",
    height_min_cm: 50,
    height_max_cm: 80,
    bloom_months: [8, 9, 10],
    sunlight: "sol-halvskygge",
    soil_moisture: "normal",
    drought_tolerant: true,
    hardiness_zones: [1, 2, 3, 4, 5, 6],
    use_cases: ["pollinatorer", "bed", "snittblomst", "naturhage"],
    cut_flower: true,
    scent: "ingen",
    attracts_pollinators: true,
    available_as: ["frø", "plante"],
    difficulty: "lett",
    plant_type: "stauder",
    categories: ["flerårig", "hardfør", "høstblomst", "pollinatorer"],
  },
  {
    id: "5",
    slug: "hosta",
    name_no: "Hosta",
    name_se: "Funkia",
    name_dk: "Hosta",
    name_latin: "Hosta sieboldiana",
    description:
      "Storslagen løvplante med blå-grønne, ribbede blader. Trives utmerket i skygge og halvskygge — fyller ut skyggebed med eleganse. Lavvedlikeholdsplante.",
    colors: ["grønn", "blågrønn"],
    imageColor: "#6b8f71",
    height_min_cm: 40,
    height_max_cm: 80,
    bloom_months: [7, 8],
    sunlight: "halvskygge",
    soil_moisture: "fuktig",
    drought_tolerant: false,
    hardiness_zones: [1, 2, 3, 4, 5, 6],
    use_cases: ["skyggebed", "grunndekning", "krukke"],
    cut_flower: false,
    scent: "ingen",
    attracts_pollinators: false,
    available_as: ["plante"],
    difficulty: "lett",
    plant_type: "stauder",
    categories: ["løvplante", "skyggetålende", "flerårig", "lavvedlikehold"],
  },
  {
    id: "6",
    slug: "villrose",
    name_no: "Villrose",
    name_se: "Nyponros",
    name_dk: "Hunderose",
    name_latin: "Rosa canina",
    description:
      "Norsk villrose med enkle, lysrosa blomster og store røde nyper om høsten. Ekstremt hardfør og pollinatorvennlig. God til naturhekker og villhager. Nypene brukes til te og syltetøy.",
    colors: ["rosa", "hvit"],
    imageColor: "#e8a0a8",
    height_min_cm: 100,
    height_max_cm: 300,
    bloom_months: [6, 7],
    sunlight: "sol-halvskygge",
    soil_moisture: "normal",
    drought_tolerant: true,
    hardiness_zones: [1, 2, 3, 4, 5, 6, 7],
    use_cases: ["hekk", "naturhage", "pollinatorer", "mat", "tørrbuketter"],
    cut_flower: true,
    scent: "svak",
    attracts_pollinators: true,
    available_as: ["plante", "frø"],
    difficulty: "lett",
    plant_type: "busk",
    categories: ["hardfør", "norsk", "villplante", "pollinatorer", "bær"],
  },
];

export function searchPlants(query: string, zone: number | null): Plant[] {
  let results = mockPlants;

  if (zone !== null) {
    results = results.filter((p) => p.hardiness_zones.includes(zone));
  }

  if (!query.trim()) return results;

  const q = query.toLowerCase();
  return results.filter(
    (p) =>
      p.name_no.toLowerCase().includes(q) ||
      p.name_latin.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.colors.some((c) => c.toLowerCase().includes(q)) ||
      p.use_cases.some((u) => u.toLowerCase().includes(q)) ||
      p.categories.some((c) => c.toLowerCase().includes(q)) ||
      (p.cut_flower && ["snitt", "bukett", "bryllup"].some((t) => q.includes(t))) ||
      (p.attracts_pollinators && ["humle", "bi", "sommerfugl", "pollinat"].some((t) => q.includes(t))) ||
      (p.drought_tolerant && ["tørke", "tørt"].some((t) => q.includes(t))) ||
      p.sunlight.includes(q)
  );
}
