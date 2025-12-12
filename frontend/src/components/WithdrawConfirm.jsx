// src/components/WithdrawConfirm.jsx
import React from "react";
export default function WithdrawConfirm({ open, onCancel, onConfirm, busy }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onCancel}></div>
      <div className="relative p-6 bg-[#0B1628] rounded-xl border border-white/10 text-white">
        <div className="text-lg font-semibold">Confirm Withdraw</div>
        <div className="text-sm text-gray-300 mt-2">This will withdraw the virtual LP (demo). Continue?</div>
        <div className="mt-4 flex gap-3">
          <button onClick={onConfirm} disabled={busy} className="px-4 py-2 bg-gradient-to-r from-green-400 to-emerald-600 rounded">Yes</button>
          <button onClick={onCancel} className="px-4 py-2 bg-white/10 rounded">Cancel</button>
        </div>
      </div>
    </div>
  );
}
