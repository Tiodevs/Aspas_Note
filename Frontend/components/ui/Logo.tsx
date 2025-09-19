import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './Logo.module.css'

interface LogoProps {
  size?: 'small' | 'medium' | 'large'
  clickable?: boolean
  href?: string
  className?: string
}

export const Logo: React.FC<LogoProps> = ({ 
  size = 'medium',
  clickable = false,
  href = '/',
  className 
}) => {
  const sizeConfig = {
    small: { width: 80, height: 26 },
    medium: { width: 120, height: 40 },
    large: { width: 170, height: 56 }
  }

  const { width, height } = sizeConfig[size]

  const logoImage = (
    <Image
      src="/images/logos/Logo01.png"
      alt="Aspas Logo"
      width={width}
      height={height}
      className={`${styles.logo} ${styles[size]} ${className || ''}`}
      priority
    />
  )

  if (clickable) {
    return (
      <Link href={href} className={styles.logoLink}>
        {logoImage}
      </Link>
    )
  }

  return <div className={styles.logoContainer}>{logoImage}</div>
}
