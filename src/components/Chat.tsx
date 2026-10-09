import { useState } from 'react'
import { useChatStore } from '../stores/chatStore'
import ChatInput from './ChatInput'
import MessageList from './MessageList'
import MobileMenuButton from './MobileMenuButton'
import Sidebar from './Sidebar'

function useActiveMessages() {
  return useChatStore((state) => {
    if (!state.activeConversationId) return null

    const conversation = state.conversations.find(
      (c) => c.id === state.activeConversationId,
    )
    return conversation?.messages ?? []
  })
}

export default function Chat() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const activeConversationId = useChatStore((state) => state.activeConversationId)
  const messages = useActiveMessages()

  const closeSidebar = () => setSidebarOpen(false)
  const toggleSidebar = () => setSidebarOpen((open) => !open)

  return (
    <div className="flex min-h-dvh bg-stone-200">
      <button
        type="button"
        aria-label="Fechar menu de conversas"
        aria-hidden={!sidebarOpen}
        tabIndex={sidebarOpen ? 0 : -1}
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ease-in-out md:hidden ${
          sidebarOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={closeSidebar}
      />

      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

      <div className="flex min-h-dvh min-w-0 flex-1 flex-col">
        <header className="flex shrink-0 p-3 md:hidden">
          <MobileMenuButton onClick={toggleSidebar} />
        </header>
        <div className="mx-auto flex min-h-0 w-full max-w-2xl flex-1 flex-col">
          <MessageList messages={messages} />
          <ChatInput disabled={activeConversationId === null} />
        </div>
      </div>
    </div>
  )
}
