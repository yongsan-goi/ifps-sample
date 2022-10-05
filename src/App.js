import "./App.css";
import WalletCard from "./views/WalletCard";
import ScanPendingTxn from "./views/ScanPendingTxn";
import TransferWallet from "./views/TransferWallet";
import SmartContract from "./views/SmartContract";

function App() {
  return (
    <>
      <WalletCard />
      <TransferWallet />
      <ScanPendingTxn />
      <SmartContract />
    </>
  );
}

export default App;
