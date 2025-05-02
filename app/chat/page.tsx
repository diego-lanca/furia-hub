import Chat from "@/components/chat/chat";
import { createClient } from "@/utils/supabase/server";

export default async function ChatPage() {
    const supabase = await createClient();

    const { data: { user }, error } = await supabase.auth.getUser();

    if (error) return <div> Erro ao recuperar usuário! </div>
    
    return (
        <div>
            <Chat roomName="Furia Hub" username={user?.email ?? "Usuário Anônimo"}></Chat>
        </div>
    );
}