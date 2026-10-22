import { useState } from 'react'
import type { Session } from '@supabase/supabase-js'

export type NavPage = 'library' | 'rewards' | 'ranks' | 'activity' | 'news' | 'forums' | 'settings'

interface SidebarProps {
  session: Session
  activePage: NavPage
  onNavigate: (page: NavPage) => void
  onSignOut: () => void
}

const navItems: { id: NavPage; label: string; icon: string }[] = [
  { id: 'library',  label: 'Library',  icon: 'ti-layout-grid' },
  { id: 'rewards',  label: 'Rewards',  icon: 'ti-trophy' },
  { id: 'ranks',    label: 'Ranks',    icon: 'ti-medal' },
  { id: 'activity', label: 'Activity', icon: 'ti-chart-bar' },
  { id: 'news',     label: 'News',     icon: 'ti-news' },
  { id: 'forums',   label: 'Forums',   icon: 'ti-message-circle' },
]

export default function Sidebar({ session, activePage, onNavigate, onSignOut }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)

  const email = session.user.email ?? ''
  const initials = email.slice(0, 2).toUpperCase()

  return (
    <div style={{ ...styles.sidebar, width: collapsed ? 56 : 210 }}>

      {/* Logo + title */}
      <div style={styles.top}>
        <div style={styles.logo}>R</div>
        {!collapsed && <span style={styles.appName}>Rebbit Hole</span>}
      </div>

      {/* Toggle button */}
      <button
        style={styles.toggleBtn}
        onClick={() => setCollapsed(c => !c)}
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        <i className={`ti ${collapsed ? 'ti-chevron-right' : 'ti-chevron-left'}`} />
      </button>

      {/* Nav items */}
      <nav style={styles.nav}>
        {navItems.map(item => (
          <button
            key={item.id}
            style={{
              ...styles.navItem,
              ...(activePage === item.id ? styles.navItemActive : {}),
              justifyContent: collapsed ? 'center' : 'flex-start',
            }}
            onClick={() => onNavigate(item.id)}
            title={collapsed ? item.label : undefined}
          >
            <i className={`ti ${item.icon}`} style={styles.navIcon} aria-hidden="true" />
            {!collapsed && <span style={styles.navLabel}>{item.label}</span>}
          </button>
        ))}
      </nav>

      {/* Bottom: settings + user */}
      <div style={styles.bottom}>
        <button
          style={{
            ...styles.navItem,
            ...(activePage === 'settings' ? styles.navItemActive : {}),
            justifyContent: collapsed ? 'center' : 'flex-start',
          }}
          onClick={() => onNavigate('settings')}
          title={collapsed ? 'Settings' : undefined}
        >
          <i className="ti ti-settings" style={styles.navIcon} aria-hidden="true" />
          {!collapsed && <span style={styles.navLabel}>Settings</span>}
        </button>

        <div style={{ ...styles.userRow, justifyContent: collapsed ? 'center' : 'flex-start' }}>
          <div style={styles.avatar}>{initials}</div>
          {!collapsed && (
            <div style={styles.userInfo}>
              <span style={styles.userEmail}>{email}</span>
              <button style={styles.signOutBtn} onClick={onSignOut}>Sign out</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  sidebar: {
    backgroundColor: 'var(--color-header)',
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 0,
    transition: 'width 0.2s ease',
    overflow: 'hidden',
    position: 'relative',
  },
  top: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '16px 14px 12px',
    borderBottom: '0.5px solid rgba(255,255,255,0.08)',
  },
  logo: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: 'var(--color-accent)',
    color: 'var(--color-text-on-dark)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 13,
    fontWeight: 600,
    flexShrink: 0,
    fontFamily: 'var(--font-main)',
  },
  appName: {
    color: 'var(--color-text-on-dark)',
    fontSize: 14,
    fontWeight: 500,
    whiteSpace: 'nowrap',
    fontFamily: 'var(--font-main)',
  },
  toggleBtn: {
    position: 'absolute',
    top: 16,
    right: 10,
    background: 'transparent',
    border: 'none',
    color: 'var(--color-text-muted)',
    cursor: 'pointer',
    fontSize: 14,
    padding: 2,
    lineHeight: 1,
  },
  nav: {
    flex: 1,
    padding: '10px 8px',
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '8px 10px',
    borderRadius: 'var(--radius-sm)',
    border: 'none',
    backgroundColor: 'transparent',
    color: 'var(--color-text-muted)',
    fontSize: 13,
    cursor: 'pointer',
    width: '100%',
    fontFamily: 'var(--font-main)',
    whiteSpace: 'nowrap',
    transition: 'background-color 0.15s',
  },
  navItemActive: {
    backgroundColor: 'rgba(122,158,106,0.2)',
    color: 'var(--color-text-on-dark)',
  },
  navIcon: {
    fontSize: 16,
    flexShrink: 0,
  },
  navLabel: {
    fontSize: 13,
  },
  bottom: {
    padding: '8px 8px 12px',
    borderTop: '0.5px solid rgba(255,255,255,0.08)',
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  userRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '6px 10px',
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: '50%',
    backgroundColor: 'var(--color-accent)',
    color: 'var(--color-text-on-dark)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 11,
    fontWeight: 600,
    flexShrink: 0,
    fontFamily: 'var(--font-main)',
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    overflow: 'hidden',
  },
  userEmail: {
    color: 'var(--color-text-muted)',
    fontSize: 11,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontFamily: 'var(--font-main)',
  },
  signOutBtn: {
    background: 'transparent',
    border: 'none',
    color: 'var(--color-text-muted)',
    fontSize: 11,
    cursor: 'pointer',
    padding: 0,
    textAlign: 'left',
    fontFamily: 'var(--font-main)',
    textDecoration: 'underline',
  },
}
