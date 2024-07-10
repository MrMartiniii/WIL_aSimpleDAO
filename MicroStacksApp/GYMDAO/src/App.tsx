import reactLogo from './assets/react.svg';
import './App.css';
import dropDown from './components/dropdown-list';

import * as MicroStacks from '@micro-stacks/react';
import { WalletConnectButton } from './components/wallet-connect-button';
import { UserCard } from './components/user-card';
import { Logo } from './components/ustx-logo';


function Contents() {
  return (
    <>
    <div>
      <header className='header'>
      <UserCard />
      <WalletConnectButton />
      </header>
    </div>
    <div className="container">
        <img src="placeholder.png" alt="Site Logo" className="logo"></img>
        <h1 className="title">Welcome to GYM DAO</h1>
        <p className="description">Join our Decentralized Autonomous Organization and participate in the future of decentralized governance. Connect your wallet to get started.</p> 
          <div className='Vote'>
            <h2>Place a Vote</h2>
            
            <button>Yes</button>
            <button>No</button>
          </div>       
    </div>
   
    </>
  );
}

export default function App() {
  return (
    <MicroStacks.ClientProvider
      appName={'React + micro-stacks'}
      appIconUrl={reactLogo}
    >
      <Contents />
    </MicroStacks.ClientProvider>
  );
}

