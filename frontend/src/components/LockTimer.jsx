export default function LockTimer({ unlockTime }) {
  if (!unlockTime) return null;

  const remaining = unlockTime * 1000 - Date.now();
  if (remaining <= 0) return <div>Unlocked</div>;

  const days = Math.floor(remaining / (1000 * 60 * 60 * 24));

  return <div className="text-gray-300">{days} days remaining</div>;
}
