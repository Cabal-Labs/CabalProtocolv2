import Image from "next/image";
import { Inter } from "next/font/google";
import { Web3Button } from "@web3modal/react";
import { Box, Text } from "@chakra-ui/react";
import Header from "@/components/header";
import TokenGate from "@/components/tokenGate";
import { useAccount } from "wagmi";

export const UNLOCK_NETWORK = 5;
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
	const { address, isConnected } = useAccount();
	console.log(address, isConnected);
	return (
		<div className="flex flex-col items-center justify-center min-h-screen py-2">
			<Header title={"Cabal Protocol"} />
			<div className="page">
				<Box bg="green.900" w={"100%"} maxW={800} className="p-6 rounded-lg">
					<Text textStyle={"title"}>Welcome to Cabal Labs</Text>
					<Text textStyle={"subTitle"}>Welcome to Cabal Labs</Text>
					{isConnected ? (
						<TokenGate
							functionName="balanceOf"
							lockAddress={UNLOCK_LOCK_ADDRESS}
							buyButtonText="Join Cabal Labs"
							config={cabalMembershipPaywallConfig}>
							<Web3Button />
						</TokenGate>
					) : (
						<Web3Button />
					)}
					<Text>Connected to {address}</Text>
				</Box>
			</div>
		</div>
	);
}
