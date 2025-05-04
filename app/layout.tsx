import type { Metadata } from "next"; // Importa tipo Metadata para configurar metadados da página
import { Inter } from "next/font/google"; // Importa fonte Inter do Google Fonts via Next.js
import "./globals.css"; // Importa estilos globais
import Navbar from "@/components/navbar/navbar"; // Importa componente de barra de navegação
import { createClient } from "@/utils/supabase/server"; // Importa função para criar cliente Supabase no servidor

// Configuração da fonte Inter como variável CSS personalizada
const inter = Inter({
  variable: "--inter",
  subsets: ["latin"],
});

// Metadados da aplicação (utilizados no <head> pelo Next.js)
export const metadata: Metadata = {
  title: "Furia Hub",
  description: "Projeto para processo seletivo da Furia Tech!",
};

/**
 * Layout raiz da aplicação Next.js.
 * Envolve todas as páginas, aplica estilos globais e checa autenticação.
 * Exibe Navbar quando usuário autenticado.
 *
 * @param children Conteúdo da página filha a ser renderizada dentro do layout
 */
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Cria instância do cliente Supabase no servidor
  const supabase = await createClient();
  // Verifica se há erro ao buscar o usuário autenticado
  const { error } = await supabase.auth.getUser();
  // Define flag de autenticação baseado na ausência de erro
  const isAuthenticated = !error;

  return (
    <html lang="pt-br">
      <body
        className={`${inter.className} antialiased`} // Aplica fonte e suavização de fontes
      >
        {/* Renderiza Navbar somente se usuário autenticado */}
        {isAuthenticated && <Navbar />}
        {/* Renderiza o conteúdo da página */}
        {children}
      </body>
    </html>
  );
}
