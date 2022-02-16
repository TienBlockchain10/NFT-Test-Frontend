import { useEffect } from 'react';
import './App.css';
import Header from './Header'
import contract from './contracts/NFTCollectible.json';
import React, { useState } from 'react'
import { ethers } from 'ethers';



const contractAddress = "0x036d5E89a5cD2219a7669d4c0C54483E8343f565";
const abi = contract.abi;


function App() {

  const [currentAccount, setCurrentAccount] = useState(null);
  
  const checkWalletIsConnected = async () => { 
    const {ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have Metamask installed!");
      return;

    } else {
      console.log("Wallet exists! We're ready to go!")
    }

    const accounts = await ethereum.request({method: 'eth_accounts'});

    if (accounts.length !== 0 ) {
      const account = accounts[0];
      console.log("Found an authorized account: ", account);
      setCurrentAccount(account);

    } else {
      console.log("No authorized account found");
    }
  }



  const connectWalletHandler = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      alert("Please install Metamask!");
    }

    try {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      console.log("Found an account! Address: ", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (err) {
      console.log(err)
    }
  }


  const mintNFTHandler = async () => {
    try {
      const {ethereum } = window;

      if (ethereum ) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const nftContract = new ethers.Contract(contractAddress, abi, signer);

        console.log("Initialize payment");
        let nftTxn = await nftContract.mintNFTs(1, {value: ethers.utils.parseEther("0.015")});

        console.log("Mining... Please wait");
        await nftTxn.wait();
        console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`);

      } else {
        console.log("Ethereum object does not exist");
      }
    } catch (err) {
      console.log(err);
    }
   }

  const connectWalletButton = () => { 
    return (
      <button onClick={connectWalletHandler} className =' cta-button connect-wallet-button'>
        Connect Wallet
      </button>
    )
  }


  const mintNftButton = () => {
    return (
      <button onClick = {mintNFTHandler} className = 'cta-button mint-nft-button'>
        Mint NFT
      </button>
    )
  }

  useEffect(() => { 
    checkWalletIsConnected();
  }, [])


  return (
    
    <div className = 'main-app'>
      <div className='header-main'>
        <Header />
      </div>
      <h1>Cool Collegiates Collection</h1>
      <div className = 'mint-button-div'>
        {currentAccount ? mintNftButton() : connectWalletButton()}
      </div>
    </div>
  )
}

export default App;