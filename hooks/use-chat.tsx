'use client'; // Directive Next.js para indicar que este módulo roda no cliente

import { ChatMessage } from "@/types/chat-message"; // Tipo de mensagem de chat
import { createClient } from "@/utils/supabase/client"; // Função para criar cliente Supabase no navegador
import { useCallback, useEffect, useState } from "react"; // Hooks do React

// Interface para as props do hook: nome da sala e nome do usuário
interface UseChatProps {
  roomName: string;
  username: string;
}

const EVENT_MESSAGE_TYPE = 'message'; // Tipo de evento de mensagem para broadcast via canal Supabase

/**
 * Hook customizado para gerenciar comunicação em tempo real via Supabase Realtime.
 * @param roomName Nome do canal/sala de chat
 * @param username Nome do usuário que envia as mensagens
 * @returns Objetos e funções: `messages`, `sendMessage` e `isConnected`
 */
export function useChat({ roomName, username }: UseChatProps) {
  // Cria cliente Supabase no browser
  const supabase = createClient();

  // Estado para armazenar lista de mensagens
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  // Estado para guardar instância de canal Supabase
  const [channel, setChannel] = useState<ReturnType<typeof supabase.channel> | null>(null);
  // Estado para indicar se a conexão ao canal foi estabelecida
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Cria um novo canal com o nome da sala
    const newChannel = supabase.channel(roomName);

    // Define listener para eventos do tipo 'broadcast' com payload de mensagens
    newChannel.on('broadcast', { event: EVENT_MESSAGE_TYPE }, (payload) => {
      // Adiciona nova mensagem ao estado
      setMessages((current) => [...current, payload.payload as ChatMessage]);
    })
    // Inicia a inscrição no canal
    .subscribe(async () => {
      // Quando inscrito com sucesso, marca como conectado
      setIsConnected(true);
    });

    // Armazena referência do canal no estado
    setChannel(newChannel);

    // Cleanup: remove o canal quando o componente desmontar ou dependencies mudarem
    return () => {
      supabase.removeChannel(newChannel);
    };
  }, [roomName, username, supabase]); // Re-executa quando o nome da sala, usuário ou cliente mudarem

  /**
   * Função para enviar mensagem ao canal.
   * Adiciona localmente e envia via broadcast.
   */
  const sendMessage = useCallback(
    async (content: string) => {
      if (!channel || !isConnected) return; // Se não está pronto, não envia

      // Cria objeto de mensagem
      const message: ChatMessage = {
        id: crypto.randomUUID(), // Gera ID único
        content,
        user: { name: username },
        createdAt: new Date().toISOString(),
      };

      // Atualiza estado local antes de enviar
      setMessages((current) => [...current, message]);

      // Envia mensagem via canal Supabase
      await channel.send({
        type: 'broadcast',
        event: EVENT_MESSAGE_TYPE,
        payload: message,
      });
    },
    [channel, isConnected, username]
  );

  // Retorna lista de mensagens, função de envio e status de conexão
  return { messages, sendMessage, isConnected };
}
