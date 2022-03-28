import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { NavBar } from '../components/navbar/Navbar'
import { Projects } from '../components/projects/Projects'
import "antd/dist/antd.css";
import { Header } from '../components/header/header'
import { PersssistFile } from '../interfaces/persssist-file.interface'
import { useSelector } from 'react-redux'
import { RootState } from '../store';
import { initializeWeb3 } from '../store/slices/blockchain'

const Home: NextPage = () => {
  const [files, setFiles] = useState<PersssistFile[]>([]);

  const {filesMetadata, filesCount} = useSelector((store: RootState) => store.blockchain);

  useEffect(() => {initializeWeb3()}, []);

  return (
    <div>
			<NavBar></NavBar>
			<Header></Header>
			<Projects files={filesMetadata} ></Projects>
    </div>
  )
}


export default Home