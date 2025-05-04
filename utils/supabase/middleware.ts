import { createServerClient } from "@supabase/ssr"; // Função para criar cliente Supabase em SSR
import { NextResponse, type NextRequest } from "next/server"; // Utilitários do Next.js para manipulação de respostas e requisições no middleware

/**
 * Middleware para atualizar a sessão do usuário a cada requisição.
 * Sincroniza cookies do Supabase e protege rotas não públicas redirecionando usuários não autenticados.
 *
 * @param request Objeto NextRequest representando a requisição
 * @returns NextResponse com cookies atualizados ou redirecionamento para login
 */
export const updateSession = async (request: NextRequest) => {
  // Inicializa resposta padrão, preservando o objeto request
  let supabaseResponse = NextResponse.next({ request });

  // Cria instância do cliente Supabase usando cookies da requisição
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,           // URL do Supabase via variáveis de ambiente
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,      // Chave anônima do Supabase via variáveis de ambiente
    {
      cookies: {
        // Recupera todos os cookies atuais da requisição
        getAll() {
          return request.cookies.getAll();
        },
        // Define cookies retornados pelo Supabase na resposta e no objeto request
        setAll(cookies) {
          // Atualiza cookies no objeto request (NextRequest)
          cookies.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          // Prepara nova resposta para incluir cookies no cliente
          supabaseResponse = NextResponse.next({ request });
          // Define os cookies na resposta que será enviada ao navegador
          cookies.forEach(({ name, value, options }) => {
            supabaseResponse.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  // Obtém usuário autenticado a partir do Supabase
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Se não houver usuário autenticado e a rota não for pública, redireciona para /login
  if (
    !user &&
    !request.nextUrl.pathname.startsWith('/login') &&
    !request.nextUrl.pathname.startsWith('/register') &&
    !request.nextUrl.pathname.startsWith('/auth')
  ) {
    // Clona a URL atual e altera pathname para /login
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // Retorna a resposta com sessão e cookies atualizados
  return supabaseResponse;
};
