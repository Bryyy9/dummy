"use client"

import * as React from "react"

type Member = {
  name: string
  role: string
}

interface TeamTickerSectionProps {
  team?: Array<{
    namaContributor: string
    expertiseArea: string
  }>
}

const DEFAULT_MEMBERS: Member[] = [
  { name: "Ayu Prameswari", role: "Research Lead" },
  { name: "Bagus Santosa", role: "Data Engineer" },
  { name: "Citra Wulandari", role: "UX Researcher" },
  { name: "Dimas Pratama", role: "Frontend Engineer" },
  { name: "Eko Wirawan", role: "Backend Engineer" },
  { name: "Fajar Setiawan", role: "Designer" },
  { name: "Gita Larasati", role: "PM" },
  { name: "Hadi Kurnia", role: "GIS Specialist" },
]

export default function TeamTickerSection({ team }: TeamTickerSectionProps) {
  const members = team ? team.map(t => ({
    name: t.namaContributor,
    role: t.expertiseArea
  })) : DEFAULT_MEMBERS
  return (
    <section
      aria-labelledby="team-ticker-heading"
      className="relative py-20 bg-gradient-to-b from-background via-muted/20 to-background overflow-hidden"
    >
      {/* background effect */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 rounded-full bg-amber-200/20 blur-3xl" />
      </div>

      {/* Header */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <h2 id="team-ticker-heading" className="text-3xl md:text-4xl font-bold text-balance">
            Meet the Team
            <span className="block text-primary">The People Behind the Project</span>
          </h2>

          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A diverse team of passionate individuals working together to preserve and promote East Java’s cultural heritage.
          </p>
        </div>
      </div>

      {/* Marquee Members */}
      <div className="group relative mt-12 w-screen -ml-[calc((100vw-100%)/2)] overflow-visible">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

        <div
          className="marquee relative overflow-visible w-full border-y border-border/60 bg-muted/20"
          aria-label="Scrolling team members"
        >
          <div className="marquee-track flex items-center gap-14 md:gap-20 py-10 will-change-transform px-12 sm:px-16 lg:px-20">
            {Array.from({ length: 2 }).map((_, dup) =>
              members.map((member, i) => (
                <div
                  key={`${dup}-${i}`}
                  aria-hidden={dup === 1 ? true : undefined}
                  className={`flex-shrink-0 flex flex-col items-center rounded-xl border border-border/40
                              bg-gradient-to-br from-muted/60 to-muted/20 shadow-sm px-6 py-4
                              hover:-translate-y-1 hover:shadow-md transition-all duration-300`}
                >
                  <p className="text-sm font-semibold text-foreground">{member.name}</p>
                  <p className="text-xs text-muted-foreground">{member.role}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Marquee Animation */}
      <style jsx>{`
        @keyframes marquee-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .marquee-track {
          animation: marquee-left 30s linear infinite;
        }
        .group:hover .marquee-track {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}
