"use client"

import { useState, useEffect, useRef } from "react"
// --- CORREÇÃO: Usando a importação CORRETA para o App Router ---
// Vamos forçar o Next.js a encontrá-la com a "Limpeza Nuclear" depois.
import { useParams } from "next/navigation" 
import { Operator } from "@/app/page" 
import { Send, Loader2 } from "lucide-react"

type ChatMessage = {
  role: string;
  text: string;
};

export default function MentorChatPage() {
  const [operator, setOperator] = useState<Operator | null>(null)
  const [chatLog, setChatLog] = useState<ChatMessage[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [isLoading, setIsLoading] = useState(true) 
  const [isSending, setIsSending] = useState(false) 
  
  // --- CORREÇÃO: Usando a importação CORRETA ---
  const params = useParams()
  // O 'id' vem dos params.
  const operatorId = params.id 
  
  const chatEndRef = useRef<HTMLDivElement>(null); 

  // --- (INÍCIO DA NOVA CORREÇÃO DE ESTILO) ---
  // Este "Efeito" força o tema escuro na tag <html>
  // quando o componente "montar" (carregar)
  useEffect(() => {
    // Adiciona 'dark' ao <html>
    document.documentElement.classList.add('dark');
    
    // Esta é a "função de limpeza":
    // Quando o componente "desmontar" (você sair da página)
    // ele remove a classe, para não quebrar o dashboard.
    return () => {
      document.documentElement.classList.remove('dark');
    };
  }, []); // O array vazio [] significa "rode isso apenas uma vez"
  // --- (FIM DA NOVA CORREÇÃO DE ESTILO) ---

  // 1. Efeito para buscar os dados do operário
  useEffect(() => {
    // Só rode se o operatorId já foi lido da URL
    if (operatorId) {
      console.log(`Buscando dados para o operário ID: ${operatorId}`)
      setIsLoading(true)
      // Usando o endpoint de ID que criamos
      fetch(`http://127.0.0.1:5000/api/operators/${operatorId}`)
        .then(res => res.json())
        .then((data: Operator) => {
          if (data && data.id) {
            setOperator(data)
            setChatLog(data.log_mentor_ia || [])
          }
          setIsLoading(false)
        })
        .catch(err => {
          console.error("Erro ao buscar dados do operário:", err)
          setIsLoading(false)
        })
    }
  }, [operatorId]) // Roda sempre que o ID na URL mudar

  // 2. Efeito para rolar o chat para o final
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatLog]); 

  // 3. Função para ENVIAR uma nova mensagem
  const handleSubmitMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || !operatorId || isSending) return

    setIsSending(true)
    const userMessage: ChatMessage = { role: "user", text: newMessage }
    setChatLog(prevLog => [...prevLog, userMessage])
    setNewMessage("") 

    try {
      const response = await fetch('http://127.0.0.1:5000/api/mentor_chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: parseInt(operatorId as string),
          response: newMessage 
        })
      })
      
      const data = await response.json()
      
      if (data.success && data.new_chat_log) {
        setChatLog(data.new_chat_log)
      } else {
        console.error("Erro na resposta da IA:", data.error)
        setChatLog(prevLog => prevLog.slice(0, -1)) 
      }
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error)
      setChatLog(prevLog => prevLog.slice(0, -1))
    } finally {
      setIsSending(false) 
    }
  }

  // Telas de "Carregando..." (Já com o fundo escuro forçado)
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-900 text-white">
        <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
        <p className="text-xl text-white ml-4">Carregando Mentor...</p>
      </div>
    )
  }

  if (!operator) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-900 text-white">
        <p className="text-xl text-red-500">Operador não encontrado.</p>
      </div>
    )
  }

  // A UI do Simulador de Chat
  return (
    // Note: o <div className="dark"> foi removido daqui
    // pois o 'useEffect' está fazendo o trabalho pesado
    <div className="flex flex-col h-screen bg-gray-800 text-white">
      <header className="bg-gray-900 p-4 border-b border-gray-700 shadow-lg">
        <h1 className="text-2xl font-bold text-center">Mentor de Posto (Simulador)</h1>
        <p className="text-center text-blue-400">Treinando: {operator.nome_completo} (ID: {operator.id})</p>
      </header>

      {/* Área do Chat */}
      <div className="flex-1 overflow-auto p-6 space-y-4">
        {chatLog.map((chat, idx) => (
          <div 
            key={idx} 
            className={`flex ${chat.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`p-4 rounded-lg max-w-[80%] shadow-md ${
              chat.role === 'user' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-700 text-gray-200' // Fundo cinza escuro, texto claro
            }`}>
              <span className="font-bold capitalize text-xs block mb-1">
                {chat.role === 'user' ? operator.nome_completo.split(' ')[0] : 'Mentor IA'}
              </span>
              <p className="text-sm">{chat.text}</p>
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input do Chat */}
      <footer className="p-4 bg-gray-900 border-t border-gray-700">
        <form onSubmit={handleSubmitMessage} className="flex gap-4">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)} 
            placeholder={isSending ? "Mentor está pensando..." : "Digite sua resposta..."}
            disabled={isSending}
            className="flex-1 p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={isSending || !newMessage.trim()}
            className="p-3 bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors"
          >
            {isSending ? <Loader2 className="w-6 h-6 animate-spin" /> : <Send className="w-6 h-6" />}
          </button>
        </form>
      </footer>
    </div>
  )
}