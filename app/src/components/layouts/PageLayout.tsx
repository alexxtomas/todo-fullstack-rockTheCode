import styles from '../../styles/PageLayout.module.css'

type Props = {
  title: string
  children: JSX.Element
}

export default function PageLayout({ title, children }: Props) {
  return (
    <>
      <header className={styles.header}>{title}</header>
      <main className={styles.main}>{children}</main>
    </>
  )
}
