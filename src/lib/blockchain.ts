// here we will handle the blockchain (Web3 library) functionality.

import Web3 from "web3";
import Persssist from '../../public/abis/Persssist.json'
import PersssistLocal from '../../abis/Persssist.json'
import { NetwokIds } from "../constants/networks";


export class AppBlockchain {
    contract: any;
    web3: Web3 | undefined;
    initialized = false;

    constructor() {}

    private async ensureInitialized() {
        if(!this.initialized) {
            await this.initialize();
        }
    }

    async uploadFileMetadata(
        path: string, 
        size: number, 
        type: string, 
        name: string, 
        account: string,
        onSuccess: (hash: string) => void,
        onError: (e: any) => void,
    ) {
        return this.contract.methods
            .uploadFile(path, size, type, name)
            .send({ from: account })
            .on('transactionHash', onSuccess)
            .on('error', onError);
    }

    async getFilesMetadata(): Promise<any[]> {
        const methods = this.contract.methods;
        const filesCount = await methods.fileCount().call();
        const filesMetadata = [];
        for (var i = filesCount; i >= 1; i--) {
            const file = await methods.files(i).call()
            filesMetadata.push(file);
        }
        return filesMetadata;
    }

    async fetchAccounts() {
        if(typeof window === "undefined") return;
        return window
            .ethereum?.request({ method: "eth_accounts" })
            .catch((err: any) => console.log(err));
    }

    private async initialize() {
        if(typeof window === "undefined") return;
        this.initializeWeb3();
        if (this.web3) {
            await this.initializeContract();
            window.ethereum?.on('accountsChanged', this.fetchAccounts);
        }
        this.initialized = true;
    }

    private initializeWeb3() {
        if(typeof window === "undefined") return;
        if (window.ethereum) this.web3 = new Web3(window.ethereum)
        else if (window.web3) this.web3 = new Web3(window.web3.currentProvider);
    }

    private async initializeContract() {
        if (process.env.NEXT_PUBLIC_MODE === 'DEV') {
            await this.initializeContractLocal();
        }
        if (process.env.NEXT_PUBLIC_MODE === 'PROD') {
            await this.initializeContractRemote();
        }
    }

    private async initializeContractLocal() {
        if(!this.web3) throw 'Web3 not initialized';
        const networkId = await this.web3.eth.net.getId();
        const networkData = (PersssistLocal as any).networks[networkId];
        if (networkData) {
            this.contract = new this.web3.eth.Contract(
                (PersssistLocal as any).abi,
                networkData.address
            )
        }
    }

    private async initializeContractRemote() {
        if(!this.web3) throw 'Web3 not initialized';
        const networkId = await this.web3.eth.net.getId();
        if(networkId !== NetwokIds.kovan) {
            throw { 
                title: 'Network not supported', 
                msg: 'Please make sure to connect to the Kovan Network'
            }
        }
        this.contract = new this.web3.eth.Contract(
            (Persssist as any),
            process.env.NEXT_PUBLIC_CONTRACT
        );
    }

    async contractSubscription(onData: () => any) {
        await this.ensureInitialized();
        this.contract.events.FileUploaded()		
            .on('data', (event: any) => onData())
            .on('changed', (changed: any) => console.log(changed))
            .on('error', (err: any) => console.log(err))
            .on('connected', (str: any) => onData())
    }
}