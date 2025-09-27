"use client"

import { Navigation } from "@/components/layout/navigation"
import { SectionHeader } from "@/components/layout/section-header"
import { SearchBar } from "@/components/cultural/search-bar"
import { CategoryFilter } from "@/components/cultural/category-filter"
import { ViewModeToggle } from "@/components/cultural/view-mode-toggle"
import { CulturalItemCard } from "@/components/cultural/cultural-item-card"
import { Footer } from "@/components/layout/footer"
import { NoResultsState } from "@/components/cultural/no-results-state"
import { useCulturalItems } from "@/hooks/use-cultural-items"
import { useBookmarks } from "@/hooks/use-bookmarks"
import { useViewMode } from "@/hooks/use-view-mode"
import { useNavigation } from "@/hooks/use-navigation"
import { categories } from "@/data/categories"
import { cn } from "@/lib/utils"
import { Compass, Target } from "lucide-react"

export default function BudayaPage() {
  const { searchQuery, selectedCategory, displayItems, handleSearch, handleCategoryChange, hasFilters, itemCount } =
    useCulturalItems()

  const { isBookmarked, toggleBookmark } = useBookmarks()
  const { viewMode, setViewMode } = useViewMode()
  const { handleNavClick, handleLearnMore } = useNavigation()

  const handleCategoryClick = (category: string) => {
    handleCategoryChange(category)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation onNavClick={handleNavClick} />

      <main className="pt-16">
        <div className="py-20 bg-muted/30 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <SectionHeader
              badge={{
                text: "Cultural Exploration",
                icon: Compass,
                variant: "outline",
              }}
              secondaryBadge={{
                text: "Easy to Discover",
                icon: Target,
                variant: "outline",
                className: "bg-emerald-100/50 text-emerald-700 border-emerald-200 hover-lift",
              }}
              title="Explore Culture"
              subtitle="East Java"
              description="Discover and learn about East Java’s culture through a complete collection of arts, cuisine, language, and traditions passed down across generations."
            />

            {/* Search and Filter Interface */}
            <div className="max-w-4xl mx-auto mb-12 space-y-6">
              <SearchBar
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Search arts, food, language, music, and more..."
              />

              <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
              />

              <div className="flex items-center justify-between">
                <ViewModeToggle viewMode={viewMode} onViewModeChange={setViewMode} />

                {hasFilters && (
                  <div className="text-sm text-muted-foreground">
                    {itemCount > 0
                      ? `Found ${itemCount} result${itemCount === 1 ? "" : "s"}${
                          searchQuery ? ` for "${searchQuery}"` : ""
                        }${
                          selectedCategory !== "semua"
                            ? ` in category ${categories.find((c) => c.value === selectedCategory)?.label}`
                            : ""
                        }`
                      : `No results${searchQuery ? ` for "${searchQuery}"` : ""}${
                          selectedCategory !== "semua"
                            ? ` in category ${categories.find((c) => c.value === selectedCategory)?.label}`
                            : ""
                        }`}
                  </div>
                )}
              </div>
            </div>

            {/* Cultural Items Grid */}
            {displayItems.length > 0 ? (
              <div
                className={cn(
                  "grid gap-6 transition-all duration-500",
                  viewMode === "grid" ? "md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1 max-w-4xl mx-auto",
                )}
              >
                {displayItems.map((item, index) => (
                  <CulturalItemCard
                    key={item.id}
                    item={item}
                    viewMode={viewMode}
                    isBookmarked={isBookmarked(item.id)}
                    onBookmarkToggle={toggleBookmark}
                    onLearnMore={handleLearnMore}
                    animationDelay={index * 100}
                  />
                ))}
              </div>
            ) : (
              <NoResultsState
                searchQuery={searchQuery}
                selectedCategory={selectedCategory}
                onClearSearch={() => handleSearch("")}
                onClearCategory={() => handleCategoryChange("semua")}
                onSuggestionClick={handleSearch}
              />
            )}
          </div>
        </div>
      </main>

      <Footer onNavClick={handleNavClick} onCategoryClick={handleCategoryClick} />
    </div>
  )
}
