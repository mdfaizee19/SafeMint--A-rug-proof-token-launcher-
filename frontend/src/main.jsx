// src/main.jsx
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { WagmiProvider } from "wagmi"
import { wagmiConfig } from "./lib/walletConfig"
import App from "./App"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")).render(
  <WagmiProvider config={wagmiConfig}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </WagmiProvider>
)