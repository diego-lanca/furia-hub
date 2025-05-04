import { createClient } from "@/utils/supabase/server"; // Importa função para criar cliente Supabase no servidor
import { redirect } from "next/navigation"; // Importa utilitário de redirecionamento do Next.js
import Link from "next/link"; // Importa componente de link do Next.js para navegação interna
import { Users } from "lucide-react"; // Importa ícone de usuários da biblioteca lucide-react

/**
 * Componente de página inicial (Home) protegido por autenticação.
 * Se o usuário não estiver autenticado, redireciona para a página de login.
 */
export default async function Home() {
  // Cria instância do cliente Supabase no ambiente de servidor
  const supabase = await createClient();

  // Tenta obter o usuário autenticado
  const { data, error } = await supabase.auth.getUser();
  // Se ocorrer erro ou não houver usuário, redireciona para /login
  if (error || !data?.user) {
    redirect('/login');
  }

  // Se o usuário estiver autenticado, renderiza a interface
  return (
    <div className="h-screen w-full bg-[#111827] justify-center flex">
      {/* Container centralizado vertical e horizontalmente */}
      <div className="container flex flex-col items-center justify-center gap-6">
        <div className="text-center">
          {/* Títulos de boas-vindas */}
          <h1 className="text-white text-4xl">Seja bem-vindo ao Furia Hub!</h1>
          <h2 className="text-white">
            Sua plataforma para conectar-se com outros jogadores e acompanhar eventos de e-sports!
          </h2>
        </div>
        {/* Link para a página de chat/comunidade */}
        <Link href={'/chat'}>
          <div className="w-52 h-52 bg-[#1F2937] rounded-lg text-white text-center flex flex-col items-center justify-center">
            {/* Ícone de usuários */}
            <Users size={76} />
            {/* Título e descrição da ação */}
            <h1 className="font-bold text-2xl">Comunidade</h1>
            <h2 className="text-sm">Conecte-se com outros jogadores</h2>
          </div>
        </Link>
      </div>
    </div>
  );
}
