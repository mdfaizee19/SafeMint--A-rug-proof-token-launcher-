import React, { useState } from "react";
import { ethers } from "ethers";
import { LAUNCHPAD_ABI } from "../utils/contract";
import { LAUNCHPAD_ADDRESS } from "../config";
import { QIE_EXPLORER } from "../config";

export default function LaunchForm({ provider, account }) {
  const [name, setName] = useState("MyToken");
  const [symbol, setSymbol] = useState("MTK");
  const [supply, setSupply] = useState("1000000"); // whole tokens
  const [liquidity, setLiquidity] = useState("0.5"); // amount of native coin to pair (demo)
  const [lockMonths, setLockMonths] = useState(6);
  const [image, setImage] = useState(null);
  const [step, setStep] = useState(0); // 0 = form, 1 = waiting tx, 2 = success
  const [txHash, setTxHash] = useState("");
  const [launchedToken, setLaunchedToken] = useState("");
  const [error, setError] = useState("");

  const onUploaded = (res) => {
    setImage(res);
  };

  async function submitLaunch() {
    if (!provider) return alert("Connect wallet");
    setError("");
    try {
      setStep(1);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(LAUNCHPAD_ADDRESS, LAUNCHPAD_ABI, signer);

      // parse units
      const supplyWei = ethers.parseUnits(supply, 18); // assumes token 18 decimals
      const liquidityWei = ethers.parseEther(liquidity);

      // call launchFairToken(name,symbol,supply,liquidity,lockMonths) payable
      const tx = await contract.launchFairToken(name, symbol, supplyWei, liquidityWei, lockMonths, { value: liquidityWei });
      setTxHash(tx.hash);
      await tx.wait();

      // frontend tries to parse TokenLaunched event from receipt
      const receipt = await provider.getTransactionReceipt(tx.hash);
      // parse events by interface:
      try {
        const iface = new ethers.Interface(LAUNCHPAD_ABI);
        let tokenAddr = "";
        for (const log of receipt.logs) {
          try {
            const parsed = iface.parseLog(log);
            if (parsed && parsed.name === "TokenLaunched") {
              tokenAddr = parsed.args[1] || parsed.args.token || parsed.args[0];
              break;
            }
          } catch (e) {
            // ignore parse errors
          }
        }
        setLaunchedToken(tokenAddr || "unknown");
      } catch (e) {
        console.warn("Couldn't parse event:", e);
      }

      setStep(2);
    } catch (e) {
      console.error(e);
      setError(e?.message || String(e));
      setStep(0);
    }
  }

  return (
    <div className="p-6 bg-white/6 rounded-lg">
      {step === 0 && (
        <>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <input value={name} onChange={e => setName(e.target.value)} className="p-3 rounded bg-white/6" placeholder="Token Name" />
            <input value={symbol} onChange={e => setSymbol(e.target.value)} className="p-3 rounded bg-white/6" placeholder="Symbol" />
            <input value={supply} onChange={e => setSupply(e.target.value)} className="p-3 rounded bg-white/6" placeholder="Total Supply" />
            <input value={liquidity} onChange={e => setLiquidity(e.target.value)} className="p-3 rounded bg-white/6" placeholder="Native QIE for Liquidity" />
          </div>

          <div className="mb-4">
            <label className="block text-sm mb-1">Upload Token Image (optional)</label>
            <input type="file" accept="image/*" onChange={async e => {
              const f = e.target.files?.[0];
              if (!f) return;
              const url = URL.createObjectURL(f);
              setImage({ url, cid: "local" });
            }} />
            {image?.url && <img src={image.url} alt="preview" className="w-28 h-28 mt-2 rounded" />}
          </div>

          <div className="flex items-center gap-3 mb-4">
            <label className="text-sm">Lock months</label>
            <select value={lockMonths} onChange={e => setLockMonths(Number(e.target.value))} className="bg-white/6 p-2 rounded">
              <option value={6}>6</option>
              <option value={12}>12</option>
            </select>
          </div>

          {error && <div className="text-red-400 mb-3">{error}</div>}

          <button onClick={submitLaunch} className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded">
            Launch & Lock {lockMonths} months
          </button>
        </>
      )}

      {step === 1 && (
        <div className="text-center py-8">
          <div className="text-lg mb-2">Transaction submitted</div>
          <div className="text-sm text-gray-300">Waiting for confirmation…</div>
          {txHash && <a className="block mt-3 text-cyan-300" href={`${QIE_EXPLORER}/tx/${txHash}`} target="_blank" rel="noreferrer">View tx</a>}
        </div>
      )}

      {step === 2 && (
        <div className="text-center py-6">
          <div className="text-lg font-bold text-green-300 mb-2">Launched ✅</div>
          {launchedToken && (
            <a className="text-cyan-300 underline" href={`${QIE_EXPLORER}/token/${launchedToken}`} target="_blank" rel="noreferrer">
              View token
            </a>
          )}
        </div>
      )}
    </div>
  );
}
