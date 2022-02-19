import type { NextPage } from 'next'
import styles from '../../styles/Home.module.css'

const Header: NextPage = () => {
    return (
        <div>
            <h1 className={styles.title}>dFiles</h1>
            <p className={styles.subtitle}>decentralized storage for free and forever</p>
        </div>
    )
}

export default Header