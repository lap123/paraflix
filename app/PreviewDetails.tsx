import React from 'react';
import { PlayCircleIcon, PlusCircleIcon, HandThumbUpIcon, ArrowDownCircleIcon } from '@heroicons/react/24/solid';
import cx from 'classnames';

interface PreviewDetailsProps {
    className?: string
}

export default function PreviewDetails({ className }: PreviewDetailsProps) {
    return (
        <div className={cx("p-4 text-sm transform-none bg-zinc-900", className)}>
            <div className="mx-3 flex justify-between">
                <div className="flex">
                    <PlayCircleIcon className="w-7" />
                    <PlusCircleIcon className="w-7" />
                    <HandThumbUpIcon className="w-7" />
                </div>

                <ArrowDownCircleIcon className="w-7" />
            </div>
        </div>
    );
}