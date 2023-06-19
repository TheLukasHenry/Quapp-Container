import AuthProvider from './AuthProvider'
import NavMenu from '../components-client/NavMenu'
import Hero from '@/components-client/Hero'
import Footer from '@/components-client/Footer'
import '@/styles/globals.css';


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
        <body>
          <NavMenu />
          <Hero />
          <Footer />
          <div>{children} </div>
        </body>
      </html>
    </AuthProvider>
  )
}
