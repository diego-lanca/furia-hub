import Image from "next/image"; // Componente otimizado de imagem do Next.js
import Link from "next/link"; // Componente de link do Next.js para navegação interna
import { login } from "./actions"; // Função de ação para login de usuário

/**
 * Página de login de usuários existentes.
 * Exibe formulário para email e senha, com ações de envio para autenticação.
 */
export default function LoginPage() {
  return (
    // Container centralizado com fundo escuro
    <div className="flex items-center justify-center w-screen h-screen bg-[#111827]">
      {/* Formulário de login */}
      <form
        className="flex flex-col items-center justify-center gap-4 bg-[#1F2937] rounded-2xl p-4 w-5/7 md:w-2/7 lg:3/7 h-3/7"
      >
        {/* Cabeçalho: logo e título */}
        <div className="flex gap-4 items-center">
          <Image
            src={'/furia_logo.png'}      // Caminho para o logo
            alt="Furia Logo"             // Texto alternativo para acessibilidade
            width={80}                    // Largura do logo
            height={80}                   // Altura do logo
          />
          <h1 className="text-white text-2xl font-bold">Furia Hub</h1>
        </div>

        {/* Campo de email */}
        <div className="flex flex-col w-full gap-1">
          <label htmlFor="email" className="text-white pl-1">
            Email:
          </label>
          <input
            placeholder="Digite seu e-mail"
            id="email"
            name="email"
            type="email"
            required
            className="border-white border-1 rounded-lg p-1 bg-[#374151] text-white"
          />
        </div>

        {/* Campo de senha */}
        <div className="flex flex-col w-full gap-1">
          <label htmlFor="password" className="text-white pl-1">
            Senha:
          </label>
          <input
            placeholder="Digite sua senha"
            id="password"
            name="password"
            type="password"
            required
            className="border-white border-1 rounded-lg p-1 bg-[#374151] text-white"
          />
        </div>

        {/* Botão de submit usando formAction para ações do Next.js */}
        <button
          formAction={login}               // Define ação a ser disparada no servidor
          className="cursor-pointer w-full bg-[#4B5563] rounded-lg text-white h-10"
        >
          Entrar
        </button>

        {/* Link para página de registro */}
        <h2 className="text-white font-normal">
          Não tem uma conta?{' '}
          <Link href={'/register'}>
            <b>Cadastre-se</b>
          </Link>
        </h2>
      </form>
    </div>
  );
}
