'use client'

import type { MouseEvent } from 'react'
import { useRef } from 'react'

import {
  faChartLine,
  faMoneyBill,
  faRightFromBracket,
  faTags,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'

import styles from './sidebar.module.css'

import { userLogout } from '@/app/actions/logout'

export const Sidebar: React.FC = () => {
  const menuToggleRef = useRef<HTMLElement | null>(null)

  const handleMenuToggle = (e: MouseEvent<HTMLButtonElement>) => {
    if (menuToggleRef.current) {
      menuToggleRef.current.classList.toggle(styles.sidebarClose)
      menuToggleRef.current
        .querySelector(`.${styles.sidebarText}`)
        ?.classList.toggle(styles.textClose)
      menuToggleRef.current
        .querySelectorAll(`.${styles.linkText}`)
        .forEach((linkText) => {
          linkText.classList.toggle(styles.linkTextClose)
        })
    }
    e.stopPropagation()
  }

  const logout = (): void => {
    userLogout()
  }

  return (
    <nav className={styles.nav} ref={menuToggleRef}>
      <header className={styles.sidebarHeader}>
        <button
          aria-label="menu"
          className={styles.menuTriggerButton}
          onClick={handleMenuToggle}
          type="button"
        >
          <span className={styles.line}></span>
          <span className={styles.line}></span>
          <span className={styles.line}></span>
        </button>
        <div className={styles.sidebarHeaderImageText}>
          <div className={styles.sidebarText}>
            <span className={styles.headerImageTextName}>
              household finance
            </span>
          </div>
        </div>
      </header>

      <div className={styles.sidebarMenu}>
        <ul className={styles.menuUl}>
          <li className={styles.navListItem}>
            <Link className={styles.sidebarLink} href="/expenses">
              <FontAwesomeIcon className={styles.icon} icon={faMoneyBill} />
              <div className={styles.linkTextWrapper}>
                <span className={styles.linkText}>Expenses</span>
              </div>
            </Link>
          </li>
          <li className={styles.navListItem}>
            <Link className={styles.sidebarLink} href="/categories">
              <FontAwesomeIcon className={styles.icon} icon={faTags} />
              <div className={styles.linkTextWrapper}>
                <span className={styles.linkText}>Categories</span>
              </div>
            </Link>
          </li>
          <li className={styles.navListItem}>
            <Link className={styles.sidebarLink} href="/dashboard">
              <FontAwesomeIcon className={styles.icon} icon={faChartLine} />
              <div className={styles.linkTextWrapper}>
                <span className={styles.linkText}>Dashboard</span>
              </div>
            </Link>
          </li>
          <li className={styles.navListItem}>
            <button
              className={styles.logoutButton}
              onClick={logout}
              type="button"
            >
              <FontAwesomeIcon
                className={styles.icon}
                icon={faRightFromBracket}
              />
              <div className={styles.linkTextWrapper}>
                <span className={styles.linkText}>Logout</span>
              </div>
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}
