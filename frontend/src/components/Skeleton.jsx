export default function SkeletonCard() {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 animate-pulse">
      <div className="h-32 w-full bg-white/10 rounded-xl"></div>
      <div className="mt-4 h-4 w-1/2 bg-white/10 rounded"></div>
      <div className="mt-2 h-3 w-1/3 bg-white/10 rounded"></div>
    </div>
  );
}
