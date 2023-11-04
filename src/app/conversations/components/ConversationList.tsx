"use client";

import { FullConversationType } from "@/types";
import { Conversation } from "@prisma/client";
import { FC } from "react";

interface ConversationListProps {
	initialItems: FullConversationType[];
}

const ConversationList: FC<ConversationListProps> = ({ initialItems }) => {
	return (
		<div>
			<div>Conversation</div>
		</div>
	);
};

export default ConversationList;
