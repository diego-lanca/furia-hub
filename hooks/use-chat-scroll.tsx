import { useCallback, useRef } from 'react'; // Importa hooks do React: useCallback para memoizar funções e useRef para referenciar elementos DOM

/**
 * Hook customizado para controlar o scroll de um container de chat.
 * Fornece referência para o elemento e função para rolar suavemente ao final.
 *
 * @returns Objeto com `containerRef` (ref do container) e `scrollToBottom` (função de scroll)
 */
export function useChatScroll() {
  // Cria referência mutável para o elemento <div> que envolve as mensagens do chat
  const containerRef = useRef<HTMLDivElement>(null);

  /**
   * Função que rola suavemente o container até o final (height máximo)
   */
  const scrollToBottom = useCallback(() => {
    if (!containerRef.current) return; // Se a ref ainda não estiver vinculada, não faz nada

    const container = containerRef.current;
    container.scrollTo({
      top: container.scrollHeight,    // Define posição vertical igual à altura total do conteúdo
      behavior: 'smooth',             // Usa animação suave para o scroll
    });
  }, []);

  // Retorna a ref e a função para uso em componentes de chat
  return { containerRef, scrollToBottom };
}