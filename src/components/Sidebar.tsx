import { useChatStore } from '../stores/chatStore'
import SidebarItem from './SidebarItem'

type SidebarProps = {
  isOpen: boolean
  onClose: () => void
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const {
    conversations,
    activeConversationId,
    createConversation,
    selectConversation,
    deleteConversation
  } = useChatStore()

  const handleCreate = () => {
    createConversation()
    onClose()
  }

  const handleSelect = (id: string) => {
    selectConversation(id)
    onClose()
  }

  return (
    <aside
      className={`fixed top-0 left-0 z-50 flex h-dvh w-64 shrink-0 flex-col border-r border-stone-200 bg-stone-100 shadow-xl transition-transform duration-300 ease-in-out md:static md:translate-x-0 md:shadow-none ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="border-b border-stone-200 p-4">
        <button
          type="button"
          onClick={handleCreate}
          className="w-full rounded-lg bg-stone-800 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-stone-700 active:bg-stone-900"
        >
          Nova conversa
        </button>
      </div>

      <ul className="flex-1 space-y-1.5 overflow-y-auto p-3">
        {conversations.length === 0 ? (
          <li className="px-2 py-6 text-center text-sm text-stone-500">
            Nenhuma conversa ainda
          </li>
        ) : (
          conversations.map((conversation) => (
            <SidebarItem
              key={conversation.id}
              id={conversation.id}
              isActive={conversation.id === activeConversationId}
              onSelect={() => handleSelect(conversation.id)}
              onDelete={() => deleteConversation(conversation.id)}
            />
          ))
        )}
      </ul>
    </aside>
  )
}
