
import { Col, Row } from 'antd';
import { NextPage } from 'next'
import { DFile } from '../../../interfaces/dfile.interface';
import { FileCard } from './file-card'


interface Props {
    files: DFile[];
    onDownload: Function;
    contract: any;
    ipfs: any;
    account: string | undefined;
}

export const Projects: NextPage<Props> = ({ files, onDownload }) => {

    const download = (file: DFile) => {
        onDownload(file);
    }

    return (<div className='w-5/6 lg:w-4/6 m-auto max-w-5xl'>
        <Row gutter={[16, 16]}>
        {files.map((item, i) => 
            (<Col  xs={12} sm={8} lg={6} >
                <FileCard key={i} file={item} download={() => download(item)}></FileCard>
            </Col>))}
        </Row>

    </div>
            
    )
}