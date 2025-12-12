// src/components/UploadPreview.jsx
import React, { useState } from "react";

export default function UploadPreview({ onUploaded }) {
  const [preview, setPreview] = useState(null);

  async function handleFile(e) {
    const f = e.target.files[0];
    if (!f) return;
    // For demo: we won't upload to IPFS automatically (you can integrate web3.storage)
    // We'll create a fake cid using timestamp so indexer shows preview via local fallback.
    const cid = "demo-" + Date.now();
    setPreview(URL.createObjectURL(f));
    onUploaded({ cid, name: f.name, preview });
  }

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFile} />
      {preview && <img src={preview} alt="preview" className="mt-2 w-32 h-32 object-cover rounded-md" />}
      <div className="text-xs text-gray-400 mt-1">Image is optional. For production, wire IPFS upload.</div>
    </div>
  );
}

