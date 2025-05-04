import { type EmailOtpType } from "@supabase/supabase-js"; // Tipo OTP de e-mail do Supabase
import { NextResponse, type NextRequest } from "next/server"; // Utilitários de resposta e requisição do Next.js

import { createClient } from "@/utils/supabase/server"; // Função para criar cliente Supabase no servidor
import { redirect } from "next/navigation"; // Função de redirecionamento do Next.js

/**
 * Handler GET para verificar token de autenticação via OTP de e-mail.
 * - Lê parâmetros `token_hash`, `type` (EmailOtpType) e `next` da query string.
 * - Tenta verificar o OTP no Supabase.
 * - Se válido, redireciona para a rota `next` (ou root).
 * - Caso contrário, redireciona para `/error`.
 *
 * @param request Objeto NextRequest contendo URL e cookies
 * @returns NextResponse de redirecionamento
 */
export const GET = async (request: NextRequest) => {
    // Extrai parâmetros da URL
    const { searchParams } = new URL(request.url);
    const token_hash = searchParams.get('token_hash'); // Hash do token enviado por e-mail
    const type = searchParams.get('type') as EmailOtpType | null; // Tipo de OTP (magic link ou código)
    const next = searchParams.get('next') ?? '/'; // Rota de destino após verificação

    // Clona a URL atual para construir redirecionamento
    const redirectTo = request.nextUrl.clone();
    redirectTo.pathname = next;
    // Remove parâmetros sensíveis da URL de redirecionamento
    redirectTo.searchParams.delete('token_hash');
    redirectTo.searchParams.delete('type');

    // Se houver token e tipo, tenta verificar via Supabase
    if (token_hash && type) {
        const supabase = await createClient();
    
        const { error } = await supabase.auth.verifyOtp({
            type,
            token_hash,
        });

        if (!error) {
            // Se verificação bem-sucedida, remove parâmetro next e redireciona
            redirectTo.searchParams.delete('next');
            redirect(next);
        }
    }

    // Se não validou, redireciona para tela de erro
    redirectTo.pathname = '/error';
    return NextResponse.redirect(redirectTo);
};
