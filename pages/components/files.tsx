import type { NextPage } from 'next'
import { DFile } from '../../interfaces/dfile.interface';

interface Props {
    files: DFile[];
}
const Files: NextPage<Props> = (props) => {
    return (
        <div>
            {props.files.map((item, i) => (
                <p key={i}>{`${item.fileName}`}</p>
            ))}
        </div>
    )
}

export default Files