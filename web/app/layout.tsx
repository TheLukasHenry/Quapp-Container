import AuthProvider from './AuthProvider'
import Navbar from '@/components-client/NavMenu';
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
          <div id="main-content">
            <Navbar />
            <div>{children} </div>
            <Footer />
          </div>
        </body>
      </html>
    </AuthProvider>
  )
}
