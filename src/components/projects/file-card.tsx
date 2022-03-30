import { NextPage } from 'next';
import Image from 'next/image';
import { FilePath, fileTypes } from '../../constants/file-types';
import { PersssistFile } from '../../interfaces/persssist-file.interface';
import { bytesToSize, truncateName } from '../../utils/format';
import { Card } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import Meta from 'antd/lib/card/Meta';
import { AppStorage } from '../../lib/storage';

interface Props {
	file: PersssistFile;
}

export const FileCard: NextPage<Props> = ({ file }) => {

	const storage = new AppStorage();

	return (<Card
		cover={
			<div className='text-center mt-5'>
				<Image
					alt="filetype"
					src={fileTypes[file.fileType ?? 'undefined'] ?? FilePath.undefined}
					width={100}
					height={100} />
			</div>}
		actions={[<DownloadOutlined onClick={() => storage.download(file)} key="download" />]}>
		<Meta
			title={truncateName(file.fileName)}
			description={bytesToSize(parseInt(file.fileSize))}
		/>
	</Card>)
}

