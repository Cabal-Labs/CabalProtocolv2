import { Button, Text, useDisclosure } from "@chakra-ui/react";
import { data, expenseData } from ".";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import ApplicationForm from "../../components/applicationForm";
import { PiCheckCircleBold, PiClockCountdownFill } from "react-icons/pi";
import ExpenseCard from "../../components/expenseCard";
import { useRouter } from "next/router";
import { Key, useState } from "react";
import UploadReceipt from "@/components/modals/uploadReceipt";
import RewardReimbursementSwap from "@/components/rewardReimbursementSwap";
import TokenGate from "@/components/tokenGate";
import { UNLOCK_LOCK_ADDRESS, UNLOCK_NETWORK } from "..";
import Header from "@/components/header";

export default function EventPage() {
	// get id from next.js router
	const router = useRouter();
	const { id: _id } = router.query;
	// @ts-expect-error
	const id: string = _id;
	const { isOpen, onOpen, onClose } = useDisclosure();

	// @ts-expect-error
	let eventData = data[id];
	const eventPaywallConfig = {
		locks: {
			[eventData.EVENT_LOCK_ADDRESS]: {
				network: UNLOCK_NETWORK,
			},
		},
		skipRecipient: true,
		title: `Join ${eventData.title}`,
		pessimistic: true,
	};

	function handleSubmitReceipt() {
		onOpen();
	}
	const [tabIndex, setTabIndex] = useState(0);

	const handleTabChange = (index: number) => {
		setTabIndex(index);
	};

	const manuallySetTab = (index: number) => {
		console.log("here");
		setTabIndex(index);
	};
	function handleSubmitForm() {
		manuallySetTab(1);
	}
	if (!eventData) {
		return (
			<div className="page">
				<Text textStyle={"subTitle"}>Error fetching data</Text>
			</div>
		);
	} else {
		return (
			<div className="overflow-y-auto page">
				<Header title={"Event"} />
				<UploadReceipt isOpen={isOpen} onClose={onClose} />
				<div className="w-full h-full overflow-y-scroll">
					<Tabs
						variant="solid-rounded"
						colorScheme="blue"
						index={tabIndex}
						onChange={handleTabChange}>
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
									<ApplicationForm id={id} handleSubmit={handleSubmitForm} />
								</div>
							</TabPanel>
							<TabPanel>
								<div className="flex flex-col items-center justify-center w-full gap-4">
									<Text textStyle="title">Application Pending</Text>
									<PiClockCountdownFill
										size={120}
										className={"text-green-200"}
									/>
									<Text
										textStyle={"subTitle"}
										textAlign="center"
										className="mt-12 mb-4">
										The Cabal Labs Core team is reviewing applications
									</Text>
									<Button
										bg={"yellow.900"}
										size={"lg"}
										textColor={"whiteAlpha.800"}
										className="max-w-md"
										onClick={() => manuallySetTab(2)}>
										Continue Waiting
									</Button>
								</div>{" "}
							</TabPanel>
							<TabPanel>
								<div className="flex flex-col items-center justify-center w-full gap-4">
									<Text textStyle="title">Application Accepted</Text>
									<PiCheckCircleBold size={120} className={"text-green-200"} />
									<TokenGate
										functionName="balanceOf"
										lockAddress={eventData.EVENT_LOCK_ADDRESS}
										buyButtonText="Confirm Your Spot and Mint a Cabal NFT!"
										config={eventPaywallConfig}>
										<Button
											onClick={() => manuallySetTab(3)}
											bg={"green.900"}
											size={"lg"}
											textColor={"whiteAlpha.800"}
											className="max-w-md mt-12">
											Continue to the Expense Dashboard
										</Button>
									</TokenGate>
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
									{/* token gate ==== for admins only  */}
									{expenseData.map((expense) => {
										return (
											<div key={id as Key} className="w-full">
												<ExpenseCard {...expense} />
											</div>
										);
									})}
									{/* end token gate */}
								</div>
							</TabPanel>
							<TabPanel>
								<div className="flex flex-col items-center justify-center w-full gap-4">
									<div>
										<Text textStyle="title">Event Completed</Text>
										<Text textStyle="subTitle">
											Congrats on a successful Hack
										</Text>
									</div>
									<RewardReimbursementSwap />
								</div>
							</TabPanel>
						</TabPanels>
					</Tabs>
				</div>
			</div>
		);
	}
}
