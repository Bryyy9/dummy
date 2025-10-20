"use client"

import * as React from "react"

type Member = {
  name: string
  role: string
}

const MEMBERS: Member[] = [
  { name: "Ayu Prameswari", role: "Research Lead" },
  { name: "Bagus Santosa", role: "Data Engineer" },
  { name: "Citra Wulandari", role: "UX Researcher" },
  { name: "Dimas Pratama", role: "Frontend Engineer" },
  { name: "Eko Wirawan", role: "Backend Engineer" },
  { name: "Fajar Setiawan", role: "Designer" },
  { name: "Gita Larasati", role: "PM" },
  { name: "Hadi Kurnia", role: "GIS Specialist" },
]

function TickerRow({ members }: { members: Member[] }) {
  return (
    <div className="flex items-stretch gap-4 pr-4" aria-hidden="true">
      {members.map((m, idx) => (
        <div
          key={`${m.name}-${idx}`}
          className="shrink-0 rounded-xl border border-border/50 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-md px-5 py-4 hover-lift transition-all duration-300"
        >
          <p className="text-sm font-bold text-foreground leading-tight mb-1.5">{m.name}</p>
          <p className="text-xs font-medium text-accent/90 uppercase tracking-wider">{m.role}</p>
        </div>
      ))}
    </div>
  )
}

export function TeamTickerSection() {
  // duplicate list to ensure seamless loop
  const loopMembers = React.useMemo(() => [...MEMBERS, ...MEMBERS], [])

  return (
    <section
      aria-labelledby="team-ticker-heading"
      className="relative py-16 md:py-20 bg-gradient-to-b from-muted/30 to-muted/10 rounded-3xl overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 md:mb-16 text-center">
          <h2
            id="team-ticker-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 leading-tight"
          >
            Team Involved
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Collaborators dedicated to bringing their skills and passion to preserve the cultural heritage of East Java.
          </p>
        </div>

        <div
          className="group relative overflow-hidden rounded-2xl border border-border/30 bg-background/40 backdrop-blur-xl shadow-lg"
          aria-label="Ticker anggota tim"
        >
          {/* subtle edge fades for continuity */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background via-background/50 to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background via-background/50 to-transparent z-10" />

          <div className="flex gap-4 animate-[ticker_30s_linear_infinite] group-hover:[animation-play-state:paused] motion-reduce:animate-none py-6">
            <TickerRow members={loopMembers} />
            {/* duplicate row for seamless loop */}
            <TickerRow members={loopMembers} />
          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Hover to interact • Scroll to see more team members
        </p>
      </div>

      <style jsx>{`
        @keyframes ticker {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .motion-reduce\\:animate-none {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  )
}

export default TeamTickerSection
