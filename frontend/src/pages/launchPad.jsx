import { useState } from "react";
import LaunchModal from "../components/LaunchModal";

export default function Launchpad() {
  const [open, setOpen] = useState(false);

  return (
    <div className="text-center p-10">
      <button
        onClick={() => setOpen(true)}
        className="bg-cyan-500 px-6 py-3 rounded-xl shadow-lg hover:bg-cyan-400 text-black font-semibold"
      >
        🚀 Launch Token
      </button>

      {open && <LaunchModal close={() => setOpen(false)} />}
    </div>
  );
}
