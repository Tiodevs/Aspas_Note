'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import styles from './page.module.css'

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  if (status === 'loading') {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/login' })
  }

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.headerInner}>
            <div className={styles.logo}>
              <h1 className={styles.logoText}>
                Aspas Note
              </h1>
            </div>
            
            <div className={styles.userSection}>
              <div className={styles.userInfo}>
                <div className={styles.avatar}>
                  <span className={styles.avatarText}>
                    {session.user.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className={styles.userDetails}>
                  <p className={styles.userName}>
                    {session.user.name}
                  </p>
                  <p className={styles.userRole}>
                    {session.user.role}
                  </p>
                </div>
              </div>
              
              <button
                onClick={handleSignOut}
                className={styles.signOutButton}
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={styles.main}>
        <div className={styles.welcome}>
          <h2 className={styles.welcomeTitle}>
            Bem-vindo, {session.user.name}!
          </h2>
          <p className={styles.welcomeSubtitle}>
            Aqui você pode gerenciar suas frases e citações favoritas.
          </p>
        </div>

        {/* Stats Cards */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statContent}>
              <div className={`${styles.statIcon} ${styles.statIconBlue}`}>
                <svg className={styles.statIconSvg} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10m0 0V6a2 2 0 00-2-2H9a2 2 0 00-2 2v2m10 0v10a2 2 0 01-2 2H9a2 2 0 01-2-2V8m10 0H7" />
                </svg>
              </div>
              <div className={styles.statDetails}>
                <p className={styles.statLabel}>Total de Frases</p>
                <p className={styles.statValue}>0</p>
              </div>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statContent}>
              <div className={`${styles.statIcon} ${styles.statIconGreen}`}>
                <svg className={styles.statIconSvg} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <div className={styles.statDetails}>
                <p className={styles.statLabel}>Favoritas</p>
                <p className={styles.statValue}>0</p>
              </div>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statContent}>
              <div className={`${styles.statIcon} ${styles.statIconPurple}`}>
                <svg className={styles.statIconSvg} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
              <div className={styles.statDetails}>
                <p className={styles.statLabel}>Categorias</p>
                <p className={styles.statValue}>0</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className={styles.actionsCard}>
          <h3 className={styles.actionsTitle}>
            Ações Rápidas
          </h3>
          <div className={styles.actionsGrid}>
            <button className={styles.actionButton}>
              <div className={`${styles.actionIcon} ${styles.actionIconBlue}`}>
                <svg className={styles.actionIconSvg} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <div className={styles.actionDetails}>
                <p className={styles.actionTitle}>Nova Frase</p>
                <p className={styles.actionDescription}>Adicionar uma nova citação</p>
              </div>
            </button>

            <button className={styles.actionButton}>
              <div className={`${styles.actionIcon} ${styles.actionIconGreen}`}>
                <svg className={styles.actionIconSvg} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <div className={styles.actionDetails}>
                <p className={styles.actionTitle}>Buscar</p>
                <p className={styles.actionDescription}>Encontrar frases salvas</p>
              </div>
            </button>

            <button className={styles.actionButton}>
              <div className={`${styles.actionIcon} ${styles.actionIconPurple}`}>
                <svg className={styles.actionIconSvg} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div className={styles.actionDetails}>
                <p className={styles.actionTitle}>Relatórios</p>
                <p className={styles.actionDescription}>Ver estatísticas</p>
              </div>
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
