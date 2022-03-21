import { useEffect, useState } from 'react'
import { Disclosure, Menu } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import { NextPage } from 'next'
import Image from 'next/image'
import { ConnectionState } from '../../enums/connection-state'
import { ConnectionStateIcon } from './connection-state-icon'
import { UserInfo } from './user/user-info'
import { ConnectButton } from './actions/connect-button'

// For recognizing ethereum as part of the
// window global object.
declare let window: any;

export const NavBar: NextPage = () => {

    const [connectionState, setConnectionState] = useState(ConnectionState.DISCONNECTED);
    const [userAddress, setUserAddress] = useState("");

    useEffect(() => {
        async function listenMetamask() {
            window.ethereum?.on('accountsChanged', initializeConnectionState);
        }
        listenMetamask();
        initializeConnectionState();
    }, []);

    async function initializeConnectionState() {
        if (!window.ethereum) return setConnectionState(ConnectionState.UNAVAILABLE);

        const accounts: string[] = await window.ethereum.request({ method: "eth_accounts" });
        if (accounts.length === 0) return setConnectionState(ConnectionState.DISCONNECTED);

        setUserAddress(accounts[0]);
        return setConnectionState(ConnectionState.CONNECTED);
    }

    async function connect() {
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        setUserAddress(accounts[0]);
    }

    const MobileMenuButton = (open: boolean) => <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
        <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
            <span className="sr-only">Open main menu</span>
            {open ? (
                <XIcon className="block h-6 w-6" aria-hidden="true" />
            ) : (
                <MenuIcon className="block h-6 w-6" aria-hidden="true" />
            )}
        </Disclosure.Button>
    </div>

    const Logo = () => <div className="flex-shrink-0 flex items-center">
        <Image src="/images/logo.svg" height={144} width={144} alt="Persssist" />
    </div>

    const ActionButtons = () => <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
        {connectionState !== ConnectionState.CONNECTED && <ConnectionStateIcon connectionState={connectionState}></ConnectionStateIcon>}
        {connectionState === ConnectionState.CONNECTED &&
            <UserInfo address={userAddress}></UserInfo>}
        <ConnectButton onClick={connect} connectionState={connectionState}></ConnectButton>
    </div>;

    return (
        <Disclosure as="nav">
            {({ open }) => (
                <>
                    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                        <div className="relative flex items-center justify-between h-16">
                            {MobileMenuButton(open)}
                            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                                {Logo()}
                            </div>
                            {ActionButtons()}
                        </div>
                    </div>

                    <Disclosure.Panel className="sm:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            <Disclosure.Button
                                key={'connect'}
                                as="a"
                                className={'text-gray-300 hover:bg-gray-700 hover:text-white'}
                                aria-current={'page'}
                            >
                                Connect
                            </Disclosure.Button>
                            ))
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )
}