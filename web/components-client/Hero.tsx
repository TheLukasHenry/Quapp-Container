import React from 'react'
import styles from '@/styles/Hero.module.css'

const Hero = () => {
  return (
    <div className={styles.hero}>
      <h1 className={styles.h1}>Quapp</h1>
      <p className={styles.paragraph}>Lorem ipsum dolor sit amet.</p>
    </div>
  )
}

export default Hero
