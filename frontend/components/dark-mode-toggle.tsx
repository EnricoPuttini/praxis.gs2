"use client"

import { Dispatch, SetStateAction } from "react" 
import { Moon, Sun } from "lucide-react"

type DarkModeToggleProps = {
  darkMode: boolean; 
  setDarkMode: Dispatch<SetStateAction<boolean>>; 
};

export function DarkModeToggle({ darkMode, setDarkMode }: DarkModeToggleProps) {
  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors font-medium"
      aria-label="Toggle dark mode"
    >
      {darkMode ? (
        <>
          <Sun className="w-5 h-5" />
          <span className="hidden sm:inline">Claro</span>
        </>
      ) : (
        <>
          <Moon className="w-5 h-5" />
          <span className="hidden sm:inline">Escuro</span>
        </>
      )}
    </button>
  )
}