"use client"

import { useState } from "react"
import { X, AlertCircle, TrendingUp } from "lucide-react"
import Image from "next/image"
import { Operator } from "@/app/page"

type DetailModalProps = {
  operator: Operator; 
  onClose: () => void; 
};

export function DetailModal({ operator, onClose }: DetailModalProps) {
  const [activeTab, setActiveTab] = useState("perfil")

  const tabs = [
    { id: "perfil", label: "Perfil" },
    { id: "aprendizado", label: "Aprendizado & Progresso" },
    { id: "insights", label: "Insights da IA" },
  ]

  const getStatusColor = (status: string) => {
    if (status === "Ativo") return "bg-green-500"
    return "bg-gray-400"
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div
        className="bg-card border border-border rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border bg-background/50">
          <h2 className="text-2xl font-bold text-foreground">Detalhes do Operador</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-muted rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6 text-foreground" />
          </button>
        </div>

        <div className="flex-1 overflow-auto">
          <div className="p-6 border-b border-border bg-secondary/20">
            <div className="flex gap-6 mb-6">
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-3 border-primary flex-shrink-0">
                <Image
                  src={operator.foto_url || "/placeholder.svg"}
                  alt={operator.nome_completo}
                  fill
                  className="object-cover"
                />
                <div
                  className={`absolute bottom-0 right-0 w-5 h-5 ${getStatusColor(operator.status_atual)} rounded-full border-2 border-card`}
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground">{operator.nome_completo}</h3>
                <p className="text-foreground/80 font-medium mb-2">{operator.cargo}</p>
                <div className="flex gap-2">
                  <span className="inline-flex items-center rounded-md bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground">
                    {operator.turno}
                  </span>
                  <span className={`inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold text-white border-0 ${getStatusColor(operator.status_atual)}`}>
                    {operator.status_atual === "Ativo" ? "Ativo" : "Offline"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex border-b border-border bg-card">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 font-medium transition-colors ${
                  activeTab === tab.id
                    ? "text-primary border-b-2 border-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === "perfil" && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-2">Informações Pessoais</h4>
                  <p className="text-foreground/80">{operator.info_pessoal}</p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-2">Informações Acadêmicas</h4>
                  <p className="text-foreground/80">{operator.info_academica}</p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-3">Soft Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {operator.soft_skills.map((skill) => (
                      <span key={skill} className="inline-flex items-center rounded-md bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-3">Hobbies & Interesses</h4>
                  <div className="flex flex-wrap gap-2">
                    {operator.hobbies.map((hobby) => (
                      <span key={hobby} className="inline-flex items-center rounded-md border border-border px-2.5 py-0.5 text-xs font-semibold text-foreground">
                        {hobby}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "aprendizado" && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    Trilha: {operator.trilha_atual}
                  </h4>
                  <div className="bg-muted rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">Progresso</span>
                      <span className="text-sm font-bold text-primary">{operator.progresso_percentual}%</span>
                    </div>
                    <div className="w-full bg-muted-foreground/20 rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-primary h-full rounded-full transition-all"
                        style={{ width: `${operator.progresso_percentual}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-3">Habilidades Adquiridas</h4>
                  {operator.habilidades_adquiridas.length > 0 ? (
                    <div className="space-y-2">
                      {operator.habilidades_adquiridas.map((skill, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                          <span className="text-foreground font-medium">{skill.nome}</span>
                          <span className="text-sm text-muted-foreground">
                            {new Date(skill.data_aquisicao).toLocaleDateString("pt-BR", { timeZone: 'UTC' })}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">Nenhuma habilidade registrada ainda.</p>
                  )}
                </div>
              </div>
            )}

            {activeTab === "insights" && (
              <div className="space-y-6">
                {operator.alertas_pendentes > 0 && (
                  <div className="flex gap-3 p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-destructive">
                        {operator.alertas_pendentes} Alerta{operator.alertas_pendentes > 1 ? "s" : ""} Pendente
                        {operator.alertas_pendentes > 1 ? "s" : ""}
                      </p>
                      <p className="text-sm text-destructive/80">
                        Ação recomendada: Revisar o desempenho e fornecer suporte adicional.
                      </p>
                    </div>
                  </div>
                )}

                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-3">Dúvidas Recentes</h4>
                  {operator.duvidas_recentes.length > 0 ? (
                    <div className="space-y-2">
                      {operator.duvidas_recentes.map((duvida, idx) => (
                        <div key={idx} className="p-4 bg-muted rounded-lg border border-border">
                          <p className="text-foreground font-medium mb-2">{duvida.pergunta}</p>
                          <span className="inline-flex items-center rounded-md border border-border px-2.5 py-0.5 text-xs font-semibold text-foreground">
                            Skill: {duvida.skill_relacionada}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">Nenhuma dúvida registrada. Operador está indo bem!</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-border p-4 bg-background/50 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors font-medium"
          >
            Fechar
          </button>
          <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium">
            Editar Perfil
          </button>
        </div>
      </div>
    </div>
  )
}