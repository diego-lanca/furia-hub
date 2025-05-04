import Chat from "@/components/chat/chat"; // Componente de chat principal
import { createClient } from "@/utils/supabase/server"; // Função para criar cliente Supabase no servidor

/**
 * Página de chat protegida que exibe o componente Chat para usuários autenticados.
 * Realiza verificação de autenticação e tratamento de erro antes de renderizar.
 */
export default async function ChatPage() {
  // Cria cliente Supabase no servidor para SSR/SSR
  const supabase = await createClient();

  // Obtém o usuário autenticado a partir do Supabase
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  // Se ocorrer erro ao obter usuário, exibe mensagem de erro com opção de recarregar
  if (error) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gray-900 text-white">
        {/* Container de erro centralizado */}
        <div className="bg-gray-800 p-8 rounded-lg border border-gray-500 shadow-lg text-center">
          <div className="text-gray- text-xl font-bold mb-4">
            Erro de Autenticação
          </div>
          <p className="text-gray-300">
            Erro ao recuperar informações do usuário.
          </p>
          <button
            className="mt-4 px-4 py-2 bg-gray-500 text-black font-medium rounded-lg hover:bg-gray-600 transition-colors"
            onClick={() => window.location.reload()} // Recarrega a página ao clicar
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  // Se autenticado, renderiza layout da página e componente Chat
  return (
    <div className="h-screen w-full flex flex-col bg-gray-900 overflow-hidden">
      {/* Container principal com padding e centralização */}
      <div className="flex-1 container mx-auto p-4 md:py-6 overflow-hidden">
        <div className="bg-gray-900 rounded-lg shadow-xl border border-gray-800 overflow-hidden h-full flex flex-col">
          {/* Componente Chat recebe nome da sala e nome de usuário */}
          <Chat
            roomName="Furia Community"
            username={user?.email ?? "Usuário Anônimo"} // Usa email ou fallback
          />
        </div>
      </div>
    </div>
  );
}
