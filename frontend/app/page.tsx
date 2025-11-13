"use client"

import { useState, useEffect } from "react"
import { DarkModeToggle } from "@/components/dark-mode-toggle"
import { Sidebar } from "@/components/sidebar"
import { FilterBar } from "@/components/filter-bar"
import { ProfileCard } from "@/components/profile-card"
import { DetailModal } from "@/components/detail-modal"

const mockOperators = [
  {
    id: 1,
    nome_completo: "Ana Silva",
    cargo: "Operadora Sênior",
    foto_url: "/professional-woman-operator.jpg",
    status_atual: "Ativo",
    turno: "Matutino",
    info_pessoal: "Profissional dedicada com 5 anos de experiência",
    info_academica: "Tecnólogo em Gestão de Operações",
    soft_skills: ["Liderança", "Comunicação", "Resolução de Problemas"],
    hobbies: ["Leitura", "Yoga", "Culinária"],
    trilha_atual: "Operações Avançadas",
    progresso_percentual: 75,
    habilidades_adquiridas: [
      { nome: "Gestão de Conflitos", data_aquisicao: "2024-08-15" },
      { nome: "Análise de Dados", data_aquisicao: "2024-07-20" },
      { nome: "Liderança de Equipe", data_aquisicao: "2024-06-10" },
    ],
    alertas_pendentes: 0,
    duvidas_recentes: [],
  },
  {
    id: 2,
    nome_completo: "Carlos Mendes",
    cargo: "Operador Pleno",
    foto_url: "/professional-man-operator.jpg",
    status_atual: "Ativo",
    turno: "Vespertino",
    info_pessoal: "Operador eficiente com 3 anos na função",
    info_academica: "Técnico em Sistemas de Produção",
    soft_skills: ["Atenção ao Detalhe", "Trabalho em Equipe", "Adaptabilidade"],
    hobbies: ["Tecnologia", "Fotografia", "Esportes"],
    trilha_atual: "Desenvolvedor de Operações",
    progresso_percentual: 55,
    habilidades_adquiridas: [
      { nome: "Otimização de Processos", data_aquisicao: "2024-09-01" },
      { nome: "Ferramentas Digitais", data_aquisicao: "2024-08-05" },
    ],
    alertas_pendentes: 1,
    duvidas_recentes: [
      { pergunta: "Como implementar o novo sistema de controle?", skill_relacionada: "Ferramentas Digitais" },
    ],
  },
  {
    id: 3,
    nome_completo: "Maria Costa",
    cargo: "Operadora Trainee",
    foto_url: "/professional-woman-trainee.jpg",
    status_atual: "Offline",
    turno: "Noturno",
    info_pessoal: "Profissional em início de carreira",
    info_academica: "Ensino Médio Completo, Cursos Profissionalizantes",
    soft_skills: ["Proatividade", "Disposição para Aprender", "Organização"],
    hobbies: ["Música", "Desenho", "Dança"],
    trilha_atual: "Operações Fundamentais",
    progresso_percentual: 40,
    habilidades_adquiridas: [{ nome: "Noções de Segurança", data_aquisicao: "2024-09-15" }],
    alertas_pendentes: 2,
    duvidas_recentes: [
      { pergunta: "Qual é o protocolo de segurança correto?", skill_relacionada: "Noções de Segurança" },
      { pergunta: "Como operar o equipamento corretamente?", skill_relacionada: "Operações Básicas" },
    ],
  },
  {
    id: 4,
    nome_completo: "Pedro Oliveira",
    cargo: "Operador Sênior",
    foto_url: "/professional-man-senior-operator.jpg",
    status_atual: "Ativo",
    turno: "Matutino",
    info_pessoal: "Especialista em otimização de processos",
    info_academica: "Engenheiro de Produção",
    soft_skills: ["Visão Estratégica", "Mentorado", "Inovação"],
    hobbies: ["Podcast", "Viagens", "Programação"],
    trilha_atual: "Liderança Estratégica",
    progresso_percentual: 90,
    habilidades_adquiridas: [
      { nome: "Gestão de Recursos", data_aquisicao: "2024-05-20" },
      { nome: "Planejamento Estratégico", data_aquisicao: "2024-04-10" },
      { nome: "Mentorado de Equipes", data_aquisicao: "2024-03-15" },
    ],
    alertas_pendentes: 0,
    duvidas_recentes: [],
  },
  {
    id: 5,
    nome_completo: "Juliana Ferreira",
    cargo: "Operadora Plena",
    foto_url: "/professional-woman-full-operator.jpg",
    status_atual: "Ativo",
    turno: "Vespertino",
    info_pessoal: "Dedicada e sempre atualizada com tendências",
    info_academica: "Bacharel em Administração",
    soft_skills: ["Criatividade", "Inteligência Emocional", "Comunicação"],
    hobbies: ["Arte", "Gastronomia", "Viagens"],
    trilha_atual: "Inovação em Processos",
    progresso_percentual: 68,
    habilidades_adquiridas: [
      { nome: "Design Thinking", data_aquisicao: "2024-08-20" },
      { nome: "Apresentações Impactantes", data_aquisicao: "2024-07-05" },
    ],
    alertas_pendentes: 0,
    duvidas_recentes: [],
  },
  {
    id: 6,
    nome_completo: "Roberto Santos",
    cargo: "Operador Trainee",
    foto_url: "/professional-man-trainee.jpg",
    status_atual: "Ativo",
    turno: "Noturno",
    info_pessoal: "Novo membro em processo de integração",
    info_academica: "Técnico em Manutenção Industrial",
    soft_skills: ["Curiosidade", "Responsabilidade", "Precisão"],
    hobbies: ["Futebol", "Mecânica", "Filmes"],
    trilha_atual: "Operações Fundamentais",
    progresso_percentual: 35,
    habilidades_adquiridas: [],
    alertas_pendentes: 1,
    duvidas_recentes: [{ pergunta: "Qual é a sequência correta de operação?", skill_relacionada: "Operações Básicas" }],
  },
]

