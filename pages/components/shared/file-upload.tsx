
import { NextPage } from "next";
import { ChangeEvent, useState } from "react";
import { PrimaryButton } from "./primary-button";


interface IFile {
    buffer: Buffer,
    type: string,
    name: string,
}

interface Props {
    contract: any;
    ipfs: any;
    account: string | undefined;
}

var readFile = (file: File) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsArrayBuffer(file);
    });
}

export const FileUpload: NextPage<Props> = ({ contract, ipfs, account }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [file, setFile] = useState<IFile | null>();

    const uploadFile = async (description: string) => {
        if (!file || !file.buffer || !contract) return;
        setIsLoading(true);
        console.log("Submitting file to IPFS...")
        // Add file to the IPFS
        const blob = new Blob([file.buffer], { type: file.type });
        const result = await ipfs.add(blob);

        contract.methods.uploadFile(
            result.path,
            result.size,
            file.type,
            file.name,
            description,
        ).send({ from: account })
            .on('transactionHash', (hash: string) => {
                setIsLoading(false);
                setFile(null);
                window.location.reload()
            }).on('error', (e: any) => {
                console.log(e);
                setIsLoading(false);
            })
    }

    const captureFile = async (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        if (!event.target || !event.target.files) return;
        const file = event.target.files[0];
        const result = await readFile(file);
        setFile({
            buffer: Buffer.from(new Uint8Array(result as ArrayBuffer)),
            type: file.type,
            name: file.name,
        });
    }

    return (
        <div className="justify-center">
            <div className="mb-3 w-96">
                <input className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-neutral-400 focus:outline-none" type="file" id="formFile" onChange={(event) => captureFile(event)} />
            </div>
            <PrimaryButton child={'Upload File'} onClick={() => uploadFile('some random description')}></PrimaryButton>
        </div>
    );
}

