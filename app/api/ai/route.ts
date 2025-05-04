import { NextRequest, NextResponse } from "next/server"; // Utilitários do Next.js para lidar com requisições e respostas no App Router
import Groq from "groq-sdk"; // SDK oficial Groq para interagir com seus modelos de linguagem

// Instancia cliente Groq com chave de API definida em variável de ambiente
const groq = new Groq({
  apiKey: process.env.NEXT_PUBLIC_GROQ_KEY,
});

/**
 * Handler POST para endpoint de chat com modelo Gemma-2.
 * Recebe JSON com `message` (texto do usuário) e `prompt` (instruções de sistema),
 * invoca Groq para gerar resposta e retorna JSON com `reply`.
 *
 * @param req Objeto NextRequest contendo corpo da requisição
 * @returns NextResponse com JSON de `reply` ou erro
 */
export async function POST(req: NextRequest) {
  try {
    // Extrai `message` e `prompt` do corpo da requisição
    const { message, prompt } = await req.json();

    // Valida presença de mensagem do usuário
    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    // Chama a API de completion do Groq com o modelo e mensagens de contexto
    const completion = await groq.chat.completions.create({
      model: "gemma2-9b-it",
      messages: [
        { role: "system", content: prompt },
        { role: "user", content: message },
      ],
    });

    // Extrai conteúdo da primeira escolha de resposta
    const reply = completion.choices[0].message.content;

    // Retorna resposta em JSON
    return NextResponse.json({ reply });
  } catch (e) {
    console.error('Ai error:', e); // Loga erro para debugging
    // Retorna erro genérico em caso de falha
    return NextResponse.json(
      { error: "Failed to process message" },
      { status: 500 }
    );
  }
}