// import Link from 'next/link'
// import './globals.css'
// import { Inter } from 'next/font/google'

// const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Quapp',
  description: 'Quapp QA App',
}

export default function FeaturesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div lang="en">
      {/* <body> */}
      <div className="pt-16">{children} </div>
      {/* </body> */}
    </div>
  )
}
