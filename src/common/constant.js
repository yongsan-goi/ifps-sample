export const scanPendingTxn: boolean = false;

export const chain: string = 'rinkeby';

// etherscan API key
export const etherscan: any = {
	apiKey: 'PDE8HZBUFGXIRFNNVAU2HN1FGVYAQ6I2C5',
	getAbi: 'https://api-rinkeby.etherscan.io/api?module=contract&action=getabi&apikey=PDE8HZBUFGXIRFNNVAU2HN1FGVYAQ6I2C5&address='
};

export const constructAbi = (address): string => {
	return etherscan.getAbi + address;
}

// infura
export const infura: any = {
	apiKey: '6e14075f1127445c9334c5dbce70b535',
	websocketUri: 'wss://rinkeby.infura.io/ws/v3/6e14075f1127445c9334c5dbce70b535',
	httpsUri: 'https://rinkeby.infura.io/v3/6e14075f1127445c9334c5dbce70b535'
};
