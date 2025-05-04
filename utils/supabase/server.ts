'use server'; // Directive Next.js para indicar que este módulo roda no servidor

import { createServerClient } from "@supabase/ssr"; // Função para criar cliente Supabase em contexto SSR (Server-Side Rendering)
import { cookies } from "next/headers"; // Utilitário Next.js para manipulação de cookies no contexto de requisição

/**
 * Cria cliente Supabase configurado para SSR, integrando armazenamento de sessões via cookies.
 *
 * @returns Instância do cliente Supabase autenticada (ou não) conforme cookies de sessão.
 */
export const createClient = async () => {
    // Obtém coleção de cookies da requisição atual
    const cookieStorage = await cookies();

    // Cria e retorna o cliente Supabase, passando URL, chave e adaptadores de cookies
    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,           // URL da instância Supabase definida em variáveis de ambiente
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,      // Chave anônima Supabase definida em variáveis de ambiente
        {
            cookies: {
                // Recupera todos os cookies atuais para incluir nas requisições Supabase
                getAll() {
                    return cookieStorage.getAll();
                },
                // Salva todos os cookies retornados pelas respostas Supabase no armazenamento
                setAll(cookies) {
                    try {
                        cookies.forEach(({ name, value, options }) => {
                            cookieStorage.set(name, value, options);
                        });
                    } catch {
                        // Falha silenciosa ao definir cookies (pode ser aprimorada com log)
                    }
                }
            }
        }
    );
};
