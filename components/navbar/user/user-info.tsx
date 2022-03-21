import { NextPage } from "next";
import { truncateAddress } from "../../../utils/format";
import { UserAvatar } from "./avatar";

interface Props {
    address: string;
}

export const UserInfo: NextPage<Props> = ({ address }) => {

    return (
        <div className="pl-4 flex">
           <span className="m-auto text-sm">{truncateAddress(address)}</span>
           <UserAvatar address={address}></UserAvatar>
        </div>
    );
}




