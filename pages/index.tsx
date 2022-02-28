import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Header from './components/header'
import Web3 from 'web3'
import { ChangeEvent, useEffect, useState } from 'react'
import { create } from 'ipfs-http-client'
import DFiles from '../abis/DFiles.json'
import Files from './components/files'
import { DFile } from '../interfaces/dfile.interface'

var readFile = (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
}

const ipfs = create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

interface IFile {
  buffer: Buffer,
  type: string,
  name: string,
}
// For recognizing ethereum as part of the
// window global object.
declare let window: any;

// dynamic import
let untar: any;

const Home: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [account, setAccount] = useState();
  const [dfiles, setDfiles] = useState<any>();
  const [filesCount, setFilesCount] = useState(0);
  const [files, setFiles] = useState<DFile[]>([]);
  const [file, setFile] = useState<IFile | null>();

  useEffect(() => {
    loadWeb3();
    loadBlockchainData();
    loadDynamicModules();
  }, []);

  const loadDynamicModules = async () => {
    untar = await require("js-untar");
  }

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.request({ method: 'eth_requestAccounts' });
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  };

  const loadBlockchainData = async () => {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    setAccount(accounts[0]);
    const networkId = await web3.eth.net.getId()
    const networkData = (DFiles.networks as any)[networkId]
    if (networkData) {
      const dfiles = new web3.eth.Contract(DFiles.abi, networkData.address);
      setDfiles(dfiles);
      const filesCount = await dfiles.methods.fileCount().call()
      setFilesCount(filesCount);

      const fetchecFiles: any[] = [];
      for (var i = filesCount; i >= 1; i--) {
        const fetchedFile = await dfiles.methods.files(i).call()
        fetchecFiles.push(fetchedFile);
      }
      setFiles([...fetchecFiles])
    }
  }

  const captureFile = async (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (!event.target || !event.target.files) return;
    const file = event.target.files[0];
    const result = await readFile(file);
    setFile({
      buffer: Buffer.from(new Uint8Array(result as ArrayBuffer)),
      type: file.type,
      name: file.name,
    });
  }

  const uploadFile = async (description: string) => {
    if (!file || !file.buffer || !dfiles) return;
    setIsLoading(true);
    console.log("Submitting file to IPFS...")
    // Add file to the IPFS
    const blob = new Blob([file.buffer], { type: file.type });
    const result = await ipfs.add(blob);

    dfiles.methods.uploadFile(
      result.path,
      result.size,
      file.type,
      file.name,
      description,
    ).send({ from: account })
      .on('transactionHash', (hash: string) => {
        setIsLoading(false);
        setFile(null);
        window.location.reload()
      }).on('error', (e: any) => {
        console.log(e);
        setIsLoading(false);
      })
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
    <div className={styles.container}>
      <Head>
        <title>dFiles</title>
        <meta name="description" content="Desentralized storage for free and forever" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header></Header>
      <label>
        File:
        <input type="file" value="" onChange={(event) => captureFile(event)} />
      </label>
      <button onClick={() => uploadFile('some random description')}>Upload File</button>
      <Files files={files} onDownload={downloadFile}></Files>
    </div>
  )
}


export default Home
