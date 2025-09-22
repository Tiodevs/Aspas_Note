'use client'

import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Logo } from './Logo'
import styles from './Navigation.module.css'
import { signOut } from 'next-auth/react'

interface NavigationProps {
  onAddClick?: () => void
}


export default function Navigation({ onAddClick }: NavigationProps) {
  const { data: session, status } = useSession()
  const pathname = usePathname()
  
  // Se ainda está carregando, não renderizar nada
  if (status === 'loading') {
    return null
  }

  const handleSignOut = () => {
    signOut()
  }

  const isAuthenticated = !!session

  return (
    <nav className={styles.nav}>
      <div className={styles.navContent}>
        <Logo size="medium" variant="secondary" />

        <div className={styles.navIcons}>
          {/* Sobre - sempre visível */}
          <Link
            className={`${styles.navIcon} ${pathname === '/' ? styles.navIconActive : ''}`}
            title="Sobre"
            href="/"
          >
            <Image src="/images/icons/Sobre.svg" alt="Sobre" width={40} height={40} />
          </Link>

          {/* Ícones apenas para usuários autenticados */}
          {isAuthenticated && (
            <>
              <Link
                className={`${styles.navIcon} ${pathname === '/dashboard' ? styles.navIconActive : ''}`}
                title="Home"
                href="/dashboard"
              >
                <Image src="/images/icons/Home.svg" alt="Home" width={40} height={40} />
              </Link>
              <Link
                className={`${styles.navIcon} ${pathname === '/profile' ? styles.navIconActive : ''}`}
                title="Perfil"
                href="/profile"
              >
                <Image src="/images/icons/Profile.svg" alt="Perfil" width={40} height={40} />
              </Link>

              <button 
                className={styles.navIcon} 
                title="Sair"
                onClick={handleSignOut}
              >
                <Image src="/images/icons/Logout.svg" alt="Sair" width={40} height={40} />
              </button>
              
              {onAddClick && (
                <button 
                  className={styles.navIcon} 
                  title="Adicionar"
                  onClick={onAddClick}
                >
                  <Image src="/images/icons/Plus.svg" alt="Adicionar" width={40} height={40} />
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
