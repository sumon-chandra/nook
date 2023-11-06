"use client";

import { User } from "@prisma/client";
import { FC, useState } from "react";
import Modal from "../Modal";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "sonner";
import Input from "../inputs/input";
import Image from "next/image";
import { CldUploadButton } from "next-cloudinary";
import Button from "../button";

interface SettingModalProps {
	currentUser: User;
	isOpen: boolean;
	onClose: () => void;
}

const SettingModal: FC<SettingModalProps> = ({ onClose, isOpen, currentUser }) => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
			name: currentUser?.name,
			image: currentUser?.image,
		},
	});

	const image = watch("image");

	const handleUpload = (result: any) => {
		setValue("image", result?.info?.secure_url, {
			shouldValidate: true,
		});
	};

	const onSubmit: SubmitHandler<FieldValues> = data => {
		setIsLoading(true);

		axios.post("/api/settings", data)
			.then(() => {
				router.refresh();
				onClose();
			})
			.catch(() => toast.error("Something went wrong!"))
			.finally(() => setIsLoading(false));
	};

	return (
		<Modal onClose={onClose} isOpen={isOpen}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="space-y-12">
					<div className="border-b border-gray-900/10 pb-12">
						<h2 className="text-base font-semibold leading-7 text-gray-900">
							Profile
						</h2>
						<p className="mt-1 text-sm leading-6 text-gray-600">
							Edit your public profile.
						</p>
						<div className="mt-10 flex flex-col gap-y-8">
							<Input
								disabled={isLoading}
								label="Name"
								id="name"
								errors={errors}
								required
								register={register}
							/>
							<div>
								<label
									htmlFor=""
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Photo
								</label>
								<div className="mt-2 flex items-center gap-x-3">
									<Image
										width="48"
										height="48"
										alt="Avatar"
										src={
											image ||
											currentUser?.image ||
											"/images/placeholder.png"
										}
									/>
									<CldUploadButton
										options={{
											maxFiles: 1,
										}}
										onUpload={
											handleUpload
										}
										uploadPreset="yhvjozmx"
									>
										<Button
											type="button"
											secondary
											disabled={
												isLoading
											}
										>
											Change
										</Button>
									</CldUploadButton>
								</div>
							</div>
						</div>
					</div>
					<div className="mt-6 flex items-center justify-end gap-x-6">
						<Button
							type="button"
							disabled={isLoading}
							secondary
							onClick={onClose}
						>
							Cancel
						</Button>
						<Button type="submit" disabled={isLoading}>
							Save
						</Button>
					</div>
				</div>
			</form>
		</Modal>
	);
};

export default SettingModal;
