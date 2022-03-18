
import { Col, Row } from 'antd';
import { NextPage } from 'next'
import { DFile } from '../../../interfaces/dfile.interface';
import { Card } from '../shared/card'
import { Grid } from 'antd';
import { useState } from 'react';

const { useBreakpoint } = Grid;



interface Props {
    files: DFile[];
    onDownload: Function;
    contract: any;
    ipfs: any;
    account: string | undefined;
}

export const Projects: NextPage<Props> = ({ files, onDownload }) => {

    const screens = useBreakpoint();

    var cardSize = screens.md ? 6 : 9;

    const download = (file: DFile) => {
        onDownload(file);
    }

    return (
        <Row justify='center' >
            {files.map((item, i) => 
            (<Col span={cardSize}>
                <Card key={i} file={item} download={() => download(item)}></Card>
            </Col>))}
        </Row >
    )
}