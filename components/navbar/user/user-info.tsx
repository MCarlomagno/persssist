import { NextPage } from "next";
import { truncateAddress } from "../../../utils/format";
import { UserAvatar } from "./avatar";
import { Grid } from 'antd';

const { useBreakpoint } = Grid;

interface Props {
    address: string;
}

export const UserInfo: NextPage<Props> = ({ address }) => {
    const screens = useBreakpoint();
    const isNotMobile = screens.md;
    return (
        <div className="pl-4 flex">
           {isNotMobile && <span className="m-auto text-sm">{truncateAddress(address)}</span>}
           <UserAvatar address={address}></UserAvatar>
        </div>
    );
}




