import type { NextPage } from 'next';
import { useEffect } from 'react';
import { NavBar } from './navbar/Navbar';
import { Projects } from './projects/Projects';
import "antd/dist/antd.css";
import { Header } from './header/header';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { subscribeToEvents } from '../store/slices/blockchain';
import { checkExistingAccounts } from '../store/slices/accounts';
import { IError } from '../interfaces/ierror.interface';
import { notification } from 'antd';

const Home: NextPage = () => {
  const {filesMetadata} = useSelector((store: RootState) => store.blockchain);
	const dispatch = useDispatch();
  
  const onError = (err: IError) => {
    notification.error({
      message: err.title,
      description: err.msg,
    });
  }

  useEffect(() => {
    dispatch(checkExistingAccounts());
    dispatch(subscribeToEvents(onError));
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