import Link from 'next/link'

import styles from './notFound.module.css'

export default function Page() {
  return (
    <div className={styles.container}>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link className={styles.link} href="/expenses">
        Return Expenses Page
      </Link>
    </div>
  )
}
