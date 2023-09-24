import Image from "next/image";
import { Inter } from "next/font/google";
import { Web3Button } from "@web3modal/react";
import { Box, Text } from "@chakra-ui/react";
import Header from "@/components/header";

export default function Home() {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen py-2">
			<Header title={"Cabal Protocol"} />
			<div className="page">
				<Box bg="green.900" w={"100%"} maxW={800} className="p-6 rounded-lg">
					<Text textStyle={"title"}>Welcome to Cabal Labs</Text>
					<Text textStyle={"subTitle"}>Welcome to Cabal Labs</Text>
					<Web3Button />
				</Box>
			</div>
		</div>
	);
}
