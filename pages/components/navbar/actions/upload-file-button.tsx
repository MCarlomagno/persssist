import { NextPage } from "next";
import { PrimaryButton } from "../../shared/primary-button";
import { BsUpload } from "react-icons/bs";

interface Props {
}

export const UploadFileButton: NextPage<Props> = () => {

    const onClick = () => { console.log('upload file not implemented') };

    const child = <div className="flex">
        <BsUpload className="mt-1"></BsUpload>
        <span className="ml-2">Upload</span>
    </div>
    
    return (<PrimaryButton onClick={onClick} child={child}>
    </PrimaryButton>);
}
