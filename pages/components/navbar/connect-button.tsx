import { NextPage } from "next";
import { ConnectionState } from "../../enums/connection-state";

interface Props {
    onClick: () => void;
    connectionState: ConnectionState;
}

export const ConnectButton: NextPage<Props> = ({ onClick, connectionState }) => {

    if(connectionState === ConnectionState.CONNECTED) {
        return <></>
    }

    return (
        <div className="flex space-x-4 pl-4">
            <button
                className={'bg-neutral-900 text-gray-300 disabled:bg-slate-200 disabled:text-slate-500 hover:bg-gray-700 hidden hover:text-white px-3 py-2 rounded-md text-sm font-medium sm:block'}
                aria-current={'page'}
                onClick={onClick}
                disabled={connectionState === ConnectionState.UNAVAILABLE}>
                Connect
            </button>
        </div>
    );
}




