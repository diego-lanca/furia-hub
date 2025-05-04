'use client'; // Directive Next.js para indicar que este módulo roda no cliente

import Image from "next/image"; // Componente otimizado de imagem do Next.js
import { goToChat, goToHome, logout } from "./actions"; // Funções de ação para navegação e logout
import { Home, UserCircle2, Users } from "lucide-react"; // Ícones da biblioteca lucide-react

/**
 * Componente de barra de navegação (Navbar) exibido quando usuário autenticado.
 * Contém logo, botões de navegação e ação de logout.
 */
export default function Navbar() {
  return (
    // Container principal da navbar com layout flexbox e estilos Tailwind
    <nav className="flex items-center justify-between p-2 px-8 bg-gray-800 text-white">
      {/* Logo e título da aplicação */}
      <div className="flex gap-2">
        <Image
          src={'/furia_logo.png'}         // Caminho para o logo da Furia
          alt="Furia Logo on Navbar"      // Texto alternativo para acessibilidade
          width={24}                       // Largura em pixels
          height={24}                      // Altura em pixels
        />
        <h1 className="font-bold">Furia Hub</h1>
      </div>

      {/* Botões de navegação para Início e Chat */}
      <div className="flex gap-4">
        <button
          onClick={goToHome}              // Ao clicar, aciona função para navegar ao início
          className="cursor-pointer flex items-center justify-center gap-1"
        >
          <Home size={22} />              {/*Ícone de casa */}
          <p>Início</p>                   {/*Label do botão */}
        </button>
        <button
          onClick={goToChat}              // Ao clicar, aciona função para navegar ao chat
          className="cursor-pointer flex items-center justify-center gap-1"
        >
          <Users size={22} />             {/*Ícone de usuários (chat)*/}
          <p>Chat</p>                     {/*Label do botão */}
        </button>
      </div>

      {/* Ação de logout com ícone e texto */}
      <div
        className="flex gap-2 cursor-pointer"
        onClick={logout}                  // Ao clicar, faz logout do usuário
      >
        <UserCircle2 />                   {/*Ícone de perfil */}
        <p>Sair</p>                       {/*Label de logout */}
      </div>
    </nav>
  );
}
