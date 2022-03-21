
import { Col, Empty, Row } from 'antd';
import { NextPage } from 'next'
import { PersssistFile } from '../../interfaces/persssist-file.interface';
import { FileCard } from './file-card'


interface Props {
    files: PersssistFile[];
    onDownload: Function;
    contract: any;
    ipfs: any;
    account: string | undefined;
}

export const Projects: NextPage<Props> = ({ files, onDownload }) => {

    const download = (file: PersssistFile) => {
        onDownload(file);
    }

    if(files.length === 0) return <Empty />

    return (
        <div className='w-5/6 lg:w-4/6 m-auto max-w-5xl'>
            <Row gutter={[16, 16]}>
            {files.map((item, i) => 
                (<Col key={i} xs={12} sm={8} lg={6} >
                    <FileCard file={item} download={() => download(item)}></FileCard>
                </Col>))}
            </Row>
        </div>)
}