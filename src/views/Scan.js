import React, { useState } from "react";
import Web3 from 'web3'

const Scan = () => {
  const [latestTxnList, setTxnList] = useState([]);

  const maxTxnStored: number = 10;

  const apiKey: string = '6e14075f1127445c9334c5dbce70b535';
  const websocketUri: string = 'wss://rinkeby.infura.io/ws/v3/' + apiKey;
  const httpsUri: string = 'https://rinkeby.infura.io/v3/' + apiKey;

  if (window.ethereum) {
  	const provider = new Web3.providers.WebsocketProvider(websocketUri);
    const web3 = new Web3(provider);
    const subscription = web3.eth.subscribe('pendingTransactions');

    subscription.subscribe((error, result) => {
	    if (error) console.log(error);
	    // if (result) console.log(result);
	  })
	  .on('data', async (txHash) => {
	    try {
	      const web3Http = new Web3(httpsUri);
	      const trx = await web3Http.eth.getTransaction(txHash);
	      if (trx !== null) {
	      	trx['hash'] = txHash;
	      	setLatestTxn(trx);
	      }
	      subscription.unsubscribe()
	    }
	    catch (error) {
	      console.log(error)
	    }
	  })
  }

  const setLatestTxn = (txn) => {
  	console.log('txn here', txn);
  	console.log('latestTxnList', latestTxnList);

  	const newArray = latestTxnList.slice();
  	if (newArray.length !== maxTxnStored) {
  		newArray.push(txn);
  		setTxnList(newArray);
  	} else {

  	}
  }

  return (
    <>
      <div className='card-wrapper'>
        <h4>Connection to MetaMask using Web3 Providers methods</h4>
      	<table>
	      	<thead>
	      		<tr>
	      			<th>Hash</th>
	      			<th>From</th>
	      			<th>To</th>
	      			<th>Amount</th>
	      			<th>Gas</th>
	      		</tr>
	      	</thead>
	      	<tbody>
	      		{latestTxnList.map((txn, i) => {
			      	return (
			      		<tr>
			      			<td style={{fontSize: '8px'}}>{txn.hash}</td>
			      			<td style={{fontSize: '8px'}}>{txn.from}</td>
			      			<td style={{fontSize: '8px'}}>{txn.to}</td>
			      			<td style={{fontSize: '8px'}}>{txn.input}</td>
			      			<td style={{fontSize: '8px'}}>{txn.gasPrice}</td>
			      		</tr>
			      	)
			      })}
	      	</tbody>
      	</table>
      </div>
    </>
  );
};

export default Scan;
