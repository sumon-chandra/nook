"use client";

import { FC } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface MessageInputProps {
	id: string;
	register: UseFormRegister<FieldValues>;
	errors: FieldErrors<FieldValues>;
	required: boolean;
	placeholder?: string;
	type?: string;
}

const MessageInput: FC<MessageInputProps> = ({
	id,
	errors,
	placeholder,
	register,
	required,
	type,
}) => {
	return (
		<div className="relative w-full">
			<input
				type={type}
				id={id}
				autoComplete={id}
				{...register(id, { required })}
				placeholder={placeholder}
				className="text-black font-light p-2 bg-neutral-100 w-full rounded-full focus:outline-none"
			/>
		</div>
	);
};

export default MessageInput;
