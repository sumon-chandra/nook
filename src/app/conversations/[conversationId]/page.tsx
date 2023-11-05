import getConversationById from "@/app/actions/getConversationById";
import getMessages from "@/app/actions/getMessages";
import EmptyState from "@/app/components/EmptyState";
import { FC } from "react";

interface Params {
	conversationId: string;
}

const ConversationId: FC<Params> = async ({ conversationId }) => {
	const conversation = await getConversationById(conversationId);
	const messages = await getMessages(conversationId);

	return (
		<div>
			<h3>Conversation Id!</h3>
		</div>
	);
};

export default ConversationId;
