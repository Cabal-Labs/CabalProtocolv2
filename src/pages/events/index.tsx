import { Text } from "@chakra-ui/react";
import EventCard from "../../components/eventCard";
import Header from "@/components/header";
export interface IEvent {
	id: number;
	title: string;
	startDate: string;
	endDate: string;
	url: string;
	location?: string;
	recommended_airport?: string;
	expenses?: IExpense[];
}
export interface IExpense {
	id: number;
	title: string;
	requester: string; // wallet address
	amount: number; // measured in usd
	date?: string;
	status?: "rejected" | "approved" | "pending";
}
export const expenseData: IExpense[] = [
	{
		id: 1,
		title: "Flight",
		requester: "0x1234",
		amount: 500,
		date: "2021-11-11",
		status: "approved",
	},
	{
		id: 2,
		title: "Flight",
		requester: "0x1234",
		amount: 500,
		date: "2021-11-11",
		status: "pending",
	},
];
export const data: IEvent[] = [
	{
		id: 1,
		title: "ETH  NYC 2023",
		startDate: "2023-11-11",
		endDate: "2023-11-11",
		url: "https://ethglobal.com/ETHNYC",
		location: "New York City",
		recommended_airport: "JFK",
	},
	{
		id: 1,
		title: "ETH  NYC 2023",
		startDate: "2023-11-11",
		endDate: "2023-11-11",
		url: "https://ethglobal.com/ETHNYC",
	},
];
// const fetchPosts = async () => {
// 	return {
// 		isLoading: false,
// 		isError: false,
// 		data,
// 	};
// };
export default function EventsPage() {
	// const { data, isLoading, isError } = useQuery("posts", fetchPosts);

	// if (isLoading)
	// 	return (
	// 		<div className="page">
	// 			<Text textStyle={"subTitle"}>Loading...</Text>
	// 		</div>
	// 	);
	// if (isError)
	// 	return (
	// 		<div className="page">
	// 			<Text textStyle={"subTitle"}>Error fetching data</Text>
	// 		</div>
	// 	);
	return (
		<div className="page">
			<div
				id="event-container"
				className="flex flex-col justify-start w-full h-full p-12 align-start w-max-2xl">
				<Header title={"Cabal Protocol"} />
				<Text textStyle={"title"} className="pb-8">
					Upcoming Events
				</Text>
				<ul className="flex flex-row flex-wrap w-full gap-6">
					{data.map((event) => (
						<li key={event.id}>
							<EventCard {...event} />
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
