import './globals.css'
import AuthProvider from './AuthProvider'
import NavMenu from './NavMenu'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={inter.className}>
          <NavMenu />
          <div>{children} </div>
        </body>
      </html>
    </AuthProvider>
  )
}