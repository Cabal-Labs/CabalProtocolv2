import "@/styles/globals.css";
import "@/styles/index.css";
import type { AppProps } from "next/app";
import {
	EthereumClient,
	w3mConnectors,
	w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { arbitrum, mainnet, polygon, polygonMumbai } from "wagmi/chains";
import { ChakraBaseProvider } from "@chakra-ui/react";
import theme from "@/styles/chakraTheme";
import Header from "@/components/header";

const chains = [polygonMumbai];
const projectId = "ce12f5ff9702f308e5d504f80dcd7162";

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
	autoConnect: true,
	connectors: w3mConnectors({ projectId, chains }),
	publicClient,
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);
export default function App({ Component, pageProps }: AppProps) {
	return (
		<div id="app">
			<ChakraBaseProvider theme={theme}>
				<WagmiConfig config={wagmiConfig}>
					<>
						<Component {...pageProps} />
					</>
				</WagmiConfig>
			</ChakraBaseProvider>
			<Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
		</div>
	);
}
