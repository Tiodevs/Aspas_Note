'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { Navigation } from '@/components/ui'
import styles from './page.module.css'

export default function Home() {
  const { data: session, status } = useSession()


  if (status === 'loading') {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      {/* Navigation Component */}
      <Navigation />

      {/* Hero Section */}
      <main className={styles.main}>
        <div className={styles.hero}>
          <h1 className={styles.heroTitle}>
            Suas frases favoritas
            <span className={styles.heroHighlight}>em um só lugar</span>
          </h1>
          
          <p className={styles.heroSubtitle}>
            Organize, gerencie e compartilhe suas citações e frases marcantes de forma simples e elegante.
          </p>

          <div className={styles.heroActions}>
            {/* Botões para usuários não autenticados */}
            {!session && (
              <>
                <Link
                  href="/signup"
                  className={styles.primaryButton}
                >
                  Começar agora
                </Link>
                <Link
                  href="/login"
                  className={styles.secondaryButton}
                >
                  Já tenho conta
                </Link>
              </>
            )}
            
            {/* Botões para usuários autenticados */}
            {session && (
              <>
                <Link
                  href="/dashboard"
                  className={styles.primaryButton}
                >
                  Ir para Dashboard
                </Link>
                <Link
                  href="/about"
                  className={styles.secondaryButton}
                >
                  Saiba mais
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Features */}
        <div className={styles.features}>
          <div className={styles.feature}>
            <div className={`${styles.featureIcon} ${styles.featureIconBlue}`}>
              <svg className={styles.featureIconSvg} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10m0 0V6a2 2 0 00-2-2H9a2 2 0 00-2 2v2m10 0v10a2 2 0 01-2 2H9a2 2 0 01-2-2V8m10 0H7" />
              </svg>
            </div>
            <h3 className={styles.featureTitle}>
              Organize suas frases
            </h3>
            <p className={styles.featureDescription}>
              Mantenha todas as suas citações favoritas organizadas e facilmente acessíveis.
            </p>
          </div>

          <div className={styles.feature}>
            <div className={`${styles.featureIcon} ${styles.featureIconGreen}`}>
              <svg className={styles.featureIconSvg} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className={styles.featureTitle}>
              Busca inteligente
            </h3>
            <p className={styles.featureDescription}>
              Encontre rapidamente qualquer frase usando nossa busca avançada por texto ou autor.
            </p>
          </div>

          <div className={styles.feature}>
            <div className={`${styles.featureIcon} ${styles.featureIconPurple}`}>
              <svg className={styles.featureIconSvg} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
            </div>
            <h3 className={styles.featureTitle}>
              Compartilhe facilmente
            </h3>
            <p className={styles.featureDescription}>
              Compartilhe suas frases favoritas com amigos e nas redes sociais de forma simples.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
