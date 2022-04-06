import { Button, Upload, message, Row, Col, Modal, Divider, Typography } from 'antd';
import { NextPage } from 'next';
import { useState } from 'react';
import { InboxOutlined, UploadOutlined } from '@ant-design/icons';
import { UploadChangeParam } from 'antd/lib/upload';
import { UploadFile } from 'antd/lib/upload/interface';
import { IFile } from '../../interfaces/ifile.interface';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { uploadFile } from '../../store/slices/blockchain';
const { Text, Title } = Typography;
const { Dragger } = Upload;

interface Props {
}

export const Header: NextPage<Props> = () => {

	let [isOpen, setIsOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [file, setFile] = useState<IFile | null>();
	const { list } = useSelector((state: RootState) => {
		return state.accounts
	})

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
		setIsLoading(false);
		message.error(`An error has ocurred: ${e}`);
	}

	const onSubmit = async () => {
		setIsLoading(true);
		await uploadFile(file, list[0], onUploadSuccess, onUploadError)
		setIsLoading(false);
	}

	return (
		<div className="align-center">
			<div className='flex flex-col align-center text-center mt-10'>
				<Title level={3}> Welcome to Persssist </Title>
				<Text type='secondary'>
					Decentralized blockchain platform for uploading, downloading and sharing files without any restriction.
				</Text>
				<div className='flex justify-center mt-5'>
					<Button 
						type="primary" 
						disabled={list.length === 0} 
						icon={<UploadOutlined />} 
						onClick={openModal}>
							Share files
					</Button>
				</div>
			</div>

			<Divider />

			<Modal title="Upload File" visible={isOpen} footer={false} destroyOnClose={true} onCancel={closeModal}>
				<Dragger name={'file'} onChange={onFileChange} action={'/api/hello'}>
					<p className="ant-upload-drag-icon">
						<InboxOutlined />
					</p>
					<p className="ant-upload-text">
						Click or drag file to this area to upload
					</p>
					<p className="ant-upload-hint">
						Support for a single file.
					</p>
				</Dragger>
				<Row className='mt-4'>
					<Col offset={15}>
						<Button onClick={closeModal} type="text">Cancel</Button>
						<Button 
						type="primary" 
						loading={isLoading} 
						icon={<UploadOutlined />} 
						onClick={() => onSubmit()}>
							Upload
						</Button>
					</Col>
				</Row>
			</Modal>
		</div>
	)
}
