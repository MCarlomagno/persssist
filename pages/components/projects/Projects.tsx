
import { NextPage } from 'next'
import { DFile } from '../../../interfaces/dfile.interface';
import { Card } from '../shared/card'
import { UploadCard } from './upload_card';

interface Props {
    files: DFile[];
    onDownload: Function;
    contract: any;
    ipfs: any;
    account: string | undefined;
}

export const Projects: NextPage<Props> = ({ files, onDownload, contract, ipfs, account }) => {
    const download = (file: DFile) => {
        onDownload(file);
    }

    console.log(files);

    return (
        <div className='p-10 grid grid-cols-2 md:grid-cols-4'>
            <UploadCard contract={contract} ipfs={ipfs} account={account} ></UploadCard>
            {files.map((item, i) =>
                <Card key={i} file={item} download={() => download(item)}></Card>
            )
            }
        </div >
    )
}