import { NavLink } from "react-router-dom"
import { useAccount } from "wagmi"

export default function NavBar() {
  const { address, isConnected } = useAccount()

  return (
    <nav className="nav">
      <div className="logo">SafeMint™</div>

      <div className="nav-links">
        <NavLink to="/launchtoken">Launch Token</NavLink>
        <NavLink to="/validators">Validators</NavLink>
        <NavLink to="/governance">Governance</NavLink>
      </div>

      {/* Web3Modal handles connection */}
      <w3m-button />
    </nav>
  )
}