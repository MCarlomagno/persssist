import type { NextPage } from 'next'
import { useEffect } from 'react'
import { NavBar } from './navbar/Navbar'
import { Projects } from './projects/Projects'
import "antd/dist/antd.css";
import { Header } from './header/header'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store';
import { fetchFilesMetadata, subscribeToEvents } from '../store/slices/blockchain'

const Home: NextPage = () => {
  const {filesMetadata} = useSelector((store: RootState) => store.blockchain);
	const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(subscribeToEvents());
	}, []);

  return (
    <div>
			<NavBar></NavBar>
			<Header></Header>
			<Projects files={filesMetadata} ></Projects>
    </div>
  )
}


export default Home