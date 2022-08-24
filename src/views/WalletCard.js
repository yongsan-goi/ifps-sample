import React, { useState } from "react";
import { ethers } from "ethers";

const WalletCard = () => {
  const [errorMsg, setErrorMsg] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null);

  const connectWalletHelper = async () => {
    if (window.ethereum) {
      const result = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      accountChangeHandler(result[0]);
    } else {
      setErrorMsg("Install MetaMask");
    }
  };

  const accountChangeHandler = (newAccount) => {
    setDefaultAccount(newAccount);
    getUserBalance(newAccount.toString());
  };

  const getUserBalance = async (address) => {
    const result = await window.ethereum.request({
      method: "eth_getBalance",
      params: [address, "latest"],
    });
    setUserBalance(ethers.utils.formatEther(result));
  };

  const chainChangeHandler = () => {
    window.location.reload();
  };

  // when change account
  window.ethereum.on("accountsChanged", accountChangeHandler);

  // when change chain
  // suggested to relaod the page unless there is a good reason not to
  window.ethereum.on("chainChanged", chainChangeHandler);

  return (
    <>
      <div className="card-wrapper">
        <h4>Connection to MetaMask using window.etherum methods</h4>
        <button onClick={connectWalletHelper}>Connect Wallet</button>
        <div>
          <h3>Address: {defaultAccount}</h3>
        </div>
        <div>
          <h3>Balance: {userBalance}</h3>
        </div>
        {errorMsg}
      </div>
    </>
  );
};

export default WalletCard;
