import { NextPage } from "next";
import { PrimaryButton } from "../../shared/primary-button";
import { BsUpload } from "react-icons/bs";

interface Props {
    onClick: () => void;
}

export const UploadFileButton: NextPage<Props> = ({onClick}) => {

    const child = <div className="flex">
        <BsUpload className="mt-1"></BsUpload>
        <span className="ml-2">Upload</span>
    </div>

    return (<PrimaryButton onClick={onClick} child={child}>
        <input type="file" value="" onChange={() => {}} />
    </PrimaryButton>);
}
