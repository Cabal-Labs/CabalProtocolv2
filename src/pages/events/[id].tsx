import { Button, Text } from "@chakra-ui/react";
import { data, expenseData } from ".";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import ApplicationForm from "../../components/applicationForm";
import { PiCheckCircleBold, PiClockCountdownFill } from "react-icons/pi";
import ExpenseCard from "../../components/expenseCard";
import { useRouter } from "next/router";
import { Key } from "react";
export default function EventPage() {
	// get id from next.js router
	const { id } = useRouter().query;
	// @ts-expect-error
	let eventData = data[id];

	function handleSubmitReceipt() {}
	if (!eventData) {
		return (
			<div className="page">
				<Text textStyle={"subTitle"}>Error fetching data</Text>
			</div>
		);
	} else {
		return (
			<div className="overflow-y-auto page">
				<div className="w-full h-full overflow-y-scroll">
					<Tabs variant="solid-rounded" colorScheme="blue">
						<div
							className="flex flex-col justify-start w-full align-start"
							id={`event-${id}`}>
							<div id="header" className="w-full p-6 px-12 pt-20 bg-gray-800">
								<Text textStyle={"title"}>{eventData.title}</Text>
								<TabList className="flex flex-row justify-between h-16 gap-4 p-2 overflow-hidden">
									<Tab className="w-12 h-12 border-4 border-green-300 rounded-md"></Tab>
									<Tab className="w-12 h-12 border-4 border-green-300 rounded-md"></Tab>
									<Tab className="w-12 h-12 border-4 border-green-300 rounded-md"></Tab>
									<Tab className="w-12 h-12 border-4 border-green-300 rounded-md"></Tab>
									<Tab className="w-12 h-12 border-4 border-green-300 rounded-md"></Tab>
								</TabList>
							</div>
						</div>

						<TabPanels>
							<TabPanel>
								<div className="flex flex-col items-center justify-center w-full gap-4">
									<Text textStyle="title">Application Form</Text>
									{/* @ts-expect-error */}
									<ApplicationForm id={id} />
								</div>
							</TabPanel>
							<TabPanel>
								<div className="flex flex-col items-center justify-center w-full gap-4">
									<Text textStyle="title">Application Pending</Text>
									<PiClockCountdownFill
										size={120}
										className={"text-green-200"}
									/>
								</div>{" "}
							</TabPanel>
							<TabPanel>
								<div className="flex flex-col items-center justify-center w-full gap-4">
									<Text textStyle="title">Application Accepted</Text>
									<PiCheckCircleBold size={120} className={"text-green-200"} />
									<Button
										onClick={() => handleSubmitReceipt()}
										bg={"blue.800"}
										textColor={"whiteAlpha.800"}
										className="max-w-md">
										Submit a travel expense
									</Button>
								</div>
							</TabPanel>
							<TabPanel>
								<div className="flex flex-col items-center justify-center w-full gap-4">
									<Text textStyle="title">Hacker Dashboard</Text>
									<div className="flex flex-row justify-between w-full align-baseline border-b-2 border-b-blue-600">
										<Text textStyle="subTitle">Travel Expenses</Text>

										<Button
											onClick={() => handleSubmitReceipt()}
											bg={"blue.800"}
											textColor={"whiteAlpha.800"}
											className="max-w-md">
											Submit a travel expense
										</Button>
									</div>
									{expenseData.map((expense) => {
										return (
											<div key={id as Key}>
												<ExpenseCard {...expense} />
											</div>
										);
									})}
								</div>
							</TabPanel>
						</TabPanels>
					</Tabs>
				</div>
			</div>
		);
	}
}
