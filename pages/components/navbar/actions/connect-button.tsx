import { NextPage } from "next";
import { ConnectionState } from "../../../enums/connection-state";
import { PrimaryButton } from "../../shared/primary-button";

interface Props {
    onClick: () => void;
    connectionState: ConnectionState;
}

export const ConnectButton: NextPage<Props> = ({ onClick, connectionState }) => {

    if (connectionState === ConnectionState.CONNECTED) {
        return <></>
    }
    return (<PrimaryButton onClick={onClick} child={'Connect'}
        disabled={connectionState === ConnectionState.UNAVAILABLE}>
    </PrimaryButton>);
}




