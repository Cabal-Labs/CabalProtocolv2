// @ts-nocheck
import { EthersAdapter } from "@safe-global/protocol-kit";
import SafeApiKit from "@safe-global/api-kit";
import { SafeFactory } from "@safe-global/protocol-kit";
import { SafeAccountConfig } from "@safe-global/protocol-kit";
import { SafeTransactionDataPartial } from "@safe-global/safe-core-sdk-types";
import dotenv from "dotenv";
import { ethers, Signer } from "ethers";
function Contracts(signer: Signer) {
<<<<<<< HEAD
  const treasuryAddress = "0x000000000000000000000000000000";
  const Treasury = new ethers.Contract(treasuryAddress, treasuryABI, signer);

  return {
    Treasury,
  };
=======
	const treasuryAddress = "0x000000000000000000000000000000";
	// const Treasury = new ethers.Contract(treasuryAddress, , signer);

	return {};
>>>>>>> refs/remotes/origin/main
}
// async function CreateTransaction({ amount, destination, walletClient }) {
// 	const treasuryAddress = "0x00";
// }

const safeAddress = 0x2bd5f296448c32825186841e457b361fd2d0f93b;
const smart_contract = 0x2bd5f296448c3282518684;
const destination = smart_contract;

// https://chainlist.org/?search=goerli&testnets=true
const RPC_URL = "https://eth-goerli.public.blastapi.io";
const provider = new ethers.providers.JsonRpcProvider(RPC_URL);

// Initialize signers
const owner1Signer = new ethers.Wallet(process.env.JERRY, provider);
const owner2Signer = new ethers.Wallet(process.env.ETH_TEST_2, provider);

const ethAdapterOwner1 = new EthersAdapter({
  ethers,
  signerOrProvider: owner1Signer,
});

const safeSdkOwner1 = await Safe.create({
  ethAdapter: ethAdapterOwner1,
  safeAddress,
});

const ethAdapterOwner2 = new EthersAdapter({
  ethers,
  signerOrProvider: owner2Signer,
});

const safeSdkOwner2 = await Safe.create({
  ethAdapter: ethAdapterOwner2,
  safeAddress,
});

const txServiceUrl = "https://safe-transaction-goerli.safe.global";
const safeService = new SafeApiKit({
  txServiceUrl,
  ethAdapter: ethAdapterOwner1,
});

const amount = ethers.utils.parseUnits("0.005", "ether").toString();

const safeTransactionData: SafeTransactionDataPartial = {
  to: destination,
  data: "0x",
  value: amount,
};
// Create a Safe transaction with the provided parameters
const safeTransaction = await safeSdkOwner1.createTransaction({
  safeTransactionData,
});

// Deterministic hash based on transaction parameters
const safeTxHash = await safeSdkOwner1.getTransactionHash(safeTransaction);

// Sign transaction to verify that the transaction is coming from owner 1
const senderSignature = await safeSdkOwner1.signTransactionHash(safeTxHash);

await safeService.proposeTransaction({
  safeAddress,
  safeTransactionData: safeTransaction.data,
  safeTxHash,
  senderAddress: await owner1Signer.getAddress(),
  senderSignature: senderSignature.data,
});

const pendingTransactions = await safeService.getPendingTransactions(
  safeAddress
).results;

// Assumes that the first pending transaction is the transaction you want to confirm
const transaction = pendingTransactions[0];
const safeTxHash = transaction.safeTxHash;

const signature = await safeSdkOwner2.signTransactionHash(safeTxHash);

const response = await safeService.confirmTransaction(
  safeTxHash,
  signature.data
);

const safeTransaction = await safeService.getTransaction(safeTxHash);
const executeTxResponse = await safeSdk.executeTransaction(safeTransaction);
const receipt = await executeTxResponse.transactionResponse?.wait();

console.log("Transaction executed:");
console.log(`https://goerli.etherscan.io/tx/${receipt.transactionHash}`);

export { Contracts };
