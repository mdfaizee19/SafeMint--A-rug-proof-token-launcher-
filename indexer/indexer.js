// indexer/indexer.js
console.log("Starting Indexer…");

const { ethers } = require("ethers");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

// ---------------------------
// Load ABI from local JSON
// ---------------------------
const LAUNCHPAD_ABI = require("./LaunchPadABI.json");

// ---------------------------
// Load environment variables
// ---------------------------
const RPC = process.env.QIE_RPC;
const LAUNCHPAD_ADDRESS = process.env.LAUNCHPAD_ADDRESS;
const START_BLOCK = Number(process.env.LAUNCHPAD_START_BLOCK);

// Validate env
console.log("ENV CHECK:", {
  RPC,
  LAUNCHPAD_ADDRESS,
  START_BLOCK
});

if (!RPC || !LAUNCHPAD_ADDRESS || !START_BLOCK) {
  console.error("❌ Missing env variables in Railway");
  process.exit(1);
}

// ---------------------------
// Provider
// ---------------------------
const provider = new ethers.JsonRpcProvider(RPC);

// Path for db.json inside indexer folder
const DB = path.join(__dirname, "db.json");

// Create DB if missing
if (!fs.existsSync(DB)) {
  fs.writeFileSync(DB, JSON.stringify({ tokens: [] }, null, 2));
}

// ---------------------------
// Save token to DB
// ---------------------------
function saveLaunch(data, txHash) {
  const db = JSON.parse(fs.readFileSync(DB));

  const exists = db.tokens.find(
    (t) =>
      (t.tokenAddress || "").toLowerCase() === data.token.toLowerCase()
  );

  if (exists) return;

  db.tokens.push({
    owner: data.owner,
    tokenAddress: data.token,
    totalSupply: data.totalSupply.toString(),
    liquidityQIE: data.liquidityQIE.toString(),
    lockMonths: data.lockMonths,
    unlockTime: Number(data.unlockTime),
    creationTx: txHash,
    trustScore: 2,
    withdrawn: false
  });

  fs.writeFileSync(DB, JSON.stringify(db, null, 2));
  console.log("Saved token:", data.token);
}

// ---------------------------
// MAIN INDEXER
// ---------------------------
async function main() {
  console.log("Listening from block:", START_BLOCK);

  const contract = new ethers.Contract(
    LAUNCHPAD_ADDRESS,
    LAUNCHPAD_ABI,
    provider
  );

  // ------------------------------------
  // 1. Fetch past events
  // ------------------------------------
  const latest = await provider.getBlockNumber();
  let from = START_BLOCK;

  while (from <= latest) {
    let to = Math.min(from + 5000, latest);

    console.log(`Fetching logs: ${from} → ${to}`);

    const logs = await provider.getLogs({
      address: LAUNCHPAD_ADDRESS,
      topics: [
        ethers.id("Launched(address,address,uint256,uint256,uint256,uint256,string)")
      ],
      fromBlock: from,
      toBlock: to
    });

    for (const log of logs) {
      const parsed = contract.interface.parseLog(log);

      saveLaunch(parsed.args, log.transactionHash);
    }

    from = to + 1;
  }

  // ------------------------------------
  // 2. Real-time watcher
  // ------------------------------------
  contract.on(
    "Launched",
    (owner, token, supply, liquidity, months, unlockTime, imageCid, event) => {
      console.log("New Launch Detected:", token);

      saveLaunch(
        {
          owner,
          token,
          totalSupply: supply,
          liquidityQIE: liquidity,
          lockMonths: months,
          unlockTime,
          imageCid
        },
        event.transactionHash
      );
    }
  );
}

main().catch((err) => console.error("Indexer Error:", err));
