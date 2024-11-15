import { redirect } from 'next/navigation'

import styles from './layout.module.css'

import type { ReactChildren } from '@/common/interfaces/react_children'

import { Sidebar } from '@/components/atoms/Sidebar/Sidebar'
import { getAuthUser } from '@/services/server/auth'

export default async function Layout(
  props: ReactChildren
): Promise<React.ReactElement> {
  const authUser = await getAuthUser()
  if (!authUser) redirect('/login')

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.main}>{props.children}</div>
    </div>
  )
}
