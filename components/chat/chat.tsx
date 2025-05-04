'use client'

import { useChat } from "@/hooks/use-chat";
import { useChatScroll } from "@/hooks/use-chat-scroll";
import { ChatMessage } from "@/types/chat-message";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChatMessageItem } from "./chat-message";
import { sendAiMessageRequest } from "@/hooks/send-ai-message";

interface ChatProps {
  roomName: string,
  username: string,
  onMessage?: (messages: ChatMessage[]) => void,
  messages?: ChatMessage[]
}

export default function Chat({
  roomName,
  username,
  onMessage,
  messages: initialMessages = []
}: ChatProps) {

  const { containerRef, scrollToBottom } = useChatScroll();

  const lastMessageRef = useRef<ChatMessage | null>(null);
  const lastProcessedMessageRef = useRef<string | null>(null);

  const {
    messages: realtimeMessages,
    sendMessage,
    isConnected,
  } = useChat({
    roomName,
    username
  });

  const {
    messages: realtimeAiMessages,
    sendMessage: sendAiMessage,
    isConnected: isAiConnected
  } = useChat({
    roomName,
    username: 'Furia AI Fan'
  });

  const [newMessage, setNewMessage] = useState('');

  const allMessages = useMemo(() => {
    const mergedMessages = [...initialMessages, ...realtimeMessages, ...realtimeAiMessages];

    const uniqueMessages = mergedMessages.filter(
      (message, index, self) => index === self.findIndex((m) => m.id === message.id)
    );

    const sortedMessages = uniqueMessages.sort((a, b) => a.createdAt.localeCompare(b.createdAt));

    return sortedMessages;
  }, [initialMessages, realtimeMessages, realtimeAiMessages]);

  useEffect(() => {
    if (allMessages.length > 0) {
      lastMessageRef.current = allMessages[allMessages.length - 1];
    }
  }, [allMessages]);

  // Responder apenas quando uma nova mensagem do usuário for detectada
  useEffect(() => {
    const processNewUserMessage = async () => {
      if (!isAiConnected) return;
      
      // Obter a última mensagem
      if (allMessages.length === 0) return;
      const lastMessage = allMessages[allMessages.length - 1];
      
      // Verificar se é uma mensagem do usuário e não do AI
      if (lastMessage.user.name !== 'Furia AI Fan') {
        // Verificar se essa mensagem já foi processada
        if (lastMessage.id !== lastProcessedMessageRef.current) {
          // Atualizar referência para evitar processamento duplicado
          lastProcessedMessageRef.current = lastMessage.id;
          
          // Enviar resposta da IA
          const aiResponse = await sendAiMessageRequest(lastMessage.content);
          sendAiMessage(aiResponse);
        }
      }
    };

    processNewUserMessage();
  }, [allMessages, sendAiMessage, isAiConnected]);

  useEffect(() => {
    if (onMessage)
      onMessage(allMessages);
  }, [allMessages, onMessage])

  useEffect(() => {
    scrollToBottom();
  }, [allMessages, scrollToBottom])

  const handleSendMessage = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!newMessage.trim() || !isConnected) return;

      sendMessage(newMessage);
      setNewMessage('');
    },
    [newMessage, isConnected, sendMessage]
  );

  return (
    <div className="flex flex-col h-full w-full bg-gray-900 text-white antialiased overflow-hidden">
      {/* Messages - Scroll container */}
      <div ref={containerRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-900 to-gray-800 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-800">
        {allMessages.length === 0 ? (
          <div className="flex justify-center items-center h-full">
            <div className="text-center p-6 bg-gray-800 rounded-lg border border-gray-700 shadow-lg">
              <div className="text-gray-500 font-bold text-lg mb-2">Furia Chat</div>
              <div className="text-gray-400">
                Nenhuma mensagem ainda. Inicie a conversa!
              </div>
            </div>
          </div>
        ) : null}
        <div className="space-y-3">
          {allMessages.map((message, index) => {
            const prevMessage = index > 0 ? allMessages[index - 1] : null
            const showHeader = !prevMessage || prevMessage.user.name !== message.user.name

            return (
              <div
                key={message.id}
                className="animate-in fade-in slide-in-from-bottom-4 duration-300"
              >
                <ChatMessageItem
                  message={message}
                  isOwnMessage={message.user.name === username}
                  showHeader={showHeader}
                />
              </div>
            )
          })}
        </div>
      </div>

      <form onSubmit={handleSendMessage} className="flex w-full gap-2 border-t border-gray-800 p-4 bg-gray-900 flex-shrink-0">
        <input
          className="flex-1 px-4 py-2 bg-gray-800 text-white rounded-l-lg focus:outline-none focus:ring-2 focus:ring-gray-500 border border-gray-700"
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Digite sua mensagem..."
          disabled={!isConnected}
        />
        <button
          className={`px-4 py-2 rounded-r-lg font-medium transition-colors ${isConnected && newMessage.trim()
            ? 'bg-gray-500 hover:bg-gray-600 text-black'
            : 'bg-gray-700 text-gray-400 cursor-not-allowed'
            }`}
          type="submit"
          disabled={!isConnected || !newMessage.trim()}
        >
          Enviar
        </button>
      </form>
    </div>
  );
}