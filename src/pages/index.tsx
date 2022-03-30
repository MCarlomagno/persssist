import type { NextPage } from 'next'
import Head from 'next/head'
import "antd/dist/antd.css";
import { Provider } from 'react-redux'
import store from '../store';
import Home from '../components/Home'

declare global {
  interface Window { 
    ethereum: any; 
    web3:any; 
  }
}

const Index: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Persssist</title>
        <meta name="description" content="Desentralized storage for free and forever" />
        <link rel="icon" href="favicon.ico" />
      </Head>
      <Provider store={store}>
        <Home></Home>
      </Provider>
    </div>
  )
}


export default Index
