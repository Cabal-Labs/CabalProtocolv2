import { createContext } from "react";
import AllData, { Data } from "./appContext";

export const Context = createContext<Data>({
	loggedIn: false,
	setLoggedIn: (boolean) => {},
	walletAddress: "",
	setWalletAddress: (string) => {},
	interval: null,
	enableInterval: (boolean) => {},
});

export const Provider = ({ children }: any) => {
	const data = AllData();
	return <Context.Provider value={data}>{children}</Context.Provider>;
};
