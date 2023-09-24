import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { PiWalletDuotone } from "react-icons/pi";

export default function RewardReimbursementSwap() {
	return (
		<Box bg={"green.400"} className="flex-1 w-full p-6 rounded-md x lg:w-128">
			<Text textStyle="title" color={"blue.800"}>
				Process Reward Reimbursement Swap
			</Text>
			<PiWalletDuotone size={60} className={"text-blue-800"} />
			<Text>Your Prize Amount</Text>
			<PiWalletDuotone size={60} className={"text-green-800"} />
			<Text>Your Reimbursement Amount</Text>
		</Box>
	);
}
