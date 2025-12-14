import { ethers } from "ethers"
import LaunchFactoryABI from "../abi/LaunchFactory.json"
import { FACTORY_ADDRESS } from "../config"

export async function launchToken(form) {
  console.log("🚀 launchToken called")
  console.log("📦 Raw form:", form)

  if (!window.ethereum) {
    throw new Error("Wallet not found")
  }

  const provider = new ethers.BrowserProvider(window.ethereum)
  const signer = await provider.getSigner()

  const factory = new ethers.Contract(
    FACTORY_ADDRESS,
    LaunchFactoryABI,
    signer
  )

  const supply = BigInt(form.supply)
  const lockMonths = BigInt(form.lockMonths)
  const valueWei = ethers.parseEther(String(form.liquidityEth || "0"))

  const tx = await factory.launchToken(
    form.name,
    form.symbol,
    supply,
    lockMonths,
    {
      value: valueWei,
      gasLimit: 3_000_000,
    }
  )

  console.log("⏳ TX sent:", tx.hash)

  // ✅ ADD: persist token for frontend portfolio
  const token = {
    address: "0xSIM" + tx.hash.slice(2, 10), // simulated address
    name: form.name,
    symbol: form.symbol,
    liquidity: Number(form.liquidityEth),
    trust: "GREEN",
  }

  const existing = JSON.parse(localStorage.getItem("tokens") || "[]")
  localStorage.setItem("tokens", JSON.stringify([token, ...existing]))

  return token.address
}