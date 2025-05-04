

// hooks/send-ai-message.ts
interface AiMessageOptions {
  personality?: string;
  username?: string;
  context?: string;
  maxLength?: number;
}

/**
 * Envia uma mensagem para a API de IA e retorna a resposta
 * @param message Mensagem ou comando para enviar à IA
 * @param options Opções para personalizar o comportamento da IA
 * @returns Resposta da IA formatada
 */
export async function sendAiMessageRequest(
  message: string,
  options: AiMessageOptions = {}
): Promise<string> {
  const {
    context = 'chat sobre eSports',
  } = options;

  const random = (Math.random() * 100) % 5;
  let personality: string = 'normal';

  switch (random) {
    case 0:
      personality = 'fanático'
      break;
    case 1:
      personality = 'analítico'
      break;
    case 2:
      personality = 'engraçado'
      break;
    case 3:
      personality = 'otimista'
      break;
    case 4:
      personality = 'crítico'
      break;
    default:
      personality = 'analítico'
      break;
  }

  try {
    // Cria um prompt personalizado baseado nos parâmetros
    const fullPrompt = `
        Analise a pergunta do usuário, e dependendo responda como um fã de eSports com personalidade "${personality}" em um ${context}, ou responda a pergunta dele no geral.
        
        ${personality === 'fanático' ? 'Use muitas expressões de torcedor apaixonado e sempre defenda o time com unhas e dentes.' : ''}
        ${personality === 'analítico' ? 'Apresente fatos e dados sobre jogos e jogadores, analise estratégias.' : ''}
        ${personality === 'engraçado' ? 'Use humor e piadas relacionadas a games e eSports.' : ''}
        ${personality === 'otimista' ? 'Veja sempre o lado positivo e acredite na vitória mesmo em situações difíceis.' : ''}
        ${personality === 'crítico' ? 'Seja o hater do fórum. Aquele que só está la pra criticar e xingar.' : ''}
        
        Mantenha sua resposta curta.
        Não use emojis excessivos, no máximo 3 por mensagem.
        Não seja repetitivo em relação a mensagem que for responder, se quiser pode começar outro assunto caso não tenha oq responder.
        Use zoeiras e xingamentos leves dos torcedores de Counter Strike.
        Use os jogadores recentes do elenco da Fúria: yuurih, KSCERATO, FalleN, molodoy, YEKINDAR.
      `;

    // Envia para a API (substituir pela sua API real)
    const response = await fetch('/api/ai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: message, prompt: fullPrompt }),
    });

    if (!response.ok) {
      throw new Error('Falha ao obter resposta da IA');
    }

    const data = await response.json();
    return data.reply || 'Desculpe, não consegui processar sua mensagem.';
  } catch (error) {
    console.error('Erro ao enviar mensagem para IA:', error);
    return 'Estou com problemas técnicos no momento. Tente novamente mais tarde.';
  }
}