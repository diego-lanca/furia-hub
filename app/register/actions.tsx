'use server'

import { createClient } from "@/utils/supabase/server"

export const signUp = async (formData: FormData) => {
    const supabase = await createClient();

    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
        confirmPassword: formData.get('confirm-password') as string
    };

    if ( data.password !== data.confirmPassword ) {
        return { error: 'As senhas devem ser iguais.' };
    }

    // const { exists } = await supabase.auth;

    const { error } = await supabase.auth.signUp(data);

    if (error) {
        return { error: error.message };
    }
}