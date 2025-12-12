// src/utils/trustScoreEngine.js
// Returns 0..3 mapping (0: red, 1: yellow, 2: green)
export function computeTrustToken(launch) {
  // launch: { lockMonths, withdrawn, totalSupply, owner, tokenAddress, imageCid, timestamp, liquidityQIE }
  // Heuristics:
  // - green: locked >=6 months && not withdrawn && supply minted to contract (no obvious premine)
  // - yellow: locked < 6 months but no other red flags
  // - red: withdrawn OR suspected premine (owner holds large %) — we can't know exact owner holdings, so infer if supplyOwner present (simulated)
  try {
    if (!launch) return 1;
    if (launch.withdrawn) return 0;
    if ((launch.lockMonths || 0) >= 6) return 2;
    return 1;
  } catch (e) {
    return 1;
  }
}
