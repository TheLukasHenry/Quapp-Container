'use client'
import { useState } from 'react';
import Link from 'next/link';
import AuthCheck from '../AuthCheck';
import { SignInButton, SignOutButton } from '../app/buttons';
import styles from '../app/styles/NavMenu.module.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={styles.nav}>
      <Link href={'/'} className={styles.logo}>
        Quapp
      </Link>
      <div className={`${styles.links} ${isOpen ? styles.open : ''}`}>
        <Link href={'/features'}>Features</Link>
        <SignInButton />
        <AuthCheck>
          <SignOutButton />
        </AuthCheck>
      </div>
      <div className={styles.hamburger} onClick={() => setIsOpen(!isOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
};

export default Navbar;
