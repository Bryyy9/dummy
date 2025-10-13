"use client"

import { usePathname } from "next/navigation"
import type { PropsWithChildren } from "react"

export default function TransitionProvider({ children }: PropsWithChildren) {
  const pathname = usePathname()
  return (
    <div key={pathname} className="page-transition">
      {children}
    </div>
  )
}
