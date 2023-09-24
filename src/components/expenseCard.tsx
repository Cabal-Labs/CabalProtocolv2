import { Badge, Button, Stack, Text } from "@chakra-ui/react";
import { IExpense } from "../pages/events";

export default function ExpenseCard({
	title,
	amount,
	requester,
	id,
	date,
	status,
}: IExpense) {
	function badgeColorScheme(status: string | undefined) {
		switch (status) {
			case "approved":
				return "green";
			case "rejected":
				return "red";
			case "pending":
				return "yellow";
			default:
				return "gray";
		}
	}
	return (
		<div
			id={`expense-card-${id}`}
			className="w-full p-4 rounded-sm cursor-pointer hover:bg-green-800">
			<div className="flex flex-row items-start justify-between w-full">
				<div id="expense-content">
					<Text textStyle={"subTitle"} fontWeight={"bold"}>
						${amount} for {title}
					</Text>
					<div className="flex flex-row items-center justify-start gap-2">
						<Text textStyle={"label"} fontWeight={"light"}>
							{requester}
						</Text>
						<Text textStyle={"label"} fontWeight={"light"}>
							|
						</Text>
						<Text textStyle={"label"} fontWeight={"light"}>
							{date}
						</Text>
						<Text textStyle={"label"} fontWeight={"light"}>
							|
						</Text>
						<Text textStyle={"label"} fontWeight={"light"}>
							View Receipt
						</Text>
					</div>
				</div>
				<div className="flex flex-col items-end gap-3">
					<Badge variant={"solid"} colorScheme={badgeColorScheme(status)}>
						{status}
					</Badge>
					<Stack direction={"row"} spacing={4}>
						<Button colorScheme="green">Approve</Button>
						<Button colorScheme="red">Reject</Button>
					</Stack>
				</div>
			</div>
		</div>
	);
}
