// src/components/WithdrawConfirm.jsx
import React from "react";
import { motion } from "framer-motion";

export default function WithdrawConfirm({ open, onCancel, onConfirm, busy }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onCancel} />
      <motion.div initial={{ y:20, opacity:0 }} animate={{ y:0, opacity:1 }} className="relative w-full max-w-lg p-6 rounded-xl bg-[#07121b] border border-white/10">
        <h3 className="text-lg font-semibold">Confirm Withdraw</h3>
        <p className="text-sm text-gray-300 mt-2">This will withdraw the locked liquidity back to the owner. This is irreversible for this demo.</p>

        <div className="mt-6 flex gap-3 justify-end">
          <button onClick={onCancel} className="px-4 py-2 rounded bg-white/6">Cancel</button>
          <button onClick={onConfirm} disabled={busy} className="px-4 py-2 rounded bg-gradient-to-r from-green-400 to-emerald-500">
            {busy ? "Withdrawing…" : "Confirm Withdraw"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
