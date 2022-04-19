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

export const connectWallet = async () => {
	if (window.ethereum) {
		try {
			const addressArray = await window.ethereum.request({
				method: 'eth_requestAccounts',
			});

			const obj = {
				status: `👆🏽 Write a message in the text-field above.`,
				address: addressArray[0],
			};

			return obj;
		} catch (err) {
			return {
				address: '',
				status: `😥 ${err.message}`,
			};
		}
	} else {
		// return {
		// 	address: '',
		// 	status: (
		// 		<span>
		// 			<p>
		// 				{' '}
		// 				🦊
		// 				{''}
		// 				<a
		// 					target='_blank'
		// 					href={`https://metamask.io/download.html`}
		// 					rel='noreferrer'
		// 				>
		// 					Please install Metamask in your browser
		// 				</a>
		// 			</p>
		// 		</span>
		// 	),
		// };
		Metainstall();
	}
};

export const getCurrentWalletConnected = async () => {
	if (window.ethereum) {
		try {
			const addressArray = await window.ethereum.request({
				method: 'eth_accounts',
			});

			if (addressArray.length > 0) {
				return {
					address: addressArray[0],
					status: `👆🏽 Write a message in the text-field above.`,
				};
			} else {
				return {
					address: '',
					status: '🦊 Connect to Metamask',
				};
			}
		} catch (err) {
			return {
				address: '',
				status: `😥 ${err.message}`,
			};
		}
	} else {
		// return {
		// 	address: '',
		// 	status,
		// };
		Metainstall();
	}
};

const Metainstall = () => {
	return {
		address: '',
		status: (
			<span>
				<p>
					{' '}
					🦊
					{''}
					<a
						target='_blank'
						href={`https://metamask.io/download.html`}
						rel='noreferrer'
					>
						Please install Metamask in your browser
					</a>
				</p>
			</span>
		),
	};
};

// export const updateMessage = async (address, message) => {};
