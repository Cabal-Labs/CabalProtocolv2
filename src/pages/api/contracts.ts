import { ethers, Signer } from "ethers";
import treasuryABI from "../ABIs/treasury.json";
function Contracts(signer: Signer) {
	const treasuryAddress = "0x000000000000000000000000000000";
	const Treasury = new ethers.Contract(treasuryAddress, treasuryABI, signer);

	return {
		Treasury,
	};
}
function createExpenseReport() {}
function voteOnExpenseReport() {}
function getExpenseReportStatus() {}

export {
	Contracts,
	createExpenseReport,
	voteOnExpenseReport,
	getExpenseReportStatus,
};
