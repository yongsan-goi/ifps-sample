import "./App.css";
import WalletCard from "./views/WalletCard";
import Scan from "./views/Scan";
import TransferWallet from "./views/TransferWallet";

function App() {
  return (
    <>
      <WalletCard />
      <TransferWallet />
      <Scan />
    </>
  );
}

export default App;
