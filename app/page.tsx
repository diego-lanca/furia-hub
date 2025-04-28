import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if ( error || !data?.user ) {
    redirect('/login');
  }

  return (
    <div>
      Hello World!
      Você está autenticado, seja bem-vindo 
    </div>
  );
}
