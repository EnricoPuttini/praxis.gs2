"use client"

import { useState } from "react"
import { Search } from "lucide-react"

type FilterState = {
  cargo: string;
  turno: string;
  nome: string;
};

type FilterBarProps = {
  onFilter: (filters: FilterState) => void; 
  cargos: string[]; 
  turnos: string[]; 
};

export function FilterBar({ onFilter, cargos, turnos }: FilterBarProps) {
  const [filters, setFilters] = useState<FilterState>({
    cargo: "",
    turno: "",
    nome: "",
  })

  const handleChange = (
    field: keyof FilterState, 
    value: string
  ) => {
    const newFilters = { ...filters, [field]: value }
    setFilters(newFilters)
    onFilter(newFilters) 
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 p-5 bg-card rounded-lg border border-border shadow-sm">
      <div className="flex-1">
        <label className="block text-sm font-medium text-foreground mb-2">Filtrar por Cargo</label>
        <select
          value={filters.cargo}
          onChange={(e) => handleChange("cargo", e.target.value)}
          className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="">Todos os cargos</option>
          {cargos.map((cargo) => (
            <option key={cargo} value={cargo}>
              {cargo}
            </option>
          ))}
        </select>
      </div>

      <div className="flex-1">
        <label className="block text-sm font-medium text-foreground mb-2">Filtrar por Turno</label>
        <select
          value={filters.turno}
          onChange={(e) => handleChange("turno", e.target.value)}
          className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="">Todos os turnos</option>
          {turnos.map((turno) => (
            <option key={turno} value={turno}>
              {turno}
            </option>
          ))}
        </select>
      </div>
      <div className="flex-1">
        <label className="block text-sm font-medium text-foreground mb-2">Buscar por Nome</label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={filters.nome}
            onChange={(e) => handleChange("nome", e.target.value)}
            placeholder="Digite um nome..."
            className="w-full pl-10 pr-3 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>
    </div>
  )
}