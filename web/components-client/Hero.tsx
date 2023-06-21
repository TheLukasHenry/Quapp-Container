import React from 'react'
// import styles from './hero.module.css'
import styles from '@/styles/Hero.module.css'

const Hero = () => {
  return (
    <div className={styles.hero}>
      <h1
        className={styles.h1}

        // className="text-6xl mb-0 text-pink-500"
      >
        Quapp
      </h1>
      <p className={styles.paragraph}>Lorem ipsum dolor sit amet.</p>
    </div>
  )
}

export default Hero
