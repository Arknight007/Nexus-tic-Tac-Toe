'use client'

import { useEffect, useState } from 'react'

interface WinningLineProps {
  start: number
  end: number
}

export default function WinningLine({ start, end }: WinningLineProps) {
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 50)
    return () => clearTimeout(timer)
  }, [])

  const getCoordinates = (index: number) => {
    const col = index % 3
    const row = Math.floor(index / 3)
    // Adjust coordinates to match the board size (72px squares)
    return { x: col * 24 + 12, y: row * 24 + 12 }
  }

  const startCoord = getCoordinates(start)
  const endCoord = getCoordinates(end)

  return (
    <svg className="absolute inset-0 h-full w-full pointer-events-none z-10">
      <defs>
        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#06b6d4" /> {/* cyan-500 */}
          <stop offset="100%" stopColor="#a855f7" /> {/* purple-500 */}
        </linearGradient>
      </defs>
      <line
        x1={startCoord.x}
        y1={startCoord.y}
        x2={animate ? endCoord.x : startCoord.x}
        y2={animate ? endCoord.y : startCoord.y}
        stroke="url(#lineGradient)"
        strokeWidth="3"
        strokeLinecap="round"
        filter="drop-shadow(0 0 8px rgba(6, 182, 212, 0.8))"
        className="transition-all duration-700 ease-out"
      />
    </svg>
  )
}

