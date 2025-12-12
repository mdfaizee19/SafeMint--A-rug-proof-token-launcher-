import { ethers } from "ethers";
import launchpadAbi from "../../abi/launchpad.json";

const ADDRESS = "0x65d52515dcE4e8481aD7aA889F1343d8a0FE0B8d";
const RPC = "https://rpc1testnet.qie.digital";

// REAL QIE PROVIDER
export const provider = new ethers.JsonRpcProvider(RPC);

// REAL CONTRACT INSTANCE
export const launchpad = new ethers.Contract(ADDRESS, launchpadAbi, provider);

// WRITE function (requires wallet signer)
export function writeLaunchpad(signer) {
  return new ethers.Contract(ADDRESS, launchpadAbi, signer);
}
