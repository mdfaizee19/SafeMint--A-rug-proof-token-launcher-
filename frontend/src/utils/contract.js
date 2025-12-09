export const LAUNCHPAD_ADDRESS = '0x65d52515dcE4e8481aD7aA889F1343d8a0FE0B8d' // replace if needed
/*export const LAUNCHPAD_ABI = [
'function launchFairToken(string name,string symbol,uint256 supply,uint256 lockMonths) payable',
'function trustScore(address) view returns (uint8)',
'event Launched(address indexed token,uint256 lockTime)'
]*/

export const LAUNCHPAD_ABI = [
  "function launchFairToken(string name,string symbol,uint256 supply,uint256 liquidityAmount,uint256 lockMonths) payable",
  "function getLaunchDetails(address token) view returns (tuple(address owner,address token,uint256 totalSupply,uint256 liquidityAmount,uint256 lockMonths,uint256 unlockTime,uint8 trustScore))",
  "event TokenLaunched(address indexed owner,address indexed token,uint256 supply,uint256 unlockTime)"
];
