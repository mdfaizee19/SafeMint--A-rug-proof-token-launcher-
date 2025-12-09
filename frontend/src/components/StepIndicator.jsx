import React from "react";
import { motion } from "framer-motion";

export default function StepIndicator({ steps = [], current = 0 }) {
  return (
    <div className="flex items-center gap-4">
      {steps.map((s, i) => (
        <div key={i} className="flex items-center gap-3">
          <motion.div
            initial={{ scale: 0.8, opacity: 0.6 }}
            animate={{ scale: i <= current ? 1.06 : 1, opacity: i <= current ? 1 : 0.6 }}
            transition={{ type: "spring", stiffness: 300 }}
            className={`w-9 h-9 rounded-full flex items-center justify-center ${i <= current ? "bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-lg" : "bg-white/6 text-gray-300"}`}
          >
            {i < current ? "✓" : (i+1)}
          </motion.div>
          <div className={`text-sm ${i <= current ? "text-white" : "text-gray-400"}`}>{s}</div>
        </div>
      ))}
    </div>
  );
}
