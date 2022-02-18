import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Header from './components/header'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>dFiles</title>
        <meta name="description" content="Desentralized storage for free and forever" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header></Header>
    </div>
  )
}

export default Home
