// frontend/src/components/TrustBadge.jsx
import React from "react";

export default function TrustBadge({ score = 2 }) {
  const map = {
    2: { label: "GREEN", color: "text-green-400", bg: "bg-green-900/20" },
    1: { label: "YELLOW", color: "text-yellow-300", bg: "bg-yellow-900/20" },
    0: { label: "RED", color: "text-red-400", bg: "bg-red-900/20" }
  };
  const s = map[score] || map[1];
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${s.color} ${s.bg} border border-white/10`}>
      {s.label}
    </span>
  );
}
