interface SquareProps {
  value: string | null
  onClick: () => void
}

export default function Square({ value, onClick }: SquareProps) {
  return (
    <button
      className="flex items-center justify-center border border-cyan-900 text-5xl font-bold transition-all hover:bg-gray-800/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-70 lowercase bg-gray-900/80 backdrop-blur-sm h-full w-full"
      onClick={onClick}
    >
      {value === 'x' && (
        <div className="relative h-14 w-14">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-16 w-2.5 bg-cyan-400 rotate-45 transform origin-center shadow-[0_0_10px_rgba(6,182,212,0.7)]" />
            <div className="h-16 w-2.5 bg-cyan-400 -rotate-45 transform origin-center shadow-[0_0_10px_rgba(6,182,212,0.7)]" />
          </div>
        </div>
      )}
      {value === 'o' && (
        <div className="h-14 w-14 rounded-full border-5 border-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.7)]" style={{ borderWidth: '5px' }} />
      )}
    </button>
  )
}

