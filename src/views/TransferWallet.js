import React, { useState } from "react";
import { ethers } from "ethers";

const TransferWallet = () => {
  const [errorMsg, setErrorMsg] = useState(null);
  const [toAddress, setAddress] = useState('');
  const [amount, setAmount] = useState(0);
  const [gasFee, setGasFee] = useState(null);

  const send = async () => {
    if (window.ethereum) {
      const result = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      window.ethereum
      .request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: result[0],
            to: toAddress,
            value: (amount * 1000000000000000000).toString(16),
            // gas: (gasFee * 1000000000000).toString(16)
          },
        ],
      })
    .then((txHash) => console.log(txHash))
    .catch((error) => console.error);


      console.log(window.ethereum);
    } else {
      setErrorMsg("Install MetaMask");
    }
  };

  return (
    <>
      <div className="card-wrapper">
        <h4>Sending ETH using window.etherum method</h4>
        <div>
          <div style={{marginBottom: '10px'}}>
            <label style={{width: '100px', display: 'inline-block'}}>To Address: </label>
            <input style={{width: '1000px'}} type="text" placeholder="To address" value={toAddress} onChange={(e)=>{setAddress(e.target.value)}} />
          </div>
          <div style={{marginBottom: '10px'}}>
            <label style={{width: '100px', display: 'inline-block'}}>Amount: </label>
            <input type="number" placeholder="Amount" value={amount} onChange={(e)=>{setAmount(e.target.value)}} />
          </div> 
        {/*
        <div style={{marginBottom: '10px'}}>
            <label style={{width: '100px', display: 'inline-block'}}>Gas Fee: </label>
            <input type="number" placeholder="Gas Fee" value={gasFee} onChange={(e)=>{setGasFee(e.target.value)}} />
          </div> 
           */}
        
        </div>
        <p>Yong San Address: 0x72E3D71eE9110BC1a90178FA7aB2C64F8b22d91F</p>
        <button onClick={send}>Send!</button>
        {errorMsg}
      </div>
    </>
  );
};

export default TransferWallet;
