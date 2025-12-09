import React, { useState } from "react";
import { Web3Storage } from "web3.storage";
import { WEB3STORAGE_KEY } from "../config";

export default function UploadPreview({ onUploaded }) {
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  async function handleFile(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    setPreview(URL.createObjectURL(f));
    if (!WEB3STORAGE_KEY) {
      onUploaded?.({ cid: null, url: URL.createObjectURL(f) });
      return;
    }
    setUploading(true);
    try {
      const client = new Web3Storage({ token: WEB3STORAGE_KEY });
      const cid = await client.put([f], { wrapWithDirectory: false });
      const url = `https://${cid}.ipfs.w3s.link/`;
      onUploaded?.({ cid, url });
    } catch (err) {
      console.error(err);
      alert("IPFS upload failed — continuing with local preview");
      onUploaded?.({ cid: null, url: URL.createObjectURL(f) });
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm text-gray-300">Token image (meme)</label>
      <input type="file" accept="image/*" onChange={handleFile} />
      {preview && <img src={preview} alt="preview" className="w-36 h-36 mt-2 object-cover rounded-xl shadow-lg" />}
      {uploading && <div className="text-sm text-gray-400">Uploading to IPFS…</div>}
    </div>
  );
}

