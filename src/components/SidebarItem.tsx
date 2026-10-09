type SidebarItemProps = {
  id: string
  isActive: boolean
  onSelect: () => void
  onDelete: () => void
}

export default function SidebarItem({ id, isActive, onSelect, onDelete }: SidebarItemProps) {
  return (
    <li
      className={`flex items-center gap-1 rounded-lg border-l-4 transition-colors duration-150 ${
        isActive
          ? 'border-stone-800 bg-stone-200'
          : 'border-transparent hover:bg-stone-200/60'
      }`}
    >
      <button
        type="button"
        onClick={onSelect}
        className={`min-w-0 flex-1 truncate px-2 py-2.5 text-left text-sm transition-colors ${
          isActive ? 'font-medium text-stone-900' : 'text-stone-700'
        }`}
        title={id}
      >
        {id}
      </button>
      <button
        type="button"
        onClick={onDelete}
        aria-label="Excluir conversa"
        className="mr-1 shrink-0 rounded-md p-1.5 text-stone-400 transition-colors hover:bg-stone-300 hover:text-stone-700 active:bg-stone-400"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-4 w-4"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 9.24A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-9.24.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </li>
  )
}
