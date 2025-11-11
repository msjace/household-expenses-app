import styles from './layout.module.css'

import type { ReactChildren } from '@/common/interfaces/react_children'

import { Sidebar } from '@/components/atoms/Sidebar/Sidebar'
import { AuthGuard } from '@/components/molecules/Auth/AuthGuard'

export default async function Layout(props: ReactChildren): Promise<React.ReactElement> {
  return (
    <AuthGuard>
      <div className={styles.container}>
        <Sidebar />
        <div className={styles.main}>{props.children}</div>
      </div>
    </AuthGuard>
  )
}
