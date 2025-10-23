import type React from "react"
import type { LexiconEntry } from "@/data/lexicon"

export interface SearchResult {
  entry: LexiconEntry
  matches: string[]
  relevance: number
}

/**
 * Enhanced search function that searches across multiple fields
 * and calculates relevance score based on match type and field
 */
export function searchLexiconEntries(entries: LexiconEntry[], query: string): SearchResult[] {
  if (!query.trim()) return []

  const lowerQuery = query.toLowerCase().trim()
  const results: SearchResult[] = []

  for (const entry of entries) {
    const matches: string[] = []
    let relevance = 0

    // Search term (highest relevance)
    if (entry.term.toLowerCase().includes(lowerQuery)) {
      matches.push("term")
      relevance += 100
    }

    // Search transliteration
    if (entry.transliterasi?.toLowerCase().includes(lowerQuery)) {
      matches.push("transliterasi")
      relevance += 90
    }

    // Search definition
    if (entry.definition.toLowerCase().includes(lowerQuery)) {
      matches.push("definition")
      relevance += 80
    }

    // Search etymology
    if (entry.etimologi?.toLowerCase().includes(lowerQuery)) {
      matches.push("etimologi")
      relevance += 70
    }

    // Search cultural meaning
    if (entry.culturalMeaning?.toLowerCase().includes(lowerQuery)) {
      matches.push("culturalMeaning")
      relevance += 70
    }

    // Search common meaning
    if (entry.commonMeaning?.toLowerCase().includes(lowerQuery)) {
      matches.push("commonMeaning")
      relevance += 60
    }

    // Search variants
    if (entry.variants?.some((v) => v.toLowerCase().includes(lowerQuery))) {
      matches.push("variants")
      relevance += 50
    }

    // Search note
    if (entry.note?.toLowerCase().includes(lowerQuery)) {
      matches.push("note")
      relevance += 40
    }

    // Search term code
    if (entry.termCode.toLowerCase().includes(lowerQuery)) {
      matches.push("termCode")
      relevance += 30
    }

    if (matches.length > 0) {
      results.push({ entry, matches, relevance })
    }
  }

  // Sort by relevance (highest first)
  return results.sort((a, b) => b.relevance - a.relevance)
}

/**
 * Highlight matching text in a string
 */
export function highlightMatch(text: string, query: string): React.ReactNode {
  if (!query.trim()) return text

  const parts = text.split(new RegExp(`(${query})`, "gi"))
  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark key={i} className="bg-primary/20 text-foreground font-medium rounded px-0.5">
        {part}
      </mark>
    ) : (
      part
    ),
  )
}

/**
 * Get field label for display
 */
export function getFieldLabel(field: string): string {
  const labels: Record<string, string> = {
    term: "Term",
    transliterasi: "Transliteration",
    definition: "Definition",
    etimologi: "Etymology",
    culturalMeaning: "Cultural Meaning",
    commonMeaning: "Common Meaning",
    variants: "Variants",
    note: "Note",
    termCode: "Term Code",
  }
  return labels[field] || field
}
