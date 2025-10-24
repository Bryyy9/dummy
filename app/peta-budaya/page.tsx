// app/peta-budaya/page.tsx
'use client'

import { AdvancedPopupMap, REGIONS, type Region } from '@/components/cultural/advanced-popup-map'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function PetaBudayaPage() {
  const router = useRouter()

  const handleRegionClick = (regionId: string) => {
    router.push(`/budaya/daerah/${regionId}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="hover:bg-accent/10">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  East Java Cultural Map
                </h1>
                <p className="text-muted-foreground mt-1">
                  Hover over regions to explore their cultural richness
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Map Container */}
        <div className="rounded-2xl overflow-hidden border-2 border-border shadow-2xl bg-card/50 backdrop-blur-sm">
          <AdvancedPopupMap onRegionClick={handleRegionClick} />
        </div>

        {/* Legend */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-foreground mb-4">
            Cultural Regions
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {REGIONS.map((region: Region) => (
              <button
                key={region.id}
                onClick={() => handleRegionClick(region.id)}
                className="flex items-center gap-3 p-3 rounded-lg border border-border bg-card/50 hover:bg-card transition-all hover:shadow-md group"
              >
                <div 
                  className="w-4 h-4 rounded-full flex-shrink-0 group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: region.color }}
                />
                <div className="text-left">
                  <p className="text-sm font-medium text-foreground">
                    {region.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {region.population}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-8 p-6 rounded-xl bg-card/50 border border-border">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            How to Use
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Hover over any region on the map to see detailed information</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Click on a region to explore its cultural glossary</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Use the legend below to quickly navigate to specific regions</span>
            </li>
          </ul>
        </div>
      </main>
    </div>
  )
}
