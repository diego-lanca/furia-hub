import { ChatMessage } from "@/types/chat-message"; // Tipo de mensagem de chat com estrutura definida

// Props esperadas pelo componente: dados da mensagem, flag se é própria e se exibe cabeçalho
interface ChatMessageItemProps {
  message: ChatMessage;
  isOwnMessage: boolean;
  showHeader: boolean;
}

/**
 * Componente que renderiza uma única mensagem no chat.
 * - Alinha à direita se for mensagem do usuário, à esquerda caso contrário.
 * - Aplica estilos diferentes para mensagens do usuário, do AI Fan ou de outros.
 * - Exibe cabeçalho com avatar, nome e hora quando `showHeader` é true.
 */
export const ChatMessageItem = ({
  message,
  isOwnMessage,
  showHeader,
}: ChatMessageItemProps) => {
  // Verifica se a mensagem veio do "Furia AI Fan"
  const isAiFan = message.user.name === 'Furia AI Fan';

  return (
    // Container flexível para alinhamento horizontal
    <div className={`flex mt-2 ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
      {/* Balão de mensagem com estilização condicional */}
      <div
        className={`max-w-[85%] rounded-lg shadow-md ${
          isOwnMessage
            ? 'bg-green-300 text-black'                  // Mensagem própria
            : isAiFan
              ? 'bg-gray-700 border-l-4 border-blue-500 text-white' // Mensagem do AI Fan
              : 'bg-gray-800 text-white'                 // Mensagem de outros usuários
        }`}
      >
        {/* Cabeçalho opcional com avatar, nome e timestamp */}
        {showHeader && (
          <div
            className={`flex items-center space-x-2 px-4 py-2 border-b ${
              isOwnMessage
                ? 'border-green-400'                       // Borda verde para usuário
                : isAiFan
                  ? 'border-gray-600'                       // Borda cinza para AI Fan
                  : 'border-gray-700'                       // Borda escura para outros
            }`}
          >
            {/* Avatar placeholder com inicial do nome */}
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
              isOwnMessage
                ? 'bg-black text-green-500'
                : isAiFan
                  ? 'bg-blue-500 text-black'
                  : 'bg-gray-600 text-white'
            }`}>
              {message.user.name.charAt(0).toUpperCase()}
            </div>

            {/* Nome de quem enviou a mensagem */}
            <span className={`font-medium text-sm ${
              isOwnMessage ? 'text-black' : isAiFan ? 'text-blue-400' : 'text-white'
            }`}>  
              {message.user.name}
            </span>

            {/* Horário de criação formatado em PT-BR */}
            <span className={`text-xs ml-auto ${
              isOwnMessage ? 'text-black/70' : 'text-gray-400'
            }`}>
              {new Date(message.createdAt).toLocaleTimeString('pt-BR', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
              })}
            </span>
          </div>
        )}

        {/* Conteúdo da mensagem */}
        <div
          className={`px-4 py-3 break-words ${
            isOwnMessage ? 'text-black' : 'text-white'
          }`}
        >
          {message.content}
        </div>
      </div>
    </div>
  );
};
