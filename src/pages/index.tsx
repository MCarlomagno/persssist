import type { NextPage } from 'next'
import Head from 'next/head'
import Web3 from 'web3'
import { useEffect, useState } from 'react'
import Persssist from '../../public/abis/Persssist.json'
import PersssistLocal from '../../abis/Persssist.json'
import { NavBar } from '../components/navbar/Navbar'
import { Projects } from '../components/projects/Projects'
import "antd/dist/antd.css";
import { Header } from '../components/header/header'
import { PersssistFile } from '../interfaces/persssist-file.interface'
import { Provider } from 'react-redux'
import store from '../store';

declare let window: any;

const Home: NextPage = () => {
  const [contract, setContract] = useState<any>();
  const [files, setFiles] = useState<PersssistFile[]>([]);
  const [metamaskEnabled, setMetamaskEnabled] = useState<boolean>(false);

  useEffect(() => {
    const loadWeb3 = async () => {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum)
        setMetamaskEnabled(true);
      } 
      else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider)
        setMetamaskEnabled(true);
      }
      else {
        window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
        setMetamaskEnabled(false);
      }
    }
    loadWeb3().then(() => loadBlockchainData());
  }, [])

  useEffect(() => {
    const loadFiles = async () => {
      if(!contract) return;
      const filesCount = await contract.methods.fileCount().call()
      const fetchedFiles = [];
      for (var i = filesCount; i >= 1; i--) {
        const file = await contract.methods.files(i).call()
        fetchedFiles.push(file);
      }
      setFiles([...fetchedFiles]);
    }

    const subscribeToEvents = () => {
      if(!contract) return;
      contract.events.FileUploaded()
        .on('data', (event: any) => loadFiles())
        .on('changed', (changed: any) => console.log(changed))
        .on('error', (err: any) => console.log(err))
        .on('connected', (str: any) => loadFiles())
    }

    subscribeToEvents();
  }, [contract]);

  const loadBlockchainData = async () => {
    const web3 = window.web3;
    if(process.env.NEXT_PUBLIC_MODE === 'DEV') {
      const networkId = await web3.eth.net.getId()
      const networkData = (PersssistLocal as any).networks[networkId]
      if (networkData) {
        const persssistContract = new web3.eth.Contract((PersssistLocal as any).abi, networkData.address)
        setContract(persssistContract);
      } else {
        window.alert('Perssist contract not deployed to detected network.')
      }
    }

    if(process.env.NEXT_PUBLIC_MODE === 'PROD') {
      const persssistContract = new web3.eth.Contract((Persssist as any), process.env.NEXT_PUBLIC_CONTRACT);
      setContract(persssistContract);
    }

  }

  return (
    <div>
      <Head>
        <title>Persssist</title>
        <meta name="description" content="Desentralized storage for free and forever" />
        <link rel="icon" href="favicon.ico" />
      </Head>
      <Provider store={store}>
        <NavBar></NavBar>
        <Header contract={contract} enabled={metamaskEnabled}></Header>
        <Projects files={files}></Projects>
      </Provider>

    </div>
  )
}


export default Home
