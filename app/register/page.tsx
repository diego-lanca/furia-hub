'use client'; // Directive Next.js para indicar que este módulo roda no cliente

import Image from "next/image"; // Componente de imagem otimizado do Next.js
import Link from "next/link"; // Componente de link do Next.js para navegação interna
import { signUp } from "./actions"; // Função de ação para cadastro de usuário
import { useState } from "react"; // Hook de estado do React

/**
 * Página de registro de novos usuários.
 * Exibe formulário para cadastro via email e senha, com feedback de erro ou sucesso.
 */
export default function RegisterPage() {
  // Estado para mensagens de erro e sucesso
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  /**
   * Handler para submissão do formulário de cadastro.
   * Prevent default, obtém dados do form e chama a ação signUp.
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Evita reload da página

    const formData = new FormData(e.currentTarget); // Coleta dados do formulário
    const result = await signUp(formData); // Chama função de cadastro no servidor/backend

    if (result?.error) {
      setError(result.error); // Exibe mensagem de erro retornada
    } else {
      // Exibe mensagem de sucesso para confirmação de email
      setMessage(
        'Cadastro realizado com sucesso! Acesse seu e-mail para realizar a confirmação.'
      );
    }
  };

  return (
    // Container centralizado com background escuro
    <div className="flex items-center justify-center w-screen h-screen bg-[#111827]">
      {/* Formulário de cadastro */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center gap-4 bg-[#1F2937] rounded-2xl p-4 w-5/7 md:w-2/7 lg:3/7 h-4/7"
      >
        {/* Cabeçalho com logo e título */}
        <div className="flex gap-4 items-center">
          <Image
            src={'/furia_logo.png'}
            alt="Furia Logo"
            width={80}
            height={80}
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

        {/* Campo de confirmação de senha */}
        <div className="flex flex-col w-full gap-1">
          <label htmlFor="confirm-password" className="text-white pl-1">
            Confirmação de senha:
          </label>
          <input
            placeholder="Confirme sua senha"
            id="confirm-password"
            name="confirm-password"
            type="password"
            required
            className="border-white border-1 rounded-lg p-1 bg-[#374151] text-white"
          />
        </div>

        {/* Feedback de erro ou sucesso */}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {message && <p style={{ color: 'green' }}>{message}</p>}

        {/* Botão de submissão */}
        <button className="cursor-pointer w-full bg-[#4B5563] rounded-lg text-white h-10">
          Cadastrar-se
        </button>

        {/* Link para página de login */}
        <h2 className="text-white font-normal">
          Já possui uma conta?{' '}
          <Link href={'/login'}>
            <b>Entre</b>
          </Link>
        </h2>
      </form>
    </div>
  );
}
