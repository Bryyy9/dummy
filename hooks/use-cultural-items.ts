"use client"

import { useState, useEffect, useMemo } from "react"
import {
  culturalItems,
  searchCulturalItems,
  getCulturalItemsByCategory,
  type CulturalItem,
} from "@/data/cultural-items"

export function useCulturalItems() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("tari")
  const [filteredItems, setFilteredItems] = useState<CulturalItem[]>([])

  // Compute filtered items based on search and category
  const displayItems = useMemo(() => {
    let items = culturalItems

    // Apply category filter
    if (selectedCategory !== "semua") {
      items = getCulturalItemsByCategory(selectedCategory)
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const searchResults = searchCulturalItems(searchQuery)
      items = items.filter((item) => searchResults.some((searchItem) => searchItem.id === item.id))
    }

    return items
  }, [searchQuery, selectedCategory])

  // Update filtered items when display items change
  useEffect(() => {
    setFilteredItems(displayItems)
  }, [displayItems])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategory("semua")
  }

  return {
    // State
    searchQuery,
    selectedCategory,
    filteredItems,
    displayItems,

    // Actions
    handleSearch,
    handleCategoryChange,
    clearFilters,

    // Computed
    hasFilters: searchQuery.trim() !== "" || selectedCategory !== "semua",
    itemCount: displayItems.length,
    totalItems: culturalItems.length,
  }
}
