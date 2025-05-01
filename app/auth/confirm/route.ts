import { type EmailOtpType } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const GET = async (request: NextRequest) => {
    const { searchParams } = new URL(request.url);
    const token_hash = searchParams.get('token_hash');
    const type = searchParams.get('type') as EmailOtpType | null;
    const next = searchParams.get('next') ?? '/';

    const redirectTo = request.nextUrl.clone();
    redirectTo.pathname = next;
    redirectTo.searchParams.delete('token_hash');
    redirectTo.searchParams.delete('type');

    if (token_hash && type) {
        const supabase = await createClient();
    
        const { error } = await supabase.auth.verifyOtp({
            type,
            token_hash
        });

        if (!error) {
            // Redireciona o usuário para a url especificada ou para o root do projeto
            redirectTo.searchParams.delete('next')
            redirect(next);
        }
    }

    redirectTo.pathname = '/error'
    return NextResponse.redirect(redirectTo);
}