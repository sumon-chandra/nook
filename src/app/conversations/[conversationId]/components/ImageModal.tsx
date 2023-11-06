"use client";

import Modal from "@/app/components/Modal";
import Image from "next/image";
import { FC } from "react";

interface ImageModalProps {
	isOpen: boolean;
	onClose: () => void;
	src: string;
}

const ImageModal: FC<ImageModalProps> = ({ src, isOpen, onClose }) => {
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<div className="h-96 w-96">
				<Image alt="Image" className="object-contain" src={src} fill />
			</div>
		</Modal>
	);
};

export default ImageModal;
