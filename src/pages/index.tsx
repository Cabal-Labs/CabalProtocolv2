import Image from "next/image";
import { Inter } from "next/font/google";
import { Web3Button } from "@web3modal/react";
import { Box, Button, Text } from "@chakra-ui/react";
import Header from "@/components/header";
import TokenGate from "@/components/tokenGate";
import { useAccount } from "wagmi";
import { useRouter } from "next/router";

export const UNLOCK_NETWORK = 80001;
export const UNLOCK_LOCK_ADDRESS = "0x5e9a795158a2bcb908b56d494467deee97649022";
export const cabalMembershipPaywallConfig = {
	locks: {
		[UNLOCK_LOCK_ADDRESS]: {
			network: UNLOCK_NETWORK,
		},
	},
	skipRecipient: true,
	title: "Join Cabal Labs",
	pessimistic: true,
};
export default function Home() {
	const router = useRouter();
	const { address, isConnected } = useAccount();
	console.log(address, isConnected);
	return (
		<div className="flex flex-col items-center justify-center min-h-screen py-2">
			<Header title={"Cabal Protocol"} />
			<div className="page">
				<Box bg="green.900" w={"100%"} maxW={800} className="p-6 rounded-lg">
					<Text textStyle={"title"}>Welcome to Cabal Labs</Text>
					<Text textStyle={"subTitle"} className="mb-12">
						Empowering the next generation of Tech
					</Text>
					{isConnected ? (
						<TokenGate
							functionName="balanceOf"
							lockAddress={UNLOCK_LOCK_ADDRESS}
							buyButtonText="Join Cabal Labs"
							config={cabalMembershipPaywallConfig}>
							<>
								<Text>Welcome back, Cabal Member!</Text>
								<Button
									onClick={() => {
										router.push("/events");
									}}>
									Go To Events Dashboard
								</Button>
							</>
						</TokenGate>
					) : (
						<Web3Button />
					)}
				</Box>
			</div>
		</div>
	);
}
