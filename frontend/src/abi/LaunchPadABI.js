export const LAUNCHPAD_ABI = [
  "function launchFairToken(string name,string symbol,uint256 totalSupply,uint256 liquidityQIE,uint256 lockMonths,string imageCid) payable",
  "function withdrawLP(address token)",
  "function getLaunchDetails(address token) view returns (address owner,address tokenAddress,uint256 totalSupply,uint256 liquidityQIE,uint256 lockMonths,uint256 unlockTime,uint8 trustScore,bool withdrawn,string imageCid)",
  "function trustScore(address token) view returns (uint8)",
  "event Launched(address indexed owner,address indexed token,uint256 totalSupply,uint256 liquidityQIE,uint256 lockMonths,uint256 unlockTime)",
  "event LPWithdrawn(address indexed owner,address indexed token,uint256 amount)"
];
