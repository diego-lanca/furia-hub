'use server'

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const createClient = async () => {
    const cookieStorage = await cookies();

    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return cookieStorage.getAll();
                },
                setAll(cookies) {
                    try {
                        cookies.forEach(({name, value, options}) => {
                            cookieStorage.set(name, value, options);
                        })
                    } catch {
                        
                    }
                }
            }
        }
    );
}