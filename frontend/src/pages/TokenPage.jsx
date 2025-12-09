// src/pages/TokenPage.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { ethers } from "ethers";
import confetti from "canvas-confetti";

import TrustBadge from "../components/TrustBadge";
import LockTimer from "../components/LockTimer";
import WithdrawConfirm from "../components/WithdrawConfirm";

import { LAUNCHPAD_ADDRESS, QIE_EXPLORER, INDEXER_URL } from "../config";
import { LAUNCHPAD_ABI } from "../abi/LaunchPadABI";
import { withdrawLP as withdrawOnChain } from "../services/launchService";

export default function TokenPage() {
  const { address: tokenAddress } = useParams();

  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showConfirm, setShowConfirm] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  /* Load blockchain info */
  async function loadChainDetails() {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = new ethers.Contract(LAUNCHPAD_ADDRESS, LAUNCHPAD_ABI, provider);

    const d = await contract.getLaunchDetails(tokenAddress);

    return {
      owner: d[0],
      tokenAddress: d[1],
      totalSupply: BigInt(d[2]),
      liquidityQIE: d[3],
      lockMonths: Number(d[4]),
      unlockTime: Number(d[5]),
      trustScore: Number(d[6]),
      withdrawn: Boolean(d[7]),
      imageCid: d[8]
    };
  }

  /* Load indexer details */
  async function loadIndexerDetails() {
    try {
      const res = await fetch(`${INDEXER_URL}/tokens`);
      const list = await res.json();
      return list.find(
        (t) => (t.tokenAddress || t.token).toLowerCase() === tokenAddress.toLowerCase()
      );
    } catch {
      return null;
    }
  }

  /* Unified loader */
  async function loadInfo() {
    try {
      setLoading(true);

      const chain = await loadChainDetails();
      const indexer = await loadIndexerDetails();

      setDetails({
        ...chain,
        ...(indexer || {})
      });

    } catch (err) {
      console.error(err);
      setMessage("Failed to load token details");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadInfo();
  }, [tokenAddress]);

  const locked = details && Date.now() < details.unlockTime * 1000;
  const canWithdraw = details && !locked && !details.withdrawn;

  async function notifyIndexerWithdraw() {
    try {
      const adminKey = import.meta.env.VITE_INDEXER_ADMIN_KEY || "";
      await fetch(`${INDEXER_URL}/tokens/${tokenAddress}/withdraw`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(adminKey ? { "x-admin-key": adminKey } : {})
        }
      });
    } catch (e) {
      console.warn("Indexer withdraw update failed");
    }
  }

  async function handleWithdrawConfirmed() {
    setBusy(true);
    setShowConfirm(false);

    try {
      const res = await withdrawOnChain(tokenAddress);

      setDetails((prev) => ({ ...prev, withdrawn: true }));

      await notifyIndexerWithdraw();

      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });

      setMessage("Withdrawn successfully! TX: " + res.txHash);
    } catch (err) {
      setMessage(err.message || "Withdraw failed");
    } finally {
      setBusy(false);
    }
  }

  if (loading) return <div className="p-8 text-gray-300">Loading token…</div>;

  if (!details)
    return <div className="p-8 text-red-400">Token details not found.</div>;

  return (
    <div className="min-h-screen p-8 text-white bg-gradient-to-b from-[#050b12] to-[#0c1625]">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-8"
        >
          <div>
            <div className="text-2xl font-bold">Token Dashboard</div>
            <div className="text-gray-400 font-mono">{tokenAddress}</div>
          </div>

          <TrustBadge score={details.trustScore} />
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-3xl p-8 bg-white/5 border border-white/10 shadow-xl"
        >
          <div className="grid grid-cols-3 gap-4">

            <div className="stat-box">
              <div className="stat-label">Total Supply</div>
              <div className="stat-value">{details.totalSupply.toString()}</div>
            </div>

            <div className="stat-box">
              <div className="stat-label">Liquidity (virtual)</div>
              <div className="stat-value">{ethers.formatEther(details.liquidityQIE)} QIE</div>
            </div>

            <div className="stat-box">
              <div className="stat-label">Locked Until</div>
              <div className="stat-value">
                {new Date(details.unlockTime * 1000).toLocaleString()}
              </div>
            </div>

          </div>

          {/* Countdown */}
          <div className="mt-6">
            <LockTimer unlockTime={details.unlockTime} />
          </div>

          {/* Buttons */}
          <div className="mt-6 flex gap-4 items-center">
            <button
              disabled={!canWithdraw || busy}
              onClick={() => setShowConfirm(true)}
              className={`btn-primary ${
                !canWithdraw ? "opacity-40 cursor-not-allowed" : ""
              }`}
            >
              {details.withdrawn
                ? "Liquidity Withdrawn"
                : locked
                ? "Locked"
                : busy
                ? "Withdrawing…"
                : "Withdraw Liquidity"}
            </button>

            <a
              href={`${QIE_EXPLORER}/token/${tokenAddress}`}
              target="_blank"
              className="btn-secondary"
            >
              Explorer
            </a>
          </div>

          {message && <div className="mt-4 text-cyan-300">{message}</div>}
        </motion.div>
      </div>

      <WithdrawConfirm
        open={showConfirm}
        onCancel={() => setShowConfirm(false)}
        onConfirm={handleWithdrawConfirmed}
        busy={busy}
      />
    </div>
  );
}
