import { createSlice } from '@reduxjs/toolkit';
import Web3 from 'web3';
import Persssist from '../../../../public/abis/Persssist.json'
import PersssistLocal from '../../../../abis/Persssist.json'
import {  create, IPFSHTTPClient } from 'ipfs-http-client';
import { IFile } from '../../../interfaces/ifile.interface';

declare let window: any;

const web3Tools = {
	ipfs: create({ 
		host: 'ipfs.infura.io', 
		port: 5001, 
		protocol: 'https' 
}) as IPFSHTTPClient,
	contract: null as any,
}

export const blockchain = createSlice({
	name: 'blockchain',
	initialState: {
		filesMetadata: [],
		filesCount: 0,
	},
	reducers: {
		setFilesMetadata: (state, action) => {
			state.filesMetadata = action.payload;
			state.filesCount = action.payload.length;
		}
	},
	
});

export const { setFilesMetadata } = blockchain.actions;
export default blockchain.reducer;

const initializeState = () => async (dispatch: any) => {
	if(!web3Tools.contract) return;
	const methods = web3Tools.contract.methods;

	const filesCount = await methods.fileCount().call();
	const filesMetadata = [];
	for (var i = filesCount; i >= 1; i--) {
		const file = await methods.files(i).call()
		filesMetadata.push(file);
	}

	dispatch(setFilesMetadata(setFilesMetadata));
}

const subscribeToEvents = () => {
	if(!web3Tools.contract) return;
	web3Tools.contract.events.FileUploaded()
		.on('data', (event: any) => initializeState())
		.on('changed', (changed: any) => console.log(changed))
		.on('error', (err: any) => console.log(err))
		.on('connected', (str: any) => initializeState())
}

export const initializeWeb3 = () => async (dispatch: any) => {
	var web3 = null;
	// initialize web3
	if (window.ethereum) web3 = new Web3(window.ethereum)
	else if (window.web3) web3 = new Web3(window.web3.currentProvider);

	if(web3) {
		// initialize smart contract
		if(process.env.NEXT_PUBLIC_MODE === 'DEV') {
			const networkId = await web3.eth.net.getId();
			const networkData = (PersssistLocal as any).networks[networkId];
			var contract = null
				if (networkData) {
					contract = new web3.eth.Contract(
					(PersssistLocal as any).abi, 
					networkData.address
					)
				}
			}
			
			if(process.env.NEXT_PUBLIC_MODE === 'PROD') {
				contract = new web3.eth.Contract(
					(Persssist as any),
					process.env.NEXT_PUBLIC_CONTRACT
				);
			}
			web3Tools.contract = contract;
			initializeState();
			subscribeToEvents();
	}
};

export const uploadFile = async (file: IFile | null | undefined, account: String) => {
	if (!file || !file.buffer || !web3Tools.contract || !web3Tools.ipfs) return;
	const blob = new Blob([file.buffer], { type: file.type });
	const result = await web3Tools.ipfs.add(blob);

	return web3Tools.contract.methods.uploadFile(
			result.path,
			result.size,
			file.type,
			file.name,
	);
}