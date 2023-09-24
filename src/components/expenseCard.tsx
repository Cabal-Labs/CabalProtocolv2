import { Badge, Text } from "@chakra-ui/react";
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
						{amount} {title}
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
					</div>
				</div>
				<Badge variant={"solid"} colorScheme={badgeColorScheme(status)}>
					{status}
				</Badge>
			</div>
		</div>
	);
}
