import { NextPage } from "next";
import { ConnectionState } from "../../enums/connection-state";
import { truncateAddress } from "../../utils/string-utils";

interface Props {
    address: string;
}

export const UserInfo: NextPage<Props> = ({ address }) => {

    return (
        <div className="pl-4">
           {truncateAddress(address)}
        </div>
    );
}




