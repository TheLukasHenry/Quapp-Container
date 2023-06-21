import AuthProvider from './AuthProvider'
import NavMenu from '../components-client/NavMenu'
import Footer from '@/components-client/Footer'
import '@/styles/globals.css'
import { Poppins } from 'next/font/google'

const myFont = Poppins({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800', '900', '100'],
})

export const metadata = {
  title: 'Quapp',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={myFont.className}>
          <NavMenu />
          <div>{children} </div>
          <Footer />
        </body>
      </html>
    </AuthProvider>
  )
}
