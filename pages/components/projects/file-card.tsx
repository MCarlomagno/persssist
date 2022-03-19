import { NextPage } from 'next'
import Image from 'next/image'
import { FilePath, fileTypes } from '../constants/file-types';
import { PersssistFile } from '../../interfaces/persssist-file.interface';
import { truncateName } from '../../utils/string-utils';
import { Card } from 'antd';
import { DownloadOutlined}  from '@ant-design/icons';
import Meta from 'antd/lib/card/Meta';

interface Props {
    file: PersssistFile;
    download: Function;
}

export const FileCard: NextPage<Props> = ({ file, download }) => {

    return (<Card
        cover={
            <div className='text-center mt-5'>
                <Image
                    alt="filetype"
                    src={fileTypes[file.fileType ?? 'undefined'] ?? FilePath.undefined}
                    width={100}
                    height={100}/>
            </div>}
        actions={[<DownloadOutlined onClick={() => download()} key="download" />]}>
        <Meta
        title={truncateName(file.fileName)}
        description={file.fileSize}
        />
    </Card>)
}

