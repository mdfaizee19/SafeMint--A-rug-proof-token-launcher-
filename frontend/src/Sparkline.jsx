import { useEffect, useState } from "react";

export default function Sparkline() {
  const [points, setPoints] = useState([]);

  useEffect(() => {
    // Fake random chart
    const arr = Array.from({ length: 20 }, () =>
      Math.floor(20 + Math.random() * 20)
    );
    setPoints(arr);
  }, []);

  return (
    <svg width="100%" height="40">
      {points.map((p, i) => (
        <circle key={i} cx={i * 12} cy={40 - p} r="2" fill="#00ff99" />
      ))}
    </svg>
  );
}
