// src/services/launchService.js
import { ethers } from "ethers";
import { LAUNCHPAD_ABI } from "../abi/LaunchPadABI";
import { LAUNCHPAD_ADDRESS, INDEXER_URL } from "../config";

/* -----------------------------------------------------------
   Helper: signer + contract
----------------------------------------------------------- */
async function getContractWithSigner() {
  if (!window.ethereum) throw new Error("Wallet not detected");

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  return {
    provider,
    signer,
    contract: new ethers.Contract(LAUNCHPAD_ADDRESS, LAUNCHPAD_ABI, signer)
  };
}

/* -----------------------------------------------------------
   Save launch to Indexer (optional but recommended)
----------------------------------------------------------- */
async function saveToIndexer(data) {
  try {
    if (!INDEXER_URL) return;

    await fetch(`${INDEXER_URL}/tokens`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
  } catch (err) {
    console.warn("Indexer save failed:", err);
  }
}

/* -----------------------------------------------------------
   Launch Fair Token
----------------------------------------------------------- */
export async function launchToken({
  name,
  symbol,
  supply,
  liquidity,
  lockMonths,
  imageCid
}) {
  if (!name || !symbol) throw new Error("Invalid name or symbol");
  if (!supply || isNaN(Number(supply))) throw new Error("Invalid supply");
  if (!liquidity || isNaN(Number(liquidity))) throw new Error("Invalid liquidity");

  const { contract, signer } = await getContractWithSigner();

  const supplyBN = BigInt(supply);
  const liquidityWei = ethers.parseEther(String(liquidity));

  const tx = await contract.launchFairToken(
    name,
    symbol,
    supplyBN,
    liquidityWei,
    lockMonths,
    imageCid || "",
    { value: liquidityWei }
  );

  const receipt = await tx.wait();

  // Extract event data
  const iface = new ethers.Interface(LAUNCHPAD_ABI);

  let tokenAddress = null;
  let unlockTime = null;

  for (const log of receipt.logs) {
    try {
      const parsed = iface.parseLog(log);
      if (parsed.name === "Launched") {
        tokenAddress = parsed.args.token;
        unlockTime = Number(parsed.args.unlockTime);
      }
    } catch {}
  }

  // Store to indexer
  await saveToIndexer({
    tokenAddress,
    totalSupply: supplyBN.toString(),
    liquidityQIE: liquidityWei.toString(),
    lockMonths,
    unlockTime,
    trustScore: 2,
    imageCid,
    timestamp: Math.floor(Date.now() / 1000),
    owner: await signer.getAddress()
  });

  return { txHash: tx.hash, tokenAddress, unlockTime };
}

/* -----------------------------------------------------------
   Withdraw LP (virtual)
----------------------------------------------------------- */
export async function withdrawLP(tokenAddress) {
  const { contract } = await getContractWithSigner();
  const tx = await contract.withdrawLP(tokenAddress);
  const receipt = await tx.wait();
  return { txHash: tx.hash, receipt };
}
