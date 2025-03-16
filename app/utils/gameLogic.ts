// Pre-define winning line patterns
const WINNING_PATTERNS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Pre-define position categories for better AI strategy
const CENTER = 4;
const CORNERS = [0, 2, 6, 8];
const SIDES = [1, 3, 5, 7];

/**
 * Determines if there is a winner in the current game state
 * @param squares - Current board state
 * @returns Winner info or null if no winner
 */
export function calculateWinner(squares: (string | null)[]): { winner: string; line: number[] } | null {
  // Using for...of is more efficient than indexed for loop for arrays
  for (const line of WINNING_PATTERNS) {
    const [a, b, c] = line;
    // Check first position before comparing others to avoid unnecessary comparisons
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line };
    }
  }
  return null;
}

/**
 * Determines the best move for the AI
 * @param squares - Current board state
 * @returns Index of the best move
 */
export function getAIMove(squares: (string | null)[]): number {
  // Find winning move
  const winningMove = findPotentialMove(squares, 'o');
  if (winningMove !== -1) return winningMove;
  
  // Block player's winning move
  const blockingMove = findPotentialMove(squares, 'x');
  if (blockingMove !== -1) return blockingMove;
  
  // Strategic position selection with priority
  return selectStrategicPosition(squares);
}

/**
 * Finds a potential winning move for the specified player
 * @param squares - Current board state
 * @param player - Player symbol to check for
 * @returns Move index or -1 if no winning move found
 */
function findPotentialMove(squares: (string | null)[], player: string): number {
  const emptySquares = squares.map((val, idx) => val === null ? idx : -1).filter(idx => idx !== -1);
  
  // Only check empty positions
  for (const position of emptySquares) {
    const testSquares = [...squares];
    testSquares[position] = player;
    if (calculateWinner(testSquares)) {
      return position;
    }
  }
  
  return -1;
}

/**
 * Selects the best strategic position based on priority
 * @param squares - Current board state
 * @returns Index of the selected position
 */
function selectStrategicPosition(squares: (string | null)[]): number {
  // Center first
  if (!squares[CENTER]) return CENTER;
  
  // Then corners (randomized)
  const availableCorners = CORNERS.filter(i => !squares[i]);
  if (availableCorners.length > 0) {
    return availableCorners[Math.floor(Math.random() * availableCorners.length)];
  }
  
  // Then sides (randomized)
  const availableSides = SIDES.filter(i => !squares[i]);
  if (availableSides.length > 0) {
    return availableSides[Math.floor(Math.random() * availableSides.length)];
  }
  
  // Find any available space as fallback
  const anyAvailable = squares.findIndex(square => square === null);
  return anyAvailable !== -1 ? anyAvailable : -1;
}

