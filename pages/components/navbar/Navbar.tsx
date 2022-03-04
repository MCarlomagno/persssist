import { useState } from 'react'
import { Disclosure, Menu } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import { NextPage } from 'next'
import Image from 'next/image'
import { ConnectButton } from './connect-button'

const navigation = [
    { name: 'Connect', href: '#', current: true },
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export const NavBar: NextPage = () => {

    const [isConnected, setIsConnected] = useState(false);

    const MobileMenuButton = (open: boolean) => <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
        {/* Mobile menu button*/}
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
        <Image
            src="/images/logo.svg" // Route of the image file
            height={144} // Desired size with correct aspect ratio
            width={144} // Desired size with correct aspect ratio
            alt="Your Name"
        />
    </div>

    const ActionButtons = () => <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

        <ConnectButton></ConnectButton>
        {/* Profile dropdown */}
        {isConnected && <Menu as="div" className="ml-3 relative">
            <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                <span className="sr-only">Open user menu</span>
                <img
                    className="h-8 w-8 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                />
            </Menu.Button>
        </Menu>}
    </div>;

    return (
        <Disclosure as="nav" className="bg-neutral-50">
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
                            {navigation.map((item) => (
                                <Disclosure.Button
                                    key={item.name}
                                    as="a"
                                    href={item.href}
                                    className={classNames(
                                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                        'block px-3 py-2 rounded-md text-base font-medium'
                                    )}
                                    aria-current={item.current ? 'page' : undefined}
                                >
                                    {item.name}
                                </Disclosure.Button>
                            ))}
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )
}