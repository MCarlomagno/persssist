import { NextPage } from 'next'
import Image from 'next/image'
import { FilePath, fileTypes } from '../../constants/file-types';
import { PersssistFile } from '../../interfaces/persssist-file.interface';
import { bytesToSize, truncateName } from '../../utils/format';
import { Card, notification } from 'antd';
import { DownloadOutlined}  from '@ant-design/icons';
import Meta from 'antd/lib/card/Meta';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { IPFSHTTPClient } from 'ipfs-http-client';

interface Props {
    file: PersssistFile;
}

// dynamic import
let untar: any;

export const FileCard: NextPage<Props> = ({ file }) => {

    const { ipfs } = useSelector((state: RootState) => state.storage)

    useEffect(() => {
        const loadDynamicModules = async () => {
            untar = await require("js-untar");
        }
        loadDynamicModules();
    },[]);

    const ipfsNotInitializedNotification = () => {
        notification['error']({
            message: 'IPFS service not initialized',
            description:
            'Seems that your storage account was not properly setted' +
            ' up, please try again after refreshing the page and make' +
            ' sure to connect your wallet.',
        });
    }

    
    const downloadFile = async (ipfs: IPFSHTTPClient | undefined) => {
        if(!ipfs) return ipfsNotInitializedNotification();
        const iterable = ipfs.get(file.filePath);
        var chunks: Uint8Array[] = [];
        for await (const b of iterable) {
          chunks.push(b);
        }
    
        const tarball = new Blob(chunks, { type: 'application/x-tar' })
        const tarAsArrayBuffer = await tarball.arrayBuffer();
        const result = await untar(tarAsArrayBuffer);
        const resultFile = new Blob([result[0].buffer], { type: file.fileType })
    
        var url = window.URL.createObjectURL(resultFile);
        downloadURL(url, file.fileName);
    
      }
      const downloadURL = (data: any, fileName: string) => {
        var a;
        a = document.createElement('a');
        a.href = data;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        a.remove();
      };

    return (<Card
        cover={
            <div className='text-center mt-5'>
                <Image
                    alt="filetype"
                    src={fileTypes[file.fileType ?? 'undefined'] ?? FilePath.undefined}
                    width={100}
                    height={100}/>
            </div>}
        actions={[<DownloadOutlined onClick={() => downloadFile(ipfs)} key="download" />]}>
        <Meta
            title={truncateName(file.fileName)}
            description={bytesToSize(parseInt(file.fileSize))}
        />
    </Card>)
}

