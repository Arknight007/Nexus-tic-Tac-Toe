import './globals.css'
import { GeistMono } from 'geist/font/mono'
export const metadata = {
  title: 'NEXUS | TIC TAC TOE',
  description: ' Three in a Row ',
    generator: 'v0.dev'
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={GeistMono.className}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="theme-color" content="#0f172a" />
      </head>
      <body className="bg-black overflow-hidden">
        <div className="fixed inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
        {children}
      </body>
    </html>
  )
}



import './globals.css'