import type { NextPage } from 'next'
import Head from 'next/head'
import Web3 from 'web3'
import { useEffect, useState } from 'react'
import { create } from 'ipfs-http-client'
import DFiles from '../abis/DFiles.json'
import { DFile } from '../interfaces/dfile.interface'
import { NavBar } from './components/navbar/Navbar'
import { Projects } from './components/projects/Projects'
import "antd/dist/antd.css";

const ipfs = create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
// For recognizing ethereum as part of the
// window global object.
declare let window: any;

// dynamic import
let untar: any;

const Home: NextPage = () => {
  const [account, setAccount] = useState<string>();
  const [contract, setContract] = useState<any>();
  const [files, setFiles] = useState<DFile[]>([]);

  useEffect(() => {
    loadDynamicModules();
    loadWeb3().then(() => loadBlockchainData());
  }, [])

  const loadWeb3 = async () => {
    window.ipfs = ipfs;
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
  }

  const loadBlockchainData = async () => {
    const web3 = window.web3;

    const acc: string[] = await window.ethereum.request({ method: "eth_accounts" });
    setAccount(acc[0]);
    // Network ID
    const networkId = await web3.eth.net.getId()
    const networkData = (DFiles as any).networks[networkId]
    if (networkData) {
      // Assign contract
      const contract = new web3.eth.Contract((DFiles as any).abi, networkData.address)
      setContract(contract);
      // Get files amount
      const filesCount = await contract.methods.fileCount().call()
      // Load files&sort by the newest
      const fetchedFiles= [];
      for (var i = filesCount; i >= 1; i--) {
        const file = await contract.methods.files(i).call()
        fetchedFiles.push(file);
      }
      setFiles([...fetchedFiles]);
    } else {
      window.alert('DStorage contract not deployed to detected network.')
    }
  }

  const loadDynamicModules = async () => {
    untar = await require("js-untar");
  }

  const downloadFile = async (file: DFile) => {
    const iterable = ipfs.get(file.fileHash);

    var chunks: Uint8Array[] = [];
    for await (const b of iterable) {
      chunks.push(b);
    }

    const tarball = new Blob(chunks, { type: 'application/x-tar' })
    const tarAsArrayBuffer = await tarball.arrayBuffer();
    const result = await untar(tarAsArrayBuffer);
    const resultFile = new Blob([result[0].buffer], { type: file.fileType })

    var url = window.URL.createObjectURL(resultFile);
    downloadURL(url, file.fileName);

  }
  const downloadURL = (data: any, fileName: string) => {
    var a;
    a = document.createElement('a');
    a.href = data;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };


  return (
    <div>
      <Head>
        <title>Persssist</title>
        <meta name="description" content="Desentralized storage for free and forever" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar></NavBar>
      <Projects files={files} onDownload={downloadFile} contract={contract} ipfs={ipfs} account={account}></Projects>
    </div>
  )
}


export default Home
