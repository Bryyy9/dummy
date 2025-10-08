export interface SubRegionMapping {
  // unique id that matches your application region identifier
  id: string
  // CSS selector to locate the shape (path or group) inside the SVG, e.g. "#malang"
  selector: string
  // readable label for a11y
  label?: string
}

// IMPORTANT:
// Ensure the SVG in /public/maps/jawa-perprovinsi-subculture.svg contains elements (path or g)
// with id attributes matching these selectors, e.g. <path id="malang" .../>.
// Update the list below to reflect your actual sub-daerah coverage.
export const subRegionMappings: SubRegionMapping[] = [
  { id: "surabaya", selector: "#surabaya", label: "Surabaya" },
  { id: "malang", selector: "#malang", label: "Malang" },
  { id: "kediri", selector: "#kediri", label: "Kediri" },
  { id: "jember", selector: "#jember", label: "Jember" },
  { id: "probolinggo", selector: "#probolinggo", label: "Probolinggo" },
  { id: "banyuwangi", selector: "#banyuwangi", label: "Banyuwangi" },
  { id: "ponorogo", selector: "#ponorogo", label: "Ponorogo" },
  { id: "madiun", selector: "#madiun", label: "Madiun" },
]
