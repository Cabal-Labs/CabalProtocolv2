/* eslint-disable react/no-unescaped-entities */
import { Box, Button, Checkbox, Input, Text, Textarea } from "@chakra-ui/react";
import { data } from "../pages/events";
interface IApplicationForm {
	id: string;
}
export default function ApplicationForm({ id }: IApplicationForm) {
	return (
		<div className="page">
			<form>
				<div className="flex flex-col gap-6 lg:flex-row flex-nowrap lg:flex-wrap">
					<Box
						bg={"green.400"}
						className="flex-1 w-full p-6 rounded-md x lg:w-128">
						<label htmlFor="name" className="text-blue-950">
							Name
						</label>
						<Input
							outlineColor={"blue.800"}
							color="blue.700"
							type="text"
							id="name"
							name="name"
							marginBlockStart={3}
							marginBlockEnd={6}
						/>
						<label htmlFor="address" className="text-blue-950">
							Wallet Address
						</label>
						<Input
							outlineColor={"blue.800"}
							color="blue.700"
							type="text"
							id="address"
							name="address"
							marginBlockStart={3}
							marginBlockEnd={6}
						/>
						<label htmlFor="links" className="text-blue-950">
							Links: Portfolio, Lens, Github, ect,
						</label>
						<Textarea
							outlineColor={"blue.800"}
							color="blue.700"
							id="links"
							name="links"
							marginBlockStart={3}
							marginBlockEnd={6}
						/>
					</Box>
					<div className="flex flex-col flex-1 w-full gap-6 lg:w-128">
						<Box bg={"green.400"} className="p-6 rounded-md">
							<div className="flex flex-row gap-3">
								<div>
									<label htmlFor="departure_airport" className="text-blue-950">
										Where are you flying from?
									</label>
									<Input
										outlineColor={"blue.800"}
										color="blue.700"
										type="text"
										id="departure_airport"
										name="departure_airport"
										marginBlockStart={3}
										marginBlockEnd={6}
									/>
								</div>
								<div>
									<label
										htmlFor="destination_airport"
										className="text-blue-950">
										Where are you flying to?
									</label>
									<Input
										disabled
										outlineColor={"blue.800"}
										color="blue.700"
										type="text"
										value={data[parseInt(id)].recommended_airport}
										id="destination_airport"
										name="destination_airport"
										marginBlockStart={3}
										marginBlockEnd={6}
									/>
								</div>
							</div>
							<div>
								<Text
									textStyle={"subTitle"}
									color={"green.900"}
									fontWeight={"bold"}>
									You're eligible for up to $390 in travel reimbursement
								</Text>
							</div>

							<div>
								<Text textStyle={"label"} color={"blue.800"}>
									Departure Date: {data[0].startDate}
								</Text>
							</div>
						</Box>
						<div className="flex flex-col gap-2 ">
							<Checkbox
								outlineColor={"blue.800"}
								color="blue.50"
								type="checkbox"
								id="terms_and_conditions"
								name="terms_and_conditions">
								I agree to the terms and conditions
							</Checkbox>
							<Checkbox
								outlineColor={"blue.800"}
								color="blue.50"
								type="checkbox"
								id="terms_and_conditions"
								name="terms_and_conditions">
								I understand that I will be expected to return a portion of my
								hacking bounty
							</Checkbox>
							<Checkbox
								outlineColor={"blue.800"}
								color="blue.50"
								type="checkbox"
								id="terms_and_conditions"
								name="terms_and_conditions">
								I already been accepted to the {data[parseInt(id)].title}{" "}
								hackathon
							</Checkbox>
						</div>
						<Button>Apply</Button>
					</div>
				</div>
			</form>
		</div>
	);
}
