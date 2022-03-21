import { NextPage } from "next";
import { ConnectionStateIcon } from "../connection-state-icon";
import { ConnectionState } from '../../../enums/connection-state';
import Image from 'next/image'

interface Props {
    address: string;
}
export const Avatar: NextPage<Props> = ({ address }) => {

    return (
        <div className="ml-4 z-0">
            <Image
                className="rounded-full border-2 absolute"
                width={30}
                height={30}
                src={`https://avatars.dicebear.com/api/identicon/${address}.svg`}
                alt={'avatar'}
            />
            <div className="relative z-10 top-0 mt-4 ml-4">
                <ConnectionStateIcon connectionState={ConnectionState.CONNECTED}></ConnectionStateIcon>
            </div>


        </div>

    );
}


