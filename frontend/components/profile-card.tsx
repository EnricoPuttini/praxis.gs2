"use client"

import Image from "next/image"
import { Operator } from "@/app/page"

type ProfileCardProps = {
  operator: Operator;
  onSelect: () => void;
};

export function ProfileCard({ operator, onSelect }: ProfileCardProps) {

  const getStatusColor = (status: string) => {
    if (status === "Ativo") return "bg-green-500"
    return "bg-gray-400"
  }

  const getStatusLabel = (status: string) => {
    return status === "Ativo" ? "Ativo" : "Offline"
  }

  return (
    <button
      onClick={onSelect}
      className="group p-6 bg-card border border-border rounded-lg shadow-md hover:shadow-lg hover:border-primary transition-all duration-200 text-left"
    >
      <div className="flex justify-center mb-4">
        <div className="relative w-20 h-20 rounded-full overflow-hidden border-3 border-primary shadow-md">
          <Image
            src={operator.foto_url || "/placeholder.svg"}
            alt={operator.nome_completo}
            fill
            className="object-cover"
          />
          <div
            className={`absolute bottom-0 right-0 w-6 h-6 ${getStatusColor(operator.status_atual)} rounded-full border-2 border-card`}
          />
        </div>
      </div>

      <h3 className="text-lg font-bold text-foreground text-center group-hover:text-primary transition-colors">
        {operator.nome_completo}
      </h3>

      <p className="text-sm text-muted-foreground text-center mb-4">{operator.cargo}</p>

      <div className="flex justify-center">
        <span
          className={`inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold text-white ${getStatusColor(operator.status_atual)}`}
        >
          {getStatusLabel(operator.status_atual)}
        </span>
      </div>
    </button>
  )
}