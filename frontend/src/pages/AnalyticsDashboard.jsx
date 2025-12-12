// components/AnalyticsDashboard.jsx
import TokenCompare from "./TokenCompare";
import LiquidityHeatmap from "./LiquidityHeatmap";

export default function AnalyticsDashboard() {
  return (
    <div className="space-y-4 p-4">
      <TokenCompare />
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-black/40 rounded">
          <h4 className="font-bold mb-2">Liquidity Heatmap</h4>
          <LiquidityHeatmap strength="HIGH" />
        </div>
        <div className="p-4 bg-black/40 rounded">
          <h4 className="font-bold mb-2">Rug Scanner (sample)</h4>
          <div className="text-sm text-gray-300">Rug risk scanning is available per token page.</div>
        </div>
      </div>
    </div>
  );
}
