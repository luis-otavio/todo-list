import styles from './Header.module.css'
import Logo from '../../assets/images/todo_logo.svg'

export default function Header() {
  return (
    <>
      <div className={styles.header}>
        <img src={Logo} alt='Todo Logo'/>
      </div>
    </>
  )
}