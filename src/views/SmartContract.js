import React, { useState } from "react";
import Web3 from 'web3'
import axios from 'axios'
import * as constant from '../common/constant'

const SmartContract = () => {
  const [address, setAddress] = useState([]);
  const [abiJson, setAbiJson] = useState(null);
  const [methodsJson, setMethods] = useState(null);

  const getContract = async () => {
  	console.log('address', address);
  	if (window.ethereum) {
	    try {
	    	const uri = constant.constructAbi(address);
	    	const etherScanAbi = await axios.get(uri);
	    	const abiJson = JSON.parse(etherScanAbi.data.result);
	    	setAbiJson(abiJson);

				const web3Http = new Web3(constant.infura.httpsUri);
				const contract = new web3Http.eth.Contract(abiJson, address);
  			console.log('contract', contract);
  			console.log('methods', contract.methods);

  			setMethods(contract.methods);
			}
			catch (error) {
				console.log(error);
			}
	  }

  }

  return (
    <>
      <div className='card-wrapper'>
        <h4>Using Infura Web3 Providers methods to get Rinkeby smart contract</h4>
        <p>Example smart contract on Rinkeby: 0xbCfEd8ae90Cb2E520ad11eE877Cc7Ec65cc7c12c</p>
        <div>
	      	<div style={{marginBottom: '10px'}}>
	          <label style={{width: '200px', display: 'inline-block'}}>Contract Address: </label>
	          <input style={{width: '900px'}} type="text" placeholder="Address" value={address} onChange={(e)=>{setAddress(e.target.value)}} />
	        </div> 
	        <button onClick={getContract}>Get Contract</button>
		      </div>
		      <div>
	          <p style={{whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden'}}>ABI JSON: {JSON.stringify(abiJson)}</p>
	        </div>
      </div>
    </>
  );
};

export default SmartContract;
