import { Box, Text } from "@chakra-ui/react";
import { IEvent } from "../pages/events";
import { useRouter } from "next/router";

export default function EventCard({
	id,
	title,
	startDate,
	endDate,
	url,
}: IEvent) {
	const router = useRouter();
	return (
		<Box
			onClick={() => {
				router.push(`/events/${id}`);
			}}
			key={id}
			bg={"green.800"}
			width={"lg"}
			h={300}
			className="flex flex-col w-min-xl cursor-pointer">
			<a href={url} className="p-4 ml-auto ">
				<Text textStyle={"link"}>Hackathon Link</Text>
			</a>
			<Box className="mt-auto">
				<Text textStyle={"label"} className="p-3">
					{startDate} - {endDate}
				</Text>
			</Box>
			<Box bg="green.900" className="p-4">
				<Text textStyle={"subTitle"}>{title}</Text>
			</Box>
		</Box>
	);
}
