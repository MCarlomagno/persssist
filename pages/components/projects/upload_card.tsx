import { Button, Upload, message, Space, Row, Col, Modal } from 'antd';
import { NextPage } from 'next'
import { useState } from 'react';
import { BsCloudUploadFill } from 'react-icons/bs';
import { UploadFileButton } from '../navbar/actions/upload-file-button';
import {InboxOutlined, UploadOutlined} from '@ant-design/icons';
import { UploadChangeParam } from 'antd/lib/upload';
import { UploadFile } from 'antd/lib/upload/interface';
const { Dragger } = Upload;

interface Props {
    contract: any;
    ipfs: any;
    account: string | undefined;
}

interface IFile {
    buffer: Buffer,
    type: string,
    name: string,
}

export const UploadCard: NextPage<Props> = ({ contract, ipfs, account }) => {

    let [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [file, setFile] = useState<IFile | null>();

    const closeModal = () => setIsOpen(false);
    const openModal = () => setIsOpen(true);

    const onFileChange = async (info: UploadChangeParam<UploadFile>) => {
        const rcFile = info.file;
        const arrayBuffer = await rcFile.originFileObj?.arrayBuffer();
        setFile({
          buffer: Buffer.from(new Uint8Array(arrayBuffer as ArrayBuffer)),
          type: rcFile.type ?? '',
          name: rcFile.name ?? '',
      });
    }

    const onSubmit = async () => {
        if (!file || !file.buffer || !contract) return;
        setIsLoading(true);
        const blob = new Blob([file.buffer], { type: file.type });
        const result = await ipfs.add(blob);

        contract.methods.uploadFile(
            result.path,
            result.size,
            file.type,
            file.name,
            'some generic description',
        ).send({ from: account })
            .on('transactionHash', (hash: string) => {
                setIsLoading(false);
                message.success(`File uploaded successfully.`);
                closeModal();
                setFile(null);
            }).on('error', (e: any) => {
                console.log(e);
                message.error(`Some error has ocurred`);
                setIsLoading(false);
            })
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
            
            <Modal title="Upload File" visible={isOpen} footer={false} destroyOnClose={true} onOk={onSubmit} onCancel={closeModal}>
                <Dragger name={'file'}onChange={onFileChange}>
                    <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">
                    Support for a single file.
                    </p>
                </Dragger>
                <Row className='mt-4'>
                    <Col offset={15}>
                        <Button onClick={closeModal} type="text">Cancel</Button>
                        <Button type="primary" loading={isLoading} icon={<UploadOutlined />} onClick={onSubmit}>Upload</Button>
                    </Col>
                </Row>
            </Modal>
        </div>
    )
}
