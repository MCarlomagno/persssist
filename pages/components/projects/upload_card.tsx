import { Dialog, Transition } from '@headlessui/react';
import { NextPage } from 'next'
import { Fragment, useState } from 'react';
import { BsCloudUploadFill } from 'react-icons/bs';
import { UploadFileButton } from '../navbar/actions/upload-file-button';
import { FileUpload } from '../shared/file-upload';

interface Props {
    contract: any;
    ipfs: any;
    account: string | undefined;
}

export const UploadCard: NextPage<Props> = ({ contract, ipfs, account }) => {

    let [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    return (
        <div className="flex align-center">
            <div className="flex flex-col align-center text-center justify-center hover:border-neutral-400 border-dashed border-neutral-200 border-2 p-3 rounded-lg group">
                <BsCloudUploadFill className="text-center align-center m-10 text-5xl md:m-10 md:text-6xl"></BsCloudUploadFill>
                <h3 className="text-gray-900 font-bold text-lg">Start Sharing</h3>
                <p className="text-gray-400 text-xs font-semibold pb-4">Upload files for free</p>
                <div className="flex justify-center">
                    <UploadFileButton onClick={openModal}></UploadFileButton>
                </div>
            </div>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-10 overflow-y-auto"
                    onClose={closeModal}
                >
                    <div className="min-h-screen px-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span
                            className="inline-block h-screen align-middle"
                            aria-hidden="true"
                        >
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    Upload File
                                </Dialog.Title>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">
                                        Select the file you want to upload and then confirm
                                    </p>
                                </div>

                                <FileUpload account={account} contract={contract} ipfs={ipfs}></FileUpload>

                                <div className="mt-4">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                        onClick={closeModal}
                                    >
                                        Got it, thanks!
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </div>
    )
}
