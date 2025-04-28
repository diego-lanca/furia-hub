'use server'

import { createClient } from "@/utils/supabase/server"

export const login = async (formData: FormData) => {
    const supabase = await createClient();
    //TODO - Terminar ações e sessão de login
    // https://supabase.com/docs/guides/auth/server-side/nextjs

}