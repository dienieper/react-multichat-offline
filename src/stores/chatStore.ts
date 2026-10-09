import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Conversation } from '../types/conversation'
import type { Message, Sender } from '../types/message'

type ChatState = {
  conversations: Conversation[]
  activeConversationId: string | null
  sender: Sender
  createConversation: () => void
  selectConversation: (id: string) => void
  deleteConversation: (id: string) => void
  addMessage: (text: string) => void
  toggleSender: () => void
}

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      conversations: [],
      activeConversationId: null,
      sender: 'user',

      createConversation: () => {
        const id = crypto.randomUUID()
        const conversation: Conversation = { id, messages: [] }
        set({
          conversations: [...get().conversations, conversation],
          activeConversationId: id,
        })
      },

      selectConversation: (id) => {
        const exists = get().conversations.some((c) => c.id === id)
        if (!exists) return

        set({ activeConversationId: id })
      },

      deleteConversation: (id) => {
        const { conversations, activeConversationId } = get()
        set({
          conversations: conversations.filter((c) => c.id !== id),
          activeConversationId: activeConversationId === id ? null : activeConversationId,
        })
      },

      addMessage: (text) => {
        const trimmed = text.trim()
        if (!trimmed) return

        const { conversations, activeConversationId, sender } = get()
        if (!activeConversationId) return

        const message: Message = {
          id: crypto.randomUUID(),
          text: trimmed,
          sender,
        }

        set({
          conversations: conversations.map((c) =>
            c.id === activeConversationId
              ? { ...c, messages: [...c.messages, message] }
              : c,
          ),
        })
      },

      toggleSender: () => {
        set({ sender: get().sender === 'user' ? 'robot' : 'user' })
      },
    }),
    {
      name: 'chat-conversations',
      partialize: (state) => ({ conversations: state.conversations }),
    },
  ),
)
