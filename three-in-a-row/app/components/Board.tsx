import Square from './Square'

interface BoardProps {
  squares: (string | null)[]
  onClick: (i: number) => void
}

export default function Board({ squares, onClick }: BoardProps) {
  return (
    <div className="grid grid-cols-3 gap-1 w-72 h-72 bg-gray-900 rounded-lg p-1 shadow-lg shadow-cyan-900/30">
      {squares.map((square, i) => (
        <div key={i} className="aspect-square w-full h-full">
          <Square value={square} onClick={() => onClick(i)} />
        </div>
      ))}
    </div>
  )
}

