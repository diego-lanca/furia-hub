'use client'

import { useChat } from "@/hooks/use-chat";
import { useChatScroll } from "@/hooks/use-chat-scroll";
import { ChatMessage } from "@/types/chat-message";
import { cn } from "@/utils/cn";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ChatMessageItem } from "./chat-message";

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

    const {
        messages: realtimeMessages,
        sendMessage,
        isConnected,
    } = useChat({
        roomName,
        username
    });
    const [ newMessage, setNewMessage ] = useState('');

    const allMessages = useMemo(() => {
        const mergedMessages = [...initialMessages, ...realtimeMessages];

        const uniqueMessages = mergedMessages.filter(
            (message, index, self) => index === self.findIndex((m) => m.id === message.id)
        );

        const sortedMessages = uniqueMessages.sort((a,b) => a.createdAt.localeCompare(b.createdAt));

        return sortedMessages;
    }, [ initialMessages, realtimeMessages ]);

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
        <div className="flex flex-col h-full w-full bg-background text-foreground antialiased">
          {/* Messages */}
          <div ref={containerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
            {allMessages.length === 0 ? (
              <div className="text-center text-sm text-muted-foreground">
                No messages yet. Start the conversation!
              </div>
            ) : null}
            <div className="space-y-1">
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
    
          <form onSubmit={handleSendMessage} className="flex w-full gap-2 border-t border-border p-4">
            <input
              className={cn(
                'rounded-full bg-background text-sm transition-all duration-300',
                isConnected && newMessage.trim() ? 'w-[calc(100%-36px)]' : 'w-full'
              )}
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              disabled={!isConnected}
            />
            {isConnected && newMessage.trim() && (
              <button
                className="aspect-square rounded-full animate-in fade-in slide-in-from-right-4 duration-300"
                type="submit"
                disabled={!isConnected}
              >
                {/* <Send className="size-4" /> */}
              </button>
            )}
          </form>
        </div>
      );
}