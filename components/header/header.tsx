import { Button, Upload, message, Space, Row, Col, Modal, PageHeader, Divider, Typography } from 'antd';
import { NextPage } from 'next'
import { useState } from 'react';
import {InboxOutlined, UploadOutlined} from '@ant-design/icons';
import { UploadChangeParam } from 'antd/lib/upload';
import { UploadFile } from 'antd/lib/upload/interface';
import { IFile } from '../../interfaces/ifile.interface';
const { Text, Title } = Typography;
const { Dragger } = Upload;

interface Props {
    contract: any;
    ipfs: any;
    account: string | undefined;
    enabled: boolean;
}

export const Header: NextPage<Props> = ({ contract, ipfs, account, enabled }) => {

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

    const onUploadSuccess = (hash: String) => {
        setIsLoading(false);
        setFile(null);
        message.success(`File uploaded successfully.`);
        closeModal();
    }

    const onUploadError = (e: any) => {
        console.log(e);
        message.error(`Some error has ocurred`);
        setIsLoading(false);
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
        ).send({ from: account })
            .on('transactionHash', onUploadSuccess)
            .on('error', onUploadError)
    }

    return (
        <div className="align-center">
            <div className='flex flex-col align-center text-center mt-10'>
                <Title level={3}> Welcome to Persssist </Title>
                <Text type='secondary'>
                    Decentralized blockchain platform for uploading, downloading and sharing files without any restriction.
                </Text>
                <div className='flex justify-center mt-5'>
                <Button type="primary" disabled={!enabled || !account} icon={<UploadOutlined />} onClick={openModal}>Start sharing</Button>
                </div>
            </div>

            <Divider/>
                        
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
