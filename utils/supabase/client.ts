'use client'; // Directive Next.js para indicar que este módulo roda no cliente

import { createBrowserClient } from "@supabase/ssr"; // Função para criar cliente Supabase no navegador

/**
 * Cria e retorna o cliente Supabase no ambiente de browser (client-side).
 * Utiliza as variáveis de ambiente definidas em NEXT_PUBLIC para conexão.
 *
 * @returns Instância do cliente Supabase configurada para chamadas no navegador
 */
export const createClient = () => {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,      // URL pública do Supabase
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!  // Chave anônima pública do Supabase
  );
};
