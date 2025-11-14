"use client" 

import { useState, useEffect } from "react"
import { DarkModeToggle } from "@/components/dark-mode-toggle"
import { Sidebar } from "@/components/sidebar"
import { FilterBar } from "@/components/filter-bar"
import { ProfileCard } from "@/components/profile-card"
import { DetailModal } from "@/components/detail-modal"

export type Operator = {
  id: number;
  nome_completo: string;
  cargo: string;
  foto_url: string;
  status_atual: "Ativo" | "Offline" | string; 
  turno: string;
  info_pessoal: string;
  info_academica: string;
  soft_skills: string[];
  hobbies: string[];
  trilha_atual: string;
  progresso_percentual: number;
  habilidades_adquiridas: { nome: string; data_aquisicao: string }[];
  alertas_pendentes: number;
  duvidas_recentes: { pergunta: string; skill_relacionada: string }[];
  log_mentor_ia?: { role: string; text: string }[];
};

type FilterState = {
  cargo: string;
  turno: string;
  nome: string;
};

export default function Dashboard() {
  const [darkMode, setDarkMode] = useState(false)
  const [selectedOperator, setSelectedOperator] = useState<Operator | null>(null)
  const [allOperators, setAllOperators] = useState<Operator[]>([])
  const [filteredOperators, setFilteredOperators] = useState<Operator[]>([])
  const [filters, setFilters] = useState<FilterState>({
    cargo: "",
    turno: "",
    nome: "",
  })
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const API_URL = "http://127.0.0.1:5000/api/operators";
    
    console.log("Buscando dados da API...");
    
    fetch(API_URL)
      .then(response => response.json())
      .then((data: Operator[]) => {
        console.log("Dados recebidos:", data);
        setAllOperators(data);
        setFilteredOperators(data);
        setIsLoading(false); 
      })
      .catch(error => {
        console.error("ERRO AO BUSCAR DADOS DO BACK-END:", error);
        setIsLoading(false);
      });
  }, []); 

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  const handleFilter = (newFilters: FilterState) => {
    setFilters(newFilters)
    let result = allOperators; 

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
    return Array.from(new Set(allOperators.map((op: Operator) => op[key])))
  }

  const handleSimulateAI = async () => {
    console.log("Simulando chamada para a IA...");
    alert("Iniciando simulação de treino para 'Roberto Santos'...\n\nAperte OK. A IA está 'pensando'.\n\nQuando o 'alerta' de sucesso aparecer, aperte F5 para ver o resultado.");
    
    try {
      await fetch('http://127.0.0.1:5000/api/mentor_chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: 6, 
          response: "Sim, estou pronto. O que é a norma SK-103?"
        })
      });
      
      console.log("Simulação enviada com sucesso!");
      alert("Simulação Concluída!\n\nA IA do Gemini respondeu e o 'diário' do Roberto foi atualizado.\n\nAperte F5 ou 'Recarregar' para ver a mudança.");

    } catch (error) {
      console.error("Erro ao simular:", error);
      alert("Erro ao conectar com o servidor de simulação (Python). Verifique o terminal.");
    }
  }


  if (isLoading) {
    return (
      <div className="flex h-screen bg-background items-center justify-center">
        <h1 className="text-2xl font-bold text-foreground">Carregando Dashboard...</h1>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">

        <header className="border-b border-border bg-card shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <h1 className="text-2xl font-bold text-foreground">Dashboard da Equipe</h1>
            
            <div className="flex items-center gap-4">
              <button
                onClick={handleSimulateAI}
                className="px-4 py-2 rounded-lg bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors font-medium text-xs"
              >
                Simular Treino da IA (Roberto)
              </button>
              
              <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
            </div>
            
          </div>
        </header>


        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-6 max-w-7xl mx-auto">
            {/* Title */}
            <h2 className="text-3xl font-bold text-foreground mb-6 text-balance">Operadores da Linha de Frente</h2>

            {/* Filter Bar */}
            <FilterBar onFilter={handleFilter} cargos={getUniqueValues("cargo")} turnos={getUniqueValues("turno")} />

            {/* Profile Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {filteredOperators.map((operator) => (
                <ProfileCard key={operator.id} operator={operator} onSelect={() => setSelectedOperator(operator)} />
              ))}
            </div>

            {filteredOperators.length === 0 && !isLoading && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">Nenhum operador encontrado com os filtros selecionados.</p>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Detail Modal */}
      {selectedOperator && <DetailModal operator={selectedOperator} onClose={() => setSelectedOperator(null)} />}
    </div>
  )
}