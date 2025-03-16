import Game from './components/Game'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black">
      <div className="relative">
        <div className="absolute -inset-10 bg-gradient-radial from-cyan-500/20 to-transparent opacity-30 blur-xl"></div>
        <h1 className="text-2xl text-cyan-400 mb-4 tracking-widest uppercase font-light text-center text-glow">NEXUS</h1>
        <Game />
      </div>
    </main>
  )
}

