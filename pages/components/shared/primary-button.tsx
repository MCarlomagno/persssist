import { NextPage } from "next";
import clsx from 'clsx';

interface Props {
    onClick: () => void;
    disabled?: boolean;
    child: any;
}

export const PrimaryButton: NextPage<Props> = ({ onClick, disabled = false, child }) => {

    return (
        <div className="flex space-x-4 pl-4">
            <button
                className={clsx('bg-neutral-900 text-gray-300',
                    'disabled:bg-slate-200 disabled:text-slate-500',
                    'hover:bg-gray-700 hidden hover:text-white px-3',
                    'py-2 rounded-md text-sm font-medium sm:block')}
                aria-current={'page'}
                onClick={onClick}
                disabled={disabled}>
                {child}
            </button>
        </div>
    );
}