"use client"

import { IconType } from "react-icons"
import { FC } from 'react';
import Link from "next/link";
import clsx from "clsx";

interface MobileItemProps {
    href: string,
    active: boolean,
    icon: IconType,
    onClick: () => void
}

const MobileItem: FC<MobileItemProps> = ({ active, href, icon: Icon, onClick }) => {

    const handleClick = () => {
        if (onClick) {
            return onClick();
        }
    }

    return (
        <Link
            href={href}
            className={clsx("group flex gap-x-3 p-4 text-sm leading-6 font-semibold w-full justify-center text-gray-500 hover:text-black hover:bg-gray-100", active && "bg-gray-100 text-black")}
            onClick={handleClick}
        >
            <Icon className="w-6 h-6" />
        </Link>
    )
}

export default MobileItem
