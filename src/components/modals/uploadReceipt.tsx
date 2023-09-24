import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
	Box,
	Input,
} from "@chakra-ui/react";
import { useState } from "react";

type UploadReceiptProps = {
	isOpen: boolean;
	onClose: () => void;
};

export default function UploadReceipt({ isOpen, onClose }: UploadReceiptProps) {
	const [file, setFile] = useState(null);
	const handleFileChange = (e) => {
		const selectedFile = e.target.files[0];
		const fileType = selectedFile.name.split(".").pop();

		if (fileType === "eml" || fileType === "pdf") {
			setFile(selectedFile);
		} else {
			alert("Invalid file type. Please upload an email file or a PDF.");
		}
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Submit Expense Report</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<Box
						bg={"green.400"}
						className="flex-1 w-full p-6 rounded-md x lg:w-128">
						<label htmlFor="title" className="text-blue-950">
							Expense Title
						</label>
						<Input
							outlineColor={"blue.800"}
							color="blue.700"
							type="text"
							id="title"
							name="title"
							marginBlockStart={3}
							marginBlockEnd={6}
						/>
						<label htmlFor="description" className="text-blue-950">
							Description (optional)
						</label>
						<Input
							outlineColor={"blue.800"}
							color="blue.700"
							type="text"
							id="description"
							name="description"
							marginBlockStart={3}
							marginBlockEnd={6}
							placeholder="Anything we should be aware of"
						/>

						<label htmlFor="links" className="text-blue-950">
							Links: Portfolio, Lens, Github, ect,
						</label>
						<input type="file" onChange={handleFileChange} title="receipt" />
					</Box>
				</ModalBody>
				<ModalFooter>
					<Button colorScheme="green" onClick={onClose} className="w-full">
						Submit
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}
