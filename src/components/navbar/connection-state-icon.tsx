
import { NextPage } from "next";
import { ConnectionState } from "../../enums/connection-state";

interface Props {
	connectionState: ConnectionState;
}

export const ConnectionStateIcon: NextPage<Props> = ({ connectionState }) => {
	if (connectionState === ConnectionState.DISCONNECTED) {
		return <div className="w-4 h-4 rounded-full bg-amber-100 grid place-items-center">
			<div className="w-2 h-2 rounded-full bg-amber-600"></div>
		</div>
	}

	if (connectionState === ConnectionState.CONNECTED) {
		return <div className="w-4 h-4 rounded-full bg-green-100 grid place-items-center">
			<div className="w-2 h-2 rounded-full bg-green-400"></div>
		</div>
	}

	if (connectionState === ConnectionState.UNAVAILABLE) {
		return <div className="w-4 h-4 rounded-full bg-red-100 grid place-items-center">
			<div className="w-2 h-2 rounded-full bg-red-400"></div>
		</div>
	}


	return (<></>);
}



