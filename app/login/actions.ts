'use server'

import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const login = async (formData: FormData) => {
    const supabase = await createClient();
    
    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string
    };

    const { error } = await supabase.auth.signInWithPassword(data);

    if (error) {
        redirect('/error');
    }

    revalidatePath('/', 'layout')
    redirect('/');
}