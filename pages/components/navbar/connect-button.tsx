import { NextPage } from "next";
import { useEffect, useState } from "react";
import Web3 from "web3";

// For recognizing ethereum as part of the
// window global object.
declare let window: any;

function isMobileDevice() {
    return 'ontouchstart' in window || 'onmsgesturechange' in window;
}

async function connect(onConnected: any) {
    if (!window.ethereum) {
        alert("Get MetaMask!");
        return;
    }

    const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
    });

    onConnected(accounts[0]);
}

async function onAddressChanged(address: string) {
    console.log('address changed')
}

async function checkIfWalletIsConnected(onConnected: any) {
    if (window.ethereum) {
        const accounts = await window.ethereum.request({
            method: "eth_accounts",
        });

        if (accounts.length > 0) {
            const account = accounts[0];
            onConnected(account);
            return;
        }

        if (isMobileDevice()) {
            await connect(onConnected);
        }
    }
}

export const ConnectButton: NextPage = () => {
    const [userAddress, setUserAddress] = useState("");

    useEffect(() => {
        checkIfWalletIsConnected(setUserAddress);
    }, []);

    useEffect(() => {
        onAddressChanged(userAddress);
    }, [userAddress]);

    async function connect(onConnected: any) {
        if (!window.ethereum) {
            alert("Get MetaMask!");
            return;
        }

        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });

        onConnected(accounts[0]);
    }

    return (
        userAddress ? <></> :
            <div className="flex space-x-4">
                <button
                    className={'bg-neutral-900 text-gray-300 hover:bg-gray-700 hidden hover:text-white px-3 py-2 rounded-md text-sm font-medium sm:block'}
                    aria-current={'page'}
                    onClick={() => connect(setUserAddress)}>
                    Connect
                </button>
            </div>
    );
}




