import { Inter } from 'next/font/google'
import './globals.css'
import GoogleFontLoader from 'react-google-font-loader';


const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>{children}</body>
    </html>
  )
}


