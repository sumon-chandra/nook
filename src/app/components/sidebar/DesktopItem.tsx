"use client"

import { IconType } from "react-icons";

interface DesktopItemProps {
    href: string;
    label: string;
    icon: IconType;
    active: boolean;
    onClick: (() => Promise<undefined>)
}
const DesktopItem = ({ href, active, icon: Icon, label, onClick }: DesktopItemProps) => {
    return (
        <div>
            {label}
        </div>
    )
}

export default DesktopItem
