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
          className="shrink-0 rounded-lg border border-border bg-card/70 backdrop-blur-sm px-4 py-3"
        >
          <p className="text-sm font-semibold text-foreground text-pretty">{m.name}</p>
          <p className="text-xs text-muted-foreground">{m.role}</p>
        </div>
      ))}
    </div>
  )
}

export function TeamTickerSection() {
  // duplicate list to ensure seamless loop
  const loopMembers = React.useMemo(() => [...MEMBERS, ...MEMBERS], [])

  return (
    <section aria-labelledby="team-ticker-heading" className="relative py-10 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 id="team-ticker-heading" className="sr-only">
          Tim yang terlibat
        </h2>

        <div
          className="group relative overflow-hidden rounded-xl border border-border bg-background/60"
          aria-label="Ticker anggota tim"
        >
          {/* subtle edge fades for continuity */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent" />

          <div className="flex gap-4 animate-[ticker_30s_linear_infinite] group-hover:[animation-play-state:paused] motion-reduce:animate-none">
            <TickerRow members={loopMembers} />
            {/* duplicate row for seamless loop */}
            <TickerRow members={loopMembers} />
          </div>
        </div>
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
