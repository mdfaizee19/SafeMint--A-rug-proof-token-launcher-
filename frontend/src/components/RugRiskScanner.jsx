// components/RugRiskScanner.jsx
export default function RugRiskScanner({ score = 50 }) {
  const color = score < 40 ? "bg-emerald-600" : score < 70 ? "bg-yellow-500" : "bg-rose-600";
  return (
    <div className="p-3 rounded-lg border bg-neutral-900/30">
      <div className="text-xs text-gray-300">Rug Risk</div>
      <div className={`mt-2 px-3 py-1 rounded-full ${color} text-black font-semibold`} style={{ width: "5.5rem", textAlign: "center" }}>
        {score}%
      </div>
    </div>
  );
}
