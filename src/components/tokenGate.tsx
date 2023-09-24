import { useAccount, useContractRead } from "wagmi";
import { PublicLockV13 } from "@unlock-protocol/contracts";
import { Button } from "@chakra-ui/react";
import { Paywall } from "@unlock-protocol/paywall";
import { useState } from "react";

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
	config,
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

	async function handleBuyMembership() {
		console.log("handleBuyMembership");
		const provider = await connector!.getProvider();
		const paywall = new Paywall(provider, config);
		const result = await paywall.loadCheckoutModal(config);
		if (result.hash) setHash(hash);
	}
	if (isLoading) {
		return <div>Loading...{address}</div>;
	} else if (isError) {
		return <div>Error...{address}</div>;
	} else if (data) {
		if (hash) {
			return <div>Please wait a moment and refresh</div>;
		} else {
			return (
				<Button onClick={() => handleBuyMembership()}>{buyButtonText}</Button>
			);
		}
	} else {
		return <>{children}</>;
	}
}
