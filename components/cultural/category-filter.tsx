"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Category } from "@/data/categories"

interface CategoryFilterProps {
  categories: Category[]
  selectedCategory: string
  onCategoryChange: (category: string) => void
  className?: string
}

export function CategoryFilter({ categories, selectedCategory, onCategoryChange, className }: CategoryFilterProps) {
  return (
    <div className={`flex flex-wrap gap-2 justify-center ${className}`}>
      {categories.map((category) => {
        const IconComponent = category.icon
        return (
          <Button
            key={category.value}
            variant={selectedCategory === category.value ? "default" : "outline"}
            size="sm"
            onClick={() => onCategoryChange(category.value)}
            className="rounded-full group relative overflow-hidden"
            aria-label={`Filter kategori ${category.label}`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <IconComponent className="h-4 w-4 mr-2 relative z-10" />
            <span className="relative z-10">{category.label}</span>
            <Badge variant="secondary" className="ml-2 text-xs relative z-10">
              {category.count}
            </Badge>
          </Button>
        )
      })}
    </div>
  )
}