export type Operator = typeof mockOperators[0];

type FilterState = {
  cargo: string;
  turno: string;
  nome: string;
};

export default function Dashboard() {
  const [darkMode, setDarkMode] = useState(false)
  const [selectedOperator, setSelectedOperator] = useState<Operator | null>(null)
  const [filteredOperators, setFilteredOperators] = useState(mockOperators)
  const [filters, setFilters] = useState<FilterState>({
    cargo: "",
    turno: "",
    nome: "",
  })

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  const handleFilter = (newFilters: FilterState) => {
    setFilters(newFilters)
    let result = mockOperators

    if (newFilters.cargo) {
      result = result.filter((op) => op.cargo === newFilters.cargo)
    }
    if (newFilters.turno) {
      result = result.filter((op) => op.turno === newFilters.turno)
    }
    if (newFilters.nome) {
      result = result.filter((op) => op.nome_completo.toLowerCase().includes(newFilters.nome.toLowerCase()))
    }

    setFilteredOperators(result)
  }

  const getUniqueValues = (key: "cargo" | "turno") => {
    return Array.from(new Set(mockOperators.map((op: Operator) => op[key])))
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="border-b border-border bg-card shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <h1 className="text-2xl font-bold text-foreground">Dashboard da Equipe</h1>
            <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
          </div>
        </header>

        <main className="flex-1 overflow-auto">
          <div className="p-6 max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-6 text-balance">Operadores da Linha de Frente</h2>

            <FilterBar onFilter={handleFilter} cargos={getUniqueValues("cargo")} turnos={getUniqueValues("turno")} />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {filteredOperators.map((operator) => (
                <ProfileCard key={operator.id} operator={operator} onSelect={() => setSelectedOperator(operator)} />
              ))}
            </div>

            {filteredOperators.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">Nenhum operador encontrado com os filtros selecionados.</p>
              </div>
            )}
          </div>
        </main>
      </div>

      {selectedOperator && <DetailModal operator={selectedOperator} onClose={() => setSelectedOperator(null)} />}
    </div>
  )
} 