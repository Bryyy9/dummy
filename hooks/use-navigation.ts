"use client"

import { useCallback } from "react"
import { useRouter } from "next/navigation"

export function useNavigation() {
  const router = useRouter()

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const headerOffset = 80 // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }, [])

  const handleNavClick = useCallback(
    (section: string) => {
      scrollToSection(section)
    },
    [scrollToSection],
  )

  const handleLearnMore = useCallback(
    (itemId: number) => {
      router.push(`/budaya/${itemId}`)
    },
    [router],
  )

  const handleGlobeNavigation = useCallback(() => {
    router.push("/peta-budaya")
  }, [router])

  const handleCategoryNavigation = useCallback(
    (category: string) => {
      router.push(`/budaya?kategori=${encodeURIComponent(category)}`)
    },
    [router],
  )

  return {
    handleNavClick,
    handleLearnMore,
    handleGlobeNavigation,
    handleCategoryNavigation,
    scrollToSection,
  }
}
