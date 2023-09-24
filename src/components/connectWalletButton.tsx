import "@Biconomy/web3-auth/dist/src/style.css";
import { useState, useEffect, useContext } from "react";
import SocialLogin from "@biconomy/web3-auth";
import { ChainId } from "@biconomy/core-types";
import { ethers } from "ethers";
import { IBundler, Bundler } from "@biconomy/bundler";
import {
	BiconomySmartAccount,
	BiconomySmartAccountConfig,
	DEFAULT_ENTRYPOINT_ADDRESS,
} from "@biconomy/account";
import { IPaymaster, BiconomyPaymaster } from "@biconomy/paymaster";
import { Context } from "../providers/appProvider";
import { Button } from "@chakra-ui/react";
import { useBiconomy } from "../providers/biconomyProvider";
import { useNavigate } from "react-router-dom";
export default function ConnectWalletButton() {
	const navigate = useNavigate();

	const {
		walletAddress,
		setWalletAddress,
		loggedIn,
		setLoggedIn,
		interval,
		enableInterval,
	} = useContext(Context);

	const { sdkRef, setSdkRef, smartAccount, setSmartAccount } = useBiconomy();

	const [loading, setLoading] = useState<boolean>(false);

	const bundler: IBundler = new Bundler({
		bundlerUrl: `https://bundler.biconomy.io/api/v2/80001/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44`,
		chainId: ChainId.POLYGON_MUMBAI,
		entryPointAddress: DEFAULT_ENTRYPOINT_ADDRESS,
	});

	const paymaster: IPaymaster = new BiconomyPaymaster({
		paymasterUrl:
			"https://paymaster.biconomy.io/api/v1/80001/iBmouMEaN.90d77843-6d78-4bbd-8867-2f96cee74002",
	});

	async function login() {
		if (!sdkRef) {
			const socialLoginSDK = new SocialLogin();
			try {
				const signature1 = await socialLoginSDK.whitelistUrl(
					"http://127.0.0.1:5173/"
				);
				await socialLoginSDK.init({
					chainId: ethers.utils.hexValue(ChainId.POLYGON_MUMBAI).toString(),
					network: "testnet",
					whitelistUrls: {
						"http://127.0.0.1:5173/": signature1,
					},
				});
				console.log("social login", socialLoginSDK);
				setSdkRef(socialLoginSDK);
				console.log("ref", sdkRef);
			} catch (e) {
				console.log(e);
			}
		}
		if (sdkRef && !sdkRef.provider) {
			sdkRef.showWallet();
			enableInterval(true);
		} else {
			console.log("need to set up smart account");
			// setupSmartAccount();
		}
	}

	async function setupSmartAccount() {
		if (!sdkRef?.provider) return;
		sdkRef.hideWallet();
		setLoading(true);
		const web3Provider = new ethers.providers.Web3Provider(sdkRef.provider);

		try {
			const biconomySmartAccountConfig: BiconomySmartAccountConfig = {
				signer: web3Provider.getSigner(),
				chainId: ChainId.GOERLI,
				bundler: bundler,
				paymaster: paymaster,
			};
			let biconomySmartAccount = new BiconomySmartAccount(
				biconomySmartAccountConfig
			);
			biconomySmartAccount = await biconomySmartAccount.init();
			console.log("owner: ", biconomySmartAccount.owner);
			console.log(
				"address: ",
				await biconomySmartAccount.getSmartAccountAddress()
			);
			console.log(
				"deployed: ",
				await biconomySmartAccount.isAccountDeployed(
					await biconomySmartAccount.getSmartAccountAddress()
				)
			);

			setSmartAccount(biconomySmartAccount);
			setLoggedIn(true);
			setWalletAddress(biconomySmartAccount.owner);
			setLoading(false);
			navigate("/events");
		} catch (err) {
			console.log("error setting up smart account... ", err);
		}
	}

	// const logout = async () => {
	// 	if (!sdkRef) {
	// 		console.error("Web3Modal not initialized.");
	// 		return;
	// 	}
	// 	await sdkRef.logout();
	// 	sdkRef.hideWallet();
	// 	setSmartAccount(null);
	// 	setLoggedIn(false);
	// 	setWalletAddress("");
	// 	enableInterval(false);
	// };

	// useEffect(() => {
	// 	let configureLogin: any;
	// 	if (interval) {
	// 		configureLogin = setInterval(() => {
	// 			if (!!sdkRef?.provider) {
	// 				// setupSmartAccount();
	// 				clearInterval(configureLogin);
	// 			}
	// 		}, 1000);
	// 	}
	// }, [interval]);
	return (
		<div className="flex flex-col justify-start max-w-lg gap-8 pt-48 mx-auto">
			<h1 className="text-3xl text-center">Login</h1>
			<Button role="button" onClick={() => login()} variant={"outline"}>
				Login with social
			</Button>
			{loading && <p>Loading...</p>}
			{smartAccount && (
				<>
					{/* <p>Smart Account Address: {smartAccount.address}</p> */}
					{/* <Button role="button" onClick={() => logout()}>
						logout
					</Button> */}
				</>
			)}

			{loggedIn && (
				<>
					<p>Logged in as {walletAddress}</p>
					{/* <Button onClick={() => logout()}>Log out</Button> */}
				</>
			)}
		</div>
	);
}
