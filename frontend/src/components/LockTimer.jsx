import React, { useEffect, useState } from "react";

export default function LockTimer({ unlockTime }) {
  const [remaining, setRemaining] = useState(calcRemaining(unlockTime));

  useEffect(() => {
    const id = setInterval(() => setRemaining(calcRemaining(unlockTime)), 1000);
    return () => clearInterval(id);
  }, [unlockTime]);

  if (!unlockTime) return <span>—</span>;

  if (remaining.total <= 0) return <span>Unlocked</span>;

  return (
    <span>
      {remaining.days}d {remaining.hours}h {remaining.minutes}m
    </span>
  );
}

function calcRemaining(unix) {
  let t = (Number(unix) * 1000) - Date.now();
  if (isNaN(t) || t <= 0) return { total: 0, days: 0, hours: 0, minutes: 0 };
  
  const total = t;
  const days = Math.floor(t / (1000 * 60 * 60 * 24));
  t -= days * (1000 * 60 * 60 * 24);
  const hours = Math.floor(t / (1000 * 60 * 60));
  t -= hours * (1000 * 60 * 60);
  const minutes = Math.floor(t / (1000 * 60));
  return { total, days, hours, minutes };
}
