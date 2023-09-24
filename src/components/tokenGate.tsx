import { useAccount, useContractRead } from "wagmi";
import { BigNumber } from "ethers";
import { PublicLockV13 } from "@unlock-protocol/contracts";
import { Button } from "@chakra-ui/react";
import { Paywall } from "@unlock-protocol/paywall";
import { useState } from "react";
import networks from "@unlock-protocol/networks";

interface ITokenGate {
	children: React.ReactNode;
	functionName: string;
	lockAddress: `0x${string}`;
	config: any;
	buyButtonText: string;
}
export default function TokenGate({
	children,
	functionName,
	lockAddress,
	config: paywallConfig,
	buyButtonText,
}: ITokenGate) {
	const { address, connector } = useAccount();
	const [hash, setHash] = useState("");
	const { data, isError, isLoading } = useContractRead({
		address: lockAddress,
		abi: PublicLockV13.abi,
		functionName: functionName,
		args: [address],
		watch: true,
	});
	console.log("data", data, typeof data);

	async function handleBuyMembership() {
		console.log("handleBuyMembership");
		const provider = await connector!.getProvider();
		const paywall = new Paywall(paywallConfig, networks, provider);
		const result = await paywall.loadCheckoutModal(paywallConfig);
		console.log("paywall result", result);
	}
	const normalNumber: number = Number(data); // Replace "0" with the actual value

	if (isLoading) {
		return <div>Loading...{address}</div>;
	} else if (isError) {
		return <div>Error...{address}</div>;
	} else if (normalNumber == 0) {
		return (
			<Button onClick={() => handleBuyMembership()}>{buyButtonText}</Button>
		);
	}

	return <>{children}</>;
}
