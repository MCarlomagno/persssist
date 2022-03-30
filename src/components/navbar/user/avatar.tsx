import { NextPage } from "next";
import { Avatar, Badge } from "antd";

interface Props {
	address: string;
}
export const UserAvatar: NextPage<Props> = ({ address }) => {

	return (
		<div className="ml-4 z-0">
			<span>
				<Badge dot color={'green'}>
					<Avatar shape="circle" src={`https://avatars.dicebear.com/api/identicon/${address}.svg`} alt={'avatar'} />
				</Badge>
			</span>
		</div>

	);
}


