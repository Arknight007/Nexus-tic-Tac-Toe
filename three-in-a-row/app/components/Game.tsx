'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Board from './Board'
import WinningLine from './WinningLine'
import TypewriterText from './TypewriterText'
import { calculateWinner, getAIMove } from '../utils/gameLogic'

export default function Game() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [isXNext, setIsXNext] = useState(true)
  const [showWinningLine, setShowWinningLine] = useState(false)
  const router = useRouter()
  
  const winInfo = calculateWinner(board)
  const winner = winInfo ? winInfo.winner : null
  const winningLine = winInfo ? winInfo.line : null
  const isGameOver = winner || board.every(Boolean)
  
  useEffect(() => {
    if (!isXNext && !isGameOver) {
      const timer = setTimeout(() => {
        const aiMove = getAIMove(board)
        handleMove(aiMove)
      }, 1300)
      return () => clearTimeout(timer)
    }
  }, [isXNext, isGameOver, board])
  
  useEffect(() => {
    if (winningLine) {
      const timer = setTimeout(() => setShowWinningLine(true), 50)
      return () => clearTimeout(timer)
    }
  }, [winningLine])
  
  useEffect(() => {
    if (winner === 'x') {
      const timer = setTimeout(() => {
        router.push('https://iverfinne.no')
      }, 2000) // Redirect after 2 seconds
      return () => clearTimeout(timer)
    }
  }, [winner, router])
  
  const handleMove = (i: number) => {
    if (winner || board[i]) return
    
    const newBoard = board.slice()
    newBoard[i] = isXNext ? 'x' : 'o'
    setBoard(newBoard)
    setIsXNext(!isXNext)
    setShowWinningLine(false)
  }
  
  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setIsXNext(true)
    setShowWinningLine(false)
  }
  
  let status
  if (winner) {
    status = winner === 'x' ? 'You WIN!' : 'You LOOSE!'
  } else if (isGameOver) {
    status = 'DRAW!'
  } else if (isXNext) {
    status = 'Your Turn'
  } else {
    status = 'Ai is Thinking...'
  }
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 bg-gradient-to-b from-gray-900 to-black">
      <div className="relative w-72 h-72">
        <Board squares={board} onClick={isXNext ? handleMove : () => {}} />
        {showWinningLine && winningLine && (
          <WinningLine start={winningLine[0]} end={winningLine[2]} />
        )}
      </div>
      <div className="mt-6 h-16 flex flex-col items-center justify-center">
        <div className="text-xl font-semibold text-cyan-400 lowercase">
          <TypewriterText text={status} />
        </div>
        {(isGameOver || winner) && (
          <button 
            onClick={resetGame}
            className="mt-3 cursor-pointer text-lg text-purple-400 hover:text-cyan-300 transition-colors lowercase opacity-100"
          >
            <TypewriterText text="Play Agin" delay={100} />
          </button>
        )}
      </div>
    </div>
  )
}

