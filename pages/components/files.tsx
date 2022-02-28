import type { NextPage } from 'next'
import { DFile } from '../../interfaces/dfile.interface';

interface Props {
    files: DFile[];
    onDownload: Function;
}
const Files: NextPage<Props> = (props) => {

    const download = (file: DFile) => {
        props.onDownload(file);
    }

    return (
        <div>
            {props.files.map((item, i) =>
                <div key={i} >
                    <p >{`${item.fileName}`}</p>
                    <button onClick={() => download(item)}>Download</button>

                </div>
            )
            }
        </div >
    )
}

export default Files