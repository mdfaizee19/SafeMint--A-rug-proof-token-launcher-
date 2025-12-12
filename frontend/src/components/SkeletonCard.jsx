// src/components/SkeletonCard.jsx
import React from "react";
export default function SkeletonCard() {
  return (
    <div className="p-4 bg-white/6 rounded-xl animate-pulse">
      <div className="h-32 bg-white/8 rounded-lg mb-4" />
      <div className="h-4 bg-white/8 rounded w-2/3 mb-2" />
      <div className="h-3 bg-white/8 rounded w-1/2" />
    </div>
  );
}
