import Link from 'next/link'
import styles from './NavMenu.module.css'
import Image from 'next/image'
import { SignInButton, SignOutButton } from './buttons'
import AuthCheck from '../AuthCheck'

export default function NavMenu() {
  return (
    <nav className={styles.nav}>
      <Link href={'/'}>
        <Image
          src="/logo.svg" // Route of the image file
          width={216}
          height={30}
          alt="NextSpace Logo"
        />
      </Link>
      <ul className={styles.links}>
        <li>
          <Link href={'/features'}>Features</Link>
          <h1 className='text-6xl text-orange'>hello</h1>
        </li>
        <li>
          <SignInButton />
        </li>

        <li>
          <AuthCheck>
            <SignOutButton />
          </AuthCheck>
        </li>
      </ul>
    </nav>
  )
}
