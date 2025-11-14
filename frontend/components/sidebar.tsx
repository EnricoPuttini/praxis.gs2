"use client"

import { LayoutDashboard, Users, BarChart3, Settings } from "lucide-react"
import Link from "next/link"

export function Sidebar() {
  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "#" },
  ]

  return (
    <aside className="w-64 border-r border-border bg-card shadow-sm flex flex-col h-screen">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">PM</span>
          </div>
          <div>
            <h1 className="font-bold text-foreground">Praxis Mentor</h1>
            <p className="text-xs text-muted-foreground">Gestão de Talentos</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-foreground hover:bg-secondary hover:text-secondary-foreground transition-colors group"
          >
            <item.icon className="w-5 h-5 text-muted-foreground group-hover:text-secondary-foreground" />
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>

      
    </aside>
  )
}
