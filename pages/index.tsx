import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Header from './components/header'
import Web3 from 'web3'
import { useEffect } from 'react'

// in order to recognize ethereum as part of the
// window global object.
declare let window: any;

const Home: NextPage = () => {

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }

    console.log('runs load Web 3');
  };

  const loadBlockchainData = async () => {
    
  };

  useEffect(() => {
    loadWeb3();
    loadBlockchainData();
  }, []);


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
