require('dotenv').config({ path: __dirname + '/.env' });
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;
const contractAddress = '0x6E51A5e025304EFE6cA23c41Ff313105F79e0289';
const { createAlchemyWeb3 } = require('@alch/alchemy-web3');
const web3 = createAlchemyWeb3(alchemyKey);

const contractABI = require('../contract-abi.json');

export const helloWorldContract = new web3.eth.Contract(
	contractABI,
	contractAddress
);

export const loadCurrentMessage = async () => {
	const message = await helloWorldContract.methods.message().call();
	return message;
};

// export const connectWallet = async () => {};

// export const getCurrentWalletConnected = async () => {};

// export const updateMessage = async (address, message) => {};
