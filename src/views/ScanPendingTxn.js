import React, { useState } from "react";
import Web3 from 'web3'
import * as constant from '../common/constant'

const ScanPendingTxn = () => {
  const [latestTxnList, setTxnList] = useState([]);
  const maxTxnStored: number = 10;

  if (window.ethereum) {
  	const provider = new Web3.providers.WebsocketProvider(constant.infura.websocketUri);
    const web3 = new Web3(provider);
    const subscription = web3.eth.subscribe('pendingTransactions');

    if (constant.scanPendingTxn) {
		subscription
			.subscribe((error, result) => {
				if (error) console.log(error);
				// if (result) console.log(result);
			})
			.on('data', async (txHash) => {
				try {
					const web3Http = new Web3(constant.infura.httpsUri);
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
	}

  const setLatestTxn = (txn) => {
  	// console.log('txn here', txn);
  	// console.log('latestTxnList', latestTxnList);

  	const newArray = latestTxnList.slice();
  	if (newArray.length !== maxTxnStored) {
  		newArray.push(txn);
  		setTxnList(newArray);
  	} else {
  		// TODO: update remove old txn and push new txn
  	}
  }

  return (
    <>
      <div className='card-wrapper'>
        <h4>Using Infura Web3 Providers methods to get Rinkeby chain pending transaction</h4>
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

export default ScanPendingTxn;
