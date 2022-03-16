

import { Menu, Transition } from '@headlessui/react';
import { DotsVerticalIcon, DownloadIcon } from '@heroicons/react/outline';
import { NextPage } from 'next'
import { Fragment } from 'react';
import Image from 'next/image'
import { FilePath, fileTypes } from '../constants/file-types';
import { DFile } from '../../../interfaces/dfile.interface';
import { truncateName } from '../../utils/string-utils';

interface Props {
    file: DFile;
    download: Function;
}

export const Card: NextPage<Props> = ({ file, download }) => {

    return (
        <div className="flex items-center justify-center">
            <a className="hover:border-neutral-400 border-neutral-200 border-2 p-3 rounded-lg group w-48" href="#">
                <div className="text-right">
                    <Menu as="div" className="relative inline-block text-left">
                        <div>
                            <Menu.Button className="inline-flex justify-center px-2 py-2 text-sm font-medium text-black rounded-md">
                                <DotsVerticalIcon
                                    className="w-5 h-5 ml-2 -mr-1 text-neutral-500 hover:text-neutral-700"
                                    aria-hidden="true"
                                />
                            </Menu.Button>
                        </div>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="absolute right-0 z-10 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="px-1 py-1 ">

                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                onClick={() => download()}
                                                className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'
                                                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                            >
                                                {active ? (
                                                    <DownloadIcon
                                                        className="w-5 h-5 mr-2"
                                                        aria-hidden="true"
                                                    />
                                                ) : (
                                                    <DownloadIcon
                                                        className="w-5 h-5 mr-2"
                                                        aria-hidden="true"
                                                    />
                                                )}
                                                Download
                                            </button>
                                        )}
                                    </Menu.Item>
                                </div>


                            </Menu.Items>
                        </Transition>
                    </Menu>
                </div>
                <div className='p-5 md:p-10 z-0'>
                    <Image src={fileTypes[file.fileType ?? 'undefined'] ?? FilePath.undefined} className="rounded" height={100} width={100} />
                </div>

                <h3 className="text-gray-900 font-bold text-lg">{truncateName(file.fileName)}</h3>
                <p className="text-gray-400 text-xs font-semibold">{file.fileSize}</p>
            </a>
        </div>
    )
}

