"use client";

import Avatar from "@/app/components/Avatar";
import useConversation from "@/app/hooks/useConversation";
import { FullMessageType } from "@/types";
import axios from "axios";
import clsx from "clsx";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import ImageModal from "./ImageModal";

interface MessageBoxProps {
	isLast: boolean;
	data: FullMessageType;
}

const MessageBox: FC<MessageBoxProps> = ({ data, isLast }) => {
	const [imageModalOpen, setImageModalOpen] = useState(false);
	const session = useSession();
	const { conversationId } = useConversation();
	const isOwn = session?.data?.user?.email === data?.sender?.email;
	const seenList = (data.seen || [])
		.filter(user => user.email !== data.sender?.email)
		.map(user => user.name)
		.join(", ");

	// Custom dynamic CSS classes
	const container = clsx("flex gap-3 p-4", isOwn && "justify-end");
	const avatar = clsx(isOwn && "order-2");
	const body = clsx("flex flex-col gap-2", isOwn && "items-end");
	const message = clsx("text-sm w-fit overflow-hidden", isOwn ? "bg-sky-500 text-white" : "bg-gray-100", data.image ? "rounded-md p-0" : "rounded-full p-2");

	useEffect(() => {
		axios.post(`/api/conversations/${conversationId}/seen`);
	}, [conversationId]);

	return (
		<div className={container}>
			<div className={avatar}>
				<Avatar user={data.sender} inInbox />
			</div>
			<div className={body}>
				<div className="flex items-center gap-1">
					<div className="text-sm text-gray-500">{data.sender.name}</div>
					<div className="text-xs text-gray-400">{format(new Date(data.createdAt), "p")}</div>
				</div>
				<div className={message}>
					<ImageModal 
						src={data.image!} 
						isOpen={imageModalOpen} 
						onClose={() => setImageModalOpen(false)} 
					/>
					{data.image ? (
						<Image
							onClick={() => setImageModalOpen(true)}
							alt="Image"
							height="288"
							width="288"
							src={data.image}
							className="object-cover cursor-pointer hover:scale-110 transition duration-300 translate"
						/>
					) : (
						<div>{data.body}</div>
					)}
				</div>
				{isLast && isOwn && seenList.length > 0 && <div className="text-xs font-light text-gray-500">{`Seen by ${seenList}`}</div>}
			</div>
		</div>
	);
};

export default MessageBox;
