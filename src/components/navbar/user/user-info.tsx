import { NextPage } from "next";
import { truncateAddress } from "../../../utils/format";
import { UserAvatar } from "./avatar";
import { Grid } from 'antd';
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

const { useBreakpoint } = Grid;

interface Props {
}

export const UserInfo: NextPage<Props> = () => {

	const screens = useBreakpoint();

	const { list } = useSelector((state: RootState) => {
		return state.accounts
	});

	const address = list.length > 0 ? list[0] : '';
	const isNotMobile = screens.md;
	
	return (
		<div className="pl-4 flex">
			{isNotMobile && <span className="m-auto text-sm">{truncateAddress(address)}</span>}
			<UserAvatar address={address}></UserAvatar>
		</div>
	);
}




