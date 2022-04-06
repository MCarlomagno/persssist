// here we will handle the blockchain (Web3 library) functionality.

import Web3 from "web3";
import Persssist from '../../public/abis/Persssist.json'
import PersssistLocal from '../../abis/Persssist.json'
import { NetwokIds } from "../constants/networks";
import { PersssistFile } from "../interfaces/persssist-file.interface";


export class AppBlockchain {
    contract: any;
    web3: Web3 | undefined;
    initialized = false;

    supportedNetworks = [NetwokIds.rinkeby];

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
        await this.ensureInitialized();
        return this.contract.methods
            .uploadFile(path, size, type, name)
            .send({ from: account })
            .on('transactionHash', onSuccess)
            .on('error', onError);
    }

    async getFilesMetadata(): Promise<PersssistFile[]> {
        const methods = this.contract.methods;
        const filesCount = await methods.fileCount().call();
        const filesMetadata: PersssistFile[] = [];
        for (var i = filesCount; i >= 1; i--) {
            const file = await methods.files(i).call()
            filesMetadata.push({
                fileId: file.id, 
                fileName: file.fileName, 
                filePath: file.filePath, 
                fileSize: file.fileSize, 
                fileType: file.fileType, 
                uploader: file.uploader
            });
        }
        return filesMetadata;
    }

    async requestAccounts() {
        if(typeof window === "undefined") return;
        return window
            .ethereum?.request({ method: "eth_requestAccounts" })
            .catch((err: any) => console.log(err));
    }

    async fetchAccounts() {
        if(typeof window === "undefined") return;
        return window
            .ethereum?.request({ method: "eth_accounts" })
            .catch((err: any) => console.log(err));
    }

    async detectAccountChanged(onChanged: (acc: string[]) => void) {
        window.ethereum.on('accountsChanged', onChanged);
    }

    async detectNetworkChanged(onError: (err: any) => void) {
        window.ethereum.on('networkChanged', (networkId: number) => {
            this.initializeContract(onError);
        });
    }

    private async initialize() {
        if(typeof window === "undefined") return;
        this.initializeWeb3();
        if (this.web3) {
            console.log('initializing contract')
            await this.initializeContract((err) => {
                throw err;
            });
        }
        this.initialized = true;
    }

    private initializeWeb3() {
        if(typeof window === "undefined") return;
        if (window.ethereum) this.web3 = new Web3(window.ethereum)
        else if (window.web3) this.web3 = new Web3(window.web3.currentProvider);
    }

    private async initializeContract(onError: (err: any) => void) {
        if (process.env.NEXT_PUBLIC_MODE === 'DEV') {
            return this.initializeContractLocal().catch(onError);
        }
        if (process.env.NEXT_PUBLIC_MODE === 'PROD') {
            return this.initializeContractRemote().catch(onError);
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
        if(!this.supportedNetworks.includes(networkId)) {
            throw {
                title: 'Network not supported', 
                msg: 'Please make sure to connect to the Rinkeby Network'
            }
        } else {
            this.contract = new this.web3.eth.Contract(
                (Persssist as any).abi,
                process.env.NEXT_PUBLIC_CONTRACT
            );
            
        }
    }

    async contractSubscription(onData: () => any) {
        await this.ensureInitialized();
        if(!this.contract) return;
        this.contract.events.FileUploaded()		
            .on('data', (event: any) => onData())
            .on('changed', (changed: any) => console.log(changed))
            .on('error', (err: any) => console.log(err))
            .on('connected', (str: any) => onData())
    }
}