import { useState } from "react";
import { ethers } from "ethers";
import "../App.css";

const MetaMask = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [defaultAccount, setDefaultAccount] = useState("");
  const [userBalance, setUserBalance] = useState("");

  const connectWallet = async () => {
    if (!window.ethereum) {
      setErrorMessage("Please install MetaMask!");
      return;
    }

    try {
      const [account] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      accountChanged(account);
    } catch (error) {
      setErrorMessage("Failed to connect to wallet.");
    }
  };

  const accountChanged = async (accountName: string) => {
    setDefaultAccount(accountName);
    const balance = await getUserBalance(accountName);
    setUserBalance(balance);
  };

  const getUserBalance = async (accountAddress: string) => {
    const balance = await window.ethereum.request({
      method: "eth_getBalance",
      params: [String(accountAddress), "latest"],
    });
    return ethers.utils.formatEther(balance);
  };

  const handleInput = (event: any) => {
    // handle input change and update state
  };

  return (
    <center>
      <h1>MetaMask Wallet Connection</h1>

      <button onClick={connectWallet}>Connect Wallet</button>

      {defaultAccount && <h3>Address: {defaultAccount}</h3>}
      {userBalance && <h3>Balance: {userBalance}</h3>}

      <h3>Enter Transaction Address:</h3>
      <input type="text" placeholder="Address:" onChange={handleInput} />

      {errorMessage && <p>{errorMessage}</p>}
    </center>
  );
};

export default MetaMask;
