import { ethers } from "ethers";

export const connectWallet = async () => {
  if (!window.ethereum) {
    // Handle case where MetaMask is not installed
    return;
  }

  try {
    const [account] = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    // Handle successful connection
    console.log(`Connected to MetaMask with account: ${account}`);
  } catch (error) {
    // Handle connection error
    console.error(error);
  }
};

export const getProvider = () => {
  return new ethers.providers.Web3Provider(window.ethereum);
};

export const getSigner = () => {
  const provider = getProvider();
  return provider.getSigner();
};
