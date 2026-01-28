'use client'

import Link from 'next/link'
import styles from './home.module.css'

const quickActions = [
  {
    href: '/dashboard/add-reservation',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="16" />
        <line x1="8" y1="12" x2="16" y2="12" />
      </svg>
    ),
    title: 'New Reservation',
    description: 'Create a new room reservation for guests',
    color: '#14b8a6'
  },
  {
    href: '/dashboard/view-reservation',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
    ),
    title: 'Find Reservation',
    description: 'Search and view existing reservations',
    color: '#0ea5e9'
  },
  {
    href: '/dashboard/bill',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M7 15h0M2 9.5h20" />
      </svg>
    ),
    title: 'Calculate Bill',
    description: 'Generate bills for guest checkouts',
    color: '#f59e0b'
  },
  {
    href: '/dashboard/help',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
    title: 'Help & Support',
    description: 'View system instructions and guides',
    color: '#a855f7'
  }
]

const stats = [
  { label: 'Total Rooms', value: '48', icon: '🏨' },
  { label: 'Available', value: '12', icon: '✅' },
  { label: 'Occupied', value: '32', icon: '🔑' },
  { label: 'Maintenance', value: '4', icon: '🔧' },
]

export default function DashboardHome() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Welcome Back!</h1>
          <p className={styles.subtitle}>Manage reservations and guest services from your dashboard.</p>
        </div>
      </header>

      {/* Stats Grid */}
      <section className={styles.statsSection}>
        <div className={styles.statsGrid}>
          {stats.map((stat) => (
            <div key={stat.label} className={styles.statCard}>
              <span className={styles.statIcon}>{stat.icon}</span>
              <div className={styles.statInfo}>
                <span className={styles.statValue}>{stat.value}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Actions */}
      <section className={styles.actionsSection}>
        <h2 className={styles.sectionTitle}>Quick Actions</h2>
        <div className={styles.actionsGrid}>
          {quickActions.map((action) => (
            <Link key={action.href} href={action.href} className={styles.actionCard}>
              <div className={styles.actionIcon} style={{ color: action.color }}>
                {action.icon}
              </div>
              <div className={styles.actionInfo}>
                <h3 className={styles.actionTitle}>{action.title}</h3>
                <p className={styles.actionDesc}>{action.description}</p>
              </div>
              <svg className={styles.actionArrow} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent Activity */}
      <section className={styles.activitySection}>
        <h2 className={styles.sectionTitle}>System Status</h2>
        <div className={styles.activityCard}>
          <div className={styles.activityItem}>
            <div className={styles.activityDot} style={{ background: '#22c55e' }}></div>
            <span>Reservation system operational</span>
          </div>
          <div className={styles.activityItem}>
            <div className={styles.activityDot} style={{ background: '#22c55e' }}></div>
            <span>Billing system operational</span>
          </div>
          <div className={styles.activityItem}>
            <div className={styles.activityDot} style={{ background: '#22c55e' }}></div>
            <span>Database connected</span>
          </div>
        </div>
      </section>
    </div>
  )
}
